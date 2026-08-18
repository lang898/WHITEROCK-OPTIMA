# WHITEROCK Website Review Package

Please review this static B2B website refactor for WHITEROCK LIMITED against the requested acceptance criteria.

## Implemented

- Shared head, navigation/header, and footer partials.
- Central company settings, product catalog, editable page content, and lookbook data.
- Google Fonts restored for Inter and Libre Baskerville.
- Sharp production image pipeline with Pillow fallback.
- Optimized JPEG fallback and valid WebP variants with generated dimension manifest.
- Full-bleed stone hero, detailed material surfaces, and plausible product renders.
- Product render disclosure tied to `imageType`, not hard-coded per card.
- Decap CMS at `/admin/` for settings, products, page content, projects, and media.
- A color-first design library with material, color-family, and finish filters plus an up-to-four-color sample kit.
- CMS-managed finishes, edge profiles, resources/PDFs, compliance, distributor content, and application scenes.
- Conditional product/color technical sheet downloads and a dedicated distributor inquiry form.
- GitHub Actions build plus clean `dist/` FTP deployment to GoDaddy.
- GitHub-backed Decap CMS with a Cloudflare Worker OAuth handler.
- Factory page contains no photos or synthetic facility imagery.
- `/admin/`, `assets.html`, and `asset-loader.js` excluded from sitemap and search indexing.

## Automated Checks

- Eighteen public pages generated without unresolved template fields.
- Eleven products generated from `data/products.json`.
- All public HTML images are local and include width/height.
- 48 WebP files have valid WebP signatures.
- No `whiterockstone.com/wp-content` references remain in public pages or product data.
- Factory page contains zero `<img>` elements and retains line-icon equipment visuals.
- CSS color tokens are preserved; key foreground/background combinations pass WCAG AA.
- Browser checks confirmed 3 finish cards, 6 edge profiles, 6 resources, 3 application scenes, and a working partner form with no console errors.
- Color filtering, sample-kit state, product/color modals, render labels, and conditional PDF buttons were exercised successfully.
- Decap uses the GitHub backend; the OAuth Worker auth redirect and state validation pass local integration checks.
- Factory now contains 7 data-driven stats, 6 equipment records, supplied SVG line drawings, capabilities, production flow, QC, R&D, sourcing, packing, compliance, and honest empty tour/gallery states.
- Projects, News, FAQ, Certifications, and Sustainability pages are present, CMS-managed, and included in the sitemap.
- The production build reads committed local `data/*.json` files and has no runtime database dependency.

## Review Carefully

- Validate Decap authentication after the real GitHub repository and Cloudflare Worker URLs replace the marked placeholders.
- Validate the first GoDaddy FTP deployment after the four GitHub Actions secrets are added.
- Official stock source pages were verified, but source downloads timed out. Current hero/material assets are original generated visuals and are documented honestly in `assets/CREDITS.md`.
- A Lighthouse CLI was not available in the workspace. Image dimensions, valid WebP signatures, local asset paths, keyboard modal behavior, and horizontal-overflow checks were completed; no numeric Lighthouse score is claimed.

## Owner TODOs

- Add the real Web3Forms access key.
- Add WhatsApp and social URLs.
- Confirm factory capacity, certifications, standards, and equipment counts.
- Upload real WHITEROCK product and project photography through `/admin/`.
- Confirm every `[confirm]` factory value before publication and add real machine/facility photography.
- Replace `OWNER/REPO` and `YOUR-WORKER` in `admin/config.yml`, then add GoDaddy FTP secrets in GitHub.

## Build

```powershell
npm install
npm run build:deploy
```
