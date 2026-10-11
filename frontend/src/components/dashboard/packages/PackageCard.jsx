import React from 'react';

export default function PackageCard({ pkg, isManager, onSelect, onEdit, onDelete }) {
  return (
    <div
      className={`rounded-2xl bg-[#0f172a] border transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
        pkg.isActive
          ? 'border-slate-800 hover:border-emerald-500/40'
          : 'border-slate-800/50 opacity-60'
      }`}
    >
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {pkg.code}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              pkg.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}
          >
            {pkg.isActive ? 'Đang áp dụng' : 'Tạm ngưng'}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-1">{pkg.name}</h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {pkg.description || 'Gói tập thể thao tiêu chuẩn'}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <div className="text-2xl font-black text-emerald-400">
            {(pkg.price || 0).toLocaleString('vi-VN')} ₫
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Thời hạn: <strong className="text-white">{pkg.durationMonths} Tháng</strong>
          </div>
        </div>

        <div className="space-y-1.5 pt-1 text-xs text-slate-300">
          <div>• {pkg.maxClassesPerWeek} buổi / tuần</div>
          <div>• Tự do vào sân & phòng tập</div>
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelect(pkg)}
          className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-colors text-center"
        >
          Đăng ký gói này
        </button>

        {isManager && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(pkg)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
            >
              Sửa
            </button>
            <button
              type="button"
              onClick={() => onDelete(pkg)}
              className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-900/40"
            >
              Xóa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
