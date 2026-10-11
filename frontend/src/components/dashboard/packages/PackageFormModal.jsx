import React from 'react';

export default function PackageFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  onChange,
  onSubmit,
}) {
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
          {isEditing ? 'Sửa Gói Tập' : 'Tạo Gói Tập Mới'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Cấu hình quyền lợi, thời lượng và giá niêm yết
        </p>

        <form onSubmit={onSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mã gói *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => onChange({ ...formData, code: e.target.value })}
                placeholder="VD: PKG-VIP-1"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tên gói tập *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => onChange({ ...formData, name: e.target.value })}
                placeholder="VD: Gói Bơi Bốn Mùa 3 Tháng"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mô tả quyền lợi</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
              placeholder="Quyền lợi ra vào, tủ đồ cá nhân..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Thời hạn (Tháng) *</label>
              <input
                type="number"
                min="1"
                max="60"
                required
                value={formData.durationMonths}
                onChange={(e) => onChange({ ...formData, durationMonths: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Giá bán (VNĐ) *</label>
              <input
                type="number"
                min="0"
                step="50000"
                required
                value={formData.price}
                onChange={(e) => onChange({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Buổi tối đa/tuần *</label>
              <input
                type="number"
                min="1"
                max="30"
                required
                value={formData.maxClassesPerWeek}
                onChange={(e) => onChange({ ...formData, maxClassesPerWeek: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="pkgActive"
              checked={formData.isActive}
              onChange={(e) => onChange({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
            />
            <label htmlFor="pkgActive" className="text-xs text-slate-300 font-semibold cursor-pointer">
              Kích hoạt gói tập này để bán ngay
            </label>
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
              {isEditing ? 'Lưu thay đổi' : 'Tạo gói ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
