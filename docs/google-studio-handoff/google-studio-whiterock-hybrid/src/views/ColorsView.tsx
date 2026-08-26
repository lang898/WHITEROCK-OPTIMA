import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Package,
  Check,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { colors } from '../data';
import type { ColorItem, LocaleConfig } from '../types';

interface ColorsViewProps {
  onSelectColor: (color: ColorItem) => void;
  onAddColorSample: (color: ColorItem) => void;
  currentLocale: LocaleConfig;
}

export const ColorsView: React.FC<ColorsViewProps> = ({
  onSelectColor,
  onAddColorSample,
  currentLocale,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const materials = ['All', 'Quartz', 'Marble', 'Granite', 'Engineered Marble'];
  const families = ['All', 'White', 'Grey', 'Black', 'Beige', 'Green'];

  const filteredColors = colors.filter((c) => {
    const matchesMat = selectedMaterial === 'All' || c.material === selectedMaterial;
    const matchesFam = selectedFamily === 'All' || c.colorFamily === selectedFamily;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.colorFamily.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.material.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMat && matchesFam && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Header Banner (Apple Display + Keynote Style) */}
      <div className="space-y-4 max-w-4xl">
        <div className="wr-panel-eyebrow">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span className="tech-badge">24-COLOR CURATED ARCHITECTURAL PALETTE • VIETNAM FABRICATION</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[#1d1d1f]">
          Engineered Quartz & Natural Stone Palette.
        </h1>
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl font-normal">
          Calibrated for consistent veining, stable batch tones, high stain resistance, and reliable bulk container export to North American hospitality and multi-family programs.
        </p>

        {/* Industrial Highlights */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <span className="wr-info-pill">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="tech-badge">Batch Tone Delta E &lt; 0.8 Color Calibrated</span>
          </span>
          <span className="wr-info-pill">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="tech-badge">Jumbo Slab Size 3200 x 1600mm Available</span>
          </span>
        </div>
      </div>

      {/* Filter Matrix & Search Bar */}
      <div className="apple-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          {/* Material Filters */}
          <div className="space-y-2">
            <span className="tech-badge text-[#86868b] block">
              STONE CATEGORY
            </span>
            <div className="flex flex-wrap gap-1.5">
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaterial(m)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedMaterial === m
                      ? 'bg-[#111113] text-white shadow-xs font-semibold'
                      : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Color Family Filters */}
          <div className="space-y-2">
            <span className="tech-badge text-[#86868b] block">
              COLOR FAMILY
            </span>
            <div className="flex flex-wrap gap-1.5">
              {families.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFamily(f)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedFamily === f
                      ? 'bg-[#111113] text-white shadow-xs font-semibold'
                      : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-72 self-end">
            <div className="relative">
              <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stone colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-black/30 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stone Swatch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredColors.map((color) => (
          <div
            key={color.slug}
            className="apple-card overflow-hidden flex flex-col justify-between group cursor-pointer"
            onClick={() => onSelectColor(color)}
          >
            {/* Visual Swatch */}
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <img
                src={color.swatchImage}
                alt={color.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f5f5f7"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2386868b" font-family="sans-serif" font-weight="bold" font-size="18">${color.name}</text></svg>`;
                }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#1d1d1f] shadow-xs">
                {color.material}
              </div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-medium text-white">
                {color.colorFamily}
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#1d1d1f] group-hover:text-amber-900 transition-colors">
                  {color.name}
                </h3>
                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
                  {color.description}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[#1d1d1f] pt-3 border-t border-black/[0.06]">
                <div className="flex justify-between text-[11px] text-[#86868b]">
                  <span>Finish:</span>
                  <strong className="text-[#1d1d1f]">Polished / Honed</strong>
                </div>
                <div className="flex justify-between text-[11px] text-[#86868b]">
                  <span>Slab Thickness:</span>
                  <strong className="text-[#1d1d1f]">2cm (3/4") / 3cm (1-1/4")</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddColorSample(color);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#111113] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Request 4x4" Sample</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <div className="p-16 text-center apple-card space-y-3">
          <p className="text-[#86868b] font-medium text-sm">No stone colors match your current filter.</p>
          <button
            onClick={() => {
              setSelectedMaterial('All');
              setSelectedFamily('All');
              setSearchQuery('');
            }}
            className="text-xs text-[#111113] font-semibold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
