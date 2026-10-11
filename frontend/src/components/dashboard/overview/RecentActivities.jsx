import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentActivities({ attendances, subscriptions }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-[#0f172a] rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Lượt Check-in Gần Nhất</h3>
          <Link to="/app/attendance" className="text-xs text-emerald-400 hover:underline">
            Xem tất cả →
          </Link>
        </div>

        <div className="space-y-2.5">
          {attendances.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Chưa có lượt điểm danh nào</p>
          ) : (
            attendances.map((att) => (
              <div
                key={att.id}
                className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{att.userFullName}</div>
                  <div className="text-[11px] text-slate-400">{att.notes}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-300 font-mono">
                    {new Date(att.checkInTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {att.checkOutTime ? 'Đã check-out' : 'Đang trong cơ sở'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-6 bg-[#0f172a] rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">Hợp Đồng Gói Mới</h3>
          <Link to="/app/subscriptions" className="text-xs text-emerald-400 hover:underline">
            Quản lý gói →
          </Link>
        </div>

        <div className="space-y-2.5">
          {subscriptions.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Chưa có gói tập nào</p>
          ) : (
            subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{sub.userFullName}</div>
                  <div className="text-[11px] text-slate-400">{sub.packageNameSnapshot}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">
                    {(sub.totalAmount || 0).toLocaleString('vi-VN')} ₫
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-0.5 ${
                      sub.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : sub.status === 'PENDING'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
