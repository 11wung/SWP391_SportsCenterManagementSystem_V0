import React from 'react';

export default function AttendanceHistoryTable({ attendances }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-4 bg-[#0b1329] border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Lịch Sử Điểm Danh Gần Đây (7 Ngày)
        </h3>
        <span className="text-xs text-slate-500">{attendances.length} lượt ghi nhận</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0b1329]/60 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">Hội viên</th>
              <th className="py-3 px-4">Giờ Vào (Check-in)</th>
              <th className="py-3 px-4">Giờ Ra (Check-out)</th>
              <th className="py-3 px-4">Khu vực / Ghi chú</th>
              <th className="py-3 px-4">Người ghi nhận</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {attendances.map((att) => (
              <tr key={att.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-bold text-white">{att.userFullName}</td>
                <td className="py-3 px-4 text-emerald-400 font-mono">
                  {new Date(att.checkInTime).toLocaleString('vi-VN')}
                </td>
                <td className="py-3 px-4 font-mono">
                  {att.checkOutTime ? (
                    <span className="text-slate-300">
                      {new Date(att.checkOutTime).toLocaleString('vi-VN')}
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold italic">Đang trong phòng</span>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-300">{att.notes}</td>
                <td className="py-3 px-4 text-slate-400 text-[11px]">
                  {att.recordedBy || 'Hệ thống'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
