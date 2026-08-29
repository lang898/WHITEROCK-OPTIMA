import React from 'react';
import { ArrowDown, ArrowRight, Check, FileText, Layers, Package, Plus } from 'lucide-react';
import { colors, factory, products } from '../data';
import { t } from '../i18n';
import type { ColorItem, LocaleConfig, ProductItem, RfqCartItem } from '../types';
import type { ShareContent } from '../components/SocialShareModal';
import { formatMeasurement } from '../utils/measurements';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectColor: (color: ColorItem) => void;
  onAddToCart: (product: ProductItem | RfqCartItem) => void;
  onAddColorSample: (color: ColorItem) => void;
  currentLocale: LocaleConfig;
  onOpenShareModal: (content?: ShareContent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab, onSelectProduct, onSelectColor, onAddToCart, onAddColorSample, currentLocale
}) => {
  const featuredProducts = products.slice(0, 4);
  const featuredColors = colors.slice(0, 8);
  const stats = factory.stats.slice(0, 3);

  return (
    <div className="wr-home">
      <section className="wr-hero" aria-labelledby="home-hero-title">
        <picture className="wr-hero__poster" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/factory-04-hero-detail-mobile.avif" type="image/avif" />
          <source srcSet="/assets/owner/vietnam/factory-06-hero-detail-1280.avif" type="image/avif" />
          <source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/factory-04-hero-detail-mobile.webp" type="image/webp" />
          <source srcSet="/assets/owner/vietnam/factory-06-hero-detail-1280.webp" type="image/webp" />
          <img src="/assets/owner/vietnam/factory-06-hero-detail.jpg" alt="" width="1600" height="400" loading="eager" fetchPriority="high" />
        </picture>
        <div className="wr-hero__shade" aria-hidden="true" />
        <div className="wr-hero__content">
          <p className="wr-eyebrow wr-eyebrow--light">{t(currentLocale, 'heroEyebrow')}</p>
          <h1 id="home-hero-title">{t(currentLocale, 'heroTitle')}</h1>
          <p className="wr-hero__lead">{t(currentLocale, 'heroBody')}</p>
          <div className="wr-hero__actions">
            <button className="wr-button wr-button--light" onClick={() => setCurrentTab('products')}>{t(currentLocale, 'exploreProducts')}<ArrowRight /></button>
            <button className="wr-button wr-button--outline-light" onClick={() => setCurrentTab('factory')}>{t(currentLocale, 'viewFactory')}</button>
          </div>
        </div>
        <div className="wr-hero__stats">
          {stats.map((stat, index) => <div key={stat.label}><strong>{stat.value}</strong><span>{index === 0 ? t(currentLocale, 'experience') : index === 1 ? t(currentLocale, 'plantArea') : t(currentLocale, 'annualCapacity')}</span></div>)}
        </div>
        <a className="wr-hero__scroll" href="#story" aria-label="Continue to company story"><ArrowDown /></a>
      </section>

      <section id="story" className="wr-story wr-section-band">
        <div className="wr-story__copy">
          <span className="wr-eyebrow">Established stone experience</span>
          <h2>Marble and granite expertise, organized for international buying.</h2>
          <p>WHITEROCK combines more than two decades of stone-industry experience with a 20,000 m² manufacturing site in Binh Phuoc. The site is presented through owner-supplied media, while specifications and commercial terms remain order-specific.</p>
          <button className="wr-text-link" onClick={() => setCurrentTab('about')}>Read the company profile<ArrowRight /></button>
        </div>
        <figure className="wr-story__media">
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/factory-01-entrance-color-720.webp" type="image/webp" />
            <source srcSet="/assets/owner/vietnam/factory-01-entrance-color-1280.webp" type="image/webp" />
            <img src="/assets/owner/vietnam/factory-01-entrance-color.jpg" alt="Lightly muted color detail from the owner-supplied WHITEROCK Vietnam entrance photo" width="900" height="520" loading="lazy" />
          </picture>
          <figcaption>WHITEROCK Vietnam · Binh Phuoc Province</figcaption>
        </figure>
      </section>

      <section className="wr-factory-feature wr-section-band wr-section-band--mist">
        <div className="wr-section-heading wr-section-intro">
          <span className="wr-eyebrow">Manufacturing capability</span>
          <h2>See the working environment behind the quotation.</h2>
          <p>Real production imagery gives buyers a clearer starting point for factory review, drawing approval, inspection planning, and packing discussion.</p>
        </div>
        <div className="wr-factory-feature__grid">
          <figure className="wr-factory-feature__primary"><picture><source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/factory-02-machine-detail-720.webp" type="image/webp" /><source srcSet="/assets/owner/vietnam/factory-02-machine-detail-1280.webp" type="image/webp" /><img src="/assets/owner/vietnam/factory-02-machine-detail.jpg" alt="Low-saturation detail of owner-supplied stone cutting equipment" width="650" height="487" loading="lazy" /></picture><figcaption>Cutting equipment detail · Vietnam</figcaption></figure>
          <figure><picture><source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/factory-03-machine-detail-720.webp" type="image/webp" /><source srcSet="/assets/owner/vietnam/factory-03-machine-detail-1280.webp" type="image/webp" /><img src="/assets/owner/vietnam/factory-03-machine-detail.jpg" alt="Black-and-white detail of owner-supplied stone processing machinery" width="600" height="450" loading="lazy" /></picture><figcaption>Precision processing detail · Vietnam</figcaption></figure>
          <figure><picture><source media="(max-width: 767px)" srcSet="/assets/owner/vietnam/vanity-qc-line-720.webp" type="image/webp" /><source srcSet="/assets/owner/vietnam/vanity-qc-line-1280.webp" type="image/webp" /><img src="/assets/owner/vietnam/vanity-qc-line.jpg" alt="Color detail from an owner-supplied photo of finished vanity tops in sequence" width="1260" height="945" loading="lazy" /></picture><figcaption>Finished vanity-top sequence · Vietnam</figcaption></figure>
        </div>
        <button className="wr-button wr-button--secondary" onClick={() => setCurrentTab('factory')}>Explore factory capability<ArrowRight /></button>
      </section>

      <section className="wr-catalog-preview wr-section-band">
        <div className="wr-section-heading">
          <span className="wr-eyebrow">{t(currentLocale, 'productCatalog')}</span>
          <h2>Start with a product program. Refine it with drawings.</h2>
          <p>{t(currentLocale, 'productIntro')}</p>
        </div>
        <div className="wr-editorial-grid">
          {featuredProducts.map((product, index) => (
            <article className={`wr-product-story ${index === 0 ? 'wr-product-story--wide' : ''}`} key={product.sku}>
              <button className="wr-product-story__media" onClick={() => onSelectProduct(product)}>
                <img src={product.image} alt={product.imageType === 'render' ? `${product.title} illustrative render` : product.title} width={product.imageWidth || 1536} height={product.imageHeight || 1024} loading="lazy" />
                {product.imageType === 'render' && <span>Illustrative render · not actual product</span>}
              </button>
              <div><small>{product.sku} · {product.material}</small><h3>{product.title}</h3><p>{formatMeasurement(product.description)}</p><div><button className="wr-text-link" onClick={() => onSelectProduct(product)}>View details<ArrowRight /></button><button className="wr-icon-button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.title} to RFQ`}><Plus /></button></div></div>
            </article>
          ))}
        </div>
        <button className="wr-button wr-button--secondary" onClick={() => setCurrentTab('products')}>View complete catalog<ArrowRight /></button>
      </section>

      <section className="wr-color-preview wr-section-band wr-section-band--mist">
        <div className="wr-section-heading wr-section-heading--split">
          <div><span className="wr-eyebrow">{t(currentLocale, 'colorLibrary')}</span><h2>A shortlist begins with color, then moves to sample approval.</h2></div>
          <p>{t(currentLocale, 'colorIntro')}</p>
        </div>
        <div className="wr-color-strip">
          {featuredColors.map((color) => (
            <article key={color.slug}>
              <button onClick={() => onSelectColor(color)}><img src={color.swatchImage} alt={`${color.name} illustrative digital swatch`} width="800" height="800" loading="lazy" /><span>{color.name}</span></button>
              <div><small>{color.material}</small><button className="wr-icon-button" onClick={() => onAddColorSample(color)} aria-label={`Request ${color.name} sample`}><Package /></button></div>
            </article>
          ))}
        </div>
        <button className="wr-button wr-button--secondary" onClick={() => setCurrentTab('colors')}>Open color library<ArrowRight /></button>
      </section>

      <section className="wr-process wr-section-band">
        <div className="wr-section-heading"><span className="wr-eyebrow">From drawing to shipment</span><h2>A buying process built around written approval.</h2></div>
        <ol>
          {[
            ['01', 'Share the brief', 'Send drawings, target material, destination, quantity, and schedule.'],
            ['02', 'Confirm the specification', 'Review samples, dimensions, edges, cutouts, quality plan, and packing method.'],
            ['03', 'Approve production', 'Production begins against the approved drawing, sample, and written order terms.'],
            ['04', 'Inspect and ship', 'Inspection evidence, packing list, and shipment details are agreed for the order.']
          ].map(([number, title, body]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div><Check /></li>)}
        </ol>
      </section>

      <section className="wr-home-rfq wr-section-band">
        <div><span className="wr-eyebrow">Project inquiry</span><h2>Turn your shortlist into a factory quotation.</h2><p>Send the selected products, dimensions, drawings, destination, and target schedule. Final capability and terms are confirmed in writing.</p></div>
        <div><button className="wr-button wr-button--primary" onClick={() => setCurrentTab('contact')}><FileText />{t(currentLocale, 'requestQuote')}</button><button className="wr-button wr-button--secondary" onClick={() => setCurrentTab('products')}><Layers />Build a shortlist</button></div>
      </section>
    </div>
  );
};
