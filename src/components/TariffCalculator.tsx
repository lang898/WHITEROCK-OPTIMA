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
      routeCn: 'Yunfu Plant -> Shenzhen / Nansha Port'
    },
    kitchen: {
      name: 'Cut-to-Size Kitchen Countertops & Islands',
      pcsPerContainer: '180 - 240 units / 500-700 m²',
      typicalCrates: '12 - 16 Heavy A-Frames',
      weightPerCrate: 'approx. 1,500 kg',
      leadTimeVn: '30 - 40 days',
      leadTimeCn: '30 - 35 days',
      routeVn: 'Vietnam Base -> Cat Lai Port -> Direct Ocean Vessel',
      routeCn: 'Yunfu Base -> Export Port'
    },
    slabs: {
      name: 'Jumbo Engineered Quartz / Marble Slabs',
      pcsPerContainer: '56 - 70 Jumbo Slabs (3200x1600mm 2cm)',
      typicalCrates: '7 Bundles / A-Frames',
      weightPerCrate: 'approx. 3,800 kg per bundle',
      leadTimeVn: '20 - 30 days',
      leadTimeCn: '20 - 25 days',
      routeVn: 'Vietnam Slabs -> Container Ocean Line',
      routeCn: 'China Direct Slabs'
    },
    furniture: {
      name: 'Stone Furniture (Marble Coffee & Dining Tables)',
      pcsPerContainer: '120 - 200 table sets',
      typicalCrates: 'Individual Drop-Tested Carton + Plywood Crate',
      weightPerCrate: 'approx. 80 - 180 kg/pc',
      leadTimeVn: '35 - 45 days',
      leadTimeCn: '30 - 40 days',
      routeVn: 'Vietnam Assembly -> Export',
      routeCn: 'Yunfu Craft Base -> Export'
    }
  };

  const currentProd = productData[productType];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <Percent className="w-3.5 h-3.5" />
            <span>Dual-Base Supply Chain & US Section 301 Tariff Optimizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Vietnam 0% US Tariff Advantage & Container Savings Calculator
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            Compare cost structures between our <strong>Vietnam Main Export Base (0% US Tariff)</strong> and <strong>China Strategic Craft Base</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-950 p-2 rounded-2xl border border-stone-800 text-xs">
          <span className="text-stone-400 pl-2">Destination:</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value as any)}
            className="bg-stone-900 text-amber-300 font-semibold px-3 py-1.5 rounded-xl border border-stone-700 outline-none cursor-pointer"
          >
            <option value="usa">United States (0% vs 25% Sec 301)</option>
            <option value="canada">Canada (Standard MFN)</option>
            <option value="europe">European Union (Form A / REX)</option>
            <option value="australia">Australia (AANZFTA)</option>
          </select>
        </div>
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-stone-950 p-6 rounded-2xl border border-stone-800">
          <h3 className="font-bold text-sm text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Project Estimation Inputs</span>
          </h3>

          {/* Product Category */}
          <div className="space-y-1.5">
            <label className="text-xs text-stone-400 font-medium">Product Category:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setProductType('vanity')}
                className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  productType === 'vanity'
                    ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                    : 'border-stone-800 bg-stone-900 text-stone-300'
                }`}
              >
                Bathroom Vanity Tops
              </button>
              <button
                onClick={() => setProductType('kitchen')}
                className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  productType === 'kitchen'
                    ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                    : 'border-stone-800 bg-stone-900 text-stone-300'
                }`}
              >
                Kitchen Countertops
              </button>
              <button
                onClick={() => setProductType('slabs')}
                className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  productType === 'slabs'
                    ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                    : 'border-stone-800 bg-stone-900 text-stone-300'
                }`}
              >
                Jumbo Slabs
              </button>
              <button
                onClick={() => setProductType('furniture')}
                className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  productType === 'furniture'
                    ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                    : 'border-stone-800 bg-stone-900 text-stone-300'
                }`}
              >
                Stone Furniture
              </button>
            </div>
          </div>

          {/* Quantity of 40HQ Containers */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-300">
              <span>Order Volume (40HQ Containers):</span>
              <span className="font-mono text-amber-400 font-bold">{estimatedContainers} Containers</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={estimatedContainers}
              onChange={(e) => setEstimatedContainers(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>1 FCL (Trial)</span>
              <span>5 FCL (Hotel)</span>
              <span>10 FCL</span>
              <span>20+ FCL (Annual Program)</span>
            </div>
          </div>

          {/* Average FOB Value per Container */}
          <div className="space-y-1.5">
            <label className="text-xs text-stone-400 font-medium flex justify-between">
              <span>Estimated FOB Value / 40HQ ($ USD):</span>
              <span className="text-amber-400 font-mono font-bold">${orderValuePerContainer.toLocaleString()}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[28000, 38000, 48000].map((val) => (
                <button
                  key={val}
                  onClick={() => setOrderValuePerContainer(val)}
                  className={`py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    orderValuePerContainer === val
                      ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                      : 'border-stone-800 bg-stone-900 text-stone-400'
                  }`}
                >
                  ${(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Results & Logistics Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          {/* Main Savings Highlight Card */}
          <div className="bg-gradient-to-br from-emerald-950/40 via-stone-950 to-stone-950 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                <span>Estimated Direct Tariff Savings via Vietnam Base</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                0% US DUTY
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-serif font-black text-emerald-400">
                ${estimatedSavings.toLocaleString()}
              </span>
              <span className="text-xs text-stone-400">
                Saved on {estimatedContainers} × 40HQ (${totalOrderValue.toLocaleString()} FOB total)
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed border-t border-emerald-500/20 pt-3">
              By manufacturing at <strong>WHITEROCK's Vietnam 20,000 m² facility</strong> in Dong Nai, US importers avoid the <strong>25% Section 301 punitive tariff</strong>, generating direct bottom-line margin expansion with certified Certificate of Origin (C/O).
            </p>
          </div>

          {/* Container Loadability & Logistics Card */}
          <div className="bg-stone-950 rounded-2xl p-5 border border-stone-800 space-y-3 text-xs">
            <div className="font-bold text-stone-100 flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-sky-400" />
                <span>40HQ Logistics & Packaging Specs for {currentProd.name}</span>
              </span>
              <span className="text-sky-400 font-mono">{currentProd.pcsPerContainer}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-stone-300">
              <div>
                <span className="text-stone-500 block">Export Packaging:</span>
                <strong>{currentProd.typicalCrates}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Total Gross Weight:</span>
                <strong>{currentProd.weightPerCrate} (Max 26.5 Tons)</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Vietnam Production Lead Time:</span>
                <span className="text-emerald-400 font-semibold">{currentProd.leadTimeVn}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Loading Port:</span>
                <span>Cat Lai Port, Ho Chi Minh City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
