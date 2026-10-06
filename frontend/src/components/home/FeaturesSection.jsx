import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { featuresData } from '../../data/sportCenterData';

export default function FeaturesSection({ onSelectFeature }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả phân hệ' },
    { id: 'members', label: 'Hội viên & Check-in' },
    { id: 'schedule', label: 'Lịch sân & Lớp học' },
    { id: 'finance', label: 'Thu phí & Hóa đơn' },
    { id: 'marketing', label: 'Marketing & Zalo App' },
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? featuresData 
    : featuresData.filter(f => f.category === activeCategory);

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#080d1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Hệ sinh thái Quản trị Thể thao Toàn diện
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hơn 48 tính năng — SportCenter là giải pháp quản lý thể thao & sân bãi toàn diện nhất Việt Nam
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Tất cả phân hệ tích hợp liền mạch — từ quản lý hội viên, đặt lịch sân bãi, thu phí đến marketing và chuỗi cơ sở
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-[#0f172a] rounded-2xl border border-slate-800/90 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Top Preview Mockup Banner */}
                  <div className="bg-[#0b1329] border-b border-slate-800/90 p-4 h-44 flex flex-col justify-between relative overflow-hidden group-hover:bg-[#0c152e] transition-colors">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pb-2 border-b border-slate-800/60">
                      <span className="truncate pr-2 font-semibold text-slate-300">{item.mockupData.title}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    </div>

                    {/* Dynamic Mockup Visuals by Preview Type */}
                    <div className="py-2 flex-1 flex flex-col justify-center">
                      {item.previewType === 'table' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.rows.map((r, i) => (
                            <div key={i} className="flex items-center justify-between bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
                              <span className="text-white font-medium truncate max-w-[100px]">{r.name}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${r.alert ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                                {r.exp}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'calendar' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.slots.map((s, i) => (
                            <div key={i} className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] text-emerald-400 font-semibold">{s.time}</div>
                                <div className="text-[11px] text-white font-medium truncate max-w-[120px]">{s.title}</div>
                              </div>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                                {s.booked}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'payment' && (
                        <div className="text-center py-1">
                          <div className="text-xs text-slate-400">Doanh thu hôm nay</div>
                          <div className="text-xl font-black text-emerald-400 my-1">{item.mockupData.amount}</div>
                          <div className="flex justify-center gap-1.5 text-[10px]">
                            {item.mockupData.methods.map((m, i) => (
                              <span key={i} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.previewType === 'pt' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.pts.map((p, i) => (
                            <div key={i} className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-white">{p.name}</div>
                                <div className="text-[10px] text-slate-400">{p.session}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] text-emerald-400 font-bold">{p.kpi}</div>
                                <div className="text-[11px] text-slate-300">{p.com}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'campaign' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.campaigns.map((c, i) => (
                            <div key={i} className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
                              <div className="font-medium text-white text-[11px] truncate">{c.name}</div>
                              <div className="flex justify-between text-[10px] text-emerald-400 mt-0.5">
                                <span>{c.sent}</span>
                                <span>Đã gửi: {c.openRate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'loyalty' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.tiers.map((t, i) => (
                            <div key={i} className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-amber-300 text-[11px]">{t.name}</div>
                                <div className="text-[10px] text-slate-400">{t.perk}</div>
                              </div>
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                                {t.points}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'mobile' && (
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 space-y-1 text-[11px]">
                          {item.mockupData.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-slate-300">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.previewType === 'chain' && (
                        <div className="space-y-1.5 text-[11px]">
                          {item.mockupData.branches.map((b, i) => (
                            <div key={i} className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex justify-between items-center">
                              <div>
                                <div className="font-medium text-white">{b.name}</div>
                                <div className="text-[10px] text-slate-400">{b.members}</div>
                              </div>
                              <span className="text-[11px] font-bold text-emerald-400">
                                {b.revenue}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3.5">
                    {/* Title + Icon */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                      {item.desc}
                    </p>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => onSelectFeature(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider group-hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <span>Tìm hiểu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
