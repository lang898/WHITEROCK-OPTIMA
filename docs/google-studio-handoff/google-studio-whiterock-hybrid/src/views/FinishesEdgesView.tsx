import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Package,
  Wrench,
  Sliders,
  Maximize2,
  Box,
  Eye,
  Check,
  Ruler,
  Compass
} from 'lucide-react';
import { finishes, edges } from '../data';
import type { LocaleConfig } from '../types';

interface FinishesEdgesViewProps {
  setCurrentTab: (tab: string) => void;
  currentLocale: LocaleConfig;
}

export const FinishesEdgesView: React.FC<FinishesEdgesViewProps> = ({
  setCurrentTab,
  currentLocale,
}) => {
  const [selectedEdgeTab, setSelectedEdgeTab] = useState<'standard' | 'luxury' | 'mitered'>('standard');

  const comprehensiveEdges = [
    {
      slug: 'eased',
      name: 'Eased Edge (Flat Polished with Micro-Bevel)',
      category: 'standard',
      thickness: '2cm (3/4") / 3cm (1-1/4")',
      radius: 'R2-R3mm Top & Bottom',
      bestFor: 'Modern Apartments, Multi-Family Kitchens, Hotel Bathrooms (#1 North American Spec)',
      features: 'Sleek geometric line, easy to clean, highly chip-resistant.',
      cadDrawing: 'M 10 10 L 80 10 Q 90 10 90 20 L 90 90 L 10 90 Z',
      image: '/assets/owner/vietnam/factory-02.jpg'
    },
    {
      slug: 'bevel',
      name: '1/4" & 1/2" Bevel Edge',
      category: 'standard',
      thickness: '2cm / 3cm',
      radius: '45° Chamfer (6mm / 12mm)',
      bestFor: 'Transitional Vanity Tops, Contemporary Island Bars',
      features: 'Crisp light reflection, prevents edge chipping during daily usage.',
      cadDrawing: 'M 10 10 L 75 10 L 90 25 L 90 90 L 10 90 Z',
      image: '/assets/owner/vietnam/factory-06.jpg'
    },
    {
      slug: 'bullnose',
      name: 'Full Bullnose & Half Bullnose',
      category: 'standard',
      thickness: '2cm / 3cm',
      radius: 'Full Semi-Circular Radius',
      bestFor: 'Traditional Bathrooms, High-Traffic Hospitality Counters',
      features: 'Ultra-smooth tactile feel, child-safe radius, timeless aesthetics.',
      cadDrawing: 'M 10 10 L 50 10 Q 90 50 50 90 L 10 90 Z',
      image: '/assets/owner/vietnam/factory-05.jpg'
    },
    {
      slug: 'mitered',
      name: '40mm - 80mm Mitered Laminated Edge',
      category: 'mitered',
      thickness: '4cm to 10cm Built-Up Apron',
      radius: '45° Precision CNC Joint',
      bestFor: 'Luxury Kitchen Islands, Executive Vanity Tops, Commercial Bars',
      features: 'Creates the imposing appearance of an ultra-thick monolithic stone slab with continuous vein matching.',
      cadDrawing: 'M 10 10 L 90 10 L 90 90 L 70 90 L 70 30 L 10 30 Z',
      image: '/assets/owner/vietnam/factory-04.jpg'
    },
    {
      slug: 'waterfall',
      name: 'Bookmatched Waterfall Edge Return',
      category: 'mitered',
      thickness: '2cm / 3cm / 4cm Mitered',
      radius: '90° Continuous Drop to Floor',
      bestFor: 'Gourmet Kitchen Islands, Modern Office Reception Desks',
      features: 'Seamless floor-to-countertop stone flow with CNC vein tracking.',
      cadDrawing: 'M 10 10 L 90 10 L 90 150 L 70 150 L 70 30 L 10 30 Z',
      image: '/assets/owner/vietnam/factory-06.jpg'
    },
    {
      slug: 'ogee',
      name: 'Classic Ogee & Dupont Profile',
      category: 'luxury',
      thickness: '2cm / 3cm',
      radius: 'S-Shaped Roman Curve',
      bestFor: 'Luxury Hotel Suites, Premium Residential Vanities, Fireplaces',
      features: 'Intricate classical shadow line, fabricated on automated multi-spindle profiling lines.',
      cadDrawing: 'M 10 10 L 60 10 Q 75 10 75 25 Q 75 40 90 50 L 90 90 L 10 90 Z',
      image: '/assets/owner/vietnam/factory-06.jpg'
    }
  ];

  const filteredEdges = comprehensiveEdges.filter((e) => {
    if (selectedEdgeTab === 'standard') return e.category === 'standard';
    if (selectedEdgeTab === 'mitered') return e.category === 'mitered';
    if (selectedEdgeTab === 'luxury') return e.category === 'luxury';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
      {/* Header Banner (Apple Style Display + Industrial Engineering) */}
      <div className="space-y-4 max-w-4xl">
        <div className="wr-panel-eyebrow">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="tech-badge">SURFACE AND EDGE REFERENCE LIBRARY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[#1d1d1f]">
          Surface Finishes & CNC Edge Details.
        </h1>
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl font-normal">
          Compare polished, honed, and textured surfaces with common edge profiles. Final finish, thickness, dimensions, and acceptance limits are confirmed by sample and approved drawing.
        </p>
      </div>

      {/* Part 1: Surface Polish & Textures */}
      <section className="space-y-8">
        <div className="border-b border-black/[0.06] pb-4 flex items-center justify-between">
          <div>
            <div className="tech-badge text-[#86868b] mb-1">SPECULAR GLOSS & TEXTURE CALIBRATION</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Surface Texture & Gloss Grades
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finishes.map((f) => (
            <div
              key={f.slug}
              className="wr-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={f.image}
                  alt={f.name}
                  width={720}
                  height={540}
                  loading="lazy"
                  className="wr-media-zoom"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/assets/owner/vietnam/factory-02.jpg';
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#1d1d1f] shadow-xs">
                  {f.name} Surface
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-[#1d1d1f]">
                    {f.name} Finish
                  </h3>
                  <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-black/[0.06]">
                  <span className="tech-badge text-[#86868b] block">
                    RECOMMENDED APPLICATIONS:
                  </span>
                  <ul className="text-xs text-[#1d1d1f] space-y-2">
                    {f.recommendedFor.map((rec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Comprehensive Architectural Edge Profiles */}
      <section className="space-y-8 wr-card p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
          <div className="space-y-1">
            <div className="tech-badge text-[#86868b]">
              CNC LINEAR PROFILING MATRIX
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Precision Edge Profile Directory
            </h2>
            <p className="text-xs text-[#86868b]">
              Automated continuous line polishing ensuring uniform specular gloss across the perimeter.
            </p>
          </div>

          {/* Segment Selector */}
          <div className="flex gap-1.5 p-1 rounded-full bg-[#f5f5f7] border border-black/[0.06]">
            {[
              { id: 'standard', label: 'Standard Edges' },
              { id: 'mitered', label: 'Mitered & Waterfall' },
              { id: 'luxury', label: 'Classic Profiles' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedEdgeTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedEdgeTab === tab.id
                    ? 'bg-[#111113] text-white shadow-xs font-semibold'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Edge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredEdges.map((edge) => (
            <div
              key={edge.slug}
              className="bg-[#fbfbfd] border border-black/[0.06] rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-black/20 hover:bg-white transition-all shadow-xs"
            >
              <div className="space-y-4">
                <div className="aspect-16/10 rounded-2xl overflow-hidden bg-white border border-black/[0.06] relative">
                  <img
                    src={edge.image}
                    alt={edge.name}
                    width={720}
                    height={540}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#1d1d1f]">
                    {edge.thickness}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#1d1d1f]">
                    {edge.name}
                  </h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    {edge.features}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-black/[0.06] text-xs text-[#1d1d1f]">
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Radius / Chamfer:</span>
                  <strong className="font-mono">{edge.radius}</strong>
                </div>
                <div className="space-y-0.5">
                  <span className="tech-badge text-[#86868b]">RECOMMENDED APPLICATION:</span>
                  <p className="text-[11px] text-[#1d1d1f] font-medium leading-snug">{edge.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 3: Buyer-approved sink integration options */}
      <section className="wr-card wr-card--dark p-10 sm:p-14 text-white space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="tech-badge text-amber-300">
              FACTORY ASSEMBLY INTEGRATION
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Buyer-Approved Sink Cutout & Assembly Options
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
              Sink cutouts and optional factory assembly can be quoted against the exact buyer-approved sink model, mounting method, faucet layout, and documentation requirements.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('contact')}
            className="px-8 py-4 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-xs transition-all shadow-md cursor-pointer shrink-0"
          >
            Request Vanity Top Sample Kit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-xs">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <strong className="tech-badge text-amber-300 block">MODEL-SPECIFIC DOCUMENTS</strong>
            <p className="text-[#a1a1a6]">Any required certification must be supported for the exact sink selected.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <strong className="tech-badge text-amber-300 block">4" OR 8" FAUCET SPREADS</strong>
            <p className="text-[#a1a1a6]">Single-hole, centerset, or widespread layouts follow the approved template.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <strong className="tech-badge text-amber-300 block">AGREED PACKING PLAN</strong>
            <p className="text-[#a1a1a6]">Protection and crate details are confirmed for the selected product and route.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
