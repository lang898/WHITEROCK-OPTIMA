import fs from "node:fs/promises";

const file = "script.js";
let s = await fs.readFile(file, "utf8");
const start = s.indexOf("const productGrid");
if (start < 0) throw new Error("Could not find productGrid marker");

s = `const products = Array.isArray(window.WR_PRODUCTS) ? window.WR_PRODUCTS : [];
const siteConfig = window.WR_SITE || {};

${s.slice(start)}`;

s = s.replace(
  `<img src="\${product.image}" alt="\${product.title}" loading="lazy" decoding="async" />`,
  `<figure class="product-visual"><picture><source srcset="\${product.imageWebp || product.image}" type="image/webp" /><img src="\${product.image}" alt="\${product.title}\${product.isIllustrative ? ' illustrative render' : ''}" width="\${product.imageWidth || 1200}" height="\${product.imageHeight || 900}" loading="lazy" decoding="async" /></picture>\${product.isIllustrative ? '<figcaption>Illustrative render — not actual product.</figcaption>' : ''}</figure>`,
);

s = s.replace(
  `document.querySelector("#modalImage").src = product.image;
  document.querySelector("#modalImage").alt = product.title;`,
  `document.querySelector("#modalImage").src = product.image;
  document.querySelector("#modalImage").alt = product.isIllustrative ? \`\${product.title} illustrative render\` : product.title;`,
);

s = s.replaceAll(
  "lynn@whiterockstone.com",
  '${siteConfig.email || "lynn@whiterockstone.com"}',
);

await fs.writeFile(file, s);
