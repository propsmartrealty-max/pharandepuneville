import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Play, Compass, ChevronDown, Award } from 'lucide-react';
import { KEY_METRICS, PROJECT_INFO } from '../data/projectData';

export default function HeroSection({ onOpenBrochure, onOpenVisit, onNavigate }) {
  const canvasRef = useRef(null);

  // Subtle architectural perspective canvas grid with floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing architectural elevation points
    const points = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting architectural wire lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 87, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 195, 120, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 87, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#FAF7F2] font-google">
      {/* Subtle Architectural Accent Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <img
          src="/images/puneville/hero/banner1.jpg"
          alt="Pharande Puneville Aedas Architecture"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-90 scale-105"
        />
      </div>

      {/* Background Architectural Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Radial Gradient Ambient Lighting on Beige */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#EFE5D3] via-[#FAF7F2] to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40 z-0" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        
        {/* Top Architectural Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#7A560D] text-xs font-bold tracking-wide shadow-sm animate-float-slow">
            <Award className="w-4 h-4 text-gold-500 animate-pulse" />
            <span>Master-Planned by Globally Acclaimed Architects AEDAS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-white text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Punawale • 2 Mins from Mumbai-Pune Expressway</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-google font-extrabold tracking-[-0.035em] text-[#0F172A] leading-[1.05] mb-6">
              A 28-Acre Sanctuary of{' '}
              <span className="gold-gradient-text animate-gold-shine block mt-1.5 tracking-[-0.03em]">
                Futuristic Architecture
              </span>
            </h1>
            <p className="text-base sm:text-xl text-[#334155] font-google font-normal leading-relaxed max-w-xl mb-8 tracking-[-0.015em]">
              Experience Pune's most iconic integrated residential township. Master-planned by global design legends <strong className="text-[#0F172A] font-bold">AEDAS</strong> with a signature <strong className="text-[#845D12] font-semibold">22-foot elevated skywalk</strong>, 4 Olympic swimming pools, and 19 aerodynamic towers set in 60% open greenery.
            </p>

            {/* Action Buttons & Flash Launch Banner */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onOpenVisit}
                className="px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group shimmer-sweep-btn animate-pulse-glow relative overflow-hidden"
              >
                <span>Schedule Private Site Tour</span>
                <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onOpenBrochure}
                className="px-6 py-4 rounded-xl text-sm font-semibold text-[#0F172A] glass-panel hover:bg-white border border-white/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                <span>Download Brochure</span>
                <Sparkles className="w-4 h-4 text-gold-500 group-hover:rotate-12 transition-transform" />
              </button>

              <a
                href="/gallery"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('gallery', '/gallery');
                  else document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#475569] hover:text-[#0F172A] py-3 px-3 transition-all hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gold-500 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Real Photos</span>
              </a>
            </div>

            {/* Highlight Alert Box */}
            <div className="p-4 rounded-2xl glass-panel-warm border-l-4 border-gold-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-inner-well flex items-center justify-center text-gold-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0F172A] block text-sm">Phase III Cluster D (Wings Q, R, S) Newly Premiered</span>
                  <span className="text-[#475569]">2, 2.5 & 3 BHK Ultra-Luxury Residences starting from ₹ 85 Lakhs*</span>
                </div>
              </div>
              <button
                onClick={onOpenVisit}
                className="text-xs font-bold text-[#845D12] hover:text-[#0F172A] underline underline-offset-4 whitespace-nowrap"
              >
                Check Availability
              </button>
            </div>
          </div>

          {/* Right Column: Hero Real Visual Masterpiece Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-3 glass-panel shadow-2xl overflow-hidden group animate-float-delayed card-shine-hover">
              {/* Main Visual Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2]">
                <img
                  src="/images/puneville/hero/banner1.jpg"
                  alt="Pharande Puneville Master Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />
                
                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider glass-panel-dark text-gold-300 shadow-md">
                    ★ Aedas Masterplan
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600/90 backdrop-blur-md text-white shadow-md">
                    28 Acres
                  </span>
                </div>

                {/* Bottom Floating Stats Bar */}
                <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl glass-panel-dark border border-white/20 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Starting Price</span>
                    <span className="text-base font-bold font-google text-gold-300">₹ 85 Lakhs*</span>
                  </div>
                  <div className="h-7 w-[1px] bg-white/20" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">High-Rises</span>
                    <span className="text-base font-bold font-google text-white">19 Towers</span>
                  </div>
                  <div className="h-7 w-[1px] bg-white/20" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Pedestrian</span>
                    <span className="text-base font-bold font-google text-white">22-Ft Skywalk</span>
                  </div>
                </div>
              </div>

              {/* Sub-thumbnails Strip */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/60">
                  <img src="/images/puneville/gallery/gallery-tower-night.jpg" alt="Night Towers" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white uppercase">Night Towers</span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/60">
                  <img src="/images/puneville/gallery/gallery-pool-evening.jpg" alt="Olympic Pool" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white uppercase">Olympic Pool</span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/60">
                  <img src="/images/puneville/gallery/gallery-skywalk-promenade.jpg" alt="22-Ft Skywalk" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white uppercase">Skywalk Deck</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Township Quantitative Metrics Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-3xl glass-panel-warm shadow-xl">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl glass-card-interactive flex flex-col justify-between"
            >
              <span className="text-[11px] font-bold text-[#64748B] tracking-wide uppercase">
                {metric.label}
              </span>
              <div className="my-1.5 flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-google font-extrabold text-[#0F172A] tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-[#845D12] font-google">
                  {metric.suffix}
                </span>
              </div>
              <span className="text-[11px] text-[#475569] font-medium truncate">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="relative z-10 flex justify-center mt-6">
        <a
          href="/aedas-vision"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('vision', '/aedas-vision');
            else document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-2 rounded-full text-slate-500 hover:text-gold-400 transition-colors animate-bounce cursor-pointer"
          aria-label="Scroll Down to Architectural Vision"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
