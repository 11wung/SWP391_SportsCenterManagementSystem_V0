import React from 'react';
import { Award, CheckCircle2, ArrowRight, Play, TrendingUp, Users, Calendar, Zap } from 'lucide-react';

export default function HeroSection({ onOpenDemo }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Award Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="text-base">🏆</span>
              <span>Giải thưởng Chuyển đổi số Thể thao 2024 · Nền tảng số 1 Việt Nam</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white leading-[1.18] tracking-tight">
              SportCenter tự hào là nền tảng{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                Quản lý Trung tâm Thể thao
              </span>{' '}
              Sân bãi, Gym, Bơi lội hàng đầu Việt Nam
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Hệ sinh thái All-in-One quản lý hội viên, đặt lịch sân bãi, ca dạy HLV, thu phí tự động và chuỗi cơ sở thể thao trên toàn quốc — chống trùng sân, kiểm soát cổng FaceID không chạm.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Đặt lịch demo miễn phí</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
              >
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>Khám phá 48+ phân hệ</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Triển khai nhanh trong 24h</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hỗ trợ kỹ thuật 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Chuyển giao và đào tạo tận nơi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Award & Live Dashboard */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Floating Badge Top Right: +40% Hiệu suất khai thác */}
              <div className="absolute -top-4 -right-2 sm:-right-4 z-20 animate-bounce duration-1000">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-emerald-500/40 border border-emerald-300/40">
                  <TrendingUp className="w-4 h-4" />
                  <span>↑ +40% Khai thác sân bãi</span>
                </div>
              </div>

              {/* Main Showcase Card */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-emerald-500/30 shadow-2xl backdrop-blur-sm">
                <div className="bg-[#0b1329] rounded-[14px] p-5 sm:p-6 border border-slate-800/90 overflow-hidden">
                  
                  {/* Top Bar of Preview */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="text-xs font-medium text-slate-400 ml-2">SportCenter Cloud OS</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      ● Vận hành 24/7
                    </span>
                  </div>

                  {/* Recognition Highlight */}
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          Cúp Vàng Công Nghệ Số Thể Thao 2024
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">Hiệp hội CNTT vinh danh</span>
                    </div>

                    <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-black text-xl">
                        🏆
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Nền Tảng Quản Trị Thể Thao Tiêu Biểu</div>
                        <div className="text-xs text-slate-400">Hệ sinh thái SportCenter ERP & AI Smart Booking</div>
                      </div>
                    </div>
                  </div>

                  {/* Realtime Live Metrics Preview */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400" /> Check-in sân hôm nay
                      </div>
                      <div className="text-xl font-bold text-white mt-1">582 / 650 lượt</div>
                      <div className="text-[11px] text-emerald-400 font-medium">99.2% nhận diện FaceID</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" /> Lịch sân đang diễn ra
                      </div>
                      <div className="text-xl font-bold text-white mt-1">36 sân</div>
                      <div className="text-[11px] text-blue-400 font-medium">100% tự động giữ chỗ</div>
                    </div>
                  </div>

                  {/* Quick Action Preview */}
                  <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200">Gợi ý AI: 18 khách đặt sân cần nhắc thanh toán</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">
                      Gửi Zalo OA →
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 z-20">
                <div className="inline-flex items-center gap-2 bg-[#0f172a] text-amber-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xl border border-amber-500/40">
                  <span>🏆</span>
                  <span>Top 10 Giải Pháp Số Thể Thao 2024</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
