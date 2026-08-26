import React, { useState } from 'react';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Layers,
  Wrench,
  Package,
  FileCheck,
  Cpu,
  Eye,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ArrowRight,
  Info,
  Factory,
  Globe2,
  MapPin,
  Check,
  Ruler
} from 'lucide-react';
import { factory, company } from '../data';
import { ProductionMap } from '../components/ProductionMap';
import type { LocaleConfig, FactoryGalleryItem, EquipmentItem } from '../types';

interface FactoryViewProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
}

export const FactoryView: React.FC<FactoryViewProps> = ({
  currentLocale,
  setCurrentTab,
}) => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Bridge Sawing & Slicing',
    'CNC Machining & Cutouts',
    'Linear Edge Polishing',
    'Basin Mounting & Assembly',
    'Quality Inspection & QC',
    'ISPM-15 Export Crating'
  ];

  const galleryItems = factory.gallery as FactoryGalleryItem[];
  const equipmentItems = factory.equipment as EquipmentItem[];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedGalleryCategory === 'All') return true;
    return item.category?.toLowerCase().includes(selectedGalleryCategory.toLowerCase()) ||
           item.title?.toLowerCase().includes(selectedGalleryCategory.toLowerCase());
  });

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryItems.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
      {/* Top Header & Context Banner (Apple Display + Industrial Precision) */}
      <div className="space-y-4 max-w-4xl">
        <div className="wr-panel-eyebrow">
          <Factory className="w-3.5 h-3.5 text-emerald-700" />
          <span className="tech-badge">20,000 M² DIRECT VIETNAM FABRICATION PLANT • BÌNH PHƯỚC</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[#1d1d1f]">
          Direct Vietnam Manufacturing Plant.
        </h1>
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl font-normal">
          {factory.heroCopy}
        </p>
      </div>

      {/* Production Footprint Stats Grid (Apple Numbers with Monospace Engineering Badges) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {factory.stats.map((stat, idx) => (
          <div
            key={idx}
            className="apple-card p-6 sm:p-8 space-y-2 flex flex-col justify-between"
          >
            <div className="tech-badge text-[#86868b]">
              {stat.label}
            </div>
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                {stat.value}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Vietnam Production Base Map & Logistics Matrix */}
      <div className="apple-card p-4 sm:p-8">
        <ProductionMap currentLocale={currentLocale} />
      </div>

      {/* Core Machinery & Fabrication Capabilities */}
      <section className="space-y-8">
        <div className="space-y-2 max-w-3xl">
          <div className="tech-badge text-[#86868b]">
            MACHINERY & CNC SPECIFICATIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
            High-Throughput Stone Processing & Edge Lines
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b]">
            Production dimensions and inspection limits are agreed in approved drawings and the order quality plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {equipmentItems.map((item, idx) => (
            <div
              key={idx}
              className="apple-card p-6 sm:p-8 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#1d1d1f] bg-black/[0.04] px-3 py-1 rounded-full border border-black/[0.05]">
                    {item.quantity} In Operation
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                    {item.keySpec || item.accuracy || 'Specification confirmed per order'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1d1d1f]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {item.function || item.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
                <span className="tech-badge text-[#86868b]">{item.location || 'VIETNAM FACTORY REFERENCE'}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Workshop Photo Gallery */}
      <section className="space-y-8 apple-card p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-6">
          <div className="space-y-2">
            <div className="tech-badge text-[#86868b]">
              PRIMARY PHOTOGRAPHIC EVIDENCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Workshop Scenes & Stage Inspection
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl">
              Inspect our wet-processing lines, bridge saws, undermount sink bonding bays, and heavy plywood export packaging.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#f5f5f7] border border-black/[0.06]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#111113] text-white shadow-xs font-semibold'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const originalIndex = galleryItems.findIndex((g) => g.id === item.id || g.title === item.title);

            return (
              <div
                key={item.id || idx}
                onClick={() => setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : 0)}
                className="bg-[#fbfbfd] border border-black/[0.06] hover:border-black/20 rounded-3xl overflow-hidden flex flex-col transition-all group cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* Photo Image Stage */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="wr-media-zoom"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-[#1d1d1f] shadow-xs">
                    {item.category || 'Fabrication'}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#1d1d1f] group-hover:text-amber-900 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#0071e3] font-semibold">
                    <span>Inspect High-Res</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && galleryItems[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#161617] rounded-3xl overflow-hidden border border-white/10 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-black">
              <img
                src={galleryItems[selectedPhotoIndex].image}
                alt={galleryItems[selectedPhotoIndex].title}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 text-white space-y-2">
              <span className="tech-badge text-amber-300">
                {galleryItems[selectedPhotoIndex].category}
              </span>
              <h3 className="text-xl font-bold">{galleryItems[selectedPhotoIndex].title}</h3>
              <p className="text-sm text-[#a1a1a6] leading-relaxed">
                {galleryItems[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
