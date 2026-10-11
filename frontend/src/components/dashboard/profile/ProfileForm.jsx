import React from 'react';

export default function ProfileForm({ profile, formData, onChange, onSubmit, saving }) {
  if (!profile) return null;

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 shadow-xl">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <img
            src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt=""
            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/50"
          />
          <div className="flex-1 w-full space-y-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Link ảnh đại diện (Avatar URL)</label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => onChange({ ...formData, avatarUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="text-[11px] text-slate-400">
              Email tài khoản: <span className="text-white font-mono">{profile.email}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => onChange({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => onChange({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Giới tính</label>
            <select
              value={formData.gender}
              onChange={(e) => onChange({ ...formData, gender: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Ngày sinh</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange({ ...formData, dateOfBirth: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {profile.role === 'MEMBER' && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Chỉ số thể hình & Mục tiêu hội viên
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chiều cao (cm)</label>
                <input
                  type="number"
                  placeholder="175"
                  value={formData.heightCm}
                  onChange={(e) => onChange({ ...formData, heightCm: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cân nặng (kg)</label>
                <input
                  type="number"
                  placeholder="68"
                  value={formData.weightKg}
                  onChange={(e) => onChange({ ...formData, weightKg: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mục tiêu luyện tập</label>
                <input
                  type="text"
                  placeholder="Tăng cơ, giảm mỡ, bơi lội..."
                  value={formData.fitnessGoal}
                  onChange={(e) => onChange({ ...formData, fitnessGoal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {profile.role === 'COACH' && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Hồ sơ Huấn Luyện Viên
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Số năm kinh nghiệm</label>
                <input
                  type="number"
                  placeholder="3"
                  value={formData.yearsExperience}
                  onChange={(e) => onChange({ ...formData, yearsExperience: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chứng chỉ chuyên môn</label>
                <input
                  type="text"
                  placeholder="NASM CPT, CrossFit L1..."
                  value={formData.certifications}
                  onChange={(e) => onChange({ ...formData, certifications: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
