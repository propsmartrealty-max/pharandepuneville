import React, { useState } from 'react';
import { Building, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Sparkles, Clock, Layers } from 'lucide-react';
import { CLUSTERS_DATA, PROJECT_INFO } from '../data/projectData';

export default function TowerExplorer({ onOpenVisit, onOpenBrochure }) {
  const [selectedCluster, setSelectedCluster] = useState(CLUSTERS_DATA[5]); // Default to Flagship Cluster D

  return (
    <section id="towers" className="py-24 bg-[#F4EFE6] relative border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Building className="w-3.5 h-3.5" />
            19 High-Rise Towers Across 28 Acres
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Phases & <span className="gold-gradient-text">Tower Clusters</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            From fully delivered vibrant communities to newly premiered soaring G+27 architectural wings, explore verified RERA credentials and tower elevations.
          </p>
        </div>

        {/* Cluster Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CLUSTERS_DATA.map((cluster) => {
            const isSelected = selectedCluster.id === cluster.id;
            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
                  isSelected
                    ? 'glass-panel border-2 border-[#845D12] shadow-2xl scale-[1.02] ring-2 ring-[#845D12]/20'
                    : 'glass-card-interactive shadow-sm'
                }`}
              >
                {cluster.isFlagship && (
                  <div className="absolute -top-3 right-6 bg-[#845D12] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    ★ Flagship Premiere
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cluster.badgeColor}`}>
                    {cluster.status}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#64748B]">
                    {cluster.floors}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-[#0F172A] mb-2">
                  {cluster.name}
                </h3>
                
                <p className="text-xs font-bold text-[#845D12] mb-3">
                  {cluster.towers}
                </p>

                <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-2">
                  {cluster.highlights}
                </p>

                <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#845D12]" />
                    <span>{cluster.rera}</span>
                  </div>
                  <span className="text-xs font-bold text-[#845D12] group-hover:translate-x-1 flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Spotlight Box */}
        {selectedCluster && (
          <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedCluster.badgeColor}`}>
                    {selectedCluster.status}
                  </span>
                  <span className="text-xs text-[#64748B] font-mono font-semibold">
                    Official MahaRERA: <strong className="text-[#0F172A] font-bold">{selectedCluster.rera}</strong>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#0F172A] mb-3">
                  {selectedCluster.name}
                </h3>

                <p className="text-[#334155] text-sm sm:text-base leading-relaxed mb-6">
                  {selectedCluster.highlights} Masterplanned with wide 10-foot floor-to-ceiling volume, triple-sided cross ventilation channeling western breezes, and instant direct access to the 22-foot high elevated skywalk promenade.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-3.5 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-1">Elevation</span>
                    <span className="text-sm font-bold text-[#0F172A]">{selectedCluster.floors}</span>
                  </div>
                  <div className="p-3.5 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-1">Wings / Towers</span>
                    <span className="text-sm font-bold text-[#845D12]">{selectedCluster.towers}</span>
                  </div>
                  <div className="p-3.5 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-1">Structure</span>
                    <span className="text-sm font-bold text-[#0F172A]">RCC Shear Wall</span>
                  </div>
                  <div className="p-3.5 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-1">Podium Parking</span>
                    <span className="text-sm font-bold text-[#065F46]">7-Tier Smart Bay</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={onOpenVisit}
                  className="w-full py-4 px-6 rounded-2xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Visit for {selectedCluster.name.split('(')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBrochure}
                  className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold text-[#0F172A] glass-pill hover:bg-white text-center block transition-colors"
                >
                  Download Complete Specifications
                </button>

                <a
                  href={PROJECT_INFO.reraWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-[11px] text-[#845D12] hover:text-[#0F172A] font-semibold transition-colors pt-2"
                >
                  <span>Verify on MahaRERA Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
