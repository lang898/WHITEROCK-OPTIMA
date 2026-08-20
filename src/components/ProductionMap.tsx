import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MapPin,
  Globe2,
  Ship,
  ShieldCheck,
  Factory,
  Cpu,
  Layers,
  Anchor,
  Truck,
  ArrowRight,
  Sparkles,
  FileCheck,
  Clock,
  Compass,
  Boxes,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Maximize2
} from 'lucide-react';
import type { LocaleConfig } from '../types';

interface ProductionMapProps {
  currentLocale?: LocaleConfig;
  onSelectFacility?: (facilityId: 'Vietnam' | 'China' | 'All') => void;
  className?: string;
}

export interface ProductionBaseInfo {
  id: 'Vietnam' | 'China';
  name: string;
  chineseName: string;
  established: string;
  role: string;
  area: string;
  annualCapacity: string;
  tariffStatus: string;
  tariffHighlight: string;
  primaryMaterials: string[];
  equipmentHighlights: string[];
  shippingPorts: string[];
  oceanTransitTimes: {
    destination: string;
    duration: string;
  }[];
  coordinates: {
    lat: string;
    lng: string;
    mapX: number; // SVG Percentage X (0-100)
    mapY: number; // SVG Percentage Y (0-100)
  };
  address: string;
  description: string;
  complianceDocs: string[];
}

export const productionBasesData: Record<'Vietnam' | 'China', ProductionBaseInfo> = {
  Vietnam: {
    id: 'Vietnam',
    name: 'WHITEROCK Vietnam Main Production & Export Base',
    chineseName: 'WHITEROCK 越南白石制造基地 (Dong Nai Plant)',
    established: 'Export Facility (20,000 m²)',
    role: 'Primary North American & Global Export Hub (Tariff-Free)',
    area: '20,000 m²',
    annualCapacity: '100,000+ m² / Year',
    tariffStatus: '0% US Section 301 Tariff',
    tariffHighlight: '0% Section 301 Punitive Tariff for US Importers (Compared to 25% on Direct China Imports)',
    primaryMaterials: [
      'Engineered Quartz Slabs & Countertops (Calacatta, Carrara, Pure White)',
      'Prefab Bathroom Vanity Tops with Pre-Mounted Undermount Sinks',
      'Hospitality Cut-to-Size Kitchen Islands & Tub Surrounds',
      'High-Density Sintered Stone & Porcelain Countertops'
    ],
    equipmentHighlights: [
      'Multi-Blade Infrared Bridge Saws with CNC Automated Touch Consoles',
      'Hongda Multi-Spindle Continuous Linear Edge Polishers',
      'Radial Water Arm Contour Polishers for Basin Cutouts',
      '40HQ Container Multi-Bay Staging & Heavy Crated Loading Ramps'
    ],
    shippingPorts: [
      'Cat Lai Port, Ho Chi Minh City (approx. 45 km / 1.5 hrs trucking)',
      'Cai Mep Deepwater Container Terminal (approx. 68 km / direct US vessel calls)'
    ],
    oceanTransitTimes: [
      { destination: 'US West Coast (LA / Long Beach / Oakland)', duration: '18 - 22 Days' },
      { destination: 'US East Coast & Gulf (Houston / Savannah / NY)', duration: '28 - 34 Days' },
      { destination: 'Europe (Rotterdam / Hamburg / Felixstowe)', duration: '24 - 30 Days' },
      { destination: 'Australia (Sydney / Melbourne / Brisbane)', duration: '14 - 18 Days' }
    ],
    coordinates: {
      lat: '11.5312° N',
      lng: '106.8850° E',
      mapX: 47.5,
      mapY: 69.5
    },
    address: 'National Highway 14, Dong Tam, Dong Phu, Binh Phuoc / Dong Nai Industrial Corridor, Vietnam',
    description: 'Our primary manufacturing and export powerhouse engineered specifically for large-scale North American multi-family, single-family residential, and commercial hospitality stone projects. Provides verified Certificate of Origin (C/O Form B/AJ/AK) ensuring complete US Customs and Section 301 tariff compliance.',
    complianceDocs: [
      'Certificate of Origin (Form B / AJ / AK)',
      'ISPM-15 Certified Heat-Treated Plywood Crating',
      'ISTA-3A Drop-Test Verified Packaging',
      'SGS / Intertek AQL 1.5/4.0 Pre-Shipment Inspection Reports'
    ]
  },
  China: {
    id: 'China',
    name: 'OPTIMA STONE China Natural Stone & High-Craft Hub',
    chineseName: '欧普石材 (OPTIMA STONE) 广东云浮制造基地',
    established: '20+ Years Legacy Heritage',
    role: 'Natural Marble, Exotic Granite & Precision CNC Machining Base',
    area: '15,000+ m² Multi-Hall Facility',
    annualCapacity: '80,000+ m² / Year',
    tariffStatus: 'Standard Tariff / Global Natural Stone Sourcing',
    tariffHighlight: '20+ Years Stone Carving Heritage & Direct Quarry Access for Global Luxury Stone Projects',
    primaryMaterials: [
      'Natural Italian & Greek White Marble (Carrara, Calacatta, Volakas)',
      'Exotic Quartzite & Granite Architectural Panels',
      'Complex Waterjet Medallions, Fluted Columns & Custom Moldings',
      'High-Capacity Basin Undermounting & Epoxy Backing Line'
    ],
    equipmentHighlights: [
      '3820-4 Quad-Spindle High-Precision Synchronized CNC Centers (±0.3mm)',
      'YEXIANG Continuous Mechatronic Edge Profiling & Chamfering Line',
      'XTM-SGM 2600 Heavy-Duty Surface Calibrating & Mirror Polishing Units',
      '5-Ton Heavy Overhead Bridge Cranes & 360° Hydraulic Jib Stations'
    ],
    shippingPorts: [
      'Shenzhen Yantian & Shekou Ports (approx. 180 km / dedicated container rail/truck)',
      'Guangzhou Nansha Port & Foshan Feeder Barge Terminal'
    ],
    oceanTransitTimes: [
      { destination: 'US West Coast (LA / Long Beach)', duration: '16 - 20 Days' },
      { destination: 'US East Coast (New York / Norfolk)', duration: '28 - 32 Days' },
      { destination: 'Middle East (Dubai / Jebel Ali)', duration: '15 - 18 Days' },
      { destination: 'Europe (Rotterdam / Genoa)', duration: '22 - 28 Days' }
    ],
    coordinates: {
      lat: '22.9298° N',
      lng: '112.0444° E',
      mapX: 61.5,
      mapY: 34.5
    },
    address: 'Yunfu International Stone Industrial Park, Guangdong Province, China (China Stone Capital)',
    description: 'Located in Yunfu — China’s premier stone capital — OPTIMA STONE leverages two decades of natural stone processing mastery, advanced quad-spindle CNC engineering, and deep raw block procurement channels to deliver exquisite custom architectural stone and specialty finishes.',
    complianceDocs: [
      'MIA (Marble Institute of America) Dimensional Tolerances',
      'ASTM C503 / C615 Material Physical Test Certifications',
      'ISPM-15 Phytosanitary Export Fumigation Seals',
      'Factory Sealed Barcode Unit Tracking for BOQ Schedules'
    ]
  }
};

export const ProductionMap: React.FC<ProductionMapProps> = ({
  currentLocale,
  onSelectFacility,
  className = ''
}) => {
  const [activeBase, setActiveBase] = useState<'Vietnam' | 'China'>('Vietnam');
  const [showShippingLanes, setShowShippingLanes] = useState<boolean>(true);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  const currentBaseInfo = productionBasesData[activeBase];

  const handleBaseChange = (baseId: 'Vietnam' | 'China') => {
    setActiveBase(baseId);
    if (onSelectFacility) {
      onSelectFacility(baseId);
    }
  };

  return (
    <section id="dual-production-map" className={`space-y-8 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Dual-Engine Manufacturing Footprint & Global Logistics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Interactive Production Footprint & Export Map
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Visualizing WHITEROCK's <strong>20,000 m² Vietnam Export Facility</strong> (0% US Section 301 Tariff) and <strong>OPTIMA STONE's 20-Year Yunfu China Natural Stone Base</strong>. Click between bases or map markers to inspect factory specs, CNC equipment arrays, and ocean shipping transit times.
          </p>
        </div>

        {/* Base Selector Tabs */}
        <div className="flex items-center gap-2 shrink-0 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 shadow-inner">
          <button
            onClick={() => handleBaseChange('Vietnam')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBase === 'Vietnam'
                ? 'bg-emerald-500 text-stone-950 shadow-md scale-[1.02]'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Vietnam Base (0% US Tariff)</span>
          </button>

          <button
            onClick={() => handleBaseChange('China')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeBase === 'China'
                ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Yunfu China Base (20+ Yrs)</span>
          </button>
        </div>
      </div>

      {/* Main Map & Detail Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side (Col 1-7): Clean Interactive SVG Geographic Map */}
        <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Background Coordinate Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#29252415_1px,transparent_1px),linear-gradient(to_bottom,#29252415_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />
          
          {/* Map Header Status Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-stone-300 font-mono font-medium">
                Regional Hub View: <strong className="text-white">Indochina & South China Industrial Zone</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShippingLanes(!showShippingLanes)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                  showShippingLanes
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Ship className="w-3.5 h-3.5 text-amber-400" />
                <span>{showShippingLanes ? 'Hide Shipping Routes' : 'Show Shipping Routes'}</span>
              </button>

              <span className="text-[10px] font-mono text-stone-400 hidden sm:inline-block">
                E 100° - 122° / N 8° - 26°
              </span>
            </div>
          </div>

          {/* Interactive SVG Stage */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] my-4 rounded-2xl bg-gradient-to-b from-stone-900/80 via-stone-950 to-stone-900/90 border border-stone-800/90 overflow-hidden shadow-inner flex items-center justify-center">
            {/* SVG Visual Vector Canvas */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full object-contain filter drop-shadow-md select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="vietnamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.75" />
                </linearGradient>

                <linearGradient id="chinaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.65" />
                </linearGradient>

                <linearGradient id="oceanLaneVN" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient id="oceanLaneCN" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>

                {/* Radar Pulse Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Water / Ocean Background Grid Texture */}
              <rect width="800" height="600" fill="#0c0a09" />
              
              {/* Latitude / Longitude Subtle Coordinate Guides */}
              <line x1="80" y1="120" x2="740" y2="120" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="80" y1="240" x2="740" y2="240" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="80" y1="360" x2="740" y2="360" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="80" y1="480" x2="740" y2="480" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              
              <line x1="200" y1="50" x2="200" y2="550" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="400" y1="50" x2="400" y2="550" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="600" y1="50" x2="600" y2="550" stroke="#292524" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* Geographic Landmass Contours - Simplified East & SE Asia */}
              {/* Mainland China (South / Guangdong / Guangxi / Fujian / Yunnan) */}
              <path
                d="M 160,70 L 260,60 L 360,50 L 480,45 L 610,65 L 720,95 L 760,140 L 730,200 L 680,240 L 640,265 L 590,260 L 530,250 L 480,270 L 440,240 L 370,230 L 300,210 L 230,190 L 170,160 Z"
                fill="url(#chinaGrad)"
                stroke="#d97706"
                strokeWidth="1.5"
                opacity="0.85"
                className="transition-all duration-300"
              />

              {/* Hainan Island */}
              <path
                d="M 450,285 C 470,280 490,295 485,315 C 475,330 450,335 440,320 C 435,305 440,290 450,285 Z"
                fill="#292524"
                stroke="#78716c"
                strokeWidth="1"
              />

              {/* Taiwan Island */}
              <path
                d="M 720,240 C 730,230 740,245 745,270 C 748,295 735,315 725,320 C 718,310 715,260 720,240 Z"
                fill="#1c1917"
                stroke="#57534e"
                strokeWidth="1"
              />

              {/* Indochina (Vietnam S-Curve, Laos, Cambodia, Thailand) */}
              {/* Thailand / Laos / Cambodia Buffer */}
              <path
                d="M 230,190 L 300,210 L 370,230 L 380,310 L 340,350 L 310,380 L 300,450 L 350,470 L 380,440 L 390,380 L 370,330 L 360,250 L 300,210 Z"
                fill="#1c1917"
                stroke="#44403c"
                strokeWidth="1"
                opacity="0.75"
              />

              {/* Vietnam Coastline Strip (Accurate S-Shape) */}
              <path
                d="M 370,230 L 410,245 L 430,270 L 415,310 L 430,350 L 460,390 L 475,440 L 450,490 L 410,500 L 375,490 L 380,455 L 420,440 L 410,380 L 380,330 L 370,230 Z"
                fill="url(#vietnamGrad)"
                stroke="#10b981"
                strokeWidth="1.8"
                className="transition-all duration-300"
              />

              {/* South China Sea Label */}
              <text x="560" y="380" fill="#78716c" fontSize="11" fontFamily="monospace" letterSpacing="3" opacity="0.6">
                SOUTH CHINA SEA
              </text>
              <text x="570" y="398" fill="#57534e" fontSize="9" fontFamily="sans-serif" opacity="0.5">
                (EAST SEA / PACIFIC LOGISTICS CORRIDOR)
              </text>

              {/* Trans-Pacific Shipping Lanes */}
              {showShippingLanes && (
                <g className="transition-opacity duration-500">
                  {/* Route 1: Vietnam Cat Lai / Cai Mep -> North America (Direct Pacific Carrier) */}
                  <path
                    d="M 420,470 Q 560,490 680,460 T 790,400"
                    fill="none"
                    stroke="url(#oceanLaneVN)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="animate-[dash_20s_linear_infinite]"
                  />
                  {/* Route 1 Vessel Marker */}
                  <circle cx="620" cy="470" r="4" fill="#38bdf8" />
                  <text x="630" y="474" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    US West Coast (18-22d) / East Coast (28-34d)
                  </text>

                  {/* Route 2: China Yantian / Nansha -> Global Trans-Oceanic Lane */}
                  <path
                    d="M 540,245 Q 640,220 730,220 T 790,200"
                    fill="none"
                    stroke="url(#oceanLaneCN)"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />
                  <circle cx="680" cy="220" r="3.5" fill="#f59e0b" />
                  <text x="685" y="214" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                    Direct Natural Stone Lines
                  </text>

                  {/* Port Marker: Ho Chi Minh Cat Lai Port */}
                  <circle
                    cx="418"
                    cy="472"
                    r="5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPort('Cat Lai Port, Ho Chi Minh')}
                    onMouseLeave={() => setHoveredPort(null)}
                  />
                  <text x="340" y="475" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    Cat Lai Port
                  </text>

                  {/* Port Marker: Shenzhen Yantian / Nansha */}
                  <circle
                    cx="542"
                    cy="245"
                    r="5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPort('Shenzhen Yantian / Nansha')}
                    onMouseLeave={() => setHoveredPort(null)}
                  />
                  <text x="552" y="248" fill="#fbbf24" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    Yantian / Nansha
                  </text>
                </g>
              )}

              {/* BASE 1: WHITEROCK VIETNAM PIN & RADAR (Dong Nai / Binh Phuoc) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => handleBaseChange('Vietnam')}
              >
                {/* Radar Ring 1 */}
                <circle
                  cx="405"
                  cy="450"
                  r={activeBase === 'Vietnam' ? 24 : 14}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  opacity={activeBase === 'Vietnam' ? "0.6" : "0.3"}
                  className="animate-ping"
                  style={{ transformOrigin: '405px 450px', animationDuration: '3s' }}
                />
                {/* Radar Ring 2 */}
                <circle
                  cx="405"
                  cy="450"
                  r={activeBase === 'Vietnam' ? 14 : 9}
                  fill="#10b981"
                  fillOpacity={activeBase === 'Vietnam' ? "0.3" : "0.15"}
                  stroke="#059669"
                  strokeWidth="2"
                />
                {/* Center Core */}
                <circle
                  cx="405"
                  cy="450"
                  r="6"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="3"
                  filter="url(#glow)"
                />

                {/* Base Card Label Callout */}
                <rect
                  x="230"
                  y="418"
                  width="165"
                  height="46"
                  rx="8"
                  fill="#0c0a09"
                  stroke={activeBase === 'Vietnam' ? '#10b981' : '#292524'}
                  strokeWidth={activeBase === 'Vietnam' ? '2' : '1'}
                  className="shadow-xl"
                />
                <text x="240" y="434" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  WHITEROCK VIETNAM
                </text>
                <text x="240" y="446" fill="#a8a29e" fontSize="8.5" fontFamily="sans-serif">
                  20,000 m² | 0% US Tariff Base
                </text>
                <text x="240" y="457" fill="#fbbf24" fontSize="8" fontFamily="monospace">
                  11.53° N, 106.88° E
                </text>
              </g>

              {/* BASE 2: OPTIMA STONE CHINA PIN & RADAR (Yunfu, Guangdong) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => handleBaseChange('China')}
              >
                {/* Radar Ring 1 */}
                <circle
                  cx="505"
                  cy="215"
                  r={activeBase === 'China' ? 24 : 14}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  opacity={activeBase === 'China' ? "0.6" : "0.3"}
                  className="animate-ping"
                  style={{ transformOrigin: '505px 215px', animationDuration: '3.5s' }}
                />
                {/* Radar Ring 2 */}
                <circle
                  cx="505"
                  cy="215"
                  r={activeBase === 'China' ? 14 : 9}
                  fill="#f59e0b"
                  fillOpacity={activeBase === 'China' ? "0.3" : "0.15"}
                  stroke="#d97706"
                  strokeWidth="2"
                />
                {/* Center Core */}
                <circle
                  cx="505"
                  cy="215"
                  r="6"
                  fill="#ffffff"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  filter="url(#glow)"
                />

                {/* Base Card Label Callout */}
                <rect
                  x="525"
                  y="180"
                  width="170"
                  height="46"
                  rx="8"
                  fill="#0c0a09"
                  stroke={activeBase === 'China' ? '#f59e0b' : '#292524'}
                  strokeWidth={activeBase === 'China' ? '2' : '1'}
                  className="shadow-xl"
                />
                <text x="535" y="196" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  OPTIMA STONE CHINA
                </text>
                <text x="535" y="208" fill="#a8a29e" fontSize="8.5" fontFamily="sans-serif">
                  Yunfu | 20+ Yrs Marble Mastery
                </text>
                <text x="535" y="219" fill="#38bdf8" fontSize="8" fontFamily="monospace">
                  22.93° N, 112.04° E
                </text>
              </g>

              {/* Map Scale & Legend Inset */}
              <g transform="translate(30, 500)">
                <rect width="180" height="70" rx="8" fill="#1c1917" opacity="0.85" stroke="#292524" />
                <text x="12" y="18" fill="#d6d3d1" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  PRODUCTION MAP LEGEND
                </text>
                <circle cx="20" cy="34" r="4" fill="#10b981" />
                <text x="32" y="37" fill="#a8a29e" fontSize="8.5" fontFamily="sans-serif">
                  Vietnam Primary Export Plant
                </text>
                <circle cx="20" cy="50" r="4" fill="#f59e0b" />
                <text x="32" y="53" fill="#a8a29e" fontSize="8.5" fontFamily="sans-serif">
                  Yunfu Natural Stone & CNC Hub
                </text>
              </g>
            </svg>

            {/* Hovered Port Floating Tooltip */}
            {hoveredPort && (
              <div className="absolute bottom-4 right-4 bg-stone-900 border border-amber-500/50 px-3 py-1.5 rounded-xl shadow-2xl text-xs text-amber-300 font-mono animate-fadeIn flex items-center gap-2">
                <Anchor className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Commercial Freight Gateway: {hoveredPort}</span>
              </div>
            )}
          </div>

          {/* Bottom Quick Indicator Strip */}
          <div className="relative z-10 grid grid-cols-2 gap-3 pt-3 border-t border-stone-800 text-xs">
            <div
              onClick={() => handleBaseChange('Vietnam')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                activeBase === 'Vietnam'
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Base 01 · Vietnam
                </span>
                <span className="font-semibold text-white text-xs sm:text-sm">
                  WHITEROCK Factory
                </span>
              </div>
              <span className="text-emerald-400 font-bold text-xs font-mono">0% Tariff</span>
            </div>

            <div
              onClick={() => handleBaseChange('China')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                activeBase === 'China'
                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                  Base 02 · China
                </span>
                <span className="font-semibold text-white text-xs sm:text-sm">
                  OPTIMA STONE (Yunfu)
                </span>
              </div>
              <span className="text-amber-400 font-bold text-xs font-mono">20+ Yrs</span>
            </div>
          </div>
        </div>

        {/* Right Side (Col 8-12): Deep-Dive Active Base Intelligence Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Top Badge & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  activeBase === 'Vietnam'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                }`}
              >
                <Factory className="w-3.5 h-3.5" />
                <span>{currentBaseInfo.role}</span>
              </span>

              <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800">
                {currentBaseInfo.coordinates.lat}, {currentBaseInfo.coordinates.lng}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {currentBaseInfo.name}
            </h3>
            <p className="text-xs text-amber-400 font-medium font-sans">
              {currentBaseInfo.chineseName}
            </p>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
              {currentBaseInfo.description}
            </p>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800">
            <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800/80 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">
                Production Floor
              </span>
              <p className="text-lg font-serif font-bold text-white">
                {currentBaseInfo.area}
              </p>
            </div>

            <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800/80 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">
                Published Annual Capacity
              </span>
              <p className="text-lg font-serif font-bold text-amber-400">
                {currentBaseInfo.annualCapacity}
              </p>
            </div>

            <div className="col-span-2 bg-stone-950/90 p-3.5 rounded-2xl border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tariff & Origin Status: {currentBaseInfo.tariffStatus}</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                {currentBaseInfo.tariffHighlight}
              </p>
            </div>
          </div>

          {/* Core Equipment & Fabrication Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Workshop Machinery Highlights</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {currentBaseInfo.equipmentHighlights.map((eq, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ocean Shipping & Freight Transit Time Matrix */}
          <div className="space-y-3 bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-sky-400" />
                <span>Ocean Freight Port & Transit Times</span>
              </h4>
              <span className="text-[10px] font-mono text-stone-400">ISPM-15 Crating</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {currentBaseInfo.oceanTransitTimes.map((tt, idx) => (
                <div key={idx} className="bg-stone-900/90 p-2 rounded-xl border border-stone-800/80 space-y-0.5">
                  <span className="text-[10px] text-stone-400 block truncate font-medium">
                    {tt.destination}
                  </span>
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {tt.duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-stone-400 pt-1 flex items-start gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
              <span>
                Export Gateways: {currentBaseInfo.shippingPorts.join(' | ')}
              </span>
            </div>
          </div>

          {/* Compliance & Export Certifications */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {currentBaseInfo.complianceDocs.map((doc, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950 text-[10px] font-medium text-stone-300 border border-stone-800"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{doc}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
