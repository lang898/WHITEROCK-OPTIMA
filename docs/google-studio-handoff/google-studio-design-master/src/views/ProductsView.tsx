import React, { useState } from 'react';
import {
  Package,
  Search,
  SlidersHorizontal,
  Plus,
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  ShieldCheck,
  Cpu,
  Ruler,
  Boxes,
  Check
} from 'lucide-react';
import { products } from '../data';
import type { ProductItem, LocaleConfig } from '../types';

interface ProductsViewProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  currentLocale: LocaleConfig;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onSelectProduct,
  onAddToCart,
  currentLocale,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Bathroom Vanity Tops',
    'Kitchen Countertops',
    'Stone Furniture',
    'Waterjet & Mosaic',
    'Fireplace & Architectural',
    'Commercial Projects',
    'Trade Sample Kit'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      (selectedCategory === 'Bathroom Vanity Tops' && p.category.includes('Vanity')) ||
      (selectedCategory === 'Kitchen Countertops' && p.category.includes('Kitchen')) ||
      (selectedCategory === 'Stone Furniture' && p.category.includes('Furniture')) ||
      (selectedCategory === 'Waterjet & Mosaic' && (p.category.includes('Waterjet') || p.category.includes('Mosaic'))) ||
      (selectedCategory === 'Fireplace & Architectural' && (p.category.includes('Fireplace') || p.category.includes('Architectural'))) ||
      (selectedCategory === 'Commercial Projects' && (p.category.includes('Commercial') || p.category.includes('Multi-Family') || p.category.includes('Hotel'))) ||
      (selectedCategory === 'Trade Sample Kit' && p.category.includes('Sample'));

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      
      {/* ========================================================================= */}
      {/* Header Banner (Apple Keynote Style + Industrial Precision Callouts) */}
      {/* ========================================================================= */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] shadow-2xs">
          <Package className="w-3.5 h-3.5 text-amber-600" />
          <span className="tech-badge">VIETNAM DIRECT EXPORT CATALOG • 2026 ARCHITECTURAL SPEC</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[#1d1d1f]">
          Countertops, Vanity Tops & Engineered Surfaces.
        </h1>
        
        {/* User-requested exact statement */}
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl font-normal">
          Direct-from-plant quartz countertops, vanity tops with pre-mounted CUPC sinks, and cut-to-size hospitality surfaces. Crafted in Vietnam with full Form B C/O tariff exemption.
        </p>

        {/* Industrial Specification Pill Indicators */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f0f3] border border-black/[0.06] text-[#1d1d1f]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="tech-badge">cUPC Factory Pre-Glued Sinks</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f0f3] border border-black/[0.06] text-[#1d1d1f]">
            <Ruler className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="tech-badge">±0.3mm CNC Cutout Accuracy</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f0f3] border border-black/[0.06] text-[#1d1d1f]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="tech-badge">0% US Section 301 Duty</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Category Engineering Quick Cards (Industrial Architecture Highlights) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="apple-card p-6 space-y-3 bg-gradient-to-br from-white to-[#fbfbfd]">
          <div className="flex items-center justify-between">
            <span className="tech-badge text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              PROGRAM 01
            </span>
            <span className="text-[11px] font-mono text-[#86868b]">22" STANDARD DEPTHS</span>
          </div>
          <h3 className="font-bold text-base text-[#1d1d1f]">Bathroom Vanity Tops</h3>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Pre-assembled with vitreous china rectangular porcelain basins, structural epoxy bonding, 4" backsplash, and single/4"/8" faucet spreads.
          </p>
        </div>

        <div className="apple-card p-6 space-y-3 bg-gradient-to-br from-white to-[#fbfbfd]">
          <div className="flex items-center justify-between">
            <span className="tech-badge text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              PROGRAM 02
            </span>
            <span className="text-[11px] font-mono text-[#86868b]">ISLANDS & COUNTERS</span>
          </div>
          <h3 className="font-bold text-base text-[#1d1d1f]">Kitchen & Bar Tops</h3>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Custom peninsula cutouts, 40mm to 80mm laminated mitered edges, and bookmatched waterfall returns for high-end residential & multifamily units.
          </p>
        </div>

        <div className="apple-card p-6 space-y-3 bg-gradient-to-br from-white to-[#fbfbfd]">
          <div className="flex items-center justify-between">
            <span className="tech-badge text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              PROGRAM 03
            </span>
            <span className="text-[11px] font-mono text-[#86868b]">CAD / DWG TAKEOFF</span>
          </div>
          <h3 className="font-bold text-base text-[#1d1d1f]">Commercial & Multi-Family</h3>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Unit-labeled crating, precise CAD floor plans sequencing, and direct container delivery to job sites across North America.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Filter & Search Segment (Apple Control Bar) */}
      {/* ========================================================================= */}
      <div className="apple-card p-4 sm:p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category Segment Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#111113] text-white shadow-xs font-semibold'
                  : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search SKU, size, or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-black/30 focus:bg-white transition-all font-mono"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Products Grid (Apple Store Clean Cards with Machined Specs) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.sku}
            className="apple-card overflow-hidden flex flex-col justify-between group cursor-pointer"
            onClick={() => onSelectProduct(prod)}
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375" viewBox="0 0 500 375"><rect width="500" height="375" fill="%23f5f5f7"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2386868b" font-family="sans-serif" font-weight="bold" font-size="20">${prod.sku}</text></svg>`;
                }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#1d1d1f] shadow-xs">
                {prod.sku}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#1d1d1f] shadow-xs">
                {prod.material}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="tech-badge text-[#86868b] block">
                  {prod.category}
                </span>
                <h3 className="font-bold text-lg text-[#1d1d1f] group-hover:text-amber-900 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-2 text-xs text-[#1d1d1f] pt-4 border-t border-black/[0.06] bg-[#fbfbfd] p-4 rounded-2xl border border-black/[0.04]">
                {prod.specs.Size && (
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Dimensions:</span>
                    <strong className="text-[#1d1d1f] font-mono">{prod.specs.Size}</strong>
                  </div>
                )}
                {prod.specs.Sink && (
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Sink Cutout:</span>
                    <span className="text-[#1d1d1f]">{prod.specs.Sink}</span>
                  </div>
                )}
                {prod.specs.Edge && (
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Edge Detail:</span>
                    <span className="text-[#1d1d1f]">{prod.specs.Edge}</span>
                  </div>
                )}
                {prod.specs.MOQ && (
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">MOQ:</span>
                    <strong className="text-amber-800 font-mono">{prod.specs.MOQ}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#111113] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to RFQ</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(prod);
                  }}
                  className="px-5 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Full Specs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-16 text-center apple-card space-y-3">
          <p className="text-[#86868b] font-medium text-sm">No products match your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-[#0071e3] font-semibold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
