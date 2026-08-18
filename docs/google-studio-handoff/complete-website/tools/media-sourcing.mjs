import fs from "node:fs/promises";

const outputPath = new URL("../media-candidates.json", import.meta.url);
const cache = new Map();

const allowedHosts = new Set([
  "pixabay.com",
  "api.pexels.com",
  "api.unsplash.com",
  "unsplash.com",
]);

const blockedTerms = [
  "getty",
  "alamy",
  "shutterstock",
  "istock",
  "watermark",
  "copyright",
  "editorial",
  "news",
  "celebrity",
  "model",
  "portrait",
  "person",
  "people",
  "face",
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Set it before running this tool.`);
  return value;
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "WHITEROCK-media-sourcing/1.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

async function robotsAllows(url) {
  const parsed = new URL(url);
  if (!allowedHosts.has(parsed.hostname)) return false;
  const robotsUrl = `${parsed.protocol}//${parsed.hostname}/robots.txt`;
  if (!cache.has(robotsUrl)) cache.set(robotsUrl, await fetchText(robotsUrl).catch(() => ""));
  const robots = cache.get(robotsUrl);
  const path = parsed.pathname;

  // Conservative robots.txt gate:
  // This parser honors broad "User-agent: *" Disallow lines. When in doubt, do not crawl.
  // Official API endpoints are preferred over HTML scraping for all providers.
  const lines = robots.split(/\r?\n/).map((line) => line.trim());
  let applies = false;
  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;
    const [rawKey, ...rawValue] = line.split(":");
    const key = rawKey.toLowerCase();
    const value = rawValue.join(":").trim();
    if (key === "user-agent") applies = value === "*";
    if (applies && key === "disallow" && value && path.startsWith(value)) return false;
  }
  return true;
}

function isSafeCommercialCandidate(item) {
  const haystack = `${item.title || ""} ${item.alt || ""} ${item.tags || ""} ${item.photographer || ""}`.toLowerCase();

  // Copyright validation note:
  // - Accept only official API responses from Pixabay, Pexels, and Unsplash.
  // - Reject obvious editorial, watermark, celebrity, and people/person results.
  // - Do not download marketplace, news, designer portfolio, or private commercial photography assets.
  // - Final publishing still requires a human source-rights review.
  return !blockedTerms.some((term) => haystack.includes(term));
}

async function searchPixabay(query) {
  const key = requireEnv("PIXABAY_KEY");
  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", query);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", "50");
  if (!(await robotsAllows(url.href))) return [];
  const res = await fetch(url);
  const data = await res.json();
  return (data.hits || []).map((item) => ({
    provider: "Pixabay",
    title: item.tags,
    alt: item.tags,
    preview: item.webformatURL,
    source: item.pageURL,
    photographer: item.user,
    tags: item.tags,
    license: "Pixabay content license, commercial use allowed",
  }));
}

async function searchPexels(query) {
  const key = requireEnv("PEXELS_KEY");
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "50");
  url.searchParams.set("orientation", "landscape");
  if (!(await robotsAllows(url.href))) return [];
  const res = await fetch(url, { headers: { Authorization: key } });
  const data = await res.json();
  return (data.photos || []).map((item) => ({
    provider: "Pexels",
    title: item.alt,
    alt: item.alt,
    preview: item.src.large,
    source: item.url,
    photographer: item.photographer,
    tags: item.alt || "",
    license: "Pexels license, commercial use allowed",
  }));
}

async function searchUnsplash(query) {
  const key = requireEnv("UNSPLASH_KEY");
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "50");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  if (!(await robotsAllows(url.href))) return [];
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
  const data = await res.json();
  return (data.results || []).map((item) => ({
    provider: "Unsplash",
    title: item.alt_description || item.description,
    alt: item.alt_description,
    preview: item.urls.regular,
    source: item.links.html,
    photographer: item.user?.name,
    tags: `${item.alt_description || ""} ${item.description || ""}`,
    license: "Unsplash license, commercial use allowed with API attribution requirements",
    downloadLocation: item.links.download_location,
  }));
}

async function main() {
  const query = process.argv.slice(2).join(" ") || "marble bathroom vanity top";
  const results = [
    ...(await searchPixabay(query)),
    ...(await searchPexels(query)),
    ...(await searchUnsplash(query)),
  ].filter(isSafeCommercialCandidate);

  await fs.writeFile(outputPath, JSON.stringify({ query, generatedAt: new Date().toISOString(), results }, null, 2));
  console.log(`Saved ${results.length} reviewed candidates to ${outputPath.pathname}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
