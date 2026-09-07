import React from 'react';
import { Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  "MASTER-PLANNED BY GLOBAL ARCHITECTS AEDAS",
  "SIGNATURE 22-FOOT ELEVATED SKYWALK PROMENADE",
  "4 INDEPENDENT OLYMPIC-SIZED SWIMMING POOLS",
  "28-ACRE ICONIC INTEGRATED TOWNSHIP",
  "60% BIOPHILIC NATURE & OPEN GREEN CANVAS",
  "19 AERODYNAMIC G+22 TO G+27 RESIDENTIAL TOWERS",
  "MAHARERA VERIFIED COMPLIANCE ACROSS ALL CLUSTERS",
  "2 MINUTES TO MUMBAI-PUNE EXPRESSWAY CORRIDOR",
  "4 WORLD-CLASS PRIVATE RESORT CLUBHOUSES",
  "100% ZERO-TRAFFIC PEDESTRIAN GROUND REALM"
];

export default function ArchitecturalTicker() {
  return (
    <section className="relative overflow-hidden py-4 bg-[#FAF7F2]/80 backdrop-blur-xl border-y border-[#D8CEBF]/60 select-none shadow-sm z-20">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of ticker items */}
        <div className="flex items-center gap-6 shrink-0 pr-6">
          {HIGHLIGHTS.map((item, idx) => (
            <div key={`a-${idx}`} className="flex items-center gap-6">
              <span className="font-google font-extrabold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#0F172A] flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill hover:bg-white/95 hover:scale-105 hover:shadow-md hover:border-amber-500/60 transition-all duration-300 cursor-default">
                <Sparkles className="w-3.5 h-3.5 text-[#845D12] animate-bounce" style={{ animationDuration: '2s' }} />
                <span>{item}</span>
              </span>
              <span className="text-amber-500 font-black text-sm animate-pulse">✦</span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless continuous loop */}
        <div className="flex items-center gap-6 shrink-0 pr-6" aria-hidden="true">
          {HIGHLIGHTS.map((item, idx) => (
            <div key={`b-${idx}`} className="flex items-center gap-6">
              <span className="font-google font-extrabold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#0F172A] flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill hover:bg-white/95 hover:scale-105 hover:shadow-md hover:border-amber-500/60 transition-all duration-300 cursor-default">
                <Sparkles className="w-3.5 h-3.5 text-[#845D12] animate-bounce" style={{ animationDuration: '2s' }} />
                <span>{item}</span>
              </span>
              <span className="text-amber-500 font-black text-sm animate-pulse">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
