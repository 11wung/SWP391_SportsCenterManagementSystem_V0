import React from 'react';
import { Dumbbell, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  return (
    <footer className="bg-[#050811] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Sport<span className="text-emerald-400">Center</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Phần mềm Quản lý Trung tâm Thể thao, Sân bãi, Gym, Bể bơi & Tổ hợp thể dục thể thao hàng đầu Việt Nam. Tự động hóa đặt sân, kiểm soát cổng và chăm sóc khách hàng.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Award className="w-4 h-4" />
              <span>Giải Thưởng Chuyển Đổi Số Thể Thao 2024</span>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tổng đài hỗ trợ: <strong className="text-white">1900 6868</strong> (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email liên hệ: support@sportcenter.vn</span>
              </div>
            </div>
          </div>

          {/* Column 1: Sản phẩm */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Phân Hệ SportCenter</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Quản lý Hội viên & Thẻ tập</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Đặt sân & Lịch lớp tuần</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Thu phí tự động & POS</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Huấn luyện viên & Trọng tài</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Zalo Mini App đặt sân</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Quản lý Chuỗi cơ sở</a></li>
            </ul>
          </div>

          {/* Column 2: Giải pháp */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mô Hình Ứng Dụng</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Tổ hợp thể thao đa môn</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Cụm sân Tennis & Pickleball</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Sân bóng đá cỏ nhân tạo</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Bể bơi & Trung tâm bơi lội</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Phòng tập Gym & Yoga</a></li>
            </ul>
          </div>

          {/* Column 3: Địa chỉ văn phòng */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Văn Phòng Toàn Quốc</h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="text-slate-300">Trụ sở Hà Nội:</strong>
                <p className="text-slate-400">Tầng 8, Tòa nhà Detech Tower, Cầu Giấy</p>
              </div>
              <div>
                <strong className="text-slate-300">TP. Hồ Chí Minh:</strong>
                <p className="text-slate-400">Tầng 5, Sport Innovation Center, Quận 1</p>
              </div>
              <div>
                <strong className="text-slate-300">Đà Nẵng:</strong>
                <p className="text-slate-400">Tầng 4, Danang Software Park, Hải Châu</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 SportCenter Việt Nam. Hệ thống Quản trị Trung tâm Thể thao Toàn diện.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</a>
            <button
              onClick={onOpenDemo}
              className="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
            >
              Đăng ký Demo SportCenter
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
