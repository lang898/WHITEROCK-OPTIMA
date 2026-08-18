# Asset Report

## Completed

- Hero and material slots now use detailed local raster visuals instead of flat text cards.
- Product categories use plausible product renders with data-driven disclosure labels.
- The production pipeline uses Sharp and creates optimized JPEG + true WebP variants.
- Pillow remains a local fallback when Sharp is not installed.
- `data/image-manifest.json` records real image dimensions for stable layout.
- Every public HTML image has width and height attributes.
- All public image paths are local under `assets/`.
- Factory capability is shown with text, process flow, line drawings, and owner-supplied real factory/gallery photos where available; no synthetic factory or facility photos were generated.
- The color/design library, finishes, edges, and application scenes have local JPEG/WebP visuals and data-driven disclosure labels.
- Product and color PDF buttons are conditional; starter PDFs are generated now and can be replaced with owner-approved final documents later.
- Factory capability is now driven by `data/factory.json` with seven stats, six equipment records, supplied line drawings, processing capabilities, QC, R&D, sourcing, packing, certification status, and empty real-media slots.
- Projects, News, FAQ, Certifications, and Sustainability pages are CMS-managed and contain no fabricated project claims.

## Awaiting Real WHITEROCK Photography

- All current product catalog SKUs still use illustrative renders.
- Lookbook fallback items are illustrative renders until owner project photos are uploaded.
- Real packing, samples, completed products, installations, and showroom images are still needed.
- The hero and material visuals are original generated imagery, not owner-supplied material photography.
- All current color swatches, finish references, edge references, and application scenes await owner-approved real photography where available.
- Application scenes are illustrative design directions and must not be presented as completed projects.
- Owner-supplied factory photographs may be added later only if WHITEROCK owns and approves them; no synthetic facility image should be used.
- Factory gate/signage, full workshop, each machine running, QC/measuring, sample wall, packing, labeled crates, and container-loading photography are still required.
- The Heating Machine now has a dedicated line drawing; an owner photo can replace it later if available.
- Project case studies currently use clearly labeled illustrative planning studies until owner-approved references and photography are provided.

## Owner Data Still Required

- Web3Forms access key.
- WhatsApp number.
- Social profile links.
- Monthly capacity figures.
- Certifications and inspection standards.
- Equipment model and quantity details.
- Owner-approved replacements for the generated starter catalog, care, warranty, Prop 65, silica-safety, certification, and product/color technical PDFs.
- Factory area, staff, line count, capacity, markets, on-time percentage, machine models/counts/precision, tolerances, AQL, R&D team/software, sample lead time, traceability, and load plans.

## Verification

- 48 WebP files verified with valid `RIFF....WEBP` signatures.
- Public pages contain no `whiterockstone.com/wp-content` image references.
- `sitemap.xml` excludes `/admin/`, `assets.html`, and `asset-loader.js`.
- `robots.txt` disallows all three internal paths.
- In-app browser checks completed at 1200 px and the natural 811 px app viewport; the latter reported equal `scrollWidth` and `clientWidth` on all new public pages.
- Color filtering, sample selection, color/product modals, render disclosure, conditional PDF visibility, and the Decap login shell were exercised without console errors.
- Factory and all five enrichment pages were exercised at a 304 px browser viewport with equal scroll/client widths and no console errors.
- A dedicated Lighthouse CLI was not available in this workspace, so no Lighthouse score is claimed. Structural CLS checks passed: every static image has explicit width and height and dynamic modal images have stable dimensions.

## 2026-07-07 Launch Fill-In

- Generated distinct v3 illustrative product renders for every current SKU.
- Generated three clearly labeled project-planning study renders; these are not completed project claims.
- Generated starter product spec-sheet PDFs for every SKU.
- Generated starter color technical PDFs for every color in the design library.
- Generated starter Resources PDFs for catalog, care, warranty, certification index, Prop 65 notice, and crystalline-silica safety.
- Added a heating-machine line drawing so every equipment slot has either a real supplied photo or a line drawing.
- Updated data files so buttons for spec-sheet downloads and resource downloads are visible.

## 2026-07-07 Gap Fill-In Pass

- Generated two editorial news-card images for the sample-approval and RFQ-drawing buyer guides.
- Wired News cards to render article images from `data/news.json`.
- Replaced public `[confirm]` / `TODO` factory and compliance copy with professional pending-verification language.
- Added `CONTENT-GAPS.md` to separate generated launch content from owner-required factual inputs.

