import { ArrowRight, Check, Download, Filter, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { colorFamilies, colorMaterials, colorNotice, colors, content, productCategories, products } from '../data';
import type { ColorDirection, PageId, Product } from '../types';
import { ColorSwatch } from '../components/ColorSwatch';
import { MediaPlaceholder } from '../components/MediaPlaceholder';

interface ProductPageProps {
  addProduct: (product: Product) => void;
  inspect: (product: Product) => void;
}

export function ProductsPage({ addProduct, inspect }: ProductPageProps) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const visible = products.filter((product) => {
    const inCategory = category === 'All' || product.category === category;
    const searchable = `${product.sku} ${product.title} ${product.material}`.toLowerCase();
    return inCategory && searchable.includes(query.toLowerCase());
  });

  return (
    <main>
      <PageHero eyebrow="Product Catalog" title="Stone products organized for faster B2B specification." copy="Browse product frameworks, then confirm drawings, materials, finish, packing, documents, and commercial terms through a written quotation." />
      <section className="section-band section-band--paper">
        <div className="shell">
          <div className="catalog-tools">
            <div className="segmented" aria-label="Product categories">
              {['All', ...productCategories].map((value) => <button className={category === value ? 'is-active' : ''} type="button" key={value} onClick={() => setCategory(value)}>{value}</button>)}
            </div>
            <label className="search-field"><Search size={17} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SKU, product, material" /></label>
          </div>
          <p className="catalog-note">Photography is intentionally omitted from this review build. Every slot is ready for an owner-supplied image.</p>
          <div className="product-grid">
            {visible.map((product) => (
              <article className="product-card" key={product.sku}>
                <button className="card-media-button" type="button" onClick={() => inspect(product)} aria-label={`View ${product.title} details`}><MediaPlaceholder label={product.title} /></button>
                <div className="product-card__body">
                  <p className="eyebrow">{product.category}</p><h2>{product.title}</h2><span className="sku">{product.sku}</span>
                  <p>{product.summary}</p>
                  <dl><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Dimensions</dt><dd>{product.sizes[0]}</dd></div></dl>
                  <div className="card-actions"><button className="button button--primary" type="button" onClick={() => addProduct(product)}><Plus size={16} />Add to request</button><button className="text-link" type="button" onClick={() => inspect(product)}>Details <ArrowRight size={15} /></button></div>
                </div>
              </article>
            ))}
          </div>
          {!visible.length && <div className="empty-state"><Filter size={28} /><p>No products match the current filters.</p></div>}
        </div>
      </section>
    </main>
  );
}

interface ColorsPageProps {
  addColor: (color: ColorDirection) => void;
  inspect: (color: ColorDirection) => void;
}

export function ColorsPage({ addColor, inspect }: ColorsPageProps) {
  const [family, setFamily] = useState('All');
  const [material, setMaterial] = useState('All');
  const [finish, setFinish] = useState('All');
  const finishes = useMemo(() => [...new Set(colors.flatMap((color) => color.finishes))], []);
  const visible = colors.filter((color) =>
    (family === 'All' || color.family === family) &&
    (material === 'All' || color.material === material) &&
    (finish === 'All' || color.finishes.includes(finish))
  );

  return (
    <main>
      <PageHero eyebrow="Stone Colors" title="Shop by color direction, then approve the physical sample." copy={colorNotice} />
      <section className="section-band section-band--stone">
        <div className="shell catalog-layout">
          <aside className="filter-rail" aria-label="Color filters">
            <div><Filter size={18} /><strong>Filter library</strong></div>
            <label>Material<select value={material} onChange={(event) => setMaterial(event.target.value)}><option>All</option>{colorMaterials.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Color family<select value={family} onChange={(event) => setFamily(event.target.value)}><option>All</option>{colorFamilies.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Finish direction<select value={finish} onChange={(event) => setFinish(event.target.value)}><option>All</option>{finishes.map((value) => <option key={value}>{value}</option>)}</select></label>
            <button className="text-button" type="button" onClick={() => { setMaterial('All'); setFamily('All'); setFinish('All'); }}>Clear filters</button>
          </aside>
          <div>
            <div className="result-count"><strong>{visible.length}</strong> color directions</div>
            <div className="color-grid">
              {visible.map((color) => (
                <article className="color-card" key={color.slug}>
                  <button type="button" onClick={() => inspect(color)} aria-label={`View ${color.name} details`}><ColorSwatch color={color} /></button>
                  <div><p className="eyebrow">{color.material} / {color.family}</p><h2>{color.name}</h2><p>{color.finishes.join(' · ')}</p><div className="card-actions"><button className="button button--secondary" type="button" onClick={() => addColor(color)}><Plus size={16} />Add sample</button><button className="text-link" type="button" onClick={() => inspect(color)}>Details</button></div></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function MaterialsPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <PageHero eyebrow="Materials" title="Choose material by application, variation, and approval method." copy="Availability, slab size, finish, thickness, testing, and color lot must be confirmed before quotation and production." />
      <section className="section-band section-band--paper"><div className="shell material-grid">{content.materials.map((material) => <article key={material.name}><MediaPlaceholder label={`${material.name} surface`} compact /><p className="eyebrow">Material family</p><h2>{material.name}</h2><p>{material.copy}</p><ul>{material.uses.map((use) => <li key={use}><Check size={15} />{use}</li>)}</ul></article>)}</div></section>
      <section className="section-band section-band--white"><div className="shell"><div className="section-intro"><p className="eyebrow">Specification guide</p><h2>Questions to settle before material approval.</h2></div><div className="decision-table" role="table" aria-label="Material specification questions"><div role="row"><strong role="columnheader">Review</strong><strong role="columnheader">Why it matters</strong></div>{[['Application','Interior, exterior, wet area, heat exposure, and support conditions change the recommendation.'],['Variation','Natural stone requires lot or slab approval; engineered surfaces still require sample and batch review.'],['Finish','Sheen, texture, maintenance, stain behavior, and edge appearance must be considered together.'],['Documents','Request only product-specific reports with matching material, plant, scope, and validity date.'],['Packing','Piece size, fragility, destination, and handling method determine packing design.']].map(([a,b])=><div role="row" key={a}><span role="cell">{a}</span><span role="cell">{b}</span></div>)}</div><button className="button button--primary" type="button" onClick={() => navigate('contact')}>Discuss a material brief <ArrowRight size={17} /></button></div></section>
    </main>
  );
}

export function FinishesPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <PageHero eyebrow="Finishes & Edges" title="A visual reference for specification conversations." copy="These diagrams describe design directions. Confirm tooling, dimensions, sample quality, and material suitability before approval." />
      <section className="section-band section-band--paper"><div className="shell"><div className="section-intro"><p className="eyebrow">Surface finishes</p><h2>Sheen and texture directions.</h2></div><div className="finish-grid">{content.finishes.map((finish, index) => <article key={finish.name}><div className={`finish-sample finish-sample--${index + 1}`} role="img" aria-label={`${finish.name} abstract finish reference`}><span>Diagram</span></div><h3>{finish.name}</h3><p>{finish.copy}</p></article>)}</div></div></section>
      <section className="section-band section-band--charcoal"><div className="shell"><div className="section-intro section-intro--light"><p className="eyebrow eyebrow--light">Edge profiles</p><h2>Labeled profile references.</h2></div><div className="edge-grid">{content.edges.map((edge) => <article key={edge.code}><div className={`edge-diagram edge-diagram--${edge.code.toLowerCase()}`}><span>{edge.code}</span></div><h3>{edge.name}</h3><p>{edge.copy}</p></article>)}</div><button className="button button--light" type="button" onClick={() => navigate('contact')}>Send an edge detail <ArrowRight size={17} /></button></div></section>
    </main>
  );
}

export function ApplicationsPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <PageHero eyebrow="Application Inspiration" title="Room and project directions without false installation claims." copy="These are planning references only. No scene on this page is presented as a completed WHITEROCK project." />
      <section className="section-band section-band--paper"><div className="shell application-grid">{content.applications.map((application) => <article key={application.name}><MediaPlaceholder label={application.name} /><div><p className="eyebrow">Application inspiration</p><h2>{application.name}</h2><p>{application.copy}</p><button className="text-link" type="button" onClick={() => navigate('colors')}>Pair with color directions <ArrowRight size={15} /></button></div></article>)}</div></section>
    </main>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div></section>;
}
