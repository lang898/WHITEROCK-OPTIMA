import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { resources } from '../data';
import { FaqSectionWithSchema } from '../components/FaqSectionWithSchema';
import type { LocaleConfig } from '../types';

interface ResourcesViewProps {
  currentLocale: LocaleConfig;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ currentLocale }) => {
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const handleDownloadMock = (title: string, file: string) => {
    setDownloadNotification(`Preparing PDF specification download: "${title}" (${file})...`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
      {/* Toast Notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121214] text-white px-5 py-3.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-3 text-xs animate-fade-in backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Header Banner (Unified Apple Display + Keynote Style) */}
      <div className="space-y-4 max-w-4xl">
        <div className="wr-panel-eyebrow">
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span className="tech-badge">TECHNICAL & COMPLIANCE CENTER • NORTH AMERICAN STANDARDS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[#1d1d1f]">
          Technical Documentation & Compliance.
        </h1>
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl font-normal">
          Download technical data sheets, stone care manuals, factory warranties, crystalline silica safety protocols, and California Proposition 65 regulatory disclosures.
        </p>

        {/* Industrial Specification Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <span className="wr-info-pill">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="tech-badge">Product Documents Require Verification</span>
          </span>
          <span className="wr-info-pill">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="tech-badge">Current Test Reports by Exact Product</span>
          </span>
        </div>
      </div>

      {/* Downloads Grid (Apple Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="wr-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="tech-badge text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {res.category}
                </span>
                <FileText className="w-4 h-4 text-[#86868b] group-hover:text-amber-700 transition-colors" />
              </div>

              <h3 className="font-bold text-lg text-[#1d1d1f] group-hover:text-amber-900 transition-colors">
                {res.title}
              </h3>

              <p className="text-xs text-[#86868b] leading-relaxed">
                {res.description}
              </p>
            </div>

            <button
              onClick={() => handleDownloadMock(res.title, res.file)}
              className="w-full py-3 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Specification</span>
            </button>
          </div>
        ))}
      </div>

      {/* Regulatory & Safety Notice Box (Apple Precision Callout) */}
      <section className="wr-card p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-800 rounded-2xl shrink-0 border border-amber-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="tech-badge text-[#86868b]">SAFETY & OCCUPATIONAL HEALTH</div>
              <h3 className="font-bold text-xl sm:text-2xl text-[#1d1d1f]">
                Crystalline Silica Health & Safety Statement
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Engineered quartz and natural stones contain crystalline silica (SiO₂). WHITEROCK mandates continuous water-suppression wet-cutting, automated dust extraction, and OSHA/EU-compliant PPE for all cutting, profiling, and polishing operations at our Vietnam manufacturing facilities.
            </p>
            <div className="p-5 bg-[#fbfbfd] rounded-2xl border border-black/[0.06] text-xs text-[#6e6e73] space-y-2">
              <div className="tech-badge text-[#1d1d1f]">
                CALIFORNIA PROPOSITION 65 DISCLOSURE:
              </div>
              <p className="leading-relaxed">
                WARNING: Cutting, grinding, and polishing stone products can generate airborne particles of respirable crystalline silica, known to the State of California to cause cancer and birth defects or other reproductive harm. Always use wet fabrication methods and certified NIOSH respirators during jobsite modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section with Schema */}
      <div className="pt-8 border-t border-black/[0.06]">
        <FaqSectionWithSchema
          currentLocale={currentLocale}
          title="Technical Data, Testing & Export Compliance FAQ"
          subtitle="Direct answers regarding product documentation, material properties, safety information, and container planning."
          showSchemaInspector={true}
        />
      </div>
    </div>
  );
};
