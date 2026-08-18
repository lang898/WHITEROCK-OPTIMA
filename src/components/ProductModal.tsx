import React from 'react';
import {
  X,
  Plus,
  Package,
  Layers,
  FileText,
  Clock,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Download
} from 'lucide-react';
import type { ProductItem } from '../types';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl shadow-2xl text-stone-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              {product.sku}
            </span>
            <h3 className="font-bold text-lg text-white truncate max-w-md">
              {product.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual & Media */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if asset path not yet physically placed
                    const target = e.currentTarget;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="%231c1917"/><rect x="40" y="40" width="520" height="370" rx="12" fill="%23292524" stroke="%2344403c" stroke-width="2"/><text x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="20" font-weight="bold">${product.sku}</text><text x="50%25" y="55%25" dominant-baseline="middle" text-anchor="middle" fill="%23a8a29e" font-family="sans-serif" font-size="14">${product.category}</text><text x="50%25" y="85%25" dominant-baseline="middle" text-anchor="middle" fill="%2378716c" font-family="sans-serif" font-size="11">WHITEROCK VIETNAM FACTORY</text></svg>`;
                  }}
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-stone-700">
                  {product.material}
                </div>
                {product.isIllustrative && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] text-stone-400">
                    Illustrative render
                  </div>
                )}
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                {product.description}
              </p>

              {product.techSheetPdf && (
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Technical Specification PDF</span>
                  </div>
                  <a
                    href={`#${product.techSheetPdf}`}
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading technical spec sheet for ${product.sku}...`);
                    }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              )}
            </div>

            {/* Specifications Matrix */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Technical Specification Table
              </h4>

              <div className="bg-stone-950 rounded-xl border border-stone-800 overflow-hidden divide-y divide-stone-800/80 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2.5">
                    <span className="text-stone-400 font-medium">{key}</span>
                    <span className="col-span-2 text-stone-100 font-normal">{val}</span>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="p-3.5 bg-stone-950/70 border border-stone-800/80 rounded-xl space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2 font-medium text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Factory Customization & OEM Support</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Support custom undermount sinks, faucet drillings, matching 4-inch backsplashes, side splashes, custom edge profiles, and private-label barcode inner carton packaging.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-4">
          <div className="text-xs text-stone-400">
            <span>Standard Program MOQ: </span>
            <strong className="text-stone-200">{product.specs.MOQ || '10-20 pcs'}</strong>
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
                onAddToCart(product);
                onClose();
              }}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add to RFQ & Sample Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
