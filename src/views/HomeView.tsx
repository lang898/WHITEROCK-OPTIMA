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
  Maximize2,
  Sliders,
  Percent,
  Box,
  Truck,
  FileCheck,
  Globe2,
  Cpu,
  Eye,
  Camera,
  Check
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
import { StoneVisualizer } from '../components/StoneVisualizer';
import { TariffCalculator } from '../components/TariffCalculator';
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
  const [activeProductCategory, setActiveProductCategory] = useState<'All' | 'Vanity' | 'Kitchen' | 'Furniture' | 'Commercial'>('All');

  const filteredColors = activeColorFilter === 'All'
    ? colors.slice(0, 8)
    : colors.filter((c) => c.material === activeColorFilter).slice(0, 8);

  const filteredProducts = products.filter((p) => {
    if (activeProductCategory === 'All') return true;
    if (activeProductCategory === 'Vanity') return p.category.includes('Vanity');
    if (activeProductCategory === 'Kitchen') return p.category.includes('Kitchen');
    if (activeProductCategory === 'Furniture') return p.category.includes('Furniture');
    if (activeProductCategory === 'Commercial') return p.category.includes('Commercial');
    return true;
  }).slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section - Inspired by whiterockstone.com & Premier Global Stone Fabricators */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center text-stone-100 overflow-hidden bg-stone-950">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="WHITEROCK Stone Countertops & Vanity Fabrication"
            className="w-full h-full object-cover opacity-25 scale-105 transition-transform duration-10000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/90"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLocale.id === 'zh-Hans' ? '越南 20,000 m² 制造基地 (0% 美关税) + 中国欧普石材 20年工艺' : '20,000 m² Vietnam Facility (0% US Tariff) + 20-Year Stone Craftsmanship'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight max-w-5xl mx-auto">
            {currentLocale.id === 'zh-Hans'
              ? '北美标准定制石材台面与高端工程出口制造'
              : 'Precision Stone Countertops, Vanity Tops & Architectural Fabrication'}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto font-sans leading-relaxed">
            {currentLocale.id === 'zh-Hans'
              ? '专为北美酒店工程、多户住宅公寓（Multi-Family）、建材商超及品牌家居提供工程级石英石、天然大理石浴室台面、厨房岛台及奢华石材家具。支持图纸深化、下沉盆组装与免熏蒸出口木箱打包。'
              : 'Direct-from-factory engineered quartz, natural marble, and granite countertops, prefab vanity tops, and custom furniture. Engineered for North American hospitality, multi-family developments, and retail programs with 0% Section 301 US tariffs.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('products')}
              className="px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-amber-950/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Explore Products & Vanity Matrix</span>
            </button>

            <button
              onClick={() => setCurrentTab('colors')}
              className="px-6 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:text-white cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Browse 24 Stone Colors</span>
            </button>

            <button
              onClick={() => setCurrentTab('factory')}
              className="px-6 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all hover:text-amber-300 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Dual-Base Factory (20 Real Photos)</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                20,000 m²
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Vietnam Main Production Plant
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-emerald-400">
                0% Tariff
              </span>
              <span className="text-xs text-stone-400 font-medium">
                US Section 301 Exempt Route
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                100,000+ m²
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Annual Fabrication Capacity
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur-sm">
              <span className="block text-2xl font-black font-serif text-amber-400">
                20+ Years
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Natural Stone Mastery & Sourcing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges & Quality Assurance Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-xs font-semibold text-stone-300">
            <div className="flex flex-col items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm border border-amber-500/20">
                01
              </span>
              <span>Fumigated Heavy Plywood Crating</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm border border-amber-500/20">
                02
              </span>
              <span>Pre-Production 4x4" Physical Samples</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm border border-amber-500/20">
                03
              </span>
              <span>Quad-Spindle CNC & Sink Assembly</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm border border-amber-500/20">
                04
              </span>
              <span>±0.3mm Laser Dimension Tolerance</span>
            </div>
            <div className="flex flex-col items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-sm border border-amber-500/20">
                05
              </span>
              <span>Direct 40HQ Container Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 3D STONE & VANITY VISUALIZER (Top-Tier Benchmark Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoneVisualizer
          currentLocale={currentLocale}
          onAddToCart={onAddToCart}
          onRequestSample={onAddColorSample}
        />
      </section>

      {/* 4. DUAL-BASE MANUFACTURING STRATEGY (Vietnam 20,000m² + China Optima Yunfu) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Strategic Dual-Base Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Vietnam Main Export Plant + China Natural Stone Hub
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            A seamless dual-hub strategy giving global developers the 0% US tariff advantages of Southeast Asia alongside the 20-year artisanal natural marble and waterjet capabilities of Yunfu, China.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vietnam Facility Card */}
          <div className="bg-stone-900 border-2 border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col shadow-xl">
            <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                alt="WHITEROCK Vietnam Factory Facility"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-lg bg-emerald-500 text-stone-950 text-xs font-extrabold uppercase tracking-wide shadow-md">
                Primary Export Base (0% US Tariff)
              </div>
              <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-sm text-xs font-bold text-amber-400 border border-stone-700">
                20,000 m² Facility
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  WHITEROCK COMPANY LIMITED (Vietnam)
                </h3>
                <p className="text-xs text-amber-400 font-mono">
                  National Highway 14, Dong Tam, Dong Nai / Binh Phuoc, Vietnam
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Dedicated high-volume fabrication hub for North American vanity tops, kitchen counters, and commercial cut-to-size packages. Fast ocean access via Ho Chi Minh (Cat Lai) Port.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-300">
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>0% Section 301 Tariff</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automated Edge Lines</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Undermount Sink Assembly</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct 40HQ Loading</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentTab('factory')}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Inspect Vietnam 10 Real Photo Scenes</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* China Yunfu Facility Card */}
          <div className="bg-stone-900 border-2 border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col shadow-xl">
            <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
                alt="OPTIMA STONE China Factory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-lg bg-amber-500 text-stone-950 text-xs font-extrabold uppercase tracking-wide shadow-md">
                China Strategic Sourcing & Craft Hub
              </div>
              <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-sm text-xs font-bold text-amber-400 border border-stone-700">
                20+ Years Heritage
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  OPTIMA STONE (欧普石材 Yunfu, China)
                </h3>
                <p className="text-xs text-amber-400 font-mono">
                  Yunfu Stone Capital Industrial Park, Guangdong, China
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Located in the renowned Stone Capital of China. Specializing in natural marble slab procurement, complex waterjet inlays, quad-spindle CNC machining, fireplaces, and sculptured stone furniture.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-300">
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Quad-Spindle CNCs</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Natural Carrara / Calacatta</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Waterjet Medallions</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Custom Stone Furniture</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentTab('factory')}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Inspect Yunfu 10 Real Photo Scenes</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TARIFF & CONTAINER SAVINGS CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TariffCalculator
          currentLocale={currentLocale}
          onStartRfq={() => setCurrentTab('contact')}
        />
      </section>

      {/* 6. FEATURED PRODUCTS & FABRICATION SCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Core Export Product Scope
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
              Precision Countertop & Vanity Programs
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Products' },
              { id: 'Vanity', label: 'Bathroom Vanity Tops' },
              { id: 'Kitchen', label: 'Kitchen Countertops' },
              { id: 'Furniture', label: 'Stone Furniture' },
              { id: 'Commercial', label: 'Commercial Cut-to-Size' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveProductCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeProductCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.sku}
              className="product-card bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 group flex flex-col shadow-lg"
            >
              <div
                className="relative aspect-16/10 overflow-hidden bg-stone-950 cursor-pointer"
                onClick={() => onSelectProduct(prod)}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700">
                  {prod.material}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-stone-900/90 text-[10px] font-mono text-stone-300 border border-stone-800">
                  {prod.sku}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-bold text-base text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-stone-800 text-xs">
                  {prod.specs.Size && (
                    <div className="flex justify-between text-stone-400">
                      <span>Standard Size:</span>
                      <strong className="text-stone-200">{prod.specs.Size}</strong>
                    </div>
                  )}
                  {prod.specs.Packaging && (
                    <div className="flex justify-between text-stone-400">
                      <span>Packaging:</span>
                      <span className="text-stone-300 truncate max-w-[60%]">{prod.specs.Packaging}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Add to RFQ Kit</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs transition-colors cursor-pointer"
                    title="View Technical Data Sheet"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentTab('products')}
            className="px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-400 font-bold text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Full Product Catalog & Technical PDF Tech Sheets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. STEP-BY-STEP B2B FABRICATION & EXPORT PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            International Project Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            From CAD Drawings to Port-Side Container Staging
          </h2>
          <p className="text-xs text-stone-300">
            A standardized manufacturing sequence built for North American commercial builders, hotel general contractors, and stone distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'CAD & Shop Drawing Approval',
              desc: 'Our engineering team reviews your architectural DWG/PDF drawings, verifies sink cutout templates, edge details, and backsplashes.',
              icon: FileCheck
            },
            {
              step: '02',
              title: 'Slab Sourcing & Sample Approval',
              desc: 'Physical 4x4" or 12x12" stone color chips dispatched via express courier to confirm veining, resin tone, and surface finish.',
              icon: Layers
            },
            {
              step: '03',
              title: 'Quad-Spindle CNC & QC Array',
              desc: 'Precision infrared cutting, automated edge profiling, undermount basin installation, and dry-lay color matching under full lighting.',
              icon: Cpu
            },
            {
              step: '04',
              title: 'Fumigated Crating & 40HQ Load',
              desc: 'Drop-tested reinforced plywood crates or A-frames with moisture-barrier EPE foam, custom labels, and direct Cat Lai container loading.',
              icon: Truck
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-3 relative">
              <div className="text-3xl font-serif font-black text-amber-400/80">
                {item.step}
              </div>
              <h4 className="font-bold text-sm text-stone-100">{item.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/60 border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Direct Factory Inquiries
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Ready to Quote Your Commercial Stone or Vanity Top Program?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Send your project BOQ, CAD plans, or stone color inquiries to our engineering estimation team. Detailed FOB / CIF quotes delivered within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentTab('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <span>Submit Project RFQ & Drawings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('colors')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>Request 4x4" Sample Box</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
