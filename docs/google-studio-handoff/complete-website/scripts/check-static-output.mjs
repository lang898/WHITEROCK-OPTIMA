import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlRoots = [root, path.join(root, "zh"), path.join(root, "vi")];
const ignoredHtmlFiles = new Set(["assets.html"]);
const ignoreSchemes = /^(https?:|mailto:|tel:|sms:|whatsapp:|data:|#|javascript:)/i;
const problems = [];

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function htmlFiles(dir) {
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html") && !ignoredHtmlFiles.has(entry.name))
    .map((entry) => path.join(dir, entry.name));
}

function splitSrcset(value) {
  return value.split(",").map((part) => part.trim().split(/\s+/)[0]).filter(Boolean);
}

function normalizeRef(value, fromFile) {
  const clean = value.replace(/&amp;/g, "&").split("#")[0].split("?")[0];
  if (!clean || ignoreSchemes.test(clean)) return "";
  return path.resolve(path.dirname(fromFile), clean);
}

for (const dir of htmlRoots) {
  for (const file of await htmlFiles(dir)) {
    const html = await fs.readFile(file, "utf8");
    if (/\{\{[^}]+\}\}/.test(html)) problems.push(`${path.relative(root, file)} contains an unresolved template token.`);
    const attrs = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)].map((match) => match[1]);
    const srcsets = [...html.matchAll(/\bsrcset=["']([^"']+)["']/gi)].flatMap((match) => splitSrcset(match[1]));
    for (const ref of [...attrs, ...srcsets]) {
      const target = normalizeRef(ref, file);
      if (target && !(await exists(target))) problems.push(`${path.relative(root, file)} references missing file: ${ref}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Static output check passed: local links and asset references resolve.");
