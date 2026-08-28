import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, Settings, Share2 } from 'lucide-react';
import { WhatsAppIcon, WeChatIcon } from './SocialIcons';
import { siteConfig } from '../data/site';
import { t } from '../i18n';
import type { LocaleConfig } from '../types';

interface FooterProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
  onOpenWeChat?: () => void;
  onOpenShare?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale, setCurrentTab, onOpenWeChat, onOpenShare }) => {
  const sitemap = [
    { title: t(currentLocale, 'collections'), links: [
      ['products', t(currentLocale, 'products')], ['colors', t(currentLocale, 'colors')], ['finishes', t(currentLocale, 'finishes')]
    ] },
    { title: t(currentLocale, 'company'), links: [
      ['about', t(currentLocale, 'about')], ['factory', t(currentLocale, 'factory')], ['applications', t(currentLocale, 'applications')]
    ] },
    { title: 'Trade', links: [
      ['partners', t(currentLocale, 'partners')], ['resources', t(currentLocale, 'resources')], ['contact', t(currentLocale, 'contact')]
    ] }
  ];

  return (
    <footer className="wr-footer">
      <section className="wr-footer__cta">
        <div><span className="wr-eyebrow">Direct B2B inquiry</span><h2>Bring us the drawing. We will help define the stone package.</h2></div>
        <button className="wr-button wr-button--light" onClick={() => setCurrentTab('contact')}>{t(currentLocale, 'requestQuote')}<ArrowUpRight /></button>
      </section>

      <div className="wr-footer__main">
        <div className="wr-footer__brand">
          <span className="wr-brand__mark" aria-hidden="true">W</span>
          <div><strong>WHITEROCK</strong><small>MARBLE & GRANITE</small></div>
          <p>Natural and engineered stone manufacturing in Binh Phuoc Province, Vietnam. Product specifications, availability, documentation, and commercial terms are confirmed in writing for each order.</p>
          <address>
            <span><MapPin />{siteConfig.address}</span>
            <a href={`mailto:${siteConfig.email}`}><Mail />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.telHref}`}><Phone />{siteConfig.tel}</a>
          </address>
        </div>

        <nav className="wr-footer__sitemap" aria-label="Footer sitemap">
          {sitemap.map((group) => (
            <div key={group.title}><h3>{group.title}</h3>{group.links.map(([id, label]) => <button key={id} onClick={() => setCurrentTab(id)}>{label}</button>)}</div>
          ))}
        </nav>

        <div className="wr-footer__contact">
          <h3>Direct contact</h3>
          <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp<ArrowUpRight /></a>
          {onOpenWeChat && <button onClick={onOpenWeChat}><WeChatIcon />WeChat<ArrowUpRight /></button>}
          {onOpenShare && <button onClick={onOpenShare}><Share2 />Share website</button>}
        </div>
      </div>

      <div className="wr-footer__bottom">
        <p>© {new Date().getFullYear()} WHITEROCK COMPANY LIMITED. All rights reserved.</p>
        <button onClick={() => setCurrentTab('admin')}><Settings />Website administration</button>
      </div>
    </footer>
  );
};
