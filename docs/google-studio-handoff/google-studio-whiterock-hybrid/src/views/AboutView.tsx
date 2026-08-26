import React from 'react';
import {
  Building2,
  ShieldCheck,
  Award,
  Globe2,
  CheckCircle2,
  Gem,
  Factory,
  Layers,
  ArrowRight,
  Sparkles,
  Compass,
  FileCheck,
  Ship,
  MapPin,
  Users,
  Calendar,
  Check
} from 'lucide-react';
import { siteConfig, company, factory } from '../data';
import type { LocaleConfig } from '../types';

interface AboutViewProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
  onOpenWeChat?: () => void;
  onOpenShareModal?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLocale,
  setCurrentTab,
  onOpenWeChat,
  onOpenShareModal,
}) => {
  const milestones = [
    {
      year: '2000s',
      title: 'Foundation & Craftsmanship Roots',
      desc: 'Established natural stone fabrication operations under Optima Marble & Granite in Yunfu, specializing in high-end natural marble carving, waterjet inlays, and architectural projects.'
    },
    {
      year: '2015',
      title: 'North American Expansion',
      desc: 'Formed strategic partnerships with major US/Canadian multi-family developers, supplying prefabricated quartz and granite vanity tops with cUPC certified pre-mounted sinks.'
    },
    {
      year: '2020',
      title: 'Vietnam Modern Plant Commissioning',
      desc: 'Established WHITEROCK COMPANY LIMITED (Công Ty TNHH Whiterock) in Binh Phuoc Province, Vietnam with a 20,000 m² modern fabrication facility to provide 0% US Section 301 tariff benefits.'
    },
    {
      year: 'Present',
      title: 'Global Direct Stone Group',
      desc: 'Operating at 100,000+ m² annual capacity, serving luxury hotels, multi-family high-rises, commercial towers, and distributor networks across North America, Europe, and Asia-Pacific.'
    }
  ];

  const corePillars = [
    {
      icon: <Factory className="w-6 h-6 text-emerald-600" />,
      title: '20,000 m² Vietnam Facility',
      desc: 'Independent export manufacturing plant in Binh Phuoc Province, Vietnam equipped with automated infrared bridge saws, multi-spindle edge polishers, and 5-axis CNC machining centers.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: '0% US Section 301 Tariff',
      desc: '100% compliant with Substantial Transformation rules. Verified Form B Certificate of Origin (C/O) documentation issued by Vietnam trade authorities for seamless US customs clearance.'
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: '20+ Years Stone Mastery',
      desc: 'Decades of profound stone fabrication expertise spanning natural marble, granite, quartz, porcelain slabs, waterjet medallions, and hand-carved architectural fireplace mantels.'
    },
    {
      icon: <Globe2 className="w-6 h-6 text-sky-600" />,
      title: 'Direct Global Quarry Sourcing',
      desc: 'Direct block procurement from world-renowned quarries in Italy (Carrara, Statuario), Greece, Turkey, Brazil, and Vietnam, ensuring consistent veining, competitive pricing, and uninterrupted supply.'
    }
  ];

  const capabilities = [
    'Prefabricated bathroom vanity tops with factory-installed cUPC porcelain sinks',
    'Custom kitchen countertops & waterfall islands with 45° mitered vein flow',
    'Luxury indoor & outdoor stone furniture (dining, coffee & hospitality tables)',
    'Intricate 5-axis CNC waterjet medallions and decorative floor borders',
    'Hand-carved architectural marble fireplace mantels and hearths',
    'Commercial cut-to-size dimensional stone, thresholds, shower curbs & window sills',
    'Free CAD/DXF shop drawing drafting and automated take-off estimation',
    'ISPM-15 heat-treated heavy-duty export wood crates with barcode labeling'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
      
      {/* ========================================================================= */}
      {/* Hero Header */}
      {/* ========================================================================= */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold shadow-2xs">
          <Gem className="w-3.5 h-3.5 text-amber-700" />
          <span className="tech-badge">WHITEROCK MARBLE & GRANITE • COMPANY PROFILE</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
          Over 20 Years of Stone Mastery.
          <br />
          <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-[#1d1d1f] bg-clip-text text-transparent">
            Direct Vietnam Manufacturing Power.
          </span>
        </h1>
        
        <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-3xl mx-auto">
          Whiterock Marble & Granite (Công Ty TNHH Whiterock) is a leading natural stone and engineered quartz manufacturer based in Binh Phuoc Province, Vietnam. We deliver precision countertops, vanity tops, stone furniture, and architectural stonework for North American and global commercial developments.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* Dual Facility & Global Network Hero Card */}
      {/* ========================================================================= */}
      <div className="apple-card p-6 sm:p-12 bg-white border border-black/[0.08] shadow-sm rounded-3xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider">
                OUR STORY & LEGACY
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
                Craftsmanship Meets Industrial Precision
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              With roots dating back to the early 2000s in stone carving and processing centers, our founders established Whiterock with a singular vision: to bring authentic natural stone beauty and high-precision engineered surfaces to global architectural projects with uncompromising quality and direct factory pricing.
            </p>

            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              In 2020, to better serve North American clients facing Section 301 tariffs, we expanded with our modern <strong>20,000 m² standalone manufacturing plant in Binh Phuoc Province, Vietnam</strong>. Today, our dual-hub synergy combines Vietnam’s tariff-free export efficiency with 20+ years of artisanal stone carving and waterjet technology.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/[0.06]">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">20,000 <span className="text-sm font-normal text-[#86868b]">m²</span></div>
                <div className="text-xs text-[#86868b] mt-0.5">Vietnam Plant Area</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">100,000+ <span className="text-sm font-normal text-[#86868b]">m²/yr</span></div>
                <div className="text-xs text-[#86868b] mt-0.5">Annual Output Capacity</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-md aspect-16/10 relative group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="WHITEROCK Vietnam Factory Floor"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-sm font-bold flex items-center gap-2">
                    <Factory className="w-4 h-4 text-emerald-400" />
                    <span>WHITEROCK VIETNAM PLANT</span>
                  </div>
                  <p className="text-xs text-white/80">
                    Quốc Lộ 14, Đội 2, Ấp 3, Xã Đồng Tiến, Huyện Đồng Phú, Tỉnh Bình Phước, Vietnam
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6e6e73] px-2">
              <span>Legal Name: <strong>{siteConfig.legalName}</strong></span>
              <span className="text-emerald-700 font-bold">0% US Section 301 Tariff</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 Core Pillars */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-[#86868b] font-semibold tracking-wider">
            WHY ARCHITECTS & DEVELOPERS CHOOSE US
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
            The Whiterock Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((p, i) => (
            <div key={i} className="apple-card p-6 bg-white border border-black/[0.06] rounded-2xl shadow-2xs space-y-4 hover:border-black/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Comprehensive Capabilities Checklist */}
      {/* ========================================================================= */}
      <div className="apple-card p-8 sm:p-12 bg-gradient-to-br from-[#111113] to-[#1f1f23] text-white rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FULL-SCOPE FABRICATION & TURNKEY EXPORT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            One Direct Manufacturing Partner for All Your Commercial Stone Requirements
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            From initial architectural CAD take-offs and custom finish matching to factory cUPC sink mounting and overseas container delivery to your jobsite or distribution warehouse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{cap}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={() => setCurrentTab('products')}
              className="px-6 py-3.5 rounded-full bg-white text-[#111113] hover:bg-neutral-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span>Explore 6 Product Lines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentTab('contact')}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Request Factory Direct Quote
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Company Timeline */}
      {/* ========================================================================= */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase text-[#86868b] font-semibold tracking-wider">
            20+ YEARS JOURNEY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
            Key Milestones in Our Growth
          </h2>
        </div>

        <div className="relative border-l-2 border-amber-200/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-amber-600 shadow-xs"></div>
              
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold font-mono">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-[#1d1d1f]">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Official Factory Contact & Location Card */}
      {/* ========================================================================= */}
      <div className="apple-card p-6 sm:p-10 bg-white border border-black/[0.08] shadow-sm rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#1d1d1f]">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>VIETNAM FACTORY ADDRESS</span>
            </div>
            <p className="text-xs text-[#6e6e73] leading-relaxed">
              {siteConfig.address}
              <br />
              <span className="text-[#86868b]">Postcode: {siteConfig.zip} • Port: {siteConfig.port}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#1d1d1f]">
              <Ship className="w-4 h-4 text-sky-600" />
              <span>DIRECT EXPORT DESK</span>
            </div>
            <p className="text-xs text-[#6e6e73] leading-relaxed">
              Email: <strong>{siteConfig.email}</strong>
              <br />
              Tel: <strong>{siteConfig.tel}</strong> (WhatsApp / Calls)
            </p>
          </div>

          <div className="space-y-2 flex flex-col justify-center items-center md:items-start">
            <div className="text-xs font-bold text-[#1d1d1f]">
              INSTANT FACTORY INQUIRY
            </div>
            <p className="text-xs text-[#6e6e73] mb-2">
              Direct communication in English, Vietnamese, and Chinese.
            </p>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-5 py-2 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold cursor-pointer shadow-sm transition-all"
            >
              Contact Sales Team
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
