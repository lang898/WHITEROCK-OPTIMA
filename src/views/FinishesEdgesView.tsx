import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surface & Edge Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Surface Finishes & Precision Edge Profiles
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          From high-gloss polished surfaces to tactile leathered finishes and mitered waterfall drops, our automated edge-profiling lines and CNC machines execute consistent profiles on standard 2cm, 3cm, and laminated 4cm stone assemblies.
        </p>
      </div>

      {/* Part 1: Surface Finishes */}
      <section className="space-y-8">
        <div className="border-b border-stone-800 pb-4">
          <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>Surface Finishes</span>
            <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-400 font-normal">
              3 Primary Types
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Surface treatments calibrated for light reflectivity, slip resistance, and stone character.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {finishes.map((f) => (
            <div
              key={f.slug}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden group flex flex-col hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23292524"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="18">${f.name}</text></svg>`;
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-sm text-xs font-bold text-white border border-stone-700">
                  {f.name} Finish
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {f.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Recommended Applications:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-1">
                    {f.recommendedFor.map((rec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
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

      {/* Part 2: Edge Profiles */}
      <section className="space-y-8">
        <div className="border-b border-stone-800 pb-4">
          <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>Precision Edge Profiles</span>
            <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-400 font-normal">
              6 Standard Profiles
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Fabricated with diamond-tipped router wheels and automated multi-head edge polishers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {edges.map((edge) => (
            <div
              key={edge.slug}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden group flex flex-col hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
                <img
                  src={edge.image}
                  alt={edge.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23292524"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="18">${edge.name}</text></svg>`;
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-sm text-xs font-bold text-amber-400 border border-stone-700 font-mono">
                  {edge.name}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-white">
                    {edge.name} Edge
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {edge.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span>CNC Tolerance: <strong>±0.5 mm</strong></span>
                  <span className="text-amber-400 font-medium">Standard / Mitered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-section Lamination Note */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-white font-serif">
              Custom Lamination & 4cm / 6cm Built-Up Fascia Drops
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We provide precision 45-degree mitered apron returns, matching vein alignments for waterfall drops on kitchen islands, and structural plywood backing substrate where required for North American commercial code compliance.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentTab('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Request custom shop drawing consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
