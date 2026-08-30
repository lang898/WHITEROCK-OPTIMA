# WHITEROCK Claude Review Package - 2026-07-08

This package contains the WHITEROCK / OPTIMA static B2B website source and current generated public files for review and modification.

## What Changed In The Latest Pass

- Homepage now uses the owner-supplied factory tour video as a muted looping hero background.
- `data/applications.json` expanded to 10 application inspiration scenes.
- `data/colors.json` expanded to 24 color directions with illustrative swatches.
- `data/faq.json` expanded to 15 buyer questions.
- `data/news.json` now has 3 guide/draft posts with cover images.
- Factory equipment cards all have media. Owner China photos are mapped to Bridge Cutting, CNC Processing, and Profiling; Heating remains a labeled illustrative image.
- Order page shows owner-supplied Vietnam packing photos.
- Materials, About, Partners, Sustainability, CMS fields, CREDITS, and WEBSITE-NOTES were updated.

## Architecture

- Static source pages: `src/pages/*.html`
- Shared partials: `src/partials/*.html`
- Site data: `data/*.json`
- Public styles and scripts: `styles.css`, `script.js`
- Build script: `scripts/build-site.mjs`
- Image optimization fallback: `scripts/optimize-images.py`
- CMS: `admin/config.yml` and `admin/index.html`

The public root HTML files are generated from `src/pages` and `data` by `scripts/build-site.mjs`.

## Important Rules To Preserve

- Keep the current static architecture: `src/partials`, `data/*.json`, `scripts/build-site.mjs`.
- Preserve CSS design tokens in `styles.css`.
- Extend the refinement layer and feature modules at the end of `styles.css` / `script.js`; avoid broad rewrites.
- Product renders must keep the visible `Illustrative render — not actual product.` label when `imageType:"render"`.
- Generated application scenes must not be presented as real WHITEROCK projects.
- Factory capability must use real owner photos or line icons only. Do not add synthetic factory/facility photos.
- `/admin`, `assets.html`, and `asset-loader.js` stay out of sitemap and public nav.
- Keep all images local under `/assets`; no external runtime image dependency.

## Baseline Commands

Run from the package root:

```bash
node scripts/sync-i18n-catalogs.mjs
node scripts/build-site.mjs
node scripts/verify-i18n.mjs
node scripts/check-static-output.mjs
node --check script.js
node --check scripts/build-site.mjs
```

Note: if `sharp` is unavailable, the build falls back to Pillow and can still generate real WebP files.

## Review Priorities

1. Visual QA on homepage, colors, products, factory, applications, order, partners, and contact.
2. Confirm all illustrative labels are visible and honest.
3. Improve copy only where it is buyer-facing and factual.
4. Keep any unconfirmed production numbers marked Pending / TODO.
5. If adding content fields, expose them in `admin/config.yml`.

## Owner Follow-up Items

- Replace generated product/application imagery with real owner-owned photos when available.
- Replace `assets/equipment/heating-machine-illustrative.*` with a real owner equipment photo.
- Review all generated color swatches against physical samples.
- Confirm staff, production-line count, export markets, on-time delivery, certifications, and any other pending facts before publishing as final claims.
