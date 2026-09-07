import React, { useState } from 'react';
import { ShieldCheck, HardHat, CheckCircle2, Award, ExternalLink, Sparkles, Building, Layers } from 'lucide-react';
import { CLUSTERS_DATA, SPECIFICATIONS, PROJECT_INFO } from '../data/projectData';

export default function ConstructionTracker({ onOpenVisit }) {
  const [activeSpecCategory, setActiveSpecCategory] = useState("Structure & Architecture");

  const currentSpecs = SPECIFICATIONS.find(s => s.category === activeSpecCategory) || SPECIFICATIONS[0];

  return (
    <section className="py-24 bg-[#F4EFE6] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            MahaRERA Registered & Uncompromising Quality
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Engineering & <span className="gold-gradient-text">Craftsmanship</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Engineered to global Aedas structural blueprints with monolithic shear-wall RCC integrity, international fixtures, and complete regulatory transparency.
          </p>
        </div>

        {/* MahaRERA Compliance Registry Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">MahaRERA Official Registrations</h3>
                <span className="text-xs text-[#475569]">All phases independently registered with the Maharashtra Real Estate Regulatory Authority</span>
              </div>
            </div>

            <a
              href={PROJECT_INFO.reraWebsite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#845D12] hover:text-[#0F172A] transition-colors"
            >
              <span>Visit MahaRERA Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CLUSTERS_DATA.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl glass-inner-well flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-1">Phase</span>
                  <span className="text-xs font-bold text-[#0F172A] block truncate">{c.name.split('(')[0]}</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/60">
                  <span className="text-[11px] font-mono text-[#845D12] font-black block">{c.rera}</span>
                  <span className="text-[9px] text-[#475569] font-medium block truncate">{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications & Fitments Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Spec Category Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            {SPECIFICATIONS.map((spec) => {
              const isActive = activeSpecCategory === spec.category;
              return (
                <button
                  key={spec.category}
                  onClick={() => setActiveSpecCategory(spec.category)}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-md'
                      : 'glass-pill hover:bg-white text-[#1E293B]'
                  }`}
                >
                  <span>{spec.category}</span>
                  <span>{isActive ? '●' : '›'}</span>
                </button>
              );
            })}

            <div className="pt-4">
              <div className="p-5 rounded-2xl glass-panel shadow-md">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#845D12] font-bold block mb-1">
                  Pioneer Quality Assurance
                </span>
                <p className="text-xs text-[#475569] leading-relaxed mb-3">
                  Constructed under stringent Aedas global quality audits with triple-layer waterproofing, acoustic plumbing, and earthquake vibration dampeners.
                </p>
                <button
                  onClick={onOpenVisit}
                  className="text-xs font-bold text-[#845D12] hover:text-[#0F172A] underline underline-offset-4"
                >
                  Request Technical Specifications Sheet →
                </button>
              </div>
            </div>
          </div>

          {/* Active Category Specs Showcase */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-display font-bold text-[#0F172A] mb-2">
              {currentSpecs.category}
            </h3>
            <span className="text-xs text-[#845D12] block mb-6 font-mono font-bold">
              Engineered for multi-generational durability & acoustic seclusion
            </span>

            <div className="space-y-3.5">
              {currentSpecs.specs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass-inner-well flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100/90 text-[#059669] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Brand Partners Showcase */}
            <div className="mt-8 pt-6 border-t border-white/60">
              <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold tracking-wider block mb-3">
                Select Premium Brand Partnerships
              </span>
              <div className="flex flex-wrap gap-2.5 text-xs font-bold text-[#0F172A]">
                <span className="px-3 py-1.5 rounded-lg glass-pill">Kohler / Grohe Sanitary</span>
                <span className="px-3 py-1.5 rounded-lg glass-pill">Schneider / Legrand Electricals</span>
                <span className="px-3 py-1.5 rounded-lg glass-pill">Otis / Schindler High-Speed Lifts</span>
                <span className="px-3 py-1.5 rounded-lg glass-pill">Kajaria / Nitco Vitrified Tiles</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
