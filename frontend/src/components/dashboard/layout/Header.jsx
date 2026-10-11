import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Header({ onToggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#080d1a]/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          ☰
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold text-white">Quản trị SportCenter</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Hệ thống trực tuyến</span>
        </div>

        <Link to="/app/profile" className="flex items-center gap-2 hover:opacity-85">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt=""
            className="w-8 h-8 rounded-full object-cover border border-slate-700"
          />
          <span className="text-xs font-semibold text-white hidden md:inline">{user?.fullName}</span>
        </Link>
      </div>
    </header>
  );
}
