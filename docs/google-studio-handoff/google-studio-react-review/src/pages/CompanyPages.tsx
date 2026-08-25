import { Boxes, CheckCircle2, CircleDot, ClipboardCheck, Factory, Gauge, PackageCheck, ScanLine, Settings2, ShieldCheck, Sparkles, Waypoints } from 'lucide-react';
import { content, siteConfig } from '../data';
import type { PageId } from '../types';
import { PageHero } from './CatalogPages';

const equipment = [
  { name: 'Bridge cutting', icon: ScanLine, copy: 'Primary panel cutting and dimensional preparation from approved drawings.' },
  { name: 'CNC processing', icon: Settings2, copy: 'Cutouts, holes, and shaped work subject to machine and tooling review.' },
  { name: 'Profiling', icon: Gauge, copy: 'Edge shaping and detail work matched to the approved profile reference.' },
  { name: 'Edge polishing', icon: Sparkles, copy: 'Exposed-edge finishing with sample and inspection criteria agreed for the order.' },
  { name: 'Heating / curing', icon: CircleDot, copy: 'Process support for selected assembly or composite programs where applicable.' },
  { name: 'Packing inspection', icon: PackageCheck, copy: 'Piece protection, labels, crate or A-frame selection, and loading review.' },
];

const controls = [
  ['Drawing control', 'Revision, dimensions, cutouts, edge codes, and piece marks are reviewed before release.'],
  ['Material control', 'Lot, slab, engineered-surface batch, finish, and physical sample approval are recorded for the order.'],
  ['Process control', 'Inspection points are selected according to product risk and agreed acceptance criteria.'],
  ['Packing control', 'Protection and loading method follow piece geometry, route, handling, and buyer requirements.'],
];

export function FactoryPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <PageHero eyebrow="Factory Capability" title="A transparent process view, without unverified facility claims." copy="Equipment photographs, machine models, quantities, plant statistics, and measured tolerances will be published only after the owner confirms them." />
      <section className="section-band section-band--paper">
        <div className="shell capability-split">
          <div><p className="eyebrow">Production model</p><h2>Vietnam primary. Yunfu support.</h2><p>WHITEROCK coordinates sampling, fabrication, inspection, packing, and export support through its Vietnam manufacturing base. Yunfu capability supports approved natural-stone and specialized production needs.</p><p className="notice-box">This version intentionally uses process diagrams and line icons. It contains no synthetic factory or facility photography.</p></div>
          <div className="base-map" role="img" aria-label="Diagram showing Vietnam primary base and Yunfu support base connected to global buyers">
            <div><span>01</span><strong>Vietnam</strong><small>Primary manufacturing and export coordination</small></div>
            <Waypoints aria-hidden="true" />
            <div><span>02</span><strong>Yunfu</strong><small>Supporting stone capability</small></div>
            <Waypoints aria-hidden="true" />
            <div><span>03</span><strong>Global buyers</strong><small>Approved order scope and destination requirements</small></div>
          </div>
        </div>
      </section>

      <section className="section-band section-band--white"><div className="shell"><div className="section-intro split-intro"><div><p className="eyebrow">Equipment reference</p><h2>Six process areas buyers commonly review.</h2></div><p>Capability is described by function only. Brands, model numbers, counts, and precision claims remain pending owner verification.</p></div><div className="equipment-grid">{equipment.map(({ name, icon: Icon, copy }) => <article key={name}><Icon size={27} /><h3>{name}</h3><p>{copy}</p><span>Owner media slot available</span></article>)}</div></div></section>

      <section className="section-band section-band--charcoal"><div className="shell"><div className="section-intro section-intro--light"><p className="eyebrow eyebrow--light">Process flow</p><h2>Clear gates from brief to dispatch.</h2></div><div className="process-grid">{content.process.map((item) => <article key={item.step}><span>{item.step}</span><ClipboardCheck size={22} /><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className="section-band section-band--stone"><div className="shell"><div className="section-intro"><p className="eyebrow">Quality framework</p><h2>Controls should match the actual order risk.</h2></div><div className="control-grid">{controls.map(([title, copy]) => <article key={title}><ShieldCheck size={21} /><h3>{title}</h3><p>{copy}</p></article>)}</div><button className="button button--primary" type="button" onClick={() => navigate('contact')}>Discuss a factory review <Boxes size={17} /></button></div></section>
    </main>
  );
}

export function AboutPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <PageHero eyebrow="About WHITEROCK" title="Built around product clarity, production control, and export support." copy="WHITEROCK COMPANY LIMITED serves international stone buyers from Vietnam, with supporting stone capability in Yunfu, China." />
      <section className="section-band section-band--paper"><div className="shell about-intro"><div><p className="eyebrow">Company focus</p><h2>One buying workflow across material, fabrication, inspection, and packing.</h2></div><div><p>Our role is to turn a buyer’s drawings, finish direction, quantities, document requirements, and destination constraints into a reviewable stone program.</p><p>Claims that affect commercial, customs, safety, or certification decisions are published only after the owner supplies current supporting information.</p></div></div></section>
      <section className="section-band section-band--white"><div className="shell"><div className="section-intro"><p className="eyebrow">Operating model</p><h2>Two bases with distinct responsibilities.</h2></div><div className="operating-grid"><article><Factory size={25} /><p className="eyebrow">Primary base</p><h3>WHITEROCK, Vietnam</h3><p>Manufacturing coordination, sampling, inspection planning, packing, and export support.</p></article><article><Settings2 size={25} /><p className="eyebrow">Supporting base</p><h3>OPTIMA, Yunfu</h3><p>Supporting natural-stone sourcing and production capability for approved programs.</p></article><article><ShieldCheck size={25} /><p className="eyebrow">Buyer gate</p><h3>Written confirmation</h3><p>Final scope, origin, duties, reports, lead time, and commercial terms are order-specific.</p></article></div></div></section>
      <section className="section-band section-band--stone"><div className="shell"><div className="section-intro split-intro"><div><p className="eyebrow">Company timeline</p><h2>Known structure now, dates after review.</h2></div><p>Historical dates and growth figures are deliberately withheld in this review build until the owner approves the source record.</p></div><div className="timeline"><article><span>Now</span><h3>International B2B stone programs</h3><p>Products, materials, customization, packing, and buyer communication are organized through one public catalog.</p></article><article><span>Current model</span><h3>Vietnam primary, Yunfu support</h3><p>The two-base operating structure is presented without unverified facility statistics.</p></article><article><span>Pending</span><h3>Owner-approved company history</h3><p>Founding dates, milestones, workforce, capacity, and certification history will be added from confirmed records.</p></article></div></div></section>
      <section className="section-band section-band--charcoal"><div className="shell review-list"><div><p className="eyebrow eyebrow--light">Publication gate</p><h2>Information still awaiting owner confirmation.</h2></div><ul>{siteConfig.reviewRequired.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul><button className="button button--light" type="button" onClick={() => navigate('contact')}>Contact WHITEROCK</button></div></section>
    </main>
  );
}
