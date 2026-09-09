import React, { useState } from 'react';
import { ShieldCheck, Layers, Compass, Navigation2, HelpCircle, TrendingUp, ExternalLink, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { RERA_REGISTRATIONS, SEO_TOPICAL_PAGES } from '../data/seoEcosystem';

export default function SEOTopicalHub({ onOpenVisit, onOpenBrochure, onNavigate }) {
  const [activeTab, setActiveTab] = useState('rera');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const tabs = [
    { id: 'rera', label: 'MahaRERA Certifications', icon: ShieldCheck, badge: '6 Registrations' },
    { id: 'configs', label: '2, 2.5, 3 & 4 BHK Specs', icon: Layers, badge: 'Full Matrix' },
    { id: 'skywalk', label: '22-Ft Skywalk & Pools', icon: Compass, badge: 'Engineering' },
    { id: 'transit', label: 'Hinjawadi Commute Radar', icon: Navigation2, badge: '8-10 Mins' },
    { id: 'investment', label: 'ROI & Rental Yield', icon: TrendingUp, badge: '12.4% YoY' },
    { id: 'faq', label: 'Knowledge FAQ', icon: HelpCircle, badge: 'Verified' },
  ];

  const faqs = [
    {
      q: "What is Pharande Puneville and who designed its architecture?",
      a: "Pharande Puneville is a landmark 28-acre integrated residential township in Punawale, PCMC Pune developed by Pharande Spaces. The entire masterplan, 19 high-rise residential towers, and central landscape spine were conceived and designed by world-renowned architecture firm AEDAS."
    },
    {
      q: "What are the official MahaRERA registration numbers for Puneville?",
      a: "Pharande Puneville holds registered MahaRERA certifications across all phases: Phase I is P52100000441, Phase II is P52100000440, Phase III Cluster A is P52100029522, Phase III Cluster B is P52100051020, Phase III Cluster C is P52100077431, and Phase III Cluster D (Wings Q, R, S) is P52100047694. All certificates can be verified at maharera.mahaonline.gov.in."
    },
    {
      q: "What configurations and usable carpet areas are available?",
      a: "Puneville offers 2 BHK Royale (752 sq.ft.), 2 BHK Grande (848 sq.ft.), 2.5 BHK Luxury Pod with dedicated WFH office (948 sq.ft.), 3 BHK Imperial (1,172 sq.ft.), and bespoke 4 BHK Sky Residences, all designed with zero corridor wastage and double sundecks."
    },
    {
      q: "How does the 22-foot elevated skywalk function?",
      a: "The signature 22-foot elevated skywalk is a continuous 2.1-km illuminated pedestrian highway connecting all 19 residential towers to the 4 grand clubhouses, 4 Olympic-sized pools, and sports arenas. Because it is elevated above ground, children and senior citizens can traverse the entire 28 acres with zero vehicular traffic interactions."
    },
    {
      q: "How far is Puneville from Hinjawadi IT Park and Mumbai-Pune Expressway?",
      a: "Pharande Puneville is situated just 1.2 km (2 minutes) from the Mumbai-Pune Expressway exit ramp and 4.8 km (approx. 8 to 10 minutes) from Hinjawadi IT Park Phase 1 (Infosys, TCS, Wipro), saving working professionals over 140 hours in daily traffic each year."
    },
    {
      q: "What are the starting prices and bank loan eligibility for Puneville?",
      a: "Residences start at ₹85 Lakhs* for 2 BHK, ₹1.08 Cr* for 2.5 BHK, and ₹1.25 Cr* for 3 BHK. The project is pre-approved for home loans by SBI, HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda with maximum loan-to-value (LTV) options."
    }
  ];

  return (
    <section id="topical-hub" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#845D12]" />
            Official Project Intelligence & Authority Hub
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Pharande Puneville <span className="gold-gradient-text">Complete Knowledge Graph</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Verified MahaRERA documentation, architectural specifications by Aedas, unit configuration carpet areas, and connectivity intelligence for smart homebuyers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 sm:px-5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg scale-105 font-bold'
                    : 'glass-pill hover:bg-white text-[#1E293B] border-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-[#845D12]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#64748B]'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: MahaRERA */}
        {activeTab === 'rera' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2D9CC]/70 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
                  Official MahaRERA Certified Registrations
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  100% compliant with Maharashtra Real Estate Regulatory Authority regulations across all phases and clusters.
                </p>
              </div>
              <a
                href="https://maharera.mahaonline.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <span>Verify on MahaRERA Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RERA_REGISTRATIONS.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/70 border border-white/80 hover:border-amber-400/50 transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-amber-400/15 text-[#845D12] text-[11px] font-bold font-mono uppercase tracking-wider mb-2">
                      {item.cluster}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1">{item.phase}</h4>
                    <p className="text-xs text-[#64748B] mb-3">{item.wings}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#64748B] block font-semibold uppercase">MahaRERA Number</span>
                      <strong className="text-sm font-mono text-[#0F172A] font-extrabold">{item.reraNumber}</strong>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Configurations */}
        {activeTab === 'configs' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              Curated Residence Configurations & Carpet Areas
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-8">
              Engineered with Aedas 3-side open architectural layout, maximized living salons, and private balconies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { type: "2 BHK Royale", carpet: "752 sq.ft.", price: "₹ 85 Lakhs*", emi: "₹ 62,500/mo*", highlights: ["Zero passage wastage", "Master bedroom with sundeck", "Spacious kitchen with utility"] },
                { type: "2 BHK Grande", carpet: "848 sq.ft.", price: "₹ 96 Lakhs*", emi: "₹ 71,000/mo*", highlights: ["Expansive living salon", "Dining foyer area", "Double cross-ventilated balconies"] },
                { type: "2.5 BHK Luxury Pod", carpet: "948 sq.ft.", price: "₹ 1.08 Cr*", emi: "₹ 79,800/mo*", highlights: ["Dedicated private WFH / study pod", "Dual master toilets", "Scenic sunset hill views"] },
                { type: "3 BHK Imperial", carpet: "1,172 sq.ft.", price: "₹ 1.25 Cr*", emi: "₹ 92,300/mo*", highlights: ["3 luxury bathrooms", "Grand party sundeck", "Lavish dining lounge"] }
              ].map((c, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#845D12] uppercase tracking-wider block mb-1">Residence</span>
                    <h4 className="text-lg font-bold text-[#0F172A] mb-2">{c.type}</h4>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                      <div className="text-[11px] text-[#64748B]">Usable Carpet Area</div>
                      <div className="text-lg font-mono font-extrabold text-[#0F172A]">{c.carpet}</div>
                    </div>
                    <ul className="space-y-1.5 mb-5 text-xs text-[#334155]">
                      {c.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-sm font-bold text-[#0F172A] mb-1">{c.price}</div>
                    <div className="text-[11px] text-[#64748B] mb-4">Est. EMI: {c.emi}</div>
                    <button
                      type="button"
                      onClick={() => onOpenBrochure ? onOpenBrochure(c.type) : onOpenVisit()}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Request Cost Sheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Skywalk & Pools */}
        {activeTab === 'skywalk' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-bold text-[#845D12] uppercase tracking-wider block mb-2">Township Infrastructure</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] mb-4">
                  The 22-Foot Elevated Skywalk & 4 Olympic Pools
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  Puneville eliminates traditional ground traffic hazards by segregating all pedestrian routes onto an architecturally engineered 22-foot high skybridge promenade. The 2.1-km loop connects all 19 towers directly into clubhouses and Olympic swimming lagoons.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-white/70 border border-white/80">
                    <div className="text-2xl font-display font-extrabold text-[#845D12]">22 Feet</div>
                    <div className="text-xs text-[#64748B] font-medium">Elevation Above Ground</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 border border-white/80">
                    <div className="text-2xl font-display font-extrabold text-[#845D12]">4 Pools</div>
                    <div className="text-xs text-[#64748B] font-medium">50-Meter Olympic Length</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 border border-white/80">
                    <div className="text-2xl font-display font-extrabold text-[#845D12]">2.1 KM</div>
                    <div className="text-xs text-[#64748B] font-medium">Continuous Skywalk Loop</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 border border-white/80">
                    <div className="text-2xl font-display font-extrabold text-[#845D12]">60%</div>
                    <div className="text-xs text-[#64748B] font-medium">Open Landscaped Greens</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenVisit}
                  className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Book Guided Skywalk Experience Tour
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-white/80 aspect-[16/11]">
                <img
                  src="/images/puneville/gallery/gallery-skywalk-promenade.jpg"
                  alt="22-Foot Elevated Pedestrian Skywalk at Pharande Puneville"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Transit & Hinjawadi */}
        {activeTab === 'transit' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              Strategic Proximity Radar & Commute Times
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-8">
              Punawale is western Pune's strategic growth axis, linking Hinjawadi's tech hub with the Mumbai-Pune Expressway.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { dest: "Mumbai-Pune Expressway", time: "2 Mins", dist: "1.2 km", desc: "Signal-free ramp to Expressway exit" },
                { dest: "Hinjawadi IT Park Ph 1", time: "8-10 Mins", dist: "4.8 km", desc: "Infosys, Wipro, TCS, Cognizant" },
                { dest: "Bhumkar Chowk (Wakad)", time: "6 Mins", dist: "3.4 km", desc: "BRTS corridor & commercial hubs" },
                { dest: "Phoenix Mall Millennium", time: "10 Mins", dist: "4.2 km", desc: "Premier shopping & entertainment" },
                { dest: "Aditya Birla Hospital", time: "8 Mins", dist: "4.1 km", desc: "Multi-speciality medical campus" },
                { dest: "Proposed Punawale Metro", time: "3 Mins", dist: "1.0 km", desc: "Pune Metro Line 3 rapid transit" }
              ].map((t, ti) => (
                <div key={ti} className="p-5 rounded-2xl bg-white/70 border border-white/80 shadow-sm flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{t.dest}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5 mb-2">{t.desc}</p>
                    <span className="text-[11px] font-mono text-slate-500">{t.dist}</span>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-[#845D12] text-xs font-bold font-mono">
                    {t.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Investment & Rental */}
        {activeTab === 'investment' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              High-Growth Real Estate Asset & Rental Demand
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-8">
              Punawale offers steady rental yields from 400,000+ IT employees and top-tier capital appreciation in PCMC.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/70 border border-white/80 text-center">
                <span className="text-xs font-mono font-bold text-[#845D12] uppercase tracking-wider block mb-1">Annual Capital Growth</span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] mb-2">12.4% YoY</div>
                <p className="text-xs text-[#64748B]">Driven by Ring Road expansion & Hinjawadi talent demand</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/70 border border-white/80 text-center">
                <span className="text-xs font-mono font-bold text-[#845D12] uppercase tracking-wider block mb-1">Monthly 2 BHK Rental</span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] mb-2">₹28k - ₹34k</div>
                <p className="text-xs text-[#64748B]">Immediate tenant placement for IT professionals</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/70 border border-white/80 text-center">
                <span className="text-xs font-mono font-bold text-[#845D12] uppercase tracking-wider block mb-1">Monthly 3 BHK Rental</span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] mb-2">₹38k - ₹46k</div>
                <p className="text-xs text-[#64748B]">Premium executive tenant profile from tech firms</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-[#845D12]">
                <strong>Dedicated NRI & Investor Desk:</strong> Full assistance for overseas buyers including virtual tours, FEMA documentation, and end-to-end leasing management.
              </div>
              <button
                type="button"
                onClick={onOpenVisit}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Connect with Investor Desk
              </button>
            </div>
          </div>
        )}

        {/* Tab 6: Knowledge FAQ */}
        {activeTab === 'faq' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl border border-white/80 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              Frequently Asked Questions (Buyer Intelligence)
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-8">
              Real questions answered with 100% transparency by the official development team.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/80 border border-white/90 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full py-4 px-5 text-left font-bold text-sm text-[#0F172A] flex items-center justify-between gap-4 cursor-pointer hover:text-[#845D12] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#845D12] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
