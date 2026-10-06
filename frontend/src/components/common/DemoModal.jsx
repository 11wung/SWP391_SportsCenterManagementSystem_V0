import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Building2, Phone, User } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    centerName: '',
    type: 'complex',
    branches: '1',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      centerName: '',
      type: 'complex',
      branches: '1',
      note: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Dùng thử miễn phí 14 ngày
              </div>
              <h3 className="text-2xl font-black text-white">
                Đặt lịch Demo SportCenter
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Chuyên viên tư vấn sẽ liên hệ và thiết kế kịch bản demo sát thực tế mô hình trung tâm & sân bãi của bạn.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Họ và tên người liên hệ <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Số điện thoại (Zalo) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="0988 xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tên cơ sở / Trung tâm
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="VD: Green Arena Complex"
                      value={formData.centerName}
                      onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mô hình cơ sở
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="complex">Tổ hợp Thể thao Đa năng</option>
                    <option value="court">Cụm Sân Cầu lông / Pickleball / Tennis</option>
                    <option value="football">Sân Bóng đá cỏ nhân tạo</option>
                    <option value="gym">Phòng Gym & Fitness Club</option>
                    <option value="pool">Bể bơi & CLB Thể thao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Yêu cầu tính năng quan tâm
                </label>
                <textarea
                  rows="2"
                  placeholder="VD: Đặt sân online chống trùng giờ, bật tắt đèn sân tự động, cổng xoay FaceID..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm cursor-pointer mt-2"
              >
                Gửi yêu cầu & Nhận tài khoản Demo SportCenter
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Cam kết bảo mật thông tin trung tâm theo tiêu chuẩn ISO/IEC 27001
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Đăng Ký Thành Công!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Cảm ơn <span className="text-emerald-400 font-semibold">{formData.fullName || 'bạn'}</span> đã liên hệ. Đội ngũ chuyên gia SportCenter sẽ liên hệ số điện thoại{' '}
              <span className="text-emerald-400 font-semibold">{formData.phone}</span> để kích hoạt tài khoản demo và hướng dẫn chi tiết ngay!
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Hoàn tất
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
