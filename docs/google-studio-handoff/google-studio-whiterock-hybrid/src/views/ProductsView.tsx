import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, GitCompare, Plus, Search } from 'lucide-react';
import { products } from '../data';
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
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((item) => item.category)))], []);

  const filteredProducts = products.filter((product) => {
    const search = searchQuery.trim().toLowerCase();
    return (selectedCategory === 'All' || product.category === selectedCategory) &&
      (!search || [product.title, product.sku, product.material, product.description].join(' ').toLowerCase().includes(search));
  });

  return (
    <div className="wr-catalog-page">
      <header className="wr-catalog-hero">
        <div><span className="wr-eyebrow">{t(currentLocale, 'productCatalog')} · B2B</span><h1>Stone products made clearer for specification and quotation.</h1></div>
        <p>{t(currentLocale, 'productIntro')} Product visuals marked as illustrative remain placeholders until owner photography is supplied.</p>
      </header>

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
                  <small>{product.category} · {product.material}</small>
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
