# HANDOFF — WHITEROCK B2B Website (read this fully before changing anything)

You are taking over a mature, working project. The previous agent rebuilt parts from an
older baseline once and silently dropped finished work (the visual refinement layer),
which then had to be re-applied by hand. Do not repeat that mistake: **this package is
the single source of truth. Never rebuild from an older zip or from memory.**

## 1. What this is

A zero-server static B2B website for **WHITEROCK LIMITED**, a Vietnam stone manufacturer
(marble, granite, quartz, engineered stone) selling vanity tops, countertops, and stone
furniture to North American and global buyers.

Stack: vanilla HTML/CSS/JS · custom static build (`scripts/build-site.mjs`, templates in
`src/partials` + `src/pages`, content in `data/*.json`) · Decap CMS at `/admin` (GitHub
backend, OAuth via the Cloudflare Worker in `oauth-worker/`) · GitHub Actions FTP deploy
to GoDaddy (`.github/workflows/deploy.yml`, secrets: FTP_SERVER / FTP_USERNAME /
FTP_PASSWORD / FTP_TARGET_DIR; build output goes to `./dist/` via `npm run build:deploy`).

Build & verify locally:
```
npm install
WR_SKIP_ASSET_PIPELINE=1 node scripts/build-site.mjs   # fast build, 18 pages, exit 0
npm run build                                           # full build incl. image pipeline
```
The site must always build offline from local `data/*.json` (mode "local-json").

## 2. Non-negotiable rules (owner-approved; do not relax)

1. **Honest imagery.** Product images without a real photo use labeled illustrative
   renders: visible caption "Illustrative render — not actual product", alt text contains
   "illustrative render", label is driven by the data flag `imageType` ("render" vs
   "photo") — uploading a real photo via the CMS must auto-remove the label. The factory
   page uses line drawings (`assets/equipment/*.svg`) or real photos ONLY — never
   synthetic/stock "factory" photos. Never scrape marketplace/competitor images (1688,
   Alibaba, etc.). Decorative/texture imagery only from official Pixabay/Pexels/Unsplash/
   Openverse APIs (CC0/commercial), logged in `assets/CREDITS.md`.
2. **Never invent company facts.** Capacity numbers, certifications, project references,
   equipment brands are all `[confirm]` placeholders until the owner supplies them. Do
   not fill them with plausible values.
3. **Zero-server.** No Directus/database/Node runtime in production. It was added once
   and removed on the owner's decision. CMS = Decap + GitHub backend only.
4. **Keep finished work.** Diff before you replace. The visual refinement layer (see §3)
   and the feature modules (see §4) live at the END of `styles.css` / `script.js` — any
   regeneration of those files must preserve them.

## 3. Design system (already refined — protect it)

Base tokens in `styles.css` `:root`, plus an appended **"Refinement layer v2"** block:
brand green `--brand:#2f5f58` (primary buttons/accents), cooler paper `#f4f3f0`,
editorial type scale (tight-tracked serif display), specimen-tag eyebrows (hairline +
letterspaced green label), gallery-style cards with hover image zoom, short green rule
under section headings, dark footer `#161616`. Aesthetic direction: architectural,
gallery-like premium surface brand (benchmarks: Caesarstone, Cosentino, Salvatori — and
CN leaders 万里石/康利/环球 for trust-signal patterns). All motion respects
`prefers-reduced-motion`.

## 4. Feature modules already shipped (all E2E-tested with Playwright)

Appended at the end of `script.js` (+ matching CSS at end of `styles.css`):
- **Inquiry List (multi-SKU RFQ cart):** "Add to inquiry list" in the product modal →
  localStorage (`wr_inquiry_list`) → floating count badge → on contact page renders a
  removable list above the form and prefixes the message with all SKUs; clears on submit.
- **in/cm unit toggle** in the product modal specs (`#unitToggle`); resets per product
  via a MutationObserver on `#modalImage` src.
- **Back-to-top** button (appears after 700px scroll).
- **Count-up stats** (CN-style): hero/factory stat `<strong>` values matching
  `/^\d+(\+|%)?$/` animate on scroll into view.
- **Right-side quick-contact rail:** builds from `window.WR_SITE` (in `products-data.js`,
  generated from `data/site.config.json`): tel, email, Request-a-quote; a WhatsApp entry
  appears automatically once the owner replaces the TODO with a real number.
Earlier core: product grid/filter/search + accessible modal (Esc, focus trap, focus
return), color library with 3 filters + sample-kit builder (`wr_sample_colors`), RFQ
prefill via sessionStorage (`wr_inquiry`), Web3Forms submit with honeypot (access key
still `YOUR_WEB3FORMS_ACCESS_KEY` — owner to fill), grouped 6-item dropdown nav
(hover/focus-within/click, Esc/outside close).

## 5. Content model (all CMS-editable via admin/config.yml)

`data/`: site.config.json · products.json (per-SKU: specs, image, imageWebp, imageType,
techSheetPdf, relatedColors) · colors.json · finishes.json · edges.json ·
applications.json · pages.json · factory.json (stats/equipment/capabilities/qc/rnd/
packing/gallery) · compliance.json · lookbook.json · image-manifest.json.
Pages: 18 public pages incl. colors/finishes/applications/projects/news/faq/
certifications/sustainability/resources/partners/order. `assets.html` +
`asset-loader.js` are INTERNAL tools — excluded from nav/sitemap; robots disallows
`/admin/`, `/assets.html`.

## 6. Known open items

Owner-side (leave placeholders alone): all `[confirm]` data; real product/factory
photos; Web3Forms key; `admin/config.yml` repo + Worker URL; FTP secrets; WhatsApp
number; real project references & certificates (structures on projects.html /
certifications.html are honest "pending" states by design).
Engineering:
- `og:image` still points at a texture; a branded 1200×630 exists as
  `assets/brand/og-image.jpg` — verify wiring across pages.
- Unused legacy file `assets/materials/white-marble-texture.webp` can be deleted.
- `REVIEW-FOR-CLAUDE.md` / `WEBSITE-NOTES.md` contain the full change history — read them.

## 7. Suggested next work (priority order — research each before coding)

1. **EN/中文 bilingual toggle.** Biggest missing feature vs CN stone leaders. Research a
   clean static-i18n approach for this custom build (e.g. per-locale builds from the same
   templates: `/` EN + `/zh/` 中文, content strings moved into `data/i18n/*.json`,
   `hreflang` pairs, language switch in the header, CMS-editable translations). Do not
   machine-translate silently — generate a translation file the owner can review.
2. **Compare drawer** for products/colors (select 2–3, side-by-side specs table).
3. **Landmark-projects & honors wall** rendering: extend projects.html/certifications.html
   to render from `data/projects.json` / compliance.json once the owner supplies real
   records (keep the honest empty states until then).
4. **Lightbox/zoom** for lookbook & color detail images; skeleton loading for grids.
5. **Performance/SEO pass:** preload hero image, JSON-LD (Organization + Product),
   hreflang after i18n, Lighthouse ≥90 on all four categories without CLS regressions.
6. **Print-friendly spec sheets:** a print stylesheet for the product modal so buyers can
   save any SKU as a clean PDF before real techSheetPdf files exist.

## 8. Definition of done for any change

- `WR_SKIP_ASSET_PIPELINE=1 node scripts/build-site.mjs` → 18+ pages, exit 0.
- `node --check script.js` passes; no console errors on index/products/colors/contact.
- Existing E2E behaviors still work (inquiry list add→badge→contact prefill; unit
  toggle; dropdown nav keyboard access; color filters; sample kit).
- No new external runtime dependencies; site works fully offline.
- Refinement layer + feature modules still present at the end of styles.css/script.js.
- Update WEBSITE-NOTES.md with what changed.
