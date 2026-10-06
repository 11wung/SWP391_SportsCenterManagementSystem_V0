import React, { useState } from 'react';
import { Phone, Headphones } from 'lucide-react';

export default function FloatingContact({ onOpenDemo }) {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '1900 6868';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('19006868');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Hotline Pill Button */}
      <a
        href="tel:19006868"
        className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-300/30 transition-all transform hover:scale-105 active:scale-95"
        title="Hotline tư vấn SportCenter"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <Phone className="w-3 h-3 fill-white text-white" />
        </div>
        <span>{phoneNumber}</span>
      </a>

      {/* Support / Quick Demo Action Button */}
      <button
        onClick={onOpenDemo}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 border border-emerald-300/40 transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative group"
        title="Tư vấn trực tiếp & Đặt lịch Demo"
        aria-label="Tư vấn trực tiếp"
      >
        <Headphones className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-300 rounded-full border-2 border-[#0b1329] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0b1329]" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Demo SportCenter ngay
        </span>
      </button>

    </div>
  );
}
