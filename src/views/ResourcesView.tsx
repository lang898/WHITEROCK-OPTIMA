import React from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { resources } from '../data';
import type { LocaleConfig } from '../types';

interface ResourcesViewProps {
  currentLocale: LocaleConfig;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ currentLocale }) => {
  const handleDownloadMock = (title: string, file: string) => {
    alert(`Initiating download for "${title}" (${file})... In production, this opens the official PDF document.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Technical & Compliance Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Product Documentation, Care Guides & Safety Compliance
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Download technical data sheets, stone care manuals, factory warranties, crystalline silica safety protocols, and California Proposition 65 regulatory disclosures.
        </p>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-sm group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-stone-950 text-amber-400 text-[10px] font-mono border border-stone-800">
                  {res.category}
                </span>
                <FileText className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="font-bold text-base text-white">
                {res.title}
              </h3>

              <p className="text-xs text-stone-400 leading-relaxed">
                {res.description}
              </p>
            </div>

            <button
              onClick={() => handleDownloadMock(res.title, res.file)}
              className="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-amber-600 hover:text-stone-950 text-stone-300 border border-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Document</span>
            </button>
          </div>
        ))}
      </div>

      {/* Regulatory & Safety Notice Box */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-white font-serif">
              Crystalline Silica Health & Safety Statement
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Engineered quartz and natural stones contain crystalline silica (SiO₂). WHITEROCK mandates continuous water-suppression wet-cutting, automated dust extraction, and OSHA/EU-compliant PPE for all cutting, profiling, and polishing operations at our manufacturing facilities.
            </p>
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 text-xs text-stone-400 space-y-2">
              <div className="font-semibold text-stone-200">
                California Proposition 65 Disclosure:
              </div>
              <p>
                WARNING: Cutting, grinding, and polishing stone products can generate airborne particles of respirable crystalline silica, known to the State of California to cause cancer and birth defects or other reproductive harm. Always use wet fabrication methods and certified NIOSH respirators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
