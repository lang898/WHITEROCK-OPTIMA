# WHITEROCK Website Prototype Notes

This is a multi-page static prototype for a redesigned independent WHITEROCK commercial website.

## What Is Included

- Homepage with WHITEROCK positioning for North America and global buyers: `index.html`.
- Dedicated product catalog page with category filters and product detail modal: `products.html`.
- Dedicated materials page for marble, granite, quartz, and engineered marble: `materials.html`.
- Dedicated factory page with production flow, equipment list, QC, and export process: `factory.html`.
- Dedicated lookbook page grouped by product type: `lookbook.html`.
- Internal approved-media sourcing workbench: `assets.html`.
- Dedicated contact and inquiry page: `contact.html`.
- Expanded SKU-style catalog content based on comparable North American product categories.
- Material sections for marble, granite, quartz, and engineered marble.
- Factory capability section using the existing WHITEROCK production claims.
- Wholesale/export program section covering samples, quotes, MOQ, lead time, QC, and packaging.
- Lookbook gallery using existing images from whiterockstone.com.
- Inquiry form that opens an email to `lynn@whiterockstone.com`.
- Responsive layout for desktop and mobile.

## Current Data Sources

The content and images are based on public data from the existing WordPress/WooCommerce site:

- Brand: WHITEROCK / WHITEROCK MARBLE & GRANITE
- Website: https://www.whiterockstone.com
- Factory Address: Quoc Lo 14, Doi 2, Ap3, Xa Dong Tien, Huyen Dong Phu, Tinh Binh Phouc, Vietnam
- Tel / Fax: +84 0798 858 220
- Email: lynn@whiterockstone.com
- Product categories found: Bathroom Vanity Top, Marble, Granite, Quartz, Engineered Marble

## Recommended Next Data To Add

- Confirmed WHITEROCK product names and SKUs.
- Exact standard size tables for vanity tops and countertops.
- Edge profiles.
- Available colors and material codes.
- Confirmed MOQ, lead time, packaging method, and container quantities.
- Certification, inspection, and warranty language.
- Real social links.
- Downloadable catalog PDF.
- Real equipment photos for bridge cutting machines, profiling machines, CNC, edge polishing machines, surface polishing machines, and heating machine.
- More confirmed factory photos, workshop photos, inspection photos, packing photos, and container loading photos.

## Draft Product Lines Added

- WR-VT24 Single Sink Vanity Top
- WR-VT31 Carrara White Vanity Top
- WR-VT49 Quartz Vanity Top
- WR-VT61D Double Sink Vanity Top
- WR-KT Calacatta Quartz Countertop
- WR-KT Honed Natural Stone Countertop
- WR-CB Solid Surface Backsplash
- WR-FR Round Marble Coffee Table
- WR-FR Rectangular Outdoor Stone Table
- WR-HT Hotel Vanity & Apartment Program
- WR-SM Material Sample Kit

## How To View

Open `index.html` in a browser, then use the navigation to switch between pages.

## Photo Accuracy Rule

Only images from the existing WHITEROCK website media library are currently used. Equipment photo positions are intentionally marked as upload-needed because no clearly verified individual machine photos were available from the current public website data. Do not fill those with generic stock photos.

1688 marketplace images are not treated as free commercial-use assets. They may be used for internal market reference only unless WHITEROCK owns the photo or receives written supplier permission.

## Media Sourcing Tool

Added files:

- `assets.html` - internal image sourcing workbench.
- `asset-loader.js` - browser-based official API client for Pixabay, Pexels, and Unsplash.
- `tools/media-sourcing.mjs` - optional Node batch tool that exports `media-candidates.json`.

The tool intentionally:

- Calls Pixabay, Pexels, and Unsplash official APIs instead of crawling private sites.
- Requires user-provided official API keys; no API keys are hardcoded.
- Stores keys only in the local browser storage when used from `assets.html`.
- Caches search results for 24 hours.
- Filters obvious copyright/watermark/editorial/people/model terms.
- Includes source, photographer, platform, and license notes in copied HTML.
- Triggers the Unsplash download endpoint before copying Unsplash image HTML.

The tool does not:

- Scrape 1688 product pages or supplier photo albums.
- Download news photos, designer portfolio images, branded commercial photography, or marketplace images.
- Prove legal rights automatically. It produces candidates for human review.

Optional batch run:

```powershell
$env:PIXABAY_KEY="your-key"
$env:PEXELS_KEY="your-key"
$env:UNSPLASH_KEY="your-key"
node .\tools\media-sourcing.mjs "marble bathroom vanity top"
```

The batch tool reads each allowed host's `robots.txt` before requesting API URLs and writes reviewed candidates to `media-candidates.json`.

---

## Revision Applied (Claude review, this version)

Fixed without needing new assets:

- Removed all internal/builder commentary that was leaking into the public pages (factory data-note, "states / confirmed from website copy", "more photos when you provide them", "photos come from existing website media", "WHITEROCK-owned website photos", "Upload exact equipment photo").
- Unified the primary call-to-action to "Request a Quote" (header, hero, product modal); form submit button is now "Send Inquiry".
- Standardized the company entity to "WHITEROCK LIMITED" (footer + contact). CONFIRM the exact registered legal name.
- Fixed province spelling: "Binh Phouc" -> "Binh Phuoc".
- Replaced the mailto inquiry form with a real backend (Web3Forms): async submit, loading/success/error states, honeypot anti-spam, graceful email fallback. ACTION REQUIRED: paste your free Web3Forms access key in place of YOUR_WEB3FORMS_ACCESS_KEY (index.html + contact.html).
- Product detail modal: Esc-to-close, focus moves into modal on open and returns to the card on close, focus trap for keyboard users.
- Clicking "Request a Quote" in a product modal now carries that SKU into the inquiry form (pre-fills product interest + message), including across pages.
- Fixed material fields so Engineered Marble and Quartz are no longer conflated as one material; multi-material made-to-order options are written clearly.
- Added favicon (inline SVG "WR"), Open Graph + Twitter cards, and canonical URLs to all 6 pages.
- Added lazy-loading + async decoding to non-critical images (hero stays eager).
- Darkened muted text color for WCAG AA contrast on the light background.

## Still Required Before Launch (needs your input / real assets)

- HIGH: unique, self-owned photo for every SKU. Several SKUs currently reuse the same image, which reads as a fake catalog.
- HIGH: verify the furniture images are WHITEROCK's own and not from other retailers (filenames reference "loomlan" and a generic "Genuine-Marble-Coffee-Table"). Replace any third-party images — copyright risk.
- Self-host all images (currently hot-linked from whiterockstone.com; they will break if that site changes).
- Paste the Web3Forms access key (see above).
- Replace the placeholder og:image with a branded 1200x630 image; set the real production domain in canonical/og:url.
- Real equipment/workshop/QC/packing/container-loading photos for the factory page.
- Add: About/Company page, Certifications/Compliance page (ISO, Sedex/BSCI, Prop 65, NSF, test reports), Shipping/Incoterms + payment terms, FAQ, privacy policy.
- Confirm exact material per SKU; add 2cm vs 3cm thickness standards on the materials page; add a Quartz-vs-Engineered-Marble comparison table.
- Add analytics, sitemap.xml, robots.txt, and a WhatsApp/WeChat contact entry.
---

## Visual fix (merged from WHITEROCK-website-fixed.zip)
- Corrected the build transform so local v2 assets are never remapped to legacy text-card placeholders.
- Marble material cards and the contact hero now retain `white-marble-v2` after every rebuild.
- Legacy v1 placeholder assets can be removed once the final reference audit confirms zero usage.

---

## EN / 简体中文 static-i18n foundation (2026-07-04)

Implemented the owner-approved per-locale static architecture without adding a runtime dependency:

- English remains at `/`; Simplified Chinese builds to `/zh/` with `lang="zh-Hans"`.
- The same 18 source templates now generate 36 local-json pages. No page templates, stylesheets, or feature scripts were duplicated for Chinese.
- Added reciprocal, fully qualified `hreflang="en"`, `hreflang="zh-Hans"`, and `x-default` links when the Chinese locale is approved or explicitly previewed. Canonicals are self-referential per locale.
- Added a paired-page header language link. English production pages hide it while the Chinese catalog is still a draft; `/zh/` always links back to the matching English page.
- Added `data/locales.json` and reviewable catalogs at `data/i18n/site.en.json` and `data/i18n/site.zh-Hans.json`. Every entry has a stable ID, English source, translation, and review status.
- The Chinese catalog is deliberately marked `draft`. Starter terminology is explicitly labeled AI-assisted and requires owner/professional review; untranslated entries remain empty instead of being silently filled.
- `npm run i18n:sync` refreshes the review queue while preserving existing translations. `npm run verify:i18n` checks all 36 outputs, local links/assets, catalog parity, unresolved template tokens, and protected CSS/JS markers.
- Decap now exposes the translation catalogs as an EN / zh-Hans `multiple_files` collection.
- Deployment copies `/zh/` only after `data/i18n/site.zh-Hans.json` has `_meta.reviewStatus: "approved"`. Until then, the deploy payload remains the 18 English pages and cannot publish a half-reviewed locale by accident.
- Production readiness now requires more than the top-level flag: every Chinese catalog row must contain a translation and have `status: "approved"`. The build, deploy preparation, and i18n verifier all enforce this so an accidental metadata toggle cannot publish a partial locale.
- For local review, run the build with `WR_PREVIEW_DRAFT_LOCALES=1`; this exposes the language switch, draft banner, 36 sitemap URLs, and all Chinese preview pages.
- Appended locale-switch, review-banner, and system CJK font styles after the existing refinement and feature-module CSS. The refinement layer and shipped feature modules remain intact.
- Appended a dictionary-driven DOM localization module after the existing JavaScript feature modules so client-rendered product/color/modal content can use the same review catalog.
- Fixed a pre-existing console error in the inquiry-list button: the delayed reset now retains the button reference instead of reading `event.currentTarget` after the event dispatch ends.
- Wired `og:image` as an absolute production URL for both locale paths.
- Removed template placeholders and technical meta values from the generated translation queue, leaving 774 reviewable human-facing strings; the 76 starter Chinese terms remain explicitly marked draft and the other entries remain empty for owner/professional translation.

No `[confirm]` values, company facts, image-type disclosures, CMS backend decisions, or factory-image rules were changed.

---

## WHITEROCK / OPTIMA dual-domain, three-language expansion (2026-07-04)

Implemented the owner-confirmed domain and company structure:

- `https://www.whiterockstone.com/` is the English canonical site.
- `https://www.whiterockstone.com/vi/` is the Vietnamese locale.
- `https://www.optimastone.com/` is the Simplified Chinese canonical site; the source review build remains under `/zh/` so it can be checked locally before deployment.
- Every approved locale emits reciprocal absolute `hreflang` links and a matching-page EN / 中文 / VI header switch. Cross-domain links are intentional.
- The build now generates 54 pages from the same 18 templates across three locales and two domains. No runtime dependency was added.
- Deployment packaging creates separate `dist/whiterockstone.com/` and `dist/optimastone.com/` roots. Draft locales remain excluded by default; set `WR_INCLUDE_DRAFT_LOCALES=1` only for review packages.
- Added CMS-editable company records in `data/companies.json` for WHITEROCK COMPANY LIMITED / CONG TY TNHH WHITEROCK and OPTIMA STONE LIMITED / YUNFU OPTIMA STONE COMPANY LIMITED / 云浮欧普石材有限公司.
- Updated the contact and about pages to show both companies, with Vietnam presented first on EN/VI and China presented first on zh-Hans.
- Contact names, tax code, address, telephone numbers, and email capitalization match the owner-supplied records. Older public-site contact details were superseded.
- Added owner-supplied real factory photography and video from both archives. Every production image is captioned by location; no synthetic factory image was introduced.
- Replaced four equipment drawings with supplied China-factory machine photographs while retaining `[confirm]` for unverified quantities and specifications.
- Used the owner's authorized public WHITEROCK information for the published 20+ years, approximately 20,000 m² Vietnam facility, and 100,000+ m² annual capacity statements.
- Extended the review catalogs to 821 strings. Chinese remains a 76-string AI-assisted starter draft; Vietnamese has 55 starter translations. Both require owner/professional review before production publication.
- Added Vietnamese to the Decap translation collection and made both company records CMS-editable.
- Made image optimization idempotent for supplied factory media and safe on Windows when replacing previously optimized JPEGs.
- Preserved the refinement layer and all shipped feature modules at the ends of `styles.css` and `script.js`; new multilingual/company styles were appended.

Verification completed after the change:

- `Built 54 public pages across 3 locales and 2 domains using local-json.`
- `Verified 54 generated locale pages, local references, catalog parity, and protected feature markers.`
- `node --check script.js` passes.
## Compare drawer (Claude, this pass)
- Added a Compare feature for products AND colors: "Compare" toggle on each card (max 3,
  same-kind only), bottom drawer with removable chips, "Compare now" opens a side-by-side
  spec matrix (products: union of spec keys + material; colors: material/family/finishes/
  thickness). Esc/backdrop closes; capture-phase handler prevents card-open conflicts.
- New UI strings registered in all three i18n catalogs (EN approved; zh-Hans/vi added as
  DRAFT with starter translations for owner review): Compare/Compare now/Clear/Added/
  Comparison table/Close comparison/Color family/Finishes/Thickness/Material. _meta
  counts synced; verify-i18n passes.
- E2E-tested on EN dist and zh review dist (buttons translate to 对比/立即对比 via the
  runtime dictionary + MutationObserver). Note: dist/ is produced by prepare-deploy.mjs;
  draft locales require WR_INCLUDE_DRAFT_LOCALES=1 (review builds only).

## Real photography integration (Claude, this pass)
Owner supplied WHITEROCK.7z (31 files, Vietnam) + OPTIMA.7z (69 files, Yunfu China) and
approved use of whiterockstone.com media. Curated and integrated (all optimized to
max-1600px jpg+webp):
- WR-VT24 now uses a REAL photo (assets/products/WR-VT24-photo.*, imageType:"real") —
  render label auto-removed, verified in browser. Other SKUs stay as labeled renders
  because photo/SKU material match could not be confirmed; do not swap without checking.
- Lookbook: 5 real Vietnam vanity-top production photos (assets/gallery/vietnam/vanity-*).
- Factory gallery: +6 Vietnam warehouse/export-packing photos and +9 China (Yunfu)
  workshop/polishing/slab/packing photos (assets/gallery/{vietnam,china}/factory-*),
  appended to data/factory.json gallery (now 22 entries).
- Remaining ~75 source photos are NOT in the repo (curation kept the package lean); the
  originals stay with the owner for future use.
TODO for owner/Codex: copy the legacy REAL product photos from the old WordPress media
(whiterockstone.com/wp-content/uploads/2023/03/ET61CW-*.jpg, ET73CW-*.jpg) into
assets/products and map them as real photos (suggested: ET61CW→WR-VT31, ET73CW→WR-VT61D),
setting imageType:"real". Sandbox network could not reach that domain.

## Real-photo and responsive QA corrections (Codex, 2026-07-06)

Audited the supplied real-photo package in-browser and against the source data, then made the following evidence-based corrections:

- Restored WR-VT24 to the existing labeled illustrative render. The newly assigned `WR-VT24-photo.*` asset depicts a factory interior rather than an identifiable WR-VT24 product, so publishing it as a real product photo would violate the image-honesty rule.
- Rewrote all five Vietnam lookbook titles and alt text to describe only what is visibly supported by each image (production floor, machining area, factory yard, fabricated components, and factory entrance). The previous blanket “engineered stone vanity top” claim was not supported by three of the five photographs.
- Moved the full desktop header collapse breakpoint from 1180px to 1320px so language, search, and quote controls no longer clip at common 1280px desktop widths.
- Changed the 22-image factory tour to a full-width gallery after its introduction, eliminating the long empty left column produced by the former two-column layout.
- Improved compare controls with item-specific accessible names, table caption and column scopes, product-only render disclosures, focus trapping, and focus return after closing the modal.
- No runtime dependency was added. Existing refinement and feature modules remain intact; changes were scoped edits plus appended CSS refinements.
## Photo enhancement + lightbox (Claude, this pass)
- Batch-enhanced all 20 gallery photos (per-channel autocontrast to remove factory color
  cast, +brightness/contrast/saturation, unsharp mask) and center-cropped to a uniform
  3:2 so the galleries read as a curated set. Honest photo editing only — no content
  fabrication. Re-exported jpg+webp (max 1600px).
- Added an accessible lightbox for gallery/lookbook images: click/Enter to open, arrows
  to navigate, Esc/backdrop to close, focus return; captions from alt text. E2E-tested
  (22 zoomable images on the factory page), no float overlaps at 390px, header OK at 1280.
- Acknowledged Codex's correction: the WR-VT24 "real photo" I assigned last pass was a
  factory interior; reverting it to the labeled render was right per the honesty rule.
- FINDING for next pass: Google Fonts is loaded from fonts.googleapis.com — blocked in
  mainland China, so optimastone.com typography will fail/slow for its target buyers.
  Self-host Inter + Libre Baskerville woff2 under assets/fonts with @font-face.

## Lightbox QA and photo-tone corrections (Codex, 2026-07-06)

- Narrowed lightbox activation to the intended factory and lookbook grids so future classes containing the word `gallery` are not made interactive by accident.
- Added localized, item-specific accessible names to every zoomable image; added `aria-haspopup="dialog"`, visible focus treatment, focus trapping, Escape close, arrow navigation, and focus return.
- The lightbox now shows the concise visible figure caption first, plus a translated image counter, instead of exposing the longer alt text as the primary visual caption.
- Registered the new lightbox interface strings in the EN / zh-Hans / vi review catalogs. Chinese and Vietnamese entries remain draft and must follow the existing human-review gate.
- Applied a small, reversible display-only saturation/contrast correction to the enhanced gallery files. The supplied batch-enhanced pixels already contain some clipped highlights and sharpening halos; the best future fix is a fresh, gentler export from the owner originals rather than another destructive edit.
- Corrected the package identity to `whiterock-optima-static-site` and renamed the mangled Chinese deployment-guide filename to `DEPLOYMENT-GUIDE-ZH.md`.

## Large-scale finish pass (Claude, this pass) — remaining roadmap completed
- Fonts SELF-HOSTED (7 woff2 via @fontsource, assets/fonts/fonts.css, preload + swap);
  all Google Fonts references removed from every built page — fixes mainland-China
  loading for optimastone.com and removes the last external runtime dependency.
- JSON-LD Organization schema injected in the shared head (name/alternateName OPTIMA,
  url, email, tel, VN address, sameAs optimastone.com).
- Print spec sheets: @media print hides chrome/floats and prints the open product modal
  as a clean one-page sheet; body.modal-open mirror added via MutationObserver.
- E2E: local fonts verified loading with zero external font requests; print emulation
  hides header and statics the modal card. Build 54 pages + verify-i18n green.

## Major enrichment overhaul and imagery gap-fill (Codex, 2026-07-08)

- Filled the previously unexecuted imagery/content gaps in one pass: `data/applications.json`
  now has 10 application inspiration scenes, `data/colors.json` now has 24 surface
  directions, `data/faq.json` now has 15 buyer questions, and `data/news.json` now has
  three guide/draft posts with cover images.
- Generated original AI application, sustainability, heating-equipment, and draft-news
  visuals. They are labeled as illustrative or "Application inspiration" in the UI and
  logged in `assets/CREDITS.md`; none are presented as real WHITEROCK projects,
  products, facilities, or verified equipment.
- Re-audited the owner-supplied China gallery and mapped real photos to equipment cards:
  `assets/gallery/china/factory-07.*` for Infrared Bridge Cutting, `factory-09.*` for
  CNC Processing, and `factory-05.*` for Profiling. Heating Machine remains a labeled
  illustrative image until a real owner photo is supplied.
- Added the owner-supplied Vietnam packing photos `assets/gallery/vietnam/factory-04.*`,
  `factory-05.*`, and `factory-06.*` to the order page beside the packing/shipping flow.
- Reworked the homepage around a muted looping factory-tour video hero, trust band, dual
  production-base section, featured color scroller, product-category cards, real-photo
  factory strip with existing lightbox support, buying workflow, applications carousel,
  compliance callout, and RFQ form.
- Added material process photos, an about-page dual-base SVG map, partner-program
  benefits and indicative tier table, sustainability illustrative visuals, and related
  products inside the color detail modal.
- Extended the CMS configuration so the owner can edit new color captions/related
  products, application captions/alt text, news image disclosures, and factory equipment
  image type/captions.

REPLACE-WHEN-CONFIRMED / owner follow-up:

- Replace all `imageType:"render"` product photos with owner-owned real product photos
  when exact SKU/material match is confirmed.
- Replace `assets/equipment/heating-machine-illustrative.*` with a real WHITEROCK-owned
  heating-machine photo and set `imageType:"real"` in `data/factory.json`.
- Replace generated application scenes with real installed-project photos only after
  project permission, location, material, scope, and claims are owner-approved.
- Confirm production staff, production-line count, export markets, on-time delivery, and
  any unpublished certification/test-report claims before converting TODO/Pending values
  into final numbers.
- Review the 24 generated digital color swatches against physical samples; upload real
  sample photos and set `imageType:"real"` where appropriate.
