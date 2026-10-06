import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FeatureDetailModal({ feature, onClose, onOpenDemo }) {
  if (!feature) return null;

  const Icon = feature.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            <p className="text-xs text-emerald-400 font-semibold">{feature.mockupData?.title}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {feature.desc}
        </p>

        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
            Tính năng chuyên sâu của phân hệ:
          </div>
          <div className="space-y-2">
            {feature.tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tiện ích: <strong>{tag}</strong> giúp vận hành trung tâm chuẩn hoá, hạn chế thất thoát tối đa.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Đóng lại
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Trải nghiệm phân hệ này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
