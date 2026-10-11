import React from 'react';

export default function KpiCard({ title, value, sub, borderColor }) {
  return (
    <div className={`rounded-2xl p-5 bg-[#0f172a] border ${borderColor} shadow-md`}>
      <span className="text-xs text-slate-400 font-medium block mb-2">{title}</span>
      <div className="text-2xl font-black text-white mb-1.5">{value}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
    </div>
  );
}
