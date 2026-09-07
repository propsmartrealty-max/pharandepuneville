import React, { useState } from 'react';
import { Navigation2, Wind, Waves, ShieldCheck, CheckCircle2, Building, Sparkles, Layers, Compass, ArrowUpRight } from 'lucide-react';
import { AEDAS_PILLARS } from '../data/projectData';

export default function AedasVision({ onOpenVisit }) {
  const [activePillar, setActivePillar] = useState(0);

  const iconMap = {
    Navigation2: <Navigation2 className="w-6 h-6" />,
    Wind: <Wind className="w-6 h-6" />,
    Waves: <Waves className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />
  };

  return (
    <section id="vision" className="py-24 bg-[#F4EFE6] relative overflow-hidden border-t border-[#D8CEBF] font-google">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#7A560D] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            Global Architectural Benchmark
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Conceived by <span className="gold-gradient-text">AEDAS</span>
          </h2>
          <p className="text-[#334155] text-base sm:text-lg font-light leading-relaxed">
            World-renowned architects Aedas crafted Puneville as a self-sustaining ecological ecosystem where human wellness, aerodynamics, and structural grandeur converge seamlessly.
          </p>
        </div>

        {/* Interactive 4 Pillars Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Pillar Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {AEDAS_PILLARS.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 border ${
                    isActive
                      ? 'glass-panel border-[#B08938] shadow-xl scale-[1.01] ring-1 ring-[#B08938]/30'
                      : 'glass-panel hover:bg-white/90 border-white/70'
                  }`}
                >
                  <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
                    isActive ? 'bg-[#0F172A] text-gold-300 shadow-md' : 'glass-inner-well text-slate-600'
                  }`}>
                    {iconMap[pillar.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#FAF7F2] text-[#845D12] border border-[#D8CEBF]' : 'text-[#64748B]'
                      }`}>
                        {pillar.badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B] font-medium">{pillar.stats}</span>
                    </div>
                    <h3 className={`text-base font-bold font-display ${isActive ? 'text-[#0F172A]' : 'text-[#1E293B]'}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#475569] mt-1 line-clamp-2">
                      {pillar.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Feature Visualizer Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 sm:p-8 glass-panel overflow-hidden shadow-2xl">
              
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded-full glass-inner-well text-[#845D12] text-xs font-mono font-bold mb-4">
                  0{activePillar + 1} / 04 • Architectural Innovation
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] mb-2">
                  {AEDAS_PILLARS[activePillar].title}
                </h3>
                
                <h4 className="text-sm sm:text-base font-semibold text-[#845D12] mb-4">
                  {AEDAS_PILLARS[activePillar].subtitle}
                </h4>

                {/* Real Architectural Photograph */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-white/80 bg-[#FAF7F2] shadow-inner">
                  <img
                    src={[
                      "/images/puneville/gallery/gallery-skywalk-promenade.jpg",
                      "/images/puneville/gallery/gallery-grand-facade.jpg",
                      "/images/puneville/gallery/gallery-pool-evening.jpg",
                      "/images/puneville/gallery/gallery-tower-night.jpg"
                    ][activePillar]}
                    alt={AEDAS_PILLARS[activePillar].title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-[#0F172A]/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-gold-300 font-mono">
                    Official Puneville Project Photography
                  </div>
                </div>

                <p className="text-[#334155] text-sm leading-relaxed mb-6 font-normal">
                  {AEDAS_PILLARS[activePillar].description}
                </p>

                {/* Technical highlights grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/60 mb-6">
                  <div className="p-3 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Architectural Firm</span>
                    <span className="text-sm font-bold text-[#0F172A]">Aedas Global</span>
                  </div>
                  <div className="p-3 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Elevation Benchmark</span>
                    <span className="text-sm font-bold text-[#845D12]">22-Ft Skywalk</span>
                  </div>
                  <div className="p-3 rounded-xl glass-inner-well col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Eco Footprint</span>
                    <span className="text-sm font-bold text-emerald-700">60% Green Canvas</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenVisit}
                    className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-md transition-transform flex items-center gap-2"
                  >
                    <span>Experience This in Person</span>
                    <ArrowUpRight className="w-4 h-4 text-gold-300" />
                  </button>
                  <span className="text-xs text-[#475569] font-medium">
                    Complimentary Chauffeur Site Visit Available
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Architectural Principles Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card-interactive shadow-md">
            <div className="w-10 h-10 rounded-xl glass-inner-well text-[#845D12] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">Zero-Traffic Pedestrian Realm</h4>
            <p className="text-xs text-[#475569] leading-relaxed">
              Vehicular movement is strictly separated to the perimeter and 7-level podium, leaving the ground and skywalk levels 100% serene and safe for senior citizens and young children.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card-interactive shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-50/80 backdrop-blur-md text-emerald-700 border border-emerald-200/80 flex items-center justify-center mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">Passive Aerodynamic Cooling</h4>
            <p className="text-xs text-[#475569] leading-relaxed">
              Tower layouts are strategically staggered to prevent solar heat trapping and create natural wind vortices, cooling ambient temperatures by up to 3°C naturally.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card-interactive shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 backdrop-blur-md text-blue-700 border border-blue-200/80 flex items-center justify-center mb-4">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">Four Independent Clubhouses</h4>
            <p className="text-xs text-[#475569] leading-relaxed">
              Never wait for a pool lane, gym bench, or banquet hall. With 4 distinct world-class clubhouses, residents enjoy supreme low-density luxury and personalized recreation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
