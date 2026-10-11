import React from 'react';

export default function ActiveMembershipCard({ activeSubs }) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-[#0b1329] border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Gói Tập Đang Hoạt Động
        </h3>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          {activeSubs.length > 0 ? `${activeSubs.length} gói còn hạn` : 'Chưa có gói kích hoạt'}
        </span>
      </div>

      {activeSubs.length === 0 ? (
        <p className="text-xs text-slate-400">
          Hiện tại bạn chưa đăng ký gói tập nào đang hoạt động. Vui lòng vào mục "Gói tập thể thao" để đăng ký.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSubs.map((sub) => (
            <div
              key={sub.id}
              className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{sub.packageNameSnapshot}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center justify-between">
                <span>Hạn sử dụng:</span>
                <strong className="text-emerald-400">{sub.startDate} → {sub.endDate}</strong>
              </div>
              <div className="text-xs text-slate-400">
                Số buổi còn lại: <strong className="text-white">{sub.remainingSessions ?? 'Không giới hạn'}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
