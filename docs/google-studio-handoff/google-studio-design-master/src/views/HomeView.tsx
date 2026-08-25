import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Layers,
  Sparkles,
  ArrowRight,
  Package,
  CheckCircle2,
  ChevronRight,
  Truck,
  FileCheck,
  Cpu,
  Eye,
  Check,
  Zap,
  Globe2,
  Sliders,
  Maximize2,
  Compass,
  Ruler,
  Factory
} from 'lucide-react';
import {
  products,
  colors,
  factory,
  applications,
  siteConfig
} from '../data';
import { StoneVisualizer } from '../components/StoneVisualizer';
import { TariffCalculator } from '../components/TariffCalculator';
import { VanityConfigurator } from '../components/VanityConfigurator';
import { SocialMediaHub } from '../components/SocialMediaHub';
import { WhiterockHeritageSection } from '../components/WhiterockHeritageSection';
import type { ShareContent } from '../components/SocialShareModal';
import type { ProductItem, ColorItem, RfqCartItem, LocaleConfig } from '../types';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectColor: (color: ColorItem) => void;
  onAddToCart: (product: ProductItem | RfqCartItem) => void;
  onAddColorSample: (color: ColorItem) => void;
  currentLocale: LocaleConfig;
  onOpenShareModal?: (content: ShareContent) => void;
  onOpenWeChat?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onSelectProduct,
  onSelectColor,
  onAddToCart,
  onAddColorSample,
  currentLocale,
  onOpenShareModal,
  onOpenWeChat,
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
    <div className="space-y-24 sm:space-y-36 bg-[#f5f5f7] text-[#1d1d1f] pb-24 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO KEYNOTE SECTION (Apple Display + Industrial Precision Aesthetics) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Industrial Machined Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] shadow-xs hover:border-black/20 transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="tech-badge text-[#86868b]">VIETNAM DIRECT PLANT</span>
            <span className="text-black/20 font-light">|</span>
            <span className="tech-badge text-[#1d1d1f]">WHITEROCK MARBLE & GRANITE</span>
            <span className="text-black/20 font-light">|</span>
            <span className="tech-badge text-emerald-800">0% US SECTION 301</span>
          </div>

          {/* Grand Keynote Headline */}
          <div className="space-y-5 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-[#1d1d1f] leading-[1.04]">
              Natural Stone & Quartz.
              <br />
              <span className="apple-text-gradient">
                Mastered with Craftsmanship.
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-[#6e6e73] max-w-3xl mx-auto font-normal leading-relaxed tracking-tight pt-1">
              Direct-from-plant quartz countertops, vanity tops with pre-mounted CUPC sinks, indoor & outdoor stone furniture, 5-axis waterjet medallions, and hand-carved fireplaces. Engineered in Binh Phuoc, Vietnam with 20+ years stone mastery.
            </p>
          </div>

          {/* Apple Precision CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => setCurrentTab('products')}
              className="px-8 py-4 rounded-full bg-[#111113] hover:bg-black text-white font-medium text-sm sm:text-base shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-amber-300" />
              <span>Explore 6 Product Lines</span>
            </button>

            <button
              onClick={() => setCurrentTab('colors')}
              className="px-8 py-4 rounded-full bg-white hover:bg-[#fbfbfd] border border-black/[0.1] text-[#1d1d1f] font-medium text-sm sm:text-base shadow-xs hover:border-black/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#86868b]" />
              <span>24 Stone Swatches</span>
            </button>

            <button
              onClick={() => setCurrentTab('contact')}
              className="px-6 py-4 rounded-full bg-transparent hover:bg-black/[0.04] text-[#0071e3] font-semibold text-sm sm:text-base transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Request Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Visual Showcase with Industrial Technical Framing */}
          <div className="pt-10 sm:pt-14 max-w-6xl mx-auto">
            <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-black/[0.09] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.12)] bg-white group">
              <div className="aspect-16/9 sm:aspect-21/9 overflow-hidden bg-stone-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
                  alt="WHITEROCK Stone Precision Fabrication"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out filter brightness-102"
                />
                
                {/* Floating Technical Overlay Chips */}
                <div className="absolute top-6 left-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-lg text-xs font-semibold text-[#1d1d1f]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="tech-badge">FACILITY : BINH PHUOC PLANT [20,000 M²]</span>
                </div>

                <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-white text-xs font-medium shadow-2xl">
                  <Ruler className="w-3.5 h-3.5 text-amber-300" />
                  <span className="tech-badge">CNC CALIBRATION : ±0.3MM</span>
                </div>

                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f]/90 backdrop-blur-xl border border-white/15 text-white text-xs font-medium shadow-2xl">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="tech-badge">SPECULAR GLOSS : 85+ GU</span>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Apple-Style Keynote Metrics Strip with Industrial Monospace Sub-Tags */}
          <div className="pt-12 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs relative overflow-hidden group hover:border-black/20 transition-all">
              <div className="tech-badge text-[#86868b] mb-1">PLANT FOOTPRINT</div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
                20,000<span className="text-xl sm:text-2xl font-normal text-[#86868b]"> m²</span>
              </div>
              <p className="text-xs text-[#86868b] font-medium mt-3 leading-snug">
                Binh Phuoc manufacturing facility with dedicated wet processing bays.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs relative overflow-hidden group hover:border-black/20 transition-all">
              <div className="tech-badge text-emerald-700 mb-1">CUSTOMS TARIFF</div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-emerald-600">
                0%<span className="text-xl sm:text-2xl font-normal text-[#86868b]"> Tariff</span>
              </div>
              <p className="text-xs text-[#86868b] font-medium mt-3 leading-snug">
                Full US Section 301 exemption with certified Form B C/O.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs relative overflow-hidden group hover:border-black/20 transition-all">
              <div className="tech-badge text-[#86868b] mb-1">STONE EXPERIENCE</div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
                20+<span className="text-xl sm:text-2xl font-normal text-[#86868b]"> Years</span>
              </div>
              <p className="text-xs text-[#86868b] font-medium mt-3 leading-snug">
                Natural marble, granite & quartz cut-to-size craftsmanship.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs relative overflow-hidden group hover:border-black/20 transition-all">
              <div className="tech-badge text-[#86868b] mb-1">ANNUAL CAPACITY</div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
                100k<span className="text-xl sm:text-2xl font-normal text-[#86868b]"> m²/yr</span>
              </div>
              <p className="text-xs text-[#86868b] font-medium mt-3 leading-snug">
                Cut-to-size multi-family & hospitality container export scale.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. APPLE-STYLE BENTO GRID: INDUSTRIAL FABRICATION ADVANTAGES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="tech-badge text-[#86868b] tracking-widest uppercase">
            ARCHITECTURAL SPECIFICATION STANDARD
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
            Engineered in Vietnam.
            <br />
            Optimized for North America.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b]">
            Every slab cut, sink mounted, and crate packed to withstand international logistics and streamline on-site job installation.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Bento Card 1 (Large - Spans 2 Columns) */}
          <div className="md:col-span-2 apple-card p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-4 max-w-xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="tech-badge">0% TARIFF • FORM B C/O VERIFIED</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                20,000 m² Advanced Fabrication Facility
              </h3>
              <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
                Located in Binh Phuoc Province, with direct highway transit to Ho Chi Minh Cat Lai container port. Fully compliant with Substantial Transformation rules, providing valid Form B Certificate of Origin for 0% US Section 301 duties.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-16/8 bg-stone-100 border border-black/[0.06]">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85"
                alt="WHITEROCK Vietnam Plant"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/[0.06] relative z-10">
              <span className="tech-badge text-[#86868b]">
                CAT LAI PORT DIRECT 40HQ OCEAN STAGING
              </span>
              <button
                onClick={() => setCurrentTab('factory')}
                className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Tour Vietnam Plant Real Photo Scenes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Card 2 (Standard Column) */}
          <div className="apple-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200/80">
                <Cpu className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                CUPC Pre-Glued Sinks & Quad CNC Cutouts
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Vitreous china rectangular undermount porcelain basins pre-attached with high-strength structural silicone and stainless brackets at the Vietnam factory.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-2 text-xs text-[#1d1d1f]">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>cUPC-Certified Porcelain Basins</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Single / 4" / 8" Faucet Hole Drill</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Universal 4" Backsplash & Ends</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('finishes')}
              className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Sink & Edge Profiles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bento Card 3 (Standard Column) */}
          <div className="apple-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-900 flex items-center justify-center border border-sky-200/80">
                <Layers className="w-6 h-6 text-sky-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                4x4" Physical Swatch Boxes via FedEx
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Order custom sample boxes delivered to your North American design studio or job site within 5 business days for owner and architect approvals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] text-xs space-y-1.5 text-[#6e6e73]">
              <div><strong>Quartz Swatches:</strong> Calacatta Gold, Pure White, Carrara</div>
              <div><strong>Marble & Granite:</strong> Nero Marquina, Steel Grey, Absolute Black</div>
            </div>

            <button
              onClick={() => setCurrentTab('colors')}
              className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Build Sample Swatch Kit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bento Card 4 (Spans 2 Columns) */}
          <div className="md:col-span-2 apple-card p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-300">
                <Truck className="w-6 h-6 text-stone-800" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                Drop-Tested ISPM-15 Heat-Treated Crating
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Reinforced heavy plywood boxes with plastic film moisture barrier, corner protectors, foam padding, and steel strapping. Zero breakage guarantee on ocean freight.
              </p>
              <div className="flex gap-4 pt-2 text-xs font-medium text-[#1d1d1f]">
                <span className="tech-badge">✓ 25–35 TOPS/CRATE</span>
                <span className="tech-badge">✓ UNIT BARCODES</span>
                <span className="tech-badge">✓ A-FRAME STIFFENERS</span>
              </div>
            </div>

            <div className="w-full md:w-80 aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-black/[0.06] shrink-0">
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
                alt="Heavy Plywood Export Crating"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 WHITEROCK MARBLE & GRANITE: 6 SIGNATURE PROGRAMS & DUAL HUB HERITAGE */}
      {/* ========================================================================= */}
      <WhiterockHeritageSection
        onSelectCategory={(cat) => {
          setCurrentTab('products');
        }}
        onExploreProducts={() => setCurrentTab('products')}
        onOpenRfq={() => setCurrentTab('contact')}
      />


      {/* ========================================================================= */}
      {/* 3. INTERACTIVE STUDIO SPOTLIGHT: 3D STONE VISUALIZER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="tech-badge text-[#86868b] tracking-widest uppercase">
              INTERACTIVE 3D RENDERING STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Visualize Stone Surfaces in Real Rooms
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Switch lighting temperatures, room styles, and stone colors in real time.
            </p>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-black/[0.06] shadow-sm bg-white p-4 sm:p-8">
            <StoneVisualizer
              currentLocale={currentLocale}
              onAddToCart={onAddToCart}
              onRequestSample={onAddColorSample}
            />
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. INTERACTIVE VANITY & COUNTERTOP CONFIGURATOR */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="tech-badge text-[#86868b] tracking-widest uppercase">
              B2B SPECIFICATION MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Configure Prefab Vanity Tops & Sink Cutouts
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Standard 22" depths (25", 31", 37", 49", 61", 73"), sink positions, and edge details.
            </p>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-black/[0.06] shadow-sm bg-white p-4 sm:p-8">
            <VanityConfigurator
              currentLocale={currentLocale}
              onAddToCart={(item) => onAddToCart(item)}
              onOpenContact={() => setCurrentTab('contact')}
            />
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. TARIFF & CONTAINER SAVINGS OPTIMIZER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] overflow-hidden border border-black/[0.06] shadow-sm bg-white p-6 sm:p-10">
          <TariffCalculator
            currentLocale={currentLocale}
            onStartRfq={() => setCurrentTab('contact')}
          />
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. FEATURED PRODUCTS (Apple Store Clean Showcase) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="tech-badge text-[#86868b] tracking-widest uppercase">
              CATALOG SELECTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
              Core Fabrication Programs
            </h2>
          </div>

          {/* Apple-style smooth segment filter */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white border border-black/[0.06] shadow-2xs">
            {[
              { id: 'All', label: 'All Products' },
              { id: 'Vanity', label: 'Vanity Tops' },
              { id: 'Kitchen', label: 'Kitchen Counters' },
              { id: 'Furniture', label: 'Furniture' },
              { id: 'Commercial', label: 'Commercial Cut-to-Size' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveProductCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeProductCategory === cat.id
                    ? 'bg-[#1d1d1f] text-white shadow-xs font-semibold'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.sku}
              className="apple-card overflow-hidden flex flex-col justify-between group"
            >
              <div
                className="relative aspect-16/11 overflow-hidden bg-stone-100 cursor-pointer"
                onClick={() => onSelectProduct(prod)}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#1d1d1f] shadow-xs">
                  {prod.material}
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#111113]/85 text-[10px] font-mono text-white">
                  {prod.sku}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-bold text-lg text-[#1d1d1f] group-hover:text-amber-900 transition-colors cursor-pointer"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-black/[0.06] text-xs">
                  {prod.specs.Size && (
                    <div className="flex justify-between text-[#86868b]">
                      <span>Dimensions:</span>
                      <strong className="text-[#1d1d1f] font-mono">{prod.specs.Size}</strong>
                    </div>
                  )}
                  {prod.specs.Packaging && (
                    <div className="flex justify-between text-[#86868b]">
                      <span>Packaging:</span>
                      <span className="text-[#1d1d1f] truncate max-w-[65%]">{prod.specs.Packaging}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="flex-1 py-3 bg-[#111113] hover:bg-black text-white font-medium rounded-full text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Package className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to RFQ Cart</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="p-3 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] rounded-full text-xs transition-colors cursor-pointer"
                    title="View Technical Data Sheet"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => setCurrentTab('products')}
            className="px-8 py-4 rounded-full bg-white hover:bg-[#fbfbfd] border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs hover:border-black/20"
          >
            <span>View Full Product Catalog & Technical PDF Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 7. STEP-BY-STEP B2B EXPORT SEQUENCE (Industrial Progression) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="tech-badge text-[#86868b] tracking-widest uppercase">
            INTERNATIONAL WORKFLOW ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
            From CAD Drawings to Container Staging
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b]">
            Standardized execution tailored for North American multi-family builders & stone distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'CAD & Shop Takeoff',
              desc: 'Our Vietnam engineering team reviews architectural DWG/PDF drawings, verifies sink cutout templates and edge profiles.',
              icon: FileCheck
            },
            {
              step: '02',
              title: 'Sample Approval',
              desc: 'Physical 4x4" or 12x12" stone chips dispatched via express courier to confirm veining, resin tone, and finish.',
              icon: Layers
            },
            {
              step: '03',
              title: 'Quad CNC & Assembly',
              desc: 'Infrared bridge saw slicing, automated edge profiling, cUPC basin mounting, and dry-lay color matching.',
              icon: Cpu
            },
            {
              step: '04',
              title: 'Fumigated Crating',
              desc: 'Reinforced drop-tested plywood crates with EPE foam barrier, custom labels, and direct Cat Lai container loading.',
              icon: Truck
            }
          ].map((item, idx) => (
            <div key={idx} className="apple-card p-8 space-y-4">
              <div className="text-4xl font-bold text-amber-700/80 font-mono">
                {item.step}
              </div>
              <h4 className="font-bold text-base text-[#1d1d1f]">{item.title}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 8. GLOBAL SOCIAL MEDIA & LIVE FACTORY BROADCAST HUB */}
      {/* ========================================================================= */}
      {onOpenShareModal && onOpenWeChat && (
        <SocialMediaHub
          onOpenShareModal={onOpenShareModal}
          onOpenWeChat={onOpenWeChat}
        />
      )}

      {/* ========================================================================= */}
      {/* 9. GRAND APPLE-STYLE BOTTOM CALL-TO-ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card-dark rounded-[3rem] p-10 sm:p-16 lg:p-20 text-center space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tech-badge">DIRECT VIETNAM PLANT INQUIRIES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Ready to quote your commercial stone program?
            </h2>
            <p className="text-sm sm:text-lg text-[#a1a1a6] max-w-2xl mx-auto leading-relaxed">
              Send your project BOQ, CAD plans, or vanity top specifications to our engineering estimation team. Comprehensive FOB / CIF quotation within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-4 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <span>Submit Project RFQ & Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentTab('colors')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm sm:text-base transition-colors cursor-pointer"
            >
              <span>Request 4x4" Physical Samples</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
