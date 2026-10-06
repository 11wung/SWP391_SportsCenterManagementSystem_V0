import React from 'react';
import { CheckCircle } from 'lucide-react';
import { partnersData } from '../../data/sportCenterData';

export default function PartnersSection() {
  return (
    <section id="partners" className="py-12 border-y border-slate-800/80 bg-[#070b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-emerald-400 uppercase">
            Được tin dùng bởi hơn 2.500+ Tổ hợp Thể thao, Cụm sân & CLB hàng đầu
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partnersData.map((partner, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl p-4 bg-gradient-to-b ${partner.color} border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-emerald-400 border border-slate-700">
                  {partner.tag}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
              </div>

              <div className="h-14 flex items-center mb-2">
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  {partner.name}
                </h3>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {partner.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{partner.category}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Sport Brands Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-around gap-6 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-semibold tracking-wider text-slate-400">
          <span>NATIONAL SPORT ARENA</span>
          <span>•</span>
          <span>OLYMPIC SWIMMING CLUB</span>
          <span>•</span>
          <span>PICKLEBALL PRO LEAGUE</span>
          <span>•</span>
          <span>FUTSAL GOLD STADIUM</span>
          <span>•</span>
          <span>DIAMOND FITNESS & SPA</span>
        </div>

      </div>
    </section>
  );
}
