import React from 'react';

export default function UserEditModal({ isOpen, onClose, user, isManager, onChange, onSubmit }) {
  if (!isOpen || !user) return null;

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

        <h3 className="text-xl font-bold text-white mb-1">Chỉnh Sửa Người Dùng</h3>
        <p className="text-xs text-slate-400 mb-5">
          Cập nhật thông tin cho {user.fullName}
        </p>

        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Họ và tên</label>
            <input
              type="text"
              required
              value={user.fullName || ''}
              onChange={(e) => onChange({ ...user, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại</label>
              <input
                type="tel"
                required
                value={user.phone || ''}
                onChange={(e) => onChange({ ...user, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Giới tính</label>
              <select
                value={user.gender || 'MALE'}
                onChange={(e) => onChange({ ...user, gender: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          {isManager && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vai trò</label>
              <select
                value={user.roleCode || user.role}
                onChange={(e) => onChange({ ...user, roleCode: e.target.value, role: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="MEMBER">Hội viên (Member)</option>
                <option value="RECEPTIONIST">Lễ tân (Receptionist)</option>
                <option value="COACH">Huấn luyện viên (Coach)</option>
                <option value="MANAGER">Quản lý (Manager)</option>
              </select>
            </div>
          )}

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
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
