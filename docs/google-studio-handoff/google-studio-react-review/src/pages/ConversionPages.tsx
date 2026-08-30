import { Building2, Check, FileClock, FileText, Handshake, Mail, MapPin, PackageSearch, Phone, ShieldAlert, Users } from 'lucide-react';
import { content, siteConfig } from '../data';
import { InquiryForm } from '../components/InquiryForm';
import { PageHero } from './CatalogPages';

export function ResourcesPage() {
  return (
    <main>
      <PageHero eyebrow="Resources & FAQ" title="Technical resources with a clear publication status." copy="Downloads appear only after the owner approves the document, revision, scope, and public-use status." />
      <section className="section-band section-band--paper"><div className="shell"><div className="resource-list">{content.resources.map((resource) => <article key={resource.name}><FileText size={23} /><div><h2>{resource.name}</h2><p>{resource.description}</p></div><span><FileClock size={15} />{resource.status}</span><button className="button button--secondary" type="button" disabled>PDF pending</button></article>)}</div></div></section>
      <section className="section-band section-band--charcoal"><div className="shell compliance-callout"><ShieldAlert size={34} /><div><p className="eyebrow eyebrow--light">Compliance & safety</p><h2>Verify the exact product, plant, date, and destination.</h2><p>Buyers should confirm current duties, origin rules, product certifications, silica-related fabrication obligations, Proposition 65 requirements, and destination rules with qualified advisers. WHITEROCK supplies documentation only when applicable and confirmed for the order.</p></div></div></section>
      <section className="section-band section-band--white"><div className="shell faq-layout"><div><p className="eyebrow">Buyer FAQ</p><h2>Practical questions before an RFQ.</h2><p>Answers are indicative and intentionally avoid fixed commercial commitments.</p></div><div className="faq-list">{content.faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
    </main>
  );
}

const benefits = [
  ['Program planning', 'Build a focused assortment around your market, buyer type, and target applications.'],
  ['Sampling support', 'Coordinate physical samples and approval expectations before production commitments.'],
  ['Technical coordination', 'Review drawings, edge details, cutouts, labeling, and packing requirements.'],
  ['Sales materials', 'Use owner-approved product data, color references, and documents as they become available.'],
  ['Order visibility', 'Agree checkpoints for material, production, inspection, packing, and shipment release.'],
  ['Territory discussion', 'Evaluate region, channel, product mix, and support needs without automatic exclusivity claims.'],
];

export function PartnersPage() {
  return (
    <main>
      <PageHero eyebrow="Distributor Program" title="Build a practical stone program for your region." copy="For distributors, fabricators, retailers, builders, and hospitality procurement teams seeking a direct B2B manufacturing relationship." />
      <section className="section-band section-band--paper"><div className="shell"><div className="section-intro"><p className="eyebrow">Program benefits</p><h2>Support designed around repeat buying.</h2></div><div className="benefit-grid">{benefits.map(([title, copy]) => <article key={title}><Handshake size={21} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="section-band section-band--white"><div className="shell"><div className="section-intro split-intro"><div><p className="eyebrow">Indicative support levels</p><h2>A discussion framework, not fixed terms.</h2></div><p>Eligibility, pricing, samples, territory, marketing support, and service levels are confirmed in a signed agreement.</p></div><div className="support-table" role="table" aria-label="Indicative distributor support levels"><div role="row"><strong role="columnheader">Stage</strong><strong role="columnheader">Typical focus</strong><strong role="columnheader">Potential support</strong></div><div role="row"><span role="cell">Evaluation</span><span role="cell">Market fit and initial products</span><span role="cell">Catalog review, sample plan, quotation brief</span></div><div role="row"><span role="cell">Program launch</span><span role="cell">Approved range and first orders</span><span role="cell">Product data, packing plan, order checkpoints</span></div><div role="row"><span role="cell">Growth review</span><span role="cell">Repeat demand and assortment depth</span><span role="cell">Forecast discussion, new product development, joint planning</span></div></div></div></section>
      <section className="section-band section-band--stone"><div className="shell form-section"><div><p className="eyebrow">Partner inquiry</p><h2>Tell us about your market and buying model.</h2><ul className="check-list"><li><Check size={16} />Company and region</li><li><Check size={16} />Business type and channels</li><li><Check size={16} />Priority products and materials</li><li><Check size={16} />Indicative annual or project volume</li></ul></div><InquiryForm formType="Distributor inquiry" /></div></section>
    </main>
  );
}

export function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact & RFQ" title="Send enough detail for a useful first review." copy="Drawings, dimensions, quantities, material direction, destination, and required documents help the team respond with fewer assumptions." />
      <section className="section-band section-band--paper"><div className="shell contact-layout"><aside className="contact-card"><p className="eyebrow">WHITEROCK</p><h2>Direct contact</h2><a href={`mailto:${siteConfig.email}`}><Mail size={19} /><span><small>Email</small>{siteConfig.email}</span></a><a href={`tel:${siteConfig.telHref}`}><Phone size={19} /><span><small>Telephone</small>{siteConfig.tel}</span></a><a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><Users size={19} /><span><small>WhatsApp</small>{siteConfig.whatsapp}</span></a><div><MapPin size={19} /><span><small>Address</small>{siteConfig.address}</span></div><p className="contact-note">Social links are hidden until the owner provides verified profile URLs.</p></aside><div><InquiryForm formType="Project inquiry" /></div></div></section>
      <section className="section-band section-band--charcoal"><div className="shell inquiry-checklist"><div><PackageSearch size={30} /><h2>Useful RFQ attachments</h2></div><ul><li>Dimensioned drawing, CAD, PDF, or cut list</li><li>Material, color, finish, and edge direction</li><li>Sink, faucet, cooktop, or hardware templates</li><li>Quantities by type, phase, or unit schedule</li><li>Destination and requested delivery window</li><li>Required inspection, testing, origin, and import documents</li></ul></div></section>
    </main>
  );
}
