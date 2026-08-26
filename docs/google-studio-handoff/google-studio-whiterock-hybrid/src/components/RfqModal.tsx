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
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';
import type { RfqCartItem } from '../types';
import { siteConfig } from '../data';

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
    <div className="wr-modal-backdrop">
      <div
        className="relative bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl text-[#1d1d1f] overflow-hidden max-h-[92vh] flex flex-col border border-black/[0.08]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="wr-modal-header">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1d1d1f]">
                RFQ & Sample Kit Basket
              </h3>
              <p className="text-xs text-[#86868b]">
                Direct FOB Vietnam factory quotation & CAD takeoff
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="wr-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {isSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#1d1d1f]">
                Inquiry Successfully Submitted!
              </h4>
              <p className="text-xs sm:text-sm text-[#86868b] max-w-md mx-auto leading-relaxed">
                Your RFQ list and technical parameters have been routed to our Vietnam plant engineering department. We will reply within 24 business hours with an official FOB quote and CAD schedule.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-8 py-3 rounded-full bg-[#111113] text-white text-xs font-medium hover:bg-black cursor-pointer shadow-xs"
              >
                Close & Return to Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="tech-badge text-[#86868b]">
                    SELECTED ITEMS ({cartItems.length})
                  </span>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                    >
                      Clear List
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-black/[0.05] text-center space-y-2">
                    <Package className="w-8 h-8 text-[#86868b] mx-auto opacity-50" />
                    <p className="text-xs text-[#86868b]">Your RFQ basket is currently empty.</p>
                    <p className="text-[11px] text-[#a1a1a6]">
                      Browse the catalog or colors page and click "+ Add to RFQ" or configure a vanity.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#1d1d1f] truncate">
                              {item.productSku}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f0f3] text-[#6e6e73]">
                              {item.material}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#1d1d1f] truncate">
                            {item.title}
                          </p>
                          {item.specSummary && (
                            <p className="text-[11px] text-[#86868b] truncate">
                              {item.specSummary}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center gap-2 bg-[#f0f0f3] rounded-full p-1 border border-black/[0.05]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 rounded-full hover:bg-white text-[#1d1d1f] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-xs font-bold px-2 text-[#1d1d1f]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 rounded-full hover:bg-white text-[#1d1d1f] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 text-[#86868b] hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form details */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-black/[0.06]">
                <span className="tech-badge text-[#86868b] block">
                  CONTACT & CONTAINER DESTINATION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-4 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-black/30 focus:bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-4 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-black/30 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company / Developer"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-4 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-black/30 focus:bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Destination Port (e.g., LA/Long Beach)"
                    value={formData.destinationPort}
                    onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-4 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-black/30 focus:bg-white"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Additional project notes, required CAD approval timeline, or custom edge details..."
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-2xl p-4 text-xs text-[#1d1d1f] focus:outline-none focus:border-black/30 focus:bg-white leading-relaxed"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full py-4 rounded-full bg-[#111113] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting RFQ...' : 'Submit RFQ to Vietnam Factory'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
