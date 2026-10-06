import React from 'react';
import { Smartphone, Check, ArrowRight } from 'lucide-react';

export default function MobileManagementSection({ onOpenDemo }) {
  const bulletPoints = [
    'Theo dõi sơ đồ sân trống và doanh thu từng giờ từ bất kỳ đâu',
    'Kiểm soát ra vào cổng barrier, nhận cảnh báo gian lận hoặc quá giờ',
    'Duyệt hợp đồng, xuất hóa đơn điện tử và xác nhận tiền cọc sân tức thì',
    'Theo dõi số buổi dạy thực tế của từng HLV và tự động tính hoa hồng',
    'Giao diện tối ưu mượt mà trên iPhone, Android và máy tính bảng'
  ];

  return (
    <section className="py-20 bg-[#070b16] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Two-Column Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              Phần mềm quản trị thể thao & sân bãi số 1 Việt Nam
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white leading-tight">
              Quản lý toàn bộ trung tâm thể thao ngay trên điện thoại — không cần ngồi tại quầy lễ tân
            </h2>

            <div className="space-y-3 pt-2">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Trải nghiệm App Quản lý SportCenter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                SportCenter là nền tảng phần mềm quản lý trung tâm thể thao, sân bóng đá, cầu lông, tennis, pickleball, bơi lội và fitness toàn diện nhất Việt Nam. Với hơn 2.500 cơ sở tin dùng, SportCenter cung cấp đầy đủ các phân hệ: quản lý hội viên và thẻ tập, đặt lịch sân bãi và lớp học online, thu phí và hoá đơn điện tử, quản lý HLV và tính lương tự động, marketing Zalo OA và SMS, chương trình loyalty tích điểm, app mobile cho khách hàng, và dashboard báo cáo realtime.
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>✓ Tất cả tích hợp trong một hệ thống duy nhất</span>
                <span>✓ Dễ dùng trên điện thoại & máy tính</span>
              </div>
            </div>

            {/* Mobile App Screen Mockup */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">SportCenter Mobile Admin & Client App</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Đồng bộ tức thì mọi hoạt động sân bãi, ca dạy và doanh thu lên điện thoại của ban quản lý.
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded-lg">
                  iOS & Android
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
