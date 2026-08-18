const mediaForm = document.querySelector("#mediaForm");
const mediaProvider = document.querySelector("#mediaProvider");
const mediaApiKey = document.querySelector("#mediaApiKey");
const mediaQuery = document.querySelector("#mediaQuery");
const mediaCategory = document.querySelector("#mediaCategory");
const mediaGrid = document.querySelector("#mediaGrid");
const mediaStatus = document.querySelector("#mediaStatus");

const KEY_PREFIX = "wr_media_key_";
const CACHE_PREFIX = "wr_media_cache_";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

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
  "fashion",
  "brand",
];

const providerPolicy = {
  pixabay: "Pixabay image search is ready.",
  pexels: "Pexels image search is ready.",
  unsplash: "Unsplash image search is ready.",
};

function setMediaStatus(message, tone = "") {
  if (!mediaStatus) return;
  mediaStatus.textContent = message;
  mediaStatus.className = `media-status ${tone}`.trim();
}

function getStoredKey(provider) {
  return localStorage.getItem(`${KEY_PREFIX}${provider}`) || "";
}

function storeKey(provider, key) {
  if (key) localStorage.setItem(`${KEY_PREFIX}${provider}`, key);
}

function cacheKey(provider, query, category) {
  return `${CACHE_PREFIX}${provider}_${category}_${query.toLowerCase().trim()}`;
}

function getCached(provider, query, category) {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey(provider, query, category)) || "null");
    if (!cached || Date.now() - cached.time > CACHE_TTL_MS) return null;
    return cached.items;
  } catch (error) {
    return null;
  }
}

function setCached(provider, query, category, items) {
  localStorage.setItem(cacheKey(provider, query, category), JSON.stringify({ time: Date.now(), items }));
}

function isSafeCommercialCandidate(item) {
  const haystack = `${item.title || ""} ${item.alt || ""} ${item.tags || ""} ${item.photographer || ""}`.toLowerCase();

  // Copyright gate:
  // 1. Reject obvious copyrighted-source, editorial, watermark, and people/model/person terms.
  // 2. Keep product/factory results as "candidate" media until a human confirms the image truly matches WHITEROCK usage.
  // 3. This metadata check does not replace legal review; it prevents accidental obvious-risk imports.
  return !blockedTerms.some((term) => haystack.includes(term));
}

async function searchPixabay(key, query) {
  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", query);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", "24");
  url.searchParams.set("orientation", "horizontal");
  const res = await fetch(url);
  if (!res.ok) throw new Error("Pixabay request failed");
  const data = await res.json();
  return (data.hits || []).map((item) => ({
    id: `pixabay-${item.id}`,
    provider: "Pixabay",
    title: item.tags || "Pixabay image",
    alt: item.tags || "Commercial-use image from Pixabay",
    image: item.webformatURL,
    full: item.largeImageURL,
    source: item.pageURL,
    photographer: item.user,
    photographerUrl: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
    tags: item.tags,
    license: "Pixabay content license, commercial use allowed",
  }));
}

async function searchPexels(key, query) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "24");
  url.searchParams.set("orientation", "landscape");
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) throw new Error("Pexels request failed");
  const data = await res.json();
  return (data.photos || []).map((item) => ({
    id: `pexels-${item.id}`,
    provider: "Pexels",
    title: item.alt || "Pexels image",
    alt: item.alt || "Commercial-use image from Pexels",
    image: item.src.large,
    full: item.src.original,
    source: item.url,
    photographer: item.photographer,
    photographerUrl: item.photographer_url,
    tags: item.alt || "",
    license: "Pexels license, commercial use allowed",
  }));
}

async function searchUnsplash(key, query) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "24");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
  if (!res.ok) throw new Error("Unsplash request failed");
  const data = await res.json();
  return (data.results || []).map((item) => ({
    id: `unsplash-${item.id}`,
    provider: "Unsplash",
    title: item.alt_description || item.description || "Unsplash image",
    alt: item.alt_description || "Commercial-use image from Unsplash",
    image: item.urls.regular,
    full: item.urls.full,
    source: item.links.html,
    downloadLocation: item.links.download_location,
    photographer: item.user?.name || "Unsplash photographer",
    photographerUrl: item.user?.links?.html || "https://unsplash.com",
    tags: `${item.alt_description || ""} ${item.description || ""}`,
    license: "Unsplash license, commercial use allowed with API attribution requirements",
  }));
}

async function triggerUnsplashDownload(item) {
  const key = getStoredKey("unsplash");
  if (!key || !item.downloadLocation) return;
  await fetch(item.downloadLocation, { headers: { Authorization: `Client-ID ${key}` } });
}

function renderMedia(items) {
  if (!mediaGrid) return;
  if (!items.length) {
    mediaGrid.innerHTML = '<p class="empty-state">No approved candidates found. Try a more specific stone-related search.</p>';
    return;
  }

  mediaGrid.innerHTML = items
    .map(
      (item) => `
        <article class="media-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" />
          <div class="media-card-body">
            <p class="eyebrow">${item.provider}</p>
            <h3>${item.title}</h3>
            <p>${item.license}</p>
            <p>Photo by <a href="${item.photographerUrl}" target="_blank" rel="noopener">${item.photographer}</a></p>
            <div class="media-actions">
              <a class="button small" href="${item.source}" target="_blank" rel="noopener">Open Source</a>
              <button class="button primary small" type="button" data-copy="${item.id}">Copy HTML</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

let currentItems = [];

async function runSearch(event) {
  event.preventDefault();
  const provider = mediaProvider.value;
  const query = mediaQuery.value.trim();
  const category = mediaCategory.value;
  const key = mediaApiKey.value.trim() || getStoredKey(provider);

  if (!key) {
    setMediaStatus("Please enter an official API key for this provider.", "is-error");
    return;
  }
  if (!query) {
    setMediaStatus("Please enter a stone-related search term.", "is-error");
    return;
  }

  storeKey(provider, key);
  setMediaStatus(`Searching ${providerPolicy[provider]}`);

  const cached = getCached(provider, query, category);
  if (cached) {
    currentItems = cached;
    renderMedia(currentItems);
    setMediaStatus(`Loaded ${cached.length} image candidates.`, "is-success");
    return;
  }

  try {
    let items = [];
    if (provider === "pixabay") items = await searchPixabay(key, query);
    if (provider === "pexels") items = await searchPexels(key, query);
    if (provider === "unsplash") items = await searchUnsplash(key, query);
    currentItems = items.filter(isSafeCommercialCandidate);
    setCached(provider, query, category, currentItems);
    renderMedia(currentItems);
    setMediaStatus(`Found ${currentItems.length} image candidates.`, "is-success");
  } catch (error) {
    setMediaStatus(`${error.message}. Check API key, quota, or browser CORS limits.`, "is-error");
  }
}

function providerChanged() {
  const provider = mediaProvider.value;
  mediaApiKey.value = getStoredKey(provider);
  setMediaStatus(providerPolicy[provider]);
}

mediaForm?.addEventListener("submit", runSearch);
mediaProvider?.addEventListener("change", providerChanged);

mediaGrid?.addEventListener("click", async (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;
  const item = currentItems.find((candidate) => candidate.id === copyButton.dataset.copy);
  if (!item) return;
  if (item.provider === "Unsplash") await triggerUnsplashDownload(item);

  const html = `<figure class="sourced-media">
  <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">
  <figcaption>${item.provider} photo by <a href="${item.photographerUrl}">${item.photographer}</a>. Source: <a href="${item.source}">${item.source}</a>.</figcaption>
</figure>`;

  await navigator.clipboard.writeText(html);
  setMediaStatus("HTML copied. Attribution/source link is included.", "is-success");
});

providerChanged();
