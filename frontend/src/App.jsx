import React, { useState } from 'react';
import TopBanner from './components/common/TopBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingContact from './components/common/FloatingContact';
import DemoModal from './components/common/DemoModal';
import FeatureDetailModal from './components/common/FeatureDetailModal';
import HomePage from './pages/HomePage';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  const handleSelectFeature = (feature) => {
    setSelectedFeature(feature);
  };

  const handleCloseFeature = () => {
    setSelectedFeature(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* 1. Top Announcement Header */}
      <TopBanner onOpenDemo={handleOpenDemo} />

      {/* 2. Global Navbar */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* 3. Main Page Routing / View */}
      <main className="flex-grow">
        <HomePage
          onOpenDemo={handleOpenDemo}
          onSelectFeature={handleSelectFeature}
        />
      </main>

      {/* 4. Global Footer */}
      <Footer onOpenDemo={handleOpenDemo} />

      {/* 5. Floating Quick Action Hotline */}
      <FloatingContact onOpenDemo={handleOpenDemo} />

      {/* 6. Interactive Demo Booking Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
      />

      {/* 7. Feature Details Modal */}
      <FeatureDetailModal
        feature={selectedFeature}
        onClose={handleCloseFeature}
        onOpenDemo={handleOpenDemo}
      />
    </div>
  );
}
