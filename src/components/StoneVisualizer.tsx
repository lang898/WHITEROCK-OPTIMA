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
  Camera
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
  nameZh: string;
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
  const [cabinetColor, setCabinetColor] = useState<'warm-oak' | 'matte-black' | 'charcoal' | 'walnut'>('warm-oak');
  const [surfaceFinish, setSurfaceFinish] = useState<'polished' | 'honed'>('polished');
  const [isCopied, setIsCopied] = useState(false);

  const rooms: RoomScene[] = [
    {
      id: 'vanity',
      name: 'Bathroom Vanity Top',
      nameZh: '浴室台面与下沉盆',
      category: 'Bathroom',
      defaultSize: '49" x 22" x 2cm',
      description: 'Standard 49" single/double sink bathroom vanity with undermount vitreous china basin & 4" backsplash.',
      baseImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'kitchen',
      name: 'Gourmet Kitchen Island',
      nameZh: '开放式厨房岛台',
      category: 'Kitchen',
      defaultSize: '108" x 42" x 3cm (Mitered 4cm Waterfall)',
      description: 'Large-format kitchen island countertop featuring bookmatched waterfall returns and seamless sink integration.',
      baseImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'table',
      name: 'Round Marble Table Top',
      nameZh: '轻奢圆形天然大理石台面',
      category: 'Furniture',
      defaultSize: 'Dia. 42" x 2cm Beveled',
      description: 'Sculptural stone tabletop suitable for luxury hospitality dining, cafes, and residential living spaces.',
      baseImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'bar',
      name: 'Commercial Reception / Bar',
      nameZh: '酒店商业吧台与前台',
      category: 'Commercial',
      defaultSize: 'Custom Project Length',
      description: 'Backlit or polished stone surface engineered for heavy commercial and hospitality traffic.',
      baseImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Visualizer stone palette (curated top materials)
  const popularColors: {
    slug: string;
    name: string;
    material: string;
    tone: string;
    cssTexture: string;
    image: string;
    desc: string;
  }[] = [
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

  const edgeProfiles: {
    slug: string;
    name: string;
    spec: string;
    recommended: string;
  }[] = [
    { slug: 'eased', name: 'Eased Edge (Flat Polished)', spec: '2cm / 3cm', recommended: 'Modern clean lines, #1 best-seller' },
    { slug: 'bevel', name: '1/4" Bevel Edge', spec: '2cm / 3cm', recommended: 'Crisp highlight, prevents chipping' },
    { slug: 'bullnose', name: 'Full Bullnose', spec: '2cm / 3cm', recommended: 'Smooth radius, traditional homes' },
    { slug: 'mitered', name: 'Mitered Waterfall (4cm-8cm)', spec: '40-80mm built-up', recommended: 'Luxury thick slab illusion, kitchen islands' },
    { slug: 'ogee', name: 'Classic Ogee Profile', spec: '2cm / 3cm', recommended: 'Decorative elegance for luxury bathrooms' }
  ];

  const activeColor = popularColors.find((c) => c.slug === selectedColorSlug) || popularColors[0];
  const activeRoom = rooms.find((r) => r.id === selectedRoom) || rooms[0];
  const activeEdge = edgeProfiles.find((e) => e.slug === selectedEdgeSlug) || edgeProfiles[0];

  const handleExportSpec = () => {
    const specSummary = `
========================================
WHITEROCK & OPTIMA STONE FABRICATION SPEC
========================================
Project / Room: ${activeRoom.name} (${activeRoom.defaultSize})
Stone Surface: ${activeColor.name} (${activeColor.material})
Finish: ${surfaceFinish.toUpperCase()}
Edge Profile: ${activeEdge.name} (${activeEdge.spec})
Sink Cutout: ${selectedSink.replace('-', ' ').toUpperCase()}
Backsplash: ${selectedBacksplash.toUpperCase()}
Cabinet Finish: ${cabinetColor.toUpperCase()}
Factory Routing: Vietnam Binh Phuoc Base (0% US Tariff) or China Yunfu Base
Quality Standard: AQL 1.0 Inspection, ±0.3mm CNC Tolerance
========================================
`;
    navigator.clipboard.writeText(specSummary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 p-6 sm:p-8 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Stone Studio • Real-Time Countertop & Vanity Visualizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Live Stone & Fabrication Visualizer (石材空间与工艺模拟器)
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            Simulate your project in real-time. Test luxury quartz & marble materials, custom edge details, undermount sink cutouts, and export-ready specifications.
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 shrink-0">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRoom === room.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
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
        <div className="lg:col-span-7 p-6 sm:p-8 bg-stone-950 flex flex-col justify-between space-y-6 relative">
          {/* Main Visual Stage */}
          <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden border-2 border-stone-800 bg-stone-900 shadow-2xl group">
            {/* Background Room Photography */}
            <img
              src={activeColor.image || activeRoom.baseImage}
              alt={`${activeColor.name} in ${activeRoom.name}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />

            {/* Simulated Stone Surface Overlay & Lighting FX */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Real-time Config Floating HUD Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-700/80 shadow-xl space-y-1 text-xs max-w-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-serif font-bold text-white text-sm">{activeColor.name}</span>
              </div>
              <div className="text-[11px] text-stone-300 flex items-center gap-2">
                <span className="bg-stone-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">{activeEdge.name.split(' ')[0]}</span>
                <span>•</span>
                <span>{surfaceFinish === 'polished' ? 'High Mirror Polish (85+ GU)' : 'Honed Matte Silk'}</span>
              </div>
              <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-800">
                {activeRoom.defaultSize} • 0% US Section 301 Tariff Route
              </div>
            </div>

            {/* Floating Edge Profile Callout */}
            <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-700 text-right space-y-0.5 text-xs">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Active Edge Detail</span>
              <strong className="text-amber-400 font-mono">{activeEdge.name}</strong>
              <span className="text-[10px] text-stone-300 block">{activeEdge.spec}</span>
            </div>
          </div>

          {/* Quick Real-Time Stone Swatch Picker Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Stone Material ({popularColors.length} Featured Slabs):</span>
              </span>
              <span className="text-amber-400 font-mono text-[11px]">{activeColor.material}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {popularColors.map((color) => {
                const isSelected = selectedColorSlug === color.slug;
                return (
                  <button
                    key={color.slug}
                    onClick={() => setSelectedColorSlug(color.slug)}
                    className={`relative rounded-xl overflow-hidden p-1.5 border-2 transition-all cursor-pointer flex flex-col items-center text-center group ${
                      isSelected
                        ? 'border-amber-400 bg-stone-900 shadow-md scale-102'
                        : 'border-stone-800 bg-stone-950 hover:border-stone-700'
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-lg mb-1.5 shadow-inner border border-stone-700/50"
                      style={{ background: color.cssTexture }}
                    />
                    <span className="text-[11px] font-semibold text-stone-200 truncate w-full group-hover:text-amber-300">
                      {color.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-stone-400 truncate w-full">{color.tone}</span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow">
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
        <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-900/90 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>Fabrication Engineering Parameters</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono">CNC Machined</span>
            </div>

            {/* 1. Edge Profile Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 flex justify-between">
                <span>Edge Profile (边型工艺):</span>
                <span className="text-amber-400 font-mono text-[11px]">{activeEdge.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {edgeProfiles.map((edge) => (
                  <button
                    key={edge.slug}
                    onClick={() => setSelectedEdgeSlug(edge.slug)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                      selectedEdgeSlug === edge.slug
                        ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="font-bold text-stone-100">{edge.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-stone-400">{edge.spec}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Surface Finish */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300">
                Surface Polish & Texture (表面光度):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSurfaceFinish('polished')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    surfaceFinish === 'polished'
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  ✨ High Polish (85+ GU Mirror)
                </button>
                <button
                  onClick={() => setSurfaceFinish('honed')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    surfaceFinish === 'honed'
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  🌿 Honed Matte / Silk Touch
                </button>
              </div>
            </div>

            {/* 3. Sink & Cutout Options (if vanity/kitchen) */}
            {selectedRoom !== 'table' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-300">
                  Sink Basin Integration (下沉盆与开口工艺):
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedSink('undermount-rect')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedSink === 'undermount-rect'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    Rectangular Undermount
                  </button>
                  <button
                    onClick={() => setSelectedSink('undermount-oval')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedSink === 'undermount-oval'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    Classic Oval Basin
                  </button>
                  <button
                    onClick={() => setSelectedSink('double-rect')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedSink === 'double-rect'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    Double Sink Basin (61"+)
                  </button>
                  <button
                    onClick={() => setSelectedSink('integrated')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedSink === 'integrated'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950 text-stone-400'
                    }`}
                  >
                    Integral Ramp Stone Sink
                  </button>
                </div>
              </div>
            )}

            {/* 4. Live Spec Summary Card */}
            <div className="bg-stone-950 rounded-2xl p-4 border border-stone-800 space-y-2 text-xs">
              <div className="font-bold text-amber-400 flex items-center justify-between">
                <span>Configured Order Specification:</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Ready for B2B RFQ
                </span>
              </div>
              <div className="space-y-1 text-stone-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Material / Color:</span>
                  <span className="font-medium text-white">{activeColor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Edge & Finish:</span>
                  <span className="font-medium text-white">{activeEdge.name} • {surfaceFinish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Export Packaging:</span>
                  <span className="text-stone-300">Fumigated Plywood Crate / A-Frame</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleExportSpec}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-950/40"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Specification Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Spec Sheet & Add to Quotation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
