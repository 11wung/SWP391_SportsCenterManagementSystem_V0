import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PartnersSection from '../components/home/PartnersSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CaseStudyBanner from '../components/home/CaseStudyBanner';
import MobileManagementSection from '../components/home/MobileManagementSection';
import EcosystemSection from '../components/home/EcosystemSection';

export default function HomePage({ onOpenDemo, onSelectFeature }) {
  return (
    <div className="flex-grow">
      {/* Hero Showcase with Awards & Realtime Dashboard */}
      <HeroSection onOpenDemo={onOpenDemo} />

      {/* Trusted Sport Complexes & Stadiums */}
      <PartnersSection />

      {/* Verified Statistics */}
      <StatsSection />

      {/* 48+ Sports Management Feature Grid */}
      <FeaturesSection onSelectFeature={onSelectFeature} />

      {/* Featured Case Study: Elite Sport Complex */}
      <CaseStudyBanner onOpenDemo={onOpenDemo} />

      {/* Mobile App & Remote Operations */}
      <MobileManagementSection onOpenDemo={onOpenDemo} />

      {/* SportCenter Comprehensive Ecosystem */}
      <EcosystemSection onOpenDemo={onOpenDemo} />
    </div>
  );
}
