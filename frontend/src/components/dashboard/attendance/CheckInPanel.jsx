import React from 'react';

export default function CheckInPanel({
  members,
  selectedUserId,
  onUserSelect,
  selectedUserObj,
  memberActiveSubs,
  checkInNotes,
  onNotesChange,
  onCheckIn,
  activeInFacility,
  onCheckOut,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
          Trạm Check-In Tại Quầy
        </h3>

        <form onSubmit={onCheckIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Chọn Hội viên *
            </label>
            <select
              required
              value={selectedUserId}
              onChange={(e) => onUserSelect(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName} — SĐT: {m.phone}
                </option>
              ))}
            </select>
          </div>

          {selectedUserObj && (
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tình trạng gói tập:</span>
                {memberActiveSubs.length > 0 ? (
                  <span className="font-bold text-emerald-400">
                    Hợp lệ (ACTIVE)
                  </span>
                ) : (
                  <span className="font-bold text-amber-400">
                    Chưa có gói kích hoạt
                  </span>
                )}
              </div>

              {memberActiveSubs.length > 0 && (
                <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                  <div>Gói: <strong>{memberActiveSubs[0].packageNameSnapshot}</strong></div>
                  <div>Hạn dùng: Đến {memberActiveSubs[0].endDate}</div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Khu vực vào / Ghi chú
            </label>
            <input
              type="text"
              value={checkInNotes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="VD: Cổng 1, Sân Tennis, Phòng Gym..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors"
          >
            Xác nhận Check-In
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">
            Hội Viên Đang Có Mặt ({activeInFacility.length})
          </h3>
        </div>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {activeInFacility.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              Hiện tại không có hội viên nào trong cơ sở
            </p>
          ) : (
            activeInFacility.map((att) => (
              <div
                key={att.id}
                className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{att.userFullName}</div>
                  <div className="text-[11px] text-slate-400">{att.notes}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    Vào lúc: {new Date(att.checkInTime).toLocaleTimeString('vi-VN')}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onCheckOut(att.id, att.userFullName)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 font-bold text-xs border border-slate-700 transition-colors"
                >
                  Check-Out
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
