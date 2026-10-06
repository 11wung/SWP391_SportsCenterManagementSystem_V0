import React, { useState } from 'react';
import { ChevronDown, Menu, X, Sun, Moon, Dumbbell, Sparkles } from 'lucide-react';
import { navigationData } from '../../data/sportCenterData';

export default function Navbar({ onOpenDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('VI');

  return (
    <header className="sticky top-0 z-40 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo SportCenter */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white flex items-center">
                  Sport<span className="text-emerald-400">Center</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider -mt-1 uppercase">
                  Sports Management System
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
              
              {/* Dropdown: Sản phẩm */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
                  Sản phẩm
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>

                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 w-84 pt-2 z-50">
                    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/60 grid gap-2 backdrop-blur-xl">
                      {navigationData.products.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown: Giải pháp */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
                  Giải pháp
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>

                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50">
                    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/60 grid gap-2">
                      {navigationData.solutions.map((sol, idx) => (
                        <a
                          key={idx}
                          href={sol.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors block"
                        >
                          <div className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                            {sol.title}
                          </div>
                          <div className="text-xs text-slate-400 leading-snug">
                            {sol.desc}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a href="#features" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
                Bảng giá
              </a>

              <a href="#partners" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
                Khách hàng
              </a>

              <a href="#ecosystem" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
                Hệ sinh thái
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800/60 transition-colors"
              title="Chuyển chế độ giao diện"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setCurrentLang(currentLang === 'VI' ? 'EN' : 'VI')}
              className="text-xs font-bold px-2 py-1 rounded border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
            >
              {currentLang}
            </button>

            {/* Contact Hotline */}
            <a
              href="tel:19006868"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Hotline: 1900 6868
            </a>

            {/* CTA Button: Đặt lịch demo */}
            <button
              onClick={onOpenDemo}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-lg overflow-hidden group shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Đặt lịch demo
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenDemo}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-400"
            >
              Đặt lịch demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0b1329] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Sản phẩm & Phân hệ
          </a>
          <a
            href="#partners"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Trung tâm tiêu biểu
          </a>
          <a
            href="#ecosystem"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Hệ sinh thái SportCenter
          </a>
          <a
            href="tel:19006868"
            className="block px-3 py-2 text-base font-medium text-emerald-400 hover:bg-slate-800 rounded-lg"
          >
            Hotline: 1900 6868
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-3 text-center font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Đặt lịch demo miễn phí
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
