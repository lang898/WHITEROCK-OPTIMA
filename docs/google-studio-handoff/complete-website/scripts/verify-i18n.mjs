import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "data/locales.json"), "utf8"));
const pages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html")).sort();
const failures = [];

for (const locale of manifest.locales || []) {
  for (const page of pages) {
    const relative = locale.outputDir ? `${locale.outputDir}/${page}` : page;
    const absolute = path.join(root, relative);
    let html = "";
    try { html = await fs.readFile(absolute, "utf8"); }
    catch { failures.push(`Missing generated page: ${relative}`); continue; }
    if (!html.includes(`<html lang="${locale.htmlLang}">`)) failures.push(`Wrong html lang: ${relative}`);
    if (/\{\{\w+\}\}/.test(html)) failures.push(`Unresolved template token: ${relative}`);
    for (const match of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/gi)) {
      const raw = match[1].split(/\s+/)[0];
      if (!raw || /^(?:https?:|mailto:|tel:|#|data:)/i.test(raw)) continue;
      const clean = raw.split("#")[0].split("?")[0];
      if (!clean) continue;
      const target = path.resolve(path.dirname(absolute), clean);
      try { await fs.access(target); }
      catch { failures.push(`Broken local reference in ${relative}: ${raw}`); }
    }
  }
}

const catalogs = await Promise.all((manifest.locales || []).map(async (locale) => JSON.parse(await fs.readFile(path.join(root, `data/i18n/site.${locale.id}.json`), "utf8"))));
const baseIds = new Set((catalogs[0]?.strings || []).map((item) => item.id));
for (const catalog of catalogs.slice(1)) {
  const ids = new Set((catalog.strings || []).map((item) => item.id));
  for (const id of baseIds) if (!ids.has(id)) failures.push(`Missing translation ID ${id} in ${catalog?._meta?.locale}`);
  for (const id of ids) if (!baseIds.has(id)) failures.push(`Unexpected translation ID ${id} in ${catalog?._meta?.locale}`);
}

const baseById = new Map((catalogs[0]?.strings || []).map((item) => [item.id, item.source]));
for (const catalog of catalogs) {
  const strings = catalog?.strings || [];
  if (catalog?._meta?.totalStrings !== strings.length) failures.push(`Incorrect totalStrings in ${catalog?._meta?.locale}`);
  const translatedCount = strings.filter((item) => item.translation).length;
  if (catalog?._meta?.translatedStrings !== undefined && catalog._meta.translatedStrings !== translatedCount) failures.push(`Incorrect translatedStrings in ${catalog?._meta?.locale}`);
  for (const item of strings) {
    if (baseById.has(item.id) && baseById.get(item.id) !== item.source) failures.push(`Source mismatch for ${item.id} in ${catalog?._meta?.locale}`);
  }
  if (catalog?._meta?.reviewStatus === "approved") {
    const incomplete = strings.filter((item) => !item.translation || item.status !== "approved");
    if (incomplete.length) failures.push(`Approved locale ${catalog?._meta?.locale} still has ${incomplete.length} unapproved or empty strings`);
  }
}

const css = await fs.readFile(path.join(root, "styles.css"), "utf8");
const js = await fs.readFile(path.join(root, "script.js"), "utf8");
for (const marker of ["Refinement layer v2", "inquiry list / unit toggle / back-to-top", "right-side quick-contact rail", "bilingual locale switch"]) {
  if (!css.includes(marker)) failures.push(`Missing protected CSS marker: ${marker}`);
}
for (const marker of ["Inquiry List (multi-item RFQ cart)", "in/cm unit toggle", "right-side quick-contact rail", "static locale dictionary"]) {
  if (!js.includes(marker)) failures.push(`Missing protected JS marker: ${marker}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Verified ${pages.length * manifest.locales.length} generated locale pages, local references, catalog parity, and protected feature markers.`);
