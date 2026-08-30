import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createContentSource } from "./content-source.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFile(path.join(root, file), "utf8");
const write = async (file, data) => {
  const target = path.join(root, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, data);
};
const contentSource = createContentSource(root);
const readJson = (file) => contentSource.readJson(file);

const localeManifest = JSON.parse(await read("data/locales.json"));
const locales = localeManifest.locales || [];
const defaultLocale = locales.find((locale) => locale.default) || locales[0];
const previewDraftLocales = process.env.WR_PREVIEW_DRAFT_LOCALES === "1";
const localeCatalogs = new Map();

for (const locale of locales) {
  const catalog = JSON.parse(await read(`data/i18n/site.${locale.id}.json`));
  localeCatalogs.set(locale.id, catalog);
}

function catalogMap(localeId) {
  const catalog = localeCatalogs.get(localeId) || { strings: [] };
  return new Map((catalog.strings || [])
    .filter((item) => item.source && item.translation)
    .map((item) => [item.source, item.translation]));
}

function catalogReadyForProduction(catalog) {
  const strings = catalog?.strings || [];
  return catalog?._meta?.reviewStatus === "approved"
    && strings.length > 0
    && strings.every((item) => item.translation && item.status === "approved");
}

function translator(localeId) {
  const map = catalogMap(localeId);
  return (value = "") => map.get(String(value)) || String(value);
}

function translateHtml(html, tx) {
  let output = html.replace(/>([^<>]+)</g, (match, text) => {
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    const core = text.trim();
    return core ? `>${leading}${tx(core)}${trailing}<` : match;
  });
  output = output.replace(/\b(aria-label|title|placeholder|alt)="([^"]*)"/gi, (match, name, value) => `${name}="${esc(tx(value))}"`);
  return output;
}

function localeUrl(locale, page) {
  const suffix = page.file === "index.html" ? "" : page.file;
  const pathPrefix = locale.urlPath ? `${locale.urlPath}/` : "";
  return `${locale.domain || config.productionDomain}/${pathPrefix}${suffix}`;
}

function localeIdentity(locale) {
  const contact = (companies.companies || []).find((item) => item.id === locale.contactId) || {};
  return {
    ...config,
    brand: locale.brand || config.brand,
    brandMark: locale.brandMark || "WR",
    tagline: locale.tagline || config.tagline,
    legalName: locale.legalName || config.legalName,
    productionDomain: locale.domain || config.productionDomain,
    email: contact.email || config.email,
    tel: contact.tel || config.tel,
    telHref: contact.telHref || config.telHref,
    address: contact.address || config.address,
    zip: contact.zip || "",
    contactId: locale.contactId,
  };
}

function localePagePath(locale, page) {
  return locale.outputDir ? `${locale.outputDir}/${page.file}` : page.file;
}

function localizeAssetPaths(html, locale) {
  if (!locale.outputDir) return html;
  return html.replace(/\b(src|srcset|href)="(assets\/|styles\.css|script\.js)([^"]*)"/gi, '$1="../$2$3"');
}

function isPublicLocale(locale) {
  return locale.id === defaultLocale.id || previewDraftLocales || catalogReadyForProduction(localeCatalogs.get(locale.id));
}

const config = await readJson("data/site.config.json");
const productData = await readJson("data/products.json");
const products = Array.isArray(productData) ? productData : productData.products;
const pageContent = await readJson("data/pages.json");
const lookbook = await readJson("data/lookbook.json");
const colorData = await readJson("data/colors.json");
const finishData = await readJson("data/finishes.json");
const edgeData = await readJson("data/edges.json");
const resources = await readJson("data/resources.json");
const partners = await readJson("data/partners.json");
const applications = await readJson("data/applications.json");
const compliance = await readJson("data/compliance.json");
const factory = await readJson("data/factory.json");
const projects = await readJson("data/projects.json");
const news = await readJson("data/news.json");
const faq = await readJson("data/faq.json");
const company = await readJson("data/company.json");
const companies = await readJson("data/companies.json");
const buyerJourney = await readJson("data/buyer-journey.json");
const colors = colorData.colors || [];
const finishes = finishData.finishes || [];
const edges = edgeData.edges || [];

if (!Array.isArray(products)) throw new Error("data/products.json must contain a products array.");

const headTpl = await read("src/partials/head.html");
const headerTpl = await read("src/partials/header.html");
const footerTpl = await read("src/partials/footer.html");

function runAssetPipeline() {
  if (process.env.WR_SKIP_ASSET_PIPELINE === "1") return;
  try {
    execFileSync(process.execPath, [path.join(root, "scripts/optimize-images.mjs")], { cwd: root, stdio: "inherit" });
  } catch {
    console.warn("Sharp is unavailable; falling back to Pillow image optimization.");
    try {
      const python = process.env.PYTHON || (process.platform === "win32"
        ? "C:/Users/somsn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe"
        : "python3");
      execFileSync(python, [path.join(root, "scripts/optimize-images.py")], { cwd: root, stdio: "inherit" });
    } catch (error) {
      console.warn("Asset optimization skipped or failed:", error.message);
    }
  }
}

runAssetPipeline();

let imageManifest = {};
try {
  imageManifest = await readJson("data/image-manifest.json");
} catch {}

function normalizeImage(item, field = "image") {
  if (!item[field]) return;
  item[field] = item[field].replace(/\.png$/i, ".jpg");
  item.imageWebp = item[field].replace(/\.(jpg|jpeg)$/i, ".webp");
  const dimensions = imageManifest[item[field]];
  if (dimensions) {
    item.imageWidth = dimensions.width;
    item.imageHeight = dimensions.height;
  }
}

for (const product of products) {
  product.imageType = product.imageType || (product.isIllustrative ? "render" : "real");
  product.isIllustrative = product.imageType !== "real";
  product.caption = product.isIllustrative ? "Illustrative render — not actual product." : "";
  normalizeImage(product);
}

for (const color of colors) {
  color.imageType = color.imageType || "render";
  normalizeImage(color, "swatchImage");
  color.swatchImageWebp = color.imageWebp;
}
for (const item of [...finishes, ...edges, ...(applications.items || [])]) {
  item.imageType = item.imageType || "render";
  normalizeImage(item);
}

const pages = [
  ["index.html", "WHITEROCK Stone | Marble, Granite, Quartz & Custom Stone Products", "WHITEROCK supplies stone surfaces, vanity tops, countertops, furniture, and custom fabrication for North American and global B2B buyers.", true],
  ["products.html", "Products | WHITEROCK Stone", "Explore WHITEROCK vanity tops, countertops, stone furniture, and custom commercial stone products.", true],
  ["colors.html", "Colors & Stone Design Library | WHITEROCK", "Browse WHITEROCK stone colors by material, color family, and finish, then request up to four samples."],
  ["materials.html", "Materials | WHITEROCK Stone", "Compare marble, granite, quartz, and engineered marble for WHITEROCK stone products."],
  ["finishes.html", "Finishes & Edge Profiles | WHITEROCK", "Visual reference for polished, honed, leathered stone finishes and popular countertop edge profiles."],
  ["applications.html", "Applications | WHITEROCK Stone", "Explore illustrative kitchen, bathroom, and hospitality surface directions for specification discussions."],
  ["factory.html", "Factory | WHITEROCK Stone", "WHITEROCK manufacturing capability, equipment, quality control, process, and export packing."],
  ["projects.html", "Projects & Case Studies | WHITEROCK", "Owner-approved WHITEROCK stone project references and case studies."],
  ["news.html", "News & Buyer Guides | WHITEROCK", "Specification and sourcing guidance for international stone buyers."],
  ["faq.html", "Buyer FAQ | WHITEROCK", "Answers about samples, quotations, custom production, inspection, packing, and stone export orders."],
  ["certifications.html", "Certifications & Test Reports | WHITEROCK", "Current owner-verified WHITEROCK certificates, test reports, and compliance documents."],
  ["sustainability.html", "Sustainability & Safety | WHITEROCK", "Crystalline silica safety, Prop 65, material traceability, and responsible stone production information."],
  ["resources.html", "Resources & Downloads | WHITEROCK", "Catalogs, care guidance, warranty, safety, compliance, and technical documents for stone buyers and fabricators."],
  ["partners.html", "Distributor & Trade Program | WHITEROCK", "Become a WHITEROCK distributor or trade partner for stone products manufactured in Vietnam."],
  ["order.html", "Order Process | WHITEROCK Stone", "How WHITEROCK handles samples, quotations, drawings, production, inspection, packing, and export orders."],
  ["about.html", "About | WHITEROCK Stone", "WHITEROCK LIMITED is a Vietnam-based stone manufacturer serving North American and global B2B buyers."],
  ["lookbook.html", "Lookbook | WHITEROCK Stone", "Stone product and material layout ideas, clearly identified as owner photography or illustrative renders."],
  ["contact.html", "Contact & Inquiry | WHITEROCK Stone", "Contact WHITEROCK for stone samples, quotations, drawings, and export orders."],
].map(([file, title, description, search = false]) => ({
  file,
  title,
  description,
  search,
  quoteHref: file === "contact.html" ? "#inquiry" : "contact.html#inquiry",
}));

const navGroups = [
  { label: "Products", items: [["products.html", "Products"], ["colors.html", "Colors"], ["materials.html", "Materials"], ["finishes.html", "Finishes & Edges"]] },
  { label: "Capability", items: [["factory.html", "Factory"], ["certifications.html", "Certifications"], ["sustainability.html", "Sustainability"]] },
  { label: "Inspiration", items: [["applications.html", "Applications"], ["projects.html", "Projects"], ["lookbook.html", "Lookbook"]] },
  { label: "Resources", items: [["resources.html", "Resources"], ["news.html", "News"], ["faq.html", "FAQ"], ["order.html", "How to Order"]] },
  { label: "Partners", href: "partners.html" },
  { label: "Contact", href: "contact.html" },
];

const footerGroups = [
  { label: "Products", items: navGroups[0].items },
  { label: "Capability", items: navGroups[1].items },
  { label: "Inspiration", items: navGroups[2].items },
  { label: "Resources", items: navGroups[3].items },
  { label: "Company", items: [["index.html", "Home"], ["about.html", "About"], ["partners.html", "Distributor Program"], ["contact.html", "Contact"]] },
];

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function applyTpl(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

function navHtml(activeFile) {
  return navGroups.map((group, index) => {
    if (group.href) return `<a${group.href === activeFile ? ' class="active" aria-current="page"' : ""} href="${group.href}">${group.label}</a>`;
    const active = group.items.some(([href]) => href === activeFile);
    const id = `nav-group-${index + 1}`;
    const links = group.items.map(([href, label]) => `<a${href === activeFile ? ' class="active" aria-current="page"' : ""} href="${href}">${label}</a>`).join("");
    return `<div class="nav-group${active ? " active" : ""}"><button class="nav-trigger" type="button" aria-expanded="false" aria-controls="${id}">${group.label}<span class="nav-chevron" aria-hidden="true"></span></button><div class="nav-dropdown" id="${id}">${links}</div></div>`;
  }).join("");
}

function mobileNavHtml(activeFile) {
  return navGroups.map((group) => {
    if (group.href) return `<a${group.href === activeFile ? ' class="active" aria-current="page"' : ""} href="${group.href}">${group.label}</a>`;
    const active = group.items.some(([href]) => href === activeFile);
    const links = group.items.map(([href, label]) => `<a${href === activeFile ? ' class="active" aria-current="page"' : ""} href="${href}">${label}</a>`).join("");
    return `<details class="mobile-nav-group"${active ? " open" : ""}><summary>${group.label}</summary><div>${links}</div></details>`;
  }).join("");
}

function footerLinks() {
  return footerGroups.map((group) => `<section class="footer-link-group" aria-labelledby="footer-${group.label.toLowerCase()}"><h2 id="footer-${group.label.toLowerCase()}">${group.label}</h2>${group.items.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</section>`).join("");
}

function localPicture(src, alt, width = 1200, height = 900, eager = false, caption = "") {
  const webp = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const img = `<picture><source srcset="${webp}" type="image/webp" /><img ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${src}" alt="${esc(alt)}" width="${width}" height="${height}" /></picture>`;
  return caption ? `<figure class="asset-figure">${img}<figcaption>${esc(caption)}</figcaption></figure>` : img;
}

function renderList(items = [], className = "") {
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderCapacityCards(items = []) {
  return items.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${esc(item)}</p></article>`).join("");
}

function renderPartnerTerms() {
  return (partners.terms || []).map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderPartnerOptions() {
  return (partners.businessTypes || []).map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("");
}

function renderFactoryStats() {
  return (factory.stats || []).map((item) => `<article><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span>${item.confirmed ? "" : '<small>Owner confirmation required</small>'}</article>`).join("");
}

function renderFactoryEquipment() {
  return (factory.equipment || []).map((item) => {
    let visual = "";
    if (item.media) {
      const dimensions = imageManifest[item.media] || {};
      const isRender = item.imageType === "render";
      const alt = item.alt || (isRender ? `${item.name} illustrative equipment image` : `${item.name} at the ${item.location || "WHITEROCK factory"}`);
      const caption = isRender ? (item.caption || "Illustrative image — not our actual equipment.") : "";
      visual = localPicture(item.media, alt, dimensions.width || 1200, dimensions.height || 900, false, caption);
    } else if (item.drawing) {
      visual = `<img class="equipment-drawing" data-vector src="${esc(item.drawing)}" alt="${esc(item.name)} line drawing" width="320" height="190" />`;
    }
    return `<article class="factory-equipment-card">${visual}<div><p class="eyebrow">${esc(item.location || "Production equipment")}</p><h3>${esc(item.name)}</h3><p>${esc(item.function)}</p><dl><dt>Brand / model</dt><dd>${esc(item.brand)}</dd><dt>Quantity</dt><dd>${esc(item.quantity)}</dd><dt>Key specification</dt><dd>${esc(item.keySpec)}</dd></dl>${item.media ? "" : '<small class="media-status-label">Line drawing shown until a real machine photo is supplied.</small>'}</div></article>`;
  }).join("");
}

function renderFactoryCapabilities() {
  return (factory.capabilities || []).map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderFactoryFlowSteps() {
  return (factory.flowSteps || []).map((item) => `<article><span>${esc(item.number)}</span><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderFactoryQc() {
  return `${renderList(factory.qc?.inspectionPoints, "check-list")}<dl class="factory-data-list"><dt>AQL sampling</dt><dd>${esc(factory.qc?.aql)}</dd><dt>Measuring tools</dt><dd>${esc(factory.qc?.tools)}</dd><dt>Third-party inspection</dt><dd>${esc(factory.qc?.thirdParty)}</dd></dl>`;
}

function renderFactoryRnd() {
  return `${renderList(factory.rnd?.capabilities, "check-list")}<p><strong>Sample-development lead time:</strong> ${esc(factory.rnd?.sampleLeadTime)}</p>`;
}

function renderFactoryMaterials() {
  return `<p>${esc(factory.materials?.copy)}</p><p><strong>Traceability:</strong> ${esc(factory.materials?.traceability)}</p>`;
}

function renderFactoryPacking() {
  const drawing = factory.packing?.drawing ? `<img class="packing-drawing" data-vector src="${esc(factory.packing.drawing)}" alt="Export packing line drawing" width="320" height="190" />` : "";
  return `${drawing}<div><p class="eyebrow">Packing & Container Loading</p><h2>Protection designed around the SKU.</h2><p>${esc(factory.packing?.copy)}</p><p>${esc(factory.packing?.loadability)}</p></div>`;
}

function renderFactoryTour() {
  const gallery = Array.isArray(factory.gallery) ? factory.gallery.filter((item) => item.image) : [];
  const images = gallery.map((item) => {
    const dimensions = imageManifest[item.image] || {};
    return `<figure>${localPicture(item.image, item.alt || item.title || "WHITEROCK factory", dimensions.width || 1200, dimensions.height || 900)}<figcaption>${esc(item.title || item.alt || "WHITEROCK factory")}</figcaption></figure>`;
  }).join("");
  const video = factory.tourVideo ? `<video class="factory-tour-video" controls preload="metadata" playsinline><source src="${esc(factory.tourVideo)}" type="video/mp4" />Your browser does not support embedded video.</video>` : "";
  return video || images ? `${video}<div class="factory-gallery">${images}</div>` : '<p class="empty-state-panel">Awaiting owner-supplied factory photography and a verified tour video.</p>';
}

function renderProjectCards() {
  const items = Array.isArray(projects.items) ? projects.items : [];
  if (!items.length) return '<div class="empty-state-panel"><strong>No project claims published yet.</strong><p>Add a real reference in the CMS with client permission, material, scope, quantity, location, and owner-supplied photography.</p></div>';
  return items.map((item) => {
    const isRender = item.imageType === "render";
    const caption = isRender ? "Illustrative render - not a completed WHITEROCK project." : "";
    return `<article class="case-study-card">${item.image ? localPicture(item.image, item.alt || item.title, item.imageWidth || 1200, item.imageHeight || 900, false, caption) : ""}<div><p class="eyebrow">${esc(item.location || (isRender ? "Illustrative study" : "Verified project"))}</p><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><dl><dt>Material</dt><dd>${esc(item.material)}</dd><dt>Scope</dt><dd>${esc(item.scope)}</dd><dt>Quantity</dt><dd>${esc(item.quantity)}</dd></dl></div></article>`;
  }).join("");
}

function renderNewsCards() {
  return (news.items || []).map((item) => {
    const dimensions = imageManifest[item.image] || {};
    const isRender = item.imageType === "render";
    const alt = item.imageAlt || `${item.title}${isRender ? " illustrative cover image" : ""}`;
    const caption = isRender ? (item.caption || "Illustrative cover image.") : "";
    const visual = item.image
      ? `<figure class="insight-visual">${localPicture(item.image, alt, dimensions.width || 1536, dimensions.height || 1024)}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}</figure>`
      : "";
    return `<article class="insight-card">${visual}<div class="insight-card-body"><p class="eyebrow">${esc(item.category)} · ${esc(item.date)}</p><h2>${esc(item.title)}</h2><p>${esc(item.excerpt)}</p><details><summary>Read guide</summary><p>${esc(item.body)}</p></details></div></article>`;
  }).join("");
}

function renderFaqItems() {
  return (faq.items || []).map((item) => `<details><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join("");
}

function renderCertificationCards() {
  const documentItems = (resources.items || []).filter((item) => ["Compliance", "Safety"].includes(item.category));
  const claims = (compliance.certifications || []).map((item) => ({ title: item, description: "Certification status awaiting owner verification.", file: "" }));
  return [...claims, ...documentItems].map((item) => `<article><p class="eyebrow">${item.file ? "Available" : "Pending"}</p><h3>${esc(item.title)}</h3><p>${esc(item.description || "Owner confirmation required.")}</p>${item.file ? `<a class="button small" href="${esc(item.file)}" download>Download verified document</a>` : '<span class="availability-note">Not yet published</span>'}</article>`).join("");
}

function renderCompanyMilestones() {
  return (company.milestones || []).map((item) => `<article><strong>${esc(item.label)}</strong><p>${esc(item.copy)}</p></article>`).join("");
}

function renderLookbookItems() {
  const configured = Array.isArray(lookbook.items) ? lookbook.items : [];
  const items = configured.length ? configured : products.filter((product) => ["WR-VT49", "WR-VT61D", "WR-KT-QC", "WR-FR-RM"].includes(product.sku));
  if (!items.length) return '<p class="empty-state">Project photography will be added as owner-supplied images become available.</p>';

  return items.map((item) => {
    const isRender = (item.imageType || (item.isIllustrative ? "render" : "real")) === "render";
    const image = (item.image || "assets/brand/hero-stone-v2.jpg").replace(/\.png$/i, ".jpg");
    const webp = item.imageWebp || image.replace(/\.(jpg|jpeg)$/i, ".webp");
    const alt = `${item.alt || item.title || "WHITEROCK stone product"}${isRender ? " illustrative render" : ""}`;
    const dimensions = imageManifest[image] || {};
    return `<figure class="lookbook-item"><picture><source srcset="${webp}" type="image/webp" /><img loading="lazy" decoding="async" src="${image}" alt="${esc(alt)}" width="${item.imageWidth || dimensions.width || 1536}" height="${item.imageHeight || dimensions.height || 1024}" /></picture><figcaption><span>${esc(item.category || item.material || "Stone product")}</span><strong>${esc(item.title || item.sku || "WHITEROCK project")}</strong>${isRender ? '<small>Illustrative render — not actual product.</small>' : ""}</figcaption></figure>`;
  }).join("");
}

function renderCompanyOperations(locale) {
  const preferred = locale.contactId;
  return [...(companies.companies || [])]
    .sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred))
    .map((item) => {
      const dimensions = imageManifest[item.image] || {};
      return `<article class="operation-card">${localPicture(item.image, item.imageAlt, dimensions.width || 1200, dimensions.height || 900)}<div><p class="eyebrow">${esc(item.role)}</p><h3>${esc(item.localName)}</h3><p>${esc(item.companyName)}</p><dl><dt>Country</dt><dd>${esc(item.country)}</dd><dt>Website</dt><dd><a href="${esc(item.domain)}">${esc(item.domain.replace(/^https?:\/\/(www\.)?/, ""))}</a></dd></dl></div></article>`;
    }).join("");
}

function renderCompanyContacts(locale) {
  const preferred = locale.contactId;
  return [...(companies.companies || [])]
    .sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred))
    .map((item) => `<article class="company-contact-card${item.id === preferred ? " is-primary" : ""}"><p class="eyebrow">${esc(item.role)}</p><h3>${esc(item.localName)}</h3><p class="company-english-name">${esc(item.companyName)}</p><dl>${item.taxCode ? `<dt>Tax Code</dt><dd>${esc(item.taxCode)}</dd>` : ""}${item.address ? `<dt>Factory Address</dt><dd>${esc(item.address)}</dd>` : ""}<dt>Contact Person</dt><dd>${esc(item.contactPerson)}</dd><dt>Tel</dt><dd><a href="tel:${esc(item.telHref)}">${esc(item.tel)}</a></dd><dt>Email</dt><dd><a href="mailto:${esc(item.email)}">${esc(item.email)}</a></dd></dl></article>`).join("");
}

function renderBuyerPaths() {
  return (buyerJourney.home?.paths || []).map((item) => `
    <article class="buyer-path-card">
      <div>
        <p class="eyebrow">${esc(item.bestStart)}</p>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.summary)}</p>
      </div>
      ${renderList(item.highlights || [], "compact-check-list")}
      <a class="text-link" href="${esc(item.href)}">${esc(item.ctaLabel)} -></a>
    </article>`).join("");
}

function renderDecisionSteps() {
  return (buyerJourney.decisionPanel?.steps || []).map((item) => `
    <article>
      <span>${esc(item.metric)}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
      <a class="text-link" href="${esc(item.href)}">${esc(item.ctaLabel)} -></a>
    </article>`).join("");
}

function renderProofPoints() {
  return (buyerJourney.proof?.points || []).map((item, index) => `
    <article>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
    </article>`).join("");
}

function renderProductGuidanceCards() {
  return (buyerJourney.products?.cards || []).map((item) => `
    <article>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
      <button class="text-button product-guide-filter" type="button" data-filter-target="${esc(item.filter)}">${esc(item.ctaLabel)}</button>
    </article>`).join("");
}

function renderQuoteChecklist(className = "quote-check-list") {
  return renderList(buyerJourney.quoteChecklist?.items || [], className);
}

function renderColorRoutes() {
  return (buyerJourney.colors?.routes || []).map((item) => `
    <button class="color-route-card" type="button" data-color-family-shortcut="${esc(item.family)}">
      <span>${esc(item.family)}</span>
      <strong>${esc(item.title)}</strong>
      <small>${esc(item.copy)}</small>
    </button>`).join("");
}

function renderFeaturedColorStrip() {
  return colors.slice(0, 12).map((color) => {
    const dimensions = imageManifest[color.swatchImage] || {};
    return `<a class="featured-color-card" href="colors.html?color=${esc(color.slug)}">
      ${localPicture(color.swatchImage, `${color.name} illustrative digital swatch`, dimensions.width || 1536, dimensions.height || 1024)}
      <span>${esc(color.colorFamily)} / ${esc(color.material)}</span>
      <strong>${esc(color.name)}</strong>
    </a>`;
  }).join("");
}

function renderHomeApplications() {
  return (applications.items || []).slice(0, 8).map((item) => {
    const dimensions = imageManifest[item.image] || {};
    const caption = item.caption || "Application inspiration";
    return `<article class="home-application-card">
      ${localPicture(item.image, item.imageAlt || `${item.title} illustrative application inspiration`, dimensions.width || 1536, dimensions.height || 1024, false, `${caption} - illustrative scene, not a WHITEROCK project.`)}
      <div><p class="eyebrow">${esc(item.category)}</p><h3>${esc(item.title)}</h3><p>${esc(item.featuredColor)}</p></div>
    </article>`;
  }).join("");
}

function renderHomeFactoryStrip() {
  const preferred = [
    "assets/factory/vietnam-factory-exterior.jpg",
    "assets/factory/vietnam-production-hall.jpg",
    "assets/factory/vietnam-vanity-qc-wide.jpg",
    "assets/gallery/vietnam/factory-04.jpg",
    "assets/gallery/china/factory-07.jpg",
    "assets/gallery/china/factory-09.jpg",
  ];
  const gallery = preferred
    .map((image) => (factory.gallery || []).find((item) => item.image === image) || { image, title: image.split("/").pop()?.replace(/\.[^.]+$/, ""), alt: "WHITEROCK factory photo" })
    .filter((item) => item.image);
  return gallery.map((item) => {
    const dimensions = imageManifest[item.image] || {};
    return `<figure>${localPicture(item.image, item.alt || item.title || "WHITEROCK factory photo", dimensions.width || 1200, dimensions.height || 900)}<figcaption>${esc(item.title || "Factory photo")}</figcaption></figure>`;
  }).join("");
}

function renderProductionBaseCards() {
  const vietnam = (companies.companies || []).find((item) => item.id === "vietnam") || {};
  const china = (companies.companies || []).find((item) => item.id === "china") || {};
  const cards = [
    {
      eyebrow: "Primary Production Base",
      title: "Vietnam factory",
      image: vietnam.image || "assets/factory/vietnam-factory-exterior.jpg",
      alt: vietnam.imageAlt || "WHITEROCK Vietnam factory photo",
      copy: "The Vietnam base is presented first for export production, order coordination, packing review, and shipment-ready communication.",
      stats: ["20,000 m² published factory area", "100,000+ m² published annual capacity", "Owner-confirmed details still replace TODO fields"],
    },
    {
      eyebrow: "Supporting Production Network",
      title: "Yunfu, China support",
      image: china.image || "assets/factory/china-factory-exterior.jpg",
      alt: china.imageAlt || "OPTIMA STONE China factory photo",
      copy: "The China base supports material sourcing, processing references, and production-network flexibility where the approved order route requires it.",
      stats: ["Stone-industry supply network", "Owner-supplied workshop photography", "Equipment claims remain confirmation-gated"],
    },
  ];
  return cards.map((card) => {
    const dimensions = imageManifest[card.image] || {};
    return `<article class="production-base-card">${localPicture(card.image, card.alt, dimensions.width || 1200, dimensions.height || 900)}<div><p class="eyebrow">${esc(card.eyebrow)}</p><h3>${esc(card.title)}</h3><p>${esc(card.copy)}</p>${renderList(card.stats, "compact-check-list")}</div></article>`;
  }).join("");
}

function renderProductCategoryCards() {
  const categories = [
    ["Bathroom Vanity Top", "Vanity Tops", "Bathroom vanity programs with bowl, faucet, backsplash, edge, and packing options."],
    ["Kitchen Countertop", "Countertops", "Kitchen and commercial counter pieces quoted by drawing, finish, edge, and cutout scope."],
    ["Stone Furniture", "Stone Furniture", "Tables, tops, shelves, and furniture surfaces for retail, hospitality, and project programs."],
    ["Commercial Project", "Commercial Projects", "Cut-to-size counters, panels, and project surfaces reviewed from BOQ and shop drawings."],
  ];
  return categories.map(([category, title, copy]) => {
    const product = products.find((item) => item.category === category) || products[0] || {};
    const isRender = product.imageType === "render" || product.isIllustrative;
    const dimensions = imageManifest[product.image] || {};
    const caption = isRender ? "Illustrative render — not actual product." : "";
    return `<article class="category-feature-card">
      ${product.image ? localPicture(product.image, `${title}${isRender ? " illustrative render" : ""}`, product.imageWidth || dimensions.width || 1536, product.imageHeight || dimensions.height || 1024, false, caption) : ""}
      <div><p class="eyebrow">${esc(category)}</p><h3>${esc(title)}</h3><p>${esc(copy)}</p><a class="text-link" href="products.html?q=${encodeURIComponent(category)}">View category -></a></div>
    </article>`;
  }).join("");
}

function buildStructuredData(page, identity, locale) {
  const pageUrl = localeUrl(locale, page);
  const base = identity.productionDomain.replace(/\/$/, "");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: identity.legalName,
    alternateName: identity.brand,
    url: base,
    email: identity.email,
    telephone: identity.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.address,
      postalCode: identity.zip,
      addressCountry: locale.contactId === "china" ? "CN" : "VN",
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity.brand,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/products.html?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: page.title.split("|")[0].trim(), item: pageUrl },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify([organization, website, breadcrumb])}</script>`;
}

function editableValues(locale, identity) {
  return {
    homeHeroEyebrow: esc(pageContent.homeHeroEyebrow),
    homeHeroTitle: esc(pageContent.homeHeroTitle),
    homeHeroCopy: esc(pageContent.homeHeroCopy),
    aboutFacts: renderList(pageContent.aboutFacts, "fact-list"),
    factoryCapacity: renderCapacityCards(pageContent.factoryCapacity),
    orderTerms: renderList(pageContent.orderTerms, "term-list"),
    materialsCopy: esc(pageContent.materialsCopy),
    lookbookItems: renderLookbookItems(),
    web3FormsAccessKey: esc(config.web3FormsAccessKey),
    partnerEyebrow: esc(partners.eyebrow),
    partnerTitle: esc(partners.title),
    partnerIntro: esc(partners.intro),
    partnerRegions: renderList(partners.targetRegions, "check-list"),
    partnerTerms: renderPartnerTerms(),
    partnerBusinessOptions: renderPartnerOptions(),
    resourcesIntro: esc(resources.intro),
    siteLegalName: esc(identity.legalName),
    siteAddress: esc(identity.address),
    siteEmail: esc(identity.email),
    siteTel: esc(identity.tel),
    siteTelHref: esc(identity.telHref),
    siteZip: esc(identity.zip),
    complianceEyebrow: esc(compliance.eyebrow),
    complianceTitle: esc(compliance.title),
    silicaTitle: esc(compliance.silicaTitle),
    silicaCopy: esc(compliance.silicaCopy),
    prop65Title: esc(compliance.prop65Title),
    prop65Copy: esc(compliance.prop65Copy),
    factoryHeroCopy: esc(factory.heroCopy),
    factoryStats: renderFactoryStats(),
    factoryEquipment: renderFactoryEquipment(),
    factoryCapabilities: renderFactoryCapabilities(),
    factoryFlowSteps: renderFactoryFlowSteps(),
    factoryQc: renderFactoryQc(),
    factoryRnd: renderFactoryRnd(),
    factoryMaterials: renderFactoryMaterials(),
    factoryPacking: renderFactoryPacking(),
    factoryCertifications: renderList(compliance.certifications || [], "certification-list"),
    factoryTour: renderFactoryTour(),
    projectsIntro: esc(projects.intro),
    projectCards: renderProjectCards(),
    newsIntro: esc(news.intro),
    newsCards: renderNewsCards(),
    faqIntro: esc(faq.intro),
    faqItems: renderFaqItems(),
    certificationCards: renderCertificationCards(),
    companyMission: esc(company.mission),
    companyOperations: renderCompanyOperations(locale),
    companyContactCards: renderCompanyContacts(locale),
    companyMilestones: renderCompanyMilestones(),
    companyAdvantages: renderList(company.advantages || [], "check-list"),
    whyVietnam: esc(company.whyVietnam),
    buyerHomeEyebrow: esc(buyerJourney.home?.eyebrow),
    buyerHomeTitle: esc(buyerJourney.home?.title),
    buyerHomeIntro: esc(buyerJourney.home?.intro),
    buyerPaths: renderBuyerPaths(),
    decisionEyebrow: esc(buyerJourney.decisionPanel?.eyebrow),
    decisionTitle: esc(buyerJourney.decisionPanel?.title),
    decisionSteps: renderDecisionSteps(),
    proofEyebrow: esc(buyerJourney.proof?.eyebrow),
    proofTitle: esc(buyerJourney.proof?.title),
    proofPoints: renderProofPoints(),
    productGuideEyebrow: esc(buyerJourney.products?.eyebrow),
    productGuideTitle: esc(buyerJourney.products?.title),
    productGuideIntro: esc(buyerJourney.products?.intro),
    productGuidanceCards: renderProductGuidanceCards(),
    quoteChecklistEyebrow: esc(buyerJourney.quoteChecklist?.eyebrow),
    quoteChecklistTitle: esc(buyerJourney.quoteChecklist?.title),
    quoteChecklist: renderQuoteChecklist(),
    colorRoutesEyebrow: esc(buyerJourney.colors?.eyebrow),
    colorRoutesTitle: esc(buyerJourney.colors?.title),
    colorRoutes: renderColorRoutes(),
    featuredColorStrip: renderFeaturedColorStrip(),
    homeApplications: renderHomeApplications(),
    homeFactoryStrip: renderHomeFactoryStrip(),
    productionBaseCards: renderProductionBaseCards(),
    productCategoryCards: renderProductCategoryCards(),
    factoryTourVideo: esc(factory.tourVideo || ""),
    contactPrepEyebrow: esc(buyerJourney.contact?.eyebrow),
    contactPrepTitle: esc(buyerJourney.contact?.title),
    contactPrepCopy: esc(buyerJourney.contact?.copy),
  };
}

function transformImageTag(tag, pageFile) {
  if (/data-dynamic-image|data-vector/i.test(tag) || /src="[^"]+\.svg"/i.test(tag)) return tag;
  const alt = tag.match(/alt="([^"]*)"/i)?.[1] || "WHITEROCK image";
  const eager = /loading="eager"/i.test(tag);
  const src = tag.match(/src="([^"]+)"/i)?.[1] || "";
  let local = src.startsWith("assets/") ? src : "assets/brand/hero-stone-v2.jpg";
  if (!src.startsWith("assets/")) {
    if (src.includes("white-marble")) local = "assets/materials/white-marble-v2.jpg";
    if (src.includes("ET73CW")) local = "assets/materials/granite-v2.jpg";
    if (src.includes("ET61CW")) local = "assets/materials/quartz-v2.jpg";
    if (src.includes("01_249")) local = "assets/materials/engineered-marble-v2.jpg";
  }
  local = local.replace(/\.png$/i, ".jpg");
  const dimensions = imageManifest[local] || {};
  const width = Number(tag.match(/width="(\d+)"/i)?.[1]) || dimensions.width || (local.includes("hero") ? 1536 : 1200);
  const height = Number(tag.match(/height="(\d+)"/i)?.[1]) || dimensions.height || (local.includes("hero") ? 1024 : 900);
  return localPicture(local, alt.replace("from WHITEROCK website", "").trim(), width, height, eager);
}

function transformMain(main, pageFile, identity) {
  let html = main;
  for (let i = 0; i < 4; i += 1) html = html.replace(/<picture\b[^>]*>[\s\S]*?(<img\b[^>]*>)[\s\S]*?<\/picture>/gi, "$1");
  html = html.replace(/https:\/\/www\.whiterockstone\.com\/?/g, config.productionDomain);
  html = html.replace(/lynn@whiterockstone\.com/g, identity.email);
  html = html.replace(/\+84 0798 858 220/g, identity.tel);
  html = html.replace(/YOUR_WEB3FORMS_ACCESS_KEY|TODO_WEB3FORMS_ACCESS_KEY/g, identity.web3FormsAccessKey);
  html = html.replace(/WHITEROCK LIMITED/g, identity.legalName);
  html = html.replace(/Factory Address: .*?Vietnam/g, `Factory Address: ${identity.address}`);
  html = html.replace(/<img\b[^>]*>/gi, (tag) => transformImageTag(tag, pageFile));
  html = html.replace(/<div class="photo-needed">Equipment photo available on request<\/div>/g, '<div class="line-icon" aria-hidden="true"><span></span><span></span><span></span></div>');
  if (pageFile === "products.html" && !html.includes("product-visual-note")) {
    html = html.replace(/(<section class="section product-section">)/, `$1\n<p class="product-visual-note">Some product visuals are illustrative renders pending company-owned product photography.</p>`);
  }
  if (pageFile === "index.html") html = html.replace(/href="#inquiry"/g, 'href="contact.html#inquiry"');
  return html;
}

function buildHead(page, locale, tx, identity) {
  const url = localeUrl(locale, page);
  const alternates = locales.filter(isPublicLocale).map((item) => `<link rel="alternate" hreflang="${item.hreflang}" href="${localeUrl(item, page)}" />`).join("\n  ");
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${localeUrl(defaultLocale, page)}" />`;
  const ogImage = /^https?:/i.test(identity.ogImage) ? identity.ogImage : `${identity.productionDomain}/${identity.ogImage.replace(/^\//, "")}`;
  const localizedTitle = page.title.replaceAll(config.brand, identity.brand);
  const localizedDescription = page.description.replaceAll(config.brand, identity.brand);
  return applyTpl(headTpl, {
    title: esc(tx(localizedTitle)), description: esc(tx(localizedDescription)), canonical: url,
    brand: esc(identity.brand), favicon: identity.favicon, ogImage,
    analyticsPlaceholder: identity.analyticsPlaceholder, hreflangLinks: `${alternates}\n  ${xDefault}`,
    structuredData: buildStructuredData(page, identity, locale),
  });
}

function buildHeader(page, locale, tx, identity) {
  const visibleLocales = locales.filter((item) => item.id === locale.id || isPublicLocale(item));
  const languageSwitch = `<nav class="language-switcher" aria-label="Language">${visibleLocales.map((item) => `<a class="language-switch${item.id === locale.id ? " active" : ""}" href="${localeUrl(item, page)}" lang="${item.htmlLang}" hreflang="${item.hreflang}"${item.id === locale.id ? ' aria-current="page"' : ""}>${esc(item.switchLabel)}</a>`).join("")}</nav>`;
  return applyTpl(headerTpl, {
    brand: identity.brand, brandMark: identity.brandMark, tagline: identity.tagline,
    nav: navHtml(page.file), mobileNav: mobileNavHtml(page.file),
    quoteHref: page.quoteHref, languageSwitch,
    searchButton: page.search ? '<button class="icon-button" id="searchToggle" aria-label="Search products" title="Search"><span aria-hidden="true">⌕</span></button>' : "",
  });
}

function buildFooter(identity) {
  return applyTpl(footerTpl, {
    brand: identity.brand, brandMark: identity.brandMark, tagline: identity.tagline, legalName: identity.legalName,
    tel: identity.tel, email: identity.email, footerLinks: footerLinks(),
  });
}

async function buildPage(page, locale) {
  const tx = translator(locale.id);
  const identity = localeIdentity(locale);
  const sourcePath = `src/pages/${page.file}`;
  try { await fs.access(path.join(root, sourcePath)); }
  catch { throw new Error(`Missing source page: ${sourcePath}`); }
  const source = applyTpl(await read(sourcePath), editableValues(locale, identity));
  const main = transformMain(source, page.file, identity);
  const catalog = localeCatalogs.get(locale.id);
  const reviewMessage = locale.id === "zh-Hans"
    ? "简体中文翻译草稿 — 发布前须由公司负责人或专业译者审核。"
    : "Bản dịch tiếng Việt đang ở dạng nháp — cần được công ty hoặc biên dịch viên chuyên nghiệp duyệt trước khi xuất bản.";
  const reviewBanner = locale.id !== defaultLocale.id && !catalogReadyForProduction(catalog)
    ? `<div class="translation-review-banner" role="status">${reviewMessage}</div>`
    : "";
  let html = `<!doctype html>\n<html lang="${locale.htmlLang}">\n  ${buildHead(page, locale, tx, identity)}\n  <body>\n    ${reviewBanner}\n    ${buildHeader(page, locale, tx, identity)}\n    ${main}\n    ${buildFooter(identity)}\n    <script src="products-data.js"></script>\n    <script src="script.js"></script>\n  </body>\n</html>\n`;
  html = translateHtml(html, tx);
  html = localizeAssetPaths(html, locale);
  await write(localePagePath(locale, page), html);
}

for (const locale of locales) {
  for (const page of pages) await buildPage(page, locale);
  const identity = localeIdentity(locale);
  const translations = Object.fromEntries(catalogMap(locale.id));
  const clientData = [
    ["WR_PRODUCTS", products], ["WR_SITE", identity], ["WR_COLORS", colors],
    ["WR_FINISHES", finishes], ["WR_EDGES", edges], ["WR_RESOURCES", resources],
    ["WR_PARTNERS", partners], ["WR_APPLICATIONS", applications], ["WR_COMPLIANCE", compliance],
    ["WR_FACTORY", factory], ["WR_PROJECTS", projects], ["WR_NEWS", news],
    ["WR_FAQ", faq], ["WR_COMPANY", company], ["WR_COMPANIES", companies], ["WR_I18N", translations],
    ["WR_LOCALE", { id: locale.id, htmlLang: locale.htmlLang, domain: locale.domain, draft: !catalogReadyForProduction(localeCatalogs.get(locale.id)) }],
  ].map(([name, value]) => `window.${name} = ${JSON.stringify(value, null, 2)};`).join("\n");
  const dataPath = locale.outputDir ? `${locale.outputDir}/products-data.js` : "products-data.js";
  await write(dataPath, `${clientData}\n`);
}

function sitemapXml(items) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.flatMap((locale) => pages.map((page) => `  <url><loc>${localeUrl(locale, page)}</loc></url>`)).join("\n")}\n</urlset>\n`;
}

const whiterockLocales = locales.filter((locale) => isPublicLocale(locale) && locale.domain === config.productionDomain);
const optimaLocale = locales.find((locale) => locale.domain === config.secondaryDomain);
await write("sitemap.xml", sitemapXml(whiterockLocales));
await write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /assets.html\nDisallow: /asset-loader.js\nDisallow: /admin/\nSitemap: ${config.productionDomain}/sitemap.xml\n`);
if (optimaLocale) {
  await write(`${optimaLocale.outputDir}/sitemap.xml`, sitemapXml(isPublicLocale(optimaLocale) ? [optimaLocale] : []));
  await write(`${optimaLocale.outputDir}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /assets.html\nDisallow: /asset-loader.js\nDisallow: /admin/\nSitemap: ${optimaLocale.domain}/sitemap.xml\n`);
}

console.log(`Built ${pages.length * locales.length} public pages across ${locales.length} locales and 2 domains using ${contentSource.status.mode}.`);
