import React from 'react';

export default function UserCreateModal({ isOpen, onClose, isManager, formData, onChange, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {isManager ? 'Thêm Người Dùng Mới' : 'Đăng Ký Hội Viên Tại Quầy'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Tạo hồ sơ và cấp quyền truy cập SportCenter
        </p>

        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              placeholder="VD: Nguyễn Văn Nam"
              value={formData.fullName}
              onChange={(e) => onChange({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={(e) => onChange({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại *</label>
              <input
                type="tel"
                required
                placeholder="0988xxxxxx"
                value={formData.phone}
                onChange={(e) => onChange({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mật khẩu khởi tạo *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => onChange({ ...formData, password: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {isManager ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phân quyền</label>
                <select
                  value={formData.roleCode}
                  onChange={(e) => onChange({ ...formData, roleCode: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="MEMBER">Hội viên (Member)</option>
                  <option value="RECEPTIONIST">Lễ tân (Receptionist)</option>
                  <option value="COACH">Huấn luyện viên (Coach)</option>
                  <option value="MANAGER">Quản lý (Manager)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vai trò</label>
                <input
                  type="text"
                  disabled
                  value="Hội viên (MEMBER)"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-400"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs"
            >
              Xác nhận tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
