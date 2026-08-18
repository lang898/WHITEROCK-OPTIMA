import React, { useState } from 'react';
import {
  X,
  Trash2,
  Send,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import type { RfqCartItem } from '../types';
import { siteConfig, colors, edges } from '../data';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: RfqCartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    destinationPort: '',
    projectType: 'Commercial / Hospitality',
    targetTimeline: 'Within 30–60 days',
    customNotes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission to inquiry system
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    if (isSuccess) {
      onClearCart();
      setIsSuccess(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl shadow-2xl text-stone-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                RFQ & Sample Kit Request
              </h3>
              <p className="text-xs text-stone-400">
                Direct quotation from WHITEROCK Vietnam factory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Inquiry Successfully Submitted!
              </h4>
              <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || 'Valued Partner'}</strong>. Our Vietnam engineering and export team has received your project parameters and will prepare an itemized factory quotation within 1 business day.
              </p>
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-400 max-w-md mx-auto text-left space-y-1.5">
                <div><strong>Direct Factory Hotline:</strong> {siteConfig.tel}</div>
                <div><strong>Export Department Email:</strong> {siteConfig.email}</div>
                <div><strong>Factory Base:</strong> Dong Nai Province, Vietnam</div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-sm transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-stone-200 uppercase tracking-wider text-xs">
                    Selected Items & Samples ({cartItems.length})
                  </h4>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-6 bg-stone-950/60 rounded-xl border border-stone-800/80 text-center space-y-2">
                    <p className="text-sm text-stone-400">
                      Your RFQ kit is currently empty.
                    </p>
                    <p className="text-xs text-stone-500">
                      Browse our Products or Color Swatches to add items, vanity tops, or 4x4 inch physical sample chips.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-100 flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.sku && (
                              <span className="px-1.5 py-0.5 rounded bg-stone-800 text-amber-400 font-mono text-[10px]">
                                {item.sku}
                              </span>
                            )}
                          </div>
                          <div className="text-stone-400 text-[11px] mt-0.5 flex flex-wrap gap-x-3">
                            {item.material && <span>Material: {item.material}</span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            {item.selectedEdge && <span>Edge: {item.selectedEdge}</span>}
                            {item.selectedThickness && <span>Thickness: {item.selectedThickness}</span>}
                          </div>
                        </div>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 px-2 py-1 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-amber-400 text-xs min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Details */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-stone-800">
                <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                  Contact & Project Parameters
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Business Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jmiller@distributor.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Stone Surfaces LLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Country / Destination Port
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Los Angeles / Houston / Sydney"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Distributor Wholesale Program</option>
                      <option>Commercial / Hospitality Hotel</option>
                      <option>Multi-family Residential Builder</option>
                      <option>Kitchen & Bath Showroom</option>
                      <option>Physical Sample Box Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Target Timeline
                    </label>
                    <select
                      value={formData.targetTimeline}
                      onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Immediate (Within 30 days)</option>
                      <option>Within 30–60 days</option>
                      <option>Within 60–90 days</option>
                      <option>Future Planning / Sample Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Specific Dimensions, Sink Cutouts or Drawing Links
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify dimensions (e.g. 31x22 in), cutout requirements, edge profiles, or paste links to architectural drawings..."
                    value={formData.customNotes}
                    onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Trust callout */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Direct factory inquiry from Vietnam. No middlemen. All quotations include material specs, CNC edge drawings, export crate packing, and container load plans.
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-medium transition-colors"
                  >
                    Continue Browsing
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Submitting to Factory...' : 'Request Quotation & Samples'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
