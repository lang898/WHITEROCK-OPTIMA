import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Layers,
  Sparkles,
  ArrowRight,
  Package,
  Play,
  CheckCircle2,
  Phone,
  Mail,
  FileText,
  MapPin,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import {
  pages,
  products,
  colors,
  factory,
  applications,
  siteConfig,
  finishes,
  edges
} from '../data';
import type { ProductItem, ColorItem, LocaleConfig } from '../types';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectColor: (color: ColorItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onAddColorSample: (color: ColorItem) => void;
  currentLocale: LocaleConfig;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onSelectProduct,
  onSelectColor,
  onAddToCart,
  onAddColorSample,
  currentLocale,
}) => {
  const [activeColorFilter, setActiveColorFilter] = useState<'All' | 'Marble' | 'Granite' | 'Quartz' | 'Engineered Marble'>('All');
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  const filteredColors = activeColorFilter === 'All'
    ? colors.slice(0, 8)
    : colors.filter((c) => c.material === activeColorFilter).slice(0, 8);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-stone-100 overflow-hidden bg-stone-950">
        {/* Background visual with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="assets/factory/vietnam-factory-exterior.jpg"
            alt="WHITEROCK Vietnam factory exterior"
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-10000 hover:scale-100"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%231c1917"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23292524" font-family="sans-serif" font-size="64" font-weight="bold">WHITEROCK VIETNAM</text></svg>';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{pages.homeHeroEyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight max-w-4xl mx-auto">
            {pages.homeHeroTitle}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto font-sans leading-relaxed">
            {pages.homeHeroCopy}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('products')}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Explore Products & Vanity Tops</span>
            </button>

            <button
              onClick={() => setCurrentTab('colors')}
              className="px-6 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:text-white cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Browse 24 Stone Colors</span>
            </button>
          </div>

          {/* Hard Key Metrics Band */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                20,000 m²
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Vietnam Primary Production Facility
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                100,000+ m²
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Published Annual Fabrication Capacity
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                2 Bases
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Vietnam (Primary) + Yunfu, China
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-xs font-semibold text-stone-300">
            <div className="flex flex-col items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm">
                01
              </span>
              <span>Export-Ready Crate Packing</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm">
                02
              </span>
              <span>Pre-Production Sample Approval</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm">
                03
              </span>
              <span>Precision CNC & Sink Cutouts</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm">
                04
              </span>
              <span>Real Factory Media (No Mock)</span>
            </div>
            <div className="flex flex-col items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm">
                05
              </span>
              <span>Trade & Distributor Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Production Bases Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Dual Manufacturing Footprint
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Vietnam First, Supported by Yunfu Stone Capability
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Give international buyers a clear, risk-managed route from raw material block selection to precision CNC cutting, rigorous factory inspection, and containerized export loading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vietnam Facility Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all group flex flex-col">
            <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                alt="WHITEROCK Vietnam Factory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-stone-950 text-xs font-extrabold uppercase tracking-wide">
                Primary Export Base
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  WHITEROCK COMPANY LIMITED (Vietnam)
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-1">
                  National Highway 14, Dong Tam, Dong Nai Province, Vietnam
                </p>
                <ul className="mt-4 space-y-2 text-xs text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>20,000 m²</strong> modern covered fabrication facility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Specialized vanity top lines & automated QC inspection arrays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct ocean container loading to Ho Chi Minh / Cat Lai Port</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentTab('factory')}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Inspect Vietnam Facility Tour</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* China Yunfu Support Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-stone-700 transition-all group flex flex-col">
            <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
                alt="OPTIMA STONE China Factory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-800 text-stone-200 text-xs font-extrabold uppercase tracking-wide border border-stone-700">
                China Manufacturing Support
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  OPTIMA STONE (Yunfu, China)
                </h3>
                <p className="text-xs text-stone-400 font-mono mt-1">
                  Yunfu Stone Capital Industrial Park, Guangdong, China
                </p>
                <ul className="mt-4 space-y-2 text-xs text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span><strong>20+ Years</strong> stone manufacturing & quarry sourcing expertise</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Multi-blade bridge cutting, KETE surface polishers & hand craftsmanship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Specialty natural marble slab inventory & complex 3D carving support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentTab('factory')}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Review Yunfu Workshop Capability</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Colors & Materials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Stone Material Library
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
              Engineered Quartz & Natural Stone
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Quartz', 'Marble', 'Granite', 'Engineered Marble'] as const).map((mat) => (
              <button
                key={mat}
                onClick={() => setActiveColorFilter(mat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeColorFilter === mat
                    ? 'bg-amber-600 text-stone-950 shadow-sm'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Color Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredColors.map((col) => (
            <div
              key={col.slug}
              className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col cursor-pointer"
              onClick={() => onSelectColor(col)}
            >
              <div className="relative aspect-square overflow-hidden bg-stone-950 shadow-inner">
                <img
                  src={col.swatchImage}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23292524"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="16" font-weight="bold">${col.name}</text></svg>`;
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-300 border border-stone-700">
                  {col.material}
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-sm text-stone-100 group-hover:text-amber-400 transition-colors">
                    {col.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">
                    {col.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-stone-500 font-mono">
                    {col.finishes.join(' / ')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddColorSample(col);
                    }}
                    className="px-2.5 py-1 rounded bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 font-semibold text-[11px] transition-colors"
                  >
                    + Sample
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentTab('colors')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs transition-colors cursor-pointer"
          >
            <span>View All 24 Colors in Full Material Matrix</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* 5. Featured Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Core Export Programs
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Engineered For Builders, Retailers & Projects
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Standard North American bathroom vanity dimensions (24&quot;, 31&quot;, 49&quot;, 61&quot; Double), kitchen islands, and bespoke cut-to-size programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.sku}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col cursor-pointer shadow-sm"
              onClick={() => onSelectProduct(prod)}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375" viewBox="0 0 500 375"><rect width="500" height="375" fill="%231c1917"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="18">${prod.sku}</text></svg>`;
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700 font-mono">
                  {prod.sku}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] text-stone-300 border border-stone-700">
                  {prod.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
                  {prod.specs.Size && (
                    <div className="flex justify-between">
                      <span>Standard Size:</span>
                      <strong className="text-stone-200">{prod.specs.Size}</strong>
                    </div>
                  )}
                  {prod.specs.MOQ && (
                    <div className="flex justify-between">
                      <span>Program MOQ:</span>
                      <strong className="text-stone-200">{prod.specs.MOQ}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                    className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>+ Add to RFQ</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(prod);
                    }}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                  >
                    Specs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentTab('products')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs transition-colors cursor-pointer"
          >
            <span>Explore All 11 Product Models & Custom Sizes</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* 6. Factory Reality Gallery (Owner-Supplied Real Photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Authentic Live Workshop Photography (WR越南主厂区实拍)</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                WHITEROCK Vietnam Manufacturing Reality
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mt-1">
                Zero synthetic renders. Real photos of our Dong Nai manufacturing plant featuring infrared bridge cutting saws, Hongda automated continuous edge profiling, radial arm polishing, and full-array QC dry-lay inspection.
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('factory')}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2 self-start md:self-auto cursor-pointer transition-all shadow-md"
            >
              <span>Explore All 10 Factory Production Scenes</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {factory.gallery.slice(0, 4).map((g, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentTab('factory')}
                className="group relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-sm cursor-pointer hover:border-amber-500/50 transition-all"
              >
                <img
                  src={g.image}
                  alt={g.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23292524"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="14">WR FACTORY PHOTO</text></svg>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[9px] font-bold text-amber-400 border border-stone-700">
                  {g.category || 'Vietnam Facility'}
                </div>
                <div className="absolute bottom-2 inset-x-2 p-1.5 text-[11px] font-medium text-stone-200 truncate">
                  {g.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How Procurement Works (4-Step Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            B2B Procurement Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Clear, Predictable Path from Sample to Container
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 relative flex flex-col justify-between">
            <span className="text-3xl font-black font-serif text-amber-500/30">01</span>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-base text-white">Choose Direction & Sizing</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Review colors, edge profiles, and vanity dimensions or send your project schedule and CAD shop drawings.
              </p>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 relative flex flex-col justify-between">
            <span className="text-3xl font-black font-serif text-amber-500/30">02</span>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-base text-white">Sample & Drawing Sign-Off</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Approve physical 4x4&quot; color chips, edge profile samples, sink cutout centerlines, and packing specifications.
              </p>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 relative flex flex-col justify-between">
            <span className="text-3xl font-black font-serif text-amber-500/30">03</span>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-base text-white">CNC Cutting & Inspection</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Vietnam facility executes CNC precision cutting. Pre-packing inspection logs and 3rd-party audit (SGS/BV) supported.
              </p>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 relative flex flex-col justify-between">
            <span className="text-3xl font-black font-serif text-amber-500/30">04</span>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-base text-white">Export Crating & Shipping</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Individual boxed units with corner foam, packed in fumigated plywood crates with full export documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Direct Quote Request Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" id="inquiry">
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Direct Factory Quotation
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Ready to Quote Your Program or Request a Sample Box?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Connect directly with our Vietnam export engineering desk. Get complete pricing, lead times, container loadability, and sample sets within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('contact')}
                className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Send Direct Project Inquiry
              </button>
              <a
                href={`tel:${siteConfig.telHref}`}
                className="px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Factory: {siteConfig.tel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
