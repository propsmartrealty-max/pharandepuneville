import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Briefcase, Car, GraduationCap, Stethoscope, ShoppingBag, ArrowRight } from 'lucide-react';
import { LOCATION_HIGHLIGHTS } from '../data/locationData';

export default function LocationRadar({ onOpenVisit }) {
  const [activeCategory, setActiveCategory] = useState("IT & Commercial Corridors");
  const [selectedCommutePreset, setSelectedCommutePreset] = useState(LOCATION_HIGHLIGHTS.commutePresets[0]);

  const categoryIcons = {
    "IT & Commercial Corridors": <Briefcase className="w-4 h-4" />,
    "Express Highways & Transit": <Car className="w-4 h-4" />,
    "Premier Healthcare": <Stethoscope className="w-4 h-4" />,
    "World-Class Education": <GraduationCap className="w-4 h-4" />,
    "Luxury Shopping & Leisure": <ShoppingBag className="w-4 h-4" />
  };

  const currentCategory = LOCATION_HIGHLIGHTS.keyHubs.find(k => k.category === activeCategory) || LOCATION_HIGHLIGHTS.keyHubs[0];

  return (
    <section id="location" className="py-24 bg-[#F4EFE6] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            Punawale • The Golden Growth Corridor
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Strategic Connectivity & <span className="gold-gradient-text">Proximity</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Positioned right at the gateway to Hinjawadi IT Park and 2 minutes from the Mumbai-Pune Expressway, Punawale gives you back precious hours of family life every single day.
          </p>
        </div>

        {/* Interactive Commute Calculator & Time-Saver Radar */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#845D12] font-bold tracking-wider block mb-1">
                ⚡ Interactive Commute Radar
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
                How fast is your daily commute from Pharande Puneville?
              </h3>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {LOCATION_HIGHLIGHTS.commutePresets.map((preset, idx) => {
                const isActive = selectedCommutePreset.label === preset.label;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCommutePreset(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-md'
                        : 'glass-pill hover:bg-white text-[#1E293B]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/60 items-center">
            <div className="p-4 rounded-xl glass-inner-well">
              <span className="text-[11px] font-mono text-[#64748B] font-bold uppercase block mb-1">Target Hub</span>
              <span className="text-lg font-bold text-[#0F172A]">{selectedCommutePreset.label}</span>
            </div>
            <div className="p-4 rounded-xl glass-inner-well">
              <span className="text-[11px] font-mono text-[#64748B] font-bold uppercase block mb-1">Travel Time & Distance</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-black text-[#0F172A]">{selectedCommutePreset.mins} Mins</span>
                <span className="text-xs text-[#64748B] font-medium">({selectedCommutePreset.distance})</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/80 backdrop-blur-md border border-emerald-300/80">
              <span className="text-[11px] font-mono text-emerald-800 font-bold uppercase block mb-1">Commute Advantage</span>
              <span className="text-xs font-bold text-emerald-900">{selectedCommutePreset.savedHrsYear}</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Hub Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {LOCATION_HIGHLIGHTS.keyHubs.map((hub) => {
            const isActive = activeCategory === hub.category;
            return (
              <button
                key={hub.category}
                onClick={() => setActiveCategory(hub.category)}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-md'
                    : 'glass-pill hover:bg-white text-[#1E293B]'
                }`}
              >
                {categoryIcons[hub.category]}
                <span>{hub.category}</span>
              </button>
            );
          })}
        </div>

        {/* Landmarks Table Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {currentCategory.destinations.map((dest, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card-interactive flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-bold text-[#0F172A]">{dest.name}</h4>
                  <span className="text-xs font-mono font-bold text-[#845D12] bg-[#FEF3C7]/90 backdrop-blur-sm px-2 py-0.5 rounded border border-[#FCD34D]">
                    {dest.time}
                  </span>
                </div>
                <p className="text-xs text-[#475569] font-normal mb-3">
                  {dest.route}
                </p>
              </div>

              <div className="pt-3 border-t border-white/60 flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                <span>Distance</span>
                <span className="text-[#0F172A] font-bold">{dest.distance}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Punawale Ecosystem & High-Growth Micro-Market Spotlight */}
        {LOCATION_HIGHLIGHTS.punawaleEcosystem && (
          <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white shadow-2xl relative overflow-hidden border border-amber-400/20">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-2">
                    <span>🌟 Micro-Market Intelligence</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    {LOCATION_HIGHLIGHTS.punawaleEcosystem.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                  {LOCATION_HIGHLIGHTS.punawaleEcosystem.description}
                </p>
              </div>

              {/* 4 Pillars of Punawale Advantage */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {LOCATION_HIGHLIGHTS.punawaleEcosystem.keyAdvantages.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
                        {item.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-slate-400 block mb-2">
                        {item.subtitle}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                {LOCATION_HIGHLIGHTS.punawaleEcosystem.growthMetrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-xl sm:text-2xl font-display font-black text-amber-400 block">
                      {m.metric}
                    </span>
                    <span className="text-[11px] font-bold text-white block mt-0.5">
                      {m.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {m.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Address & Map CTA Card */}
        <div className="rounded-3xl p-6 sm:p-8 glass-panel shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl glass-inner-well text-[#845D12] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#845D12] font-bold uppercase tracking-wider block mb-1">
                Site Address
              </span>
              <p className="text-sm sm:text-base font-bold text-[#0F172A] max-w-xl">
                {LOCATION_HIGHLIGHTS.address}
              </p>
              <span className="text-xs text-[#475569] mt-1 block font-normal">
                Located right off the Wakad-Ravet BRTS corridor, 1.2 km from Expressway Toll.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="https://maps.google.com/?q=Pharande+Puneville+Punawale"
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none py-3.5 px-5 rounded-xl text-xs font-bold text-[#0F172A] glass-pill hover:bg-white text-center transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-[#845D12]" />
              <span>Get Directions</span>
            </a>

            <button
              onClick={onOpenVisit}
              className="flex-1 md:flex-none py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] text-center transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
            >
              <span>Book Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
