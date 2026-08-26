import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Maximize2,
  Check,
  RotateCcw,
  Download,
  Plus,
  ArrowRight,
  Info,
  Sliders,
  CheckCircle2,
  Box,
  Eye,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { colors, edges, products } from '../data';
import type { ColorItem, EdgeItem, LocaleConfig } from '../types';

interface StoneVisualizerProps {
  currentLocale?: LocaleConfig;
  onAddToCart?: (config: any) => void;
  onRequestSample?: (color: ColorItem) => void;
  initialRoom?: 'vanity' | 'kitchen' | 'table';
}

interface RoomScene {
  id: 'vanity' | 'kitchen' | 'table' | 'bar';
  name: string;
  category: string;
  defaultSize: string;
  description: string;
  baseImage: string;
}

export const StoneVisualizer: React.FC<StoneVisualizerProps> = ({
  currentLocale,
  onAddToCart,
  onRequestSample,
  initialRoom = 'vanity',
}) => {
  const [selectedRoom, setSelectedRoom] = useState<'vanity' | 'kitchen' | 'table' | 'bar'>(initialRoom);
  const [selectedColorSlug, setSelectedColorSlug] = useState<string>('calacatta-crest');
  const [selectedEdgeSlug, setSelectedEdgeSlug] = useState<string>('eased');
  const [selectedSink, setSelectedSink] = useState<'undermount-rect' | 'undermount-oval' | 'double-rect' | 'integrated'>('undermount-rect');
  const [selectedBacksplash, setSelectedBacksplash] = useState<'4inch' | 'full' | 'none'>('4inch');
  const [surfaceFinish, setSurfaceFinish] = useState<'polished' | 'honed'>('polished');
  const [isCopied, setIsCopied] = useState(false);

  const rooms: RoomScene[] = [
    {
      id: 'vanity',
      name: 'Bathroom Vanity Top',
      category: 'Bathroom',
      defaultSize: '49" x 22" x 2cm',
      description: 'Standard 49" single/double sink bathroom vanity with undermount vitreous china basin & 4" backsplash.',
      baseImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'kitchen',
      name: 'Gourmet Kitchen Island',
      category: 'Kitchen',
      defaultSize: '108" x 42" x 3cm (Mitered 4cm Waterfall)',
      description: 'Large-format kitchen island countertop featuring bookmatched waterfall returns and seamless sink integration.',
      baseImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'table',
      name: 'Round Marble Table Top',
      category: 'Furniture',
      defaultSize: 'Dia. 42" x 2cm Beveled',
      description: 'Sculptural stone tabletop suitable for luxury hospitality dining, cafes, and residential living spaces.',
      baseImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'bar',
      name: 'Commercial Reception / Bar',
      category: 'Commercial',
      defaultSize: 'Custom Project Length',
      description: 'Backlit or polished stone surface engineered for heavy commercial and hospitality traffic.',
      baseImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Visualizer stone palette (curated top materials)
  const popularColors = [
    {
      slug: 'calacatta-crest',
      name: 'Calacatta Crest Quartz',
      material: 'Engineered Quartz',
      tone: 'White / Gold Vein',
      cssTexture: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 60%, #94a3b8 100%)',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      desc: 'Bright white matrix with warm honey and grey dramatic veining.'
    },
    {
      slug: 'alpine-carrara',
      name: 'Natural Carrara White',
      material: 'Natural Marble',
      tone: 'Cool White / Grey',
      cssTexture: 'linear-gradient(120deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      desc: 'Timeless Italian Carrara character with fine linear feathering.'
    },
    {
      slug: 'nero-marquina',
      name: 'Nero Marquina Black',
      material: 'Natural Marble',
      tone: 'Deep Black / White Vein',
      cssTexture: 'linear-gradient(145deg, #09090b 0%, #18181b 50%, #27272a 100%)',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
      desc: 'High-contrast Spanish black marble with bold lightning veins.'
    },
    {
      slug: 'dove-concrete',
      name: 'Dove Concrete Honed',
      material: 'Engineered Quartz',
      tone: 'Mid-Tone Warm Grey',
      cssTexture: 'linear-gradient(135deg, #78716c 0%, #57534e 50%, #44403c 100%)',
      image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=800&q=80',
      desc: 'Industrial matte texture with non-porous resistance.'
    },
    {
      slug: 'statuario-glory',
      name: 'Statuario Luxe Quartz',
      material: 'Engineered Quartz',
      tone: 'Pure White / Bold Grey',
      cssTexture: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 45%, #cbd5e1 75%, #64748b 100%)',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      desc: 'Iconic Italian Statuario aesthetic with bold branch veining.'
    },
    {
      slug: 'black-galaxy',
      name: 'Black Galaxy Granite',
      material: 'Natural Granite',
      tone: 'Jet Black / Golden Flakes',
      cssTexture: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      desc: 'Extremely durable granite with crystalline copper sparkles.'
    }
  ];

  const edgeProfiles = [
    { slug: 'eased', name: 'Eased Edge (Flat Polished)', spec: '2cm / 3cm' },
    { slug: 'bevel', name: '1/4" Bevel Edge', spec: '2cm / 3cm' },
    { slug: 'bullnose', name: 'Full Bullnose', spec: '2cm / 3cm' },
    { slug: 'mitered', name: 'Mitered Waterfall (4cm-8cm)', spec: '40-80mm built-up' },
    { slug: 'ogee', name: 'Classic Ogee Profile', spec: '2cm / 3cm' }
  ];

  const activeColor = popularColors.find((c) => c.slug === selectedColorSlug) || popularColors[0];
  const activeRoom = rooms.find((r) => r.id === selectedRoom) || rooms[0];
  const activeEdge = edgeProfiles.find((e) => e.slug === selectedEdgeSlug) || edgeProfiles[0];

  const handleExportSpec = () => {
    const specSummary = `
========================================
WHITEROCK SURFACES VIETNAM FABRICATION SPEC
========================================
Project / Room: ${activeRoom.name} (${activeRoom.defaultSize})
Stone Surface: ${activeColor.name} (${activeColor.material})
Finish: ${surfaceFinish.toUpperCase()}
Edge Profile: ${activeEdge.name} (${activeEdge.spec})
Sink Cutout: ${selectedSink.replace('-', ' ').toUpperCase()}
Backsplash: ${selectedBacksplash.toUpperCase()}
Manufacturing Plant: WHITEROCK Vietnam Dong Nai Plant (0% US Section 301 Tariff)
Quality Standard: AQL 1.5 Inspection, ±0.5mm CNC Tolerance
========================================
`;
    navigator.clipboard.writeText(specSummary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="apple-card overflow-hidden text-[#1d1d1f]">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 border-b border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#fbfbfd]">
        <div className="space-y-1.5">
          <div className="wr-panel-eyebrow wr-panel-eyebrow--compact">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="tech-badge">INTERACTIVE STONE STUDIO • REAL-TIME MATERIAL SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
            Live Stone & Fabrication Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl">
            Simulate your project in real-time. Test luxury quartz & marble materials, custom edge details, undermount sink cutouts, and export-ready specifications.
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 bg-[#f0f0f3] p-1.5 rounded-full border border-black/[0.06] shrink-0">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedRoom === room.id
                  ? 'bg-[#111113] text-white shadow-xs font-semibold'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <span>{room.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT / CENTER: Interactive Visualizer Stage (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#f5f5f7] flex flex-col justify-between space-y-6 relative border-b lg:border-b-0 lg:border-r border-black/[0.06]">
          {/* Main Visual Stage */}
          <div className="relative aspect-16/10 sm:aspect-16/9 rounded-3xl overflow-hidden border border-black/[0.06] bg-stone-200 shadow-xs group">
            {/* Background Room Photography */}
            <img
              src={activeColor.image || activeRoom.baseImage}
              alt={`${activeColor.name} in ${activeRoom.name}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />

            {/* Simulated Stone Surface Overlay & Lighting FX */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

            {/* Real-time Config Floating HUD Badge */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-md space-y-1 text-xs max-w-xs text-[#1d1d1f]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-bold text-[#1d1d1f] text-sm">{activeColor.name}</span>
              </div>
              <div className="text-[11px] text-[#6e6e73] flex items-center gap-2">
                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-mono font-bold">{activeEdge.name.split(' ')[0]}</span>
                <span>•</span>
                <span>{surfaceFinish === 'polished' ? 'High Polish (85+ GU)' : 'Honed Matte Silk'}</span>
              </div>
              <div className="text-[10px] text-[#86868b] pt-1 border-t border-black/[0.04]">
                {activeRoom.defaultSize} • 0% US Tariff Route
              </div>
            </div>

            {/* Floating Edge Profile Callout */}
            <div className="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-right space-y-0.5 text-xs text-white">
              <span className="text-[10px] text-[#a1a1a6] uppercase font-mono block">ACTIVE EDGE DETAIL</span>
              <strong className="text-amber-300 font-mono text-xs">{activeEdge.name}</strong>
              <span className="text-[10px] text-[#a1a1a6] block">{activeEdge.spec}</span>
            </div>
          </div>

          {/* Quick Real-Time Stone Swatch Picker Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>Select Stone Material ({popularColors.length} Curated Slabs):</span>
              </span>
              <span className="text-amber-800 font-mono text-[11px] font-bold">{activeColor.material}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {popularColors.map((color) => {
                const isSelected = selectedColorSlug === color.slug;
                return (
                  <button
                    key={color.slug}
                    onClick={() => setSelectedColorSlug(color.slug)}
                    className={`relative rounded-2xl overflow-hidden p-2 border-2 transition-all cursor-pointer flex flex-col items-center text-center group ${
                      isSelected
                        ? 'border-[#111113] bg-white shadow-xs scale-102'
                        : 'border-transparent bg-white hover:border-black/20'
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-xl mb-1.5 shadow-2xs border border-black/[0.06]"
                      style={{ background: color.cssTexture }}
                    />
                    <span className="text-[11px] font-bold text-[#1d1d1f] truncate w-full group-hover:text-amber-800">
                      {color.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-[#86868b] truncate w-full">{color.tone}</span>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#111113] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Configuration & Spec Generator (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <span className="tech-badge text-[#86868b] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>FABRICATION SPECIFICATIONS</span>
              </span>
              <span className="text-[11px] text-[#86868b] font-mono bg-[#f5f5f7] px-2.5 py-0.5 rounded-full border border-black/[0.05]">
                CNC Machined ±0.5mm
              </span>
            </div>

            {/* 1. Edge Profile Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1d1d1f] flex justify-between">
                <span>Edge Profile:</span>
                <span className="text-amber-800 font-mono text-[11px]">{activeEdge.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {edgeProfiles.map((edge) => (
                  <button
                    key={edge.slug}
                    onClick={() => setSelectedEdgeSlug(edge.slug)}
                    className={`p-3 rounded-2xl border text-left transition-all text-xs cursor-pointer ${
                      selectedEdgeSlug === edge.slug
                        ? 'border-transparent bg-[#111113] text-white font-semibold shadow-xs'
                        : 'border-black/[0.08] bg-[#fbfbfd] text-[#6e6e73] hover:border-black/20 hover:text-[#1d1d1f]'
                    }`}
                  >
                    <div className="font-bold">{edge.name.split(' ')[0]}</div>
                    <div className={`text-[10px] ${selectedEdgeSlug === edge.slug ? 'text-[#a1a1a6]' : 'text-[#86868b]'}`}>
                      {edge.spec}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Surface Finish */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1d1d1f]">
                Surface Polish & Texture:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSurfaceFinish('polished')}
                  className={`p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                    surfaceFinish === 'polished'
                      ? 'border-transparent bg-[#111113] text-white font-semibold shadow-xs'
                      : 'border-black/[0.08] bg-[#fbfbfd] text-[#6e6e73] hover:border-black/20 hover:text-[#1d1d1f]'
                  }`}
                >
                  ✨ High Polish (85+ GU)
                </button>
                <button
                  onClick={() => setSurfaceFinish('honed')}
                  className={`p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                    surfaceFinish === 'honed'
                      ? 'border-transparent bg-[#111113] text-white font-semibold shadow-xs'
                      : 'border-black/[0.08] bg-[#fbfbfd] text-[#6e6e73] hover:border-black/20 hover:text-[#1d1d1f]'
                  }`}
                >
                  🌿 Honed Matte Silk Touch
                </button>
              </div>
            </div>

            {/* 3. Sink & Cutout Options (if vanity/kitchen) */}
            {selectedRoom !== 'table' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1d1d1f]">
                  Sink Basin Integration & Cutout:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'undermount-rect', label: 'Rectangular Undermount' },
                    { id: 'undermount-oval', label: 'Classic Oval Basin' },
                    { id: 'double-rect', label: 'Double Sink (61"+)' },
                    { id: 'integrated', label: 'Integral Ramp Sink' }
                  ].map((sink) => (
                    <button
                      key={sink.id}
                      onClick={() => setSelectedSink(sink.id as any)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedSink === sink.id
                          ? 'border-transparent bg-[#111113] text-white font-semibold shadow-xs'
                          : 'border-black/[0.08] bg-[#fbfbfd] text-[#6e6e73] hover:border-black/20 hover:text-[#1d1d1f]'
                      }`}
                    >
                      {sink.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Live Spec Summary Card */}
            <div className="bg-[#f5f5f7] rounded-2xl p-4 border border-black/[0.05] space-y-2 text-xs">
              <div className="font-bold text-[#1d1d1f] flex items-center justify-between">
                <span>Configured Order Specification:</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold font-mono">
                  Ready for B2B RFQ
                </span>
              </div>
              <div className="space-y-1 text-[#6e6e73] text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Material / Color:</span>
                  <span className="font-bold text-[#1d1d1f]">{activeColor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Edge & Finish:</span>
                  <span className="font-bold text-[#1d1d1f]">{activeEdge.name} • {surfaceFinish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Export Packaging:</span>
                  <span className="text-[#1d1d1f]">Fumigated Solid Plywood Crate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleExportSpec}
              className="w-full py-4 rounded-full bg-[#111113] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Specification Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Spec Sheet & Copy Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
