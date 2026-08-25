import { ArrowRight, Boxes, CheckCircle2, ClipboardCheck, Factory, FileSearch, PackageCheck, Ruler, Send, SwatchBook } from 'lucide-react';
import { colors, content, productCategories, products } from '../data';
import type { ColorDirection, PageId, Product } from '../types';
import { ColorSwatch } from '../components/ColorSwatch';
import { MediaPlaceholder } from '../components/MediaPlaceholder';

interface HomePageProps {
  navigate: (page: PageId) => void;
  addProduct: (product: Product) => void;
  addColor: (color: ColorDirection) => void;
}

const trustItems = [
  ['Drawing-led review', 'Dimensions, cutouts, edges, and packing are tied to approved documents.'],
  ['Physical sample gate', 'Digital color references never replace sample and lot approval.'],
  ['Order-specific terms', 'MOQ, lead time, testing, origin, and documents are confirmed in writing.'],
  ['Export coordination', 'Packing, marks, loading, and destination requirements are reviewed per shipment.'],
];

const processIcons = [FileSearch, SwatchBook, ClipboardCheck, Factory, PackageCheck];

export function HomePage({ navigate, addProduct, addColor }: HomePageProps) {
  return (
    <>
      <section className="hero-band">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light">Vietnam stone manufacturing for global B2B buyers</p>
            <h1>WHITEROCK Stone Manufacturing</h1>
            <p>Marble, granite, quartz, and engineered stone programs for distributors, builders, hospitality teams, and project buyers.</p>
            <div className="button-row">
              <button className="button button--light" type="button" onClick={() => navigate('products')}><Boxes size={18} />Explore products</button>
              <button className="button button--outline-light" type="button" onClick={() => navigate('contact')}><Send size={18} />Start an RFQ</button>
            </div>
            <small>All commercial terms, technical claims, certifications, and customs treatment require order-specific written confirmation.</small>
          </div>
          <div className="hero-composition" aria-label="Stone product photo slots pending owner upload">
            <MediaPlaceholder label="Product photography" detail="Owner photos will replace this slot" tone="dark" />
            <div className="hero-specs">
              <span><Ruler size={16} />Custom dimensions</span>
              <span><SwatchBook size={16} />Sample-led approval</span>
              <span><PackageCheck size={16} />Export packing review</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-band" aria-label="Buyer safeguards">
        <div className="shell trust-grid">
          {trustItems.map(([title, copy]) => (
            <article key={title}><CheckCircle2 size={19} /><div><strong>{title}</strong><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section-band section-band--paper">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><p className="eyebrow">Product programs</p><h2>Start from the part you need to buy.</h2></div>
            <p>Each family is a quotation framework. Final material, dimensions, finish, packing, and quantities follow the approved specification.</p>
          </div>
          <div className="category-grid">
            {productCategories.map((category, index) => (
              <button className="category-card" type="button" key={category} onClick={() => navigate('products')}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{category}</strong>
                <small>{products.filter((product) => product.category === category).length} catalog references</small>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band section-band--stone">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><p className="eyebrow">Color directions</p><h2>Build a shortlist before requesting samples.</h2></div>
            <button className="text-link" type="button" onClick={() => navigate('colors')}>Open the full color library <ArrowRight size={16} /></button>
          </div>
          <div className="swatch-strip">
            {colors.slice(0, 8).map((color) => (
              <article className="swatch-mini" key={color.slug}>
                <ColorSwatch color={color} compact />
                <div><strong>{color.name}</strong><span>{color.material} / {color.family}</span></div>
                <button type="button" onClick={() => addColor(color)}>Add sample direction</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band section-band--white">
        <div className="shell capability-split">
          <div>
            <p className="eyebrow">Capability</p>
            <h2>Two production bases, one controlled buyer workflow.</h2>
            <p>Vietnam is presented as the primary manufacturing and export base. Yunfu, China supports stone-industry capability. Facility statistics, equipment lists, and certification claims remain unpublished until owner-confirmed.</p>
            <div className="button-row">
              <button className="button button--primary" type="button" onClick={() => navigate('factory')}>Review capability <ArrowRight size={17} /></button>
              <button className="button button--secondary" type="button" onClick={() => navigate('about')}>Company overview</button>
            </div>
          </div>
          <div className="base-comparison">
            <article><span>Primary</span><h3>Vietnam manufacturing base</h3><p>Sampling, fabrication coordination, inspection, packing, and export support.</p><MediaPlaceholder label="Vietnam facility" compact /></article>
            <article><span>Support</span><h3>Yunfu stone capability</h3><p>Natural stone sourcing and supporting production capability for approved programs.</p><MediaPlaceholder label="Yunfu operations" compact /></article>
          </div>
        </div>
      </section>

      <section className="section-band section-band--charcoal">
        <div className="shell">
          <div className="section-intro split-intro section-intro--light">
            <div><p className="eyebrow eyebrow--light">Buying workflow</p><h2>From first drawing to shipment release.</h2></div>
            <p>A practical review sequence for custom and repeat-order stone programs.</p>
          </div>
          <div className="process-grid">
            {content.process.map((item, index) => {
              const Icon = processIcons[index] ?? CheckCircle2;
              return <article key={item.step}><span>{item.step}</span><Icon size={22} /><h3>{item.name}</h3><p>{item.copy}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-band section-band--paper">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><p className="eyebrow">Application inspiration</p><h2>See where each product family can fit.</h2></div>
            <button className="text-link" type="button" onClick={() => navigate('applications')}>View all applications <ArrowRight size={16} /></button>
          </div>
          <div className="application-row">
            {content.applications.slice(0, 4).map((application) => (
              <article key={application.name}><MediaPlaceholder label={application.name} compact /><h3>{application.name}</h3><p>{application.copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="rfq-band">
        <div className="shell rfq-band__inner">
          <div><p className="eyebrow eyebrow--light">Project review</p><h2>Have a drawing, cut list, or target product?</h2><p>Send the scope first. The quotation can then state exactly what is included, pending, and subject to approval.</p></div>
          <button className="button button--light" type="button" onClick={() => navigate('contact')}>Prepare an inquiry <ArrowRight size={17} /></button>
        </div>
      </section>
    </>
  );
}
