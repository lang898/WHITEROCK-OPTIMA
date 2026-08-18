import React, { useState } from 'react';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  Play,
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
  MapPin
} from 'lucide-react';
import { factory, company } from '../data';
import type { LocaleConfig, FactoryGalleryItem } from '../types';

interface FactoryViewProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
}

export const FactoryView: React.FC<FactoryViewProps> = ({
  currentLocale,
  setCurrentTab,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<string>('All');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const facilities = [
    { id: 'All', label: 'All Facilities (全部 20 处实拍场景)', count: 20 },
    { id: 'Vietnam', label: 'WHITEROCK Vietnam Base (越南主厂 - 10 处实拍)', count: 10 },
    { id: 'China', label: 'OPTIMA STONE China Base (中国欧普 - 10 处实拍)', count: 10 }
  ];

  const categories = [
    'All',
    'Cutting & CNC',
    'Edge Processing',
    'Polishing & Profiling',
    'Assembly & QC',
    'Quality Assurance',
    'Material Handling',
    'Facility & Logistics'
  ];

  const galleryItems = factory.gallery as FactoryGalleryItem[];

  const filteredItems = galleryItems.filter((item) => {
    // Facility Filter
    if (selectedFacility === 'Vietnam' && !item.facility?.toLowerCase().includes('vietnam')) {
      return false;
    }
    if (selectedFacility === 'China' && !item.facility?.toLowerCase().includes('china') && !item.facility?.toLowerCase().includes('optima')) {
      return false;
    }

    // Category Filter
    if (selectedGalleryCategory !== 'All' && item.category?.toLowerCase() !== selectedGalleryCategory.toLowerCase()) {
      return false;
    }

    return true;
  });

  const activePhoto = selectedPhotoIndex !== null ? galleryItems[selectedPhotoIndex] : null;

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

  // Safe fallback placeholder for images
  const getFallbackImage = (title: string) => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%231c1917"/><rect x="20" y="20" width="760" height="560" fill="none" stroke="%2338332e" stroke-width="2"/><circle cx="400" cy="260" r="60" fill="%23292524"/><path d="M370 260 L430 260 M400 230 L400 290" stroke="%23f59e0b" stroke-width="4"/><text x="400" y="370" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="22" font-weight="bold">${title.substring(0, 32)}</text><text x="400" y="410" dominant-baseline="middle" text-anchor="middle" fill="%23a8a29e" font-family="sans-serif" font-size="14">AUTHENTIC FACTORY WORKSHOP PHOTO</text></svg>`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
          <Camera className="w-4 h-4" />
          <span>Dual Manufacturing Base Real Photos (WR越南工厂 + 欧普石材中国基地 20大实拍全景)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          WHITEROCK Vietnam & OPTIMA STONE China Manufacturing Facilities
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          {factory.heroCopy}
        </p>
      </div>

      {/* Facility Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vietnam Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-amber-500/40 transition-colors shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>Vietnam Main Export Facility</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white pt-1">
                WHITEROCK Vietnam (Dong Nai Plant)
              </h3>
            </div>
            <span className="text-2xl font-serif font-bold text-amber-400">
              20,000 m²
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Direct US-bound tariff-free export manufacturing center. Outfitted with infrared multi-blade bridge cutting saws, Hongda multi-spindle continuous edge polishers, radial water arm contour polishers, and dedicated container staging aprons.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800 text-[11px] text-stone-400">
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">40HQ Multi-Docking</span>
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">0% Section 301 US Tariff</span>
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">Full-Array Light Inspection</span>
          </div>
        </div>

        {/* China Base Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-amber-500/40 transition-colors shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>China Strategic Sourcing Base</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white pt-1">
                OPTIMA STONE (欧普石材 Yunfu Plant)
              </h3>
            </div>
            <span className="text-2xl font-serif font-bold text-amber-400">
              20+ Yrs Craft
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            China natural marble stone hub. Equipped with 3820-4 Quad-Spindle heavy CNC centers, YEXIANG mechatronic continuous edge lines, XTM-SGM 2600 slab polishing units, 5T bridge cranes, and high-capacity undermount sink assembly halls.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800 text-[11px] text-stone-400">
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">Quad-Spindle CNCs</span>
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">Carrara Marble Mastery</span>
            <span className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800">Undermount Sink Assembly</span>
          </div>
        </div>
      </div>

      {/* Production Footprint Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {factory.stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-1 flex flex-col justify-between hover:border-stone-700 transition-colors shadow-sm"
          >
            <span className="text-xs text-stone-400 font-medium">
              {stat.label}
            </span>
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-2xl font-serif font-black text-amber-400">
                {stat.value}
              </span>
              {stat.confirmed ? (
                <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Confirmed
                </span>
              ) : (
                <span className="text-[10px] text-stone-500 font-medium bg-stone-800 px-2 py-0.5 rounded">
                  Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured: 20 Real Factory Photo Gallery Section */}
      <section className="space-y-8 bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Live Factory Tour • 20 Real Production Scenes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Authentic Production Floor Photo Archive (双厂区实拍全景)
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Real workshop photographs showing quad-spindle CNC machining, YEXIANG & Hongda continuous edge profiling, multi-station undermount basin assembly, 5T bridge cranes, and dry-lay QC inspections.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>20 Real Production Scenes Verified • Click any card for high-resolution inspection & technical specs</span>
            </div>
          </div>

          {/* Facility Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {facilities.map((fac) => (
              <button
                key={fac.id}
                onClick={() => setSelectedFacility(fac.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedFacility === fac.id
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                <span>{fac.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-stone-400 mr-2 font-medium">Filter by Stage:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedGalleryCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedGalleryCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-stone-950 hover:bg-stone-900 text-stone-400 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const originalIndex = galleryItems.findIndex((g) => g.id === item.id || g.title === item.title);

            return (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : 0)}
                className="group bg-stone-950 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-md cursor-pointer hover:shadow-amber-500/5"
              >
                {/* Photo Preview Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = getFallbackImage(item.title);
                    }}
                  />

                  {/* Gradient Overlay & Zoom Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Facility Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700/80 uppercase">
                    {item.facility || 'Manufacturing Base'}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-stone-900/90 backdrop-blur-sm text-[10px] text-stone-300 border border-stone-800">
                    {item.category}
                  </div>

                  {/* Hover Inspect Action */}
                  <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-amber-500 text-stone-950 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Metadata & Technical Summary */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-stone-900/40">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description || item.alt}
                    </p>
                  </div>

                  {item.equipment && (
                    <div className="pt-2.5 border-t border-stone-800/80 space-y-1 text-[11px]">
                      <div className="flex justify-between text-stone-400">
                        <span className="font-medium text-stone-400">Machine:</span>
                        <span className="text-stone-200 font-semibold truncate max-w-[65%] text-right">{item.equipment}</span>
                      </div>
                      {item.specs && (
                        <div className="flex justify-between text-stone-400">
                          <span className="font-medium text-stone-400">Key Spec:</span>
                          <span className="text-amber-400/90 font-mono truncate max-w-[65%] text-right">{item.specs}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Lightbox Modal for HD Inspection */}
      {selectedPhotoIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-stone-900 border border-stone-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
                  SCENE {selectedPhotoIndex + 1} / {galleryItems.length}
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  {activePhoto.facility || 'WHITEROCK & OPTIMA Facilities'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPhoto}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-red-500/20 hover:text-red-400 text-stone-400 transition-colors cursor-pointer ml-2"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
              {/* Image Stage */}
              <div className="relative aspect-16/10 sm:aspect-16/9 bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.alt || activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = getFallbackImage(activePhoto.title);
                  }}
                />
              </div>

              {/* Photo Data Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {activePhoto.description || activePhoto.alt}
                  </p>
                </div>

                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px] border-b border-stone-800 pb-1.5">
                    Technical Specifications
                  </div>

                  {activePhoto.equipment && (
                    <div>
                      <span className="text-stone-500 block">Equipment / Line:</span>
                      <strong className="text-stone-200">{activePhoto.equipment}</strong>
                    </div>
                  )}

                  {activePhoto.specs && (
                    <div>
                      <span className="text-stone-500 block">Tolerance & Parameter:</span>
                      <span className="text-amber-300 font-mono">{activePhoto.specs}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-stone-500 block">Facility Base:</span>
                    <span className="text-stone-300">{activePhoto.facility || 'Dong Nai, Vietnam / Yunfu, China'}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80">
                    <button
                      onClick={() => {
                        setSelectedPhotoIndex(null);
                        setCurrentTab('contact');
                      }}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Inquire About Fabrication Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Machinery Inventory Deep-Dive */}
      <section className="space-y-6">
        <div className="border-b border-stone-800 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>Industrial Equipment Inventory</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">
            Core Fabrication Machinery & Tooling
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Standard and specialty equipment operating across our Vietnam and China workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factory.equipment.map((eq, i) => (
            <div
              key={i}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden group flex flex-col hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
                <img
                  src={eq.media}
                  alt={eq.alt || eq.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = getFallbackImage(eq.name);
                  }}
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700">
                  {eq.location}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-white">
                    {eq.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    {eq.function}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-stone-800 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Key Specification:</span>
                    <strong className="text-stone-200 text-right max-w-[60%]">{eq.keySpec}</strong>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Brand / Model:</span>
                    <span className="text-stone-300 text-right max-w-[60%] truncate">{eq.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QC & Inspection Workflow */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Quality Assurance Protocol
          </span>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">
            4-Stage In-Process Inspection & Third-Party Audit
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Strict tolerance verification before crating. Third-party inspections by SGS, Bureau Veritas, or Intertek are welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {factory.qc.inspectionPoints.map((pt, idx) => (
            <div
              key={idx}
              className="bg-stone-950 border border-stone-800/80 rounded-xl p-4 space-y-2"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                0{idx + 1}
              </div>
              <h4 className="font-semibold text-sm text-stone-100">{pt}</h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Verified against customer-approved shop drawings and color references.
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <strong>Third-Party Inspection:</strong> {factory.qc.thirdParty}
          </div>
          <div>
            <strong>AQL Sampling Plan:</strong> {factory.qc.aql}
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-amber-400" />
              <span>Vietnam Factory Walkthrough Video</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Live footage of production lines, CNC machining, edge polishing, and vanity top inspection arrays.
            </p>
          </div>
        </div>

        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 group shadow-2xl">
          <video
            controls
            poster="assets/factory/vietnam-factory-exterior.jpg"
            className="w-full h-full object-cover"
          >
            <source src={factory.tourVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};
