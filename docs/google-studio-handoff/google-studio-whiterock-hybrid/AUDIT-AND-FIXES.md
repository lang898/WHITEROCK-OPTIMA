# WHITEROCK Hybrid Audit and Fixes

## 2026-08-26: Structure, Visual System, and Core Architecture

This pass intentionally covers application structure, code quality, visual consistency, and core frontend architecture only. Content and claim verification were not part of this review.

### Routing and page identity

- Replaced the view-only `useState('home')` behavior with a centralized history-based route map in `src/routes.ts`.
- Public views now have stable paths such as `/products/`, `/colors/`, `/factory/`, and `/contact/`; the admin has `/admin/`.
- Header navigation uses real `href` values while retaining fast client-side transitions through `history.pushState`.
- Back/forward navigation is synchronized with `popstate`, and old `#view` links are migrated to the equivalent clean path.
- Added `public/.htaccess` so direct requests and browser refreshes fall back to `index.html` on Apache/GoDaddy hosting.

### Per-route SEO

- Added `src/components/PageSeo.tsx` to manage route-specific `document.title`, meta description, canonical URL, robots directives, and Open Graph metadata.
- Each indexable route emits appropriate `WebPage`, `AboutPage`, `CollectionPage`, or `ContactPage` structured data.
- The home route adds `Organization` and `WebSite` nodes; internal routes add breadcrumbs.
- The admin route explicitly emits `noindex, nofollow` and no public structured data.
- Removed the single static JSON-LD payload from `index.html` so it cannot conflict with the current route.

### Bundle architecture and resilience

- Converted all eleven route views to `React.lazy()` imports with a shared `Suspense` loading state.
- Converted RFQ, product, color, communications, and social-share modals to conditional lazy imports.
- `AdminView.tsx` now builds as its own `AdminView-*.js` chunk and its UI code is absent from the initial entry bundle.
- Split lightweight locale/site configuration into `src/data/site.ts` so the application shell does not eagerly import the complete catalog data barrel.
- Added a top-level reusable error boundary with a clear page-recovery action.

### Visual consistency and maintainability

- Reused the established local Inter and Libre Baskerville font assets from `complete-website/assets/fonts/`.
- Body/interface text now uses Inter; editorial headings and the brand mark use Libre Baskerville.
- Added reusable section, intro, eyebrow, information-pill, media, modal, action, display-type, contact-rail, and route-loading classes to `src/index.css`.
- Consolidated 54 repeated long Tailwind combinations across the homepage, public views, and modal components while preserving the existing layout, color tokens, and visual direction.
- All non-hero images now use `loading="lazy"`; the hero remains eager and high-priority.

### Verification

```text
npx tsc --noEmit
PASS: zero TypeScript errors

DISABLE_HMR=true npm run build
PASS: 1725 modules transformed; no chunk-size warning
```

The previous build produced one approximately 597 KB JavaScript bundle. The new production output has a 255.54 KB entry bundle, with separate chunks for Home (90.66 KB), Admin (49.85 KB), Factory (30.89 KB), and the remaining pages/modals (each approximately 5-14 KB). This is a material reduction in initial JavaScript and isolates the administration surface from public first load.

Browser checks against the production preview confirmed:

- `/products/` opens directly and survives refresh without a 404.
- In-app navigation updates the pathname, title, canonical, and page content together.
- `/colors/` and `/admin/` open directly.
- The admin title and `noindex, nofollow` directive are route-specific.
- The production output includes `.htaccess` for GoDaddy/Apache history fallback.

## 2026-08-28: Brand System, Buyer Workflows, and Vietnam-Only Scope

This pass replaces the mixed Google Studio/legacy visual layer with one WHITEROCK system and materially restructures the homepage, catalog, comparison, and RFQ journeys. The site remains English and Vietnamese only. No Chinese locale was added.

### Unified design system

- Rebuilt `src/index.css` around one token set: WHITEROCK green `#234637`, paper `#fbfbf8`, deep ink `#17231f`, local Inter body type, and local Libre Baskerville display type.
- Standardized compact 3-4 px radii, shadow levels, spacing, type scale, focus states, and 44 px mobile touch targets.
- Removed the legacy Apple card, pill-button, gradient-text, and segmented-control styling at the source.
- Added semantic `wr-*` component classes instead of structural overrides. Automated scan result: `!important = 0`, structural `nth-child`/`first-of-type` selectors `= 0`, Apple legacy selectors `= 0`.

### Editorial homepage and catalogs

- Reworked the homepage into an immersive factory-led narrative using owner-supplied Vietnam media and the confirmed 20+ years, 20,000 m2 factory, and 100,000+ m2 annual capacity figures.
- Added a responsive owner-supplied finished-stone hero, confirmed metrics, material/product storytelling, real factory strips, buying steps, and a direct RFQ close.
- Rebuilt Products and Colors with editorial intros, persistent desktop filters, mobile filter controls, better image framing, honest render labels, and clearer product specifications.
- Generated responsive 720 px and 1280 px WebP variants for six owner-supplied Vietnam factory photos through `npm run images:owner`.

### Buyer tools

- Added global search across products, colors, and materials with keyboard dismissal and direct result navigation.
- Added a 2-3 item comparison tray and comparison dialog for product/color specifications.
- Added a persistent inch/mm preference with grouped dimension conversion across cards, comparison, and detail dialogs.
- Rebuilt the RFQ cart with quantity adjustment, remove, clear-all, buyer details, and a mandatory review step before submission.
- Kept honest fallback behavior: Web3Forms is used only when configured, otherwise the form prepares a transparent email handoff instead of presenting a false success state.

### Scope and content hygiene

- Removed all OPTIMA, Yunfu, Chinese factory, dual-base, related contact, and related photo references from React components, JSON data, public media, legacy HTML templates, and the asset manifest.
- The site now presents one company and one manufacturing location: WHITEROCK LIMITED in Binh Phuoc, Vietnam.
- Re-ran the prior truth-fix scan for Section 301, C/O Form, cUPC, whiterocksurfaces, fixed tolerance strings, and Unsplash hotlinks; no results remain in TSX or JSON sources.

### Browser and build verification

- Verified at 1200 px and 390 px: no horizontal overflow, responsive navigation, 44 px controls, global search, product opening, inch/mm conversion, two-item comparison, RFQ quantity/review flow, and English/Vietnamese switching.
- Verified all source `<img>` elements include loading behavior and explicit dimensions; the hero image alone is eager/high-priority.
- The final production Lighthouse run scored Performance 92, Accessibility 100, Best Practices 100, and SEO 100. LCP was 2.8 s, CLS 0.042, and TBT 10 ms.
- The production build keeps `AdminView` in its own lazy chunk. Public routes remain split, while the homepage is eager to improve LCP.

### Google AI dependency audit

- No source file imports `@google/genai`, calls Gemini, or reads `GEMINI_API_KEY`.
- Removed the unused Google AI dependency, key example, AI Studio README content, and unused Express/dotenv/tsx server scaffolding.
- The project is a static Vite build with no API key or server runtime requirement. Cloudflare Pages can publish `dist/` using `npm run build` with no environment variables.

## 2026-08-28: Final Channel, Hero, and Deployment Cleanup

- Removed the WeChat modal, icon, quick-contact entry, contact-page channel, share option, footer link, admin setting, type field, and site-config value. A repository scan confirms no WeChat text or code remains in the application.
- Replaced the homepage equipment/video hero with owner-supplied `factory-06`, showing finished stone tops under review. Responsive 720 px and 1280 px WebP variants remain in use.
- Kept the owner-supplied cutting-equipment image `factory-02` in the Factory page/gallery rather than presenting it as the homepage quality image.
- Corrected the HTML image preload from `factory-02` to the actual `factory-06` LCP asset. Lighthouse now confirms the LCP image is discoverable from the initial document, eager, and high priority.
- Production build: 1,723 modules transformed; public routes remain split and `AdminView` remains a separate 49.80 KB chunk.
- Production Lighthouse: Performance 92, Accessibility 100, Best Practices 100, SEO 100; LCP 2.8 s, CLS 0.042, TBT 10 ms.
