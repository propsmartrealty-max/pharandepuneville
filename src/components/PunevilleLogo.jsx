import React from 'react';

/**
 * PunevilleLogo - Recreated authentically from the physical on-site entrance
 * monument letters and architectural canopy background at Punawale.
 *
 * @param {string} variant - 'dark' (for light beige backdrops) | 'light' (for dark backdrops)
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showSubtitle - whether to display 'BY PHARANDE SPACES'
 */
export default function PunevilleLogo({ variant = 'dark', size = 'md', showSubtitle = true, className = '' }) {
  const isLight = variant === 'light';

  // Sizing configurations
  const dimensions = {
    sm: {
      iconSize: 'w-8 h-8',
      textMain: 'text-lg',
      subText: 'text-[8.5px]',
      gap: 'gap-2.5'
    },
    md: {
      iconSize: 'w-10 h-10',
      textMain: 'text-xl',
      subText: 'text-[9.5px]',
      gap: 'gap-3'
    },
    lg: {
      iconSize: 'w-12 h-12',
      textMain: 'text-2xl',
      subText: 'text-[11px]',
      gap: 'gap-3.5'
    }
  }[size] || dimensions.md;

  return (
    <div className={`flex items-center ${dimensions.gap} group select-none ${className}`}>
      {/* 
        Architectural Monument Crest:
        Recreates the physical entrance features seen in the site photo:
        The sweeping curved canopy pavilion + the soaring high-rise towers in 3D perspective
      */}
      <div className={`${dimensions.iconSize} rounded-xl relative p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105 flex-shrink-0 ${
        isLight
          ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-amber-500/20'
          : 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 shadow-amber-700/20'
      }`}>
        <div className="w-full h-full rounded-[9px] flex items-center justify-center overflow-hidden p-1.5 bg-[#0F172A]">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background Sky Light Glow */}
            <circle cx="18" cy="18" r="14" fill="url(#crestGlow)" opacity="0.2" />
            
            {/* 3 High-Rise Aerodynamic Towers in background (as seen behind Puneville monument) */}
            <rect x="7" y="10" width="5" height="18" rx="1" fill="#E2E8F0" opacity="0.8" />
            <rect x="15" y="6" width="6" height="22" rx="1" fill="#F8FAFC" opacity="0.95" />
            <rect x="24" y="11" width="5" height="17" rx="1" fill="#CBD5E1" opacity="0.8" />

            {/* Tower architectural floor lines */}
            <line x1="9.5" y1="13" x2="9.5" y2="25" stroke="#0F172A" strokeWidth="0.7" strokeDasharray="1.5 1.5" />
            <line x1="18" y1="9" x2="18" y2="25" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            <line x1="26.5" y1="14" x2="26.5" y2="25" stroke="#0F172A" strokeWidth="0.7" strokeDasharray="1.5 1.5" />

            {/* Sweeping Architectural Entrance Canopy (from left of Puneville sign in photo) */}
            <path
              d="M 4 23 C 10 20, 20 22, 32 25 L 32 28 C 20 25, 10 23, 4 27 Z"
              fill="url(#goldCanopyGrad)"
            />

            {/* Monolithic Dimensional Letter 'P' Sign Accent at Base */}
            <path
              d="M 8 28 L 28 28 L 27 30 L 9 30 Z"
              fill="#D4AF37"
            />

            <defs>
              <linearGradient id="crestGlow" x1="18" y1="4" x2="18" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#D97706" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="goldCanopyGrad" x1="4" y1="20" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 
        Authentic Typographic Monument Wordmark:
        Matching the wide, geometric 3D monolithic block letters installed at the site entrance
      */}
      <div className="flex flex-col justify-center leading-none">
        <span 
          className={`font-google font-black ${dimensions.textMain} tracking-[0.14em] uppercase transition-colors ${
            isLight 
              ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' 
              : 'text-[#0F172A]'
          }`}
          style={{
            textShadow: isLight 
              ? '0 1px 2px rgba(0,0,0,0.4)' 
              : '0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          PUNEVILLE
        </span>

        {showSubtitle && (
          <span 
            className={`font-google font-bold ${dimensions.subText} tracking-[0.22em] uppercase mt-1 transition-colors ${
              isLight ? 'text-amber-300/90' : 'text-[#64748B]'
            }`}
          >
            BY PHARANDE SPACES
          </span>
        )}
      </div>
    </div>
  );
}
