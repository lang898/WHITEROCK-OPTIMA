import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { applications, colors } from '../data';
import type { ApplicationItem, ColorItem, LocaleConfig } from '../types';

interface ApplicationsViewProps {
  onSelectColor: (color: ColorItem) => void;
  currentLocale: LocaleConfig;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  onSelectColor,
  currentLocale,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Kitchen', 'Bathroom', 'Hospitality', 'Multi-family', 'Restaurant', 'Outdoor'];

  const filteredApps = applications.filter((app) => {
    if (selectedCat === 'All') return true;
    return app.category.toLowerCase().includes(selectedCat.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Application Inspiration & Project Studies</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Stone In Space: Commercial & Residential Applications
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Explore illustrative and installed scenes demonstrating stone surface color pairings, waterfall island details, backsplashes, and hospitality bathroom vanity programs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-stone-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCat === cat
                ? 'bg-amber-600 text-stone-950 shadow-sm'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((item, idx) => {
          const matchedColor = colors.find((c) => c.slug === item.featuredColorSlug);

          return (
            <div
              key={idx}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden group flex flex-col hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375" viewBox="0 0 500 375"><rect width="500" height="375" fill="%23292524"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="18">${item.title}</text></svg>`;
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700 uppercase">
                  {item.category}
                </div>
                {item.caption && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] text-stone-400">
                    {item.caption}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <span>Featured Stone:</span>
                    <strong className="text-stone-200">{item.featuredColor}</strong>
                  </div>

                  {matchedColor && (
                    <button
                      onClick={() => onSelectColor(matchedColor)}
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold text-xs"
                    >
                      <span>View Swatch</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
