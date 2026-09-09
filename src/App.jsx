import React, { useState, useEffect } from 'react';
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
import SEOTopicalHub from './components/SEOTopicalHub';
import Footer from './components/Footer';
import VIPConciergeModal from './components/VIPConciergeModal';
import FloatingContactBar from './components/FloatingContactBar';
import { CLEAN_ROUTES, ALIAS_ROUTES } from './data/routesData';

export default function App({ initialSection = null }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('visit'); // 'visit' | 'brochure' | 'pricing' | 'cluster'
  const [modalConfig, setModalConfig] = useState(null);
  const [calculatorPrefill, setCalculatorPrefill] = useState(null);
  const [activeSection, setActiveSection] = useState(initialSection || null);

  const handleNavigate = (id, path) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (path && window.location.pathname !== path) {
      history.pushState(null, '', path);
    }
  };

  useEffect(() => {
    // 1. Immediately clean up any hash fragment in the browser address bar
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 120);
      }
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // 2. Initial scroll if initialSection or matching path
    const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const matched = CLEAN_ROUTES.find(r => r.path === currentPath) 
      || ALIAS_ROUTES.find(a => a.path === currentPath) 
      || (initialSection ? CLEAN_ROUTES.find(r => r.id === initialSection) : null);

    if (matched && matched.id) {
      setActiveSection(matched.id);
      setTimeout(() => {
        const el = document.getElementById(matched.id);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 180);
    }

    // 3. Scroll spy with IntersectionObserver for clean URL & active section synchronization
    const sectionIds = ['vision', 'masterplan', 'towers', 'residences', 'amenities', 'gallery', 'location', 'financials', 'construction', 'developer', 'topical-hub'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const id = entry.target.id;
          setActiveSection(id);
          const route = CLEAN_ROUTES.find(r => r.id === id);
          if (route && window.location.pathname !== route.path) {
            history.replaceState(null, '', route.path);
          }
        }
      });
    }, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.35]
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Reset URL to '/' when at very top
    const handleScrollTop = () => {
      if (window.scrollY < 120) {
        setActiveSection(null);
        if (window.location.pathname !== '/' && window.location.pathname !== '') {
          history.replaceState(null, '', '/');
        }
      }
    };
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    // 4. Global anchor click interceptor ensuring zero hash exposure
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && (href.startsWith('#') || href.startsWith('/#'))) {
        e.preventDefault();
        const targetId = href.replace(/^\/?#/, '');
        if (targetId) {
          handleNavigate(targetId, `/${targetId}`);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.replaceState(null, '', '/');
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScrollTop);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [initialSection]);

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
    handleNavigate('financials', '/emi-calculator');
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
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBrochure={handleOpenBrochure}
        onOpenVisit={handleOpenVisit}
      />

      {/* Main Content Flow */}
      <main className="flex-1 relative z-10">
        {/* Cinematic Hero */}
        <HeroSection
          onOpenBrochure={handleOpenBrochure}
          onOpenVisit={handleOpenVisit}
          onNavigate={handleNavigate}
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
          onNavigate={handleNavigate}
        />

        {/* Tower & Cluster Navigator */}
        <TowerExplorer
          onOpenVisit={handleOpenVisit}
          onOpenBrochure={handleOpenBrochure}
        />

        {/* Residences & Floor Plans */}
        <ResidencesFloorPlans
          onOpenVisit={handleOpenVisit}
          onOpenBrochure={handleOpenBrochure}
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

        {/* Ultra-Advanced SEO Topical Authority & Knowledge Graph */}
        <SEOTopicalHub
          onOpenVisit={handleOpenVisit}
          onOpenBrochure={handleOpenBrochure}
          onNavigate={handleNavigate}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBrochure={handleOpenBrochure}
        onOpenVisit={handleOpenVisit}
        onNavigate={handleNavigate}
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
