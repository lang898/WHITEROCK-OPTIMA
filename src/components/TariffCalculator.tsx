import React, { useState } from 'react';
import {
  ShieldCheck,
  Percent,
  Calculator,
  Ship,
  TrendingDown,
  Clock,
  Box,
  MapPin,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import type { LocaleConfig } from '../types';

interface TariffCalculatorProps {
  currentLocale?: LocaleConfig;
  onStartRfq?: () => void;
}

export const TariffCalculator: React.FC<TariffCalculatorProps> = ({
  currentLocale,
  onStartRfq
}) => {
  const [productType, setProductType] = useState<'vanity' | 'kitchen' | 'slabs' | 'furniture'>('vanity');
  const [estimatedContainers, setEstimatedContainers] = useState<number>(2);
  const [orderValuePerContainer, setOrderValuePerContainer] = useState<number>(38000);
  const [destination, setDestination] = useState<'usa' | 'canada' | 'europe' | 'australia'>('usa');

  // Rates
  const chinaTariffRate = destination === 'usa' ? 0.25 : 0.05; // 25% Section 301 for US
  const vietnamTariffRate = 0.0; // 0% with C/O Form AJ/AK/B2B for qualified exports

  const totalOrderValue = estimatedContainers * orderValuePerContainer;
  const chinaTariffCost = totalOrderValue * chinaTariffRate;
  const vietnamTariffCost = totalOrderValue * vietnamTariffRate;
  const estimatedSavings = chinaTariffCost - vietnamTariffCost;

  const productData = {
    vanity: {
      name: 'Prefab Bathroom Vanity Tops (24"-73")',
      pcsPerContainer: '240 - 320 pcs (40HQ)',
      typicalCrates: '14 - 18 Plywood Crates',
      weightPerCrate: 'approx. 1,200 - 1,450 kg',
      leadTimeVn: '25 - 35 days',
      leadTimeCn: '25 - 30 days',
      routeVn: 'Dong Nai Plant -> Cat Lai Port (HCMC) -> US West/East Coast',
      routeCn: 'Standard China Stone Origin (Subject to 25% Section 301)'
    },
    kitchen: {
      name: 'Cut-to-Size Kitchen Countertops & Islands',
      pcsPerContainer: '180 - 240 units / 500-700 m²',
      typicalCrates: '12 - 16 Heavy A-Frames',
      weightPerCrate: 'approx. 1,500 kg',
      leadTimeVn: '30 - 40 days',
      leadTimeCn: '30 - 35 days',
      routeVn: 'Vietnam Base -> Cat Lai Port -> Direct Ocean Vessel',
      routeCn: 'Standard China Stone Origin (Subject to 25% Section 301)'
    },
    slabs: {
      name: 'Jumbo Engineered Quartz / Marble Slabs',
      pcsPerContainer: '56 - 70 Jumbo Slabs (3200x1600mm 2cm)',
      typicalCrates: '7 Bundles / A-Frames',
      weightPerCrate: 'approx. 3,800 kg per bundle',
      leadTimeVn: '20 - 30 days',
      leadTimeCn: '20 - 25 days',
      routeVn: 'Vietnam Slabs -> Container Ocean Line',
      routeCn: 'Standard China Slabs (25% Section 301)'
    },
    furniture: {
      name: 'Stone Furniture (Marble Coffee & Dining Tables)',
      pcsPerContainer: '120 - 200 table sets',
      typicalCrates: 'Individual Drop-Tested Carton + Plywood Crate',
      weightPerCrate: 'approx. 80 - 180 kg/pc',
      leadTimeVn: '35 - 45 days',
      leadTimeCn: '30 - 40 days',
      routeVn: 'Vietnam Assembly -> Export Direct',
      routeCn: 'Standard China Origin (25% Section 301)'
    }
  };

  const currentProd = productData[productType];

  return (
    <div className="apple-card p-6 sm:p-10 space-y-8 text-[#1d1d1f]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Percent className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tech-badge">VIETNAM DIRECT SUPPLY CHAIN & US SECTION 301 TARIFF CALCULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
            Vietnam 0% US Tariff Advantage & Landed Cost Savings
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl">
            Compare landed cost importing directly from <strong>WHITEROCK Surfaces Vietnam (0% Section 301 Duty)</strong> vs. traditional China stone tariffs (25% Section 301).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Form B C/O Verified</span>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1d1d1f] block">
              Destination Market
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'usa', label: 'United States (25% Section 301 vs 0% Vietnam)' },
                { id: 'canada', label: 'Canada (Standard MFN)' },
                { id: 'europe', label: 'Europe (EUR1 / EVFTA Direct)' },
                { id: 'australia', label: 'Australia (AANZFTA 0%)' }
              ].map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setDestination(dest.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    destination === dest.id
                      ? 'bg-[#111113] text-white shadow-xs font-semibold'
                      : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
                  }`}
                >
                  {dest.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1d1d1f] block">
              Stone Product Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'vanity', label: 'Prefab Vanity Tops' },
                { id: 'kitchen', label: 'Kitchen Countertops' },
                { id: 'slabs', label: 'Jumbo Slabs' },
                { id: 'furniture', label: 'Stone Furniture' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProductType(p.id as any)}
                  className={`p-3 rounded-2xl text-xs font-medium text-center border transition-all cursor-pointer ${
                    productType === p.id
                      ? 'bg-[#111113] text-white border-transparent shadow-xs font-semibold'
                      : 'bg-white text-[#6e6e73] border-black/[0.08] hover:border-black/20 hover:text-[#1d1d1f]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fbfbfd] p-5 rounded-2xl border border-black/[0.06]">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#86868b] font-medium">Containers (40HQ):</span>
                <strong className="text-[#1d1d1f] font-mono text-sm">{estimatedContainers} FCL</strong>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={estimatedContainers}
                onChange={(e) => setEstimatedContainers(Number(e.target.value))}
                className="w-full accent-[#111113] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b]">
                <span>1 Container</span>
                <span>20 Containers</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#86868b] font-medium">FOB Value / Container:</span>
                <strong className="text-[#1d1d1f] font-mono text-sm">${orderValuePerContainer.toLocaleString()} USD</strong>
              </div>
              <input
                type="range"
                min="20000"
                max="80000"
                step="1000"
                value={orderValuePerContainer}
                onChange={(e) => setOrderValuePerContainer(Number(e.target.value))}
                className="w-full accent-[#111113] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b]">
                <span>$20k</span>
                <span>$80k</span>
              </div>
            </div>
          </div>

          {/* Container Logistics Data Box */}
          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2 text-xs">
            <div className="tech-badge text-[#86868b]">
              CONTAINER PAYLOAD MATRIX • 40HQ SPECIFICATION
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <span className="text-[#86868b] text-[11px] block">Capacity / 40HQ:</span>
                <strong className="text-[#1d1d1f]">{currentProd.pcsPerContainer}</strong>
              </div>
              <div>
                <span className="text-[#86868b] text-[11px] block">Crating:</span>
                <strong className="text-[#1d1d1f]">{currentProd.typicalCrates}</strong>
              </div>
              <div>
                <span className="text-[#86868b] text-[11px] block">Lead Time:</span>
                <strong className="text-emerald-700">{currentProd.leadTimeVn}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Financial Comparison Card (Apple Keynote Dark Card) */}
        <div className="lg:col-span-5 flex flex-col justify-between apple-card-dark rounded-3xl p-6 sm:p-8 text-white space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="tech-badge text-amber-300">
                LANDED DUTY ANALYSIS
              </span>
              <span className="text-xs font-mono text-[#a1a1a6]">
                TOTAL FOB: ${totalOrderValue.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="text-xs text-[#a1a1a6] block">China Origin Import Duty:</span>
                  <span className="text-sm font-bold text-rose-400">25% US Section 301</span>
                </div>
                <div className="text-right font-mono font-bold text-base text-rose-300">
                  +${chinaTariffCost.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div>
                  <span className="text-xs text-emerald-300 block">Vietnam Origin Import Duty:</span>
                  <span className="text-sm font-bold text-emerald-400">0% Form B C/O Verified</span>
                </div>
                <div className="text-right font-mono font-bold text-base text-emerald-300">
                  $0.00
                </div>
              </div>
            </div>

            {/* Total Tariff Savings Headline */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-stone-900 border border-emerald-500/40 text-center space-y-1">
              <span className="tech-badge text-emerald-400 block">
                DIRECT TARIFF SAVINGS (0% VS 25%)
              </span>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-300 font-mono">
                ${estimatedSavings.toLocaleString()} USD
              </div>
              <p className="text-[11px] text-[#a1a1a6]">
                Pure cash savings retained by sourcing direct from WHITEROCK Vietnam.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onStartRfq}
              className="w-full py-4 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get 0% Tariff Container Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-[10px] text-center text-[#86868b]">
              Includes full container load optimization & Form B documentation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
