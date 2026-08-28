import React, { useState } from 'react';
import { ChevronDown, FileText, Globe, Mail, Menu, Search, X } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { locales, siteConfig } from '../data/site';
import { routePath } from '../routes';
import { t } from '../i18n';
import { useUnits } from './UnitContext';
import type { LocaleConfig } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  currentLocale: LocaleConfig;
  setLocale: (loc: LocaleConfig) => void;
  onOpenShare?: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab, setCurrentTab, cartCount, openCart, currentLocale, setLocale, onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { unitSystem, setUnitSystem } = useUnits();

  const navGroups = [
    { label: t(currentLocale, 'collections'), items: [
      { id: 'products', label: t(currentLocale, 'products') },
      { id: 'colors', label: t(currentLocale, 'colors') },
      { id: 'finishes', label: t(currentLocale, 'finishes') }
    ] },
    { label: t(currentLocale, 'company'), items: [
      { id: 'about', label: t(currentLocale, 'about') },
      { id: 'factory', label: t(currentLocale, 'factory') }
    ] },
    { label: t(currentLocale, 'inspiration'), items: [{ id: 'applications', label: t(currentLocale, 'applications') }] },
    { label: t(currentLocale, 'partners'), items: [{ id: 'partners', label: t(currentLocale, 'partners') }] },
    { label: t(currentLocale, 'resources'), items: [{ id: 'resources', label: t(currentLocale, 'resources') }] },
    { label: t(currentLocale, 'contact'), items: [{ id: 'contact', label: t(currentLocale, 'contact') }] }
  ];

  const navigate = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="wr-header">
      <div className="wr-header__utility">
        <p>WHITEROCK COMPANY LIMITED · Binh Phuoc, Vietnam</p>
        <div>
          <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>
          <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a>
        </div>
      </div>

      <div className="wr-header__main">
        <a className="wr-brand" href={routePath('home')} aria-label="WHITEROCK home" onClick={(event) => { event.preventDefault(); navigate('home'); }}>
          <span className="wr-brand__mark" aria-hidden="true">W</span>
          <span><strong>WHITEROCK</strong><small>MARBLE & GRANITE</small></span>
        </a>

        <nav className="wr-nav" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const isActive = group.items.some((item) => item.id === currentTab);
            if (group.items.length === 1) {
              const item = group.items[0];
              return <a key={group.label} className={isActive ? 'is-active' : ''} href={routePath(item.id)} onClick={(event) => { event.preventDefault(); navigate(item.id); }}>{group.label}</a>;
            }
            return (
              <details key={group.label} className={isActive ? 'is-active' : ''}>
                <summary>{group.label}<ChevronDown aria-hidden="true" /></summary>
                <div className="wr-nav__menu">
                  {group.items.map((item) => (
                    <a key={item.id} href={routePath(item.id)} onClick={(event) => { event.preventDefault(); navigate(item.id); event.currentTarget.closest('details')?.removeAttribute('open'); }}>{item.label}</a>
                  ))}
                </div>
              </details>
            );
          })}
        </nav>

        <div className="wr-header__actions">
          <button className="wr-icon-button" onClick={onOpenSearch} aria-label={t(currentLocale, 'search')} title={t(currentLocale, 'search')}><Search /></button>
          <div className="wr-unit-toggle" role="group" aria-label="Measurement units">
            <button className={unitSystem === 'imperial' ? 'is-active' : ''} onClick={() => setUnitSystem('imperial')}>IN</button>
            <button className={unitSystem === 'metric' ? 'is-active' : ''} onClick={() => setUnitSystem('metric')}>MM</button>
          </div>
          <div className="wr-language">
            <button className="wr-icon-button wr-language__trigger" onClick={() => setLangDropdownOpen((open) => !open)} aria-expanded={langDropdownOpen} aria-label="Select language"><Globe /><span>{currentLocale.switchLabel}</span></button>
            {langDropdownOpen && <div className="wr-language__menu">{locales.map((locale) => <button key={locale.id} className={locale.id === currentLocale.id ? 'is-active' : ''} onClick={() => { setLocale(locale); setLangDropdownOpen(false); }}>{locale.label}</button>)}</div>}
          </div>
          <button className="wr-button wr-button--primary wr-header__rfq" onClick={openCart} aria-label={`${t(currentLocale, 'rfq')} (${cartCount})`}><FileText /> <span>{t(currentLocale, 'rfq')}</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
          <button className="wr-icon-button wr-header__menu-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label="Toggle menu">{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="wr-mobile-nav" aria-label="Mobile navigation">
          <a href={routePath('home')} onClick={(event) => { event.preventDefault(); navigate('home'); }}>{t(currentLocale, 'home')}</a>
          {navGroups.flatMap((group) => group.items).map((item) => <a key={item.id} className={currentTab === item.id ? 'is-active' : ''} href={routePath(item.id)} onClick={(event) => { event.preventDefault(); navigate(item.id); }}>{item.label}</a>)}
          <div className="wr-unit-toggle" role="group" aria-label="Measurement units">
            <button className={unitSystem === 'imperial' ? 'is-active' : ''} onClick={() => setUnitSystem('imperial')}>IN</button>
            <button className={unitSystem === 'metric' ? 'is-active' : ''} onClick={() => setUnitSystem('metric')}>MM</button>
          </div>
          <button className="wr-button wr-button--primary" onClick={openCart}>{t(currentLocale, 'rfq')} ({cartCount})</button>
        </nav>
      )}
    </header>
  );
};
