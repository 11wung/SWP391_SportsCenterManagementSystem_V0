import React from 'react';

const ROLES = [
  { key: '', label: 'Tất cả' },
  { key: 'MEMBER', label: 'Hội viên' },
  { key: 'RECEPTIONIST', label: 'Lễ tân' },
  { key: 'COACH', label: 'Huấn luyện viên' },
  { key: 'MANAGER', label: 'Quản lý' },
];

export default function UserFilterBar({ search, onSearchChange, roleFilter, onRoleFilterChange }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div className="w-full sm:w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên, email, số điện thoại..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <span className="text-xs text-slate-400 shrink-0">Lọc vai trò:</span>
        {ROLES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onRoleFilterChange(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              roleFilter === key
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
