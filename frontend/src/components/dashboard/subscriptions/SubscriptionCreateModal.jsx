import React from 'react';

export default function SubscriptionCreateModal({
  isOpen,
  onClose,
  isMember,
  user,
  users,
  packages,
  formData,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  const selectedPkg = packages.find((p) => p.id === Number(formData.packageId) || p.id === formData.packageId);

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

        <h3 className="text-xl font-bold text-white mb-1">Đăng Ký Gói Tập Mới</h3>
        <p className="text-xs text-slate-400 mb-5">
          Khởi tạo hợp đồng hội viên tại SportCenter
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hội viên</label>
            {isMember ? (
              <input
                type="text"
                disabled
                value={`${user?.fullName} (${user?.phone})`}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-400"
              />
            ) : (
              <select
                value={formData.userId}
                onChange={(e) => onChange({ ...formData, userId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.fullName} - {u.phone} (ID: #{u.id})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Chọn gói dịch vụ</label>
            <select
              value={formData.packageId}
              onChange={(e) => onChange({ ...formData, packageId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.packageName} ({p.durationInMonths} tháng) — {p.price?.toLocaleString('vi-VN')} đ
                </option>
              ))}
            </select>
          </div>

          {selectedPkg && (
            <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Thời hạn hiệu lực:</span>
                <span className="text-white font-semibold">{selectedPkg.durationInMonths} tháng</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Buổi tập:</span>
                <span className="text-white font-semibold">
                  {selectedPkg.sessionQuota ? `${selectedPkg.sessionQuota} buổi` : 'Không giới hạn'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                <span>Tổng học phí:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {selectedPkg.price?.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3">
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
              Xác nhận đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
