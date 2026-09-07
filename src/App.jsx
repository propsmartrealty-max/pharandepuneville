import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ArchitecturalTicker from './components/ArchitecturalTicker';
import AedasVision from './components/AedasVision';
import InteractiveMasterplan from './components/InteractiveMasterplan';
import TowerExplorer from './components/TowerExplorer';
import ResidencesFloorPlans from './components/ResidencesFloorPlans';
import AmenitiesGalaxy from './components/AmenitiesGalaxy';
import LocationRadar from './components/LocationRadar';
import FinancialCalculator from './components/FinancialCalculator';
import ConstructionTracker from './components/ConstructionTracker';
import DeveloperLegacy from './components/DeveloperLegacy';
import RealGalleryShowcase from './components/RealGalleryShowcase';
import Footer from './components/Footer';
import VIPConciergeModal from './components/VIPConciergeModal';
import FloatingContactBar from './components/FloatingContactBar';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('visit'); // 'visit' | 'brochure' | 'pricing' | 'cluster'
  const [modalConfig, setModalConfig] = useState(null);
  const [calculatorPrefill, setCalculatorPrefill] = useState(null);

  const handleOpenBrochure = (config = null) => {
    setModalMode('brochure');
    if (typeof config === 'string') setModalConfig(config);
    setModalOpen(true);
  };

  const handleOpenVisit = (config = null) => {
    setModalMode('visit');
    if (typeof config === 'string') setModalConfig(config);
    setModalOpen(true);
  };

  const handleSelectForEMI = (price) => {
    setCalculatorPrefill(price);
    const element = document.getElementById('financials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] flex flex-col selection:bg-[#C59B27] selection:text-white font-sans relative">
      {/* Ambient chromatic refraction orbs with subtle floating animation for global glassmorphism depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[6%] -left-32 w-[650px] h-[650px] bg-gradient-to-br from-amber-300/40 via-yellow-200/30 to-transparent rounded-full blur-[130px] animate-orb-1" />
        <div className="absolute top-[26%] -right-36 w-[700px] h-[700px] bg-gradient-to-bl from-orange-300/35 via-amber-200/30 to-transparent rounded-full blur-[140px] animate-orb-2" />
        <div className="absolute top-[50%] -left-32 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-transparent rounded-full blur-[150px] animate-orb-1" />
        <div className="absolute top-[70%] -right-32 w-[750px] h-[750px] bg-gradient-to-br from-sky-200/45 via-indigo-100/30 to-transparent rounded-full blur-[140px] animate-orb-2" />
        <div className="absolute top-[88%] left-1/4 w-[600px] h-[600px] bg-gradient-to-t from-amber-200/40 via-yellow-100/30 to-transparent rounded-full blur-[130px] animate-orb-1" />
      </div>

      {/* Top Fixed Header */}
      <Navbar
        onOpenBrochure={handleOpenBrochure}
        onOpenVisit={handleOpenVisit}
      />

      {/* Main Content Flow */}
      <main className="flex-1 relative z-10">
        {/* Cinematic Hero */}
        <HeroSection
          onOpenBrochure={handleOpenBrochure}
          onOpenVisit={handleOpenVisit}
        />

        {/* Live Infinite Luxury USP Marquee Ticker */}
        <ArchitecturalTicker />

        {/* Aedas Architectural Vision */}
        <AedasVision
          onOpenVisit={handleOpenVisit}
        />

        {/* 28-Acre Interactive Masterplan */}
        <InteractiveMasterplan
          onOpenVisit={handleOpenVisit}
        />

        {/* Tower & Cluster Navigator */}
        <TowerExplorer
          onOpenVisit={handleOpenVisit}
          onOpenBrochure={handleOpenBrochure}
        />

        {/* Residences & Floor Plans */}
        <ResidencesFloorPlans
          onOpenVisit={handleOpenVisit}
          onSelectForEMI={handleSelectForEMI}
        />

        {/* 40+ Amenities Galaxy */}
        <AmenitiesGalaxy
          onOpenVisit={handleOpenVisit}
        />

        {/* Real Photographic & Architectural Gallery */}
        <RealGalleryShowcase
          onOpenVisit={handleOpenVisit}
        />

        {/* Strategic Location Radar & Commute Calculator */}
        <LocationRadar
          onOpenVisit={handleOpenVisit}
        />

        {/* Smart EMI & Mortgage Calculator */}
        <FinancialCalculator
          prefilledPrice={calculatorPrefill}
          onOpenVisit={handleOpenVisit}
        />

        {/* MahaRERA Compliance & Technical Craftsmanship */}
        <ConstructionTracker
          onOpenVisit={handleOpenVisit}
        />

        {/* Developer Heritage & Resident Testimonials */}
        <DeveloperLegacy
          onOpenVisit={handleOpenVisit}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBrochure={handleOpenBrochure}
        onOpenVisit={handleOpenVisit}
      />

      {/* Floating Action Bar */}
      <FloatingContactBar
        onOpenVisit={handleOpenVisit}
      />

      {/* VIP Booking / Brochure Modal */}
      <VIPConciergeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        initialConfig={modalConfig}
      />
    </div>
  );
}
