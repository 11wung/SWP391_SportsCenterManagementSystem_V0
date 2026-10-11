import React from 'react';

const roleBadges = {
  MANAGER: { label: 'Quản lý', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  RECEPTIONIST: { label: 'Lễ tân', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  COACH: { label: 'Huấn luyện viên', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  MEMBER: { label: 'Hội viên', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
};

export default function UserTable({ users, isManager, onEdit, onToggleStatus, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-xs">
        Không tìm thấy người dùng phù hợp
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0b1329] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Người dùng</th>
              <th className="py-3.5 px-4">Liên hệ</th>
              <th className="py-3.5 px-4">Vai trò</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4">Ngày gia nhập</th>
              <th className="py-3.5 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{u.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: #{u.id}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 space-y-0.5">
                  <div className="text-slate-300 font-medium">{u.phone}</div>
                  <div className="text-slate-400 text-[11px]">{u.email}</div>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                      roleBadges[u.role]?.bg || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {roleBadges[u.role]?.label || u.role}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded ${
                      u.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {u.isActive ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                  {u.joinDate || u.createdAt?.split('T')[0] || '2026-01-01'}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(u)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
                    >
                      Sửa
                    </button>

                    {isManager && (
                      <>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(u)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            u.isActive
                              ? 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40'
                              : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40'
                          }`}
                        >
                          {u.isActive ? 'Khóa' : 'Mở'}
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(u)}
                          className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-[11px] font-medium border border-rose-800/40 transition-colors"
                        >
                          Xóa
                        </button>
                      </>
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
