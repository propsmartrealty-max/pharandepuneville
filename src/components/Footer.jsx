import React from 'react';
import { ShieldCheck, MapPin, Phone, Clock, ExternalLink, Heart } from 'lucide-react';
import { PROJECT_INFO, CLUSTERS_DATA } from '../data/projectData';
import PunevilleLogo from './PunevilleLogo';
import EdgeGeoStatus from './EdgeGeoStatus';

export default function Footer({ onOpenBrochure, onOpenVisit, onNavigate }) {
  const handleNav = (e, id, path) => {
    e.preventDefault();
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
    <footer className="bg-[#0B1120] text-slate-300 pt-20 pb-12 border-t border-slate-800 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <PunevilleLogo variant="light" size="md" />
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An iconic 28-acre masterplanned township in Punawale, PCMC Pune designed by world-renowned architecture practice Aedas. Elevated skywalk promenade, 4 Olympic-sized swimming pools, and 19 soaring towers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                MahaRERA: P52100000044
              </span>
              <span className="text-xs text-slate-400">Wings Q, R, S</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Township Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/aedas-vision" onClick={(e) => handleNav(e, 'vision', '/aedas-vision')} className="hover:text-amber-400 transition-colors">Aedas Architectural Vision</a></li>
              <li><a href="/masterplan" onClick={(e) => handleNav(e, 'masterplan', '/masterplan')} className="hover:text-amber-400 transition-colors">28-Acre Masterplan</a></li>
              <li><a href="/towers" onClick={(e) => handleNav(e, 'towers', '/towers')} className="hover:text-amber-400 transition-colors">19 High-Rise Towers</a></li>
              <li><a href="/floor-plans" onClick={(e) => handleNav(e, 'residences', '/floor-plans')} className="hover:text-amber-400 transition-colors">2, 2.5 & 3 BHK Plans</a></li>
              <li><a href="/amenities" onClick={(e) => handleNav(e, 'amenities', '/amenities')} className="hover:text-amber-400 transition-colors">40+ Lifestyle Amenities</a></li>
              <li><a href="/gallery" onClick={(e) => handleNav(e, 'gallery', '/gallery')} className="hover:text-amber-400 transition-colors">Authentic Gallery</a></li>
              <li><a href="/emi-calculator" onClick={(e) => handleNav(e, 'financials', '/emi-calculator')} className="hover:text-amber-400 transition-colors">Mortgage EMI Calculator</a></li>
              <li><a href="/construction" onClick={(e) => handleNav(e, 'construction', '/construction')} className="hover:text-amber-400 transition-colors">Cluster D Status</a></li>
              <li><a href="/developer" onClick={(e) => handleNav(e, 'developer', '/developer')} className="hover:text-amber-400 transition-colors">Pharande Spaces Legacy</a></li>
            </ul>
          </div>

          {/* Location & Access */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Connectivity
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li>Mumbai-Pune Expressway: 2 Mins</li>
              <li>Hinjawadi IT Park Ph 1: 8-10 Mins</li>
              <li>Bhumkar Chowk (Wakad): 6 Mins</li>
              <li>Phoenix Mall Millennium: 10 Mins</li>
              <li>Aditya Birla Hospital: 8 Mins</li>
              <li>D-Mart Ravet: 4 Mins</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Sales Experience Center
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-tight font-medium">
                  Near Punawale-Ravet BRTS Road, Punawale, PCMC, Pune - 411033
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${PROJECT_INFO.phone}`} className="text-white hover:text-amber-400 font-mono font-bold">
                  {PROJECT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs">WA:</span>
                <a
                  href="https://wa.me/917744009295?text=Hello%20I%20am%20interested%20in%20Pharande%20Puneville"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-mono font-bold"
                >
                  +91 7744009295 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium">
                  Experience Center: 9:30 AM - 7:30 PM
                </span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenVisit}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#0F172A] bg-amber-400 hover:bg-amber-300 text-center transition-colors shadow-md"
                >
                  Book Private Site Visit
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 text-center border border-slate-700 transition-colors"
                >
                  Download E-Brochure
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* MahaRERA Official Compliance Disclosures */}
        <div className="py-8 border-b border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              MahaRERA Registration Disclosures
            </span>
            <a
              href={PROJECT_INFO.reraWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Verify on MahaRERA Portal ({PROJECT_INFO.reraWebsite})
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-[11px] font-mono">
            {CLUSTERS_DATA.map((c) => (
              <div key={c.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-300">{c.name.split('(')[0]}:</span>
                <span className="text-amber-400 font-bold">{c.rera}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
            Disclaimer: The images, renders, artistic impressions, and layout plans displayed on this website are for representational and illustrative purposes only. All dimensions, specifications, and amenities are subject to change as required by relevant authorities or developers in compliance with MahaRERA guidelines. This website is intended for marketing and informational purposes and does not constitute a legally binding contract or offer.
          </p>
        </div>

        {/* Copyright & Sign-off */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Pharande Puneville. All Rights Reserved. Masterplanned by Aedas. Developed by Pharande Spaces.
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-4 border-t border-slate-800/80">
            <EdgeGeoStatus />
            <div className="flex items-center gap-4 font-medium">
              <span className="text-slate-400">Privacy Policy</span>
              <span>•</span>
              <span className="text-slate-400">Terms of Use</span>
              <span>•</span>
              <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">MahaRERA Portal</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
