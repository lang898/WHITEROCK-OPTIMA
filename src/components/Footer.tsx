import React from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  Download,
  Building,
  CheckCircle2
} from 'lucide-react';
import { siteConfig, resources } from '../data';
import type { LocaleConfig } from '../types';

interface FooterProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale, setCurrentTab }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-stone-800/80 bg-stone-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100">Vietnam Primary Base</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                20,000 m² factory in Dong Nai with 100,000+ m² capacity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100">Rigorous Quality Checks</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Incoming slab checks, CNC tolerance & pre-shipment AQL review.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100">Full Export Compliance</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Silica safety guidance, Prop 65 compliance & fumigated crates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100">Sample Approval Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Express physical color chips & custom vanity prototypes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-950 font-black flex items-center justify-center font-serif text-base shadow">
                {currentLocale.brandMark}
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white">
                  {currentLocale.brand}
                </span>
                <p className="text-xs text-stone-400 uppercase tracking-wider">
                  {currentLocale.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-6">
              Leading B2B stone surfaces manufacturer based in Vietnam, supplying premium engineered quartz, natural marble, granite countertops, bathroom vanity tops, and custom architectural cut-to-size programs for global builders, hospitality developers, and distributor networks.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-stone-300">
                  {siteConfig.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-300">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${siteConfig.telHref}`} className="hover:text-amber-300">
                  {siteConfig.tel} (WhatsApp Available)
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-semibold text-stone-100 text-sm tracking-wide mb-4">
              Products & Colors
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-amber-300">
                  Single & Double Vanity Tops
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-amber-300">
                  Kitchen Countertops & Islands
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-amber-300">
                  Round & Outdoor Stone Tables
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('colors')} className="hover:text-amber-300">
                  24 Standard Material Colors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('finishes')} className="hover:text-amber-300">
                  Edge Profiles & Surface Finishes
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('applications')} className="hover:text-amber-300">
                  Application Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Manufacturing & Program */}
          <div>
            <h4 className="font-semibold text-stone-100 text-sm tracking-wide mb-4">
              Manufacturing & QC
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentTab('factory')} className="hover:text-amber-300">
                  Vietnam 20,000 m² Facility
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('factory')} className="hover:text-amber-300">
                  CNC & Bridge Saw Processing
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('factory')} className="hover:text-amber-300">
                  Pre-shipment QC & Crate Packaging
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('partners')} className="hover:text-amber-300">
                  Distributor & Builder Program
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('factory')} className="hover:text-amber-300">
                  Yunfu, China Support Base
                </button>
              </li>
            </ul>
          </div>

          {/* Download Resources */}
          <div>
            <h4 className="font-semibold text-stone-100 text-sm tracking-wide mb-4">
              Technical Resources
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {resources.slice(0, 5).map((res, i) => (
                <li key={i}>
                  <a
                    href={`#${res.file}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentTab('resources');
                    }}
                    className="inline-flex items-center gap-1.5 hover:text-amber-300"
                  >
                    <Download className="w-3 h-3 text-stone-500" />
                    <span>{res.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentTab('resources')}
                  className="text-amber-400 hover:underline mt-1 inline-block"
                >
                  View All Downloads &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Regulatory Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} {currentLocale.legalName}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-stone-400">
            <span>Primary Manufacturing Base: Vietnam</span>
            <span>|</span>
            <span>Secondary Support: Yunfu, China</span>
            <span>|</span>
            <button onClick={() => setCurrentTab('resources')} className="hover:text-stone-200">
              Silica Safety & Prop 65 Notice
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
