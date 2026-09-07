import React, { useState } from 'react';
import { 
  Compass, Sun, Activity, Coffee, Waves, Droplets, Sparkles, HeartPulse, 
  CircleDot, Trophy, Target, Mountain, Building2, Film, Briefcase, 
  PartyPopper, Trees, Footprints, Flower2, SunDim, Award, ArrowRight
} from 'lucide-react';
import { AMENITIES_CATALOG } from '../data/projectData';

export default function AmenitiesGalaxy({ onOpenVisit }) {
  const [activeCategory, setActiveCategory] = useState("The Skywalk Realm");

  const iconRegistry = {
    Compass: <Compass className="w-5 h-5" />,
    Sun: <Sun className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
    Coffee: <Coffee className="w-5 h-5" />,
    Waves: <Waves className="w-5 h-5" />,
    Droplets: <Droplets className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    HeartPulse: <HeartPulse className="w-5 h-5" />,
    CircleDot: <CircleDot className="w-5 h-5" />,
    Trophy: <Trophy className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    Mountain: <Mountain className="w-5 h-5" />,
    Building2: <Building2 className="w-5 h-5" />,
    Film: <Film className="w-5 h-5" />,
    Briefcase: <Briefcase className="w-5 h-5" />,
    PartyPopper: <PartyPopper className="w-5 h-5" />,
    Trees: <Trees className="w-5 h-5" />,
    Footprints: <Footprints className="w-5 h-5" />,
    Flower2: <Flower2 className="w-5 h-5" />,
    SunDim: <SunDim className="w-5 h-5" />
  };

  const currentCategoryData = AMENITIES_CATALOG.find(c => c.category === activeCategory) || AMENITIES_CATALOG[0];

  return (
    <section id="amenities" className="py-24 bg-[#F4EFE6] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            40+ Curated World-Class Amenities
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            An Unprecedented <span className="gold-gradient-text">Lifestyle Realm</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Four independent Olympic-sized swimming pools, four private clubhouses, and a 22-foot elevated skywalk woven into 60% biophilic open greenery.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {AMENITIES_CATALOG.map((cat) => {
            const isActive = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md font-bold'
                    : 'glass-pill hover:bg-white text-[#1E293B]'
                }`}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {currentCategoryData.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card-interactive flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-xl glass-inner-well text-[#845D12] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#845D12] group-hover:text-white transition-all">
                  {iconRegistry[item.icon] || <Sparkles className="w-5 h-5" />}
                </div>

                <h3 className="text-lg font-display font-bold text-[#0F172A] mb-2 group-hover:text-[#845D12] transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                <span>Aedas Blueprint Standard</span>
                <span className="text-[#845D12] font-bold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner: 4 Olympic Pools & 4 Clubhouses */}
        <div className="rounded-3xl p-8 sm:p-10 glass-panel shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-[#845D12] font-bold tracking-wider block mb-2">
              Low Density Exclusivity
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] mb-2">
              Why settle for 1 pool when you can have 4 Olympic-sized lagoons?
            </h3>
            <p className="text-sm text-[#334155] font-normal leading-relaxed">
              At Puneville, leisure is never overcrowded. Four distinct 50-meter Olympic pools and four full-service clubhouses ensure private, pristine recreation for every single tower cluster.
            </p>
          </div>

          <button
            onClick={onOpenVisit}
            className="flex-shrink-0 px-8 py-4 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-xl shadow-slate-900/20 transition-all flex items-center gap-2"
          >
            <span>Experience the Amenities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
