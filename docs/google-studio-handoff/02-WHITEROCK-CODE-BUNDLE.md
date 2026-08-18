# WHITEROCK Code Bundle for Google Studio

This file concatenates key project code files. Each section starts with ## FILE: <path>.
If you modify a file, return the full replacement content and the exact path.


---

## FILE: package.json

```json
{
  "name": "whiterock-optima-static-site",
  "private": true,
  "engines": {
    "node": ">=20.9.0"
  },
  "scripts": {
    "build": "node scripts/build-site.mjs",
    "build:deploy": "npm run build && node scripts/prepare-deploy.mjs",
    "images": "node scripts/optimize-images.mjs",
    "check": "node scripts/check-static-output.mjs",
    "i18n:sync": "node scripts/sync-i18n-catalogs.mjs",
    "verify:i18n": "node scripts/verify-i18n.mjs"
  },
  "dependencies": {
    "@fontsource/inter": "^5.2.8",
    "@fontsource/libre-baskerville": "^5.2.10",
    "sharp": "^0.35.2"
  }
}

```

---

## FILE: src/partials/head.html

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{title}}</title>
  <meta name="description" content="{{description}}" />
  <link rel="icon" type="image/png" href="{{favicon}}" />
  <link rel="canonical" href="{{canonical}}" />
  {{hreflangLinks}}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="{{brand}}" />
  <meta property="og:title" content="{{title}}" />
  <meta property="og:description" content="{{description}}" />
  <meta property="og:url" content="{{canonical}}" />
  <meta property="og:image" content="{{ogImage}}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{title}}" />
  <meta name="twitter:description" content="{{description}}" />
  <meta name="twitter:image" content="{{ogImage}}" />
    <link rel="preload" href="assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="styles.css" />
  {{analyticsPlaceholder}}
  {{structuredData}}
  </head>

```

---

## FILE: src/partials/header.html

```html
<header class="site-header">
  <a class="brand" href="index.html" aria-label="{{brand}} home">
    <span class="brand-mark">{{brandMark}}</span>
    <span><strong>{{brand}}</strong><small>{{tagline}}</small></span>
  </a>
  <nav class="desktop-nav" aria-label="Main navigation">
    {{nav}}
  </nav>
  <div class="header-actions">
    {{languageSwitch}}
    {{searchButton}}
    <a class="button primary small" href="{{quoteHref}}">Request a Quote</a>
    <button class="menu-button" id="menuToggle" aria-label="Open menu" aria-controls="mobilePanel" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="mobile-panel" id="mobilePanel" aria-label="Mobile navigation" aria-hidden="true">{{mobileNav}}</nav>

```

---

## FILE: src/partials/footer.html

```html
<footer class="site-footer">
  <div>
    <a class="brand footer-brand" href="index.html">
      <span class="brand-mark">{{brandMark}}</span>
      <span><strong>{{brand}}</strong><small>{{tagline}}</small></span>
    </a>
    <p>Natural and engineered stone products for North America and international markets.</p>
  </div>
  <div class="footer-links">{{footerLinks}}</div>
  <div class="footer-contact">
    <span>Tel / Fax: {{tel}}</span>
    <a href="mailto:{{email}}">{{email}}</a>
    <span>© 2026 {{legalName}}</span>
  </div>
</footer>

```

---

## FILE: src/pages/index.html

```html
<main id="home">
      <section class="hero video-hero">
        <video class="hero-video" autoplay muted loop playsinline poster="assets/factory/vietnam-factory-exterior.jpg" aria-hidden="true">
          <source src="{{factoryTourVideo}}" type="video/mp4" />
        </video>
        <img class="hero-video-fallback" data-dynamic-image loading="eager" fetchpriority="high" decoding="async" src="assets/factory/vietnam-factory-exterior.jpg" alt="WHITEROCK Vietnam factory exterior" width="1200" height="900" />
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="eyebrow">{{homeHeroEyebrow}}</p>
          <h1>{{homeHeroTitle}}</h1>
          <p class="hero-copy">{{homeHeroCopy}}</p>
          <div class="hero-actions">
            <a class="button primary" href="colors.html">Explore Colors</a>
            <a class="button ghost" href="contact.html#inquiry">Request a Quote</a>
          </div>
          <div class="hero-stats" aria-label="Company highlights">
            <span><strong>20,000 m²</strong> Vietnam factory area</span>
            <span><strong>100,000+ m²</strong> published capacity</span>
            <span><strong>2 bases</strong> Vietnam + Yunfu, China</span>
          </div>
        </div>
      </section>

      <section class="trust-strip home-trust-band" aria-label="Buyer trust signals">
        <span>Export-ready packing</span>
        <span>Sample approval workflow</span>
        <span>Cut-to-size fabrication</span>
        <span>Owner-supplied factory media</span>
        <span>Trade program support</span>
      </section>

      <section class="section home-production-bases" aria-labelledby="production-bases-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">Two Production Bases</p>
          <h2 id="production-bases-title">Vietnam first, supported by Yunfu stone capability.</h2>
          <p>Give buyers a clear route from material direction to factory review, packed shipment, and repeat program planning.</p>
        </div>
        <div class="production-base-grid">{{productionBaseCards}}</div>
      </section>

      <section class="section featured-colors-band" aria-labelledby="featured-colors-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">Featured Colors</p>
          <h2 id="featured-colors-title">Shop by surface direction before choosing the product type.</h2>
          <p>Digital swatches are illustrative. Confirm final color, lot, finish, and thickness with physical samples before ordering.</p>
        </div>
        <div class="featured-color-scroller" aria-label="Featured WHITEROCK color directions">{{featuredColorStrip}}</div>
        <div class="section-footer-action"><a class="button primary" href="colors.html#sample-kit">Build a sample kit</a></div>
      </section>

      <section class="section product-category-section" id="products" aria-labelledby="category-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">Product Categories</p>
          <h2 id="category-title">Start from the buying program, then confirm material and fabrication.</h2>
        </div>
        <div class="category-feature-grid">{{productCategoryCards}}</div>
      </section>

      <section class="section home-factory-section" aria-labelledby="factory-strip-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">Factory Reality</p>
          <h2 id="factory-strip-title">Real owner-supplied photos from production, packing, and equipment areas.</h2>
          <p>No synthetic facility photos are used for factory capability. Equipment claims remain tied to owner-supplied media and confirmation-gated notes.</p>
        </div>
        <div class="factory-gallery home-factory-gallery">{{homeFactoryStrip}}</div>
        <div class="section-footer-action"><a class="button" href="factory.html">Review factory capability</a></div>
      </section>

      <section class="section how-buying-works" aria-labelledby="buying-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">How Buying Works</p>
          <h2 id="buying-title">A practical path for distributors, builders, and project buyers.</h2>
        </div>
        <div class="program-grid">
          <article><span>01</span><h3>Choose a direction</h3><p>Use colors, applications, and materials to narrow the look, finish, and price level your market needs.</p></article>
          <article><span>02</span><h3>Approve sample + drawing</h3><p>Confirm the physical sample, thickness, finish, edge, cutouts, dimensions, packaging, and target shipment route.</p></article>
          <article><span>03</span><h3>Fabricate + inspect</h3><p>Production follows approved drawings with dimensional checks, finish review, labeling, and buyer inspection options.</p></article>
          <article><span>04</span><h3>Pack + ship</h3><p>Products are protected with cartons, foam, crates, pallets, or A-frames according to SKU and shipment method.</p></article>
        </div>
      </section>

      <section class="section home-applications-section" aria-labelledby="applications-title">
        <div class="section-heading editorial-heading">
          <p class="eyebrow">Application Inspiration</p>
          <h2 id="applications-title">Room scenes for planning discussions, not project claims.</h2>
          <p>Use these generated mood scenes to discuss color families and product types before replacing them with real project photography.</p>
        </div>
        <div class="home-application-carousel">{{homeApplications}}</div>
        <div class="section-footer-action"><a class="button" href="applications.html">View all applications</a></div>
      </section>

      <section class="section compliance-callout">
        <div><p class="eyebrow">{{complianceEyebrow}}</p><h2>{{complianceTitle}}</h2></div>
        <article><h3>{{silicaTitle}}</h3><p>{{silicaCopy}}</p></article>
        <a class="button" href="resources.html">Review compliance resources</a>
      </section>

      <section class="section quote-section" id="inquiry">
        <div class="quote-copy">
          <p class="eyebrow">Request a Quote</p>
          <h2>Tell us what you need. We will prepare the right product path.</h2>
          <p>For faster quotation, include dimensions, material, edge profile, sink/cutout details, quantity, destination port, and any drawings or reference photos.</p>
          <div class="contact-card">
            <strong>{{siteLegalName}}</strong>
            <span>Factory: {{siteAddress}}</span>
            <a href="mailto:{{siteEmail}}">{{siteEmail}}</a>
            <a href="tel:{{siteTelHref}}">{{siteTel}}</a>
          </div>
        </div>
        <form class="inquiry-form" id="inquiryForm">
          <input type="hidden" name="access_key" value="{{web3FormsAccessKey}}" />
          <input type="hidden" name="subject" value="New WHITEROCK website inquiry" />
          <input type="hidden" name="from_name" value="WHITEROCK Website" />
          <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="form-row">
            <label>Name<input required name="name" autocomplete="name" /></label>
            <label>Email<input required type="email" name="email" autocomplete="email" /></label>
          </div>
          <div class="form-row">
            <label>Company<input name="company" autocomplete="organization" /></label>
            <label>Country / Region<input name="country" autocomplete="country-name" /></label>
          </div>
          <label>Product Interest
            <select name="interest">
              <option>Bathroom vanity tops</option>
              <option>Kitchen countertops</option>
              <option>Stone furniture</option>
              <option>Custom commercial project</option>
              <option>Material samples</option>
            </select>
          </label>
          <label>Project Details
            <textarea required name="message" rows="5" placeholder="Material, size, quantity, drawings, destination, timeline..."></textarea>
          </label>
          <button class="button primary" type="submit">Send Inquiry</button>
          <p class="form-note" id="formNote">We typically reply within one business day.</p>
        </form>
      </section>
    </main>

```

---

## FILE: src/pages/products.html

```html
<main>
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Products</span></nav>
      <section class="page-hero">
        <div>
          <p class="eyebrow">Product Catalog</p>
          <h1>Stone products for retail, project, wholesale, and custom production.</h1>
          <p>
            Each item can be quoted by material, dimensions, drawings, destination, and order volume.
            Custom sizes and finishes are available on request.
          </p>
        </div>
        <picture><source srcset="assets/products/vanity-single-render-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/products/vanity-single-render-v2.jpg" alt="Bathroom vanity top illustrative render" width="1536" height="1024" /></picture>
      </section>

      <section class="search-drawer open" id="searchDrawer" aria-label="Product search">
        <label for="productSearch">Search product catalog</label>
        <input id="productSearch" type="search" placeholder="Try WR-VT31, quartz, vanity top, hotel..." />
      </section>

      <section class="section product-guidance" aria-labelledby="product-guide-title">
        <div class="product-guide-copy">
          <p class="eyebrow">{{productGuideEyebrow}}</p>
          <h2 id="product-guide-title">{{productGuideTitle}}</h2>
          <p>{{productGuideIntro}}</p>
        </div>
        <div class="product-guide-grid">{{productGuidanceCards}}</div>
        <aside class="quote-ready-card" aria-labelledby="quote-ready-title">
          <p class="eyebrow">{{quoteChecklistEyebrow}}</p>
          <h2 id="quote-ready-title">{{quoteChecklistTitle}}</h2>
          {{quoteChecklist}}
          <a class="button primary" href="contact.html#inquiry">Send RFQ details</a>
        </aside>
      </section>

      <section class="section product-section">
        <p class="product-visual-note">Some product visuals are illustrative renders pending WHITEROCK-owned product photography.</p>
        <div class="filter-bar" role="tablist" aria-label="Product filters">
          <button class="filter active" data-filter="All">All</button>
          <button class="filter" data-filter="Bathroom Vanity Top">Vanity Tops</button>
          <button class="filter" data-filter="Kitchen Countertop">Countertops</button>
          <button class="filter" data-filter="Stone Furniture">Furniture</button>
          <button class="filter" data-filter="Commercial Project">Projects</button>
        </div>
        <div class="product-grid catalog-grid" id="productGrid"></div>
      </section>

      <section class="section spec-section">
        <div class="section-heading">
          <p class="eyebrow">Standard Options</p>
          <h2>Common choices for North American vanity top and countertop programs.</h2>
        </div>
        <div class="spec-grid">
          <article>
            <h3>Popular Vanity Sizes</h3>
            <p>25 x 22 in, 31 x 22 in, 37 x 22 in, 49 x 22 in, 61 x 22 in, 73 x 22 in. Custom sizes are available by drawing.</p>
          </article>
          <article>
            <h3>Sink & Faucet Options</h3>
            <p>Undermount ceramic bowl, integrated bowl, single or double sink layout, pre-drilled 4 in or 8 in faucet holes.</p>
          </article>
          <article>
            <h3>Edge Profiles</h3>
            <p>Eased, bevel, bullnose, ogee, laminated/mitered edges, and project-specific drawings.</p>
          </article>
          <article>
            <h3>Packaging</h3>
            <p>Foam, corner protection, inner carton, labeled export plywood crate, pallet, or A-frame loading for heavier pieces.</p>
          </article>
        </div>
      </section>
      <section class="section compact-cta"><div><p class="eyebrow">Color-led Specification</p><h2>Compare materials, colors, finishes, and edge profiles.</h2></div><div class="cta-actions"><a class="button primary" href="colors.html">Browse colors</a><a class="button" href="finishes.html">Review finishes & edges</a></div></section>

      <div class="modal" id="productModal" aria-hidden="true">
        <div class="modal-backdrop" data-modal-close="product"></div>
        <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <button class="modal-close" type="button" data-modal-close="product" aria-label="Close product details">×</button>
          <figure class="modal-visual"><img id="modalImage" data-dynamic-image src="assets/brand/hero-stone-v2.webp" alt="Selected product detail" width="1536" height="1024" /><figcaption id="modalCaption">Illustrative render — not actual product.</figcaption></figure>
          <div class="modal-copy"><p class="eyebrow" id="modalCategory"></p><h2 id="modalTitle"></h2><p id="modalDescription"></p><dl class="modal-specs" id="modalSpecs"></dl><div class="modal-actions"><a class="button primary" id="modalQuote" href="contact.html#inquiry">Request a quote</a><button class="button" id="modalAddInquiry" type="button">Add to inquiry list</button><button class="button unit-toggle" id="unitToggle" type="button" aria-pressed="false" title="Switch units">in / cm</button><a class="button" id="productRelatedColors" href="colors.html">Related colors</a><a class="button" id="productTechSheet" href="#" download hidden>Download spec sheet (PDF)</a></div></div>
        </section>
      </div>
    </main>

```

---

## FILE: src/pages/colors.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Colors</span></nav>
  <section class="page-hero color-hero">
    <div>
      <p class="eyebrow">Color & Design Library</p>
      <h1>Start with the surface direction your market needs.</h1>
      <p>Filter by material, color family, and finish. Confirm final color, lot, thickness, and availability with a physical sample before ordering.</p>
      <a class="button primary" href="#sample-kit">Build a sample kit</a>
    </div>
    <img loading="lazy" decoding="async" src="assets/colors/calacatta-crest.jpg" alt="Calacatta Crest stone surface illustrative render" width="1536" height="1024" />
  </section>

  <section class="section color-library" aria-labelledby="colors-heading">
    <div class="section-heading">
      <p class="eyebrow">Browse Surfaces</p>
      <h2 id="colors-heading">Compare colors across the WHITEROCK material range.</h2>
      <p class="visual-disclosure">Digital swatches are illustrative renders for specification planning, not physical samples or installed-project photography.</p>
    </div>
    <div class="color-route-panel" aria-labelledby="color-routes-title">
      <div>
        <p class="eyebrow">{{colorRoutesEyebrow}}</p>
        <h3 id="color-routes-title">{{colorRoutesTitle}}</h3>
      </div>
      <div class="color-route-grid">{{colorRoutes}}</div>
    </div>
    <div class="library-layout">
      <aside class="filter-rail" aria-label="Color filters">
        <div class="filter-field"><label for="colorMaterialFilter">Material</label><select id="colorMaterialFilter"><option value="All">All materials</option></select></div>
        <div class="filter-field"><label for="colorFamilyFilter">Color family</label><select id="colorFamilyFilter"><option value="All">All colors</option></select></div>
        <div class="filter-field"><label for="colorFinishFilter">Finish</label><select id="colorFinishFilter"><option value="All">All finishes</option></select></div>
        <button class="text-button" id="clearColorFilters" type="button">Clear filters</button>
      </aside>
      <div>
        <p class="results-count" id="colorResults" aria-live="polite"></p>
        <div class="swatch-grid" id="colorGrid"></div>
      </div>
    </div>
  </section>

  <section class="section sample-builder" id="sample-kit" aria-labelledby="sample-heading">
    <div class="sample-copy">
      <p class="eyebrow">Sample Kit</p>
      <h2 id="sample-heading">Choose up to four surface directions.</h2>
      <p>We will confirm sample format, availability, shipping cost, and timing before dispatch. Natural stone samples vary by lot.</p>
      <p class="sample-playbook">Practical kit mix: one hero white, one warm neutral, one grey or concrete look, and one darker accent for contrast.</p>
      <div class="selected-samples" id="selectedSamples" aria-live="polite"><p>No colors selected yet.</p></div>
    </div>
    <form class="inquiry-form web3forms-form" id="sampleKitForm">
      <input type="hidden" name="access_key" value="{{web3FormsAccessKey}}" />
      <input type="hidden" name="subject" value="WHITEROCK sample kit request" />
      <input type="hidden" name="selected_colors" id="selectedColorsInput" value="" />
      <input class="honeypot" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" />
      <div class="form-grid">
        <label>Contact name<input name="name" required autocomplete="name" /></label>
        <label>Company<input name="company" required autocomplete="organization" /></label>
        <label>Business email<input type="email" name="email" required autocomplete="email" /></label>
        <label>Country / region<input name="region" required autocomplete="country-name" /></label>
      </div>
      <label>Program notes<textarea name="message" rows="4" placeholder="Product type, expected volume, target market, or timing"></textarea></label>
      <button class="button primary" type="submit">Request selected samples</button>
      <p class="form-note" data-form-note>Select one to four colors above before submitting.</p>
    </form>
  </section>

  <div class="modal" id="colorModal" aria-hidden="true">
    <div class="modal-backdrop" data-modal-close="color"></div>
    <section class="modal-card color-modal-card" role="dialog" aria-modal="true" aria-labelledby="colorModalName">
      <button class="modal-close" type="button" data-modal-close="color" aria-label="Close color details">×</button>
      <figure class="modal-visual"><img id="colorModalImage" data-dynamic-image src="assets/brand/hero-stone-v2.webp" alt="Selected color detail" width="1536" height="1024" /><figcaption id="colorModalCaption">Illustrative render — not actual product.</figcaption></figure>
      <div class="modal-copy">
        <p class="eyebrow" id="colorModalMeta"></p>
        <h2 id="colorModalName"></h2>
        <p id="colorModalDescription"></p>
        <dl class="modal-specs"><dt>Finishes</dt><dd id="colorModalFinishes"></dd><dt>Thicknesses</dt><dd id="colorModalThicknesses"></dd><dt>Sizes</dt><dd id="colorModalSizes"></dd><dt>Related products</dt><dd id="colorModalRelatedProducts"></dd></dl>
        <div class="modal-actions"><button class="button primary" id="colorSampleButton" type="button">Add to sample kit</button><a class="button" id="colorRelatedProducts" href="products.html">Related products</a><a class="button" id="colorTechSheet" href="#" download hidden>Download spec sheet (PDF)</a></div>
      </div>
    </section>
  </div>
</main>

```

---

## FILE: src/pages/materials.html

```html
<main>
      <section class="page-hero">
        <div>
          <p class="eyebrow">Materials</p>
          <h1>Material categories matched to price point, maintenance, and design intent.</h1>
          <p>Exact colors and slabs vary by lot and should be confirmed by a physical sample before purchase.</p>
        </div>
        <picture><source srcset="assets/materials/white-marble-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/white-marble-v2.jpg" alt="White Carrara marble material" width="1254" height="1254" /></picture>
      </section>

      <section class="section material-detail-grid">
        <article>
          <picture><source srcset="assets/materials/white-marble-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/white-marble-v2.jpg" alt="White Carrara marble surface" width="1254" height="1254" /></picture>
          <div>
            <p class="eyebrow">Natural Stone</p>
            <h2>Marble</h2>
            <p>Marble is selected for high-end bathrooms, furniture, hospitality, and decorative interiors where natural veining is part of the design value.</p>
            <ul>
              <li>Best for: vanity tops, furniture tops, wall features, hotel interiors.</li>
              <li>Looks: Carrara white, warm beige, grey veining, dramatic natural patterns.</li>
              <li>Notes: sealing and care guidance should be provided for natural marble.</li>
            </ul>
          </div>
        </article>
        <article>
          <picture><source srcset="assets/materials/granite-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/granite-v2.jpg" alt="Polished black granite surface" width="1536" height="1024" /></picture>
          <div>
            <p class="eyebrow">Natural Stone</p>
            <h2>Granite</h2>
            <p>Granite is valued for durability and natural color variation, especially for high-use countertop and vanity programs.</p>
            <ul>
              <li>Best for: kitchen counters, bath tops, commercial counters, durable surfaces.</li>
              <li>Looks: black, grey, beige, speckled natural stone patterns.</li>
              <li>Notes: good option when heat and scratch resistance are important.</li>
            </ul>
          </div>
        </article>
        <article>
          <picture><source srcset="assets/materials/quartz-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/quartz-v2.jpg" alt="White engineered quartz surface" width="1536" height="1024" /></picture>
          <div>
            <p class="eyebrow">Engineered Stone</p>
            <h2>Quartz</h2>
            <p>Quartz is popular in North America because it is consistent, low maintenance, and available in marble-look colors.</p>
            <ul>
              <li>Best for: retail vanity programs, kitchen countertops, builders, hotels.</li>
              <li>Looks: pure white, Calacatta, Carrara, grey concrete, warm neutral.</li>
              <li>Notes: ideal for repeat orders that need color consistency.</li>
            </ul>
          </div>
        </article>
        <article>
          <picture><source srcset="assets/materials/engineered-marble-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/engineered-marble-v2.jpg" alt="Warm white engineered marble surface" width="1536" height="1024" /></picture>
          <div>
            <p class="eyebrow">Value Program</p>
            <h2>Engineered Marble</h2>
            <p>Engineered marble is a cost-efficient choice for vanity tops and volume bathroom programs where consistency and price matter.</p>
            <ul>
              <li>Best for: multi-family, retail bathroom vanities, builder-grade collections.</li>
              <li>Looks: white, off-white, light grey, marble-look veining.</li>
              <li>Notes: confirm bowl style, overflow, faucet holes, and packaging by order.</li>
            </ul>
          </div>
        </article>
      </section>
      <section class="section material-process-strip" aria-labelledby="made-heading">
        <div class="section-heading">
          <p class="eyebrow">How It Is Made</p>
          <h2 id="made-heading">Factory process references by material category.</h2>
          <p>These are owner-supplied factory photos used as process context, not product-specific guarantees. Final routing is confirmed by drawing, material, finish, and order scope.</p>
        </div>
        <div class="process-photo-grid">
          <article><picture><source srcset="assets/gallery/vietnam/factory-01.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/vietnam/factory-01.jpg" alt="Owner-supplied Vietnam factory photo of finished vanity-top stock" width="1200" height="900" /></picture><p class="eyebrow">Marble / Engineered Marble</p><h3>Finished stock and batch staging</h3><p>Useful for vanity programs, stocked sizes, and final inspection planning.</p></article>
          <article><picture><source srcset="assets/gallery/china/factory-07.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/china/factory-07.jpg" alt="Owner-supplied China factory photo showing bridge cutting equipment" width="1200" height="900" /></picture><p class="eyebrow">Granite</p><h3>Cutting and slab breakdown</h3><p>Harder natural stone routes are reviewed by slab, drawing, thickness, and handling requirement.</p></article>
          <article><picture><source srcset="assets/gallery/china/factory-09.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/china/factory-09.jpg" alt="Owner-supplied China factory photo showing CNC-style stone processing equipment" width="1200" height="900" /></picture><p class="eyebrow">Quartz</p><h3>CNC and cutout review</h3><p>Sink openings, faucet holes, shaped corners, and drainboards are confirmed from approved drawings.</p></article>
          <article><picture><source srcset="assets/gallery/vietnam/factory-04.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/vietnam/factory-04.jpg" alt="Owner-supplied Vietnam factory export packing photo" width="1200" height="900" /></picture><p class="eyebrow">All Materials</p><h3>Export packing route</h3><p>Foam, cartons, labels, pallets, crates, or A-frames are selected according to product and shipment method.</p></article>
        </div>
      </section>
      <section class="section material-note"><p>{{materialsCopy}}</p></section>
    </main>

```

---

## FILE: src/pages/finishes.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Finishes & Edges</span></nav>
  <section class="page-hero">
    <div><p class="eyebrow">Finish & Edge Reference</p><h1>Define the final touch, reflection, and profile.</h1><p>Use this visual reference during early specification. Final finish, edge dimensions, tolerances, and samples are confirmed on the approved drawing.</p></div>
    <img loading="lazy" decoding="async" src="assets/finishes/polished-render.jpg" alt="Polished stone surface illustrative render" width="1536" height="1024" />
  </section>
  <section class="section" aria-labelledby="finish-heading">
    <div class="section-heading"><p class="eyebrow">Surface Finish</p><h2 id="finish-heading">Control sheen, tactility, and color depth.</h2><p class="visual-disclosure">Reference visuals are illustrative renders, not physical finish samples.</p></div>
    <div class="reference-grid finish-grid" id="finishGrid"></div>
  </section>
  <section class="section edge-section" aria-labelledby="edge-heading">
    <div class="section-heading"><p class="eyebrow">Edge Profiles</p><h2 id="edge-heading">Profiles for vanity, countertop, furniture, and project work.</h2><p>Availability depends on material, thickness, fabrication drawings, and handling requirements.</p></div>
    <div class="reference-grid edge-grid" id="edgeGrid"></div>
  </section>
  <section class="section compact-cta"><div><p class="eyebrow">Specify a Program</p><h2>Send the drawing, material, finish, edge, and volume.</h2></div><a class="button primary" href="contact.html#inquiry">Request fabrication review</a></section>
</main>

```

---

## FILE: src/pages/applications.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Applications</span></nav>
  <section class="page-hero application-hero">
    <div><p class="eyebrow">Applications</p><h1>See how a surface direction can work in the room.</h1><p>These scenes support early design conversations. They are illustrative renders, not completed WHITEROCK projects or proof of installed performance.</p><a class="button primary" href="colors.html">Browse surface colors</a></div>
    <img loading="lazy" decoding="async" src="assets/applications/kitchen-render.jpg" alt="Contemporary kitchen with stone island illustrative render" width="1536" height="1024" />
  </section>
  <section class="section" aria-labelledby="application-heading">
    <div class="section-heading"><p class="eyebrow">In-room Gallery</p><h2 id="application-heading">Kitchen, bath, and hospitality directions.</h2></div>
    <div class="application-grid" id="applicationGrid"></div>
  </section>
  <section class="section compact-cta"><div><p class="eyebrow">From Direction to Sample</p><h2>Pair the room concept with a physical surface sample.</h2></div><a class="button primary" href="colors.html#sample-kit">Build a sample kit</a></section>
</main>

```

---

## FILE: src/pages/factory.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Factory</span></nav>
  <section class="page-hero factory-hero">
    <div><p class="eyebrow">Factory & OEM/ODM Capability</p><h1>Production capability for custom stone orders and export programs.</h1><p>{{factoryHeroCopy}}</p><a class="button primary" href="contact.html#inquiry">Discuss a production program</a></div>
    <figure class="factory-photo-hero"><picture><source srcset="assets/factory/vietnam-vanity-qc-wide.webp" type="image/webp" /><img loading="eager" fetchpriority="high" decoding="async" src="assets/factory/vietnam-vanity-qc-wide.jpg" alt="Finished stone vanity tops in the WHITEROCK Vietnam factory" width="1800" height="1350" /></picture><figcaption>WHITEROCK Vietnam factory · finished-product inspection</figcaption></figure>
  </section>

  <section class="factory-stat-band" aria-label="Factory at a glance">{{factoryStats}}</section>

  <section class="section equipment-section" aria-labelledby="equipment-title">
    <div class="section-heading"><p class="eyebrow">Equipment</p><h2 id="equipment-title">Machinery for cutting, shaping, finishing, and repeat production.</h2><p>Real photographs supplied by WHITEROCK and OPTIMA STONE are labeled by factory. Unconfirmed quantities and specifications remain clearly marked.</p></div>
    <div class="factory-equipment-grid">{{factoryEquipment}}</div>
  </section>

  <section class="section factory-capabilities" aria-labelledby="capability-title">
    <div class="section-heading"><p class="eyebrow">Processing Capability</p><h2 id="capability-title">What buyers can specify for OEM, ODM, and project work.</h2></div>
    <div class="capability-card-grid">{{factoryCapabilities}}</div>
    <a class="text-link" href="finishes.html">Review finishes and edge profiles →</a>
  </section>

  <section class="section factory-flow-section" aria-labelledby="flow-title">
    <div class="section-heading"><p class="eyebrow">Production Flow</p><h2 id="flow-title">Controlled from material approval to container-ready packing.</h2></div>
    <img class="factory-flow-wide" data-vector src="assets/equipment/flow.svg" alt="Production flow: slab, cutting, CNC, edge polishing, surface polishing, quality control, and packing" width="900" height="160" />
    <div class="program-grid">{{factoryFlowSteps}}</div>
  </section>

  <section class="section qc-rnd-section">
    <div class="factory-detail-panel"><p class="eyebrow">Quality Control & Lab</p><h2>Inspection points buyers can audit.</h2>{{factoryQc}}</div>
    <div class="factory-detail-panel"><p class="eyebrow">R&D / Design</p><h2>Development support for private-label programs.</h2>{{factoryRnd}}</div>
  </section>

  <section class="section sourcing-packing-section">
    <div class="factory-detail-panel"><p class="eyebrow">Materials & Sourcing</p><h2>Lot selection and repeat-order traceability.</h2>{{factoryMaterials}}</div>
    <div class="factory-packing-panel">{{factoryPacking}}</div>
  </section>

  <section class="section factory-certifications">
    <div><p class="eyebrow">Certifications & Compliance</p><h2>Publish only current, owner-verified documents.</h2><p>Certification claims remain unconfirmed until WHITEROCK uploads an approved certificate or test report.</p><a class="button" href="certifications.html">Certification status</a></div>
    <div class="certification-summary">{{factoryCertifications}}</div>
  </section>

  <section class="section factory-tour-section" id="factory-tour">
    <div><p class="eyebrow">Factory Tour & Real Photography</p><h2>See the Vietnam-led production network.</h2><p>Every image and video in this section was supplied by the two companies. Captions identify whether the scene is from Vietnam or China.</p></div>
    <div class="factory-tour-content">{{factoryTour}}</div>
  </section>
</main>

```

---

## FILE: src/pages/projects.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Projects</span></nav>
  <section class="page-hero"><div><p class="eyebrow">Projects & Case Studies</p><h1>Verified references, product scope, and delivery details.</h1><p>{{projectsIntro}}</p></div><img loading="lazy" decoding="async" src="assets/brand/hero-stone-v2.jpg" alt="Layered stone surfaces" width="1586" height="992" /></section>
  <section class="section"><div class="section-heading"><p class="eyebrow">Owner-approved Work</p><h2>Real project records will appear here.</h2></div><div class="case-study-grid">{{projectCards}}</div></section>
</main>

```

---

## FILE: src/pages/news.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">News & Insights</span></nav>
  <section class="page-hero"><div><p class="eyebrow">News & Buyer Guides</p><h1>Practical notes for specifying and buying fabricated stone.</h1><p>{{newsIntro}}</p></div><img loading="lazy" decoding="async" src="assets/materials/quartz-v2.jpg" alt="Quartz surface detail" width="1536" height="1024" /></section>
  <section class="section"><div class="insight-grid">{{newsCards}}</div></section>
</main>

```

---

## FILE: src/pages/faq.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">FAQ</span></nav>
  <section class="page-title-band"><p class="eyebrow">Buyer FAQ</p><h1>Answers for samples, quotations, production, inspection, and export packing.</h1><p>{{faqIntro}}</p></section>
  <section class="section faq-layout"><div><p class="eyebrow">Common Questions</p><h2>Plan the order before production begins.</h2><a class="button primary" href="contact.html#inquiry">Ask a project question</a></div><div class="faq-list">{{faqItems}}</div></section>
</main>

```

---

## FILE: src/pages/certifications.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Certifications</span></nav>
  <section class="page-title-band"><p class="eyebrow">Certifications & Test Reports</p><h1>Current documents, clearly separated from pending claims.</h1><p>Only owner-confirmed, current certificates and test reports are published. Empty or pending entries do not imply certification.</p></section>
  <section class="section"><div class="section-heading"><p class="eyebrow">Verification Status</p><h2>Company and product documentation.</h2></div><div class="certification-grid">{{certificationCards}}</div></section>
  <section class="section compact-cta"><div><p class="eyebrow">Buyer Due Diligence</p><h2>Need a document for a tender, retailer, or compliance review?</h2></div><a class="button primary" href="contact.html#inquiry">Request current documentation</a></section>
</main>

```

---

## FILE: src/pages/sustainability.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Sustainability & Safety</span></nav>
  <section class="page-title-band safety-title-band"><p class="eyebrow">Responsible Production & Fabrication</p><h1>Safety information belongs next to the surface specification.</h1><p>WHITEROCK publishes owner-approved safety, sourcing, and compliance information as it becomes available.</p></section>
  <section class="section sustainability-grid">
    <article><p class="eyebrow">{{silicaTitle}}</p><h2>Control dust during fabrication.</h2><p>{{silicaCopy}}</p><a class="text-link" href="resources.html">Safety resources →</a></article>
    <article><p class="eyebrow">{{prop65Title}}</p><h2>Confirm product-specific notices.</h2><p>{{prop65Copy}}</p><a class="text-link" href="certifications.html">Compliance status →</a></article>
    <article><p class="eyebrow">Materials & Traceability</p><h2>Approve the lot and document the source.</h2><p>Natural stone varies by lot. Buyers should approve physical samples, finish, thickness, and acceptable variation before production. WHITEROCK traceability procedures remain subject to owner confirmation.</p></article>
    <article><p class="eyebrow">Packing & Waste</p><h2>Match protection to the product.</h2><p>Packing is engineered around weight, fragility, shipment mode, and handling. Reuse, waste-water, offcut, and packaging-reduction data will be published only after owner verification.</p></article>
  </section>
  <section class="section sustainability-visuals" aria-labelledby="sustainability-visuals-title">
    <div class="section-heading"><p class="eyebrow">Visual References</p><h2 id="sustainability-visuals-title">Neutral imagery for safety and material stewardship content.</h2><p>These visuals are illustrative only and do not claim a specific WHITEROCK facility practice or certification.</p></div>
    <div class="sustainability-visual-grid">
      <figure><picture><source srcset="assets/sustainability/stone-nature-illustrative.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/sustainability/stone-nature-illustrative.jpg" alt="Illustrative stone and nature texture for sustainability page" width="1536" height="1024" /></picture><figcaption>Illustrative image - material stewardship theme.</figcaption></figure>
      <figure><picture><source srcset="assets/sustainability/wet-processing-illustrative.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/sustainability/wet-processing-illustrative.jpg" alt="Illustrative wet stone processing surface for safety and water-management theme" width="1536" height="1024" /></picture><figcaption>Illustrative image - process-safety theme.</figcaption></figure>
    </div>
  </section>
</main>

```

---

## FILE: src/pages/resources.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Resources</span></nav>
  <section class="page-hero resource-hero">
    <div><p class="eyebrow">Technical Resources</p><h1>Documents for specifying, buying, handling, and fabricating stone.</h1><p>{{resourcesIntro}}</p></div>
    <img loading="lazy" decoding="async" src="assets/materials/granite-v2.jpg" alt="Granite surface detail" width="1536" height="1024" />
  </section>
  <section class="section" aria-labelledby="resource-heading">
    <div class="section-heading"><p class="eyebrow">Downloads</p><h2 id="resource-heading">Approved files appear here when uploaded by WHITEROCK.</h2></div>
    <div class="resource-grid" id="resourceGrid"></div>
  </section>
  <section class="section safety-panel">
    <div><p class="eyebrow">{{complianceEyebrow}}</p><h2>{{complianceTitle}}</h2></div>
    <article><h3>{{silicaTitle}}</h3><p>{{silicaCopy}}</p></article>
    <article><h3>{{prop65Title}}</h3><p>{{prop65Copy}}</p></article>
  </section>
</main>

```

---

## FILE: src/pages/partners.html

```html
<main>
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Distributor Program</span></nav>
  <section class="page-hero partner-hero">
    <div><p class="eyebrow">{{partnerEyebrow}}</p><h1>{{partnerTitle}}</h1><p>{{partnerIntro}}</p><a class="button primary" href="#partner-inquiry">Discuss your market</a></div>
    <img loading="lazy" decoding="async" src="assets/products/kitchen-countertop-render-v2.jpg" alt="Stone countertop illustrative render" width="1536" height="1024" />
  </section>
  <section class="section partner-overview">
    <div><p class="eyebrow">Target Markets</p><h2>Trade support for qualified regional programs.</h2>{{partnerRegions}}</div>
    <div class="trade-terms">{{partnerTerms}}</div>
  </section>
  <section class="section partner-benefits" aria-labelledby="partner-benefits-title">
    <div class="section-heading">
      <p class="eyebrow">Program Benefits</p>
      <h2 id="partner-benefits-title">Support designed for repeat B2B buyers.</h2>
      <p>Benefits below are indicative and should be confirmed by region, product scope, order volume, and launch calendar.</p>
    </div>
    <div class="benefit-grid">
      <article><h3>Sample and color support</h3><p>Build a focused sample kit for dealers, builders, designers, or project approvals.</p></article>
      <article><h3>Quote by program</h3><p>Review standard sizes, private-label requirements, drawings, packaging, and repeat-order planning together.</p></article>
      <article><h3>Retail-ready packaging review</h3><p>Discuss carton marks, labels, crate marks, SKU lists, and product protection before production.</p></article>
      <article><h3>Market launch assets</h3><p>Use editable product data, color swatches, spec sheets, care notes, and buyer-guide content as a starting point.</p></article>
    </div>
  </section>
  <section class="section partner-tier-section" aria-labelledby="partner-tier-title">
    <div class="section-heading">
      <p class="eyebrow">Support Tiers</p>
      <h2 id="partner-tier-title">Indicative trade support by buying pattern.</h2>
    </div>
    <div class="tier-table" role="table" aria-label="Indicative distributor support tiers">
      <div role="row" class="tier-row tier-head"><span role="columnheader">Buyer type</span><span role="columnheader">Best fit</span><span role="columnheader">Support focus</span></div>
      <div role="row" class="tier-row"><span role="cell">Starter dealer</span><span role="cell">Sample kit and small program review</span><span role="cell">Color selection, RFQ setup, packaging guidance</span></div>
      <div role="row" class="tier-row"><span role="cell">Regional distributor</span><span role="cell">Repeat containers or category launch</span><span role="cell">SKU planning, private labels, inspection workflow</span></div>
      <div role="row" class="tier-row"><span role="cell">Project buyer</span><span role="cell">BOQ or drawing-based procurement</span><span role="cell">Material matching, cut-to-size review, shipment coordination</span></div>
    </div>
  </section>
  <section class="section partner-inquiry" id="partner-inquiry">
    <div><p class="eyebrow">Partner Inquiry</p><h2>Tell us how you buy and where you sell.</h2><p>We will use your program type, region, and estimated volume to prepare the right product, sample, and quotation path.</p></div>
    <form class="inquiry-form web3forms-form" id="partnerForm">
      <input type="hidden" name="access_key" value="{{web3FormsAccessKey}}" />
      <input type="hidden" name="subject" value="WHITEROCK distributor program inquiry" />
      <input class="honeypot" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" />
      <div class="form-grid">
        <label>Company<input name="company" required autocomplete="organization" /></label>
        <label>Contact name<input name="name" required autocomplete="name" /></label>
        <label>Business email<input type="email" name="email" required autocomplete="email" /></label>
        <label>Region / market<input name="region" required autocomplete="country-name" /></label>
        <label>Business type<select name="business_type" required><option value="">Select one</option>{{partnerBusinessOptions}}</select></label>
        <label>Estimated annual volume<input name="annual_volume" placeholder="Pieces, containers, or project value" /></label>
      </div>
      <label>Program details<textarea name="message" rows="5" required placeholder="Products, materials, sizes, target price level, and launch timing"></textarea></label>
      <button class="button primary" type="submit">Submit partner inquiry</button>
      <p class="form-note" data-form-note>We typically reply within one business day.</p>
    </form>
  </section>
</main>

```

---

## FILE: src/pages/order.html

```html
<main>
      <section class="page-hero"><div><p class="eyebrow">Order Process</p><h1>From sample request to export-ready shipment.</h1><p>WHITEROCK supports overseas buyers with samples, drawings, quotations, production, inspection, packing, and container loading coordination.</p></div><picture><source srcset="assets/brand/hero-stone-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/brand/hero-stone-v2.jpg" alt="Layered marble and granite surfaces" width="1586" height="992" /></picture></section>
      <section class="section process-section"><div class="section-heading"><p class="eyebrow">Workflow</p><h2>A clear process for B2B orders.</h2></div><div class="program-grid"><article><span>01</span><h3>Inquiry</h3><p>Send product type, drawings, sizes, material, quantity, destination, and target timeline.</p></article><article><span>02</span><h3>Sample & Quote</h3><p>Confirm material, finish, edge, sink, packaging, MOQ, and estimated lead time.</p></article><article><span>03</span><h3>Production</h3><p>Manufacture approved pieces with dimension checks and staged quality control.</p></article><article><span>04</span><h3>Export</h3><p>Pack, label, crate, and coordinate loading for international shipment.</p></article></div><div class="content-note"><h3>Current order terms</h3>{{orderTerms}}</div></section>
      <section class="section packing-photo-section" aria-labelledby="packing-photos-title">
        <div class="section-heading"><p class="eyebrow">Real Packing Photos</p><h2 id="packing-photos-title">Owner-supplied Vietnam packing references.</h2><p>Actual packing method is confirmed by SKU, weight, fragility, shipment method, and buyer handling requirements.</p></div>
        <div class="packing-photo-grid">
          <figure><picture><source srcset="assets/gallery/vietnam/factory-04.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/vietnam/factory-04.jpg" alt="Owner-supplied Vietnam factory photo showing foam and carton packing protection" width="1200" height="900" /></picture><figcaption>Foam and carton protection</figcaption></figure>
          <figure><picture><source srcset="assets/gallery/vietnam/factory-05.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/vietnam/factory-05.jpg" alt="Owner-supplied Vietnam factory photo showing crated vanity tops" width="1200" height="900" /></picture><figcaption>Crated vanity-top packing</figcaption></figure>
          <figure><picture><source srcset="assets/gallery/vietnam/factory-06.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/gallery/vietnam/factory-06.jpg" alt="Owner-supplied Vietnam factory photo showing labeled cartons ready to load" width="1200" height="900" /></picture><figcaption>Labeled cartons ready to load</figcaption></figure>
        </div>
      </section>
    </main>

```

---

## FILE: src/pages/about.html

```html
<main>
      <section class="page-hero"><div><p class="eyebrow">About WHITEROCK</p><h1>Vietnam-based stone manufacturing for international buyers.</h1><p>WHITEROCK LIMITED produces marble, granite, quartz, and engineered stone products for distributors, contractors, builders, hospitality buyers, and custom projects.</p></div><picture><source srcset="assets/brand/hero-stone-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/brand/hero-stone-v2.jpg" alt="Layered marble and granite surfaces" width="1586" height="992" /></picture></section>
      <section class="section intro-grid"><div><p class="eyebrow">Company</p><h2>Built around product clarity, production control, and export support.</h2><p class="company-mission">{{companyMission}}</p></div><div class="intro-copy"><p>WHITEROCK supports buyers from sampling through packed shipment.</p>{{aboutFacts}}</div></section>
      <section class="section company-timeline"><div class="section-heading"><p class="eyebrow">Milestones</p><h2>Experience shaped into a clearer buyer process.</h2></div><div class="timeline-grid">{{companyMilestones}}</div></section>
      <section class="section company-operations"><div class="section-heading"><p class="eyebrow">Two Companies, One Production Network</p><h2>Vietnam first, with supporting capability in China.</h2></div><div class="operation-grid">{{companyOperations}}</div></section>
      <section class="section dual-base-map-section" aria-labelledby="dual-base-map-title">
        <div>
          <p class="eyebrow">Production Network Map</p>
          <h2 id="dual-base-map-title">A simple dual-base model for overseas buyers.</h2>
          <p>Vietnam is presented as the primary production and export base. Yunfu, China is presented as supporting stone-industry capability. Claims and capacity details remain owner-confirmed before publishing as final numbers.</p>
        </div>
        <figure class="dual-base-map">
          <svg viewBox="0 0 900 430" role="img" aria-labelledby="dualMapTitle dualMapDesc">
            <title id="dualMapTitle">WHITEROCK Vietnam and Yunfu China production network map</title>
            <desc id="dualMapDesc">Diagram showing Vietnam as the primary base and Yunfu China as a support base for WHITEROCK buyers.</desc>
            <rect width="900" height="430" rx="24" fill="#f4f0e8"></rect>
            <path d="M290 120 C390 40 520 58 612 128 C706 198 718 312 642 360 C554 416 390 386 312 306 C238 230 212 170 290 120Z" fill="#d9d0c0"></path>
            <path d="M452 118 C505 98 570 112 620 154" fill="none" stroke="#8c7a62" stroke-width="3" stroke-dasharray="8 10"></path>
            <path d="M433 250 C474 236 522 246 560 282" fill="none" stroke="#8c7a62" stroke-width="3" stroke-dasharray="8 10"></path>
            <circle cx="405" cy="278" r="54" fill="#23302d"></circle>
            <circle cx="640" cy="150" r="46" fill="#7a4f35"></circle>
            <path d="M438 242 C510 190 560 162 601 151" fill="none" stroke="#23302d" stroke-width="5" stroke-linecap="round"></path>
            <path d="M585 137 L608 150 L584 162" fill="none" stroke="#23302d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
            <text x="405" y="282" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">Vietnam</text>
            <text x="640" y="154" text-anchor="middle" fill="#fff" font-size="20" font-weight="700">Yunfu</text>
            <text x="120" y="82" fill="#23302d" font-size="30" font-weight="700">Primary + Support Network</text>
            <text x="120" y="120" fill="#5e665f" font-size="18">Factory coordination, sampling, fabrication review, packing, and export workflow.</text>
            <g fill="#23302d" font-size="17">
              <text x="120" y="350">1. Confirm sample and drawing</text>
              <text x="120" y="378">2. Route production by material and capability</text>
              <text x="120" y="406">3. Inspect, pack, label, and prepare shipment</text>
            </g>
          </svg>
          <figcaption>Illustrative network map for buyer orientation; not a geographic-scale map.</figcaption>
        </figure>
      </section>
      <section class="section about-advantages"><div><p class="eyebrow">Factory Advantages</p><h2>Why buyers use WHITEROCK.</h2>{{companyAdvantages}}</div><div><p class="eyebrow">Why Vietnam</p><h2>An established regional manufacturing base.</h2><p>{{whyVietnam}}</p></div></section>
    </main>

```

---

## FILE: src/pages/lookbook.html

```html
<main>
  <section class="page-hero">
    <div>
      <p class="eyebrow">Lookbook</p>
      <h1>Selected stone product and project visuals.</h1>
      <p>Owner-supplied project photography can be uploaded through the CMS. Until then, product renders remain clearly labeled.</p>
    </div>
    <picture><source srcset="assets/products/round-table-render-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/products/round-table-render-v2.jpg" alt="Round marble table illustrative render" width="1254" height="1254" /></picture>
  </section>

  <section class="section categorized-gallery">
    <div class="section-heading">
      <p class="eyebrow">Projects & product studies</p>
      <h2>Visual references for buyer discussions.</h2>
    </div>
    <div class="lookbook-cms-grid">{{lookbookItems}}</div>
  </section>
</main>

```

---

## FILE: src/pages/contact.html

```html
<main>
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
      <section class="page-hero">
        <div>
          <p class="eyebrow">Contact</p>
          <h1>Send drawings, sizes, material ideas, or sample requests.</h1>
          <p>For the fastest quote, include product type, material, dimensions, edge, sink cutouts, quantity, packaging needs, and destination.</p>
        </div>
        <picture><source srcset="assets/materials/white-marble-v2.webp" type="image/webp" /><img loading="lazy" decoding="async" src="assets/materials/white-marble-v2.jpg" alt="White Carrara marble surface" width="1254" height="1254" /></picture>
      </section>

      <section class="section quote-section" id="inquiry">
        <div class="quote-copy">
          <p class="eyebrow">Request a Quote</p>
          <h2>Contact our Vietnam and China teams.</h2>
          <p>WHITEROCK in Vietnam is the primary manufacturing contact; OPTIMA STONE in China provides supporting production capability.</p>
          <div class="company-contact-grid">{{companyContactCards}}</div>
        </div>
        <aside class="quote-prep-panel" aria-labelledby="contact-prep-title">
          <p class="eyebrow">{{contactPrepEyebrow}}</p>
          <h2 id="contact-prep-title">{{contactPrepTitle}}</h2>
          <p>{{contactPrepCopy}}</p>
          {{quoteChecklist}}
        </aside>
        <form class="inquiry-form" id="inquiryForm">
          <!-- Get a free access key at https://web3forms.com and paste it below; submissions are emailed to lynn@whiterockstone.com -->
          <input type="hidden" name="access_key" value="{{web3FormsAccessKey}}" />
          <input type="hidden" name="subject" value="New WHITEROCK website inquiry" />
          <input type="hidden" name="from_name" value="WHITEROCK Website" />
          <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="form-row">
            <label>Name<input required name="name" autocomplete="name" /></label>
            <label>Email<input required type="email" name="email" autocomplete="email" /></label>
          </div>
          <div class="form-row">
            <label>Company<input name="company" autocomplete="organization" /></label>
            <label>Country / Region<input name="country" autocomplete="country-name" /></label>
          </div>
          <label>Product Interest
            <select name="interest">
              <option>Bathroom vanity tops</option>
              <option>Kitchen countertops</option>
              <option>Stone furniture</option>
              <option>Custom commercial project</option>
              <option>Material samples</option>
            </select>
          </label>
          <label>Project Details
            <textarea required name="message" rows="5" placeholder="Material, size, quantity, drawings, destination, timeline..."></textarea>
          </label>
          <button class="button primary" type="submit">Send Inquiry</button>
          <p class="form-note" id="formNote">We typically reply within one business day.</p>
        </form>
      </section>
    </main>

```

---

## FILE: styles.css

```css
:root {
  --ink: #171717;
  --muted: #5a5c61;
  --line: #dedbd4;
  --paper: #f8f5ef;
  --stone: #e7e1d7;
  --charcoal: #242424;
  --copper: #a86f3d;
  --green: #2f5f58;
  --white: #ffffff;
  --shadow: 0 22px 70px rgba(23, 23, 23, 0.18);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: Inter, Arial, sans-serif;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

picture {
  display: block;
  width: 100%;
  height: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px clamp(18px, 4vw, 56px);
  background: rgba(248, 245, 239, 0.92);
  border-bottom: 1px solid rgba(222, 219, 212, 0.78);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 178px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: var(--white);
  background: var(--charcoal);
  border-radius: 4px;
  font-weight: 800;
}

.brand strong,
.brand small {
  display: block;
  letter-spacing: 0;
  line-height: 1.05;
}

.brand small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 18px;
  color: #3c3c3c;
  font-size: 14px;
  font-weight: 600;
}

.desktop-nav > a,
.nav-trigger {
  min-height: 40px;
}

.desktop-nav > a {
  display: inline-flex;
  align-items: center;
}

.desktop-nav a:hover,
.nav-trigger:hover {
  color: var(--copper);
}

.desktop-nav > a.active,
.nav-group.active > .nav-trigger {
  color: var(--green);
}

.nav-group {
  position: relative;
}

.nav-trigger {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0;
  color: inherit;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: inherit;
}

.nav-chevron {
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 160ms ease;
}

.nav-trigger[aria-expanded="true"] .nav-chevron {
  transform: translateY(2px) rotate(225deg);
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: -18px;
  z-index: 50;
  display: grid;
  min-width: 220px;
  padding: 8px;
  visibility: hidden;
  opacity: 0;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  box-shadow: var(--shadow);
  transform: translateY(-6px);
  transition: opacity 150ms ease, transform 150ms ease, visibility 150ms ease;
}

.nav-group.open .nav-dropdown {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.nav-dropdown a {
  padding: 10px 12px;
  border-radius: 4px;
  line-height: 1.25;
}

.nav-dropdown a:hover,
.nav-dropdown a:focus-visible {
  color: var(--green);
  background: var(--paper);
}

.nav-trigger:focus-visible,
.nav-dropdown a:focus-visible,
.mobile-nav-group summary:focus-visible {
  outline: 3px solid rgba(47, 95, 88, 0.42);
  outline-offset: 3px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid var(--ink);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 160ms ease, background 160ms ease, color 160ms ease;
}

.button:hover,
.icon-button:hover {
  transform: translateY(-1px);
}

.button:active,
.icon-button:active {
  transform: translateY(0);
}

.button.primary:hover {
  background: var(--green);
  border-color: var(--green);
}

.button:focus-visible,
.icon-button:focus-visible,
.menu-button:focus-visible,
.filter:focus-visible,
.product-card:focus-visible {
  outline: 3px solid rgba(47, 95, 88, 0.42);
  outline-offset: 3px;
}

.button.primary {
  color: var(--white);
  background: var(--ink);
}

.button.ghost {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.08);
}

.button.small {
  min-height: 38px;
  padding: 0 14px;
  font-size: 13px;
}

.icon-button,
.menu-button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
  cursor: pointer;
}

.icon-button span {
  font-size: 24px;
  line-height: 1;
}

.menu-button {
  display: none;
  gap: 4px;
}

.menu-button span {
  width: 18px;
  height: 2px;
  background: var(--ink);
}

.mobile-panel {
  display: none;
}

.mobile-panel > a,
.mobile-nav-group summary {
  padding: 12px;
  border-radius: 4px;
  background: var(--paper);
  font-weight: 800;
}

.mobile-nav-group summary {
  cursor: pointer;
  list-style: none;
}

.mobile-nav-group summary::-webkit-details-marker {
  display: none;
}

.mobile-nav-group summary::after {
  content: "+";
  float: right;
  color: var(--muted);
}

.mobile-nav-group[open] summary::after {
  content: "−";
}

.mobile-nav-group > div {
  display: grid;
  gap: 4px;
  padding: 5px 8px 2px 16px;
}

.mobile-nav-group a {
  padding: 10px 12px;
  border-left: 2px solid var(--line);
}

.mobile-panel a.active {
  color: var(--green);
  border-color: var(--green);
}

.hero {
  position: relative;
  min-height: 88vh;
  display: grid;
  align-items: end;
  overflow: hidden;
  background: var(--charcoal);
}

.hero-media,
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-overlay {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.5) 56%, rgba(0, 0, 0, 0.2));
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 920px;
  padding: 0 clamp(20px, 6vw, 76px) clamp(34px, 7vw, 82px);
  color: var(--white);
}

.eyebrow {
  margin: 0 0 14px;
  color: #8a572d;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero .eyebrow {
  color: #e2c8ae;
}

h1,
h2,
h3 {
  margin: 0;
  letter-spacing: 0;
}

h1,
h2 {
  font-family: "Libre Baskerville", Georgia, serif;
}

h1 {
  max-width: 850px;
  font-size: 68px;
  line-height: 1.02;
}

h2 {
  font-size: 46px;
  line-height: 1.08;
}

h3 {
  font-size: 19px;
}

.hero-copy {
  max-width: 680px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 19px;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hero-stats span {
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.09);
  border-radius: 4px;
}

.hero-stats strong {
  display: block;
  font-size: 23px;
}

.trust-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border-bottom: 1px solid var(--line);
}

.trust-strip span {
  min-height: 82px;
  display: grid;
  place-items: center;
  padding: 16px;
  color: var(--green);
  background: var(--white);
  font-size: 14px;
  font-weight: 800;
  text-align: center;
}

.search-drawer {
  display: none;
  padding: 18px clamp(20px, 5vw, 64px);
  background: var(--white);
  border-bottom: 1px solid var(--line);
}

.search-drawer.open {
  display: block;
}

.search-drawer label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-weight: 700;
}

.search-drawer input {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 4px;
}

.section {
  padding: clamp(62px, 8vw, 112px) clamp(20px, 5vw, 64px);
}

.page-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.98fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;
  padding: clamp(52px, 7vw, 92px) clamp(20px, 5vw, 64px);
  background: var(--white);
  border-bottom: 1px solid var(--line);
}

.page-hero h1 {
  color: var(--ink);
  font-size: 58px;
}

.page-hero p:not(.eyebrow) {
  max-width: 650px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.7;
}

.page-hero img {
  aspect-ratio: 5 / 4;
  border-radius: 6px;
  border: 1px solid var(--line);
}

.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: clamp(28px, 6vw, 90px);
  background: var(--white);
}

.intro-copy {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.75;
}

.section-heading {
  max-width: 850px;
  margin-bottom: 32px;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.filter {
  min-height: 40px;
  padding: 0 14px;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
  cursor: pointer;
}

.filter.active {
  color: var(--white);
  background: var(--green);
  border-color: var(--green);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.catalog-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.product-card {
  display: grid;
  grid-template-rows: 250px auto;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.product-visual,
.asset-figure {
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
}

.product-visual figcaption,
.asset-figure figcaption,
.render-badge {
  position: absolute;
  left: 10px;
  bottom: 10px;
  max-width: calc(100% - 20px);
  padding: 6px 8px;
  color: var(--white);
  background: rgba(36, 36, 36, 0.82);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 800;
}

.product-visual-note {
  max-width: 760px;
  margin: -10px 0 24px;
  color: var(--muted);
  line-height: 1.6;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 34px rgba(23, 23, 23, 0.12);
}

.product-card-body {
  padding: 18px;
}

.product-card p {
  margin: 10px 0 16px;
  color: var(--muted);
  line-height: 1.55;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-meta span {
  padding: 5px 8px;
  color: #505050;
  background: var(--paper);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.materials {
  background: var(--white);
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.material-grid article {
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.material-grid article:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(23, 23, 23, 0.10);
}

.material-grid img {
  height: 210px;
}

.material-grid h3,
.material-grid p {
  margin-left: 18px;
  margin-right: 18px;
}

.material-grid h3 {
  margin-top: 18px;
}

.material-grid p {
  min-height: 92px;
  margin-bottom: 18px;
  color: var(--muted);
  line-height: 1.55;
}

.capability-band {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 32px;
  padding: clamp(64px, 8vw, 104px) clamp(20px, 5vw, 64px);
  color: var(--white);
  background: var(--charcoal);
}

.capability-content {
  max-width: 820px;
}

.capability-content p:not(.eyebrow) {
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  line-height: 1.75;
}

.capability-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: center;
}

.capability-list span {
  min-height: 72px;
  display: grid;
  align-items: center;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  font-weight: 700;
}

.lookbook-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 160px;
  gap: 14px;
}

.export-program {
  background: #f0eee8;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.program-grid article {
  min-height: 260px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.program-grid span {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 22px;
  color: var(--white);
  background: var(--green);
  border-radius: 4px;
  font-weight: 800;
}

.program-grid p {
  color: var(--muted);
  line-height: 1.65;
}

.lookbook-grid img {
  border-radius: 5px;
}

.lookbook-grid img:nth-child(1) {
  grid-column: span 4;
  grid-row: span 3;
}

.lookbook-grid img:nth-child(2) {
  grid-column: span 5;
  grid-row: span 2;
}

.lookbook-grid img:nth-child(3) {
  grid-column: span 3;
  grid-row: span 2;
}

.lookbook-grid img:nth-child(4),
.lookbook-grid img:nth-child(5),
.lookbook-grid img:nth-child(6) {
  grid-column: span 4;
  grid-row: span 2;
}

.spec-section,
.process-section {
  background: var(--white);
}

.spec-grid,
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.spec-grid article,
.equipment-grid article {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.spec-grid p,
.equipment-grid p {
  color: var(--muted);
  line-height: 1.65;
}

.material-detail-grid {
  display: grid;
  gap: 18px;
}

.material-detail-grid article {
  display: grid;
  grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr);
  gap: 28px;
  align-items: center;
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.material-detail-grid img {
  aspect-ratio: 4 / 3;
  border-radius: 5px;
}

.material-detail-grid p,
.material-detail-grid li {
  color: var(--muted);
  line-height: 1.7;
}

.material-detail-grid ul {
  padding-left: 18px;
}

.equipment-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.photo-needed {
  display: grid;
  place-items: center;
  min-height: 160px;
  margin-top: 18px;
  color: var(--muted);
  border: 1px dashed #aaa396;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.62);
  font-weight: 800;
}

.factory-diagram {
  min-height: 320px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  align-content: center;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.factory-diagram span {
  display: grid;
  place-items: center;
  min-height: 82px;
  color: var(--green);
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
  font-weight: 800;
}

.line-icon {
  display: grid;
  gap: 10px;
  place-content: center;
  min-height: 160px;
  margin-top: 18px;
  border: 1px dashed #aaa396;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.62);
}

.line-icon span {
  display: block;
  width: 88px;
  height: 2px;
  background: var(--green);
}

.line-icon span:nth-child(2) {
  width: 118px;
}

.data-note {
  margin-top: 22px;
  color: var(--muted);
  line-height: 1.7;
}

.media-tool {
  background: var(--white);
}

.media-controls {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1.4fr 1fr auto;
  gap: 12px;
  align-items: end;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.media-controls label {
  display: grid;
  gap: 8px;
  color: #3a3a3a;
  font-weight: 800;
}

.media-controls input,
.media-controls select {
  width: 100%;
  height: 46px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
}

.policy-box {
  margin-top: 18px;
  padding: 20px;
  border-left: 4px solid var(--green);
  background: #eef3ef;
}

.policy-box p,
.media-status {
  color: var(--muted);
  line-height: 1.65;
}

.media-status {
  margin: 18px 0;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: var(--white);
  font-weight: 700;
}

.media-status.is-error {
  color: #b3261e;
  border-color: #e0aaa5;
  background: #fff4f2;
}

.media-status.is-success {
  color: var(--green);
  border-color: #b7d0c7;
  background: #f1f8f4;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.media-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.media-card img {
  aspect-ratio: 4 / 3;
}

.media-card-body {
  padding: 18px;
}

.media-card-body p {
  color: var(--muted);
  line-height: 1.55;
}

.media-card-body a {
  color: var(--green);
  font-weight: 800;
}

.media-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.categorized-gallery h2 {
  margin-top: 44px;
  margin-bottom: 18px;
}

.categorized-gallery h2:first-child {
  margin-top: 0;
}

.lookbook-cms-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.lookbook-item {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.lookbook-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 32px rgba(23, 23, 23, 0.11);
}

.lookbook-item picture,
.lookbook-item img {
  height: auto;
  aspect-ratio: 3 / 2;
}

.lookbook-item figcaption {
  display: grid;
  gap: 7px;
  padding: 18px;
}

.lookbook-item figcaption span {
  color: #8a572d;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.lookbook-item figcaption small {
  width: fit-content;
  padding: 6px 8px;
  color: #fff;
  background: var(--charcoal);
  border-radius: 3px;
  font-weight: 700;
}

.capacity-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.capacity-grid article {
  min-height: 160px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.capacity-grid span {
  color: #8a572d;
  font-weight: 800;
}

.capacity-grid p,
.content-note,
.material-note,
.fact-list,
.term-list {
  color: var(--muted);
  line-height: 1.7;
}

.content-note,
.material-note {
  margin-top: 28px;
  padding: 22px;
  border-left: 3px solid var(--green);
  background: var(--paper);
}

.material-note p {
  max-width: 900px;
  margin: 0;
}

.gallery-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.gallery-row img {
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  border: 1px solid var(--line);
}

.quote-section {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(320px, 1fr);
  gap: clamp(28px, 5vw, 70px);
  background: var(--white);
}

.quote-copy p {
  color: var(--muted);
  line-height: 1.7;
}

.contact-card {
  display: grid;
  gap: 10px;
  margin-top: 24px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.contact-card a {
  color: var(--green);
  font-weight: 800;
}

.inquiry-form {
  display: grid;
  gap: 16px;
  padding: clamp(20px, 4vw, 34px);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.inquiry-form label {
  display: grid;
  gap: 8px;
  color: #3a3a3a;
  font-weight: 800;
}

.inquiry-form input,
.inquiry-form select,
.inquiry-form textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
}

.inquiry-form input,
.inquiry-form select {
  height: 46px;
  padding: 0 12px;
}

.inquiry-form textarea {
  padding: 12px;
  resize: vertical;
}

.form-note {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.site-footer {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(0, 2.4fr) minmax(200px, 0.8fr);
  gap: 28px;
  padding: 44px clamp(20px, 5vw, 64px);
  color: rgba(255, 255, 255, 0.78);
  background: #111;
}

.footer-brand {
  color: var(--white);
}

.footer-brand .brand-mark {
  background: var(--white);
  color: #111;
}

.footer-brand small {
  color: rgba(255, 255, 255, 0.62);
}

.footer-links,
.footer-contact {
  display: grid;
  gap: 10px;
  align-content: start;
}

.footer-links {
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  column-gap: 22px;
}

.footer-link-group {
  display: grid;
  gap: 9px;
  align-content: start;
}

.footer-link-group h2 {
  margin: 0 0 5px;
  color: rgba(255, 255, 255, 0.58);
  font-family: Inter, Arial, sans-serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.footer-links a,
.footer-contact a {
  color: var(--white);
  font-weight: 700;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: none;
  place-items: center;
  padding: 20px;
}

.modal.open {
  display: grid;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.modal-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(320px, 1fr);
  width: min(980px, 96vw);
  max-height: 88vh;
  overflow: auto;
  background: var(--white);
  border-radius: 6px;
  box-shadow: var(--shadow);
}

.modal-card img {
  min-height: 480px;
}

.modal-body {
  padding: clamp(24px, 4vw, 44px);
}

.modal-body p {
  color: var(--muted);
  line-height: 1.7;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

dl {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px 14px;
  margin: 24px 0;
}

dt {
  color: var(--muted);
  font-weight: 800;
}

dd {
  margin: 0;
}

@media (max-width: 1100px) {
  .product-grid,
  .material-grid,
  .catalog-grid,
  .spec-grid,
  .gallery-row,
  .media-grid,
  .program-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .capacity-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .media-controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .trust-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .desktop-nav {
    gap: 18px;
  }

  .site-footer {
    grid-template-columns: minmax(210px, 0.8fr) minmax(0, 2fr);
  }

  .footer-contact {
    grid-column: 1 / -1;
  }

  .footer-links {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
  }
}

@media (max-width: 820px) {
  .desktop-nav,
  .header-actions .small,
  #searchToggle {
    display: none;
  }

  .menu-button {
    display: grid;
  }

  .mobile-panel.open {
    position: fixed;
    top: 70px;
    left: 12px;
    right: 12px;
    z-index: 40;
    display: grid;
    gap: 8px;
    max-height: calc(100vh - 86px);
    overflow-y: auto;
    padding: 16px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 6px;
    box-shadow: var(--shadow);
  }

  .hero {
    min-height: 760px;
  }

  h1,
  .page-hero h1 {
    font-size: 46px;
  }

  h2 {
    font-size: 36px;
  }

  .intro-grid,
  .capability-band,
  .quote-section,
  .site-footer,
  .modal-card,
  .page-hero,
  .material-detail-grid article {
    grid-template-columns: 1fr;
  }

  .equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lookbook-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 170px;
  }

  .lookbook-grid img,
  .lookbook-grid img:nth-child(n) {
    grid-column: span 1;
    grid-row: span 1;
  }

  .modal-card img {
    min-height: 300px;
  }

  .lookbook-cms-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .site-header {
    padding: 12px 14px;
  }

  .brand {
    min-width: auto;
  }

  .brand small {
    display: none;
  }

  .hero-actions,
  .button {
    width: 100%;
  }

  .hero-stats span {
    width: 100%;
  }

  h1,
  .page-hero h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 30px;
  }

  .product-grid,
  .material-grid,
  .catalog-grid,
  .spec-grid,
  .equipment-grid,
  .gallery-row,
  .media-grid,
  .media-controls,
  .program-grid,
  .trust-strip,
  .capacity-grid,
  .form-row,
  .capability-list {
    grid-template-columns: 1fr;
  }

  .product-card {
    grid-template-rows: 230px auto;
  }
}

/* Factory deep-dive and editorial content */
.factory-flow-hero {
  display: grid;
  gap: 14px;
  align-content: center;
  min-height: 360px;
  margin: 0;
  padding: clamp(24px, 4vw, 44px);
  color: var(--green);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.factory-flow-hero img,
.factory-flow-wide {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.factory-flow-hero figcaption {
  color: var(--muted);
  text-align: center;
  font-size: 13px;
  font-weight: 700;
}

.factory-stat-band {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  color: var(--white);
  background: var(--charcoal);
}

.factory-stat-band article {
  display: grid;
  align-content: start;
  gap: 8px;
  min-height: 154px;
  padding: 24px 18px;
  border-right: 1px solid rgba(255, 255, 255, 0.14);
}

.factory-stat-band strong {
  color: var(--white);
  font-family: "Libre Baskerville", Georgia, serif;
  font-size: clamp(22px, 2.4vw, 34px);
}

.factory-stat-band span {
  color: rgba(255, 255, 255, 0.78);
  font-weight: 700;
}

.factory-stat-band small {
  color: #e0b083;
  font-size: 11px;
}

.factory-equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.factory-equipment-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.factory-equipment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 32px rgba(23, 23, 23, 0.11);
}

.equipment-drawing,
.packing-drawing {
  width: 100%;
  height: 210px;
  padding: 24px;
  object-fit: contain;
  color: var(--green);
  background: #f1f5f3;
}

.factory-equipment-card > div {
  padding: 20px;
}

.factory-equipment-card p:not(.eyebrow),
.factory-equipment-card dd,
.factory-detail-panel p,
.factory-packing-panel p,
.factory-certifications p,
.factory-tour-section p,
.about-advantages p,
.company-mission {
  color: var(--muted);
  line-height: 1.68;
}

.factory-equipment-card dl,
.factory-data-list {
  grid-template-columns: 112px 1fr;
  font-size: 13px;
}

.media-status-label {
  display: block;
  margin-top: 16px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}

.factory-capabilities,
.factory-flow-section,
.company-timeline {
  background: var(--white);
}

.capability-card-grid,
.timeline-grid,
.certification-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.capability-card-grid article,
.timeline-grid article,
.certification-grid article {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.capability-card-grid p,
.timeline-grid p,
.certification-grid p {
  color: var(--muted);
  line-height: 1.65;
}

.factory-capabilities > .text-link {
  display: inline-block;
  margin-top: 24px;
  color: var(--green);
  font-weight: 800;
}

.factory-flow-wide {
  margin-bottom: 30px;
  padding: 22px;
  color: var(--green);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
}

.qc-rnd-section,
.sourcing-packing-section,
.factory-certifications,
.factory-tour-section,
.about-advantages {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(24px, 5vw, 64px);
}

.qc-rnd-section,
.factory-certifications {
  color: var(--white);
  background: var(--charcoal);
}

.qc-rnd-section .eyebrow,
.qc-rnd-section h2,
.factory-certifications .eyebrow,
.factory-certifications h2 {
  color: var(--white);
}

.qc-rnd-section .check-list li {
  color: var(--ink);
}

.qc-rnd-section .factory-detail-panel > p,
.factory-certifications p,
.qc-rnd-section dt,
.qc-rnd-section dd {
  color: rgba(255, 255, 255, 0.76);
}

.factory-packing-panel {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  align-items: center;
}

.packing-drawing {
  height: 220px;
  border-radius: 6px;
}

.certification-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
}

.empty-state-panel {
  padding: 26px;
  color: var(--muted);
  border: 1px dashed #aaa396;
  border-radius: 6px;
  background: var(--white);
  line-height: 1.65;
}

.factory-gallery,
.case-study-grid,
.insight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.factory-gallery figure,
.case-study-card,
.insight-card {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.factory-gallery figcaption,
.case-study-card > div,
.insight-card-body {
  padding: 20px;
}

.insight-visual {
  margin: 0;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: var(--stone);
}

.insight-visual picture,
.insight-visual img {
  display: block;
  width: 100%;
  height: 100%;
}

.insight-visual img {
  object-fit: cover;
}

.page-title-band {
  padding: clamp(70px, 9vw, 120px) clamp(20px, 7vw, 100px);
  color: var(--white);
  background: var(--charcoal);
}

.page-title-band h1,
.page-title-band .eyebrow {
  color: var(--white);
}

.page-title-band p:not(.eyebrow) {
  max-width: 760px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 18px;
  line-height: 1.7;
}

.safety-title-band {
  background: var(--green);
}

.insight-card h2 {
  font-size: 26px;
}

.insight-card > p,
.insight-card details p {
  color: var(--muted);
  line-height: 1.7;
}

.insight-card summary,
.faq-list summary {
  cursor: pointer;
  color: var(--green);
  font-weight: 800;
}

.faq-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(30px, 7vw, 90px);
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-list details {
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.faq-list p {
  color: var(--muted);
  line-height: 1.7;
}

.sustainability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.sustainability-grid article {
  padding: clamp(24px, 4vw, 38px);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.sustainability-grid article p:not(.eyebrow) {
  color: var(--muted);
  line-height: 1.72;
}

.timeline-grid article strong {
  color: var(--green);
  font-family: "Libre Baskerville", Georgia, serif;
  font-size: 24px;
}

.about-advantages > div {
  padding: 28px;
  border-left: 3px solid var(--green);
  background: var(--white);
}

@media (max-width: 1180px) {
  .factory-stat-band {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .factory-equipment-grid,
  .factory-gallery,
  .case-study-grid,
  .insight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .capability-card-grid,
  .timeline-grid,
  .certification-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .factory-stat-band {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .qc-rnd-section,
  .sourcing-packing-section,
  .factory-certifications,
  .factory-tour-section,
  .about-advantages,
  .faq-layout,
  .sustainability-grid {
    grid-template-columns: 1fr;
  }

  .factory-packing-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .factory-stat-band,
  .factory-equipment-grid,
  .factory-gallery,
  .case-study-grid,
  .insight-grid,
  .capability-card-grid,
  .timeline-grid,
  .certification-grid {
    grid-template-columns: 1fr;
  }

  .factory-flow-hero {
    min-height: 240px;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .factory-equipment-card dl,
  .factory-data-list {
    grid-template-columns: 1fr;
  }
}

/* --- added: honeypot + form status + busy state --- */
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.form-note.is-error {
  color: #b3261e;
}

.form-note.is-success {
  color: var(--green);
  font-weight: 700;
}

.inquiry-form button[disabled] {
  opacity: 0.6;
  cursor: progress;
}

/* Phase 2: color-led specification, trade, and resource experiences */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px clamp(20px, 5vw, 64px) 0;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.breadcrumbs a:hover,
.text-link:hover,
.text-button:hover {
  color: var(--copper);
}

.visual-disclosure {
  max-width: 780px;
  color: var(--muted);
  line-height: 1.65;
}

.color-intro,
.compact-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--white);
}

.color-intro > div:first-child,
.compact-cta > div:first-child {
  max-width: 760px;
}

.color-intro p:not(.eyebrow) {
  color: var(--muted);
  line-height: 1.7;
}

.color-intro-actions,
.cta-actions,
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.compliance-callout {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr) auto;
  gap: 32px;
  align-items: center;
  color: var(--white);
  background: var(--green);
}

.compliance-callout .eyebrow,
.compliance-callout p {
  color: rgba(255, 255, 255, 0.82);
}

.compliance-callout h2,
.compliance-callout h3 {
  color: var(--white);
}

.compliance-callout p {
  line-height: 1.7;
}

.compliance-callout .button {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.75);
}

.section-footer-action {
  margin-top: 28px;
}

.library-layout {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: clamp(24px, 4vw, 52px);
  align-items: start;
}

.filter-rail {
  position: sticky;
  top: 92px;
  display: grid;
  gap: 18px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.filter-field,
.form-grid {
  display: grid;
  gap: 8px;
}

.filter-field label {
  font-size: 13px;
  font-weight: 800;
}

.filter-field select {
  width: 100%;
  min-height: 44px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
}

.text-button {
  width: fit-content;
  padding: 0;
  color: var(--green);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 800;
}

.results-count {
  min-height: 22px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.swatch-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.swatch-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(23, 23, 23, 0.12);
}

.swatch-open {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.swatch-open figure,
.reference-card figure,
.application-card figure,
.modal-visual {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--stone);
}

.swatch-open picture,
.swatch-open img {
  aspect-ratio: 1 / 1;
}

.swatch-open img {
  transition: transform 320ms ease;
}

.swatch-card:hover .swatch-open img {
  transform: scale(1.055);
}

.swatch-open figcaption,
.reference-card figcaption,
.application-card figcaption,
.modal-visual figcaption {
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: calc(100% - 20px);
  padding: 6px 8px;
  color: var(--white);
  background: rgba(23, 23, 23, 0.86);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
}

.swatch-card-body {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  min-height: 148px;
  padding: 16px;
}

.swatch-card-body h3,
.swatch-card-body p {
  margin: 6px 0;
}

.swatch-card-body p:not(.eyebrow) {
  color: var(--muted);
  font-size: 13px;
}

.sample-toggle {
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 10px;
  border: 1px solid var(--green);
  border-radius: 4px;
  color: var(--green);
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
}

.sample-toggle.selected {
  color: var(--white);
  background: var(--green);
}

.sample-builder,
.partner-inquiry {
  display: grid;
  grid-template-columns: minmax(260px, 0.76fr) minmax(420px, 1.24fr);
  gap: clamp(30px, 6vw, 80px);
  background: var(--white);
}

.sample-copy > p,
.partner-inquiry > div > p {
  color: var(--muted);
  line-height: 1.7;
}

.selected-samples {
  display: grid;
  gap: 8px;
  margin-top: 22px;
}

.selected-samples button {
  display: grid;
  grid-template-columns: 38px 1fr auto;
  gap: 10px;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 5px 10px 5px 5px;
  text-align: left;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
  cursor: pointer;
  font-weight: 700;
}

.sample-chip {
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background-position: center;
  background-size: cover;
}

.form-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.reference-grid,
.resource-grid,
.application-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.reference-card,
.resource-card,
.application-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.reference-card:hover,
.resource-card:hover,
.application-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 32px rgba(23, 23, 23, 0.11);
}

.reference-card figure picture,
.reference-card figure img {
  aspect-ratio: 4 / 3;
}

.reference-card > div,
.application-card > div {
  padding: 20px;
}

.reference-card p,
.reference-card li,
.application-card p,
.resource-card p {
  color: var(--muted);
  line-height: 1.65;
}

.reference-card ul {
  padding-left: 18px;
}

.edge-section {
  background: var(--white);
}

.resource-card {
  min-height: 310px;
  padding: 22px;
}

.resource-icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 60px;
  margin-bottom: 22px;
  color: var(--white);
  background: var(--green);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 800;
}

.availability-note {
  display: inline-block;
  margin-top: 12px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.safety-panel {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr;
  gap: 26px;
  background: #eef3ef;
  border-top: 1px solid #cfdcd7;
  border-bottom: 1px solid #cfdcd7;
}

.safety-panel p {
  color: #444a48;
  line-height: 1.7;
}

.partner-overview {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(30px, 6vw, 80px);
}

.check-list {
  display: grid;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.check-list li {
  padding: 12px 14px;
  border-left: 3px solid var(--green);
  background: var(--white);
  font-weight: 700;
}

.trade-terms {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.trade-terms article {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.trade-terms p {
  color: var(--muted);
  line-height: 1.7;
}

.application-card figure picture,
.application-card figure img {
  aspect-ratio: 16 / 10;
}

.application-card .text-link {
  color: var(--green);
  font-weight: 800;
}

.modal-visual picture,
.modal-visual img {
  min-height: 100%;
}

.modal-copy {
  padding: clamp(24px, 4vw, 44px);
}

.modal-copy > p:not(.eyebrow) {
  color: var(--muted);
  line-height: 1.7;
}

.modal-specs {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px 14px;
  margin: 24px 0;
}

.filter-field select:focus-visible,
.inquiry-form input:focus-visible,
.inquiry-form select:focus-visible,
.inquiry-form textarea:focus-visible,
.swatch-open:focus-visible,
.sample-toggle:focus-visible,
.selected-samples button:focus-visible,
.text-button:focus-visible,
.modal-close:focus-visible {
  outline: 3px solid rgba(47, 95, 88, 0.42);
  outline-offset: 2px;
}

@media (max-width: 1320px) {
  .desktop-nav,
  .header-actions .small,
  #searchToggle {
    display: none;
  }

  .menu-button {
    display: grid;
  }

  .mobile-panel.open {
    position: fixed;
    top: 70px;
    left: 12px;
    right: 12px;
    z-index: 40;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding: 16px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 6px;
    box-shadow: var(--shadow);
  }

  .swatch-grid,
  .reference-grid,
  .resource-grid,
  .application-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .compliance-callout,
  .safety-panel {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .color-intro,
  .compact-cta {
    align-items: flex-start;
    flex-direction: column;
  }

  .library-layout,
  .sample-builder,
  .partner-inquiry,
  .partner-overview,
  .compliance-callout,
  .safety-panel {
    grid-template-columns: 1fr;
  }

  .filter-rail {
    position: static;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .filter-rail .text-button {
    grid-column: 1 / -1;
  }

  .modal-visual picture,
  .modal-visual img {
    min-height: 280px;
  }
}

@media (max-width: 560px) {
  .swatch-grid,
  .reference-grid,
  .resource-grid,
  .application-grid,
  .trade-terms,
  .form-grid,
  .filter-rail,
  .mobile-panel.open {
    grid-template-columns: 1fr;
  }

  .swatch-card-body {
    align-items: stretch;
    flex-direction: column;
  }

  .sample-toggle,
  .modal-actions .button,
  .color-intro-actions .button,
  .cta-actions .button {
    width: 100%;
  }

  .modal-specs {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   Refinement layer v2 — architectural surface-brand polish
   (re-applied by Claude; Codex build had dropped it)
   ============================================================ */
:root {
  --paper: #f4f3f0;
  --stone: #e9e5dd;
  --line: #e3dfd7;
  --shadow: 0 18px 50px rgba(23, 23, 23, 0.10);
  --brand: #2f5f58;
  --brand-deep: #244b46;
}
body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: -0.003em; }
h1, h2 { font-feature-settings: "liga" 1, "calt" 1; }
h1 { font-size: clamp(42px, 6vw, 66px); line-height: 1.03; letter-spacing: -0.018em; }
h2 { font-size: clamp(30px, 3.4vw, 42px); line-height: 1.07; letter-spacing: -0.012em; }
h3 { letter-spacing: -0.006em; }
.page-hero h1 { font-size: clamp(38px, 5vw, 56px); letter-spacing: -0.018em; }
.hero-copy { font-size: clamp(17px, 1.6vw, 19px); }
.eyebrow { display: inline-flex; align-items: center; gap: 11px; margin: 0 0 16px; color: var(--brand); font-size: 11px; font-weight: 700; letter-spacing: 0.2em; }
.eyebrow::before { content: ""; width: 26px; height: 1px; background: currentColor; opacity: 0.55; }
.hero .eyebrow { color: rgba(255, 255, 255, 0.82); }
.hero .eyebrow::before { background: rgba(255, 255, 255, 0.7); }
.button { border-radius: 2px; min-height: 48px; padding: 0 26px; font-weight: 600; letter-spacing: 0.02em; }
.button.primary { background: var(--brand); border-color: var(--brand); color: #fff; }
.button.primary:hover { background: var(--brand-deep); border-color: var(--brand-deep); }
.button.small { min-height: 40px; padding: 0 16px; }
.product-card, .material-grid article, .material-detail-grid article { border-radius: 3px; border-color: var(--line); transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease; }
.material-grid article, .material-detail-grid article { overflow: hidden; }
.product-card:hover { transform: translateY(-5px); box-shadow: 0 22px 48px rgba(23,23,23,.13); }
.product-card img, .material-grid img, .material-detail-grid img { transition: transform .7s cubic-bezier(.2,.7,.2,1); }
.product-card:hover img, .material-grid article:hover img, .material-detail-grid article:hover img { transform: scale(1.045); }
.product-meta span { background: transparent; border: 1px solid var(--line); color: var(--muted); }
.section-heading h2 { position: relative; }
.section-heading h2::after { content: ""; display: block; width: 48px; height: 2px; margin-top: 18px; background: var(--brand); opacity: .9; }
.page-hero img { border-radius: 4px; box-shadow: var(--shadow); }
.nav-menu { border-radius: 4px; }
.nav-group.is-active > .nav-top, .nav-link.active, .nav-menu a.active { color: var(--brand); }
.site-footer { background: #161616; }
.footer-links a, .footer-contact a { font-weight: 600; }
.footer-links a:hover, .footer-contact a:hover { color: var(--copper); }
@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; }
  .product-card img, .material-grid img, .material-detail-grid img { transition: none !important; }
}

/* ===== inquiry list / unit toggle / back-to-top ===== */
.inquiry-fab {
  position: fixed; right: 18px; bottom: 84px; z-index: 60;
  display: none; align-items: center; gap: 8px;
  padding: 10px 14px; border-radius: 3px;
  background: var(--charcoal, #242424); color: #fff;
  box-shadow: 0 12px 30px rgba(0,0,0,.25); font-weight: 700; font-size: 14px;
}
.inquiry-fab.show { display: inline-flex; }
.inquiry-fab-count {
  display: inline-grid; place-items: center; min-width: 22px; height: 22px;
  padding: 0 6px; border-radius: 999px; background: var(--brand, #2f5f58); font-size: 12px;
}
.inquiry-list-box {
  margin: 0 0 18px; padding: 14px 16px; border: 1px solid var(--line);
  border-radius: 4px; background: var(--white);
}
.inquiry-list-box ul { margin: 8px 0 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.inquiry-list-box li { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; color: var(--muted); }
.inq-remove { border: 0; background: none; color: var(--muted); font-size: 16px; cursor: pointer; }
.inq-remove:hover { color: #b3261e; }
.unit-toggle { min-height: 40px; padding: 0 12px; font-size: 13px; }
.unit-toggle.active { background: var(--brand); border-color: var(--brand); color: #fff; }
.to-top {
  position: fixed; left: 18px; bottom: 18px; z-index: 60;
  width: 44px; height: 44px; border-radius: 3px; border: 1px solid var(--line);
  background: var(--white); color: var(--ink); font-size: 18px; cursor: pointer;
  opacity: 0; pointer-events: none; transition: opacity .25s ease;
  box-shadow: 0 8px 22px rgba(0,0,0,.12);
}
.to-top.show { opacity: 1; pointer-events: auto; }
.to-top:hover { color: var(--brand); border-color: var(--brand); }
@media (max-width: 640px) { .inquiry-fab { bottom: 78px; } }

/* ===== right-side quick-contact rail ===== */
.contact-rail {
  position: fixed; right: 0; top: 50%; transform: translateY(-50%);
  z-index: 59; display: grid; gap: 1px;
  border-radius: 4px 0 0 4px; overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,.16);
}
.contact-rail a {
  display: flex; align-items: center; gap: 0;
  width: 46px; height: 46px; padding: 0 12px;
  background: var(--charcoal, #242424); color: #fff;
  white-space: nowrap; overflow: hidden;
  transition: width .28s cubic-bezier(.2,.7,.2,1), background .2s ease;
}
.contact-rail a:hover { width: 230px; background: var(--brand, #2f5f58); gap: 10px; }
.cr-ico { font-size: 18px; line-height: 1; flex: 0 0 auto; }
.cr-label { font-size: 13px; font-weight: 600; opacity: 0; transition: opacity .2s ease .08s; }
.contact-rail a:hover .cr-label { opacity: 1; }
@media (max-width: 760px) {
  .contact-rail { top: auto; bottom: 140px; transform: none; }
  .contact-rail a:hover { width: 46px; }  /* 移动端不展开，纯图标 */
  .contact-rail a:hover .cr-label { opacity: 0; }
}

/* ===== bilingual locale switch (appended; keep refinement + feature modules intact) ===== */
.language-switch {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--ink);
  background: var(--white);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.language-switch:hover,
.language-switch:focus-visible {
  color: var(--brand);
  border-color: var(--brand);
}

.translation-review-banner {
  position: relative;
  z-index: 80;
  padding: 8px 18px;
  color: #3e3421;
  background: #fff2cc;
  border-bottom: 1px solid #e1c97c;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
}

:lang(zh-Hans) body {
  font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", Inter, sans-serif;
  letter-spacing: 0;
}

:lang(zh-Hans) h1,
:lang(zh-Hans) h2,
:lang(zh-Hans) h3 {
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Microsoft YaHei", serif;
  letter-spacing: 0;
}

@media (max-width: 1180px) {
  .language-switch { display: inline-flex; }
}

@media (max-width: 560px) {
  .language-switch { min-height: 36px; padding: 0 9px; }
  .translation-review-banner { padding-inline: 12px; font-size: 12px; }
}

/* ===== dual-domain multilingual identity + verified factory media ===== */
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  border: 1px solid var(--line);
  background: var(--white);
}
.language-switcher .language-switch { min-height: 34px; padding: 0 9px; border: 0; background: transparent; }
.language-switcher .language-switch.active { color: #fff; background: var(--brand); }
.operation-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.operation-card { overflow: hidden; border: 1px solid var(--line); background: var(--white); }
.operation-card picture, .operation-card img { display: block; width: 100%; }
.operation-card img { aspect-ratio: 16 / 10; object-fit: cover; }
.operation-card > div { padding: 24px; }
.operation-card h3 { margin: 0 0 8px; }
.operation-card dl, .company-contact-card dl { display: grid; grid-template-columns: minmax(105px, .45fr) 1fr; gap: 8px 16px; margin: 20px 0 0; }
.operation-card dt, .company-contact-card dt { color: var(--muted); font-size: 13px; font-weight: 700; }
.operation-card dd, .company-contact-card dd { margin: 0; overflow-wrap: anywhere; }
.company-contact-grid { display: grid; gap: 18px; margin-top: 24px; }
.company-contact-card { padding: 22px; border: 1px solid var(--line); background: var(--white); }
.company-contact-card.is-primary { border-top: 3px solid var(--brand); }
.company-contact-card h3 { margin: 0 0 6px; }
.company-english-name { color: var(--muted); font-size: 14px; }
.factory-photo-hero { margin: 0; }
.factory-photo-hero img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 4px; box-shadow: var(--shadow); }
.factory-photo-hero figcaption, .factory-gallery figcaption { font-size: 12px; font-weight: 700; letter-spacing: .04em; }
.factory-tour-video { display: block; width: min(100%, 960px); max-height: 620px; margin-bottom: 24px; background: #111; }
.factory-gallery img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
:lang(vi) body { font-family: Inter, "Segoe UI", Arial, sans-serif; }
@media (max-width: 980px) {
  .operation-grid { grid-template-columns: 1fr; }
  .language-switcher { order: 2; }
}
@media (max-width: 560px) {
  .language-switcher { gap: 1px; }
  .language-switcher .language-switch { min-height: 32px; padding-inline: 7px; }
  .operation-card dl, .company-contact-card dl { grid-template-columns: 1fr; gap: 4px; }
  .operation-card dd, .company-contact-card dd { margin-bottom: 8px; }
}
/* ===== audit refinements: responsive header, factory gallery, screen-reader text ===== */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.factory-tour-section { grid-template-columns: 1fr; }
.factory-tour-section > div:first-child { max-width: 780px; }
.factory-tour-content { width: 100%; }

/* ===== compare drawer & matrix ===== */
.compare-toggle {
  margin-top: 10px; padding: 6px 12px; font-size: 12px; font-weight: 700;
  letter-spacing: .04em; border: 1px solid var(--line); background: var(--white);
  color: var(--muted); border-radius: 2px; cursor: pointer;
}
.compare-toggle:hover { color: var(--brand); border-color: var(--brand); }
.compare-toggle.active { background: var(--brand); border-color: var(--brand); color: #fff; }
.compare-drawer {
  position: fixed; left: 50%; bottom: -120px; transform: translateX(-50%);
  z-index: 62; display: flex; align-items: center; gap: 14px;
  padding: 12px 16px; background: var(--charcoal, #242424); color: #fff;
  border-radius: 4px; box-shadow: 0 18px 44px rgba(0,0,0,.3);
  transition: bottom .3s cubic-bezier(.2,.7,.2,1); max-width: min(92vw, 860px);
}
.compare-drawer.show { bottom: 18px; }
.compare-items { display: flex; gap: 8px; flex-wrap: wrap; }
.compare-chip {
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 11px;
  border: 1px solid rgba(255,255,255,.25); background: transparent; color: #fff;
  border-radius: 2px; font-size: 13px; cursor: pointer;
}
.compare-chip:hover { border-color: #fff; }
.compare-actions { display: flex; gap: 8px; }
.compare-modal { position: fixed; inset: 0; z-index: 70; }
.compare-backdrop { position: absolute; inset: 0; background: rgba(20,20,20,.55); }
.compare-card {
  position: relative; margin: 6vh auto 0; width: min(94vw, 980px); max-height: 86vh;
  overflow: auto; background: var(--white); border-radius: 4px; padding: 26px;
  box-shadow: 0 30px 80px rgba(0,0,0,.35);
}
.compare-close { position: absolute; top: 10px; right: 10px; }
.compare-matrix { width: 100%; border-collapse: collapse; }
.compare-matrix th, .compare-matrix td {
  padding: 11px 14px; border-bottom: 1px solid var(--line);
  text-align: left; font-size: 14px; vertical-align: top;
}
.compare-matrix tr:first-child th { border-bottom: 2px solid var(--brand); }
.compare-matrix tr:first-child img {
  width: 132px; height: 92px; object-fit: cover; border-radius: 3px; display: block; margin-bottom: 8px;
}
.compare-matrix tr:first-child small { color: var(--muted); font-weight: 500; }
.compare-matrix th[scope="row"] { color: var(--muted); font-weight: 700; width: 160px; }
@media (max-width: 640px) { .compare-drawer { max-width: 96vw; flex-wrap: wrap; } }

/* ===== lightbox ===== */
.lb-zoomable { cursor: zoom-in; }
.factory-gallery .lb-zoomable,
.lookbook-cms-grid .lb-zoomable,
.lb-figure img { filter: saturate(.92) contrast(.96); }
.lb-zoomable:focus-visible { outline: 3px solid rgba(47, 95, 88, .55); outline-offset: 4px; }
.lightbox { position: fixed; inset: 0; z-index: 80; }
.lb-backdrop { position: absolute; inset: 0; background: rgba(15,15,15,.88); }
.lb-figure { position: relative; margin: 0; height: 100%; display: grid; place-items: center; padding: 4vh 7vw; }
.lb-figure img { max-width: 100%; max-height: 84vh; border-radius: 3px; box-shadow: 0 30px 90px rgba(0,0,0,.5); }
.lb-figure figcaption { position: absolute; left: 0; right: 0; bottom: 2.4vh; text-align: center; color: rgba(255,255,255,.9); font-size: 14px; padding: 0 8vw; }
.lb-counter { display: block; margin-top: 4px; color: rgba(255,255,255,.68); font-variant-numeric: tabular-nums; }
.lb-btn { position: absolute; z-index: 2; border: 0; background: rgba(255,255,255,.12); color: #fff; width: 46px; height: 46px; border-radius: 50%; font-size: 24px; cursor: pointer; display: grid; place-items: center; }
.lb-btn:hover { background: var(--brand); }
.lb-btn:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
.lb-close { top: 16px; right: 16px; }
.lb-prev { left: 14px; top: 50%; transform: translateY(-50%); }
.lb-next { right: 14px; top: 50%; transform: translateY(-50%); }
@media (max-width: 640px) { .lb-prev, .lb-next { width: 40px; height: 40px; } }

/* ===== conversion lift v3: buyer routing, guided RFQ, and faster shortlisting ===== */
.decision-panel,
.buyer-router,
.proof-section,
.product-guidance {
  background: var(--white);
}

.decision-panel {
  display: grid;
  grid-template-columns: minmax(260px, 0.55fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
  border-bottom: 1px solid var(--line);
}

.decision-grid,
.proof-grid,
.buyer-path-grid,
.product-guide-grid,
.color-route-grid {
  display: grid;
  gap: 16px;
}

.decision-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.decision-grid article,
.buyer-path-card,
.proof-grid article,
.product-guide-grid article,
.quote-ready-card,
.quote-prep-panel,
.color-route-card {
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--white);
  box-shadow: 0 12px 30px rgba(23, 23, 23, 0.05);
}

.decision-grid article,
.proof-grid article,
.product-guide-grid article,
.quote-ready-card,
.quote-prep-panel {
  padding: clamp(18px, 2.5vw, 26px);
}

.decision-grid span,
.proof-grid span {
  display: inline-flex;
  margin-bottom: 14px;
  color: var(--brand);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.decision-grid h3,
.proof-grid h3,
.buyer-path-card h3,
.product-guide-grid h3,
.quote-ready-card h2,
.quote-prep-panel h2 {
  margin: 0 0 10px;
}

.decision-grid p,
.proof-grid p,
.buyer-path-card p,
.product-guide-copy p,
.product-guide-grid p,
.quote-ready-card p,
.quote-prep-panel p,
.color-route-card small,
.sample-playbook {
  color: var(--muted);
  line-height: 1.65;
}

.buyer-path-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.buyer-path-card {
  display: grid;
  gap: 18px;
  padding: 24px;
  min-height: 100%;
}

.compact-check-list,
.quote-check-list {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.compact-check-list li,
.quote-check-list li {
  position: relative;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.5;
}

.compact-check-list li::before,
.quote-check-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
}

.proof-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.proof-grid article {
  background: var(--paper);
}

.product-guidance {
  display: grid;
  grid-template-columns: minmax(240px, 0.7fr) minmax(320px, 1fr) minmax(280px, 0.75fr);
  gap: clamp(20px, 4vw, 42px);
  align-items: start;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.product-guide-copy {
  max-width: 520px;
}

.product-guide-grid {
  grid-template-columns: 1fr;
}

.product-guide-grid article {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.product-guide-grid article:hover {
  transform: translateY(-3px);
  border-color: rgba(47, 95, 88, 0.35);
  box-shadow: 0 18px 38px rgba(23, 23, 23, 0.1);
}

.quote-ready-card {
  position: sticky;
  top: 104px;
  display: grid;
  gap: 18px;
  background: var(--paper);
}

.product-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
}

.product-card-actions .button,
.product-card-actions .compare-toggle {
  min-height: 36px;
  margin-top: 0;
  padding: 0 12px;
  font-size: 12px;
}

.quick-inquiry-add.is-confirmed {
  color: var(--white);
  border-color: var(--brand);
  background: var(--brand);
}

.color-route-panel {
  display: grid;
  grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
  gap: clamp(18px, 3vw, 34px);
  align-items: start;
  margin-bottom: 30px;
  padding: clamp(20px, 3vw, 30px);
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
}

.color-route-panel h3 {
  margin: 0;
}

.color-route-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.color-route-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  text-align: left;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.color-route-card span {
  color: var(--brand);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.color-route-card strong {
  color: var(--ink);
  font-size: 17px;
}

.color-route-card:hover,
.color-route-card:focus-visible {
  transform: translateY(-3px);
  border-color: rgba(47, 95, 88, 0.4);
  box-shadow: 0 18px 38px rgba(23, 23, 23, 0.1);
}

.sample-playbook {
  margin: 18px 0;
  padding: 14px 16px;
  border-left: 3px solid var(--brand);
  background: rgba(47, 95, 88, 0.07);
}

.quote-section:has(.quote-prep-panel) .quote-copy {
  grid-row: 1 / span 2;
}

.quote-prep-panel,
.quote-prep-panel + .inquiry-form {
  grid-column: 2;
}

.quote-prep-panel {
  display: grid;
  gap: 16px;
  background: var(--white);
}

.quote-prep-panel .quote-check-list {
  margin-top: 2px;
}

@media (max-width: 1180px) {
  .decision-grid,
  .buyer-path-grid,
  .proof-grid,
  .color-route-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-guidance {
    grid-template-columns: 1fr 1fr;
  }

  .quote-ready-card {
    position: static;
    grid-column: 1 / -1;
  }
}

@media (max-width: 860px) {
  .decision-panel,
  .color-route-panel,
  .product-guidance {
    grid-template-columns: 1fr;
  }

  .quote-section:has(.quote-prep-panel) .quote-copy,
  .quote-prep-panel,
  .quote-prep-panel + .inquiry-form {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 640px) {
  .decision-grid,
  .buyer-path-grid,
  .proof-grid,
  .color-route-grid {
    grid-template-columns: 1fr;
  }

  .product-card-actions .button,
  .product-card-actions .compare-toggle {
    flex: 1 1 100%;
  }

  .quote-ready-card .button {
    width: 100%;
  }
}

/* ===== print: clean product spec sheet from the product modal ===== */
@media print {
  .site-header, .site-footer, .contact-rail, .inquiry-fab, .to-top, .whatsapp-float,
  .compare-drawer, .filter-bar, .search-drawer, .mobile-panel, .lb-btn, .trust-bar,
  .menu-button, .header-actions { display: none !important; }
  body.modal-open main > :not(.modal) { display: none !important; }
  .modal, .modal-card { position: static !important; box-shadow: none !important; }
  .modal-backdrop { display: none !important; }
  .modal-card { width: 100% !important; max-height: none !important; overflow: visible !important; }
  .modal-card img { max-width: 60% !important; page-break-inside: avoid; }
  a[href^="http"]::after { content: ""; }
  @page { margin: 14mm; }
}

/* ===== major enrichment pass: homepage, content depth, and image gap-fill ===== */
html {
  scroll-behavior: smooth;
}

.video-hero {
  min-height: clamp(660px, 88vh, 920px);
  overflow: hidden;
  background: #18201e;
}

.hero-video,
.hero-video-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-video {
  z-index: 1;
  object-fit: cover;
}

.hero-video-fallback {
  z-index: 0;
  object-fit: cover;
}

.production-base-card img,
.category-feature-card img,
.home-application-card img,
.process-photo-grid img,
.packing-photo-grid img,
.sustainability-visual-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-hero .hero-overlay {
  z-index: 2;
  background: linear-gradient(90deg, rgba(12, 18, 17, 0.86), rgba(12, 18, 17, 0.54) 48%, rgba(12, 18, 17, 0.24));
}

.video-hero .hero-content {
  z-index: 3;
  max-width: 780px;
}

.home-trust-band {
  background: var(--ink);
  color: var(--paper);
  border-color: rgba(255, 255, 255, 0.12);
}

.editorial-heading {
  max-width: 860px;
}

.editorial-heading h2 {
  font-size: clamp(34px, 5vw, 58px);
  line-height: 0.98;
}

.home-production-bases,
.home-factory-section,
.home-applications-section {
  background: var(--white);
}

.featured-colors-band,
.how-buying-works,
.packing-photo-section,
.dual-base-map-section,
.partner-tier-section {
  background: var(--paper);
}

.production-base-grid,
.category-feature-grid,
.process-photo-grid,
.packing-photo-grid,
.sustainability-visual-grid,
.benefit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(18px, 3vw, 30px);
}

.production-base-card,
.category-feature-card,
.process-photo-grid article,
.benefit-grid article {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  box-shadow: 0 14px 36px rgba(26, 32, 30, 0.07);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.production-base-card:hover,
.category-feature-card:hover,
.process-photo-grid article:hover,
.benefit-grid article:hover,
.swatch-card:hover,
.application-card:hover,
.insight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(47, 95, 88, 0.28);
  box-shadow: 0 22px 50px rgba(26, 32, 30, 0.12);
}

.production-base-card picture,
.production-base-card > .asset-figure,
.category-feature-card picture,
.category-feature-card > .asset-figure,
.process-photo-grid picture {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.production-base-card > div,
.category-feature-card > div,
.benefit-grid article {
  padding: clamp(18px, 3vw, 26px);
}

.process-photo-grid article > p,
.process-photo-grid article > h3 {
  margin-inline: clamp(18px, 3vw, 26px);
}

.process-photo-grid article > p:last-child {
  margin-bottom: clamp(18px, 3vw, 26px);
}

.featured-color-scroller,
.home-application-carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 28vw);
  gap: 18px;
  overflow-x: auto;
  padding: 8px 0 18px;
  scroll-snap-type: x mandatory;
}

.featured-color-card,
.home-application-card {
  scroll-snap-align: start;
}

.featured-color-card {
  display: grid;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.featured-color-card picture {
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--line);
  background: var(--white);
}

.featured-color-card img,
.swatch-card img {
  transition: transform 260ms ease;
}

.featured-color-card:hover img,
.featured-color-card:focus-visible img,
.swatch-card:hover img {
  transform: scale(1.06);
}

.featured-color-card span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.category-feature-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.category-feature-card {
  display: flex;
  flex-direction: column;
}

.category-feature-card > .asset-figure figcaption,
.home-application-card > .asset-figure figcaption,
.insight-visual figcaption,
.application-card figcaption,
.sustainability-visual-grid figcaption {
  padding: 8px 10px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.92);
}

.home-factory-gallery {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-application-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.home-application-card > .asset-figure picture,
.home-application-card > .asset-figure {
  display: block;
}

.home-application-card > .asset-figure picture {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.home-application-card > div {
  padding: 18px;
}

.process-photo-grid,
.packing-photo-grid,
.sustainability-visual-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.packing-photo-grid,
.sustainability-visual-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.packing-photo-grid figure,
.sustainability-visual-grid figure,
.dual-base-map {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.packing-photo-grid picture,
.sustainability-visual-grid picture {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.packing-photo-grid figcaption,
.dual-base-map figcaption {
  padding: 12px 14px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.dual-base-map-section {
  display: grid;
  grid-template-columns: minmax(240px, 0.38fr) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 56px);
  align-items: center;
}

.dual-base-map svg {
  display: block;
  width: 100%;
  height: auto;
}

.tier-table {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
}

.tier-row {
  display: grid;
  grid-template-columns: 0.85fr 1fr 1.25fr;
  min-height: 58px;
  border-top: 1px solid var(--line);
}

.tier-row:first-child {
  border-top: 0;
}

.tier-row span {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-left: 1px solid var(--line);
}

.tier-row span:first-child {
  border-left: 0;
  font-weight: 800;
}

.tier-head {
  color: var(--white);
  background: var(--ink);
  font-weight: 800;
}

.library-layout .filter-rail {
  position: sticky;
  top: 92px;
  align-self: start;
}

.breadcrumbs {
  color: var(--muted);
  font-size: 13px;
  font-weight: 800;
}

.breadcrumbs a {
  color: var(--brand);
}

.button,
.nav-trigger,
.mobile-panel a,
.filter,
.sample-toggle,
.compare-toggle {
  min-height: 44px;
}

.product-grid:empty::before,
.swatch-grid:empty::before,
.application-grid:empty::before {
  content: "";
  display: block;
  min-height: 180px;
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(35, 48, 45, 0.06), rgba(35, 48, 45, 0.12), rgba(35, 48, 45, 0.06));
  animation: wr-skeleton 1.25s ease-in-out infinite;
}

@keyframes wr-skeleton {
  0%, 100% { opacity: 0.62; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .hero-video {
    display: none;
  }

  .hero-video-fallback {
    z-index: 0;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

@media (max-width: 1100px) {
  .category-feature-grid,
  .process-photo-grid,
  .home-factory-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .video-hero {
    min-height: 720px;
  }

  .production-base-grid,
  .category-feature-grid,
  .process-photo-grid,
  .packing-photo-grid,
  .sustainability-visual-grid,
  .benefit-grid,
  .dual-base-map-section {
    grid-template-columns: 1fr;
  }

  .featured-color-scroller,
  .home-application-carousel {
    grid-auto-columns: minmax(210px, 78vw);
  }

  .library-layout .filter-rail {
    position: static;
  }

  .tier-row,
  .tier-head {
    grid-template-columns: 1fr;
  }

  .tier-row span {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .tier-row span:first-child {
    border-top: 0;
  }

  .contact-rail {
    display: none;
  }
}

@media (max-width: 390px) {
  .inquiry-fab,
  .whatsapp-float,
  .to-top {
    right: 14px;
  }

  .inquiry-fab {
    bottom: 86px;
  }

  .whatsapp-float {
    bottom: 150px;
  }
}

```

---

## FILE: script.js

```js
const products = Array.isArray(window.WR_PRODUCTS) ? window.WR_PRODUCTS : [];
const colors = Array.isArray(window.WR_COLORS) ? window.WR_COLORS : [];
const finishes = Array.isArray(window.WR_FINISHES) ? window.WR_FINISHES : [];
const edges = Array.isArray(window.WR_EDGES) ? window.WR_EDGES : [];
const resources = window.WR_RESOURCES || { items: [] };
const applications = window.WR_APPLICATIONS || { items: [] };
const siteConfig = window.WR_SITE || {};

const productGrid = document.querySelector("#productGrid");
const productFilters = document.querySelectorAll(".filter[data-filter]");
const searchInput = document.querySelector("#productSearch");
const searchDrawer = document.querySelector("#searchDrawer");
const searchToggle = document.querySelector("#searchToggle");
const menuToggle = document.querySelector("#menuToggle");
const mobilePanel = document.querySelector("#mobilePanel");
const navTriggers = Array.from(document.querySelectorAll(".nav-trigger"));

let currentFilter = "All";
let activeProduct = null;
let activeColor = null;
let lastFocused = null;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPicture(item, field, alt, className = "") {
  const image = item[field];
  const webp = field === "swatchImage" ? item.swatchImageWebp : item.imageWebp;
  return `<picture${className ? ` class="${className}"` : ""}><source srcset="${escapeHtml(webp || image)}" type="image/webp" /><img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" width="${Number(item.imageWidth) || 1200}" height="${Number(item.imageHeight) || 900}" loading="lazy" decoding="async" /></picture>`;
}

function renderProducts() {
  if (!productGrid) return;
  const query = (searchInput?.value || "").toLowerCase().trim();
  const filtered = products.filter((product) => {
    const filterMatch = currentFilter === "All" || product.category === currentFilter;
    const haystack = `${product.title} ${product.category} ${product.material} ${product.description} ${product.sku}`.toLowerCase();
    return filterMatch && (!query || haystack.includes(query));
  });

  productGrid.innerHTML = filtered.map((product) => {
    const index = products.indexOf(product);
    const isRender = product.imageType !== "real";
    return `<article class="product-card" tabindex="0" role="button" aria-label="View ${escapeHtml(product.title)}" data-index="${index}">
      <figure class="product-visual">${renderPicture(product, "image", `${product.title}${isRender ? " illustrative render" : ""}`)}${isRender ? '<figcaption>Illustrative render — not actual product.</figcaption>' : ""}</figure>
      <div class="product-card-body"><p class="eyebrow">${escapeHtml(product.category)}</p><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.description)}</p><div class="product-meta"><span>${escapeHtml(product.sku)}</span><span>${escapeHtml(product.material)}</span><span>MOQ ${escapeHtml(product.specs?.MOQ || "by project")}</span></div><div class="product-card-actions"><button type="button" class="button small product-details-button" data-product-action="details" data-index="${index}">Details</button><button type="button" class="button small quick-inquiry-add" data-inquiry-sku="${escapeHtml(product.sku)}">Add to inquiry</button><button type="button" class="compare-toggle" data-compare-kind="product" data-compare-id="${escapeHtml(product.sku)}" aria-label="Compare ${escapeHtml(product.title)}" aria-pressed="false">Compare</button></div></div>
    </article>`;
  }).join("");

  if (!filtered.length) productGrid.innerHTML = '<p class="empty-state">No products matched this search. Try another material or category.</p>';
}

function mapInterest(category) {
  const map = {
    "Bathroom Vanity Top": "Bathroom vanity tops",
    "Kitchen Countertop": "Kitchen countertops",
    "Stone Furniture": "Stone furniture",
    "Commercial Project": "Custom commercial project",
  };
  return map[category] || "Material samples";
}

function applyPrefill(form, data) {
  const select = form.querySelector('select[name="interest"]');
  if (select && data.interest) {
    const match = Array.from(select.options).find((option) => option.value === data.interest || option.textContent === data.interest);
    if (match) select.value = match.value;
  }
  const textarea = form.querySelector('textarea[name="message"]');
  if (textarea && data.sku) {
    const line = `Product of interest: ${data.sku} — ${data.title}`;
    if (!textarea.value.includes(data.sku)) textarea.value = textarea.value ? `${line}\n\n${textarea.value}` : `${line}\n\n`;
  }
}

function requestQuoteFor(product) {
  if (!product) return;
  const data = { sku: product.sku, title: product.title, interest: mapInterest(product.category) };
  const form = document.querySelector("#inquiryForm");
  if (form) applyPrefill(form, data);
  else {
    try { sessionStorage.setItem("wr_inquiry", JSON.stringify(data)); } catch {}
  }
}

function addProductToInquiry(product, button) {
  if (!product) return;
  window.wrInquiry?.add({ sku: product.sku, title: product.title });
  if (!window.wrInquiry) {
    try { sessionStorage.setItem("wr_inquiry", JSON.stringify({ sku: product.sku, title: product.title, interest: mapInterest(product.category) })); } catch {}
  }
  if (button) {
    const previous = button.textContent;
    button.textContent = "Added";
    button.classList.add("is-confirmed");
    setTimeout(() => {
      button.textContent = previous;
      button.classList.remove("is-confirmed");
    }, 1400);
  }
}

function openModal(modal) {
  if (!modal) return;
  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close")?.focus();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeProduct = null;
  activeColor = null;
  if (lastFocused instanceof HTMLElement) lastFocused.focus();
}

function openProduct(index) {
  const product = products[index];
  const modal = document.querySelector("#productModal");
  if (!product || !modal) return;
  activeProduct = product;
  const isRender = product.imageType !== "real";
  const image = modal.querySelector("#modalImage");
  image.src = product.imageWebp || product.image;
  image.alt = `${product.title}${isRender ? " illustrative render" : ""}`;
  image.width = product.imageWidth || 1200;
  image.height = product.imageHeight || 900;
  modal.querySelector("#modalCaption").hidden = !isRender;
  modal.querySelector("#modalCategory").textContent = product.category;
  modal.querySelector("#modalTitle").textContent = product.title;
  modal.querySelector("#modalDescription").textContent = product.description;
  modal.querySelector("#modalSpecs").innerHTML = Object.entries(product.specs || {}).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join("");
  const specLink = modal.querySelector("#productTechSheet");
  specLink.hidden = !product.techSheetPdf;
  if (product.techSheetPdf) specLink.href = product.techSheetPdf;
  const relatedMaterial = ["Engineered Marble", "Granite", "Marble", "Quartz"].find((material) => product.material.includes(material));
  const relatedColors = modal.querySelector("#productRelatedColors");
  relatedColors.href = relatedMaterial ? `colors.html?material=${encodeURIComponent(relatedMaterial)}` : "colors.html";
  openModal(modal);
}

productFilters.forEach((button) => button.addEventListener("click", () => {
  productFilters.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  currentFilter = button.dataset.filter;
  renderProducts();
}));

productGrid?.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-inquiry-sku]");
  if (addButton) {
    event.preventDefault();
    event.stopPropagation();
    const product = products.find((item) => item.sku === addButton.dataset.inquirySku);
    addProductToInquiry(product, addButton);
    return;
  }
  const detailButton = event.target.closest("[data-product-action='details']");
  if (detailButton) {
    event.preventDefault();
    event.stopPropagation();
    openProduct(Number(detailButton.dataset.index));
    return;
  }
  const card = event.target.closest(".product-card");
  if (card) openProduct(Number(card.dataset.index));
});

productGrid?.addEventListener("keydown", (event) => {
  if (event.target.closest("button, a, input, select, textarea")) return;
  const card = event.target.closest(".product-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openProduct(Number(card.dataset.index));
  }
});

document.querySelectorAll(".product-guide-filter").forEach((button) => button.addEventListener("click", () => {
  const target = button.dataset.filterTarget || "All";
  const filterButton = Array.from(productFilters).find((item) => item.dataset.filter === target);
  if (filterButton) {
    productFilters.forEach((item) => item.classList.remove("active"));
    filterButton.classList.add("active");
    currentFilter = target;
    renderProducts();
    document.querySelector("#productGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}));

document.querySelector("#modalQuote")?.addEventListener("click", () => requestQuoteFor(activeProduct));

const colorGrid = document.querySelector("#colorGrid");
const colorMaterialFilter = document.querySelector("#colorMaterialFilter");
const colorFamilyFilter = document.querySelector("#colorFamilyFilter");
const colorFinishFilter = document.querySelector("#colorFinishFilter");
const selectedColorSlugs = new Set();
try {
  const storedColors = JSON.parse(sessionStorage.getItem("wr_sample_colors") || "[]");
  storedColors.slice(0, 4).forEach((slug) => selectedColorSlugs.add(slug));
} catch {}

function populateSelect(select, values) {
  if (!select) return;
  values.filter(Boolean).sort().forEach((value) => select.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));
}

function initializeColorFilters() {
  populateSelect(colorMaterialFilter, [...new Set(colors.map((color) => color.material))]);
  populateSelect(colorFamilyFilter, [...new Set(colors.map((color) => color.colorFamily))]);
  populateSelect(colorFinishFilter, [...new Set(colors.flatMap((color) => color.finishes || []))]);
}

function filteredColors() {
  return colors.filter((color) =>
    (!colorMaterialFilter || colorMaterialFilter.value === "All" || color.material === colorMaterialFilter.value) &&
    (!colorFamilyFilter || colorFamilyFilter.value === "All" || color.colorFamily === colorFamilyFilter.value) &&
    (!colorFinishFilter || colorFinishFilter.value === "All" || (color.finishes || []).includes(colorFinishFilter.value))
  );
}

function renderColors() {
  if (!colorGrid) return;
  const visible = filteredColors();
  document.querySelector("#colorResults").textContent = `${visible.length} surface${visible.length === 1 ? "" : "s"}`;
  colorGrid.innerHTML = visible.map((color) => {
    const isSelected = selectedColorSlugs.has(color.slug);
    const isRender = color.imageType !== "real";
    return `<article class="swatch-card">
      <button class="swatch-open" type="button" data-color="${escapeHtml(color.slug)}" aria-label="View ${escapeHtml(color.name)} details"><figure>${renderPicture(color, "swatchImage", `${color.name}${isRender ? " illustrative render" : ""}`)}${isRender ? '<figcaption>Illustrative render</figcaption>' : ""}</figure></button>
      <div class="swatch-card-body"><div><p class="eyebrow">${escapeHtml(color.material)} · ${escapeHtml(color.colorFamily)}</p><h3>${escapeHtml(color.name)}</h3><p>${escapeHtml((color.finishes || []).join(" / "))}</p></div><button class="sample-toggle${isSelected ? " selected" : ""}" type="button" data-sample="${escapeHtml(color.slug)}" aria-pressed="${isSelected}">${isSelected ? "Selected" : "Add sample"}</button><button type="button" class="compare-toggle" data-compare-kind="color" data-compare-id="${escapeHtml(color.slug)}" aria-label="Compare ${escapeHtml(color.name)}" aria-pressed="false">Compare</button></div>
    </article>`;
  }).join("");
  if (!visible.length) colorGrid.innerHTML = '<p class="empty-state">No colors match all three filters. Clear one filter to broaden the library.</p>';
}

function updateSampleKit() {
  const selected = colors.filter((color) => selectedColorSlugs.has(color.slug));
  const panel = document.querySelector("#selectedSamples");
  const input = document.querySelector("#selectedColorsInput");
  if (panel) panel.innerHTML = selected.length
    ? selected.map((color) => `<button type="button" data-remove-sample="${escapeHtml(color.slug)}"><span class="sample-chip" style="background-image:url('${escapeHtml(color.swatchImageWebp || color.swatchImage)}')"></span><span>${escapeHtml(color.name)}</span><span aria-hidden="true">×</span></button>`).join("")
    : "<p>No colors selected yet.</p>";
  if (input) input.value = selected.map((color) => `${color.name} (${color.material})`).join(", ");
  try { sessionStorage.setItem("wr_sample_colors", JSON.stringify([...selectedColorSlugs])); } catch {}
  renderColors();
}

function toggleSample(slug) {
  const note = document.querySelector("#sampleKitForm [data-form-note]");
  if (selectedColorSlugs.has(slug)) selectedColorSlugs.delete(slug);
  else if (selectedColorSlugs.size < 4) selectedColorSlugs.add(slug);
  else {
    if (note) {
      note.textContent = "Your kit already has four colors. Remove one before adding another.";
      note.className = "form-note is-error";
    }
    return;
  }
  if (note) {
    note.textContent = selectedColorSlugs.size ? `${selectedColorSlugs.size} of 4 colors selected.` : "Select one to four colors above before submitting.";
    note.className = "form-note";
  }
  updateSampleKit();
}

function openColor(slug) {
  const color = colors.find((item) => item.slug === slug);
  const modal = document.querySelector("#colorModal");
  if (!color || !modal) return;
  activeColor = color;
  const isRender = color.imageType !== "real";
  const image = modal.querySelector("#colorModalImage");
  image.src = color.swatchImageWebp || color.swatchImage;
  image.alt = `${color.name}${isRender ? " illustrative render" : ""}`;
  image.width = color.imageWidth || 1200;
  image.height = color.imageHeight || 900;
  modal.querySelector("#colorModalCaption").hidden = !isRender;
  modal.querySelector("#colorModalMeta").textContent = `${color.material} · ${color.colorFamily}`;
  modal.querySelector("#colorModalName").textContent = color.name;
  modal.querySelector("#colorModalDescription").textContent = color.description;
  modal.querySelector("#colorModalFinishes").textContent = (color.finishes || []).join(", ");
  modal.querySelector("#colorModalThicknesses").textContent = (color.thicknesses || []).join(", ");
  modal.querySelector("#colorModalSizes").textContent = (color.sizes || []).join(", ");
  const relatedProducts = color.relatedProducts || [];
  const relatedNode = modal.querySelector("#colorModalRelatedProducts");
  if (relatedNode) relatedNode.textContent = relatedProducts.length ? relatedProducts.join(", ") : "Cut-to-size surfaces, custom fabrication";
  const specLink = modal.querySelector("#colorTechSheet");
  specLink.hidden = !color.techSheetPdf;
  if (color.techSheetPdf) specLink.href = color.techSheetPdf;
  modal.querySelector("#colorRelatedProducts").href = `products.html?q=${encodeURIComponent((relatedProducts[0] || color.material || "").replace(/s$/, ""))}`;
  const sampleButton = modal.querySelector("#colorSampleButton");
  sampleButton.textContent = selectedColorSlugs.has(color.slug) ? "Remove from sample kit" : "Add to sample kit";
  openModal(modal);
}

colorGrid?.addEventListener("click", (event) => {
  const sample = event.target.closest("[data-sample]");
  const opener = event.target.closest("[data-color]");
  if (sample) toggleSample(sample.dataset.sample);
  else if (opener) openColor(opener.dataset.color);
});

document.querySelector("#selectedSamples")?.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove-sample]");
  if (remove) toggleSample(remove.dataset.removeSample);
});

document.querySelector("#colorSampleButton")?.addEventListener("click", () => {
  if (!activeColor) return;
  const slug = activeColor.slug;
  toggleSample(slug);
  const button = document.querySelector("#colorSampleButton");
  button.textContent = selectedColorSlugs.has(slug) ? "Remove from sample kit" : "Add to sample kit";
});

[colorMaterialFilter, colorFamilyFilter, colorFinishFilter].forEach((select) => select?.addEventListener("change", renderColors));
document.querySelector("#clearColorFilters")?.addEventListener("click", () => {
  [colorMaterialFilter, colorFamilyFilter, colorFinishFilter].forEach((select) => { if (select) select.value = "All"; });
  renderColors();
});

document.querySelectorAll("[data-color-family-shortcut]").forEach((button) => button.addEventListener("click", () => {
  const family = button.dataset.colorFamilyShortcut;
  if (colorFamilyFilter && Array.from(colorFamilyFilter.options).some((option) => option.value === family)) {
    colorFamilyFilter.value = family;
    renderColors();
    document.querySelector("#colorGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}));

function renderReferenceCards(containerId, items, kind) {
  const container = document.querySelector(containerId);
  if (!container) return;
  container.innerHTML = items.map((item) => {
    const isRender = item.imageType !== "real";
    const recommendations = (item.recommendedFor || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
    return `<article class="reference-card"><figure>${renderPicture(item, "image", `${item.name}${isRender ? " illustrative render" : ""}`)}${isRender ? '<figcaption>Illustrative render — not actual product.</figcaption>' : ""}</figure><div><p class="eyebrow">${kind}</p><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p>${recommendations ? `<ul>${recommendations}</ul>` : ""}</div></article>`;
  }).join("");
}

function renderResources() {
  const container = document.querySelector("#resourceGrid");
  if (!container) return;
  container.innerHTML = (resources.items || []).map((item) => `<article class="resource-card"><div class="resource-icon" aria-hidden="true">PDF</div><p class="eyebrow">${escapeHtml(item.category)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>${item.file ? `<a class="button small" href="${escapeHtml(item.file)}" download>Download PDF</a>` : '<span class="availability-note">Available on request</span>'}</article>`).join("");
}

function renderApplications() {
  const container = document.querySelector("#applicationGrid");
  if (!container) return;
  container.innerHTML = (applications.items || []).map((item) => {
    const isRender = item.imageType !== "real";
    const colorHref = item.featuredColorSlug ? `colors.html?color=${encodeURIComponent(item.featuredColorSlug)}` : "colors.html#sample-kit";
    const caption = item.caption || "Application inspiration";
    return `<article class="application-card"><figure>${renderPicture(item, "image", item.imageAlt || `${item.title}${isRender ? " illustrative render" : ""}`)}${isRender ? `<figcaption>${escapeHtml(caption)} - illustrative scene, not a WHITEROCK project.</figcaption>` : ""}</figure><div><p class="eyebrow">${escapeHtml(item.category)} · ${escapeHtml(item.featuredColor)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><a class="text-link" href="${colorHref}">View the featured color →</a></div></article>`;
  }).join("");
}

document.querySelectorAll("[data-modal-close]").forEach((element) => element.addEventListener("click", () => closeModal(element.closest(".modal"))));

document.addEventListener("keydown", (event) => {
  const modal = document.querySelector(".modal.open");
  if (!modal) return;
  if (event.key === "Escape") {
    closeModal(modal);
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = Array.from(modal.querySelectorAll('a[href]:not([hidden]), button:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])')).filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

searchToggle?.addEventListener("click", () => {
  searchDrawer?.classList.toggle("open");
  searchToggle.setAttribute("aria-expanded", String(searchDrawer?.classList.contains("open")));
  if (searchDrawer?.classList.contains("open")) searchInput?.focus();
});
searchInput?.addEventListener("input", renderProducts);

function closeDesktopNav(except = null) {
  navTriggers.forEach((trigger) => {
    if (trigger === except) return;
    trigger.setAttribute("aria-expanded", "false");
    trigger.closest(".nav-group")?.classList.remove("open");
  });
}

navTriggers.forEach((trigger) => {
  const group = trigger.closest(".nav-group");
  const dropdown = group?.querySelector(".nav-dropdown");
  const links = Array.from(dropdown?.querySelectorAll("a") || []);
  trigger.addEventListener("click", () => {
    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    closeDesktopNav(trigger);
    trigger.setAttribute("aria-expanded", String(willOpen));
    group?.classList.toggle("open", willOpen);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      closeDesktopNav(trigger);
      trigger.setAttribute("aria-expanded", "true");
      group?.classList.add("open");
      links[0]?.focus();
    } else if (event.key === "Escape") {
      closeDesktopNav();
    }
  });
  dropdown?.addEventListener("keydown", (event) => {
    const index = links.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      closeDesktopNav();
      trigger.focus();
    } else if (event.key === "ArrowDown" && index >= 0) {
      event.preventDefault();
      links[(index + 1) % links.length]?.focus();
    } else if (event.key === "ArrowUp" && index >= 0) {
      event.preventDefault();
      links[(index - 1 + links.length) % links.length]?.focus();
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-group")) closeDesktopNav();
});

document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".desktop-nav")) closeDesktopNav();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !document.querySelector(".modal.open")) closeDesktopNav();
});

menuToggle?.addEventListener("click", () => {
  mobilePanel?.classList.toggle("open");
  const open = Boolean(mobilePanel?.classList.contains("open"));
  mobilePanel?.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mobilePanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  mobilePanel.setAttribute("aria-hidden", "true");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open menu");
}));

function setFormNote(form, message, state = "") {
  const note = form.querySelector("[data-form-note], #formNote");
  if (!note) return;
  note.textContent = message;
  note.classList.remove("is-error", "is-success");
  if (state) note.classList.add(state);
}

const forms = [...new Set(document.querySelectorAll(".web3forms-form, #inquiryForm"))];
forms.forEach((form) => form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (form.id === "sampleKitForm" && !selectedColorSlugs.size) {
    setFormNote(form, "Select at least one color before submitting your sample request.", "is-error");
    document.querySelector("#colorGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (form.querySelector('[name="botcheck"]')?.checked) return;
  const accessKey = form.querySelector('[name="access_key"]')?.value || "";
  if (!accessKey || accessKey.toUpperCase().includes("WEB3FORMS_ACCESS_KEY")) {
    setFormNote(form, `Online submission is awaiting owner setup. Please email ${siteConfig.email || "lynn@whiterockstone.com"}.`, "is-error");
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  setFormNote(form, "Sending your inquiry…");
  if (submit) submit.disabled = true;
  try {
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
    const result = await response.json();
    if (!result.success) throw new Error("Submission rejected");
    form.reset();
    if (form.id === "sampleKitForm") { selectedColorSlugs.clear(); updateSampleKit(); }
    setFormNote(form, "Thank you. Your inquiry has been sent and we will reply by email shortly.", "is-success");
  } catch {
    setFormNote(form, `The form could not be sent. Please email ${siteConfig.email || "lynn@whiterockstone.com"} directly.`, "is-error");
  } finally {
    if (submit) submit.disabled = false;
  }
}));

(function initialize() {
  try {
    const stashed = sessionStorage.getItem("wr_inquiry");
    const form = document.querySelector("#inquiryForm");
    if (stashed && form) applyPrefill(form, JSON.parse(stashed));
    if (stashed) sessionStorage.removeItem("wr_inquiry");
  } catch {}
  initializeColorFilters();
  const params = new URLSearchParams(window.location.search);
  const requestedMaterial = params.get("material");
  if (requestedMaterial && colorMaterialFilter && Array.from(colorMaterialFilter.options).some((option) => option.value === requestedMaterial)) colorMaterialFilter.value = requestedMaterial;
  const requestedQuery = params.get("q");
  if (requestedQuery && searchInput) searchInput.value = requestedQuery;
  updateSampleKit();
  renderProducts();
  renderReferenceCards("#finishGrid", finishes, "Finish");
  renderReferenceCards("#edgeGrid", edges, "Edge profile");
  renderResources();
  renderApplications();
  const requestedColor = params.get("color");
  if (requestedColor && colors.some((color) => color.slug === requestedColor)) openColor(requestedColor);
})();

/* ===================== Inquiry List (multi-item RFQ cart) ===================== */
(function () {
  const KEY = "wr_inquiry_list";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const write = (list) => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {} ; renderBadge(); };

  // Floating badge
  const fab = document.createElement("a");
  fab.className = "inquiry-fab";
  fab.href = "contact.html#inquiry";
  fab.setAttribute("aria-label", "View inquiry list");
  fab.innerHTML = '<span class="inquiry-fab-icon" aria-hidden="true">▤</span><span class="inquiry-fab-count" id="inquiryCount">0</span>';
  document.body.appendChild(fab);

  function renderBadge() {
    const n = read().length;
    fab.classList.toggle("show", n > 0);
    const c = fab.querySelector("#inquiryCount");
    if (c) c.textContent = String(n);
  }

  window.wrInquiry = {
    add(item) {
      const list = read();
      if (!list.some((x) => x.sku === item.sku)) list.push(item);
      write(list);
    },
    remove(sku) { write(read().filter((x) => x.sku !== sku)); },
    clear() { write([]); },
    items: read,
  };

  // "Add to inquiry" in product modal
  document.querySelector("#modalAddInquiry")?.addEventListener("click", (e) => {
    const title = activeProduct?.title || document.querySelector("#modalTitle")?.textContent || "";
    const sku = activeProduct?.sku || (title.match(/WR-[A-Z0-9-]+/) || [title])[0];
    window.wrInquiry.add({ sku, title });
    const button = e.currentTarget;
    button.textContent = "Added ✓";
    setTimeout(() => { button.textContent = "Add to inquiry list"; }, 1400);
  });

  // On contact page: show the list above the form + prefill message
  const form = document.querySelector("#inquiryForm");
  if (form) {
    const items = read();
    if (items.length) {
      const box = document.createElement("div");
      box.className = "inquiry-list-box";
      box.innerHTML = '<strong>Inquiry list</strong><ul>' +
        items.map((x) => `<li data-sku="${x.sku}">${x.title || x.sku} <button type="button" class="inq-remove" aria-label="Remove">×</button></li>`).join("") +
        '</ul>';
      form.parentNode.insertBefore(box, form);
      const ta = form.querySelector('textarea[name="message"]');
      if (ta && !ta.value.includes("Inquiry list:")) {
        ta.value = "Inquiry list:\n" + items.map((x) => `- ${x.sku} ${x.title && x.title !== x.sku ? "(" + x.title + ")" : ""}`).join("\n") + "\n\n" + ta.value;
      }
      box.addEventListener("click", (ev) => {
        const b = ev.target.closest(".inq-remove"); if (!b) return;
        const li = b.closest("li"); window.wrInquiry.remove(li.dataset.sku); li.remove();
        if (!box.querySelector("li")) box.remove();
      });
      form.addEventListener("submit", () => window.wrInquiry.clear(), { once: true });
    }
  }
  renderBadge();
})();

/* ===================== in/cm unit toggle inside product modal ===================== */
(function () {
  const btn = document.querySelector("#unitToggle");
  const specs = document.querySelector("#modalSpecs");
  if (!btn || !specs) return;
  const IN_RE = /(\d+(?:\.\d+)?)(\s*(?:x|×)\s*(\d+(?:\.\d+)?))?\s*in\b/g;
  let metric = false, original = null;
  function toCm(text) {
    return text.replace(IN_RE, (m, a, _x, b) => {
      const f = (v) => (Math.round(parseFloat(v) * 2.54 * 10) / 10).toString();
      return b ? `${f(a)} x ${f(b)} cm` : `${f(a)} cm`;
    });
  }
  btn.addEventListener("click", () => {
    if (original === null) original = specs.innerHTML;
    metric = !metric;
    specs.innerHTML = metric ? toCm(original) : original;
    btn.setAttribute("aria-pressed", String(metric));
    btn.classList.toggle("active", metric);
  });
  // reset when a new product opens (modal image src changes)
  const img = document.querySelector("#modalImage");
  if (img) new MutationObserver(() => { original = null; metric = false; btn.classList.remove("active"); btn.setAttribute("aria-pressed","false"); })
    .observe(img, { attributes: true, attributeFilter: ["src"] });
})();

/* ===================== back to top ===================== */
(function () {
  const b = document.createElement("button");
  b.type = "button"; b.className = "to-top"; b.setAttribute("aria-label", "Back to top");
  b.innerHTML = "↑";
  document.body.appendChild(b);
  const onScroll = () => b.classList.toggle("show", window.scrollY > 700);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

/* ===================== CN-style count-up stats (hero + factory bands) ===================== */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Match numeric stat values such as "15+", "48", or "300"; skip pending or text-only values.
  const nodes = document.querySelectorAll(".hero-stats strong, .factory-stats strong, .stat-band strong, .capacity-section h3 + p strong");
  const targets = [];
  document.querySelectorAll(".hero-stats span > strong, [class*='stat'] strong").forEach((el) => {
    const m = (el.textContent || "").trim().match(/^(\d+)(\+|%)?$/);
    if (m) targets.push({ el, n: parseInt(m[1], 10), suffix: m[2] || "" });
  });
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const t = targets.find((x) => x.el === entry.target);
      io.unobserve(entry.target);
      if (!t) return;
      const dur = 900, start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        t.el.textContent = Math.round(t.n * eased) + (p === 1 ? t.suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  targets.forEach((t) => io.observe(t.el));
})();

/* ===================== right-side quick-contact rail (CN stone-site style) ===================== */
(function () {
  const cfg = window.WR_SITE || {};
  const tel = (cfg.tel || "").replace(/[^+\d]/g, "");
  const wa = (cfg.whatsapp || "").replace(/[^\d]/g, "");
  const hasWa = wa.length >= 8;
  const rail = document.createElement("nav");
  rail.className = "contact-rail";
  rail.setAttribute("aria-label", "Quick contact");
  rail.innerHTML = [
    tel ? `<a href="tel:${tel}" title="Call ${cfg.tel}"><span class="cr-ico">✆</span><span class="cr-label">${cfg.tel}</span></a>` : "",
    hasWa ? `<a href="https://wa.me/${wa}" target="_blank" rel="noopener" title="WhatsApp"><span class="cr-ico">✆</span><span class="cr-label">WhatsApp</span></a>` : "",
    cfg.email ? `<a href="mailto:${cfg.email}" title="Email us"><span class="cr-ico">✉</span><span class="cr-label">${cfg.email}</span></a>` : "",
    `<a href="contact.html#inquiry" title="Request a quote"><span class="cr-ico">▤</span><span class="cr-label">Request a quote</span></a>`,
  ].filter(Boolean).join("");
  document.body.appendChild(rail);
})();

/* ===================== static locale dictionary (EN root + /zh/) ===================== */
(function () {
  const dictionary = window.WR_I18N || {};
  if (!Object.keys(dictionary).length) return;

  function translate(value) {
    const text = String(value || "");
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    const core = text.trim();
    let next = dictionary[core];
    if (!next && window.WR_LOCALE?.id === "zh-Hans") {
      const surfaces = core.match(/^(\d+) surfaces?$/);
      const selected = core.match(/^(\d+) of 4 colors selected\.$/);
      const view = core.match(/^View (.+) details$/);
      if (surfaces) next = `${surfaces[1]} 款表面`;
      if (selected) next = `已选择 ${selected[1]} / 4 款颜色。`;
      if (view) next = `查看 ${view[1]} 详情`;
    }
    return next ? `${leading}${next}${trailing}` : text;
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const next = translate(root.nodeValue);
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) {
      ["aria-label", "title", "placeholder", "alt"].forEach((name) => {
        if (!root.hasAttribute(name)) return;
        const current = root.getAttribute(name);
        const next = translate(current);
        if (next !== current) root.setAttribute(name, next);
      });
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const next = translate(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
      } else {
        ["aria-label", "title", "placeholder", "alt"].forEach((name) => {
          if (!node.hasAttribute(name)) return;
          const current = node.getAttribute(name);
          const next = translate(current);
          if (next !== current) node.setAttribute(name, next);
        });
      }
    }
  }

  translateTree(document.body);
  new MutationObserver((records) => records.forEach((record) => {
    if (record.type === "characterData") translateTree(record.target);
    record.addedNodes?.forEach(translateTree);
  })).observe(document.body, { childList: true, characterData: true, subtree: true });
})();

/* ===================== Compare drawer (products & colors, max 3) ===================== */
(function () {
  const MAX = 3;
  const picked = []; // {kind, id}
  const productsArr = window.WR_PRODUCTS || [];
  const colorsArr = window.WR_COLORS || [];
  let compareReturnFocus = null;
  const find = (kind, id) => kind === "product"
    ? productsArr.find((x) => x.sku === id)
    : colorsArr.find((x) => x.slug === id);

  // Drawer skeleton
  const drawer = document.createElement("div");
  drawer.className = "compare-drawer";
  drawer.setAttribute("aria-live", "polite");
  drawer.innerHTML = '<div class="compare-items"></div>' +
    '<div class="compare-actions"><button type="button" class="button primary" id="compareNow" disabled>Compare now</button>' +
    '<button type="button" class="button" id="compareClear">Clear</button></div>';
  document.body.appendChild(drawer);
  const itemsBox = drawer.querySelector(".compare-items");
  const nowBtn = drawer.querySelector("#compareNow");

  // Modal skeleton
  const modal = document.createElement("div");
  modal.className = "compare-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Comparison table");
  modal.hidden = true;
  modal.innerHTML = '<div class="compare-backdrop" data-cclose></div>' +
    '<div class="compare-card"><button type="button" class="icon-button compare-close" data-cclose aria-label="Close comparison">×</button><div class="compare-table-wrap"></div></div>';
  document.body.appendChild(modal);

  function refresh() {
    itemsBox.innerHTML = picked.map((p) => {
      const item = find(p.kind, p.id) || {};
      const label = item.name || item.sku || p.id;
      return `<button type="button" class="compare-chip" data-unpick="${p.kind}:${p.id}">${label} <span aria-hidden="true">×</span></button>`;
    }).join("");
    drawer.classList.toggle("show", picked.length > 0);
    nowBtn.disabled = picked.length < 2;
    document.querySelectorAll(".compare-toggle").forEach((b) => {
      const on = picked.some((p) => p.kind === b.dataset.compareKind && p.id === b.dataset.compareId);
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
      b.textContent = on ? "Added" : "Compare";
      const item = find(b.dataset.compareKind, b.dataset.compareId) || {};
      const label = item.title || item.name || item.sku || b.dataset.compareId;
      b.setAttribute("aria-label", on ? `Remove ${label} from comparison` : `Compare ${label}`);
    });
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".compare-toggle");
    if (t) {
      e.preventDefault(); e.stopPropagation();
      const kind = t.dataset.compareKind, id = t.dataset.compareId;
      // 只允许同类比较:选了另一类则先清空
      if (picked.length && picked[0].kind !== kind) picked.length = 0;
      const idx = picked.findIndex((p) => p.kind === kind && p.id === id);
      if (idx >= 0) picked.splice(idx, 1);
      else if (picked.length < MAX) picked.push({ kind, id });
      refresh();
      return;
    }
    const chip = e.target.closest("[data-unpick]");
    if (chip) {
      const [kind, id] = chip.dataset.unpick.split(":");
      const idx = picked.findIndex((p) => p.kind === kind && p.id === id);
      if (idx >= 0) picked.splice(idx, 1);
      refresh();
    }
  }, true); // capture: 先于卡片的打开逻辑

  drawer.querySelector("#compareClear").addEventListener("click", () => { picked.length = 0; refresh(); });

  function rowsFor(kind, items) {
    if (kind === "product") {
      const keys = [];
      items.forEach((it) => Object.keys(it.specs || {}).forEach((k) => { if (!keys.includes(k)) keys.push(k); }));
      const head = ["Material", ...keys];
      return head.map((k) => [k, ...items.map((it) => k === "Material" ? (it.material || "—") : ((it.specs || {})[k] || "—"))]);
    }
    return [
      ["Material", ...items.map((c) => c.material || "—")],
      ["Color family", ...items.map((c) => c.colorFamily || "—")],
      ["Finishes", ...items.map((c) => (c.finishes || []).join(" / ") || "—")],
      ["Thickness", ...items.map((c) => (c.thicknesses || []).join(" / ") || "—")],
    ];
  }

  nowBtn.addEventListener("click", () => {
    if (picked.length < 2) return;
    const kind = picked[0].kind;
    const items = picked.map((p) => find(p.kind, p.id)).filter(Boolean);
    const imgKey = kind === "product" ? "imageWebp" : "swatchImageWebp";
    const imgAlt = kind === "product" ? "image" : "swatchImage";
    const header = '<tr><th scope="col"></th>' + items.map((it) =>
      `<th scope="col"><img src="${(it[imgKey] || it[imgAlt]) || ""}" alt="" loading="lazy" /><div>${it.name || it.sku}</div>${kind === "product" && it.imageType !== "real" ? '<small>Illustrative render</small>' : ""}</th>`).join("") + '</tr>';
    const body = rowsFor(kind, items).map((r) =>
      '<tr>' + r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join("") + '</tr>').join("");
    modal.querySelector(".compare-table-wrap").innerHTML =
      `<table class="compare-matrix"><caption class="sr-only">Comparison table</caption>${header}${body}</table>`;
    compareReturnFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".compare-close").focus();
  });

  function closeComparison() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (compareReturnFocus && document.contains(compareReturnFocus)) compareReturnFocus.focus();
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-cclose]")) closeComparison();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeComparison();
    if (e.key === "Tab") {
      const focusable = [...modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* ===================== Lightbox for gallery/lookbook images ===================== */
(function () {
  const SEL = ".factory-gallery img, .lookbook-cms-grid img";
  const imgs = Array.from(document.querySelectorAll(SEL)).filter((im) => !im.closest("a"));
  if (!imgs.length) return;
  const t = (source) => window.WR_I18N?.[source] || source;
  const box = document.createElement("div");
  box.className = "lightbox"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", t("Image viewer"));
  box.innerHTML = '<div class="lb-backdrop" data-lb-close></div>' +
    '<figure class="lb-figure"><img alt="" /><figcaption><span class="lb-caption"></span><span class="lb-counter" aria-live="polite"></span></figcaption></figure>' +
    `<button type="button" class="lb-btn lb-close" data-lb-close aria-label="${t("Close image viewer")}">×</button>` +
    `<button type="button" class="lb-btn lb-prev" aria-label="${t("Previous image")}">‹</button>` +
    `<button type="button" class="lb-btn lb-next" aria-label="${t("Next image")}">›</button>`;
  document.body.appendChild(box);
  const big = box.querySelector("img"), cap = box.querySelector(".lb-caption"), counter = box.querySelector(".lb-counter");
  let cur = 0, lastFocus = null;
  const captionFor = (im) => {
    const figure = im.closest("figure");
    return figure?.querySelector("figcaption strong")?.textContent?.trim()
      || figure?.querySelector("figcaption")?.textContent?.trim()
      || im.alt
      || t("Image");
  };
  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    const src = imgs[cur].currentSrc || imgs[cur].src;
    big.src = src; big.alt = imgs[cur].alt || "";
    cap.textContent = captionFor(imgs[cur]);
    counter.textContent = `${cur + 1} / ${imgs.length}`;
    counter.setAttribute("aria-label", `${t("Image")} ${cur + 1} / ${imgs.length}`);
  }
  function open(i) { lastFocus = document.activeElement; show(i); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); }
  function close() { if (box.hidden) return; box.hidden = true; document.body.style.overflow = ""; if (lastFocus?.focus) lastFocus.focus(); }
  imgs.forEach((im, i) => {
    im.classList.add("lb-zoomable");
    im.setAttribute("tabindex", "0"); im.setAttribute("role", "button");
    im.setAttribute("aria-haspopup", "dialog");
    im.setAttribute("aria-label", `${t("Open image")}: ${captionFor(im)}`);
    im.addEventListener("click", () => open(i));
    im.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
  });
  box.addEventListener("click", (e) => {
    if (e.target.closest("[data-lb-close]")) close();
    else if (e.target.closest(".lb-prev")) show(cur - 1);
    else if (e.target.closest(".lb-next")) show(cur + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "Tab") {
      const controls = Array.from(box.querySelectorAll("button:not([disabled])"));
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* print-support: mirror product modal open state onto <body> */
(function(){
  const modal=document.querySelector("#productModal"); if(!modal) return;
  new MutationObserver(()=>{document.body.classList.toggle("modal-open", modal.classList.contains("open"));})
    .observe(modal,{attributes:true,attributeFilter:["class"]});
})();

```

---

## FILE: scripts/build-site.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createContentSource } from "./content-source.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFile(path.join(root, file), "utf8");
const write = async (file, data) => {
  const target = path.join(root, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, data);
};
const contentSource = createContentSource(root);
const readJson = (file) => contentSource.readJson(file);

const localeManifest = JSON.parse(await read("data/locales.json"));
const locales = localeManifest.locales || [];
const defaultLocale = locales.find((locale) => locale.default) || locales[0];
const previewDraftLocales = process.env.WR_PREVIEW_DRAFT_LOCALES === "1";
const localeCatalogs = new Map();

for (const locale of locales) {
  const catalog = JSON.parse(await read(`data/i18n/site.${locale.id}.json`));
  localeCatalogs.set(locale.id, catalog);
}

function catalogMap(localeId) {
  const catalog = localeCatalogs.get(localeId) || { strings: [] };
  return new Map((catalog.strings || [])
    .filter((item) => item.source && item.translation)
    .map((item) => [item.source, item.translation]));
}

function catalogReadyForProduction(catalog) {
  const strings = catalog?.strings || [];
  return catalog?._meta?.reviewStatus === "approved"
    && strings.length > 0
    && strings.every((item) => item.translation && item.status === "approved");
}

function translator(localeId) {
  const map = catalogMap(localeId);
  return (value = "") => map.get(String(value)) || String(value);
}

function translateHtml(html, tx) {
  let output = html.replace(/>([^<>]+)</g, (match, text) => {
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    const core = text.trim();
    return core ? `>${leading}${tx(core)}${trailing}<` : match;
  });
  output = output.replace(/\b(aria-label|title|placeholder|alt)="([^"]*)"/gi, (match, name, value) => `${name}="${esc(tx(value))}"`);
  return output;
}

function localeUrl(locale, page) {
  const suffix = page.file === "index.html" ? "" : page.file;
  const pathPrefix = locale.urlPath ? `${locale.urlPath}/` : "";
  return `${locale.domain || config.productionDomain}/${pathPrefix}${suffix}`;
}

function localeIdentity(locale) {
  const contact = (companies.companies || []).find((item) => item.id === locale.contactId) || {};
  return {
    ...config,
    brand: locale.brand || config.brand,
    brandMark: locale.brandMark || "WR",
    tagline: locale.tagline || config.tagline,
    legalName: locale.legalName || config.legalName,
    productionDomain: locale.domain || config.productionDomain,
    email: contact.email || config.email,
    tel: contact.tel || config.tel,
    telHref: contact.telHref || config.telHref,
    address: contact.address || config.address,
    zip: contact.zip || "",
    contactId: locale.contactId,
  };
}

function localePagePath(locale, page) {
  return locale.outputDir ? `${locale.outputDir}/${page.file}` : page.file;
}

function localizeAssetPaths(html, locale) {
  if (!locale.outputDir) return html;
  return html.replace(/\b(src|srcset|href)="(assets\/|styles\.css|script\.js)([^"]*)"/gi, '$1="../$2$3"');
}

function isPublicLocale(locale) {
  return locale.id === defaultLocale.id || previewDraftLocales || catalogReadyForProduction(localeCatalogs.get(locale.id));
}

const config = await readJson("data/site.config.json");
const productData = await readJson("data/products.json");
const products = Array.isArray(productData) ? productData : productData.products;
const pageContent = await readJson("data/pages.json");
const lookbook = await readJson("data/lookbook.json");
const colorData = await readJson("data/colors.json");
const finishData = await readJson("data/finishes.json");
const edgeData = await readJson("data/edges.json");
const resources = await readJson("data/resources.json");
const partners = await readJson("data/partners.json");
const applications = await readJson("data/applications.json");
const compliance = await readJson("data/compliance.json");
const factory = await readJson("data/factory.json");
const projects = await readJson("data/projects.json");
const news = await readJson("data/news.json");
const faq = await readJson("data/faq.json");
const company = await readJson("data/company.json");
const companies = await readJson("data/companies.json");
const buyerJourney = await readJson("data/buyer-journey.json");
const colors = colorData.colors || [];
const finishes = finishData.finishes || [];
const edges = edgeData.edges || [];

if (!Array.isArray(products)) throw new Error("data/products.json must contain a products array.");

const headTpl = await read("src/partials/head.html");
const headerTpl = await read("src/partials/header.html");
const footerTpl = await read("src/partials/footer.html");

function runAssetPipeline() {
  if (process.env.WR_SKIP_ASSET_PIPELINE === "1") return;
  try {
    execFileSync(process.execPath, [path.join(root, "scripts/optimize-images.mjs")], { cwd: root, stdio: "inherit" });
  } catch {
    console.warn("Sharp is unavailable; falling back to Pillow image optimization.");
    try {
      const python = process.env.PYTHON || (process.platform === "win32"
        ? "C:/Users/somsn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe"
        : "python3");
      execFileSync(python, [path.join(root, "scripts/optimize-images.py")], { cwd: root, stdio: "inherit" });
    } catch (error) {
      console.warn("Asset optimization skipped or failed:", error.message);
    }
  }
}

runAssetPipeline();

let imageManifest = {};
try {
  imageManifest = await readJson("data/image-manifest.json");
} catch {}

function normalizeImage(item, field = "image") {
  if (!item[field]) return;
  item[field] = item[field].replace(/\.png$/i, ".jpg");
  item.imageWebp = item[field].replace(/\.(jpg|jpeg)$/i, ".webp");
  const dimensions = imageManifest[item[field]];
  if (dimensions) {
    item.imageWidth = dimensions.width;
    item.imageHeight = dimensions.height;
  }
}

for (const product of products) {
  product.imageType = product.imageType || (product.isIllustrative ? "render" : "real");
  product.isIllustrative = product.imageType !== "real";
  product.caption = product.isIllustrative ? "Illustrative render — not actual product." : "";
  normalizeImage(product);
}

for (const color of colors) {
  color.imageType = color.imageType || "render";
  normalizeImage(color, "swatchImage");
  color.swatchImageWebp = color.imageWebp;
}
for (const item of [...finishes, ...edges, ...(applications.items || [])]) {
  item.imageType = item.imageType || "render";
  normalizeImage(item);
}

const pages = [
  ["index.html", "WHITEROCK Stone | Marble, Granite, Quartz & Custom Stone Products", "WHITEROCK supplies stone surfaces, vanity tops, countertops, furniture, and custom fabrication for North American and global B2B buyers.", true],
  ["products.html", "Products | WHITEROCK Stone", "Explore WHITEROCK vanity tops, countertops, stone furniture, and custom commercial stone products.", true],
  ["colors.html", "Colors & Stone Design Library | WHITEROCK", "Browse WHITEROCK stone colors by material, color family, and finish, then request up to four samples."],
  ["materials.html", "Materials | WHITEROCK Stone", "Compare marble, granite, quartz, and engineered marble for WHITEROCK stone products."],
  ["finishes.html", "Finishes & Edge Profiles | WHITEROCK", "Visual reference for polished, honed, leathered stone finishes and popular countertop edge profiles."],
  ["applications.html", "Applications | WHITEROCK Stone", "Explore illustrative kitchen, bathroom, and hospitality surface directions for specification discussions."],
  ["factory.html", "Factory | WHITEROCK Stone", "WHITEROCK manufacturing capability, equipment, quality control, process, and export packing."],
  ["projects.html", "Projects & Case Studies | WHITEROCK", "Owner-approved WHITEROCK stone project references and case studies."],
  ["news.html", "News & Buyer Guides | WHITEROCK", "Specification and sourcing guidance for international stone buyers."],
  ["faq.html", "Buyer FAQ | WHITEROCK", "Answers about samples, quotations, custom production, inspection, packing, and stone export orders."],
  ["certifications.html", "Certifications & Test Reports | WHITEROCK", "Current owner-verified WHITEROCK certificates, test reports, and compliance documents."],
  ["sustainability.html", "Sustainability & Safety | WHITEROCK", "Crystalline silica safety, Prop 65, material traceability, and responsible stone production information."],
  ["resources.html", "Resources & Downloads | WHITEROCK", "Catalogs, care guidance, warranty, safety, compliance, and technical documents for stone buyers and fabricators."],
  ["partners.html", "Distributor & Trade Program | WHITEROCK", "Become a WHITEROCK distributor or trade partner for stone products manufactured in Vietnam."],
  ["order.html", "Order Process | WHITEROCK Stone", "How WHITEROCK handles samples, quotations, drawings, production, inspection, packing, and export orders."],
  ["about.html", "About | WHITEROCK Stone", "WHITEROCK LIMITED is a Vietnam-based stone manufacturer serving North American and global B2B buyers."],
  ["lookbook.html", "Lookbook | WHITEROCK Stone", "Stone product and material layout ideas, clearly identified as owner photography or illustrative renders."],
  ["contact.html", "Contact & Inquiry | WHITEROCK Stone", "Contact WHITEROCK for stone samples, quotations, drawings, and export orders."],
].map(([file, title, description, search = false]) => ({
  file,
  title,
  description,
  search,
  quoteHref: file === "contact.html" ? "#inquiry" : "contact.html#inquiry",
}));

const navGroups = [
  { label: "Products", items: [["products.html", "Products"], ["colors.html", "Colors"], ["materials.html", "Materials"], ["finishes.html", "Finishes & Edges"]] },
  { label: "Capability", items: [["factory.html", "Factory"], ["certifications.html", "Certifications"], ["sustainability.html", "Sustainability"]] },
  { label: "Inspiration", items: [["applications.html", "Applications"], ["projects.html", "Projects"], ["lookbook.html", "Lookbook"]] },
  { label: "Resources", items: [["resources.html", "Resources"], ["news.html", "News"], ["faq.html", "FAQ"], ["order.html", "How to Order"]] },
  { label: "Partners", href: "partners.html" },
  { label: "Contact", href: "contact.html" },
];

const footerGroups = [
  { label: "Products", items: navGroups[0].items },
  { label: "Capability", items: navGroups[1].items },
  { label: "Inspiration", items: navGroups[2].items },
  { label: "Resources", items: navGroups[3].items },
  { label: "Company", items: [["index.html", "Home"], ["about.html", "About"], ["partners.html", "Distributor Program"], ["contact.html", "Contact"]] },
];

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function applyTpl(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

function navHtml(activeFile) {
  return navGroups.map((group, index) => {
    if (group.href) return `<a${group.href === activeFile ? ' class="active" aria-current="page"' : ""} href="${group.href}">${group.label}</a>`;
    const active = group.items.some(([href]) => href === activeFile);
    const id = `nav-group-${index + 1}`;
    const links = group.items.map(([href, label]) => `<a${href === activeFile ? ' class="active" aria-current="page"' : ""} href="${href}">${label}</a>`).join("");
    return `<div class="nav-group${active ? " active" : ""}"><button class="nav-trigger" type="button" aria-expanded="false" aria-controls="${id}">${group.label}<span class="nav-chevron" aria-hidden="true"></span></button><div class="nav-dropdown" id="${id}">${links}</div></div>`;
  }).join("");
}

function mobileNavHtml(activeFile) {
  return navGroups.map((group) => {
    if (group.href) return `<a${group.href === activeFile ? ' class="active" aria-current="page"' : ""} href="${group.href}">${group.label}</a>`;
    const active = group.items.some(([href]) => href === activeFile);
    const links = group.items.map(([href, label]) => `<a${href === activeFile ? ' class="active" aria-current="page"' : ""} href="${href}">${label}</a>`).join("");
    return `<details class="mobile-nav-group"${active ? " open" : ""}><summary>${group.label}</summary><div>${links}</div></details>`;
  }).join("");
}

function footerLinks() {
  return footerGroups.map((group) => `<section class="footer-link-group" aria-labelledby="footer-${group.label.toLowerCase()}"><h2 id="footer-${group.label.toLowerCase()}">${group.label}</h2>${group.items.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</section>`).join("");
}

function localPicture(src, alt, width = 1200, height = 900, eager = false, caption = "") {
  const webp = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const img = `<picture><source srcset="${webp}" type="image/webp" /><img ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${src}" alt="${esc(alt)}" width="${width}" height="${height}" /></picture>`;
  return caption ? `<figure class="asset-figure">${img}<figcaption>${esc(caption)}</figcaption></figure>` : img;
}

function renderList(items = [], className = "") {
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderCapacityCards(items = []) {
  return items.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${esc(item)}</p></article>`).join("");
}

function renderPartnerTerms() {
  return (partners.terms || []).map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderPartnerOptions() {
  return (partners.businessTypes || []).map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("");
}

function renderFactoryStats() {
  return (factory.stats || []).map((item) => `<article><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span>${item.confirmed ? "" : '<small>Owner confirmation required</small>'}</article>`).join("");
}

function renderFactoryEquipment() {
  return (factory.equipment || []).map((item) => {
    let visual = "";
    if (item.media) {
      const dimensions = imageManifest[item.media] || {};
      const isRender = item.imageType === "render";
      const alt = item.alt || (isRender ? `${item.name} illustrative equipment image` : `${item.name} at the ${item.location || "WHITEROCK factory"}`);
      const caption = isRender ? (item.caption || "Illustrative image — not our actual equipment.") : "";
      visual = localPicture(item.media, alt, dimensions.width || 1200, dimensions.height || 900, false, caption);
    } else if (item.drawing) {
      visual = `<img class="equipment-drawing" data-vector src="${esc(item.drawing)}" alt="${esc(item.name)} line drawing" width="320" height="190" />`;
    }
    return `<article class="factory-equipment-card">${visual}<div><p class="eyebrow">${esc(item.location || "Production equipment")}</p><h3>${esc(item.name)}</h3><p>${esc(item.function)}</p><dl><dt>Brand / model</dt><dd>${esc(item.brand)}</dd><dt>Quantity</dt><dd>${esc(item.quantity)}</dd><dt>Key specification</dt><dd>${esc(item.keySpec)}</dd></dl>${item.media ? "" : '<small class="media-status-label">Line drawing shown until a real machine photo is supplied.</small>'}</div></article>`;
  }).join("");
}

function renderFactoryCapabilities() {
  return (factory.capabilities || []).map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderFactoryFlowSteps() {
  return (factory.flowSteps || []).map((item) => `<article><span>${esc(item.number)}</span><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join("");
}

function renderFactoryQc() {
  return `${renderList(factory.qc?.inspectionPoints, "check-list")}<dl class="factory-data-list"><dt>AQL sampling</dt><dd>${esc(factory.qc?.aql)}</dd><dt>Measuring tools</dt><dd>${esc(factory.qc?.tools)}</dd><dt>Third-party inspection</dt><dd>${esc(factory.qc?.thirdParty)}</dd></dl>`;
}

function renderFactoryRnd() {
  return `${renderList(factory.rnd?.capabilities, "check-list")}<p><strong>Sample-development lead time:</strong> ${esc(factory.rnd?.sampleLeadTime)}</p>`;
}

function renderFactoryMaterials() {
  return `<p>${esc(factory.materials?.copy)}</p><p><strong>Traceability:</strong> ${esc(factory.materials?.traceability)}</p>`;
}

function renderFactoryPacking() {
  const drawing = factory.packing?.drawing ? `<img class="packing-drawing" data-vector src="${esc(factory.packing.drawing)}" alt="Export packing line drawing" width="320" height="190" />` : "";
  return `${drawing}<div><p class="eyebrow">Packing & Container Loading</p><h2>Protection designed around the SKU.</h2><p>${esc(factory.packing?.copy)}</p><p>${esc(factory.packing?.loadability)}</p></div>`;
}

function renderFactoryTour() {
  const gallery = Array.isArray(factory.gallery) ? factory.gallery.filter((item) => item.image) : [];
  const images = gallery.map((item) => {
    const dimensions = imageManifest[item.image] || {};
    return `<figure>${localPicture(item.image, item.alt || item.title || "WHITEROCK factory", dimensions.width || 1200, dimensions.height || 900)}<figcaption>${esc(item.title || item.alt || "WHITEROCK factory")}</figcaption></figure>`;
  }).join("");
  const video = factory.tourVideo ? `<video class="factory-tour-video" controls preload="metadata" playsinline><source src="${esc(factory.tourVideo)}" type="video/mp4" />Your browser does not support embedded video.</video>` : "";
  return video || images ? `${video}<div class="factory-gallery">${images}</div>` : '<p class="empty-state-panel">Awaiting owner-supplied factory photography and a verified tour video.</p>';
}

function renderProjectCards() {
  const items = Array.isArray(projects.items) ? projects.items : [];
  if (!items.length) return '<div class="empty-state-panel"><strong>No project claims published yet.</strong><p>Add a real reference in the CMS with client permission, material, scope, quantity, location, and owner-supplied photography.</p></div>';
  return items.map((item) => {
    const isRender = item.imageType === "render";
    const caption = isRender ? "Illustrative render - not a completed WHITEROCK project." : "";
    return `<article class="case-study-card">${item.image ? localPicture(item.image, item.alt || item.title, item.imageWidth || 1200, item.imageHeight || 900, false, caption) : ""}<div><p class="eyebrow">${esc(item.location || (isRender ? "Illustrative study" : "Verified project"))}</p><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><dl><dt>Material</dt><dd>${esc(item.material)}</dd><dt>Scope</dt><dd>${esc(item.scope)}</dd><dt>Quantity</dt><dd>${esc(item.quantity)}</dd></dl></div></article>`;
  }).join("");
}

function renderNewsCards() {
  return (news.items || []).map((item) => {
    const dimensions = imageManifest[item.image] || {};
    const isRender = item.imageType === "render";
    const alt = item.imageAlt || `${item.title}${isRender ? " illustrative cover image" : ""}`;
    const caption = isRender ? (item.caption || "Illustrative cover image.") : "";
    const visual = item.image
      ? `<figure class="insight-visual">${localPicture(item.image, alt, dimensions.width || 1536, dimensions.height || 1024)}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}</figure>`
      : "";
    return `<article class="insight-card">${visual}<div class="insight-card-body"><p class="eyebrow">${esc(item.category)} · ${esc(item.date)}</p><h2>${esc(item.title)}</h2><p>${esc(item.excerpt)}</p><details><summary>Read guide</summary><p>${esc(item.body)}</p></details></div></article>`;
  }).join("");
}

function renderFaqItems() {
  return (faq.items || []).map((item) => `<details><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join("");
}

function renderCertificationCards() {
  const documentItems = (resources.items || []).filter((item) => ["Compliance", "Safety"].includes(item.category));
  const claims = (compliance.certifications || []).map((item) => ({ title: item, description: "Certification status awaiting owner verification.", file: "" }));
  return [...claims, ...documentItems].map((item) => `<article><p class="eyebrow">${item.file ? "Available" : "Pending"}</p><h3>${esc(item.title)}</h3><p>${esc(item.description || "Owner confirmation required.")}</p>${item.file ? `<a class="button small" href="${esc(item.file)}" download>Download verified document</a>` : '<span class="availability-note">Not yet published</span>'}</article>`).join("");
}

function renderCompanyMilestones() {
  return (company.milestones || []).map((item) => `<article><strong>${esc(item.label)}</strong><p>${esc(item.copy)}</p></article>`).join("");
}

function renderLookbookItems() {
  const configured = Array.isArray(lookbook.items) ? lookbook.items : [];
  const items = configured.length ? configured : products.filter((product) => ["WR-VT49", "WR-VT61D", "WR-KT-QC", "WR-FR-RM"].includes(product.sku));
  if (!items.length) return '<p class="empty-state">Project photography will be added as owner-supplied images become available.</p>';

  return items.map((item) => {
    const isRender = (item.imageType || (item.isIllustrative ? "render" : "real")) === "render";
    const image = (item.image || "assets/brand/hero-stone-v2.jpg").replace(/\.png$/i, ".jpg");
    const webp = item.imageWebp || image.replace(/\.(jpg|jpeg)$/i, ".webp");
    const alt = `${item.alt || item.title || "WHITEROCK stone product"}${isRender ? " illustrative render" : ""}`;
    const dimensions = imageManifest[image] || {};
    return `<figure class="lookbook-item"><picture><source srcset="${webp}" type="image/webp" /><img loading="lazy" decoding="async" src="${image}" alt="${esc(alt)}" width="${item.imageWidth || dimensions.width || 1536}" height="${item.imageHeight || dimensions.height || 1024}" /></picture><figcaption><span>${esc(item.category || item.material || "Stone product")}</span><strong>${esc(item.title || item.sku || "WHITEROCK project")}</strong>${isRender ? '<small>Illustrative render — not actual product.</small>' : ""}</figcaption></figure>`;
  }).join("");
}

function renderCompanyOperations(locale) {
  const preferred = locale.contactId;
  return [...(companies.companies || [])]
    .sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred))
    .map((item) => {
      const dimensions = imageManifest[item.image] || {};
      return `<article class="operation-card">${localPicture(item.image, item.imageAlt, dimensions.width || 1200, dimensions.height || 900)}<div><p class="eyebrow">${esc(item.role)}</p><h3>${esc(item.localName)}</h3><p>${esc(item.companyName)}</p><dl><dt>Country</dt><dd>${esc(item.country)}</dd><dt>Website</dt><dd><a href="${esc(item.domain)}">${esc(item.domain.replace(/^https?:\/\/(www\.)?/, ""))}</a></dd></dl></div></article>`;
    }).join("");
}

function renderCompanyContacts(locale) {
  const preferred = locale.contactId;
  return [...(companies.companies || [])]
    .sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred))
    .map((item) => `<article class="company-contact-card${item.id === preferred ? " is-primary" : ""}"><p class="eyebrow">${esc(item.role)}</p><h3>${esc(item.localName)}</h3><p class="company-english-name">${esc(item.companyName)}</p><dl>${item.taxCode ? `<dt>Tax Code</dt><dd>${esc(item.taxCode)}</dd>` : ""}${item.address ? `<dt>Factory Address</dt><dd>${esc(item.address)}</dd>` : ""}<dt>Contact Person</dt><dd>${esc(item.contactPerson)}</dd><dt>Tel</dt><dd><a href="tel:${esc(item.telHref)}">${esc(item.tel)}</a></dd><dt>Email</dt><dd><a href="mailto:${esc(item.email)}">${esc(item.email)}</a></dd></dl></article>`).join("");
}

function renderBuyerPaths() {
  return (buyerJourney.home?.paths || []).map((item) => `
    <article class="buyer-path-card">
      <div>
        <p class="eyebrow">${esc(item.bestStart)}</p>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.summary)}</p>
      </div>
      ${renderList(item.highlights || [], "compact-check-list")}
      <a class="text-link" href="${esc(item.href)}">${esc(item.ctaLabel)} -></a>
    </article>`).join("");
}

function renderDecisionSteps() {
  return (buyerJourney.decisionPanel?.steps || []).map((item) => `
    <article>
      <span>${esc(item.metric)}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
      <a class="text-link" href="${esc(item.href)}">${esc(item.ctaLabel)} -></a>
    </article>`).join("");
}

function renderProofPoints() {
  return (buyerJourney.proof?.points || []).map((item, index) => `
    <article>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
    </article>`).join("");
}

function renderProductGuidanceCards() {
  return (buyerJourney.products?.cards || []).map((item) => `
    <article>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.copy)}</p>
      <button class="text-button product-guide-filter" type="button" data-filter-target="${esc(item.filter)}">${esc(item.ctaLabel)}</button>
    </article>`).join("");
}

function renderQuoteChecklist(className = "quote-check-list") {
  return renderList(buyerJourney.quoteChecklist?.items || [], className);
}

function renderColorRoutes() {
  return (buyerJourney.colors?.routes || []).map((item) => `
    <button class="color-route-card" type="button" data-color-family-shortcut="${esc(item.family)}">
      <span>${esc(item.family)}</span>
      <strong>${esc(item.title)}</strong>
      <small>${esc(item.copy)}</small>
    </button>`).join("");
}

function renderFeaturedColorStrip() {
  return colors.slice(0, 12).map((color) => {
    const dimensions = imageManifest[color.swatchImage] || {};
    return `<a class="featured-color-card" href="colors.html?color=${esc(color.slug)}">
      ${localPicture(color.swatchImage, `${color.name} illustrative digital swatch`, dimensions.width || 1536, dimensions.height || 1024)}
      <span>${esc(color.colorFamily)} / ${esc(color.material)}</span>
      <strong>${esc(color.name)}</strong>
    </a>`;
  }).join("");
}

function renderHomeApplications() {
  return (applications.items || []).slice(0, 8).map((item) => {
    const dimensions = imageManifest[item.image] || {};
    const caption = item.caption || "Application inspiration";
    return `<article class="home-application-card">
      ${localPicture(item.image, item.imageAlt || `${item.title} illustrative application inspiration`, dimensions.width || 1536, dimensions.height || 1024, false, `${caption} - illustrative scene, not a WHITEROCK project.`)}
      <div><p class="eyebrow">${esc(item.category)}</p><h3>${esc(item.title)}</h3><p>${esc(item.featuredColor)}</p></div>
    </article>`;
  }).join("");
}

function renderHomeFactoryStrip() {
  const preferred = [
    "assets/factory/vietnam-factory-exterior.jpg",
    "assets/factory/vietnam-production-hall.jpg",
    "assets/factory/vietnam-vanity-qc-wide.jpg",
    "assets/gallery/vietnam/factory-04.jpg",
    "assets/gallery/china/factory-07.jpg",
    "assets/gallery/china/factory-09.jpg",
  ];
  const gallery = preferred
    .map((image) => (factory.gallery || []).find((item) => item.image === image) || { image, title: image.split("/").pop()?.replace(/\.[^.]+$/, ""), alt: "WHITEROCK factory photo" })
    .filter((item) => item.image);
  return gallery.map((item) => {
    const dimensions = imageManifest[item.image] || {};
    return `<figure>${localPicture(item.image, item.alt || item.title || "WHITEROCK factory photo", dimensions.width || 1200, dimensions.height || 900)}<figcaption>${esc(item.title || "Factory photo")}</figcaption></figure>`;
  }).join("");
}

function renderProductionBaseCards() {
  const vietnam = (companies.companies || []).find((item) => item.id === "vietnam") || {};
  const china = (companies.companies || []).find((item) => item.id === "china") || {};
  const cards = [
    {
      eyebrow: "Primary Production Base",
      title: "Vietnam factory",
      image: vietnam.image || "assets/factory/vietnam-factory-exterior.jpg",
      alt: vietnam.imageAlt || "WHITEROCK Vietnam factory photo",
      copy: "The Vietnam base is presented first for export production, order coordination, packing review, and shipment-ready communication.",
      stats: ["20,000 m² published factory area", "100,000+ m² published annual capacity", "Owner-confirmed details still replace TODO fields"],
    },
    {
      eyebrow: "Supporting Production Network",
      title: "Yunfu, China support",
      image: china.image || "assets/factory/china-factory-exterior.jpg",
      alt: china.imageAlt || "OPTIMA STONE China factory photo",
      copy: "The China base supports material sourcing, processing references, and production-network flexibility where the approved order route requires it.",
      stats: ["Stone-industry supply network", "Owner-supplied workshop photography", "Equipment claims remain confirmation-gated"],
    },
  ];
  return cards.map((card) => {
    const dimensions = imageManifest[card.image] || {};
    return `<article class="production-base-card">${localPicture(card.image, card.alt, dimensions.width || 1200, dimensions.height || 900)}<div><p class="eyebrow">${esc(card.eyebrow)}</p><h3>${esc(card.title)}</h3><p>${esc(card.copy)}</p>${renderList(card.stats, "compact-check-list")}</div></article>`;
  }).join("");
}

function renderProductCategoryCards() {
  const categories = [
    ["Bathroom Vanity Top", "Vanity Tops", "Bathroom vanity programs with bowl, faucet, backsplash, edge, and packing options."],
    ["Kitchen Countertop", "Countertops", "Kitchen and commercial counter pieces quoted by drawing, finish, edge, and cutout scope."],
    ["Stone Furniture", "Stone Furniture", "Tables, tops, shelves, and furniture surfaces for retail, hospitality, and project programs."],
    ["Commercial Project", "Commercial Projects", "Cut-to-size counters, panels, and project surfaces reviewed from BOQ and shop drawings."],
  ];
  return categories.map(([category, title, copy]) => {
    const product = products.find((item) => item.category === category) || products[0] || {};
    const isRender = product.imageType === "render" || product.isIllustrative;
    const dimensions = imageManifest[product.image] || {};
    const caption = isRender ? "Illustrative render — not actual product." : "";
    return `<article class="category-feature-card">
      ${product.image ? localPicture(product.image, `${title}${isRender ? " illustrative render" : ""}`, product.imageWidth || dimensions.width || 1536, product.imageHeight || dimensions.height || 1024, false, caption) : ""}
      <div><p class="eyebrow">${esc(category)}</p><h3>${esc(title)}</h3><p>${esc(copy)}</p><a class="text-link" href="products.html?q=${encodeURIComponent(category)}">View category -></a></div>
    </article>`;
  }).join("");
}

function buildStructuredData(page, identity, locale) {
  const pageUrl = localeUrl(locale, page);
  const base = identity.productionDomain.replace(/\/$/, "");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: identity.legalName,
    alternateName: identity.brand,
    url: base,
    email: identity.email,
    telephone: identity.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.address,
      postalCode: identity.zip,
      addressCountry: locale.contactId === "china" ? "CN" : "VN",
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity.brand,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/products.html?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: page.title.split("|")[0].trim(), item: pageUrl },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify([organization, website, breadcrumb])}</script>`;
}

function editableValues(locale, identity) {
  return {
    homeHeroEyebrow: esc(pageContent.homeHeroEyebrow),
    homeHeroTitle: esc(pageContent.homeHeroTitle),
    homeHeroCopy: esc(pageContent.homeHeroCopy),
    aboutFacts: renderList(pageContent.aboutFacts, "fact-list"),
    factoryCapacity: renderCapacityCards(pageContent.factoryCapacity),
    orderTerms: renderList(pageContent.orderTerms, "term-list"),
    materialsCopy: esc(pageContent.materialsCopy),
    lookbookItems: renderLookbookItems(),
    web3FormsAccessKey: esc(config.web3FormsAccessKey),
    partnerEyebrow: esc(partners.eyebrow),
    partnerTitle: esc(partners.title),
    partnerIntro: esc(partners.intro),
    partnerRegions: renderList(partners.targetRegions, "check-list"),
    partnerTerms: renderPartnerTerms(),
    partnerBusinessOptions: renderPartnerOptions(),
    resourcesIntro: esc(resources.intro),
    siteLegalName: esc(identity.legalName),
    siteAddress: esc(identity.address),
    siteEmail: esc(identity.email),
    siteTel: esc(identity.tel),
    siteTelHref: esc(identity.telHref),
    siteZip: esc(identity.zip),
    complianceEyebrow: esc(compliance.eyebrow),
    complianceTitle: esc(compliance.title),
    silicaTitle: esc(compliance.silicaTitle),
    silicaCopy: esc(compliance.silicaCopy),
    prop65Title: esc(compliance.prop65Title),
    prop65Copy: esc(compliance.prop65Copy),
    factoryHeroCopy: esc(factory.heroCopy),
    factoryStats: renderFactoryStats(),
    factoryEquipment: renderFactoryEquipment(),
    factoryCapabilities: renderFactoryCapabilities(),
    factoryFlowSteps: renderFactoryFlowSteps(),
    factoryQc: renderFactoryQc(),
    factoryRnd: renderFactoryRnd(),
    factoryMaterials: renderFactoryMaterials(),
    factoryPacking: renderFactoryPacking(),
    factoryCertifications: renderList(compliance.certifications || [], "certification-list"),
    factoryTour: renderFactoryTour(),
    projectsIntro: esc(projects.intro),
    projectCards: renderProjectCards(),
    newsIntro: esc(news.intro),
    newsCards: renderNewsCards(),
    faqIntro: esc(faq.intro),
    faqItems: renderFaqItems(),
    certificationCards: renderCertificationCards(),
    companyMission: esc(company.mission),
    companyOperations: renderCompanyOperations(locale),
    companyContactCards: renderCompanyContacts(locale),
    companyMilestones: renderCompanyMilestones(),
    companyAdvantages: renderList(company.advantages || [], "check-list"),
    whyVietnam: esc(company.whyVietnam),
    buyerHomeEyebrow: esc(buyerJourney.home?.eyebrow),
    buyerHomeTitle: esc(buyerJourney.home?.title),
    buyerHomeIntro: esc(buyerJourney.home?.intro),
    buyerPaths: renderBuyerPaths(),
    decisionEyebrow: esc(buyerJourney.decisionPanel?.eyebrow),
    decisionTitle: esc(buyerJourney.decisionPanel?.title),
    decisionSteps: renderDecisionSteps(),
    proofEyebrow: esc(buyerJourney.proof?.eyebrow),
    proofTitle: esc(buyerJourney.proof?.title),
    proofPoints: renderProofPoints(),
    productGuideEyebrow: esc(buyerJourney.products?.eyebrow),
    productGuideTitle: esc(buyerJourney.products?.title),
    productGuideIntro: esc(buyerJourney.products?.intro),
    productGuidanceCards: renderProductGuidanceCards(),
    quoteChecklistEyebrow: esc(buyerJourney.quoteChecklist?.eyebrow),
    quoteChecklistTitle: esc(buyerJourney.quoteChecklist?.title),
    quoteChecklist: renderQuoteChecklist(),
    colorRoutesEyebrow: esc(buyerJourney.colors?.eyebrow),
    colorRoutesTitle: esc(buyerJourney.colors?.title),
    colorRoutes: renderColorRoutes(),
    featuredColorStrip: renderFeaturedColorStrip(),
    homeApplications: renderHomeApplications(),
    homeFactoryStrip: renderHomeFactoryStrip(),
    productionBaseCards: renderProductionBaseCards(),
    productCategoryCards: renderProductCategoryCards(),
    factoryTourVideo: esc(factory.tourVideo || ""),
    contactPrepEyebrow: esc(buyerJourney.contact?.eyebrow),
    contactPrepTitle: esc(buyerJourney.contact?.title),
    contactPrepCopy: esc(buyerJourney.contact?.copy),
  };
}

function transformImageTag(tag, pageFile) {
  if (/data-dynamic-image|data-vector/i.test(tag) || /src="[^"]+\.svg"/i.test(tag)) return tag;
  const alt = tag.match(/alt="([^"]*)"/i)?.[1] || "WHITEROCK image";
  const eager = /loading="eager"/i.test(tag);
  const src = tag.match(/src="([^"]+)"/i)?.[1] || "";
  let local = src.startsWith("assets/") ? src : "assets/brand/hero-stone-v2.jpg";
  if (!src.startsWith("assets/")) {
    if (src.includes("white-marble")) local = "assets/materials/white-marble-v2.jpg";
    if (src.includes("ET73CW")) local = "assets/materials/granite-v2.jpg";
    if (src.includes("ET61CW")) local = "assets/materials/quartz-v2.jpg";
    if (src.includes("01_249")) local = "assets/materials/engineered-marble-v2.jpg";
  }
  local = local.replace(/\.png$/i, ".jpg");
  const dimensions = imageManifest[local] || {};
  const width = Number(tag.match(/width="(\d+)"/i)?.[1]) || dimensions.width || (local.includes("hero") ? 1536 : 1200);
  const height = Number(tag.match(/height="(\d+)"/i)?.[1]) || dimensions.height || (local.includes("hero") ? 1024 : 900);
  return localPicture(local, alt.replace("from WHITEROCK website", "").trim(), width, height, eager);
}

function transformMain(main, pageFile, identity) {
  let html = main;
  for (let i = 0; i < 4; i += 1) html = html.replace(/<picture\b[^>]*>[\s\S]*?(<img\b[^>]*>)[\s\S]*?<\/picture>/gi, "$1");
  html = html.replace(/https:\/\/www\.whiterockstone\.com\/?/g, config.productionDomain);
  html = html.replace(/lynn@whiterockstone\.com/g, identity.email);
  html = html.replace(/\+84 0798 858 220/g, identity.tel);
  html = html.replace(/YOUR_WEB3FORMS_ACCESS_KEY|TODO_WEB3FORMS_ACCESS_KEY/g, identity.web3FormsAccessKey);
  html = html.replace(/WHITEROCK LIMITED/g, identity.legalName);
  html = html.replace(/Factory Address: .*?Vietnam/g, `Factory Address: ${identity.address}`);
  html = html.replace(/<img\b[^>]*>/gi, (tag) => transformImageTag(tag, pageFile));
  html = html.replace(/<div class="photo-needed">Equipment photo available on request<\/div>/g, '<div class="line-icon" aria-hidden="true"><span></span><span></span><span></span></div>');
  if (pageFile === "products.html" && !html.includes("product-visual-note")) {
    html = html.replace(/(<section class="section product-section">)/, `$1\n<p class="product-visual-note">Some product visuals are illustrative renders pending company-owned product photography.</p>`);
  }
  if (pageFile === "index.html") html = html.replace(/href="#inquiry"/g, 'href="contact.html#inquiry"');
  return html;
}

function buildHead(page, locale, tx, identity) {
  const url = localeUrl(locale, page);
  const alternates = locales.filter(isPublicLocale).map((item) => `<link rel="alternate" hreflang="${item.hreflang}" href="${localeUrl(item, page)}" />`).join("\n  ");
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${localeUrl(defaultLocale, page)}" />`;
  const ogImage = /^https?:/i.test(identity.ogImage) ? identity.ogImage : `${identity.productionDomain}/${identity.ogImage.replace(/^\//, "")}`;
  const localizedTitle = page.title.replaceAll(config.brand, identity.brand);
  const localizedDescription = page.description.replaceAll(config.brand, identity.brand);
  return applyTpl(headTpl, {
    title: esc(tx(localizedTitle)), description: esc(tx(localizedDescription)), canonical: url,
    brand: esc(identity.brand), favicon: identity.favicon, ogImage,
    analyticsPlaceholder: identity.analyticsPlaceholder, hreflangLinks: `${alternates}\n  ${xDefault}`,
    structuredData: buildStructuredData(page, identity, locale),
  });
}

function buildHeader(page, locale, tx, identity) {
  const visibleLocales = locales.filter((item) => item.id === locale.id || isPublicLocale(item));
  const languageSwitch = `<nav class="language-switcher" aria-label="Language">${visibleLocales.map((item) => `<a class="language-switch${item.id === locale.id ? " active" : ""}" href="${localeUrl(item, page)}" lang="${item.htmlLang}" hreflang="${item.hreflang}"${item.id === locale.id ? ' aria-current="page"' : ""}>${esc(item.switchLabel)}</a>`).join("")}</nav>`;
  return applyTpl(headerTpl, {
    brand: identity.brand, brandMark: identity.brandMark, tagline: identity.tagline,
    nav: navHtml(page.file), mobileNav: mobileNavHtml(page.file),
    quoteHref: page.quoteHref, languageSwitch,
    searchButton: page.search ? '<button class="icon-button" id="searchToggle" aria-label="Search products" title="Search"><span aria-hidden="true">⌕</span></button>' : "",
  });
}

function buildFooter(identity) {
  return applyTpl(footerTpl, {
    brand: identity.brand, brandMark: identity.brandMark, tagline: identity.tagline, legalName: identity.legalName,
    tel: identity.tel, email: identity.email, footerLinks: footerLinks(),
  });
}

async function buildPage(page, locale) {
  const tx = translator(locale.id);
  const identity = localeIdentity(locale);
  const sourcePath = `src/pages/${page.file}`;
  try { await fs.access(path.join(root, sourcePath)); }
  catch { throw new Error(`Missing source page: ${sourcePath}`); }
  const source = applyTpl(await read(sourcePath), editableValues(locale, identity));
  const main = transformMain(source, page.file, identity);
  const catalog = localeCatalogs.get(locale.id);
  const reviewMessage = locale.id === "zh-Hans"
    ? "简体中文翻译草稿 — 发布前须由公司负责人或专业译者审核。"
    : "Bản dịch tiếng Việt đang ở dạng nháp — cần được công ty hoặc biên dịch viên chuyên nghiệp duyệt trước khi xuất bản.";
  const reviewBanner = locale.id !== defaultLocale.id && !catalogReadyForProduction(catalog)
    ? `<div class="translation-review-banner" role="status">${reviewMessage}</div>`
    : "";
  let html = `<!doctype html>\n<html lang="${locale.htmlLang}">\n  ${buildHead(page, locale, tx, identity)}\n  <body>\n    ${reviewBanner}\n    ${buildHeader(page, locale, tx, identity)}\n    ${main}\n    ${buildFooter(identity)}\n    <script src="products-data.js"></script>\n    <script src="script.js"></script>\n  </body>\n</html>\n`;
  html = translateHtml(html, tx);
  html = localizeAssetPaths(html, locale);
  await write(localePagePath(locale, page), html);
}

for (const locale of locales) {
  for (const page of pages) await buildPage(page, locale);
  const identity = localeIdentity(locale);
  const translations = Object.fromEntries(catalogMap(locale.id));
  const clientData = [
    ["WR_PRODUCTS", products], ["WR_SITE", identity], ["WR_COLORS", colors],
    ["WR_FINISHES", finishes], ["WR_EDGES", edges], ["WR_RESOURCES", resources],
    ["WR_PARTNERS", partners], ["WR_APPLICATIONS", applications], ["WR_COMPLIANCE", compliance],
    ["WR_FACTORY", factory], ["WR_PROJECTS", projects], ["WR_NEWS", news],
    ["WR_FAQ", faq], ["WR_COMPANY", company], ["WR_COMPANIES", companies], ["WR_I18N", translations],
    ["WR_LOCALE", { id: locale.id, htmlLang: locale.htmlLang, domain: locale.domain, draft: !catalogReadyForProduction(localeCatalogs.get(locale.id)) }],
  ].map(([name, value]) => `window.${name} = ${JSON.stringify(value, null, 2)};`).join("\n");
  const dataPath = locale.outputDir ? `${locale.outputDir}/products-data.js` : "products-data.js";
  await write(dataPath, `${clientData}\n`);
}

function sitemapXml(items) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.flatMap((locale) => pages.map((page) => `  <url><loc>${localeUrl(locale, page)}</loc></url>`)).join("\n")}\n</urlset>\n`;
}

const whiterockLocales = locales.filter((locale) => isPublicLocale(locale) && locale.domain === config.productionDomain);
const optimaLocale = locales.find((locale) => locale.domain === config.secondaryDomain);
await write("sitemap.xml", sitemapXml(whiterockLocales));
await write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /assets.html\nDisallow: /asset-loader.js\nDisallow: /admin/\nSitemap: ${config.productionDomain}/sitemap.xml\n`);
if (optimaLocale) {
  await write(`${optimaLocale.outputDir}/sitemap.xml`, sitemapXml(isPublicLocale(optimaLocale) ? [optimaLocale] : []));
  await write(`${optimaLocale.outputDir}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /assets.html\nDisallow: /asset-loader.js\nDisallow: /admin/\nSitemap: ${optimaLocale.domain}/sitemap.xml\n`);
}

console.log(`Built ${pages.length * locales.length} public pages across ${locales.length} locales and 2 domains using ${contentSource.status.mode}.`);

```

---

## FILE: scripts/content-source.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";

export function createContentSource(root) {
  async function readJson(file) {
    return JSON.parse(await fs.readFile(path.join(root, file), "utf8"));
  }

  return { readJson, status: { mode: "local-json" } };
}

```

---

## FILE: scripts/sync-i18n-catalogs.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicPages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html"));
const htmlFiles = [
  ...publicPages.map((file) => path.join(root, "src/pages", file)),
  ...publicPages.map((file) => path.join(root, file)),
  ...["head.html", "header.html", "footer.html"].map((file) => path.join(root, "src/partials", file)),
];
const strings = new Set();

function shouldTranslate(text) {
  if (!/[A-Za-z]/.test(text)) return false;
  if (/^(?:https?:|mailto:|tel:|assets\/)/i.test(text)) return false;
  if (/\.(?:jpg|jpeg|png|webp|svg|pdf)$/i.test(text)) return false;
  if (/^(?:WR(?:-[A-Z0-9-]+)?|TODO.*|\[confirm\].*)$/i.test(text)) return false;
  if (/^[a-z0-9-]+$/.test(text) && text.includes("-")) return false;
  if (/\{\{|\}\}/.test(text) || /^<!--.*-->$/.test(text)) return false;
  if (["website", "summary_large_image", "width=device-width, initial-scale=1.0"].includes(text)) return false;
  return true;
}

function add(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (text && shouldTranslate(text)) strings.add(text);
}

for (const file of htmlFiles) {
  try {
    const html = await fs.readFile(file, "utf8");
    for (const match of html.matchAll(/>([^<>]+)</g)) add(match[1]);
    for (const match of html.matchAll(/\b(?:aria-label|title|placeholder|alt|content)="([^"]+)"/g)) add(match[1]);
  } catch {}
}

["Image viewer", "Close image viewer", "Previous image", "Next image", "Open image", "Image"].forEach(add);

function walk(value) {
  if (typeof value === "string") add(value);
  else if (Array.isArray(value)) value.forEach(walk);
  else if (value && typeof value === "object") Object.values(value).forEach(walk);
}

for (const file of (await fs.readdir(path.join(root, "data"))).filter((file) => file.endsWith(".json") && file !== "image-manifest.json" && file !== "locales.json")) {
  walk(JSON.parse(await fs.readFile(path.join(root, "data", file), "utf8")));
}

const seeds = new Map(Object.entries({
  "Image viewer": "\u56fe\u7247\u67e5\u770b\u5668",
  "Close image viewer": "\u5173\u95ed\u56fe\u7247\u67e5\u770b\u5668",
  "Previous image": "\u4e0a\u4e00\u5f20\u56fe\u7247",
  "Next image": "\u4e0b\u4e00\u5f20\u56fe\u7247",
  "Open image": "\u6253\u5f00\u56fe\u7247",
  "Image": "\u56fe\u7247",
  "Home": "首页",
  "Products": "产品",
  "Colors": "颜色",
  "Materials": "材料",
  "Finishes": "表面处理",
  "Finishes & Edges": "表面处理与边型",
  "Capability": "生产能力",
  "Factory": "工厂",
  "Certifications": "认证",
  "Sustainability": "可持续发展",
  "Sustainability & Safety": "可持续发展与安全",
  "Inspiration": "灵感",
  "Applications": "应用场景",
  "Projects": "项目",
  "Lookbook": "案例图册",
  "Resources": "资料",
  "News": "新闻",
  "FAQ": "常见问题",
  "How to Order": "订购流程",
  "Partners": "合作伙伴",
  "Contact": "联系我们",
  "Company": "公司",
  "About": "关于我们",
  "Request a Quote": "获取报价",
  "Request a quote": "获取报价",
  "Send Inquiry": "提交询盘",
  "Add to inquiry list": "加入询价清单",
  "Inquiry list": "询价清单",
  "Remove": "移除",
  "Open menu": "打开菜单",
  "Close menu": "关闭菜单",
  "Main navigation": "主导航",
  "Mobile navigation": "移动端导航",
  "Breadcrumb": "面包屑导航",
  "Search products": "搜索产品",
  "Search product catalog": "搜索产品目录",
  "Product search": "产品搜索",
  "Product filters": "产品筛选",
  "All": "全部",
  "All materials": "全部材料",
  "All colors": "全部颜色",
  "All finishes": "全部表面处理",
  "Clear filters": "清除筛选",
  "Material": "材料",
  "Color family": "颜色系列",
  "Finish": "表面处理",
  "Sizes": "尺寸",
  "Thicknesses": "厚度",
  "Add to sample kit": "加入样品套装",
  "Add sample": "加入样品",
  "Remove from sample kit": "从样品套装移除",
  "Selected": "已选择",
  "Added ✓": "已加入 ✓",
  "Select up to 4 samples": "最多选择 4 款样品",
  "No colors selected yet.": "尚未选择颜色。",
  "Illustrative render": "示意效果图",
  "Illustrative render — not actual product.": "示意效果图 — 非实际产品照片。",
  "Download PDF": "下载 PDF",
  "Available on request": "可按需提供",
  "Related colors": "相关颜色",
  "Download spec sheet (PDF)": "下载规格书（PDF）",
  "Switch units": "切换单位",
  "Back to top": "返回顶部",
  "Quick contact": "快捷联系",
  "Email us": "发送邮件",
  "Select one": "请选择",
  "No products matched this search. Try another material or category.": "没有匹配的产品，请尝试其他材料或类别。",
  "No colors match all three filters. Clear one filter to broaden the library.": "没有同时符合三个筛选条件的颜色，请清除一个筛选项。",
  "Select one to four colors above before submitting.": "提交前请在上方选择 1 至 4 款颜色。",
  "Name": "姓名",
  "Email": "邮箱",
  "Country / Region": "国家 / 地区",
  "Product Interest": "感兴趣的产品",
  "Project Details": "项目详情",
  "We typically reply within one business day.": "我们通常会在一个工作日内回复。",
  "Natural and engineered stone products for North America and international markets.": "面向北美及国际市场的天然石材与人造石产品。"
}));

async function readExisting(file) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); }
  catch { return { strings: [] }; }
}

const i18nDir = path.join(root, "data/i18n");
await fs.mkdir(i18nDir, { recursive: true });
const zhPath = path.join(i18nDir, "site.zh-Hans.json");
const existingZh = await readExisting(zhPath);
const existingBySource = new Map((existingZh.strings || []).map((item) => [item.source, item]));
for (const source of seeds.keys()) strings.add(source);
const sources = [...strings].sort((a, b) => a.localeCompare(b));
const idFor = (source) => `s_${createHash("sha1").update(source).digest("hex").slice(0, 12)}`;
const english = sources.map((source) => ({ id: idFor(source), source, translation: source, status: "approved" }));
const chinese = sources.map((source) => {
  const existing = existingBySource.get(source);
  const translation = existing?.translation || seeds.get(source) || "";
  return { id: idFor(source), source, translation, status: translation ? (existing?.status || "draft") : "needs-translation" };
});
const translated = chinese.filter((item) => item.translation).length;

const enCatalog = {
  id: "site",
  _meta: { locale: "en", label: "English", reviewStatus: "approved", generated: true, totalStrings: english.length },
  strings: english,
};
const zhCatalog = {
  id: "site",
  _meta: {
    locale: "zh-Hans",
    label: "简体中文",
    reviewStatus: "draft",
    translationMethod: "AI-assisted starter glossary; human review required before production",
    generated: true,
    totalStrings: chinese.length,
    translatedStrings: translated,
  },
  strings: chinese,
};

await fs.writeFile(path.join(i18nDir, "site.en.json"), `${JSON.stringify(enCatalog, null, 2)}\n`);
await fs.writeFile(zhPath, `${JSON.stringify(zhCatalog, null, 2)}\n`);
console.log(`Synchronized ${sources.length} reviewable strings; ${translated} Chinese starter translations are marked draft.`);

const viSeeds = new Map(Object.entries({
  "Image viewer": "Tr\u00ecnh xem \u1ea3nh",
  "Close image viewer": "\u0110\u00f3ng tr\u00ecnh xem \u1ea3nh",
  "Previous image": "\u1ea2nh tr\u01b0\u1edbc",
  "Next image": "\u1ea2nh ti\u1ebfp theo",
  "Open image": "M\u1edf \u1ea3nh",
  "Image": "\u1ea2nh",
  "Home": "Trang chủ",
  "Products": "Sản phẩm",
  "Colors": "Màu sắc",
  "Materials": "Vật liệu",
  "Finishes": "Bề mặt",
  "Finishes & Edges": "Bề mặt & Cạnh",
  "Capability": "Năng lực",
  "Factory": "Nhà máy",
  "Certifications": "Chứng nhận",
  "Sustainability": "Phát triển bền vững",
  "Inspiration": "Cảm hứng",
  "Applications": "Ứng dụng",
  "Projects": "Dự án",
  "Lookbook": "Bộ sưu tập",
  "Resources": "Tài liệu",
  "News": "Tin tức",
  "FAQ": "Câu hỏi thường gặp",
  "How to Order": "Cách đặt hàng",
  "Partners": "Đối tác",
  "Contact": "Liên hệ",
  "Company": "Công ty",
  "About": "Giới thiệu",
  "Request a Quote": "Yêu cầu báo giá",
  "Request a quote": "Yêu cầu báo giá",
  "Send Inquiry": "Gửi yêu cầu",
  "Open menu": "Mở menu",
  "Close menu": "Đóng menu",
  "Main navigation": "Điều hướng chính",
  "Mobile navigation": "Điều hướng di động",
  "Breadcrumb": "Đường dẫn trang",
  "Search products": "Tìm sản phẩm",
  "All": "Tất cả",
  "All materials": "Tất cả vật liệu",
  "All colors": "Tất cả màu sắc",
  "All finishes": "Tất cả bề mặt",
  "Clear filters": "Xóa bộ lọc",
  "Material": "Vật liệu",
  "Color family": "Nhóm màu",
  "Finish": "Bề mặt",
  "Sizes": "Kích thước",
  "Thicknesses": "Độ dày",
  "Name": "Họ tên",
  "Email": "Email",
  "Country / Region": "Quốc gia / Khu vực",
  "Product Interest": "Sản phẩm quan tâm",
  "Project Details": "Chi tiết dự án",
  "Contact Person": "Người liên hệ",
  "Factory Address": "Địa chỉ nhà máy",
  "Tax Code": "Mã số thuế",
  "Tel": "Điện thoại",
  "Primary manufacturing base": "Cơ sở sản xuất chính",
  "Supporting manufacturing base": "Cơ sở sản xuất hỗ trợ",
  "Vietnam factory": "Nhà máy Việt Nam",
  "China factory": "Nhà máy Trung Quốc",
  "We typically reply within one business day.": "Chúng tôi thường phản hồi trong vòng một ngày làm việc.",
  "Natural and engineered stone products for North America and international markets.": "Sản phẩm đá tự nhiên và đá nhân tạo cho thị trường Bắc Mỹ và quốc tế."
}));
const viPath = path.join(i18nDir, "site.vi.json");
const existingVi = await readExisting(viPath);
const existingViBySource = new Map((existingVi.strings || []).map((item) => [item.source, item]));
const vietnamese = sources.map((source) => {
  const existing = existingViBySource.get(source);
  const translation = existing?.translation || viSeeds.get(source) || "";
  return { id: idFor(source), source, translation, status: translation ? (existing?.status || "draft") : "needs-translation" };
});
const viTranslated = vietnamese.filter((item) => item.translation).length;
const viCatalog = {
  id: "site",
  _meta: {
    locale: "vi",
    label: "Tiếng Việt",
    reviewStatus: "draft",
    translationMethod: "AI-assisted starter glossary; professional Vietnamese review required before production",
    generated: true,
    totalStrings: vietnamese.length,
    translatedStrings: viTranslated
  },
  strings: vietnamese
};
await fs.writeFile(viPath, `${JSON.stringify(viCatalog, null, 2)}\n`);
console.log(`Prepared ${viTranslated}/${sources.length} Vietnamese starter translations as a review-only draft.`);

```

---

## FILE: scripts/verify-i18n.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "data/locales.json"), "utf8"));
const pages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html")).sort();
const failures = [];

for (const locale of manifest.locales || []) {
  for (const page of pages) {
    const relative = locale.outputDir ? `${locale.outputDir}/${page}` : page;
    const absolute = path.join(root, relative);
    let html = "";
    try { html = await fs.readFile(absolute, "utf8"); }
    catch { failures.push(`Missing generated page: ${relative}`); continue; }
    if (!html.includes(`<html lang="${locale.htmlLang}">`)) failures.push(`Wrong html lang: ${relative}`);
    if (/\{\{\w+\}\}/.test(html)) failures.push(`Unresolved template token: ${relative}`);
    for (const match of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/gi)) {
      const raw = match[1].split(/\s+/)[0];
      if (!raw || /^(?:https?:|mailto:|tel:|#|data:)/i.test(raw)) continue;
      const clean = raw.split("#")[0].split("?")[0];
      if (!clean) continue;
      const target = path.resolve(path.dirname(absolute), clean);
      try { await fs.access(target); }
      catch { failures.push(`Broken local reference in ${relative}: ${raw}`); }
    }
  }
}

const catalogs = await Promise.all((manifest.locales || []).map(async (locale) => JSON.parse(await fs.readFile(path.join(root, `data/i18n/site.${locale.id}.json`), "utf8"))));
const baseIds = new Set((catalogs[0]?.strings || []).map((item) => item.id));
for (const catalog of catalogs.slice(1)) {
  const ids = new Set((catalog.strings || []).map((item) => item.id));
  for (const id of baseIds) if (!ids.has(id)) failures.push(`Missing translation ID ${id} in ${catalog?._meta?.locale}`);
  for (const id of ids) if (!baseIds.has(id)) failures.push(`Unexpected translation ID ${id} in ${catalog?._meta?.locale}`);
}

const baseById = new Map((catalogs[0]?.strings || []).map((item) => [item.id, item.source]));
for (const catalog of catalogs) {
  const strings = catalog?.strings || [];
  if (catalog?._meta?.totalStrings !== strings.length) failures.push(`Incorrect totalStrings in ${catalog?._meta?.locale}`);
  const translatedCount = strings.filter((item) => item.translation).length;
  if (catalog?._meta?.translatedStrings !== undefined && catalog._meta.translatedStrings !== translatedCount) failures.push(`Incorrect translatedStrings in ${catalog?._meta?.locale}`);
  for (const item of strings) {
    if (baseById.has(item.id) && baseById.get(item.id) !== item.source) failures.push(`Source mismatch for ${item.id} in ${catalog?._meta?.locale}`);
  }
  if (catalog?._meta?.reviewStatus === "approved") {
    const incomplete = strings.filter((item) => !item.translation || item.status !== "approved");
    if (incomplete.length) failures.push(`Approved locale ${catalog?._meta?.locale} still has ${incomplete.length} unapproved or empty strings`);
  }
}

const css = await fs.readFile(path.join(root, "styles.css"), "utf8");
const js = await fs.readFile(path.join(root, "script.js"), "utf8");
for (const marker of ["Refinement layer v2", "inquiry list / unit toggle / back-to-top", "right-side quick-contact rail", "bilingual locale switch"]) {
  if (!css.includes(marker)) failures.push(`Missing protected CSS marker: ${marker}`);
}
for (const marker of ["Inquiry List (multi-item RFQ cart)", "in/cm unit toggle", "right-side quick-contact rail", "static locale dictionary"]) {
  if (!js.includes(marker)) failures.push(`Missing protected JS marker: ${marker}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Verified ${pages.length * manifest.locales.length} generated locale pages, local references, catalog parity, and protected feature markers.`);

```

---

## FILE: scripts/check-static-output.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlRoots = [root, path.join(root, "zh"), path.join(root, "vi")];
const ignoredHtmlFiles = new Set(["assets.html"]);
const ignoreSchemes = /^(https?:|mailto:|tel:|sms:|whatsapp:|data:|#|javascript:)/i;
const problems = [];

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function htmlFiles(dir) {
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html") && !ignoredHtmlFiles.has(entry.name))
    .map((entry) => path.join(dir, entry.name));
}

function splitSrcset(value) {
  return value.split(",").map((part) => part.trim().split(/\s+/)[0]).filter(Boolean);
}

function normalizeRef(value, fromFile) {
  const clean = value.replace(/&amp;/g, "&").split("#")[0].split("?")[0];
  if (!clean || ignoreSchemes.test(clean)) return "";
  return path.resolve(path.dirname(fromFile), clean);
}

for (const dir of htmlRoots) {
  for (const file of await htmlFiles(dir)) {
    const html = await fs.readFile(file, "utf8");
    if (/\{\{[^}]+\}\}/.test(html)) problems.push(`${path.relative(root, file)} contains an unresolved template token.`);
    const attrs = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)].map((match) => match[1]);
    const srcsets = [...html.matchAll(/\bsrcset=["']([^"']+)["']/gi)].flatMap((match) => splitSrcset(match[1]));
    for (const ref of [...attrs, ...srcsets]) {
      const target = normalizeRef(ref, file);
      if (target && !(await exists(target))) problems.push(`${path.relative(root, file)} references missing file: ${ref}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Static output check passed: local links and asset references resolve.");

```

---

## FILE: scripts/optimize-images.py

```text
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
MANIFEST = ROOT / "data" / "image-manifest.json"
manifest = {}

for path in ASSETS.rglob("*"):
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    if path.name == "favicon.png":
        continue

    with Image.open(path) as img:
        img = img.convert("RGB")
        max_width = 1800
        if img.width > max_width:
            ratio = max_width / img.width
            img = img.resize((max_width, int(img.height * ratio)), Image.Resampling.LANCZOS)

        if path.suffix.lower() in {".jpg", ".jpeg"}:
            jpg_path = path
        else:
            jpg_path = path.with_suffix(".jpg")

        img.save(jpg_path, "JPEG", quality=82, optimize=True, progressive=True)

        webp_path = path.with_suffix(".webp")
        img.save(webp_path, "WEBP", quality=78, method=6)

        manifest[jpg_path.relative_to(ROOT).as_posix()] = {"width": img.width, "height": img.height}
        manifest[webp_path.relative_to(ROOT).as_posix()] = {"width": img.width, "height": img.height}

MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

print("Optimized images and generated real WebP files.")

```

---

## FILE: scripts/prepare-deploy.mjs

```js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const whiterockDist = path.join(dist, "whiterockstone.com");
const optimaDist = path.join(dist, "optimastone.com");
const includeDrafts = process.env.WR_INCLUDE_DRAFT_LOCALES === "1";
const publicExtensions = new Set([".css", ".gif", ".html", ".ico", ".jpeg", ".jpg", ".js", ".mp4", ".pdf", ".png", ".svg", ".webp", ".woff", ".woff2", ".xml", ".txt", ".yml"]);

if (path.dirname(dist) !== root || path.basename(dist) !== "dist") throw new Error(`Refusing to clean unexpected deployment directory: ${dist}`);

async function copyFileTo(relativeSource, targetRoot, relativeTarget = relativeSource, rewrite) {
  const source = path.join(root, relativeSource);
  const target = path.join(targetRoot, relativeTarget);
  await fs.mkdir(path.dirname(target), { recursive: true });
  if (rewrite) {
    const content = await fs.readFile(source, "utf8");
    await fs.writeFile(target, rewrite(content));
  } else {
    await fs.copyFile(source, target);
  }
}

async function copyPublicTreeTo(relativeDirectory, targetRoot, relativeTargetDirectory = relativeDirectory) {
  const sourceDirectory = path.join(root, relativeDirectory);
  for (const entry of await fs.readdir(sourceDirectory, { withFileTypes: true })) {
    const relativeSource = path.join(relativeDirectory, entry.name);
    const relativeTarget = path.join(relativeTargetDirectory, entry.name);
    if (entry.isDirectory()) await copyPublicTreeTo(relativeSource, targetRoot, relativeTarget);
    else {
      const extension = path.extname(entry.name).toLowerCase();
      const normalized = relativeSource.replaceAll("\\", "/");
      const isProductionPng = normalized === "assets/brand/favicon.png";
      if (entry.name.includes(".optimized.")) continue;
      if (publicExtensions.has(extension) && (extension !== ".png" || isProductionPng)) await copyFileTo(relativeSource, targetRoot, relativeTarget);
    }
  }
}

function catalogApproved(catalog) {
  const strings = catalog?.strings || [];
  return catalog?._meta?.reviewStatus === "approved" && strings.length > 0 && strings.every((item) => item.translation && item.status === "approved");
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(whiterockDist, { recursive: true });
await fs.mkdir(optimaDist, { recursive: true });

const pages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html"));
const commonFiles = ["styles.css", "script.js"];
for (const target of [whiterockDist, optimaDist]) {
  for (const file of commonFiles) await copyFileTo(file, target);
  await copyPublicTreeTo("assets", target);
}

for (const file of [...pages, "products-data.js", "sitemap.xml", "robots.txt"]) await copyFileTo(file, whiterockDist);
await copyFileTo("admin/index.html", whiterockDist);
await copyFileTo("admin/config.yml", whiterockDist);

const manifest = JSON.parse(await fs.readFile(path.join(root, "data/locales.json"), "utf8"));
const published = ["whiterockstone.com:en"];
for (const locale of (manifest.locales || []).filter((item) => item.outputDir)) {
  const catalog = JSON.parse(await fs.readFile(path.join(root, `data/i18n/site.${locale.id}.json`), "utf8"));
  if (!catalogApproved(catalog) && !includeDrafts) continue;
  if (locale.domain === "https://www.optimastone.com") {
    const rewriteRootPaths = (content) => content.replaceAll('../assets/', 'assets/').replaceAll('../styles.css', 'styles.css').replaceAll('../script.js', 'script.js');
    for (const file of [...pages, "products-data.js", "sitemap.xml", "robots.txt"]) {
      const rewrite = file.endsWith(".html") ? rewriteRootPaths : undefined;
      await copyFileTo(`${locale.outputDir}/${file}`, optimaDist, file, rewrite);
    }
    published.push(`optimastone.com:${locale.id}${catalogApproved(catalog) ? "" : " (review draft)"}`);
  } else {
    await copyPublicTreeTo(locale.outputDir, whiterockDist, locale.urlPath || locale.outputDir);
    published.push(`whiterockstone.com:${locale.id}${catalogApproved(catalog) ? "" : " (review draft)"}`);
  }
}

console.log(`Prepared domain deployments: ${published.join(", ")}.`);
```

---

## FILE: admin/index.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,nofollow" />
    <title>WHITEROCK Admin</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@3.11.0/dist/decap-cms.js"></script>
  </body>
</html>

```

---

## FILE: admin/config.yml

```yaml
backend:
  name: github
  # TODO: Replace with the GitHub repository that owns this site.
  repo: OWNER/REPO
  branch: main
  # TODO: Replace with the deployed Cloudflare OAuth Worker origin (no trailing slash).
  base_url: https://YOUR-WORKER.workers.dev
  auth_endpoint: auth

site_url: "https://www.whiterockstone.com"
display_url: "https://www.whiterockstone.com"
logo_url: "/assets/brand/favicon.png"
media_folder: "assets"
public_folder: "assets"
publish_mode: simple

collections:
  - name: "settings"
    label: "Site Settings"
    files:
      - label: "Company & Site Config"
        name: "site_config"
        file: "data/site.config.json"
        format: "json"
        fields:
          - { label: "Brand", name: "brand", widget: "string" }
          - { label: "Legal Name", name: "legalName", widget: "string" }
          - { label: "Tagline", name: "tagline", widget: "string" }
          - { label: "Production Domain", name: "productionDomain", widget: "string" }
          - { label: "OPTIMA Domain", name: "secondaryDomain", widget: "string" }
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Telephone", name: "tel", widget: "string" }
          - { label: "Telephone Link", name: "telHref", widget: "string" }
          - { label: "WhatsApp", name: "whatsapp", widget: "string", required: false }
          - { label: "Factory Address", name: "address", widget: "text" }
          - { label: "Zip Code", name: "zip", widget: "string" }
          - { label: "Web3Forms Access Key", name: "web3FormsAccessKey", widget: "string" }
          - { label: "OG Image", name: "ogImage", widget: "image" }
          - { label: "Favicon", name: "favicon", widget: "image" }
          - label: "Social Links"
            name: "social"
            widget: "object"
            fields:
              - { label: "LinkedIn", name: "linkedin", widget: "string", required: false }
              - { label: "Facebook", name: "facebook", widget: "string", required: false }
              - { label: "Instagram", name: "instagram", widget: "string", required: false }

  - name: "catalog"
    label: "Products"
    files:
      - label: "Product Catalog"
        name: "products"
        file: "data/products.json"
        format: "json"
        fields:
          - label: "Products"
            name: "products"
            widget: "list"
            summary: "{{fields.sku}} — {{fields.title}}"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "SKU", name: "sku", widget: "string" }
              - label: "Category"
                name: "category"
                widget: "select"
                options: ["Bathroom Vanity Top", "Kitchen Countertop", "Stone Furniture", "Commercial Project"]
              - { label: "Material", name: "material", widget: "string" }
              - { label: "Product Image", name: "image", widget: "image", media_folder: "/assets/products", public_folder: "assets/products", hint: "Upload a WHITEROCK-owned JPG or PNG. The build creates WebP and dimensions automatically." }
              - { label: "WebP Image", name: "imageWebp", widget: "hidden", required: false }
              - { label: "Image Width", name: "imageWidth", widget: "hidden", required: false }
              - { label: "Image Height", name: "imageHeight", widget: "hidden", required: false }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                options:
                  - { label: "Real Photo", value: "real" }
                  - { label: "Illustrative Render", value: "render" }
              - { label: "Illustrative Render?", name: "isIllustrative", widget: "hidden", required: false }
              - { label: "Caption", name: "caption", widget: "hidden", required: false }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Technical Sheet PDF", name: "techSheetPdf", widget: "file", media_folder: "/assets/resources/products", public_folder: "assets/resources/products", required: false, hint: "Optional. The download button is hidden until a PDF is uploaded." }
              - label: "Specs"
                name: "specs"
                widget: "object"
                collapsed: false
                fields:
                  - { label: "SKU", name: "SKU", widget: "string", required: false }
                  - { label: "Use", name: "Use", widget: "string", required: false }
                  - { label: "Size", name: "Size", widget: "string", required: false }
                  - { label: "Colors", name: "Colors", widget: "string", required: false }
                  - { label: "Sink", name: "Sink", widget: "string", required: false }
                  - { label: "Edge", name: "Edge", widget: "string", required: false }
                  - { label: "MOQ", name: "MOQ", widget: "string", required: false }
                  - { label: "Lead Time", name: "LeadTime", widget: "string", required: false }
                  - { label: "Packaging", name: "Packaging", widget: "string", required: false }

  - name: "page_data"
    label: "Editable Page Content"
    files:
      - label: "Page Content"
        name: "pages"
        file: "data/pages.json"
        format: "json"
        fields:
          - { label: "Home Hero Eyebrow", name: "homeHeroEyebrow", widget: "string" }
          - { label: "Home Hero Title", name: "homeHeroTitle", widget: "string" }
          - { label: "Home Hero Copy", name: "homeHeroCopy", widget: "text" }
          - { label: "About Facts", name: "aboutFacts", widget: "list", field: { label: "Fact", name: "fact", widget: "string" } }
          - { label: "Factory Capacity Notes", name: "factoryCapacity", widget: "list", field: { label: "Note", name: "note", widget: "string" } }
          - { label: "Order Terms", name: "orderTerms", widget: "list", field: { label: "Term", name: "term", widget: "string" } }
          - { label: "Materials Copy", name: "materialsCopy", widget: "text" }

      - label: "Buyer Journey & Conversion Content"
        name: "buyer_journey"
        file: "data/buyer-journey.json"
        format: "json"
        fields:
          - label: "Home Buyer Routing"
            name: "home"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Intro", name: "intro", widget: "text" }
              - label: "Buyer Paths"
                name: "paths"
                widget: "list"
                fields:
                  - { label: "Title", name: "title", widget: "string" }
                  - { label: "Summary", name: "summary", widget: "text" }
                  - { label: "Best Start", name: "bestStart", widget: "string" }
                  - { label: "Link URL", name: "href", widget: "string" }
                  - { label: "CTA Label", name: "ctaLabel", widget: "string" }
                  - { label: "Highlights", name: "highlights", widget: "list", field: { label: "Highlight", name: "highlight", widget: "string" } }
          - label: "Fast Start Panel"
            name: "decisionPanel"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - label: "Steps"
                name: "steps"
                widget: "list"
                fields:
                  - { label: "Title", name: "title", widget: "string" }
                  - { label: "Copy", name: "copy", widget: "text" }
                  - { label: "Metric", name: "metric", widget: "string" }
                  - { label: "Link URL", name: "href", widget: "string" }
                  - { label: "CTA Label", name: "ctaLabel", widget: "string" }
          - label: "Trust Proof Points"
            name: "proof"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - label: "Points"
                name: "points"
                widget: "list"
                fields:
                  - { label: "Title", name: "title", widget: "string" }
                  - { label: "Copy", name: "copy", widget: "text" }
          - label: "Product Selection Guide"
            name: "products"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Intro", name: "intro", widget: "text" }
              - label: "Guide Cards"
                name: "cards"
                widget: "list"
                fields:
                  - { label: "Title", name: "title", widget: "string" }
                  - { label: "Copy", name: "copy", widget: "text" }
                  - { label: "Product Filter", name: "filter", widget: "select", options: ["Bathroom Vanity Top", "Kitchen Countertop", "Stone Furniture", "Commercial Project"] }
                  - { label: "CTA Label", name: "ctaLabel", widget: "string" }
          - label: "Quote Checklist"
            name: "quoteChecklist"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Items", name: "items", widget: "list", field: { label: "Item", name: "item", widget: "string" } }
          - label: "Color Route Shortcuts"
            name: "colors"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - label: "Routes"
                name: "routes"
                widget: "list"
                fields:
                  - { label: "Color Family", name: "family", widget: "select", options: ["White", "Grey", "Black", "Beige", "Green", "Blue", "Brown", "Other"] }
                  - { label: "Title", name: "title", widget: "string" }
                  - { label: "Copy", name: "copy", widget: "text" }
          - label: "Contact Page Preparation Copy"
            name: "contact"
            widget: "object"
            fields:
              - { label: "Eyebrow", name: "eyebrow", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Copy", name: "copy", widget: "text" }

  - name: "lookbook"
    label: "Lookbook / Projects"
    files:
      - label: "Gallery"
        name: "gallery"
        file: "data/lookbook.json"
        format: "json"
        fields:
          - label: "Gallery Items"
            name: "items"
            widget: "list"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Category", name: "category", widget: "string" }
              - { label: "Image", name: "image", widget: "image", media_folder: "/assets/lookbook", public_folder: "assets/lookbook" }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                default: "real"
                options:
                  - { label: "Real WHITEROCK Photo", value: "real" }
                  - { label: "Illustrative Render", value: "render" }
              - { label: "Alt Text", name: "alt", widget: "string" }
              - { label: "Image Width", name: "imageWidth", widget: "hidden", required: false }
              - { label: "Image Height", name: "imageHeight", widget: "hidden", required: false }
              - { label: "Notes", name: "notes", widget: "text", required: false }

  - name: "design_library"
    label: "Colors & Design Library"
    files:
      - label: "Surface Colors"
        name: "colors"
        file: "data/colors.json"
        format: "json"
        fields:
          - label: "Colors"
            name: "colors"
            widget: "list"
            summary: "{{fields.name}} — {{fields.material}}"
            fields:
              - { label: "Slug", name: "slug", widget: "string", hint: "Lowercase URL-safe name, e.g. alpine-carrara" }
              - { label: "Name", name: "name", widget: "string" }
              - label: "Material"
                name: "material"
                widget: "select"
                options: ["Marble", "Granite", "Quartz", "Engineered Marble"]
              - { label: "Color Family", name: "colorFamily", widget: "select", options: ["White", "Grey", "Black", "Beige", "Green", "Blue", "Brown", "Other"] }
              - { label: "Finishes", name: "finishes", widget: "list", field: { label: "Finish", name: "finish", widget: "string" } }
              - { label: "Thicknesses", name: "thicknesses", widget: "list", field: { label: "Thickness", name: "thickness", widget: "string" } }
              - { label: "Sizes / Formats", name: "sizes", widget: "list", field: { label: "Size", name: "size", widget: "string" } }
              - { label: "Swatch Image", name: "swatchImage", widget: "image", media_folder: "/assets/colors", public_folder: "assets/colors" }
              - { label: "Swatch WebP", name: "swatchImageWebp", widget: "hidden", required: false }
              - { label: "Image Width", name: "imageWidth", widget: "hidden", required: false }
              - { label: "Image Height", name: "imageHeight", widget: "hidden", required: false }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                default: "render"
                options:
                  - { label: "Real WHITEROCK Sample Photo", value: "real" }
                  - { label: "Illustrative Render", value: "render" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Visible Caption", name: "caption", widget: "string", required: false, hint: "Use for illustrative-swatch disclosure." }
              - { label: "Related Products", name: "relatedProducts", widget: "list", required: false, field: { label: "Product Direction", name: "productDirection", widget: "string" } }
              - { label: "Technical Sheet PDF", name: "techSheetPdf", widget: "file", media_folder: "/assets/resources/colors", public_folder: "assets/resources/colors", required: false }

  - name: "finish_edge_library"
    label: "Finishes & Edges"
    files:
      - label: "Surface Finishes"
        name: "finishes"
        file: "data/finishes.json"
        format: "json"
        fields:
          - label: "Finishes"
            name: "finishes"
            widget: "list"
            summary: "{{fields.name}}"
            fields:
              - { label: "Slug", name: "slug", widget: "string" }
              - { label: "Name", name: "name", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Reference Image", name: "image", widget: "image", media_folder: "/assets/finishes", public_folder: "assets/finishes" }
              - { label: "Image Type", name: "imageType", widget: "select", options: [{ label: "Real WHITEROCK Photo", value: "real" }, { label: "Illustrative Render", value: "render" }] }
              - { label: "Recommended For", name: "recommendedFor", widget: "list", field: { label: "Application", name: "application", widget: "string" } }
      - label: "Edge Profiles"
        name: "edges"
        file: "data/edges.json"
        format: "json"
        fields:
          - label: "Edges"
            name: "edges"
            widget: "list"
            summary: "{{fields.name}}"
            fields:
              - { label: "Slug", name: "slug", widget: "string" }
              - { label: "Name", name: "name", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Reference Image", name: "image", widget: "image", media_folder: "/assets/edges", public_folder: "assets/edges" }
              - { label: "Image Type", name: "imageType", widget: "select", options: [{ label: "Real WHITEROCK Photo", value: "real" }, { label: "Illustrative Render", value: "render" }] }

  - name: "commercial_content"
    label: "Resources, Trade & Compliance"
    files:
      - label: "Resources & Downloads"
        name: "resources"
        file: "data/resources.json"
        format: "json"
        fields:
          - { label: "Introduction", name: "intro", widget: "text" }
          - label: "Resources"
            name: "items"
            widget: "list"
            summary: "{{fields.category}} — {{fields.title}}"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Category", name: "category", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "PDF File", name: "file", widget: "file", media_folder: "/assets/resources", public_folder: "assets/resources", required: false }
      - label: "Distributor Program"
        name: "partners"
        file: "data/partners.json"
        format: "json"
        fields:
          - { label: "Eyebrow", name: "eyebrow", widget: "string" }
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Introduction", name: "intro", widget: "text" }
          - { label: "Target Regions", name: "targetRegions", widget: "list", field: { label: "Region", name: "region", widget: "string" } }
          - { label: "Business Types", name: "businessTypes", widget: "list", field: { label: "Type", name: "type", widget: "string" } }
          - label: "Program Terms"
            name: "terms"
            widget: "list"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Copy", name: "copy", widget: "text" }
      - label: "Compliance & Safety"
        name: "compliance"
        file: "data/compliance.json"
        format: "json"
        fields:
          - { label: "Eyebrow", name: "eyebrow", widget: "string" }
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Silica Heading", name: "silicaTitle", widget: "string" }
          - { label: "Silica Copy", name: "silicaCopy", widget: "text" }
          - { label: "Prop 65 Heading", name: "prop65Title", widget: "string" }
          - { label: "Prop 65 Copy", name: "prop65Copy", widget: "text" }
          - { label: "Certifications Heading", name: "certificationsTitle", widget: "string" }
          - { label: "Certifications", name: "certifications", widget: "list", field: { label: "Certification", name: "certification", widget: "string" } }
          - { label: "Resource CTA", name: "resourceCta", widget: "string" }

  - name: "applications"
    label: "Applications / In-room Gallery"
    files:
      - label: "Application Scenes"
        name: "applications"
        file: "data/applications.json"
        format: "json"
        fields:
          - label: "Scenes"
            name: "items"
            widget: "list"
            summary: "{{fields.category}} — {{fields.title}}"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Category", name: "category", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Image", name: "image", widget: "image", media_folder: "/assets/applications", public_folder: "assets/applications" }
              - { label: "Image Alt Text", name: "imageAlt", widget: "string", required: false }
              - { label: "Visible Caption", name: "caption", widget: "string", required: false }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                options:
                  - { label: "Real WHITEROCK Project Photo", value: "real" }
                  - { label: "Illustrative Render", value: "render" }
              - { label: "Featured Color", name: "featuredColor", widget: "string" }
              - { label: "Featured Color Slug", name: "featuredColorSlug", widget: "string", required: false, hint: "Match a slug from the Colors collection." }

  - name: "factory_content"
    label: "Factory"
    files:
      - label: "Factory Capability"
        name: "factory"
        file: "data/factory.json"
        format: "json"
        fields:
          - { label: "Hero Copy", name: "heroCopy", widget: "text" }
          - label: "Factory Stats"
            name: "stats"
            widget: "list"
            summary: "{{fields.label}} — {{fields.value}}"
            fields:
              - { label: "Label", name: "label", widget: "string" }
              - { label: "Value", name: "value", widget: "string" }
              - { label: "Owner Confirmed", name: "confirmed", widget: "boolean", default: false }
          - label: "Equipment"
            name: "equipment"
            widget: "list"
            summary: "{{fields.name}}"
            fields:
              - { label: "Name", name: "name", widget: "string" }
              - { label: "Function", name: "function", widget: "text" }
              - { label: "Brand / Model", name: "brand", widget: "string" }
              - { label: "Quantity", name: "quantity", widget: "string" }
              - { label: "Key Specification / Precision", name: "keySpec", widget: "string" }
              - { label: "Line Drawing", name: "drawing", widget: "string", required: false }
              - { label: "Real Machine Photo", name: "media", widget: "image", media_folder: "/assets/factory", public_folder: "assets/factory", required: false, hint: "Upload only a real WHITEROCK-owned factory photo. It replaces the line drawing automatically." }
              - { label: "Location / Label", name: "location", widget: "string", required: false }
              - { label: "Alt Text", name: "alt", widget: "string", required: false }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                default: "real"
                options:
                  - { label: "Real WHITEROCK Photo", value: "real" }
                  - { label: "Illustrative Equipment Image", value: "render" }
              - { label: "Caption", name: "caption", widget: "string", required: false }
          - label: "Processing Capabilities"
            name: "capabilities"
            widget: "list"
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Copy", name: "copy", widget: "text" }
          - label: "Production Flow Steps"
            name: "flowSteps"
            widget: "list"
            fields:
              - { label: "Number", name: "number", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Copy", name: "copy", widget: "text" }
          - label: "Quality Control"
            name: "qc"
            widget: "object"
            fields:
              - { label: "Inspection Points", name: "inspectionPoints", widget: "list", field: { label: "Point", name: "point", widget: "string" } }
              - { label: "AQL Sampling", name: "aql", widget: "string" }
              - { label: "Measuring Tools", name: "tools", widget: "text" }
              - { label: "Third-party Inspection", name: "thirdParty", widget: "text" }
          - label: "R&D / Design"
            name: "rnd"
            widget: "object"
            fields:
              - { label: "Capabilities", name: "capabilities", widget: "list", field: { label: "Capability", name: "capability", widget: "string" } }
              - { label: "Sample Lead Time", name: "sampleLeadTime", widget: "string" }
          - label: "Materials & Traceability"
            name: "materials"
            widget: "object"
            fields:
              - { label: "Copy", name: "copy", widget: "text" }
              - { label: "Traceability", name: "traceability", widget: "text" }
          - label: "Packing"
            name: "packing"
            widget: "object"
            fields:
              - { label: "Copy", name: "copy", widget: "text" }
              - { label: "Loadability", name: "loadability", widget: "text" }
              - { label: "Line Drawing", name: "drawing", widget: "string", required: false }
          - { label: "Verified Factory Tour URL", name: "tourVideo", widget: "string", required: false }
          - label: "Real Factory Gallery"
            name: "gallery"
            widget: "list"
            required: false
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Image", name: "image", widget: "image", media_folder: "/assets/factory", public_folder: "assets/factory" }
              - { label: "Alt Text", name: "alt", widget: "string" }

  - name: "enriched_content"
    label: "Company, Projects, News & FAQ"
    files:
      - label: "Company / About"
        name: "company"
        file: "data/company.json"
        format: "json"
        fields:
          - { label: "Mission", name: "mission", widget: "text" }
          - label: "Milestones"
            name: "milestones"
            widget: "list"
            fields:
              - { label: "Label", name: "label", widget: "string" }
              - { label: "Copy", name: "copy", widget: "text" }
          - { label: "Advantages", name: "advantages", widget: "list", field: { label: "Advantage", name: "advantage", widget: "string" } }
          - { label: "Why Vietnam", name: "whyVietnam", widget: "text" }
      - label: "Projects / Case Studies"
        name: "projects"
        file: "data/projects.json"
        format: "json"
        fields:
          - { label: "Introduction", name: "intro", widget: "text" }
          - label: "Verified Projects"
            name: "items"
            widget: "list"
            required: false
            fields:
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Location", name: "location", widget: "string" }
              - { label: "Summary", name: "summary", widget: "text" }
              - { label: "Material", name: "material", widget: "string" }
              - { label: "Scope", name: "scope", widget: "string" }
              - { label: "Quantity", name: "quantity", widget: "string" }
              - { label: "Owner Photo", name: "image", widget: "image", media_folder: "/assets/projects", public_folder: "assets/projects" }
              - { label: "Alt Text", name: "alt", widget: "string" }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                default: "render"
                options:
                  - { label: "Real WHITEROCK Project Photo", value: "real" }
                  - { label: "Illustrative Render / Planning Study", value: "render" }
      - label: "News & Buyer Guides"
        name: "news"
        file: "data/news.json"
        format: "json"
        fields:
          - { label: "Introduction", name: "intro", widget: "text" }
          - label: "Articles"
            name: "items"
            widget: "list"
            fields:
              - { label: "Slug", name: "slug", widget: "string" }
              - { label: "Title", name: "title", widget: "string" }
              - { label: "Date", name: "date", widget: "datetime", time_format: false }
              - { label: "Category", name: "category", widget: "string" }
              - { label: "Excerpt", name: "excerpt", widget: "text" }
              - { label: "Body", name: "body", widget: "text" }
              - { label: "Optional Image", name: "image", widget: "image", media_folder: "/assets/news", public_folder: "assets/news", required: false }
              - { label: "Image Alt Text", name: "imageAlt", widget: "string", required: false }
              - label: "Image Type"
                name: "imageType"
                widget: "select"
                default: "render"
                options:
                  - { label: "Real WHITEROCK Photo", value: "real" }
                  - { label: "Illustrative Cover", value: "render" }
              - { label: "Caption", name: "caption", widget: "string", required: false }
      - label: "Buyer FAQ"
        name: "faq"
        file: "data/faq.json"
        format: "json"
        fields:
          - { label: "Introduction", name: "intro", widget: "text" }
          - label: "Questions"
            name: "items"
            widget: "list"
            fields:
              - { label: "Question", name: "question", widget: "string" }
              - { label: "Answer", name: "answer", widget: "text" }

  - name: "translations"
    label: "Translations"
    label_singular: "Translation Catalog"
    folder: "data/i18n"
    create: false
    extension: "json"
    format: "json"
    identifier_field: "id"
    i18n:
      structure: "multiple_files"
      locales: ["en", "zh-Hans", "vi"]
      default_locale: "en"
    fields:
      - { label: "Catalog ID", name: "id", widget: "hidden", i18n: "duplicate" }
      - label: "Review Metadata"
        name: "_meta"
        widget: "object"
        i18n: true
        fields:
          - { label: "Locale", name: "locale", widget: "string", i18n: true }
          - { label: "Label", name: "label", widget: "string", i18n: true }
          - { label: "Review Status", name: "reviewStatus", widget: "select", options: ["draft", "in-review", "approved"], i18n: true }
          - { label: "Translation Method / Note", name: "translationMethod", widget: "text", required: false, i18n: true }
          - { label: "Generated Catalog", name: "generated", widget: "boolean", i18n: "duplicate" }
          - { label: "Total Strings", name: "totalStrings", widget: "number", i18n: "duplicate" }
          - { label: "Translated Strings", name: "translatedStrings", widget: "number", required: false, i18n: true }
      - label: "Reviewable Strings"
        name: "strings"
        widget: "list"
        i18n: true
        summary: "{{fields.id}} — {{fields.source}}"
        fields:
          - { label: "Stable ID", name: "id", widget: "string" }
          - { label: "English Source", name: "source", widget: "text" }
          - { label: "Translation", name: "translation", widget: "text", required: false }
          - { label: "Status", name: "status", widget: "select", options: ["needs-translation", "draft", "in-review", "approved"] }

  - name: "company_directory"
    label: "Vietnam & China Companies"
    files:
      - label: "Company Directory"
        name: "companies"
        file: "data/companies.json"
        format: "json"
        fields:
          - label: "Companies"
            name: "companies"
            widget: "list"
            summary: "{{fields.country}} — {{fields.localName}}"
            fields:
              - { label: "ID", name: "id", widget: "select", options: ["vietnam", "china"] }
              - { label: "Country", name: "country", widget: "string" }
              - { label: "Role", name: "role", widget: "string" }
              - { label: "English Company Name", name: "companyName", widget: "string" }
              - { label: "Local Name Label", name: "localNameLabel", widget: "string" }
              - { label: "Local Company Name", name: "localName", widget: "string" }
              - { label: "Tax Code", name: "taxCode", widget: "string", required: false }
              - { label: "Factory Address", name: "address", widget: "text", required: false }
              - { label: "Contact Person", name: "contactPerson", widget: "string" }
              - { label: "Telephone", name: "tel", widget: "string" }
              - { label: "Telephone Link", name: "telHref", widget: "string" }
              - { label: "Email", name: "email", widget: "string" }
              - { label: "Domain", name: "domain", widget: "string" }
              - { label: "Factory Image", name: "image", widget: "image", media_folder: "/assets/factory", public_folder: "assets/factory" }
              - { label: "Image Alt Text", name: "imageAlt", widget: "string" }

```

---

## FILE: robots.txt

```text
User-agent: *
Allow: /
Disallow: /assets.html
Disallow: /asset-loader.js
Disallow: /admin/
Sitemap: https://www.whiterockstone.com/sitemap.xml

```

---

## FILE: sitemap.xml

```text
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.whiterockstone.com/</loc></url>
  <url><loc>https://www.whiterockstone.com/products.html</loc></url>
  <url><loc>https://www.whiterockstone.com/colors.html</loc></url>
  <url><loc>https://www.whiterockstone.com/materials.html</loc></url>
  <url><loc>https://www.whiterockstone.com/finishes.html</loc></url>
  <url><loc>https://www.whiterockstone.com/applications.html</loc></url>
  <url><loc>https://www.whiterockstone.com/factory.html</loc></url>
  <url><loc>https://www.whiterockstone.com/projects.html</loc></url>
  <url><loc>https://www.whiterockstone.com/news.html</loc></url>
  <url><loc>https://www.whiterockstone.com/faq.html</loc></url>
  <url><loc>https://www.whiterockstone.com/certifications.html</loc></url>
  <url><loc>https://www.whiterockstone.com/sustainability.html</loc></url>
  <url><loc>https://www.whiterockstone.com/resources.html</loc></url>
  <url><loc>https://www.whiterockstone.com/partners.html</loc></url>
  <url><loc>https://www.whiterockstone.com/order.html</loc></url>
  <url><loc>https://www.whiterockstone.com/about.html</loc></url>
  <url><loc>https://www.whiterockstone.com/lookbook.html</loc></url>
  <url><loc>https://www.whiterockstone.com/contact.html</loc></url>
</urlset>

```
