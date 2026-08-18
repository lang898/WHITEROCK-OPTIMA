# Google Studio Handoff Instructions - WHITEROCK Website

You are taking over the WHITEROCK / OPTIMA static B2B stone website.

## How to use these files

The owner cannot upload a ZIP. Please read these handoff files in order:

1. `01-GOOGLE-STUDIO-INSTRUCTIONS.md` - project brief, rules, expected output.
2. `02-WHITEROCK-CODE-BUNDLE.md` - source code with file boundaries.
3. `03-WHITEROCK-DATA-BUNDLE.json` - all editable JSON data, keyed by original path.
4. `04-WHITEROCK-ASSET-MATERIALS-MANIFEST.csv` - image/material/document inventory and usage notes.

If you modify the website, return changed files with their exact original paths. Do not return only prose suggestions.

## Project summary

WHITEROCK LIMITED is a Vietnam-based stone manufacturer selling marble, granite, quartz, engineered marble, vanity tops, countertops, furniture, and cut-to-size stone products to North American and global B2B buyers.

The current website is a static site with this architecture:

- Source templates: `src/pages/*.html`
- Shared partials: `src/partials/*.html`
- Editable data: `data/*.json`
- Build script: `scripts/build-site.mjs`
- Public CSS/JS: `styles.css`, `script.js`
- Admin CMS config: `admin/config.yml`
- Media: `assets/`

## Important rules

- Preserve the architecture: `src/partials`, `src/pages`, `data/*.json`, `scripts/build-site.mjs`.
- Preserve existing design tokens in `styles.css`.
- Extend, do not rewrite, the refinement layer and feature modules at the end of `styles.css` and `script.js`.
- Do not invent company facts, capacity numbers, certifications, test reports, or project claims.
- Keep pending/unconfirmed facts marked as Pending / TODO / owner confirmation required.
- Product images with `imageType:"render"` must show: `Illustrative render — not actual product.`
- Application scenes are inspiration only, not real WHITEROCK projects.
- Factory capability must use owner-supplied real photos or line icons only. Do not add synthetic factory/facility photos.
- The heating-machine image is illustrative and must stay labeled until replaced by an owner real photo.
- Keep all runtime images local under `/assets`.
- Keep `/admin`, `assets.html`, and `asset-loader.js` out of public nav and sitemap.

## Current major features

- 54-page multilingual/domain build workflow.
- Grouped dropdown navigation.
- Products catalog with modal, inquiry list, print spec sheet, compare drawer.
- Color library with 24 colors, filters, sample-kit builder, color detail modal.
- Applications page with 10 labeled inspiration scenes.
- Factory page with real owner-supplied factory photos, equipment cards, production flow, QC, packing.
- Order page with real Vietnam packing photos.
- Resources, partners, news, FAQ, sustainability, certifications, lookbook, projects.
- Decap CMS at `/admin`, GitHub backend setup documented in project files.

## Baseline commands

Run from project root:

```bash
node scripts/sync-i18n-catalogs.mjs
node scripts/build-site.mjs
node scripts/verify-i18n.mjs
node scripts/check-static-output.mjs
node --check script.js
node --check scripts/build-site.mjs
```

Note: if `sharp` is unavailable, the build can fall back to Pillow image optimization.

## Requested Google Studio role

Please review and improve the site as a polished B2B stone-manufacturer website. Focus on:

1. Buyer clarity and conversion.
2. Visual hierarchy and responsive polish.
3. Honest imagery and clear labels.
4. CMS-editable data structure.
5. Accessibility and SEO.
6. No external image dependency.

When returning changes, provide exact file paths and complete replacement content for modified files.
