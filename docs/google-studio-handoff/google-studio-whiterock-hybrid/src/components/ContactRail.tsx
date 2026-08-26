import React from 'react';
import {
  Mail,
  Phone,
  FileText,
  Share2
} from 'lucide-react';
import { WhatsAppIcon, WeChatIcon } from './SocialIcons';
import { siteConfig } from '../data/site';

interface ContactRailProps {
  onOpenRfq: () => void;
  onOpenWeChat?: () => void;
  onOpenShare?: () => void;
  cartCount?: number;
  className?: string;
}

export const ContactRail: React.FC<ContactRailProps> = ({
  onOpenRfq,
  onOpenWeChat,
  onOpenShare,
  cartCount = 0,
  className = ''
}) => {
  const whatsappNumber = siteConfig.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello WHITEROCK Stone Vietnam, I am interested in getting a project quotation / stone vanity top catalog.'
  )}`;

  return (
    <aside
      id="contact-rail-sidebar"
      aria-label="Quick Contact & RFQ Action Rail"
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2 pr-2.5 select-none ${className}`}
    >
      {/* 1. RFQ / Sample Builder Action Button */}
      <button
        onClick={onOpenRfq}
        id="rail-rfq-btn"
        className="group relative flex items-center bg-white hover:bg-amber-600 border border-stone-300 hover:border-amber-500 rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-stone-800 hover:text-white"
        title="Open RFQ / Sample Cart"
      >
        <div className="flex items-center justify-center w-6 h-6 text-amber-700 group-hover:text-white transition-colors shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        
        {/* Expanding Label */}
        <span className="wr-contact-rail-label">
          Request Quote ({cartCount})
        </span>

        {/* Count Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* 2. WhatsApp Direct Inquiry */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="rail-whatsapp-btn"
        className="group flex items-center bg-white hover:bg-[#25D366] border border-stone-300 hover:border-[#25D366] rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-[#128C7E] hover:text-white"
        title="Chat on WhatsApp (Fastest Response)"
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <WhatsAppIcon className="w-5 h-5" />
        </div>
        <span className="wr-contact-rail-label">
          WhatsApp Direct
        </span>
      </a>

      {/* 3. WeChat Official QR Code */}
      {onOpenWeChat && (
        <button
          type="button"
          onClick={onOpenWeChat}
          id="rail-wechat-btn"
          className="group flex items-center bg-white hover:bg-[#07c160] border border-stone-300 hover:border-[#07c160] rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-[#07c160] hover:text-white"
          title="WeChat 官方微信直连"
        >
          <div className="flex items-center justify-center w-6 h-6 shrink-0">
            <WeChatIcon className="w-5 h-5" />
          </div>
          <span className="wr-contact-rail-label">
            微信扫码咨询
          </span>
        </button>
      )}

      {/* 4. Social Share */}
      {onOpenShare && (
        <button
          type="button"
          onClick={onOpenShare}
          id="rail-share-btn"
          className="group flex items-center bg-white hover:bg-black border border-stone-300 hover:border-black rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-stone-700 hover:text-white"
          title="Share page or specs to LinkedIn, Pinterest, WhatsApp, etc."
        >
          <div className="flex items-center justify-center w-6 h-6 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="wr-contact-rail-label">
            分享 Share
          </span>
        </button>
      )}

      {/* 5. Direct Email Contact */}
      <a
        href={`mailto:${siteConfig.email}?subject=WHITEROCK%20Stone%20Project%20Inquiry`}
        id="rail-email-btn"
        className="group flex items-center bg-white hover:bg-amber-600 border border-stone-300 hover:border-amber-500 rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-amber-800 hover:text-white"
        title={`Send Email: ${siteConfig.email}`}
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <span className="wr-contact-rail-label">
          Email Factory
        </span>
      </a>

      {/* 6. Direct Phone Contact */}
      <a
        href={`tel:${siteConfig.telHref}`}
        id="rail-phone-btn"
        className="group flex items-center bg-white hover:bg-amber-600 border border-stone-300 hover:border-amber-500 rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden text-amber-800 hover:text-white"
        title={`Direct Factory Line: ${siteConfig.tel}`}
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <span className="wr-contact-rail-label">
          Call {siteConfig.tel}
        </span>
      </a>
    </aside>
  );
};
