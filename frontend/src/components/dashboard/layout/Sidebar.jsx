import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, switchDemoRole, isReceptionist } = useAuth();
  const navigate = useNavigate();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { to: '/app', label: 'Tổng quan' },
    { to: '/app/users', label: 'Quản lý Người dùng', show: isReceptionist },
    { to: '/app/packages', label: 'Gói tập thể thao' },
    { to: '/app/subscriptions', label: 'Đăng ký & Gia hạn' },
    { to: '/app/attendance', label: 'Điểm danh ra vào', show: isReceptionist },
    { to: '/app/payments', label: 'Thu phí & Hóa đơn', show: isReceptionist },
    { to: '/app/profile', label: 'Hồ sơ cá nhân' },
  ].filter((item) => item.show !== false);

  const roleLabels = {
    MANAGER: { label: 'Quản lý', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    RECEPTIONIST: { label: 'Lễ tân', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    COACH: { label: 'HLV (Coach)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    MEMBER: { label: 'Hội viên', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  };

  const handleRoleChange = (role) => {
    switchDemoRole(role);
    setRoleMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0b1329] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-4 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">
              SC
            </div>
            <div>
              <span className="text-lg font-black text-white">
                Sport<span className="text-emerald-400">Center</span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Portal</p>
            </div>
          </Link>
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800"
          >
            Trang chủ
          </Link>
        </div>

        <div className="relative">
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-400">Tài khoản</span>
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="text-[10px] font-semibold text-emerald-400 hover:underline"
              >
                Đổi vai trò ▾
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt=""
                className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{user?.fullName || 'Người dùng'}</div>
                <span
                  className={`inline-block text-[10px] px-2 py-0.2 rounded border mt-0.5 ${
                    roleLabels[user?.role]?.color || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {roleLabels[user?.role]?.label || user?.role}
                </span>
              </div>
            </div>
          </div>

          {roleMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0f172a] border border-slate-700 rounded-xl p-1.5 shadow-xl z-50">
              <p className="text-[10px] text-slate-400 px-2 py-1">Chọn vai trò demo:</p>
              {Object.keys(roleLabels).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-slate-800 ${
                    user?.role === r ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-300'
                  }`}
                >
                  <span>{roleLabels[r].label}</span>
                  {user?.role === r && <span className="text-emerald-400 text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold border border-rose-900/40"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
