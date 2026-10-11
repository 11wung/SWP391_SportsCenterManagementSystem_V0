import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('manager@sportcenter.vn');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Email hoặc mật khẩu không chính xác');
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
          <h2 className="text-xl font-bold text-white">Đăng nhập tài khoản</h2>
          <p className="text-xs text-slate-400 mt-1">
            Hệ thống quản lý và vận hành trung tâm thể thao
          </p>
        </div>

        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@sportcenter.vn"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Mật khẩu
                </label>
                <a href="#" className="text-xs text-emerald-400 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm disabled:opacity-50 mt-2"
            >
              {submitting ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Chưa có tài khoản hội viên?{' '}
            <Link to="/register" className="text-emerald-400 font-semibold hover:underline">
              Đăng ký ngay
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
