import React from 'react';
import {
  X,
  Plus,
  Layers,
  FileText,
  Sparkles,
  Download,
  Check,
  Package
} from 'lucide-react';
import type { ColorItem } from '../types';

interface ColorModalProps {
  color: ColorItem | null;
  onClose: () => void;
  onRequestSample: (color: ColorItem) => void;
}

export const ColorModal: React.FC<ColorModalProps> = ({
  color,
  onClose,
  onRequestSample,
}) => {
  if (!color) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl shadow-2xl text-stone-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              {color.material}
            </span>
            <h3 className="font-bold text-lg text-white">
              {color.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Swatch Image */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-950 border border-stone-800 group shadow-inner">
                <img
                  src={color.swatchImage}
                  alt={color.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23292524"/><circle cx="200" cy="200" r="140" fill="%2344403c" stroke="%2378716c" stroke-width="2"/><text x="50%25" y="48%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="18" font-weight="bold">${color.name}</text><text x="50%25" y="58%25" dominant-baseline="middle" text-anchor="middle" fill="%23a8a29e" font-family="sans-serif" font-size="13">${color.material} - ${color.colorFamily}</text></svg>`;
                  }}
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-semibold text-stone-300 border border-stone-700">
                  {color.colorFamily} Palette
                </div>
                {color.caption && (
                  <div className="absolute bottom-2 inset-x-2 text-center text-[10px] text-stone-400 bg-stone-950/80 py-0.5 rounded">
                    {color.caption}
                  </div>
                )}
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {color.description}
              </p>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                  Available Finishes
                </span>
                <div className="flex flex-wrap gap-2">
                  {color.finishes.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 text-xs border border-stone-700 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                  Standard Thicknesses
                </span>
                <div className="flex flex-wrap gap-2">
                  {color.thicknesses.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-stone-800 text-amber-300 text-xs border border-stone-700 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                  Available Sizing & Formats
                </span>
                <ul className="text-xs text-stone-300 space-y-1">
                  {color.sizes.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {color.relatedProducts && color.relatedProducts.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                    Recommended Applications
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {color.relatedProducts.map((p, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-stone-950 text-stone-300 text-[11px] border border-stone-800"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {color.techSheetPdf && (
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Technical Sheet PDF</span>
                  </div>
                  <a
                    href={`#${color.techSheetPdf}`}
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading Technical Sheet for ${color.name}...`);
                    }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            Physical Sample Format: <strong className="text-stone-200">4 x 4 in (10 x 10 cm) Chip</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRequestSample(color);
                onClose();
              }}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Package className="w-3.5 h-3.5" />
              Add Color Chip to Sample Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
