import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      await login(formData.email, formData.password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại, vui lòng kiểm tra lại thông tin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex flex-col justify-center items-center p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-emerald-500/20">
              SC
            </div>
            <span className="text-2xl font-black text-white">
              Sport<span className="text-emerald-400">Center</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Đăng ký tài khoản hội viên</h2>
          <p className="text-xs text-slate-400 mt-1">
            Gia nhập cộng đồng thể thao và tập luyện tại SportCenter
          </p>
        </div>

        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nguyễn Văn An"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="an.nguyen@gmail.com"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0901234567"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Xác nhận
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm disabled:opacity-50 mt-2"
            >
              {submitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs">
          <Link to="/" className="text-slate-500 hover:text-slate-300">
            ← Quay lại Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
