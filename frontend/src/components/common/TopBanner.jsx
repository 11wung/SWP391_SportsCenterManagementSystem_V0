import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function TopBanner({ onOpenDemo }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 text-white text-xs sm:text-sm py-2 px-4 relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap mx-auto text-center justify-center">
          <span className="bg-white/20 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white border border-white/30">
            Mới
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 inline" />
            SportCenter V2 đã ra mắt
          </span>
          <span className="hidden md:inline text-emerald-100">—</span>
          <span className="hidden sm:inline text-emerald-50">
            Quản lý đặt sân · Check-in FaceID · App hội viên · Miễn phí dùng thử
          </span>
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-yellow-200 transition-colors ml-1 cursor-pointer"
          >
            Nâng cấp ngay <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
