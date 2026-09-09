import React, { useState } from 'react';
import { Layout, Check, Sparkles, Compass, ArrowRight, BedDouble, Bath, Maximize2, FileText, ChevronRight } from 'lucide-react';
import { FLOOR_PLANS } from '../data/floorPlansData';

export default function ResidencesFloorPlans({ onOpenVisit, onOpenBrochure, onSelectForEMI }) {
  const [selectedPlanId, setSelectedPlanId] = useState('2bhk-royale');
  const [viewMode, setViewMode] = useState('2d'); // '2d' or 'dimensions'

  const activePlan = FLOOR_PLANS.find(p => p.id === selectedPlanId) || FLOOR_PLANS[0];

  return (
    <section id="residences" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Layout className="w-3.5 h-3.5" />
            Curated Living Sanctuaries
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Residences & <span className="gold-gradient-text">Floor Plans</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Meticulously engineered for zero passage wastage, three-side panoramic openness, and floor-to-ceiling natural illumination.
          </p>
        </div>

        {/* Configuration Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FLOOR_PLANS.map((plan) => {
            const isActive = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-3 border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xl scale-105 font-bold'
                    : 'glass-pill hover:bg-white text-[#1E293B]'
                }`}
              >
                <span>{plan.type}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white font-bold' : 'glass-inner-well text-[#845D12] font-mono font-bold'
                }`}>
                  {plan.carpetAreaSqFt} sq.ft.
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Floor Plan Viewer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Blueprint Canvas / Schematic */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#845D12] uppercase glass-inner-well px-2.5 py-1 rounded-md font-bold">
                  {activePlan.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mt-1.5">
                  {activePlan.type} Architectural Layout
                </h3>
              </div>

              {/* View Switcher */}
              <div className="flex items-center glass-inner-well p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === '2d' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Blueprint View
                </button>
                <button
                  onClick={() => setViewMode('official')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'official' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Official Floor Plan
                </button>
                <button
                  onClick={() => setViewMode('dimensions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'dimensions' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Dimensions Table
                </button>
              </div>
            </div>

            {/* View Mode Switching: 2D Blueprint, Official Image, or Room Dimensions */}
            {viewMode === 'official' ? (
              <div className="relative w-full aspect-[4/3] bg-[#F8F5EE] rounded-2xl border border-[#D8CEBF] p-2 flex items-center justify-center overflow-hidden group shadow-inner">
                <img
                  src={activePlan.realPlanImage || "/images/puneville/floorplans/floorplan-2bhk-classic.jpg"}
                  alt={`${activePlan.type} Official Floor Plan`}
                  className="w-full h-full object-contain rounded-xl"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#D8CEBF] text-[11px] text-[#845D12] font-mono font-bold shadow-md">
                  Official Architectural Plan: {activePlan.type}
                </div>
              </div>
            ) : viewMode === '2d' ? (
              <div className="relative w-full aspect-[4/3] bg-[#FAF7F2] rounded-2xl border border-[#E2D9CC] p-4 flex items-center justify-center overflow-hidden shadow-inner">
                <svg viewBox="0 0 600 450" className="w-full h-full select-none">
                  {/* Subtle blueprint grid */}
                  <defs>
                    <pattern id="planGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="600" height="450" fill="url(#planGrid)" />

                  {/* Outer Walls */}
                  <rect
                    x="50"
                    y="40"
                    width="500"
                    height="370"
                    fill="#FFFFFF"
                    stroke="#0F172A"
                    strokeWidth="3.5"
                    rx="6"
                  />

                  {/* Living & Dining Area */}
                  <rect x="60" y="50" width="280" height="210" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                  <text x="200" y="145" fill="#0F172A" fontSize="13" fontWeight="bold" textAnchor="middle">LIVING & DINING SALON</text>
                  <text x="200" y="165" fill="#845D12" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">12'0" x 18'0"</text>

                  {/* Sit-Out Terrace Balcony */}
                  <rect x="60" y="270" width="160" height="130" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="140" y="330" fill="#0369A1" fontSize="11" fontWeight="bold" textAnchor="middle">SCENIC BALCONY</text>
                  <text x="140" y="348" fill="#0284C7" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Overlooking Greenery</text>

                  {/* Kitchen & Dry Balcony */}
                  <rect x="350" y="50" width="190" height="120" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5" />
                  <text x="445" y="105" fill="#9A3412" fontSize="12" fontWeight="bold" textAnchor="middle">MODULAR KITCHEN</text>
                  <text x="445" y="125" fill="#C2410C" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Vaastu Compliant</text>

                  {/* Master Bedroom Suite */}
                  <rect x="350" y="180" width="190" height="140" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5" />
                  <text x="445" y="240" fill="#581C87" fontSize="12" fontWeight="bold" textAnchor="middle">MASTER BEDROOM</text>
                  <text x="445" y="258" fill="#7E22CE" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Laminated Wood Floor</text>

                  {/* Bedroom 2 / Kids Bed */}
                  <rect x="230" y="270" width="150" height="130" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="305" y="330" fill="#14532D" fontSize="11" fontWeight="bold" textAnchor="middle">BEDROOM 2</text>
                  <text x="305" y="348" fill="#15803D" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Cross Ventilated</text>

                  {/* Master En-suite & Common Bath */}
                  <rect x="390" y="330" width="150" height="70" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.5" />
                  <text x="465" y="370" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">EN-SUITE & BATH</text>

                  {/* Compass mark */}
                  <circle cx="95" cy="85" r="14" fill="#FFFFFF" stroke="#845D12" strokeWidth="1.5" />
                  <text x="95" y="88" fill="#845D12" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
                </svg>
              </div>
            ) : (
              /* Room Dimensions Table */
              <div className="bg-[#F8F5EE] rounded-2xl border border-[#E2D9CC] p-4 overflow-y-auto max-h-[360px]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#D8CEBF] text-[#64748B] font-mono">
                      <th className="pb-3 font-bold uppercase">Living Space / Room</th>
                      <th className="pb-3 font-bold uppercase">Clear Dimensions (LxW)</th>
                      <th className="pb-3 font-bold uppercase">Finishes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2D9CC]">
                    {activePlan.roomDimensions.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/60">
                        <td className="py-3 font-bold text-[#0F172A]">{item.room}</td>
                        <td className="py-3 font-mono text-[#845D12] font-bold">{item.dimension}</td>
                        <td className="py-3 text-[#475569]">Premium Glazed Vitrified / Anti-skid</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569]">
              <span>Carpet Area: <strong className="text-[#0F172A] font-mono font-bold">{activePlan.carpetAreaSqFt} sq.ft.</strong></span>
              <span>Super Built-up: <strong className="text-[#0F172A] font-mono font-bold">{activePlan.superBuiltUpSqFt} sq.ft.</strong></span>
              <span>Facing: <strong className="text-[#845D12] font-bold">{activePlan.orientation}</strong></span>
            </div>
          </div>

          {/* Unit Specifications & Instant Pricing Breakdown */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#64748B] font-bold">Indicative Pricing</span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A]">
                  {activePlan.priceRange}
                </span>
              </div>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <div className="p-3 rounded-xl glass-inner-well text-center">
                  <BedDouble className="w-4 h-4 mx-auto text-[#845D12] mb-1" />
                  <span className="text-[10px] text-[#64748B] font-semibold block">Bedrooms</span>
                  <span className="text-xs font-bold text-[#0F172A]">{activePlan.bedrooms}</span>
                </div>
                <div className="p-3 rounded-xl glass-inner-well text-center">
                  <Bath className="w-4 h-4 mx-auto text-[#845D12] mb-1" />
                  <span className="text-[10px] text-[#64748B] font-semibold block">Bathrooms</span>
                  <span className="text-xs font-bold text-[#0F172A]">{activePlan.bathrooms} Luxury</span>
                </div>
                <div className="p-3 rounded-xl glass-inner-well text-center">
                  <Maximize2 className="w-4 h-4 mx-auto text-[#845D12] mb-1" />
                  <span className="text-[10px] text-[#64748B] font-semibold block">Balconies</span>
                  <span className="text-xs font-bold text-[#0F172A]">{activePlan.balconies} Sundecks</span>
                </div>
              </div>

              {/* Architectural Highlights Checklist */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  Design Highlights by Aedas:
                </span>
                {activePlan.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#334155]">
                    <Check className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Triggers */}
            <div className="space-y-2.5 pt-4 border-t border-white/60">
              <button
                onClick={onOpenVisit}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Walkthrough of {activePlan.type}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBrochure ? onOpenBrochure(activePlan.type) : onOpenVisit()}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#845D12] bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#845D12]" />
                <span>Instant Cost Sheet & PDF for {activePlan.type}</span>
              </button>

              <button
                onClick={() => onSelectForEMI(activePlan.basePriceValue)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F172A] glass-pill hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Monthly EMI for this Unit</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
