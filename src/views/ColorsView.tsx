import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Package,
  Check,
  FileText
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>24 Standard Material Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Engineered Quartz & Natural Stone Color Matrix
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          From high-definition Calacatta marble-veined quartz to durable black galaxy granites and crystalline white composites, our materials are calibrated for repeatable batch fabrication and stable color tone across large container programs.
        </p>
      </div>

      {/* Filter Matrix & Search */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Material Filters */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Stone Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaterial(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedMaterial === m
                      ? 'bg-amber-600 text-stone-950 shadow-sm'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Color Family Filters */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Color Family
            </span>
            <div className="flex flex-wrap gap-1.5">
              {families.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFamily(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFamily === f
                      ? 'bg-stone-100 text-stone-950 shadow-sm'
                      : 'bg-stone-950 text-stone-400 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5 w-full md:w-64">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Quick Filter
            </span>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search color name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-1 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 24 colors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredColors.map((col) => (
          <div
            key={col.slug}
            className="swatch-card bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 group flex flex-col cursor-pointer shadow-sm"
            onClick={() => onSelectColor(col)}
          >
            {/* Visual Swatch */}
            <div className="relative aspect-square overflow-hidden bg-stone-950 shadow-inner">
              <img
                src={col.swatchImage}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23292524"/><circle cx="200" cy="200" r="140" fill="%2344403c"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="16" font-weight="bold">${col.name}</text></svg>`;
                }}
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-300 border border-stone-700">
                {col.material}
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] text-stone-300 border border-stone-700">
                {col.colorFamily}
              </div>
            </div>

            {/* Description & Finishes */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                <div className="flex flex-wrap gap-1">
                  {col.thicknesses.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-stone-950 text-amber-300 font-mono text-[10px] border border-stone-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-stone-500 font-mono">
                    {col.finishes.join(', ')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddColorSample(col);
                    }}
                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                  >
                    <Package className="w-3 h-3" />
                    <span>+ Sample</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <p className="text-stone-300 font-medium">No stone colors matched your search filters.</p>
          <button
            onClick={() => {
              setSelectedMaterial('All');
              setSelectedFamily('All');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 hover:underline"
          >
            Clear All Color Filters
          </button>
        </div>
      )}
    </div>
  );
};
