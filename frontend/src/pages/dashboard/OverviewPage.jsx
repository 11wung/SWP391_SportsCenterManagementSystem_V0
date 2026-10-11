import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import KpiCard from '../../components/dashboard/overview/KpiCard';
import RecentActivities from '../../components/dashboard/overview/RecentActivities';

export default function OverviewPage() {
  const { user, isReceptionist } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubs: 0,
    todayCheckIns: 0,
    totalRevenue: 0,
  });
  const [recentAttendances, setRecentAttendances] = useState([]);
  const [recentSubs, setRecentSubs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [users, subs, atts] = await Promise.all([
        api.searchUsers(),
        api.getAllSubscriptions(),
        api.getRecentAttendances(),
      ]);

      const active = subs.filter((s) => s.status === 'ACTIVE').length;
      const totalRev = subs
        .filter((s) => s.status === 'ACTIVE')
        .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

      setStats({
        totalUsers: users.length,
        activeSubs: active,
        todayCheckIns: atts.length,
        totalRevenue: totalRev,
      });

      setRecentAttendances(atts.slice(0, 5));
      setRecentSubs(subs.slice(0, 5));
    } catch (e) {
      console.error(e);
    }
  };

  const kpis = [
    {
      title: 'Tổng người dùng & hội viên',
      value: stats.totalUsers,
      sub: '+12% so với tháng trước',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Gói tập đang hoạt động',
      value: stats.activeSubs,
      sub: 'Đang khai thác sân & phòng',
      borderColor: 'border-emerald-500/30',
    },
    {
      title: 'Lượt Check-in hôm nay',
      value: stats.todayCheckIns,
      sub: 'Lượt vào cơ sở',
      borderColor: 'border-purple-500/30',
    },
    {
      title: 'Doanh thu gói tập',
      value: `${(stats.totalRevenue / 1000000).toFixed(1)}M ₫`,
      sub: 'Đối soát tự động qua VietQR',
      borderColor: 'border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#0b1329] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider border border-emerald-500/20 inline-block">
            Bảng điều hành
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Xin chào, {user?.fullName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Hệ thống quản trị SportCenter: Quản lý hội viên, dịch vụ gói tập, gia hạn và điểm danh ra vào.
          </p>
        </div>

        {isReceptionist && (
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/app/attendance"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors"
            >
              Check-in Cổng
            </Link>
            <Link
              to="/app/subscriptions"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Đăng ký Gói
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} />
        ))}
      </div>

      <RecentActivities attendances={recentAttendances} subscriptions={recentSubs} />
    </div>
  );
}
