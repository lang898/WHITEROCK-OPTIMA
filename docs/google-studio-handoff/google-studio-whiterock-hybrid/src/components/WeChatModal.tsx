import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Clock,
  ShieldCheck,
  MessageCircle,
  Phone,
  Globe2
} from 'lucide-react';
import { WeChatIcon, WhatsAppIcon } from './SocialIcons';
import { siteConfig } from '../data';

interface WeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeChatModal: React.FC<WeChatModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const wechatId = 'WHITEROCK_STONE_VN';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="wr-modal-backdrop">
      <div
        className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl text-[#1d1d1f] overflow-hidden border border-black/[0.08] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#07c160]/10 text-[#07c160] flex items-center justify-center">
              <WeChatIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1d1d1f] flex items-center gap-2">
                <span>WeChat 官方微信直连</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                  Online
                </span>
              </h3>
              <p className="text-[11px] text-[#86868b]">
                Connect with bilingual stone engineers (中/英/越)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="wr-modal-close"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          {/* QR Code Frame */}
          <div className="relative inline-block mx-auto p-4 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] shadow-inner group">
            {/* Simulated High-Res WeChat QR with Brand Center */}
            <div className="w-52 h-52 bg-white rounded-2xl p-2.5 shadow-sm border border-black/[0.06] flex flex-col items-center justify-between relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1d1d1f]">
                {/* QR Pattern Simulation (Corners & Dots) */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="12" y="12" width="14" height="14" rx="2" fill="currentColor" />
                <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="74" y="12" width="14" height="14" rx="2" fill="currentColor" />
                <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="12" y="74" width="14" height="14" rx="2" fill="currentColor" />
                
                {/* Data Matrix Elements */}
                <circle cx="45" cy="15" r="2.5" fill="currentColor" />
                <circle cx="55" cy="15" r="2.5" fill="currentColor" />
                <circle cx="40" cy="25" r="2.5" fill="currentColor" />
                <circle cx="50" cy="25" r="2.5" fill="currentColor" />
                <circle cx="60" cy="25" r="2.5" fill="currentColor" />
                <circle cx="15" cy="45" r="2.5" fill="currentColor" />
                <circle cx="25" cy="45" r="2.5" fill="currentColor" />
                <circle cx="75" cy="45" r="2.5" fill="currentColor" />
                <circle cx="85" cy="45" r="2.5" fill="currentColor" />
                <circle cx="40" cy="55" r="2.5" fill="currentColor" />
                <circle cx="60" cy="55" r="2.5" fill="currentColor" />
                <circle cx="15" cy="55" r="2.5" fill="currentColor" />
                <circle cx="85" cy="55" r="2.5" fill="currentColor" />
                <circle cx="45" cy="75" r="2.5" fill="currentColor" />
                <circle cx="55" cy="75" r="2.5" fill="currentColor" />
                <circle cx="65" cy="75" r="2.5" fill="currentColor" />
                <circle cx="75" cy="75" r="2.5" fill="currentColor" />
                <circle cx="85" cy="75" r="2.5" fill="currentColor" />
                <circle cx="45" cy="85" r="2.5" fill="currentColor" />
                <circle cx="65" cy="85" r="2.5" fill="currentColor" />
                <circle cx="85" cy="85" r="2.5" fill="currentColor" />
              </svg>

              {/* Central Badge Overlay */}
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-[#1d1d1f] text-amber-300 flex flex-col items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                <span>WR</span>
                <span className="text-[7px] text-white font-normal uppercase">STONE</span>
              </div>
            </div>

            {/* Scan prompt */}
            <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#6e6e73]">
              <QrCode className="w-3.5 h-3.5 text-[#07c160]" />
              <span>打开微信 扫一扫添加工程师</span>
            </div>
          </div>

          {/* Copyable WeChat ID */}
          <div className="space-y-2">
            <div className="text-xs text-[#86868b]">微信号 / WeChat ID:</div>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] text-xs font-mono font-bold text-[#1d1d1f] max-w-xs mx-auto">
              <span className="truncate px-2">{wechatId}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-[#1d1d1f] border border-black/[0.08] transition-all flex items-center gap-1.5 cursor-pointer text-[11px] shadow-2xs shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制微信号</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Value points */}
          <div className="text-left bg-[#fbfbfd] p-4 rounded-2xl border border-black/[0.05] space-y-2 text-xs text-[#6e6e73]">
            <div className="flex items-center gap-2 text-[#1d1d1f] font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>直接工厂对接服务（免去中间商沟通延迟）</span>
            </div>
            <p className="text-[11px] text-[#86868b] pl-5 leading-relaxed">
              即时发送 CAD 图纸、台面开孔尺寸、石英石/大理石高清实拍大板视频与 0% 美国关税清关咨询。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/[0.06] bg-[#fbfbfd] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#86868b]">
            WhatsApp: {siteConfig.whatsapp}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-medium cursor-pointer transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
