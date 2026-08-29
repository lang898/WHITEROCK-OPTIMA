import React, { useMemo, useState } from 'react';
import { ArrowRight, Bath, Building2, Check, CookingPot, GitCompare, Plus, Search, TableProperties } from 'lucide-react';
import { furnitureTops, products } from '../data';
import { t } from '../i18n';
import { formatMeasurement } from '../utils/measurements';
import type { LocaleConfig, ProductItem } from '../types';

interface ProductsViewProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  currentLocale: LocaleConfig;
  onToggleCompare: (product: ProductItem) => void;
  compareIds: string[];
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onSelectProduct, onAddToCart, currentLocale, onToggleCompare, compareIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const productPrograms = useMemo(() => [
    { id: 'Vanity Tops', icon: Bath, description: 'Single and double bowl programs, cutouts, backsplashes, and packaged sets.' },
    { id: 'Kitchen Countertops', icon: CookingPot, description: 'Cut-to-size counters, islands, waterfall ends, and coordinated backsplashes.' },
    { id: 'Furniture Tops', icon: TableProperties, description: 'Custom dining, coffee, console, and occasional-table surfaces by drawing.' },
    { id: 'Project Products', icon: Building2, description: 'Hospitality, multi-family, commercial, waterjet, and architectural stone packages.' }
  ], []);
  const categories = useMemo(() => ['All', ...productPrograms.map((program) => program.id)], [productPrograms]);

  const productProgramFor = (product: ProductItem) => {
    if (product.category === 'Bathroom Vanity Top') return 'Vanity Tops';
    if (product.category === 'Kitchen Countertop') return 'Kitchen Countertops';
    if (product.category === 'Furniture Top' || product.category === 'Stone Furniture') return 'Furniture Tops';
    return 'Project Products';
  };

  const filteredProducts = products.filter((product) => {
    const search = searchQuery.trim().toLowerCase();
    return (selectedCategory === 'All' || productProgramFor(product) === selectedCategory) &&
      (!search || [product.title, product.sku, product.material, product.description].join(' ').toLowerCase().includes(search));
  });

  return (
    <div className="wr-catalog-page">
      <header className="wr-catalog-hero">
        <div><span className="wr-eyebrow">{t(currentLocale, 'productCatalog')} · B2B</span><h1>Four core product programs, built around your drawings.</h1></div>
        <p>Vanity tops, kitchen countertops, furniture tops, and project products form the core WHITEROCK offer. Dimensions, stone selection, fabrication details, quantity, and packing are confirmed for each quotation.</p>
      </header>

      <section className="wr-product-programs" aria-label="Core product programs">
        {productPrograms.map(({ id, icon: Icon, description }) => (
          <button key={id} className={selectedCategory === id ? 'is-active' : ''} onClick={() => setSelectedCategory(id)}>
            <Icon aria-hidden="true" />
            <span><strong>{id}</strong><small>{description}</small></span>
            <ArrowRight aria-hidden="true" />
          </button>
        ))}
      </section>

      <section className="wr-carrara-source" aria-labelledby="carrara-source-title">
        <div className="wr-carrara-source__media">
          <figure>
            <picture>
              <source srcSet="/assets/owner/countertops/carrara-white-quarry-overview-1280.avif" type="image/avif" />
              <source srcSet="/assets/owner/countertops/carrara-white-quarry-overview-1280.webp" type="image/webp" />
              <img src="/assets/owner/countertops/carrara-white-quarry-overview.jpg" alt="Carrara White quarry interior visited for block sourcing" width="2000" height="1500" loading="lazy" />
            </picture>
            <figcaption>Carrara White quarry sourcing · owner supplied</figcaption>
          </figure>
          <figure>
            <picture>
              <source srcSet="/assets/owner/countertops/carrara-white-quarry-workface-1280.avif" type="image/avif" />
              <source srcSet="/assets/owner/countertops/carrara-white-quarry-workface-1280.webp" type="image/webp" />
              <img src="/assets/owner/countertops/carrara-white-quarry-workface.jpg" alt="Carrara quarry workface and block extraction equipment" width="2000" height="1500" loading="lazy" />
            </picture>
          </figure>
        </div>
        <div className="wr-carrara-source__copy">
          <span className="wr-eyebrow">Vanity-top material sourcing</span>
          <h2 id="carrara-source-title">Carrara White blocks selected in Italy for vanity-top production.</h2>
          <p>WHITEROCK regularly visits the Carrara quarry region in Italy to source Carrara White blocks used as a principal raw material for vanity-top programs.</p>
          <p>Natural movement varies by block and lot. Final color range, veining, finish, dimensions, and acceptance criteria are therefore confirmed through the approved sample and order documents.</p>
          <button className="wr-text-link" onClick={() => setSelectedCategory('Vanity Tops')}>View vanity-top products<ArrowRight /></button>
        </div>
      </section>

      <section className="wr-production-proof" aria-labelledby="production-proof-title">
        <figure>
          <picture>
            <source srcSet="/assets/owner/enhanced/vanity-production-hall-enhanced-1280.avif" type="image/avif" />
            <source media="(max-width: 767px)" srcSet="/assets/owner/enhanced/vanity-production-hall-enhanced-720.webp" type="image/webp" />
            <source srcSet="/assets/owner/enhanced/vanity-production-hall-enhanced-1280.webp" type="image/webp" />
            <img src="/assets/owner/enhanced/vanity-production-hall-enhanced.jpg" alt="Owner-supplied image showing rows of finished vanity tops in production" width="1448" height="1086" loading="lazy" />
          </picture>
          <figcaption>Owner-supplied production reference · Vietnam</figcaption>
        </figure>
        <div>
          <span className="wr-eyebrow">Real production reference</span>
          <h2 id="production-proof-title">Finished tops shown before order-specific inspection and packing.</h2>
          <p>This owner-supplied image presents a vanity-top production overview. Final material, dimensions, cutouts, finish, and acceptance criteria are confirmed in the approved order documents.</p>
        </div>
      </section>

      <section className="wr-furniture-program" aria-labelledby="furniture-program-title">
        <div className="wr-section-heading wr-section-intro">
          <span className="wr-eyebrow">Furniture tops</span>
          <h2 id="furniture-program-title">Stone surfaces shaped for dining, coffee, console, and occasional furniture.</h2>
          <p>These owner-supplied images from the previous WHITEROCK website show form and material possibilities. Final top dimensions, thickness, edge, support interface, reinforcement, and packing are reviewed against the buyer's drawing.</p>
        </div>
        <div className="wr-furniture-gallery">
          {furnitureTops.slice(0, 7).map((item, index) => (
            <figure key={item.id} className={index === 0 ? 'wr-furniture-gallery__lead' : ''}>
              <picture>
                {item.imageAvif && <source srcSet={item.imageAvif} type="image/avif" />}
                {item.imageWebp && <source srcSet={item.imageWebp} type="image/webp" />}
                <img src={item.image} alt={item.alt} width="2000" height="2000" loading="lazy" />
              </picture>
              <figcaption><strong>{item.title}</strong><span>{item.form}</span></figcaption>
            </figure>
          ))}
        </div>
        <button className="wr-button wr-button--secondary" onClick={() => setSelectedCategory('Furniture Tops')}>View furniture-top products<ArrowRight /></button>
      </section>

      <div className="wr-catalog-layout">
        <aside className="wr-filter-rail" aria-label="Product filters">
          <div className="wr-filter-rail__heading"><span>Filter catalog</span><small>{filteredProducts.length} results</small></div>
          <label className="wr-search-input"><Search /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={t(currentLocale, 'searchPlaceholder')} /></label>
          <fieldset><legend>Category</legend>{categories.map((category) => <button key={category} className={selectedCategory === category ? 'is-active' : ''} onClick={() => setSelectedCategory(category)}><span>{category === 'All' ? t(currentLocale, 'all') : category}</span>{selectedCategory === category && <Check />}</button>)}</fieldset>
          <div className="wr-filter-note"><strong>MM + IMPERIAL REFERENCE</strong><p>Millimetres are primary. Rounded inch references support North American review; final dimensions require approved drawings.</p></div>
          {!compareIds.length && <div className="wr-filter-note wr-compare-empty"><GitCompare /><strong>No comparison selected</strong><p>Select two or three products to compare specifications side by side.</p></div>}
        </aside>

        <main className="wr-product-grid" aria-live="polite">
          {filteredProducts.map((product) => {
            const compared = compareIds.includes(`product:${product.sku}`);
            const dimensions = product.specs.Size || product.specs.Sizes || product.dimensions;
            return (
              <article className="wr-catalog-card" key={product.sku}>
                <button className="wr-catalog-card__media" onClick={() => onSelectProduct(product)} aria-label={`View ${product.title}`}>
                  <img src={product.image} alt={product.imageType === 'render' ? `${product.title} illustrative render` : product.title} width={product.imageWidth || 1536} height={product.imageHeight || 1024} loading="lazy" />
                  <span className="wr-catalog-card__sku">{product.sku}</span>
                </button>
                <div className="wr-catalog-card__body">
                  {product.imageType === 'render' && <span className="wr-catalog-card__render-note">Illustrative render · not actual product</span>}
                  <small>{productProgramFor(product)} · {product.material}</small>
                  <h2>{product.title}</h2>
                  <p>{formatMeasurement(product.description)}</p>
                  <dl>
                    <div><dt>{t(currentLocale, 'dimensions')}</dt><dd>{formatMeasurement(dimensions)}</dd></div>
                    <div><dt>{t(currentLocale, 'finish')}</dt><dd>{product.specs.Finish || 'Confirm by sample'}</dd></div>
                    <div><dt>MOQ</dt><dd>{product.specs.MOQ || product.moq || 'Confirm by quotation'}</dd></div>
                  </dl>
                  <div className="wr-catalog-card__actions">
                    <button className="wr-button wr-button--primary" onClick={() => onAddToCart(product)}><Plus />{t(currentLocale, 'addRfq')}</button>
                    <button className={`wr-button wr-button--ghost ${compared ? 'is-active' : ''}`} onClick={() => onToggleCompare(product)}><GitCompare />{compared ? t(currentLocale, 'compared') : t(currentLocale, 'compare')}</button>
                    <button className="wr-icon-button" onClick={() => onSelectProduct(product)} aria-label={t(currentLocale, 'fullSpecs')}><ArrowRight /></button>
                  </div>
                </div>
              </article>
            );
          })}
          {!filteredProducts.length && <div className="wr-empty-state"><h2>{t(currentLocale, 'noResults')}</h2><button className="wr-button wr-button--secondary" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>{t(currentLocale, 'clear')}</button></div>}
        </main>
      </div>
    </div>
  );
};
