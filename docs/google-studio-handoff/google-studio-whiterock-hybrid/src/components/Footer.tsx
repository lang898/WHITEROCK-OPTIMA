import React from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  Building,
  CheckCircle2,
  Settings,
  ArrowRight,
  Share2,
  Sparkles
} from 'lucide-react';
import {
  WhatsAppIcon,
  WeChatIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  PinterestIcon,
  FacebookIcon
} from './SocialIcons';
import { siteConfig } from '../data/site';
import type { LocaleConfig } from '../types';

interface FooterProps {
  currentLocale: LocaleConfig;
  setCurrentTab: (tab: string) => void;
  onOpenWeChat?: () => void;
  onOpenShare?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLocale,
  setCurrentTab,
  onOpenWeChat,
  onOpenShare
}) => {
  return (
    <footer className="hybrid-footer bg-[#f5f5f7] text-[#6e6e73] border-t border-black/[0.06] text-xs">
      {/* Top Value Columns */}
      <div className="border-b border-black/[0.06] bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-black/[0.06]">
              <Building className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-[#1d1d1f]">Vietnam Primary Base</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                20,000 m² modern fabrication plant in Binh Phuoc (0% US Section 301 Tariff).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-black/[0.06]">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-[#1d1d1f]">North American Specs</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Standard 22" vanity depths, cUPC pre-glued sinks, ±0.3mm CNC edge tolerance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-black/[0.06]">
              <FileCheck className="w-5 h-5 text-sky-700" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-[#1d1d1f]">Direct Export Compliance</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Form B C/O verified, NSF-51 food-safe certification, and ISPM-15 crating.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center shrink-0 border border-black/[0.06]">
              <CheckCircle2 className="w-5 h-5 text-purple-700" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-[#1d1d1f]">Express Courier Swatches</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                4x4" physical stone chips & project mockup vanity tops via FedEx within 5 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Social Media & Instant Channels Strip */}
      <div className="border-b border-black/[0.06] bg-[#fbfbfd] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold text-sm text-[#1d1d1f]">
                Connect with WHITEROCK Vietnam Across Social Channels
              </span>
            </div>
            <p className="text-xs text-[#86868b]">
              Follow our daily stone fabrication feeds, watch 4K factory CNC videos, and chat directly with bilingual engineers.
            </p>
          </div>

          {/* Social Platform Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello WHITEROCK Vietnam, I would like to connect on stone vanity top orders.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
              <span>WhatsApp</span>
            </a>

            {/* WeChat */}
            {onOpenWeChat && (
              <button
                type="button"
                onClick={onOpenWeChat}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#07c160] text-[#07c160] hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
                title="WeChat 微信扫码"
              >
                <WeChatIcon className="w-4 h-4 text-[#07c160] group-hover:text-white transition-colors" />
                <span>微信 WeChat</span>
              </button>
            )}

            {/* LinkedIn */}
            <a
              href={siteConfig.social.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="LinkedIn B2B Company"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0A66C2] group-hover:text-white transition-colors" />
              <span>LinkedIn</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-rose-600 text-rose-600 hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="Instagram Lookbook"
            >
              <InstagramIcon className="w-4 h-4 text-rose-600 group-hover:text-white transition-colors" />
              <span>Instagram</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-red-600 text-red-600 hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="YouTube 4K CNC Shorts"
            >
              <YouTubeIcon className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
              <span>YouTube</span>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#E60023] text-[#E60023] hover:text-white border border-black/[0.08] hover:border-transparent text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
              title="Pinterest Moodboards"
            >
              <PinterestIcon className="w-4 h-4 text-[#E60023] group-hover:text-white transition-colors" />
              <span>Pinterest</span>
            </a>

            {/* Share Site */}
            {onOpenShare && (
              <button
                type="button"
                onClick={onOpenShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                title="Share Website"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Site</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#1d1d1f] text-amber-300 font-bold flex items-center justify-center text-xs shadow-xs">
                WR
              </div>
              <span className="font-bold text-base tracking-tight text-[#1d1d1f]">
                WHITEROCK MARBLE & GRANITE
              </span>
            </div>

            <p className="text-xs text-[#86868b] leading-relaxed pr-6">
              Official export website for WHITEROCK MARBLE & GRANITE CO., LTD. Direct stone manufacturer with a 20,000 m² modern fabrication facility in Binh Phuoc Province, Vietnam and 20+ years stone craft heritage. Supplying prefabricated quartz & granite vanity tops with cUPC sinks, waterfall kitchen islands, 5-axis waterjet medallions, hand-carved fireplaces, and cut-to-size project stone for global developers.
            </p>

            <div className="space-y-2 text-xs text-[#6e6e73] pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#86868b] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#1d1d1f] font-mono">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
                <a href={`tel:${siteConfig.telHref}`} className="hover:text-[#1d1d1f] font-mono">
                  {siteConfig.tel}
                </a>
              </div>
            </div>
          </div>

          {/* Directory Column 1: Products */}
          <div className="space-y-3">
            <h5 className="font-semibold text-[#1d1d1f] text-xs tracking-wider uppercase">
              Products
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Bathroom Vanity Tops
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Kitchen Countertops & Islands
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Waterjet Medallions & Mosaics
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Hand-Carved Fireplaces & Surrounds
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Custom Stone Furniture & Thresholds
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('colors')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  24 Stone Color Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Column 2: Company & Manufacturing */}
          <div className="space-y-3">
            <h5 className="font-semibold text-[#1d1d1f] text-xs tracking-wider uppercase">
              Company & Plant
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer font-medium text-[#1d1d1f]">
                  About Us (Company Profile)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('factory')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  20,000 m² Vietnam Facility
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('finishes')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Edge Profiles & Sinks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('applications')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Hospitality & Multi-Family
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('partners')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Architect & Builder Program
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('resources')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Technical Docs & Test Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Column 3: Administration & Portals */}
          <div className="space-y-3">
            <h5 className="font-semibold text-[#1d1d1f] text-xs tracking-wider uppercase">
              Portals & Inquiries
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Submit Project RFQ / Drawings
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('colors')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">
                  Request 4x4" Sample Box
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setCurrentTab('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] font-semibold transition-colors cursor-pointer border border-black/[0.06]"
                >
                  <Settings className="w-3 h-3 text-[#86868b]" />
                  <span>Website CMS Admin</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom micro notice and copyright */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868b]">
          <p>
            © {new Date().getFullYear()} WHITEROCK SURFACES VIETNAM CO., LTD. All rights reserved. Direct B2B Stone & Vanity Top Exporter.
          </p>
          <div className="flex items-center gap-6">
            <span>Vietnam Factory Direct</span>
            <span>0% Section 301 Tariff</span>
            <span>Form B C/O Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
