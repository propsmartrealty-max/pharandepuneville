import React, { useState, useEffect } from 'react';
import { Phone, Download, Calendar, Menu, X, Compass, Map, Building2, Layers, Waves, Camera, Navigation, Calculator } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';
import { CLEAN_ROUTES } from '../data/routesData';
import PunevilleLogo from './PunevilleLogo';

const NAV_ICONS = {
  vision: Compass,
  masterplan: Map,
  towers: Building2,
  residences: Layers,
  amenities: Waves,
  gallery: Camera,
  location: Navigation,
  financials: Calculator,
};

export default function Navbar({ activeSection, onNavigate, onOpenBrochure, onOpenVisit }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = CLEAN_ROUTES.filter(r => [
    'vision', 'masterplan', 'towers', 'residences', 'amenities', 'gallery', 'location', 'financials'
  ].includes(r.id));

  const handleLinkClick = (e, id, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id, path);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', path);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 font-google transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FAF7F2]/80 backdrop-blur-3xl border-b border-white/90 shadow-[0_12px_45px_rgba(15,23,42,0.08),inset_0_-1px_0_rgba(197,155,39,0.2)]' 
        : 'bg-[#FAF7F2]/65 backdrop-blur-2xl border-b border-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_-1px_0_rgba(197,155,39,0.12)]'
    }`}>
      {/* Dynamic Gold Scroll Progress Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Monument Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              history.pushState(null, '', '/');
            }}
            className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Pharande Puneville Home"
          >
            <PunevilleLogo variant="dark" size="md" />
          </a>

          {/* Desktop Navigation Links (Clean URLs with Active Indicator) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
            {navItems.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.id, link.path)}
                  className={`px-3 py-1.5 rounded-xl text-xs 2xl:text-[12.5px] font-google font-extrabold tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#845D12] border border-amber-400/40 shadow-sm scale-105'
                      : 'text-[#1E293B] hover:text-[#845D12] hover:bg-white/60 hover:backdrop-blur-sm'
                  }`}
                >
                  {link.navLabel}
                </a>
              );
            })}
          </nav>

          {/* Quick CTA Actions */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={onOpenBrochure}
              className="h-10 px-3.5 rounded-xl text-xs font-google font-extrabold tracking-wider uppercase text-[#0F172A] bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#845D12]" />
              <span>BROCHURE</span>
            </button>

            <button
              onClick={onOpenVisit}
              className="h-10 px-4 rounded-xl text-xs font-google font-extrabold tracking-wider uppercase text-white bg-[#0F172A] hover:bg-[#1E293B] backdrop-blur-md border border-white/20 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shimmer-sweep-btn cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>BOOK VIP TOUR</span>
            </button>

            <a
              href={`tel:${PROJECT_INFO.phone}`}
              className="w-10 h-10 rounded-xl bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-center text-[#0F172A] hover:text-[#845D12] transition-colors flex-shrink-0"
              title="Call Sales Concierge"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 text-[#0F172A] hover:bg-white flex items-center justify-center xl:hidden shadow-sm transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF7F2]/95 backdrop-blur-3xl border-b border-white/90 px-4 pt-3 pb-6 space-y-3 shadow-2xl font-google animate-fadeIn">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((link) => {
              const Icon = NAV_ICONS[link.id] || Compass;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.id, link.path)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-google font-extrabold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#0F172A] text-white shadow-md'
                      : 'text-[#1E293B] hover:bg-white/80 hover:text-[#845D12]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-[#845D12]'}`} />
                  <span className="truncate">{link.navLabel}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D8CEBF]/60 grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBrochure(); }}
              className="w-full h-11 rounded-xl text-xs font-google font-extrabold uppercase tracking-wider text-[#0F172A] bg-white/90 backdrop-blur-md border border-white flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#845D12]" />
              <span>BROCHURE</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVisit(); }}
              className="w-full h-11 rounded-xl text-xs font-google font-extrabold uppercase tracking-wider text-white bg-[#0F172A] backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>BOOK VIP TOUR</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
