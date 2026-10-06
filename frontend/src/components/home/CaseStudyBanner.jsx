import React from 'react';
import { Trophy, CheckCircle, ArrowRight } from 'lucide-react';

export default function CaseStudyBanner({ onOpenDemo }) {
  return (
    <section className="py-8 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-950 border border-emerald-500/40 p-8 sm:p-12 shadow-2xl shadow-emerald-950/40">
          
          {/* Ambient shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                Câu chuyện chuyển đổi số tiêu biểu
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
                ELITE SPORT COMPLEX
              </h2>

              <p className="text-xl sm:text-2xl font-bold text-emerald-200 uppercase tracking-wide">
                Thách thức trong quản lý tổ hợp thể thao & tối ưu công suất sân bãi
              </p>

              <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-2xl">
                Với quy mô tổ hợp hơn 18 cụm sân (Bóng đá, Tennis, Cầu lông, Bể bơi và Gym), Elite Sport Complex đã chọn SportCenter để đồng bộ hóa lịch đặt sân thời gian thực, điều khiển bật tắt điện sân tự động và kết nối cổng kiểm soát FaceID không tiếp xúc.
              </p>

              {/* Stats badges */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/25 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-2xl font-black text-white">18 Cụm Sân</div>
                  <div className="text-xs text-emerald-200">Đồng bộ lịch & bật tắt đèn</div>
                </div>
                <div className="bg-black/25 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-2xl font-black text-white">48.000+</div>
                  <div className="text-xs text-emerald-200">Lượt check-in FaceID/tháng</div>
                </div>
                <div className="bg-black/25 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-2xl font-black text-white">-85%</div>
                  <div className="text-xs text-emerald-200">Thời gian thủ tục tại quầy</div>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-emerald-950 font-extrabold text-base hover:bg-emerald-50 shadow-xl transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Tư vấn mô hình tổ hợp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-emerald-100 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-yellow-300" />
                <span>Khảo sát kỹ thuật & tư vấn trực tiếp miễn phí</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
