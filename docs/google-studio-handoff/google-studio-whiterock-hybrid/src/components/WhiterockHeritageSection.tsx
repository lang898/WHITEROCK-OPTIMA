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
  Flame,
  Grid,
  Gem,
  Award,
  Globe2,
  FileCheck,
  Ruler,
  Compass,
  Factory
} from 'lucide-react';
import { siteConfig } from '../data';
import type { ProductItem } from '../types';

interface WhiterockHeritageSectionProps {
  onSelectCategory?: (category: string) => void;
  onExploreProducts?: () => void;
  onOpenRfq?: () => void;
}

export const WhiterockHeritageSection: React.FC<WhiterockHeritageSectionProps> = ({
  onSelectCategory,
  onExploreProducts,
  onOpenRfq,
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'vanity-tops',
      title: 'Prefabricated Vanity Tops',
      subtitle: 'cUPC Undermount Sinks Pre-Glued',
      tag: 'Bestseller for Multi-Family & Hospitality',
      description: 'Engineered for rapid, labor-free jobsite installation. Complete with factory pre-installed cUPC porcelain bowls, pre-drilled faucet spreads (4" / 8" / single hole), and 4" matching loose or fixed backsplashes.',
      specs: [
        { label: 'Standard Dimensions', value: '25", 31", 37", 43", 49", 61" Single/Double, 73"' },
        { label: 'Material Choices', value: 'Engineered Marble, Calacatta Quartz, Carrara White' },
        { label: 'Sink Certifications', value: 'cUPC / IAPMO Certified Undermount Bowls' },
        { label: 'Edge Profiles', value: 'Eased, 1/4" Bevel, Bullnose, Demi-Bullnose' }
      ],
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
      badge: '0% US Section 301 Tariff'
    },
    {
      id: 'kitchen-countertops',
      title: 'Kitchen Tops & Waterfall Islands',
      subtitle: '45° Precision Mitered Vein Flow',
      tag: 'Gourmet Kitchens & Model Homes',
      description: 'Monolithic quartz and natural granite kitchen countertops fabricated to exact architectural shop drawings. Features bookmatched 45° mitered aprons (40mm to 100mm) and automated CNC cutout routing for sinks and cooktops.',
      specs: [
        { label: 'Slab Formats', value: 'Jumbo 126" x 63" / 130" x 65" Cut-to-Size' },
        { label: 'Thickness', value: '20mm (3/4") & 30mm (1-1/4") Solid / Mitered' },
        { label: 'Vein Alignment', value: 'Computerized Slab Vein Matching (DXF)' },
        { label: 'Finishes', value: 'High-Gloss Polished (85+ GU) / Velvet Honed / Leathered' }
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      badge: 'CNC ±0.3mm Tolerance'
    },
    {
      id: 'stone-furniture',
      title: 'Indoor & Outdoor Furniture Tops',
      subtitle: 'Dining, Coffee & Hospitality Bar Tops',
      tag: 'Whiterock Signature Specialty',
      description: 'Custom cut and polished stone tops for luxury dining tables, circular coffee tables, cocktail bar tops, and weather-resistant granite patio collections. Chamfered safety corners and sealed waterproof treatments.',
      specs: [
        { label: 'Shapes', value: 'Round (Dia 30"-60"), Oval, Racetrack, Rectangular' },
        { label: 'Core Materials', value: 'Natural Carrara Marble, Nero Marquina, Flamed Granite' },
        { label: 'Edge Details', value: 'Dupont, Triple Pencil, Full Bullnose, Reverse Bevel' },
        { label: 'Application', value: 'Luxury Residential Living & High-End Hotel Lounges' }
      ],
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85',
      badge: 'Bespoke Stone Craft'
    },
    {
      id: 'waterjet-medallions',
      title: '5-Axis CNC Waterjet Medallions',
      subtitle: 'Intricate Luxury Foyer Inlays & Patterns',
      tag: 'Architectural Statement Piece',
      description: 'High-pressure 5-axis CNC abrasive water-jet cutting technology seamlessly combines contrasting natural marbles (Statuario, Nero Marquina, Emperador, Rosa Levanto) with micron-level seam joints and fiberglass mesh reinforcement.',
      specs: [
        { label: 'Standard Diameters', value: '36", 48", 60", 72", 96" & Modular Continuous Borders' },
        { label: 'Seam Precision', value: 'Zero-grout hairline joint fit (<0.2mm)' },
        { label: 'Backing System', value: 'High-strength fiberglass mesh + resin backing' },
        { label: 'Applications', value: 'Grand Hotel Lobbies, Estate Foyers, Casino Entryways' }
      ],
      image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1200&q=85',
      badge: 'Master Inlay Art'
    },
    {
      id: 'marble-fireplaces',
      title: 'Sculpted Marble Fireplaces',
      subtitle: 'Classic Mantels, Hearths & Overmantels',
      tag: 'Timeless Architectural Elegance',
      description: 'Crafted through a fusion of 5-axis CNC 3D stone carving and master hand-chiseling. Available in French Louis XV, Tudor, Georgian, and sleek Minimalist Transitional fireplace surrounds.',
      specs: [
        { label: 'Stone Options', value: 'Pure White Marble, Carrara, Calacatta, Crema Marfil' },
        { label: 'Craft Technique', value: 'CNC 3D Milling + Master Hand Sculpting' },
        { label: 'Components', value: 'Mantel shelf, side jambs/corbels, hearth, inner surround' },
        { label: 'Packaging', value: 'Reinforced foam-lined export timber crates' }
      ],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      badge: '20+ Yrs Heritage'
    },
    {
      id: 'dimension-stone',
      title: 'Dimensional Stone & Accessories',
      subtitle: 'Thresholds, Window Sills & Mosaics',
      tag: 'Turnkey Project Supply',
      description: 'Full-program cut-to-size dimensional stone package including Hollywood bevel door thresholds, shower curbs, niche shelves, matching window sills, and matching wall claddings for large hospitality rollouts.',
      specs: [
        { label: 'Threshold Sizes', value: '2"x36", 4"x36", 5"x36", 6"x72", Single/Double Bevel' },
        { label: 'Window Sills', value: '5"x48", 6"x60", 8"x72", Polished Flat with Eased Edge' },
        { label: 'Mosaic Formats', value: 'Herringbone, Hexagon, Subway, Basketweave on Mesh' },
        { label: 'Packaging', value: 'Container-optimized bundle crates with ID tags' }
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      badge: 'Turnkey Spec'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* ========================================================================= */}
      {/* Heritage Header Strip */}
      {/* ========================================================================= */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold shadow-2xs">
          <Gem className="w-3.5 h-3.5 text-amber-700" />
          <span className="tech-badge">WHITEROCK MARBLE & GRANITE • SINCE 2000s</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f]">
          6 Signature Stone Programs.
          <br />
          <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-[#1d1d1f] bg-clip-text text-transparent">
            One Direct Manufacturing Group.
          </span>
        </h2>
        
        <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
          From high-volume prefabricated bathroom vanity programs for North American multi-family developments to hand-carved marble fireplaces and 5-axis waterjet medallions for luxury estates.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* Dual Hub Global Sourcing & Manufacturing Infrastructure Card */}
      {/* ========================================================================= */}
      <div className="apple-card p-6 sm:p-10 bg-gradient-to-br from-white via-[#fcfbf8] to-amber-50/30 border-amber-200/60 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Dual-Hub Production Synergy</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
              Vietnam Export Factory + Global Stone Engineering Hub
            </h3>
            
            <p className="text-sm text-[#6e6e73] leading-relaxed">
              WHITEROCK operates a <strong>20,000 m² standalone manufacturing facility in Binh Phuoc, Vietnam</strong> (Công Ty TNHH Whiterock), providing North American buyers with <strong>0% Section 301 tariff exemptions</strong> and fast FOB container dispatch via Cat Lai Port. Coupled with our 20+ years stone craftsmanship lineage in Yunfu, China (Optima Marble & Granite), we offer unmatched global stone block procurement and intricate custom fabrication.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f]">
                  <Factory className="w-4 h-4 text-emerald-600" />
                  <span>Vietnam Plant (Bình Phước)</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  20,000 m² plant, 100k m²/yr capacity, 0% US 301 Tariff, cUPC vanity sink gluing assembly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f]">
                  <Globe2 className="w-4 h-4 text-amber-600" />
                  <span>Optima Stone Craft Hub (Yunfu)</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  20+ years master stone carving, 5-axis water-jet inlays, and global direct quarry block sourcing.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-md aspect-16/10 relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="WHITEROCK Vietnam Factory Floor"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white space-y-0.5">
                  <div className="text-xs font-bold">WHITEROCK VIETNAM FACILITY</div>
                  <div className="text-[11px] text-white/80">Quốc Lộ 14, Đồng Tiến, Đồng Phú, Bình Phước</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6e6e73] px-1">
              <span>Verified Legal Entity: <strong>CÔNG TY TNHH WHITEROCK</strong></span>
              <span className="text-emerald-700 font-bold">EST. 2020</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6 Signature Programs Interactive Tabs */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        
        {/* Navigation Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {pillars.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActivePillar(idx)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activePillar === idx
                  ? 'bg-[#111113] text-white shadow-md'
                  : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f0f0f3] border border-black/[0.06]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activePillar === idx ? 'bg-amber-400' : 'bg-black/20'}`}></span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Pillar Feature Display */}
        <div className="apple-card p-6 sm:p-10 bg-white border border-black/[0.08] shadow-sm rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                    {pillars[activePillar].tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {pillars[activePillar].badge}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
                  {pillars[activePillar].title}
                </h3>
                
                <p className="text-sm font-medium text-amber-700">
                  {pillars[activePillar].subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
                {pillars[activePillar].description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pillars[activePillar].specs.map((spec, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#fbfbfd] border border-black/[0.05] space-y-1">
                    <div className="text-[11px] font-mono uppercase text-[#86868b] tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {onExploreProducts && (
                  <button
                    onClick={onExploreProducts}
                    className="px-6 py-3 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold shadow-md hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>View in Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {onOpenRfq && (
                  <button
                    onClick={onOpenRfq}
                    className="px-6 py-3 rounded-full bg-white hover:bg-[#fbfbfd] border border-black/[0.1] text-[#1d1d1f] text-xs font-semibold shadow-2xs hover:border-black/25 transition-all cursor-pointer"
                  >
                    Request Project Quote
                  </button>
                )}
              </div>

            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-lg aspect-4/3 relative group">
                <img
                  src={pillars[activePillar].image}
                  alt={pillars[activePillar].title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono font-medium shadow-md">
                  WHITEROCK SPECIFIED
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
