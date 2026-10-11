import React from 'react';

const statusBadges = {
  ACTIVE: { label: 'Đang hiệu lực', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  PENDING: { label: 'Chờ thanh toán', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  EXPIRED: { label: 'Đã hết hạn', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  CANCELLED: { label: 'Đã hủy', bg: 'bg-slate-700/50 text-slate-400 border-slate-700' },
};

export default function SubscriptionTable({
  subscriptions,
  isMember,
  isReceptionist,
  onOpenPayment,
  onRenewSub,
}) {
  if (subscriptions.length === 0) {
    return (
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-xs">
        Chưa có dữ liệu đăng ký gói tập nào
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0b1329] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Mã HĐ</th>
              <th className="py-3.5 px-4">Hội viên</th>
              <th className="py-3.5 px-4">Gói tập</th>
              <th className="py-3.5 px-4">Thời hạn</th>
              <th className="py-3.5 px-4">Giá trị</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-white text-[11px]">
                  #{sub.id}
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-white">{sub.userFullName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">ID: #{sub.userId}</div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-semibold text-emerald-400">{sub.packageNameSnapshot}</div>
                  <div className="text-[11px] text-slate-400">
                    Số buổi: {sub.remainingSessions !== null ? sub.remainingSessions : 'Không giới hạn'}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-[11px]">
                  <div>Từ: {sub.startDate || '—'}</div>
                  <div className="text-slate-400">Đến: {sub.endDate || '—'}</div>
                </td>

                <td className="py-3.5 px-4 font-semibold text-white">
                  {sub.totalAmount?.toLocaleString('vi-VN')} đ
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                      statusBadges[sub.status]?.bg || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {statusBadges[sub.status]?.label || sub.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {sub.status === 'PENDING' && (isReceptionist || isMember) && (
                      <button
                        type="button"
                        onClick={() => onOpenPayment(sub)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px]"
                      >
                        Thanh toán
                      </button>
                    )}

                    {(sub.status === 'ACTIVE' || sub.status === 'EXPIRED') && (
                      <button
                        type="button"
                        onClick={() => onRenewSub(sub)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                      >
                        Gia hạn
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
