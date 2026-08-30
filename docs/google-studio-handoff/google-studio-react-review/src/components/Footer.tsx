import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../data';
import type { PageId } from '../types';

interface FooterProps {
  navigate: (page: PageId) => void;
}

const sitemap: Array<{ title: string; links: Array<{ label: string; page: PageId }> }> = [
  {
    title: 'Products',
    links: [
      { label: 'Product Catalog', page: 'products' },
      { label: 'Stone Colors', page: 'colors' },
      { label: 'Materials', page: 'materials' },
      { label: 'Finishes & Edges', page: 'finishes' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Factory Capability', page: 'factory' },
      { label: 'About WHITEROCK', page: 'about' },
      { label: 'Applications', page: 'applications' },
    ],
  },
  {
    title: 'Buyer Support',
    links: [
      { label: 'Resources & FAQ', page: 'resources' },
      { label: 'Distributor Program', page: 'partners' },
      { label: 'Contact & RFQ', page: 'contact' },
    ],
  },
];

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-company">
          <div className="brand brand--footer">
            <span className="brand__mark">WR</span>
            <span><strong>{siteConfig.brand}</strong><small>{siteConfig.legalName}</small></span>
          </div>
          <p>Stone product development and export support for distributors, builders, hospitality teams, and international project buyers.</p>
          <address>
            <span><MapPin size={16} />{siteConfig.address}</span>
            <a href={`mailto:${siteConfig.email}`}><Mail size={16} />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.telHref}`}><Phone size={16} />{siteConfig.tel}</a>
          </address>
        </div>

        <div className="footer-sitemap" aria-label="Full sitemap">
          {sitemap.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <button type="button" key={link.page} onClick={() => navigate(link.page)}>
                  {link.label}<ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
        <span>Specifications, availability, origin, duties, and certifications are order-specific and subject to written confirmation.</span>
      </div>
    </footer>
  );
}
