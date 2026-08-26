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
- Converted RFQ, product, color, WeChat, and social-share modals to conditional lazy imports.
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
