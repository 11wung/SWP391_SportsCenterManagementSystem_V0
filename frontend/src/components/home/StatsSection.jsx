import React from 'react';
import { statsData } from '../../data/sportCenterData';

export default function StatsSection() {
  return (
    <section className="py-14 bg-[#090e1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f172a]/70 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-16 h-16 text-emerald-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-base font-bold text-white mb-1.5">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
