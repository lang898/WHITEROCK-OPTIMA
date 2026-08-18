# WHITEROCK Website Migration

WHITEROCK is a static site built from shared HTML partials and local JSON. The public site runs on GoDaddy with no application server or database. Decap CMS writes changes to GitHub, GitHub Actions rebuilds the site, and FTP publishes the generated files.

## Project Structure

- `src/partials/` - the shared head, header/navigation, and footer.
- `src/pages/` - source markup for all public pages.
- `data/site.config.json` - company details, contact details, Web3Forms key, domain, favicon, and OG image.
- `data/products.json` - product catalog and image type flags.
- `data/colors.json`, `data/finishes.json`, and `data/edges.json` - design library content.
- `data/buyer-journey.json` - homepage buyer routing, Fast Start panel, product selection guide, color shortcuts, and RFQ checklist.
- `data/factory.json` - factory capability, equipment line drawings, QC, process, and owner-supplied media.
- `data/*.json` - remaining page, project, resource, compliance, news, FAQ, and gallery content.
- `admin/` - Decap CMS, published at `/admin/`.
- `oauth-worker/` - Cloudflare Worker used only for GitHub OAuth.
- `scripts/build-site.mjs` - builds HTML, client data, sitemap, and robots rules.
- `scripts/generate-complete-assets.py` - creates launch-ready illustrative renders, starter PDFs, and missing line drawings when owner assets are not ready yet.
- `scripts/prepare-deploy.mjs` - creates a clean `dist/` deployment directory.
- `scripts/check-static-output.mjs` - checks generated HTML for unresolved template tokens and missing local files.
- `.github/workflows/deploy.yml` - builds and FTP-deploys `dist/` to GoDaddy.
- `assets.html` and `asset-loader.js` - internal tools; never copied into `dist/`.

## Local Build

Install and build with Node 22:

```powershell
npm install
npm run build
npm run check
```

Create the exact GoDaddy upload payload:

```powershell
npm run build:deploy
```

The public payload is written to `dist/`. It contains generated pages, optimized public assets, `styles.css`, `script.js`, `products-data.js`, `sitemap.xml`, `robots.txt`, and `/admin/`. It does not contain `src/`, `data/`, `scripts/`, repository files, or internal media tools.

## Launch-Ready Generated Assets

When WHITEROCK-owned photos or final PDFs are not ready yet, run:

```powershell
python scripts/generate-complete-assets.py
npm run build:deploy
```

This creates:

- distinct illustrative product renders for every current SKU under `assets/products/`;
- starter product spec sheets under `assets/resources/products/`;
- starter color technical sheets under `assets/resources/colors/`;
- starter catalog, care, warranty, certification, Prop 65, and silica-safety PDFs under `assets/resources/`;
- illustrative project-planning study images under `assets/projects/`;
- a missing equipment line drawing where needed.

Generated product and project visuals must keep `imageType: "render"`. The public site then shows the visible illustrative-render label automatically. When a real WHITEROCK-owned photo is uploaded later, change `imageType` to `"real"` in `/admin/`; the build removes the render label automatically.

## Configure GitHub CMS Login

### 1. Create The Repository

1. Create the GitHub repository and use `main` as the production branch.
2. Push this project to the repository.
3. Edit `admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_OWNER/YOUR_REPOSITORY
  branch: main
  base_url: https://YOUR-WORKER.workers.dev
  auth_endpoint: auth
```

`repo` must exactly match the GitHub owner and repository. `base_url` is the Worker origin without `/auth`, `/callback`, or a trailing slash.

### 2. Create The GitHub OAuth App

In GitHub, open **Settings -> Developer settings -> OAuth Apps -> New OAuth App**.

- Application name: `WHITEROCK Website CMS`
- Homepage URL: the Cloudflare Worker origin
- Authorization callback URL: `https://YOUR-WORKER.workers.dev/callback`

Save the Client ID and generate a Client Secret. Never commit either value.

### 3. Deploy The Cloudflare Worker

The Worker is serverless and fits the Cloudflare Workers free tier for normal CMS use.

```powershell
cd oauth-worker
npm install
npx wrangler login
npx wrangler secret put OAUTH_CLIENT_ID
npx wrangler secret put OAUTH_CLIENT_SECRET
npm run deploy
```

Before deployment, check `oauth-worker/wrangler.toml`:

- `SITE_URL` must be the live WHITEROCK origin, normally `https://www.whiterockstone.com`.
- Keep `GITHUB_REPO_PRIVATE = "1"` for a private repository. Change it to `"0"` only for a public repository.

Open the Worker URL after deployment. It should show `WHITEROCK Decap OAuth worker is ready.` Then place that origin in `admin/config.yml` and push the change.

### 4. Add Editors

In the GitHub repository, open **Settings -> Collaborators** and invite each editor. Editors need write access and sign into `/admin/` with their own GitHub accounts. There is no website email/password login and no Google login.

Removing a collaborator removes their ability to commit CMS changes. GitHub OAuth authorization can also be revoked from each user's GitHub application settings.

## Configure GoDaddy FTP Deployment

This workflow requires GoDaddy cPanel/Linux hosting, not GoDaddy Website Builder.

### 1. Get FTP Details

In GoDaddy, open the hosting dashboard and launch cPanel. Use **Files -> FTP Accounts** or the primary cPanel account to obtain:

- FTP host, often `ftp.your-domain.com`
- FTP username
- FTP password
- deployment directory, normally `/public_html/`

Confirm the correct web root in cPanel File Manager. The target must end with `/`.

### 2. Add GitHub Actions Secrets

In GitHub, open **Repository Settings -> Secrets and variables -> Actions -> New repository secret** and add:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_TARGET_DIR` with a value such as `/public_html/`

The workflow uses standard FTP on port 21. If the GoDaddy account requires explicit FTPS, change `protocol: ftp` to `protocol: ftps` and add the required port in `.github/workflows/deploy.yml`.

### 3. Deployment Flow

1. The owner edits content or uploads media at `/admin/`.
2. Decap commits the change to `main` in GitHub.
3. `.github/workflows/deploy.yml` runs `npm install` and `npm run build:deploy`.
4. Only `dist/` is synchronized to the GoDaddy target directory.
5. `/admin/` remains available on the live GoDaddy site.

Manual pushes to `main` follow the same pipeline. The workflow can also be started from the GitHub **Actions** tab with **Run workflow**.

## Editing Content

### Add Or Edit A Product

1. Open `/admin/` and choose **Products**.
2. Edit an existing item or add a product to the list.
3. Upload the image to `assets/products/` and set **Image Type** accurately.
4. Save the entry.

`imageType: "render"` adds the visible illustrative-render label and matching alt text. `imageType: "real"` removes that label automatically. Use `real` only for WHITEROCK-owned or approved photography.

### Edit Company Information

Open **Site Settings -> Company & Site Config**. This updates `data/site.config.json`, the single source for company name, address, contact details, social links, production domain, Web3Forms key, favicon, and OG image.

### Edit Buyer Journey And RFQ Guidance

Open **Editable Page Content -> Buyer Journey & Conversion Content**. This updates `data/buyer-journey.json`.

Use it to edit:

- homepage **Fast Start** cards;
- homepage buyer paths for distributors, builders, hospitality buyers, fabricators, and designers;
- product-page selection guide cards;
- quote-readiness checklist;
- color-family shortcut cards;
- contact-page preparation copy.

Keep these entries practical and buyer-facing. They should tell a B2B visitor what to prepare next, not repeat marketing copy.

### Add A Page

1. Add the body source to `src/pages/new-page.html`.
2. Add its metadata entry to the `pages` array in `scripts/build-site.mjs`.
3. Add it to the appropriate `navGroups` or `footerGroups` entry.
4. Add CMS-managed content fields if the page requires owner editing.
5. Run `npm run build:deploy` and verify the new file in `dist/`.

### Upload Photos And PDFs

Use the image or file field in the matching CMS collection. Media is committed under `assets/`. Product and illustrative image disclosure remains controlled by each item's `imageType` value.

Factory equipment remains represented by line drawings. Upload only real, owner-approved factory or machine photos to factory media fields.

## Public And Security Rules

- `/admin/`, `assets.html`, and `asset-loader.js` are excluded from `sitemap.xml` and disallowed in `robots.txt`.
- OAuth secrets stay in Cloudflare Worker secrets, never in GitHub or browser JavaScript.
- FTP credentials stay in GitHub Actions secrets, never in the workflow file.
- The production build reads committed `data/*.json` files offline.
- All public image paths are local under `assets/`.
- Generated root HTML and `dist/` should not be edited by hand; edit `src/`, `data/`, shared partials, or CMS content.

## Troubleshooting

- **CMS says repository not found:** verify `repo: OWNER/REPO`, collaborator access, and `GITHUB_REPO_PRIVATE`.
- **OAuth callback error:** the GitHub OAuth callback must exactly use the Worker origin plus `/callback`.
- **CMS popup never completes:** verify `SITE_URL` matches the live site origin, including `www` if used.
- **FTP deploy uploads to the wrong folder:** check `FTP_TARGET_DIR` in cPanel File Manager and keep the trailing `/`.
- **Site did not update:** inspect the latest GitHub Actions run, then confirm the changed file exists in `dist/` during the build step.

Official references:

- Decap OAuth proxy configuration: https://decapcms.org/docs/backends-overview/
- GitHub OAuth web flow: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
- Cloudflare Wrangler: https://developers.cloudflare.com/workers/wrangler/install-and-update/
- FTP Deploy Action: https://github.com/SamKirkland/FTP-Deploy-Action
