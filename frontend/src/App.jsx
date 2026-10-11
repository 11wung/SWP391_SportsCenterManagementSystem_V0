import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Common Components
import TopBanner from './components/common/TopBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingContact from './components/common/FloatingContact';
import DemoModal from './components/common/DemoModal';
import FeatureDetailModal from './components/common/FeatureDetailModal';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import UsersPage from './pages/dashboard/UsersPage';
import PackagesPage from './pages/dashboard/PackagesPage';
import SubscriptionsPage from './pages/dashboard/SubscriptionsPage';
import PaymentsPage from './pages/dashboard/PaymentsPage';
import AttendancePage from './pages/dashboard/AttendancePage';
import ProfilePage from './pages/dashboard/ProfilePage';

// Landing Page Wrapper
function LandingView() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* 1. Top Announcement Header */}
      <TopBanner onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* 2. Global Navbar */}
      <Navbar onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* 3. Main Landing View */}
      <main className="flex-grow">
        <HomePage
          onOpenDemo={() => setIsDemoModalOpen(true)}
          onSelectFeature={(feat) => setSelectedFeature(feat)}
        />
      </main>

      {/* 4. Global Footer */}
      <Footer onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* 5. Floating Quick Action Hotline */}
      <FloatingContact onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* 6. Interactive Demo Booking Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* 7. Feature Details Modal */}
      <FeatureDetailModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
