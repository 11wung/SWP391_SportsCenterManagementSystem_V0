import React from 'react';

const STATUSES = [
  { key: '', label: 'Tất cả trạng thái' },
  { key: 'ACTIVE', label: 'Đang hiệu lực (ACTIVE)' },
  { key: 'PENDING', label: 'Chờ thanh toán (PENDING)' },
  { key: 'EXPIRED', label: 'Đã hết hạn (EXPIRED)' },
];

export default function SubscriptionFilterBar({ searchTerm, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div className="w-full sm:w-80">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên hội viên, gói tập..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
        >
          {STATUSES.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
