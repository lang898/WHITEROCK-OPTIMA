import { ChevronDown, FileText, Mail, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../data';
import type { PageId } from '../types';

interface HeaderProps {
  page: PageId;
  requestCount: number;
  navigate: (page: PageId) => void;
  openRequest: () => void;
}

interface NavGroup {
  label: string;
  page?: PageId;
  children?: Array<{ label: string; page: PageId; note: string }>;
}

const groups: NavGroup[] = [
  {
    label: 'Products',
    children: [
      { label: 'Product Catalog', page: 'products', note: 'Vanities, worktops, furniture, architectural stone' },
      { label: 'Stone Colors', page: 'colors', note: 'Filterable digital color directions' },
      { label: 'Materials', page: 'materials', note: 'Material selection and specification notes' },
      { label: 'Finishes & Edges', page: 'finishes', note: 'Visual profile reference' },
    ],
  },
  {
    label: 'Capability',
    children: [
      { label: 'Factory Capability', page: 'factory', note: 'Process, controls, and export workflow' },
      { label: 'About WHITEROCK', page: 'about', note: 'Company and operating model' },
    ],
  },
  {
    label: 'Inspiration',
    children: [
      { label: 'Applications', page: 'applications', note: 'Unbuilt design directions, not project claims' },
    ],
  },
  { label: 'Resources', page: 'resources' },
  { label: 'Partners', page: 'partners' },
  { label: 'Contact', page: 'contact' },
];

export function Header({ page, requestCount, navigate, openRequest }: HeaderProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (target: PageId) => {
    navigate(target);
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-bar__inner">
          <span>Vietnam-based stone manufacturing and export coordination</span>
          <div>
            <a href={`mailto:${siteConfig.email}`}><Mail size={14} />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.telHref}`}><Phone size={14} />{siteConfig.tel}</a>
          </div>
        </div>
      </div>

      <div className="shell header-main">
        <button className="brand" type="button" onClick={() => go('home')} aria-label="WHITEROCK home">
          <span className="brand__mark">WR</span>
          <span><strong>{siteConfig.brand}</strong><small>{siteConfig.tagline}</small></span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {groups.map((group) => {
            const active = group.page === page || group.children?.some((child) => child.page === page);
            if (!group.children) {
              return (
                <button className={active ? 'is-active' : ''} type="button" key={group.label} onClick={() => go(group.page!)}>
                  {group.label}
                </button>
              );
            }
            const expanded = openGroup === group.label;
            return (
              <div
                className="nav-group"
                key={group.label}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setOpenGroup(null);
                }}
              >
                <button
                  className={active ? 'is-active' : ''}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={expanded}
                  onClick={() => setOpenGroup(expanded ? null : group.label)}
                >
                  {group.label}<ChevronDown size={15} aria-hidden="true" />
                </button>
                {expanded && (
                  <div className="nav-menu" role="menu">
                    {group.children.map((child) => (
                      <button type="button" role="menuitem" key={child.page} onClick={() => go(child.page)}>
                        <strong>{child.label}</strong><span>{child.note}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="request-button" type="button" onClick={openRequest}>
            <FileText size={17} />Request list{requestCount > 0 && <span>{requestCount}</span>}
          </button>
          <button
            className="icon-button mobile-toggle"
            type="button"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <button type="button" onClick={() => go('home')}>Home</button>
          {groups.map((group) => (
            <div key={group.label}>
              <strong>{group.label}</strong>
              {group.page && <button type="button" onClick={() => go(group.page!)}>{group.label}</button>}
              {group.children?.map((child) => (
                <button type="button" key={child.page} onClick={() => go(child.page)}>{child.label}</button>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
