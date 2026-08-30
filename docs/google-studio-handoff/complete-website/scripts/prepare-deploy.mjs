import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const whiterockDist = path.join(dist, "whiterockstone.com");
const optimaDist = path.join(dist, "optimastone.com");
const includeDrafts = process.env.WR_INCLUDE_DRAFT_LOCALES === "1";
const publicExtensions = new Set([".css", ".gif", ".html", ".ico", ".jpeg", ".jpg", ".js", ".mp4", ".pdf", ".png", ".svg", ".webp", ".woff", ".woff2", ".xml", ".txt", ".yml"]);

if (path.dirname(dist) !== root || path.basename(dist) !== "dist") throw new Error(`Refusing to clean unexpected deployment directory: ${dist}`);

async function copyFileTo(relativeSource, targetRoot, relativeTarget = relativeSource, rewrite) {
  const source = path.join(root, relativeSource);
  const target = path.join(targetRoot, relativeTarget);
  await fs.mkdir(path.dirname(target), { recursive: true });
  if (rewrite) {
    const content = await fs.readFile(source, "utf8");
    await fs.writeFile(target, rewrite(content));
  } else {
    await fs.copyFile(source, target);
  }
}

async function copyPublicTreeTo(relativeDirectory, targetRoot, relativeTargetDirectory = relativeDirectory) {
  const sourceDirectory = path.join(root, relativeDirectory);
  for (const entry of await fs.readdir(sourceDirectory, { withFileTypes: true })) {
    const relativeSource = path.join(relativeDirectory, entry.name);
    const relativeTarget = path.join(relativeTargetDirectory, entry.name);
    if (entry.isDirectory()) await copyPublicTreeTo(relativeSource, targetRoot, relativeTarget);
    else {
      const extension = path.extname(entry.name).toLowerCase();
      const normalized = relativeSource.replaceAll("\\", "/");
      const isProductionPng = normalized === "assets/brand/favicon.png";
      if (entry.name.includes(".optimized.")) continue;
      if (publicExtensions.has(extension) && (extension !== ".png" || isProductionPng)) await copyFileTo(relativeSource, targetRoot, relativeTarget);
    }
  }
}

function catalogApproved(catalog) {
  const strings = catalog?.strings || [];
  return catalog?._meta?.reviewStatus === "approved" && strings.length > 0 && strings.every((item) => item.translation && item.status === "approved");
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(whiterockDist, { recursive: true });
await fs.mkdir(optimaDist, { recursive: true });

const pages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html"));
const commonFiles = ["styles.css", "script.js"];
for (const target of [whiterockDist, optimaDist]) {
  for (const file of commonFiles) await copyFileTo(file, target);
  await copyPublicTreeTo("assets", target);
}

for (const file of [...pages, "products-data.js", "sitemap.xml", "robots.txt"]) await copyFileTo(file, whiterockDist);
await copyFileTo("admin/index.html", whiterockDist);
await copyFileTo("admin/config.yml", whiterockDist);

const manifest = JSON.parse(await fs.readFile(path.join(root, "data/locales.json"), "utf8"));
const published = ["whiterockstone.com:en"];
for (const locale of (manifest.locales || []).filter((item) => item.outputDir)) {
  const catalog = JSON.parse(await fs.readFile(path.join(root, `data/i18n/site.${locale.id}.json`), "utf8"));
  if (!catalogApproved(catalog) && !includeDrafts) continue;
  if (locale.domain === "https://www.optimastone.com") {
    const rewriteRootPaths = (content) => content.replaceAll('../assets/', 'assets/').replaceAll('../styles.css', 'styles.css').replaceAll('../script.js', 'script.js');
    for (const file of [...pages, "products-data.js", "sitemap.xml", "robots.txt"]) {
      const rewrite = file.endsWith(".html") ? rewriteRootPaths : undefined;
      await copyFileTo(`${locale.outputDir}/${file}`, optimaDist, file, rewrite);
    }
    published.push(`optimastone.com:${locale.id}${catalogApproved(catalog) ? "" : " (review draft)"}`);
  } else {
    await copyPublicTreeTo(locale.outputDir, whiterockDist, locale.urlPath || locale.outputDir);
    published.push(`whiterockstone.com:${locale.id}${catalogApproved(catalog) ? "" : " (review draft)"}`);
  }
}

console.log(`Prepared domain deployments: ${published.join(", ")}.`);