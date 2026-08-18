import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  FileText,
  Globe,
  Layers,
  ChevronDown
} from 'lucide-react';
import { locales, siteConfig } from '../data';
import type { LocaleConfig } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  currentLocale: LocaleConfig;
  setLocale: (loc: LocaleConfig) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  currentLocale,
  setLocale
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: currentLocale.id === 'zh-Hans' ? '首页' : currentLocale.id === 'vi' ? 'Trang chủ' : 'Home' },
    { id: 'products', label: currentLocale.id === 'zh-Hans' ? '产品矩阵' : currentLocale.id === 'vi' ? 'Sản phẩm' : 'Products' },
    { id: 'colors', label: currentLocale.id === 'zh-Hans' ? '石材色板' : currentLocale.id === 'vi' ? 'Bảng màu' : 'Colors' },
    { id: 'finishes', label: currentLocale.id === 'zh-Hans' ? '工艺与边型' : currentLocale.id === 'vi' ? 'Gia công & Cạnh' : 'Finishes & Edges' },
    { id: 'factory', label: currentLocale.id === 'zh-Hans' ? '工厂与产能' : currentLocale.id === 'vi' ? 'Nhà máy' : 'Factory' },
    { id: 'applications', label: currentLocale.id === 'zh-Hans' ? '空间实景' : currentLocale.id === 'vi' ? 'Ứng dụng' : 'Applications' },
    { id: 'partners', label: currentLocale.id === 'zh-Hans' ? '合作计划' : currentLocale.id === 'vi' ? 'Đối tác' : 'Trade Program' },
    { id: 'resources', label: currentLocale.id === 'zh-Hans' ? '技术文档' : currentLocale.id === 'vi' ? 'Tài liệu' : 'Resources' },
    { id: 'contact', label: currentLocale.id === 'zh-Hans' ? '联系与询价' : currentLocale.id === 'vi' ? 'Liên hệ' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      {/* Top micro bar with contact info & factory trust signal */}
      <div className="bg-stone-950/80 border-b border-stone-800/60 px-4 py-1.5 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentLocale.id === 'zh-Hans'
                ? '越南 20,000 m² 生产基地 + 中国云浮制造支持'
                : currentLocale.id === 'vi'
                ? 'Nhà máy 20.000 m² tại Đồng Nai + Trung Quốc hỗ trợ'
                : '20,000 m² Vietnam Manufacturing Facility + Yunfu Base'}
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:inline">100,000+ m² Published Capacity</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 ml-auto">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden md:inline">{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.telHref}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{siteConfig.tel}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand logo & tagline */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-100 to-stone-300 flex items-center justify-center text-stone-950 font-black text-lg tracking-wider shadow-md group-hover:scale-105 transition-transform">
              {currentLocale.brandMark}
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-wider text-stone-50 font-serif flex items-center gap-1.5">
                {currentLocale.brand}
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-sans font-medium border border-amber-500/30">
                  VN
                </span>
              </div>
              <p className="text-[11px] tracking-wider text-stone-400 uppercase font-sans">
                {currentLocale.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-stone-800 text-amber-400 shadow-sm border border-stone-700'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action cluster (Language, RFQ Cart, Quick CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-stone-800/80 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span>{currentLocale.switchLabel}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-stone-900 border border-stone-700 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  {locales.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setLocale(loc);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        loc.id === currentLocale.id
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <span>{loc.label}</span>
                      <span className="text-[10px] text-stone-500 uppercase">{loc.switchLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RFQ / Sample Kit Cart Button */}
            <button
              onClick={openCart}
              id="header-rfq-cart-btn"
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">RFQ & Samples</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold border border-amber-400">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === item.id
                  ? 'bg-stone-800 text-amber-400 font-semibold'
                  : 'text-stone-300 hover:bg-stone-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 mt-3 border-t border-stone-800 flex gap-2">
            <button
              onClick={() => {
                openCart();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-amber-600 text-stone-950 font-bold text-center text-xs flex items-center justify-center gap-2"
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
