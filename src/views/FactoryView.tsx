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
  MapPin,
  Copy,
  Check,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  FileText,
  HelpCircle,
  Download,
  FolderOpen
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
  const [selectedFacility, setSelectedFacility] = useState<string>('All');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [displayMode, setDisplayMode] = useState<'both' | 'slots' | 'preview'>('both');
  const [showManifest, setShowManifest] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [userUploadedPhotos, setUserUploadedPhotos] = useState<Record<string, string>>({});

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
  const equipmentItems = factory.equipment as EquipmentItem[];

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

  const handleCopyPath = (path: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(path);
    setCopiedText(path);
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  const handleCopyAllPaths = () => {
    const allPaths = [
      '=== WHITEROCK VIETNAM FACTORY PHOTOS ===',
      ...galleryItems
        .filter((g) => g.facility?.includes('Vietnam'))
        .map((g) => `public/${g.localFile || 'assets/factory/' + g.id + '.jpg'}  <-- ${g.title}`),
      '',
      '=== OPTIMA STONE CHINA (YUNFU) FACTORY PHOTOS ===',
      ...galleryItems
        .filter((g) => !g.facility?.includes('Vietnam'))
        .map((g) => `public/${g.localFile || 'assets/factory/' + g.id + '.jpg'}  <-- ${g.title}`),
      '',
      '=== CORE INDUSTRIAL MACHINERY PHOTOS ===',
      ...equipmentItems.map(
        (eq) => `public/${eq.localFile || 'assets/equipment/' + eq.name + '.jpg'}  <-- ${eq.name}`
      )
    ].join('\n');

    navigator.clipboard.writeText(allPaths);
    setCopiedText('ALL_PATHS');
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  const handleFileUpload = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUserUploadedPhotos((prev) => ({
            ...prev,
            [key]: e.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Safe fallback placeholder for images
  const getFallbackImage = (title: string) => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%231c1917"/><rect x="20" y="20" width="760" height="560" fill="none" stroke="%23f59e0b" stroke-width="2" stroke-dasharray="8 8"/><circle cx="400" cy="240" r="50" fill="%23292524"/><path d="M375 240 L425 240 M400 215 L400 265" stroke="%23f59e0b" stroke-width="3"/><text x="400" y="340" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="20" font-weight="bold">PHOTO NEEDED</text><text x="400" y="380" dominant-baseline="middle" text-anchor="middle" fill="%23d6d3d1" font-family="sans-serif" font-size="14">${title.substring(0, 36)}</text><text x="400" y="420" dominant-baseline="middle" text-anchor="middle" fill="%2378716c" font-family="sans-serif" font-size="12">Drop or replace in public/assets/factory/</text></svg>`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Header & Context Banner */}
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

      {/* OWNER ACTION & ASSET PLACEMENT GUIDE BANNER */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider">
                <FolderOpen className="w-3.5 h-3.5" />
                Factory Owner Photo Replacement Guide
              </span>
              <span className="text-xs text-amber-400 font-medium">
                (实拍照替换指引看板)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Labeled 'Photo Needed' Slots for All 20 Production Floor Scenes
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              Below are the <strong>20 designated workshop photo slots</strong> (10 for Vietnam Dong Nai plant, 10 for China Yunfu Optima plant) and <strong>6 core machinery slots</strong>. Each card clearly labels the target destination file name in <code className="bg-stone-950 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">public/assets/factory/</code>. You can copy the paths directly or drag-and-drop your real camera photos right onto the panels to preview them immediately.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowManifest(!showManifest)}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-700 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{showManifest ? 'Hide Replacement Manifest' : 'View Full 26-Photo Manifest'}</span>
            </button>

            <button
              onClick={handleCopyAllPaths}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {copiedText === 'ALL_PATHS' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>All 26 File Paths Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy All File Paths</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Manifest Table */}
        {showManifest && (
          <div className="pt-4 border-t border-stone-800 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-amber-400">
                Complete Project File Structure & Asset Directory Mapping:
              </span>
              <span>Total: 20 Gallery Photos + 6 Equipment Photos</span>
            </div>

            <div className="max-h-80 overflow-y-auto rounded-2xl border border-stone-800 bg-stone-950/80 p-3 text-xs divide-y divide-stone-800/80">
              {/* Vietnam Base Items */}
              <div className="py-2">
                <div className="text-emerald-400 font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>WHITEROCK Vietnam Facility (10 Target Files in public/assets/factory/)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-300">
                  {galleryItems
                    .filter((g) => g.facility?.includes('Vietnam'))
                    .map((item, i) => {
                      const targetPath = `public/${item.localFile || 'assets/factory/vietnam-scene-' + (i + 1) + '.jpg'}`;
                      const isCopied = copiedText === targetPath;
                      return (
                        <div
                          key={item.id || i}
                          className="flex items-center justify-between p-2 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 gap-2"
                        >
                          <div className="truncate">
                            <span className="text-amber-400 font-mono font-bold mr-1.5">#{i + 1}</span>
                            <span className="font-mono text-stone-200 font-semibold">{item.localFile?.replace('assets/factory/', '')}</span>
                            <span className="text-stone-400 block text-[10px] truncate">{item.title}</span>
                          </div>
                          <button
                            onClick={() => handleCopyPath(targetPath)}
                            className="p-1.5 rounded-md bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-400 transition-colors shrink-0 cursor-pointer"
                            title="Copy target file path"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* China Base Items */}
              <div className="py-2">
                <div className="text-amber-400 font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5 pt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>OPTIMA STONE China Base (10 Target Files in public/assets/factory/)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-300">
                  {galleryItems
                    .filter((g) => !g.facility?.includes('Vietnam'))
                    .map((item, i) => {
                      const targetPath = `public/${item.localFile || 'assets/factory/china-scene-' + (i + 1) + '.jpg'}`;
                      const isCopied = copiedText === targetPath;
                      return (
                        <div
                          key={item.id || i}
                          className="flex items-center justify-between p-2 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 gap-2"
                        >
                          <div className="truncate">
                            <span className="text-amber-400 font-mono font-bold mr-1.5">#{i + 1}</span>
                            <span className="font-mono text-stone-200 font-semibold">{item.localFile?.replace('assets/factory/', '')}</span>
                            <span className="text-stone-400 block text-[10px] truncate">{item.title}</span>
                          </div>
                          <button
                            onClick={() => handleCopyPath(targetPath)}
                            className="p-1.5 rounded-md bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-400 transition-colors shrink-0 cursor-pointer"
                            title="Copy target file path"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Equipment Items */}
              <div className="py-2">
                <div className="text-sky-400 font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5 pt-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Machinery & Tooling (6 Target Files in public/assets/equipment/)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-300">
                  {equipmentItems.map((item, i) => {
                    const targetPath = `public/${item.localFile || 'assets/equipment/' + item.name + '.jpg'}`;
                    const isCopied = copiedText === targetPath;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 gap-2"
                      >
                        <div className="truncate">
                          <span className="text-sky-400 font-mono font-bold mr-1.5">EQ-{i + 1}</span>
                          <span className="font-mono text-stone-200 font-semibold">{item.localFile?.replace('assets/equipment/', '')}</span>
                          <span className="text-stone-400 block text-[10px] truncate">{item.name}</span>
                        </div>
                        <button
                          onClick={() => handleCopyPath(targetPath)}
                          className="p-1.5 rounded-md bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-400 transition-colors shrink-0 cursor-pointer"
                          title="Copy target file path"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
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

      {/* Interactive Dual Production Bases SVG Map & Deep-Dive Matrix */}
      <ProductionMap
        currentLocale={currentLocale}
        onSelectFacility={(fac) => {
          if (fac === 'Vietnam') setSelectedFacility('Vietnam');
          else if (fac === 'China') setSelectedFacility('China');
        }}
      />

      {/* 20 Real Factory Photo Gallery & 'PHOTO NEEDED' Slot Cards Section */}
      <section className="space-y-8 bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Production Floor Visual Archive & Replacement Slots (20 处实拍照工序展厅)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Authentic Factory Photo Gallery & 'Photo Needed' Placement Panels
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Each card below features a labeled <strong>'Photo Needed'</strong> target path box, recommended angle details, and interactive image stage.
            </p>
          </div>

          {/* Display Mode Switcher & Facility Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-stone-950 p-1 rounded-xl border border-stone-800 flex items-center text-xs">
              <button
                onClick={() => setDisplayMode('both')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  displayMode === 'both'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Standard (Card + Guide)
              </button>
              <button
                onClick={() => setDisplayMode('slots')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  displayMode === 'slots'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Photo Needed Slots Only
              </button>
              <button
                onClick={() => setDisplayMode('preview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  displayMode === 'preview'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Preview Mode
              </button>
            </div>

            {/* Facility Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {facilities.map((fac) => (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedFacility === fac.id
                      ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                      : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  <span>{fac.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
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

        {/* Photos Grid with 'PHOTO NEEDED' Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const originalIndex = galleryItems.findIndex((g) => g.id === item.id || g.title === item.title);
            const targetFilePath = `public/${item.localFile || 'assets/factory/' + item.id + '.jpg'}`;
            const isPathCopied = copiedText === targetFilePath;
            const customPreview = item.id ? userUploadedPhotos[item.id] : undefined;
            const isVietnam = item.facility?.includes('Vietnam');

            return (
              <div
                key={item.id || idx}
                className="group bg-stone-950 border-2 border-stone-800 hover:border-amber-500/60 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 shadow-lg relative"
              >
                {/* 1. TOP 'PHOTO NEEDED' LABEL BANNER */}
                <div className="bg-stone-900/95 border-b border-stone-800 p-3.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shrink-0 ${
                      customPreview 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      <Camera className="w-3 h-3" />
                      <span>{customPreview ? 'LOCAL PREVIEW LOADED' : 'PHOTO NEEDED'}</span>
                    </span>
                    <span className="text-[11px] font-mono text-stone-300 font-bold truncate">
                      {item.localFile?.replace('assets/factory/', '') || item.id + '.jpg'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleCopyPath(targetFilePath, e)}
                    className="px-2 py-1 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-[10px] font-semibold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                    title="Copy full local path"
                  >
                    {isPathCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Path</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. PHOTO PREVIEW / STAGE CONTAINER */}
                {displayMode !== 'slots' ? (
                  <div
                    onClick={() => setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : 0)}
                    className="relative aspect-4/3 overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <img
                      src={customPreview || item.image}
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

                    {/* Zoom icon on hover */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-amber-500 text-stone-950 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  /* PURE BLUEPRINT / PHOTO NEEDED PLACEHOLDER STAGE */
                  <div className="p-5 bg-stone-950 border-b border-stone-800 flex flex-col justify-center items-center text-center space-y-3 min-h-[190px]">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-dashed border-amber-500/40 flex items-center justify-center text-amber-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-amber-300 block">
                        Target: <code className="font-mono bg-stone-900 px-1.5 py-0.5 rounded text-amber-400">{targetFilePath}</code>
                      </span>
                      <p className="text-[11px] text-stone-400 max-w-xs">
                        {item.equipment || item.specs}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. METADATA & OWNER REPLACEMENT SPECIFICATIONS */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-stone-900/40">
                  <div className="space-y-2">
                    <h3
                      onClick={() => setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : 0)}
                      className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {item.description || item.alt}
                    </p>
                  </div>

                  {/* Machine & Specs Box */}
                  <div className="bg-stone-950/80 rounded-xl p-3 border border-stone-800/80 space-y-2 text-[11px]">
                    {item.equipment && (
                      <div className="flex justify-between text-stone-400">
                        <span className="font-medium text-stone-500">Machine / Subject:</span>
                        <span className="text-stone-200 font-semibold truncate max-w-[62%] text-right">{item.equipment}</span>
                      </div>
                    )}
                    {item.specs && (
                      <div className="flex justify-between text-stone-400">
                        <span className="font-medium text-stone-500">Key Tolerance:</span>
                        <span className="text-amber-400/90 font-mono truncate max-w-[62%] text-right">{item.specs}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-400 pt-1 border-t border-stone-800/60">
                      <span className="font-medium text-stone-500">Target Resolution:</span>
                      <span className="text-stone-300 font-mono text-[10px]">16:9 / 4:3 • Min 1920×1080</span>
                    </div>
                  </div>

                  {/* 4. DRAG & DROP / SELECT LOCAL PHOTO TEST DROPZONE */}
                  <div className="pt-1 flex items-center gap-2">
                    <label className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700/80 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-amber-500/50">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>{customPreview ? 'Change Test Photo' : 'Test Upload Local Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.id || `photo-${idx}`, e)}
                      />
                    </label>

                    <button
                      onClick={() => setSelectedPhotoIndex(originalIndex >= 0 ? originalIndex : 0)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-colors cursor-pointer"
                      title="Inspect full-size image and details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Lightbox Modal for HD Inspection & Owner Specs */}
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
                  src={(activePhoto.id ? userUploadedPhotos[activePhoto.id] : undefined) || activePhoto.image}
                  alt={activePhoto.alt || activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = getFallbackImage(activePhoto.title);
                  }}
                />
              </div>

              {/* Photo Data Breakdown & Owner Asset Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {activePhoto.description || activePhoto.alt}
                  </p>

                  {/* Owner Destination Guide Card */}
                  <div className="bg-stone-950 border-2 border-dashed border-amber-500/40 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <FolderOpen className="w-4 h-4" />
                        <span>Owner Asset Replacement Slot</span>
                      </span>
                      <button
                        onClick={() =>
                          handleCopyPath(
                            `public/${activePhoto.localFile || 'assets/factory/' + activePhoto.id + '.jpg'}`
                          )
                        }
                        className="px-2.5 py-1 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedText?.includes(activePhoto.localFile || '') ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Path Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Path</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-stone-900 rounded-xl p-2.5 font-mono text-xs text-amber-300 break-all border border-stone-800">
                      public/{activePhoto.localFile || `assets/factory/${activePhoto.id}.jpg`}
                    </div>

                    <div className="text-[11px] text-stone-400 leading-relaxed">
                      💡 <strong>Replacement Instructions:</strong> Save your real workshop photograph with this exact name inside your repository's <code className="text-amber-400 font-mono">public/assets/factory/</code> folder.
                    </div>
                  </div>
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

      {/* Machinery Inventory Deep-Dive with 'PHOTO NEEDED' Badges */}
      <section className="space-y-6">
        <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Industrial Equipment Inventory (6 Core Machines)</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">
              Core Fabrication Machinery & 'Photo Needed' Tooling Slots
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Standard and specialty equipment operating across our Vietnam and China workshops.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentItems.map((eq, i) => {
            const targetPath = `public/${eq.localFile || 'assets/equipment/' + eq.name + '.jpg'}`;
            const isPathCopied = copiedText === targetPath;
            const customPreview = userUploadedPhotos[`eq-${i}`];

            return (
              <div
                key={i}
                className="bg-stone-900 border-2 border-stone-800 rounded-3xl overflow-hidden group flex flex-col hover:border-amber-500/50 transition-all shadow-md"
              >
                {/* Photo Needed Header on Equipment */}
                <div className="bg-stone-950 border-b border-stone-800 p-3 flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1 truncate">
                    <Camera className="w-3 h-3 shrink-0" />
                    <span>PHOTO NEEDED: {eq.localFile?.replace('assets/equipment/', '') || `eq-${i+1}.jpg`}</span>
                  </span>

                  <button
                    onClick={() => handleCopyPath(targetPath)}
                    className="p-1.5 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-400 transition-colors shrink-0 cursor-pointer"
                    title="Copy path"
                  >
                    {isPathCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div className="relative aspect-16/9 overflow-hidden bg-stone-950">
                  <img
                    src={customPreview || eq.media}
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
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-white">
                      {eq.name}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed">
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
                    <div className="flex justify-between text-stone-500 text-[11px] pt-1">
                      <span>Save to:</span>
                      <span className="text-amber-400 font-mono truncate max-w-[70%]">{targetPath}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
            poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
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
