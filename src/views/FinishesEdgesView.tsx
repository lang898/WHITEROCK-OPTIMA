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
  Check
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
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
    },
    {
      slug: 'ogee',
      name: 'Classic Ogee & Dupont Profile',
      category: 'luxury',
      thickness: '2cm / 3cm',
      radius: 'S-Shaped Roman Curve',
      bestFor: 'Luxury Hotel Suites, Premium Residential Vanities, Fireplaces',
      features: 'Intricate classical shadow line, fabricated on automated KETE multi-spindle profiling lines.',
      cadDrawing: 'M 10 10 L 60 10 Q 75 10 75 25 Q 75 40 90 50 L 90 90 L 10 90 Z',
      image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredEdges = comprehensiveEdges.filter((e) => {
    if (selectedEdgeTab === 'standard') return e.category === 'standard';
    if (selectedEdgeTab === 'mitered') return e.category === 'mitered';
    if (selectedEdgeTab === 'luxury') return e.category === 'luxury';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surface Treatments & Precision CNC Edge Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Architectural Surface Finishes & CNC Edge Details
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          From 85+ GU mirror-polished quartz to tactile honed silk finishes and 45° mitered waterfall returns, our automated Hongda and YEXIANG edge-profiling lines deliver ±0.3mm tolerance across standard 2cm, 3cm, and laminated 4cm stone assemblies.
        </p>
      </div>

      {/* Part 1: Surface Polish & Textures */}
      <section className="space-y-8">
        <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <span>Surface Texture & Gloss Grades</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Calibrated for light reflectivity, stain resistance, and tactile sophistication.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {finishes.map((f) => (
            <div
              key={f.slug}
              className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden group flex flex-col hover:border-amber-500/40 transition-all shadow-lg"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-stone-950/85 backdrop-blur-sm text-xs font-bold text-amber-400 border border-stone-700">
                  {f.name} Surface
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {f.name} Finish
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Ideal Program Applications:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-1">
                    {f.recommendedFor.map((rec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
      <section className="space-y-8 bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Multi-Spindle CNC Routered Profiles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Precision Edge Profile Directory & Cross-Sections
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Automated continuous line polishing ensuring uniform specular gloss across the entire perimeter.
            </p>
          </div>

          {/* Edge Filter Tabs */}
          <div className="flex gap-2 bg-stone-950 p-1 rounded-2xl border border-stone-800 shrink-0 text-xs">
            <button
              onClick={() => setSelectedEdgeTab('standard')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedEdgeTab === 'standard'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Standard Profiles (Eased / Bevel / Bullnose)
            </button>
            <button
              onClick={() => setSelectedEdgeTab('mitered')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedEdgeTab === 'mitered'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Mitered & Waterfall (4cm-8cm)
            </button>
            <button
              onClick={() => setSelectedEdgeTab('luxury')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedEdgeTab === 'luxury'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Classical Luxury (Ogee / Dupont)
            </button>
          </div>
        </div>

        {/* Edge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEdges.map((edge) => (
            <div
              key={edge.slug}
              className="bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden group flex flex-col hover:border-amber-500/50 transition-all shadow-md"
            >
              {/* Photo Preview Stage */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src={edge.image}
                  alt={edge.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700 font-mono">
                  {edge.name.split(' ')[0]}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-stone-900/90 text-[10px] text-stone-300 border border-stone-800 font-mono">
                  {edge.thickness}
                </div>
              </div>

              {/* Edge Technical Data */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {edge.name}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {edge.features}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-stone-800 text-xs text-stone-300">
                  <div className="flex justify-between text-stone-400">
                    <span>Radius / Chamfer:</span>
                    <strong className="text-amber-400 font-mono">{edge.radius}</strong>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Best-Fit Program:</span>
                    <span className="text-stone-200 text-right truncate max-w-[65%]">{edge.bestFor}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>CNC Tolerance:</span>
                    <span className="text-emerald-400 font-mono font-semibold">±0.3 mm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 3: SINK CUTOUT & BASIN ASSEMBLY ENGINEERING */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Wrench className="w-4 h-4" />
            <span>Undermount Sink Assembly Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Pre-Assembled Ceramic Basins & CNC Cutouts
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Eliminate on-site job installation labor. We offer factory-preassembled undermount vitreous china basins glued with high-modulus structural epoxy and reinforced with mechanical steel anchors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-stone-100 text-sm">CNC Waterjet Cutout & Polishing</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Standard 1/4" negative or flush reveal cutouts executed with waterjet CNCs and multi-step inner edge polishing.
            </p>
          </div>

          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-stone-100 text-sm">Dual Structural Fastening</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Heavy-duty brass inserts, stainless steel sink clips, and continuous anti-fungal waterproof silicone gasket bead.
            </p>
          </div>

          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-stone-100 text-sm">100% Load & Pull Testing</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Each pre-glued vanity top undergoes factory drop and load tests to ensure zero detachment during trans-Pacific shipping.
            </p>
          </div>
        </div>
      </section>

      {/* Part 4: EXPORT CRATE & A-FRAME PACKAGING SPECIFICATIONS */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Zero-Breakage Export Packaging
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">
              Fumigated Plywood Crating & A-Frame Protection
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/20">
            ISPM-15 COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-300 leading-relaxed">
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
            <h4 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" />
              <span>Multi-Family Project Crates (Vanity Tops & Backsplashes)</span>
            </h4>
            <p className="text-stone-400">
              Each piece is individually wrapped in high-density EPE foam with reinforced plastic corner guards. Packed vertically inside solid fumigated export crates with internal timber dividers to eliminate rubbing.
            </p>
            <div className="pt-2 text-[11px] text-amber-300 font-mono">
              ✓ Floor-by-floor unit number tagging available for multi-family job sites.
            </div>
          </div>

          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
            <h4 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>E-Commerce / Home Improvement Retail Box Drop-Test</span>
            </h4>
            <p className="text-stone-400">
              Individual 5-ply honeycomb carton packaging with molded foam shells, ISTA-1A drop-test certified for direct-to-consumer and jobsite delivery without uncrating.
            </p>
            <div className="pt-2 text-[11px] text-emerald-300 font-mono">
              ✓ Drop-tested from 36 inches with 0% micro-crack tolerance.
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentTab('contact')}
            className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Request Edge Samples or Technical Shop Drawing Assistance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
