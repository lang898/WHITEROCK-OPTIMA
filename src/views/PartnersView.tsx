import React from 'react';
import {
  Handshake,
  CheckCircle2,
  Package,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  Send,
  Building,
  FileSpreadsheet
} from 'lucide-react';
import { partners, siteConfig } from '../data';
import type { LocaleConfig } from '../types';

interface PartnersViewProps {
  setCurrentTab: (tab: string) => void;
  currentLocale: LocaleConfig;
}

export const PartnersView: React.FC<PartnersViewProps> = ({
  setCurrentTab,
  currentLocale,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Handshake className="w-3.5 h-3.5" />
          <span>B2B Distributor & Builder Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Trade Partner Program & Direct Factory Supply
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          {partners.intro}
        </p>
      </div>

      {/* Program Core Parameters Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Flexible MOQs</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Standard vanity tops start at <strong>10–20 pcs</strong> per SKU. Mixed-SKU container loading supported for warehouse consolidation.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Lead Times</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Sample chips dispatch within <strong>7–15 days</strong>. Production orders complete in <strong>25–55 days</strong> based on drawing sign-off.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">OEM / Private Label</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Custom inner carton branding, UPC/EAN barcode labeling, branded instruction sheets, and custom corner guard configurations.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Export Crate Standards</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Heavy-duty solid fumigated plywood crates with EPE foam buffers, plastic banding, and moisture barrier wrap for ocean freight.
          </p>
        </div>
      </div>

      {/* Target Partner Profiles */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Who We Serve
          </span>
          <h2 className="text-2xl font-serif font-bold text-white">
            Customized Solutions by Industry Sector
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800/80 space-y-3">
            <h4 className="font-bold text-white text-base">Regional Distributors</h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Repeat container program discounts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Showroom sample tower & box sets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Exclusive regional color protections</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800/80 space-y-3">
            <h4 className="font-bold text-white text-base">Multi-Family Builders</h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unit-by-unit BOQ cut-to-size kits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pre-drilled faucet & undermount sink assembly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Staggered phased jobsite deliveries</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800/80 space-y-3">
            <h4 className="font-bold text-white text-base">Hospitality Contractors</h4>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom reception desk & bar counter miters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ADA-compliant sink clearances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mock-up room sample approval service</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Direct Partner Action CTA */}
      <section className="text-center bg-stone-950 border border-stone-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-2xl font-serif font-bold text-white">
          Apply For a Trade Account or Request a Sample Box
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
          Get direct factory pricing lists, container loading calculations, and sample dispatch coordination.
        </p>
        <button
          onClick={() => setCurrentTab('contact')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
        >
          Submit Trade Application
        </button>
      </section>
    </div>
  );
};
