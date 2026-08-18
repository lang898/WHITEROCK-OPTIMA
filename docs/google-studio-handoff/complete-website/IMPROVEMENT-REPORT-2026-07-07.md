# WHITEROCK Improvement Report - 2026-07-07

This update targets an estimated 30% experience lift by improving buyer clarity, RFQ conversion, CMS maintainability, and QA coverage without changing the zero-server GoDaddy architecture.

## What Changed

- Added `data/buyer-journey.json` as the editable source for buyer routing and conversion content.
- Added homepage **Fast Start** cards for samples, quotes, and distributor inquiries.
- Added homepage **Buyer Routing** cards for distributors, builders, hospitality/project buyers, and fabricators/designers.
- Added homepage trust proof points focused on sample approval, drawing-based fabrication, QC, and documents.
- Added product-page **Product Selection Guide** cards and a quote-readiness checklist.
- Added direct **Add to inquiry** buttons to every product card, reducing the path from product discovery to RFQ.
- Added color-page **Popular Color Routes** shortcut cards for White, Grey, Black, and Beige families.
- Added contact-page quote preparation panel with the same RFQ checklist.
- Replaced hard-coded JSON-LD with config-driven Organization, WebSite, and Breadcrumb structured data.
- Added `npm run check` using `scripts/check-static-output.mjs` for generated-page link and asset validation.
- Exposed all new conversion content in `/admin` under **Editable Page Content -> Buyer Journey & Conversion Content**.

## QA Completed

- `node scripts/build-site.mjs` passed.
- `node scripts/sync-i18n-catalogs.mjs` passed and registered new strings for review.
- `node scripts/verify-i18n.mjs` passed.
- `node scripts/check-static-output.mjs` passed.
- `node scripts/prepare-deploy.mjs` passed.
- Browser QA at desktop width: home, products, colors, and contact showed no horizontal overflow.
- Browser QA at 360px mobile width: home, products, colors, and contact showed no horizontal overflow.
- Deployment output includes `/admin` and excludes `assets.html`.

## Remaining Owner Tasks

- Replace `TODO_WEB3FORMS_ACCESS_KEY` in `data/site.config.json`.
- Replace `OWNER/REPO` and `https://YOUR-WORKER.workers.dev` in `admin/config.yml`.
- Review Chinese and Vietnamese draft translation strings before publishing those locales.
- Upload real product/factory photos when available; keep `imageType` accurate.
