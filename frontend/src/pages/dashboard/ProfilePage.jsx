import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ActiveMembershipCard from '../../components/dashboard/profile/ActiveMembershipCard';
import ProfileForm from '../../components/dashboard/profile/ProfileForm';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [activeSubs, setActiveSubs] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: 'MALE',
    dateOfBirth: '',
    avatarUrl: '',
    heightCm: '',
    weightKg: '',
    fitnessGoal: '',
    yearsExperience: '',
    certifications: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [userProfile, subs] = await Promise.all([
        api.getMyProfile(),
        api.getMyActiveSubscriptions(),
      ]);

      setProfile(userProfile);
      setActiveSubs(subs);

      setFormData({
        fullName: userProfile.fullName || '',
        phone: userProfile.phone || '',
        gender: userProfile.gender || 'MALE',
        dateOfBirth: userProfile.dateOfBirth || '',
        avatarUrl: userProfile.avatarUrl || '',
        heightCm: userProfile.heightCm || '',
        weightKg: userProfile.weightKg || '',
        fitnessGoal: userProfile.fitnessGoal || '',
        yearsExperience: userProfile.yearsExperience || '',
        certifications: userProfile.certifications || '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateMyProfile(formData);
      setMessage({ type: 'success', text: 'Cập nhật hồ sơ cá nhân thành công!' });
      loadProfile();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi cập nhật' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white">Hồ Sơ Cá Nhân & Thẻ Thành Viên</h2>
        <p className="text-xs text-slate-400">Quản lý thông tin cá nhân, chỉ số thể chất và gói tập của bạn</p>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
              : 'bg-rose-950/50 border border-rose-800 text-rose-300'
          }`}
        >
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage({ type: '', text: '' })}>✕</button>
        </div>
      )}

      <ActiveMembershipCard activeSubs={activeSubs} />

      <ProfileForm
        profile={profile}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSave}
        saving={saving}
      />
    </div>
  );
}
