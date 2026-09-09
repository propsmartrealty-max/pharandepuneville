import React from 'react';
import { Award, Users, Building, ShieldCheck, HeartHandshake, Quote, ArrowRight } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export default function DeveloperLegacy({ onOpenVisit }) {
  const stats = [
    { value: "30+", label: "Years of Heritage", sub: "Established in PCMC & Pune" },
    { value: "10,000+", label: "Delighted Families", sub: "Thriving residential communities" },
    { value: "100%", label: "RERA Transparency", sub: "Zero-compromise legal title" },
    { value: "Millions", label: "Sq.Ft. Delivered", sub: "Masterpiece landmarks" }
  ];

  const testimonials = [
    {
      name: "Rohit & Megha Sharma",
      role: "Residents, Puneville Phase I",
      quote: "The 22-foot elevated skywalk is truly game changing. Our two young kids can ride their bicycles from our tower to the swimming pool without crossing any car driveways. The peace of mind is priceless.",
      rating: "★★★★★"
    },
    {
      name: "Dr. Aniruddha Kulkarni",
      role: "Resident, Puneville Phase II",
      quote: "Living 8 minutes away from Hinjawadi and 2 minutes from the Expressway makes commuting effortless. Plus, having 4 Olympic-sized swimming pools means you never find the pool crowded on weekends.",
      rating: "★★★★★"
    }
  ];

  return (
    <section id="developer" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            Legacy of 3 Decades
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            The Assurance of <span className="gold-gradient-text">Pharande Spaces</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Synonymous with visionary township developments, progressive architecture, and punctual handovers across Pune and Pimpri-Chinchwad.
          </p>
        </div>

        {/* Developer Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card-interactive text-center shadow-sm"
            >
              <span className="text-3xl sm:text-4xl font-display font-black text-[#845D12] block mb-1">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-[#0F172A] block mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#64748B] font-medium">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Resident Stories & Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel shadow-xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#845D12] text-sm tracking-widest font-bold">{t.rating}</span>
                  <Quote className="w-8 h-8 text-[#845D12]/30" />
                </div>
                <p className="text-sm text-[#334155] font-normal leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass-inner-well text-[#845D12] font-bold flex items-center justify-center font-display text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{t.name}</h4>
                  <span className="text-xs text-[#64748B]">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Developer CTA Box */}
        <div className="rounded-3xl p-8 glass-panel shadow-2xl text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-2">
            Experience the Puneville Hospitality
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] font-normal mb-6 max-w-xl mx-auto">
            Book an exclusive guided tour of our fully delivered towers, operational Olympic pools, elevated skywalk, and designer show residences.
          </p>
          <button
            onClick={onOpenVisit}
            className="px-8 py-4 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-xl shadow-slate-900/20 transition-all inline-flex items-center gap-2"
          >
            <span>Schedule Your Private Site Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
