import React from 'react';
import { Database, Cpu, CreditCard, Smartphone, Check } from 'lucide-react';

export default function EcosystemSection({ onOpenDemo }) {
  const pillars = [
    {
      title: 'Phần Mềm Quản Trị Trung Tâm',
      subtitle: 'Cloud ERP & Booking Engine',
      desc: 'Quản lý hội viên, sơ đồ đặt sân thời gian thực, gói tập, công nợ và chấm công nhân sự. Dữ liệu tập trung an toàn.',
      icon: Database,
      badge: 'Core Engine'
    },
    {
      title: 'Thiết Bị Kiểm Soát Cổng & Điện Sân',
      subtitle: 'Flap Barrier, FaceID & Smart Relay',
      desc: 'Cổng xoay thông minh kiểm soát ra vào và bộ điều khiển bật tắt điện dàn đèn sân bóng đá/tennis theo giờ thuê.',
      icon: Cpu,
      badge: 'IoT & Hardware'
    },
    {
      title: 'Cổng Thu Phí & Hóa Đơn Tự Động',
      subtitle: 'VietQR, MoMo, VNPay, POS Bán Nước',
      desc: 'Khách chuyển khoản tự động xác nhận giữ chỗ sân, xuất hóa đơn điện tử và kiểm soát tồn kho căng tin tại quầy.',
      icon: CreditCard,
      badge: 'Fintech Hub'
    },
    {
      title: 'Zalo Mini App & AI Tối Ưu Lịch',
      subtitle: 'Tương tác trực tiếp không cần cài app',
      desc: 'Khách hàng tự chọn sân, giữ chỗ và mở cổng bằng mã QR qua Zalo. AI dự đoán và gợi ý giờ vàng lấp đầy sân trống.',
      icon: Smartphone,
      badge: 'AI Smart Booking'
    },
  ];

  return (
    <section id="ecosystem" className="py-20 lg:py-28 bg-[#080d1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Hệ thống quản trị thể thao SportCenter — Đầy đủ tính năng, mở rộng không giới hạn
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            Hệ sinh thái quản lý trung tâm thể thao toàn diện — Tất cả trên một nền tảng duy nhất
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-300 uppercase tracking-wider leading-relaxed">
            Quản lý hội viên và thẻ tập, đặt sân bãi và lớp học, thu phí tự động, tính hoa hồng HLV, marketing Zalo OA, chương trình loyalty, app mobile đặt sân và báo cáo realtime — tích hợp liền mạch trong SportCenter
          </p>
        </div>

        {/* 4 Ecosystem Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                    {pillar.title}
                  </h3>

                  <div className="text-xs text-emerald-400 font-semibold mb-3">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> Chuẩn hoá vận hành thể thao
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action card banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white">Sẵn sàng tối ưu công suất sân bãi và tăng trưởng doanh thu?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Đăng ký trải nghiệm miễn phí 14 ngày trọn vẹn toàn bộ tính năng cao cấp của SportCenter.</p>
          </div>
          <button
            onClick={onOpenDemo}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            Đăng ký trải nghiệm miễn phí
          </button>
        </div>

      </div>
    </section>
  );
}
