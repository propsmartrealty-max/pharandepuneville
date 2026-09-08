import React, { useState } from 'react';
import { Compass, Info, CheckCircle, Waves, Building2, Trees, ShieldAlert, Navigation2, ArrowRight } from 'lucide-react';

export default function InteractiveMasterplan({ onOpenVisit, onSelectFloorPlan }) {
  const [selectedZone, setSelectedZone] = useState('skywalk');
  const [planDisplayMode, setPlanDisplayMode] = useState('interactive'); // 'interactive' or 'official'

  const ZONES = {
    skywalk: {
      id: 'skywalk',
      title: '22-Ft High Elevated Skywalk',
      category: 'Signature Artery',
      badge: 'Iconic Pedestrian Network',
      description: 'The defining architectural spine of Puneville. Hovering 22 feet above ground, this sweeping illuminated skybridge connects all 19 residential towers directly into central clubhouses and aquatic decks without crossing a single car path.',
      stats: [
        { label: 'Elevation', value: '22 Feet' },
        { label: 'Length', value: 'Over 2.1 km loop' },
        { label: 'Safety', value: '100% Pedestrian Safe' },
        { label: 'Accessibility', value: 'Ramp & Lift Connected' }
      ],
      color: '#D4AF57'
    },
    clusterD: {
      id: 'clusterD',
      title: 'Phase III Cluster D (Wings Q, R, S)',
      category: 'Newly Premiered Flagship',
      badge: 'RERA: P52100077431',
      description: 'The latest jewel in the Puneville crown. Soaring G+27 floors with high-speed elevators, panoramic balconies facing the expressway and Hinjawadi skyline, and Italian-marble finish opulent residences.',
      stats: [
        { label: 'Floors', value: 'G + 27 High-Rise' },
        { label: 'Configurations', value: '2, 2.5 & 3 BHK' },
        { label: 'Status', value: 'New Launch Bookings Open' },
        { label: 'Starting Price', value: '₹ 85 Lakhs*' }
      ],
      color: '#E5C378'
    },
    pools: {
      id: 'pools',
      title: '4 Olympic-Sized Swimming Pools',
      category: 'Aquatic Realm',
      badge: '50-Meter Resort Laps',
      description: 'Four independent 50-meter Olympic regulation pools strategically spaced throughout the 28 acres. Includes cascading infinity spillways, dedicated toddler water parks, sunken lounge cabanas, and poolside juice bistros.',
      stats: [
        { label: 'Total Pools', value: '4 Olympic Pools' },
        { label: 'Dimensions', value: '50m Standard Lap' },
        { label: 'Water Quality', value: 'Ozone-Purified Clean' },
        { label: 'Features', value: 'Kids Splash & Jacuzzi' }
      ],
      color: '#38BDF8'
    },
    sports: {
      id: 'sports',
      title: 'Multi-Tier Championship Sports Arena',
      category: 'Active Living',
      badge: 'International Standards',
      description: 'A sports complex featuring synthetic floodlit tennis courts, wooden floor indoor squash & badminton, automated cricket practice nets, roller skating rink, and a 30-ft rock climbing wall.',
      stats: [
        { label: 'Courts', value: 'Tennis, Badminton, Squash' },
        { label: 'Cricket', value: 'Box Cricket & Nets' },
        { label: 'Lighting', value: 'Night Floodlights' },
        { label: 'Coaching', value: 'Resident Academies' }
      ],
      color: '#F97316'
    },
    ecoPark: {
      id: 'ecoPark',
      title: '60% Biophilic Central Eco-Forest',
      category: 'Sanctuary',
      badge: 'Native Flora & Fauna',
      description: 'Over 16 acres of pure open nature featuring 1,200+ indigenous trees, butterfly groves, reflexology cobblestone trails, outdoor meditation amphitheaters, and aromatic herb gardens.',
      stats: [
        { label: 'Open Space', value: '60% of 28 Acres' },
        { label: 'Trees', value: '1,200+ Indigenous' },
        { label: 'Air Quality', value: 'Natural AQI Cleanser' },
        { label: 'Features', value: 'Zen Reflexology Trails' }
      ],
      color: '#10B981'
    },
    clubhouses: {
      id: 'clubhouses',
      title: 'The 4 Grand Lifestyle Clubhouses',
      category: 'Social Luxury',
      badge: '80,000+ sq.ft. Collective',
      description: 'Four magnificent clubhouse hubs offering state-of-the-art fitness gymnasiums, private 40-seater Dolby preview theaters, executive co-working business lounges, banquet pavilions, and wellness spas.',
      stats: [
        { label: 'Clubhouses', value: '4 Independent' },
        { label: 'Gym Equipment', value: 'Technogym / LifeFitness' },
        { label: 'Entertainment', value: 'Dolby Atmos Cineplex' },
        { label: 'Banquet', value: 'Capacity 350+ Guests' }
      ],
      color: '#A855F7'
    }
  };

  const current = ZONES[selectedZone];

  return (
    <section id="masterplan" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            28-Acre Integrated Township Blueprint
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Explore the <span className="gold-gradient-text">Aedas Masterplan</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Click on the key architectural sectors to inspect the engineering, elevated pedestrian connections, and resort infrastructure.
          </p>
        </div>

        {/* Interactive Masterplan Layout Canvas & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SVG Visual Masterplan Map (Interactive) */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#845D12] animate-ping"></span>
                <span className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                  28-Acre Masterplan Blueprint
                </span>
              </div>

              {/* Toggle Switcher */}
              <div className="flex items-center glass-inner-well p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPlanDisplayMode('interactive')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    planDisplayMode === 'interactive'
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Interactive 3D Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => setPlanDisplayMode('official')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    planDisplayMode === 'official'
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  Official Master Layout Map
                </button>
              </div>
            </div>

            {planDisplayMode === 'official' ? (
              /* Scraped Official Masterplan Image Viewer */
              <div className="relative w-full aspect-[16/10] bg-[#F8F5EE] rounded-2xl border border-[#D8CEBF] overflow-hidden flex items-center justify-center p-2 group shadow-inner">
                <img
                  src="/images/puneville/masterplan/masterplan-layout.jpg"
                  alt="Pharande Puneville Official Master Layout Plan"
                  className="w-full h-full object-contain rounded-xl"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#D8CEBF] text-[11px] text-[#845D12] font-mono font-bold shadow-md">
                  Official Aedas Master Layout • Punawale (28 Acres)
                </div>
              </div>
            ) : (
              /* Architectural Isometric Masterplan SVG */
              <div className="relative w-full aspect-[16/10] bg-[#FAF7F2] rounded-2xl border border-[#E2D9CC] p-4 flex items-center justify-center overflow-hidden shadow-inner">
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <defs>
                  <linearGradient id="skywalkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A67C18" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#D4AF57" stopOpacity="1" />
                    <stop offset="100%" stopColor="#845D12" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="parkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Grid Lines */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
                </pattern>
                <rect width="800" height="500" fill="url(#grid)" />

                {/* Township Perimeter Outline */}
                <polygon
                  points="60,80 740,60 760,420 50,440"
                  fill="#F4EFE6"
                  stroke="#845D12"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* 60% Green Landscape Polygon */}
                <path
                  d="M 100,120 Q 300,100 500,140 T 700,200 Q 650,380 400,390 T 120,360 Z"
                  fill="url(#parkGrad)"
                  stroke="#059669"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedZone('ecoPark')}
                />
                <text x="380" y="340" fill="#065F46" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  🌿 60% CENTRAL ECO-FOREST (16 ACRES)
                </text>

                {/* 4 Olympic Swimming Pools */}
                <g onClick={() => setSelectedZone('pools')} className="cursor-pointer group">
                  {/* Pool 1 */}
                  <rect x="230" y="160" width="80" height="32" rx="6" fill="url(#poolGrad)" filter="url(#cardShadow)" />
                  <text x="270" y="180" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">POOL 1 (50M)</text>

                  {/* Pool 2 */}
                  <rect x="520" y="170" width="80" height="32" rx="6" fill="url(#poolGrad)" filter="url(#cardShadow)" />
                  <text x="560" y="190" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">POOL 2 (50M)</text>

                  {/* Pool 3 */}
                  <rect x="250" y="270" width="80" height="32" rx="6" fill="url(#poolGrad)" filter="url(#cardShadow)" />
                  <text x="290" y="290" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">POOL 3 (50M)</text>

                  {/* Pool 4 */}
                  <rect x="500" y="280" width="80" height="32" rx="6" fill="url(#poolGrad)" filter="url(#cardShadow)" />
                  <text x="540" y="300" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">POOL 4 (50M)</text>
                </g>

                {/* 4 Grand Clubhouses */}
                <g onClick={() => setSelectedZone('clubhouses')} className="cursor-pointer">
                  <circle cx="210" cy="220" r="26" fill="#7E22CE" stroke="#581C87" strokeWidth="2" filter="url(#cardShadow)" />
                  <text x="210" y="224" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">CLUB 1</text>

                  <circle cx="610" cy="220" r="26" fill="#7E22CE" stroke="#581C87" strokeWidth="2" filter="url(#cardShadow)" />
                  <text x="610" y="224" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">CLUB 2</text>

                  <circle cx="340" cy="140" r="22" fill="#7E22CE" stroke="#581C87" strokeWidth="2" filter="url(#cardShadow)" />
                  <text x="340" y="144" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">CLUB 3</text>

                  <circle cx="440" cy="320" r="22" fill="#7E22CE" stroke="#581C87" strokeWidth="2" filter="url(#cardShadow)" />
                  <text x="440" y="324" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">CLUB 4</text>
                </g>

                {/* Sports Arena */}
                <g onClick={() => setSelectedZone('sports')} className="cursor-pointer">
                  <rect x="630" y="300" width="85" height="70" rx="6" fill="#EA580C" stroke="#C2410C" strokeWidth="2" filter="url(#cardShadow)" />
                  <text x="672" y="332" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">SPORTS ARENA</text>
                  <text x="672" y="348" fill="#FFEDD5" fontSize="8" textAnchor="middle">Tennis • Cricket</text>
                </g>

                {/* Tower Clusters (Sample Towers) */}
                {/* Phase 1 & 2 */}
                <g className="cursor-pointer opacity-85">
                  <rect x="100" y="160" width="45" height="50" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
                  <text x="122" y="190" fill="#1E293B" fontSize="8" fontWeight="bold" textAnchor="middle">Phase 1</text>

                  <rect x="100" y="230" width="45" height="50" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
                  <text x="122" y="260" fill="#1E293B" fontSize="8" fontWeight="bold" textAnchor="middle">Phase 2</text>
                </g>

                {/* Phase 3 Cluster D (Newly Launched Flagship) */}
                <g onClick={() => setSelectedZone('clusterD')} className="cursor-pointer group">
                  {selectedZone === 'clusterD' && (
                    <rect
                      x="364"
                      y="164"
                      width="87"
                      height="102"
                      rx="12"
                      fill="none"
                      stroke="#845D12"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="animate-pulse"
                    />
                  )}
                  <rect
                    x="370"
                    y="170"
                    width="75"
                    height="90"
                    rx="8"
                    fill="#FEF3C7"
                    stroke="#845D12"
                    strokeWidth="2.5"
                    filter="url(#cardShadow)"
                  />
                  <rect x="375" y="175" width="65" height="20" rx="4" fill="#845D12" />
                  <text x="407" y="189" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                    NEW LAUNCH
                  </text>
                  <text x="407" y="215" fill="#0F172A" fontSize="10" fontWeight="bold" textAnchor="middle">
                    WINGS Q,R,S
                  </text>
                  <text x="407" y="232" fill="#845D12" fontSize="8" fontWeight="bold" textAnchor="middle">
                    CLUSTER D
                  </text>
                  <text x="407" y="248" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="middle">
                    G+27 High-Rise
                  </text>
                </g>

                {/* THE 22-FT HIGH ELEVATED SKYWALK PATH (Gold Illuminated Ribbon) */}
                <g onClick={() => setSelectedZone('skywalk')} className="cursor-pointer">
                  {/* Skywalk Loop connecting towers to center */}
                  <path
                    d="M 130,190 C 200,100 600,110 680,200 C 720,270 650,380 430,370 C 280,360 140,320 130,190 Z"
                    fill="none"
                    stroke="url(#skywalkGlow)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#cardShadow)"
                  />
                  {/* Skywalk Core Spine */}
                  <path
                    d="M 130,190 C 200,100 600,110 680,200 C 720,270 650,380 430,370 C 280,360 140,320 130,190 Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeDasharray="4 6"
                  />
                  {/* Pulsing Radar Rings on Skywalk Nodes */}
                  <circle cx="400" cy="108" r="14" fill="#845D12" opacity="0.25" className="animate-ping" />
                  <circle cx="680" cy="200" r="14" fill="#845D12" opacity="0.25" className="animate-ping" />
                  <circle cx="430" cy="370" r="14" fill="#845D12" opacity="0.25" className="animate-ping" />
                  <circle cx="130" cy="190" r="14" fill="#845D12" opacity="0.25" className="animate-ping" />
                  
                  {/* Skywalk Node Badges */}
                  <circle cx="400" cy="108" r="8" fill="#845D12" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="680" cy="200" r="8" fill="#845D12" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="430" cy="370" r="8" fill="#845D12" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="130" cy="190" r="8" fill="#845D12" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="400" y="88" fill="#845D12" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ✦ 22-FT ELEVATED SKYWALK PROMENADE ✦
                  </text>
                </g>

                {/* Direction Compass */}
                <g transform="translate(720, 90)">
                  <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                  <path d="M 0 -12 L 5 2 L -5 2 Z" fill="#845D12" />
                  <path d="M 0 12 L 5 2 L -5 2 Z" fill="#94A3B8" />
                  <text x="0" y="-14" fill="#0F172A" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
                </g>
              </svg>
            </div>
            )}

            {/* Zone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
              {Object.values(ZONES).map((z) => {
                const isActive = selectedZone === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 truncate ${
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-md'
                        : 'glass-pill hover:bg-white text-[#1E293B]'
                    }`}
                  >
                    {z.title.split(' ')[0]} {z.title.split(' ')[1]}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Zone Detail Inspector Card */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#845D12] px-2.5 py-1 rounded-md glass-inner-well font-bold">
                  {current.category}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  {current.badge}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-3">
                {current.title}
              </h3>

              <p className="text-sm text-[#334155] font-normal leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {current.stats.map((stat, i) => (
                  <div key={i} className="p-3 rounded-xl glass-inner-well">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block mb-0.5">
                      {stat.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/60 space-y-2.5">
              <button
                onClick={onOpenVisit}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Book a Guided Masterplan Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('residences')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F172A] hover:bg-white glass-pill text-center block transition-colors cursor-pointer"
              >
                View Residences Facing This Zone
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
