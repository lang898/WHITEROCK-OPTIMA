import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Building,
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { siteConfig, faqList } from '../data';
import type { LocaleConfig } from '../types';

interface ContactViewProps {
  currentLocale: LocaleConfig;
}

export const ContactView: React.FC<ContactViewProps> = ({ currentLocale }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Factory Engineering Desk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Request Quotation, Sample Box & Technical Consultation
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Contact our Vietnam manufacturing team for custom BOQ itemizations, sample dispatch, drawing CAD reviews, and container shipment planning.
        </p>
      </div>

      {/* Main Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side: Contact Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vietnam Base Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-bold text-base text-white">
                Vietnam Primary Manufacturing Base
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">WHITEROCK COMPANY LIMITED</strong>
                  <span className="text-stone-400">Cong Ty TNHH WHITEROCK</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-stone-300 leading-relaxed">
                  {siteConfig.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-stone-200 hover:text-amber-400">
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${siteConfig.telHref}`} className="text-stone-200 hover:text-amber-400">
                  {siteConfig.tel} (Phone & WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-400">Mon - Sat: 8:00 AM - 6:00 PM (GMT+7)</span>
              </div>
            </div>
          </div>

          {/* China Base Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500"></span>
              <h3 className="font-bold text-base text-white">
                China Manufacturing & Sourcing Support
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">OPTIMA STONE (Yunfu, China)</strong>
                  <span className="text-stone-400">云浮欧普石材有限公司</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span className="text-stone-400">
                  Yunfu Stone Capital Industrial Park, Guangdong Province, China
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Inquiry Form */}
        <div className="lg:col-span-3 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Inquiry Received by Factory Team
              </h3>
              <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting WHITEROCK. Our engineering department is reviewing your specifications and will respond with factory pricing and lead time within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', company: '', country: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="font-bold text-lg text-white font-serif">
                  Direct Factory Contact Form
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Fields marked with * are required for export quote preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Contact Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. David Harrison"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. david@contracting.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +1 555 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Harrison Stone Imports"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Destination Country / Port of Discharge
                </label>
                <input
                  type="text"
                  placeholder="e.g. United States (Long Beach Port) / Canada / Australia"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Project Details, Stone Colors & Quantity *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your requirements (e.g. 200 vanity tops in Calacatta Gold 31x22in, eased edge, undermount sink, sample box request)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending to Vietnam Engineering Desk...' : 'Send Message to Factory'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="space-y-6 pt-6 border-t border-stone-800">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Buyer Knowledge Base
          </span>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/40"
                >
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-300 border-t border-stone-800/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
