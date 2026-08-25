import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  FileText,
  Globe,
  Layers,
  ChevronDown,
  Settings,
  Sparkles,
  Share2
} from 'lucide-react';
import { WhatsAppIcon, WeChatIcon, LinkedInIcon } from './SocialIcons';
import { locales, siteConfig } from '../data';
import type { LocaleConfig } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  currentLocale: LocaleConfig;
  setLocale: (loc: LocaleConfig) => void;
  onOpenWeChat?: () => void;
  onOpenShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  currentLocale,
  setLocale,
  onOpenWeChat,
  onOpenShare
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'colors', label: 'Stone Colors' },
    { id: 'factory', label: 'Vietnam Factory' },
    { id: 'finishes', label: 'Edges & Finishes' },
    { id: 'applications', label: 'Projects' },
    { id: 'partners', label: 'Trade Program' },
    { id: 'resources', label: 'Tech Specs' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fbfbfd]/80 backdrop-blur-2xl border-b border-black/[0.06] text-[#1d1d1f] transition-all">
      {/* Top Apple-style subtle announcement strip with Social Media Connects */}
      <div className="bg-[#f5f5f7]/90 border-b border-black/[0.04] px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-[#86868b]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shrink-0 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              20,000 m² Vietnam Facility
            </span>
            <span className="text-black/20 hidden sm:inline">/</span>
            <span className="font-medium text-[#1d1d1f] text-[11px] truncate hidden sm:inline">
              0% US Section 301 Tariff • Form B Certificate of Origin Verified
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[#6e6e73] shrink-0 text-[11px]">
            {/* Direct WhatsApp Fast Chat */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello WHITEROCK Vietnam, I would like to inquire about countertop fabrication.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#128C7E] hover:text-[#075E54] font-medium transition-colors"
              title="Fastest WhatsApp Response"
            >
              <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* WeChat Official QR Popup Trigger */}
            {onOpenWeChat && (
              <button
                type="button"
                onClick={onOpenWeChat}
                className="inline-flex items-center gap-1 text-[#07c160] hover:text-[#06ad56] font-medium transition-colors cursor-pointer"
                title="WeChat 微信官方直连"
              >
                <WeChatIcon className="w-3 h-3" />
                <span className="hidden md:inline">WeChat 微信</span>
              </button>
            )}

            {/* LinkedIn Company Link */}
            <a
              href={siteConfig.social.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-[#0A66C2] hover:text-[#084e96] font-medium transition-colors"
              title="LinkedIn B2B Company Page"
            >
              <LinkedInIcon className="w-3 h-3" />
              <span>LinkedIn</span>
            </a>

            <span className="text-black/10 hidden md:inline">|</span>

            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#86868b]" />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.telHref}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#86868b]" />
              <span>{siteConfig.tel}</span>
            </a>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full transition-colors cursor-pointer border ${
                currentTab === 'admin'
                  ? 'bg-[#1d1d1f] text-white border-transparent'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] border-black/[0.05]'
              }`}
              title="Site CMS & Inquiries Admin"
            >
              <Settings className="w-3 h-3 text-[#86868b]" />
              <span>Admin (后台管理)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar (Apple Minimalist Architecture) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          {/* Brand logo (Apple clean typography) */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none shrink-0"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] flex items-center justify-center text-amber-300 font-bold text-sm tracking-wider shadow-xs group-hover:scale-105 transition-transform">
              WR
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg tracking-tight text-[#1d1d1f] flex items-center gap-1.5">
                WHITEROCK
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold tracking-wider uppercase border border-amber-300/80">
                  MARBLE & GRANITE
                </span>
              </div>
              <p className="text-[10px] tracking-tight text-[#86868b] hidden sm:block">
                Vietnam Factory (Bình Phước) • Natural Stone & Quartz
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1d1d1f] text-white shadow-xs'
                      : 'text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action cluster (Language, Apple-style Pill RFQ Cart, Mobile toggle) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-medium transition-colors cursor-pointer border border-black/[0.04]"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#86868b]" />
                <span className="font-mono text-xs">{currentLocale.switchLabel}</span>
                <ChevronDown className="w-3 h-3 text-[#86868b]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  {locales.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setLocale(loc);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        loc.id === currentLocale.id
                          ? 'bg-[#f5f5f7] text-[#1d1d1f] font-bold'
                          : 'text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                      }`}
                    >
                      <span>{loc.label}</span>
                      <span className="text-[10px] text-[#86868b] uppercase font-mono">{loc.switchLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apple-style Pill Button: RFQ & Samples */}
            <button
              onClick={openCart}
              id="header-rfq-cart-btn"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-all shadow-sm active:scale-95 cursor-pointer group"
              title={`RFQ Cart & Sample Kit (${cartCount} items)`}
              aria-label={`Open RFQ Cart with ${cartCount} items`}
            >
              <FileText className="w-3.5 h-3.5 text-white/90 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline">RFQ & Samples</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4.5 px-1.5 rounded-full bg-white text-[#0071e3] font-mono text-[10px] font-extrabold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-black/[0.04] text-[#1d1d1f] hover:bg-black/[0.08] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Apple Clean Sheet) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff]/98 backdrop-blur-2xl border-b border-black/[0.06] px-5 pt-3 pb-6 space-y-1 shadow-2xl">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-[#1d1d1f] text-white font-semibold'
                  : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentTab('admin');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
          >
            Website CMS Admin (网站后台管理)
          </button>
          <div className="pt-4 mt-3 border-t border-black/[0.06] flex gap-2">
            <button
              onClick={() => {
                openCart();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-center text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Layers className="w-4 h-4" />
              Sample Kit / RFQ Builder ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
