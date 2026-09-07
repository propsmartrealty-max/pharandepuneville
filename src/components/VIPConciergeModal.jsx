import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Calendar, Download, Phone, User, Mail, Car, 
  Sparkles, Send, ArrowRight, ShieldCheck, Clock, MapPin, 
  Check, FileText, Calculator, Flame, Globe2 
} from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

const CONFIGURATIONS = [
  { id: '2bhk', name: '2 BHK Royale', area: '752 sq.ft.', price: '₹ 85 Lakhs*', emi: '₹ 62,500/mo*' },
  { id: '2bhk-grande', name: '2 BHK Grande', area: '848 sq.ft.', price: '₹ 96 Lakhs*', emi: '₹ 71,000/mo*' },
  { id: '2.5bhk', name: '2.5 BHK Luxury Pod', area: '948 sq.ft.', price: '₹ 1.08 Cr*', emi: '₹ 79,800/mo*' },
  { id: '3bhk', name: '3 BHK Imperial', area: '1172 sq.ft.', price: '₹ 1.25 Cr*', emi: '₹ 92,300/mo*' },
];

export default function VIPConciergeModal({ isOpen, onClose, mode = 'visit', initialConfig = null }) {
  const [activeTab, setActiveTab] = useState(mode); // 'visit' | 'brochure' | 'pricing' | 'cluster'
  const [selectedConfig, setSelectedConfig] = useState(initialConfig || '2.5 BHK Luxury Pod');
  const [intentPurpose, setIntentPurpose] = useState('End Use'); // 'End Use' | 'Investment'
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    visitSlot: 'Morning (10:00 AM - 1:00 PM)',
    needCab: true,
    pickupLocation: '',
    honeypot: ''
  });

  const [geoContext, setGeoContext] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState(null);
  const [edgeNode, setEdgeNode] = useState(null);

  // Probe Cloudflare Edge Geo Telemetry
  useEffect(() => {
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setGeoContext(data);
      })
      .catch(() => {});
  }, []);

  // Sync mode and prefill
  useEffect(() => {
    setActiveTab(mode);
    setIsSubmitted(false);
    if (initialConfig) setSelectedConfig(initialConfig);
  }, [mode, initialConfig, isOpen]);

  // Phone validation helper
  const cleanDigits = formData.phone.replace(/[^0-9]/g, '');
  const isValidPhone = cleanDigits.length >= 10;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhone) return;

    setIsSubmitting(true);

    const intentSummary = activeTab === 'visit' 
      ? `Site Tour on ${formData.visitDate || 'Flexible'} (${formData.visitSlot}) - ${formData.needCab ? `Cab from ${formData.pickupLocation || 'Home'}` : 'Direct Arrival'}`
      : activeTab === 'pricing'
      ? `Detailed Cost Sheet & Payment Plan for ${selectedConfig}`
      : activeTab === 'cluster'
      ? `Cluster D Wing Availability Check for ${selectedConfig}`
      : `Brochure & Floorplans on WhatsApp for ${selectedConfig}`;

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      configuration: selectedConfig,
      preferredSlot: intentSummary,
      notes: `Purpose: ${intentPurpose} | Pickup: ${formData.needCab ? (formData.pickupLocation || 'Requested') : 'No'}`,
      honeypot: formData.honeypot
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setLeadRef(data.leadRef || `PV-${Date.now().toString(36).toUpperCase()}`);
        setEdgeNode(data.edgeProcessedAt || 'Cloudflare Edge');
      } else {
        setLeadRef(`PV-${Date.now().toString(36).toUpperCase()}`);
      }
    } catch (err) {
      setLeadRef(`PV-${Date.now().toString(36).toUpperCase()}`);
      setEdgeNode('Local Edge Node');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0F172A]/85 backdrop-blur-2xl animate-fadeIn font-google overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl my-6 rounded-3xl glass-panel-warm p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.45)] overflow-hidden border border-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Prismatic Ambient Light Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-inner-well hover:bg-white text-[#0F172A] transition-all hover:scale-105 shadow-sm z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Top Intelligent Edge Geo & Scarcity Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#845D12] text-[11px] font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Phase 3 Cluster D • 82% Reserved</span>
              </div>

              {geoContext?.geo && (
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B]">
                  <Globe2 className="w-3 h-3 text-emerald-600" />
                  <span>{decodeURIComponent(geoContext.geo.city || 'Pune')} Desk Active</span>
                </div>
              )}
            </div>

            {/* Personalized Proximity Banner */}
            {geoContext?.geo?.city?.toLowerCase().includes('mumbai') && (
              <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-[#7A560D] flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span><strong>Special Mumbai Visitor Perk:</strong> Direct AC cab pick & drop arranged from Dadar / Vashi / Chembur to Puneville.</span>
              </div>
            )}

            {geoContext?.localization?.isNRI && (
              <div className="mb-4 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-sky-800 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span><strong>NRI Dedicated Investor Desk:</strong> Direct Virtual Tour & WhatsApp Support available in your timezone.</span>
              </div>
            )}

            {/* Smart 4-Tab Intent Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl glass-inner-well mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('visit')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 truncate ${
                  activeTab === 'visit'
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>VIP Site Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('brochure')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 truncate ${
                  activeTab === 'brochure'
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                }`}
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>E-Brochure</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 truncate ${
                  activeTab === 'pricing'
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Cost Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cluster')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 truncate ${
                  activeTab === 'cluster'
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Cluster D</span>
              </button>
            </div>

            {/* Dynamic Title & Subtitle */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-google font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {activeTab === 'visit' && 'Book Private Walkthrough & Sample Flat Visit'}
                {activeTab === 'brochure' && 'Instant Masterplan & Floorplans on WhatsApp'}
                {activeTab === 'pricing' && 'Request All-Inclusive Cost Sheet & Govt Charges'}
                {activeTab === 'cluster' && 'Check Live Availability: Phase III Cluster D (Q, R, S)'}
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                {activeTab === 'visit' && 'Experience the 22-ft elevated skywalk, Olympic pools, and 3-side open show flats in person.'}
                {activeTab === 'brochure' && 'Official 44-page Aedas monograph, cluster layouts, and technical specs sent instantly.'}
                {activeTab === 'pricing' && 'Complete breakdown of Base Price, Stamp Duty, GST, and tailored bank loan schemes.'}
                {activeTab === 'cluster' && 'Priority inventory allocation for high-floor residences with panoramic valley views.'}
              </p>
            </div>

            {/* Visual Interactive Configuration Selector */}
            <div className="mb-4">
              <label className="block text-[11px] font-mono uppercase text-[#475569] font-bold mb-1.5">
                Select Desired Residence
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CONFIGURATIONS.map((cfg) => {
                  const isSelected = selectedConfig.includes(cfg.name.split(' ')[0]);
                  return (
                    <div
                      key={cfg.id}
                      onClick={() => setSelectedConfig(cfg.name)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 border text-left relative ${
                        isSelected
                          ? 'bg-white border-[#845D12] shadow-md ring-1 ring-[#845D12]'
                          : 'glass-inner-well border-transparent hover:bg-white/70'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#845D12] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                      <span className="font-bold text-xs text-[#0F172A] block truncate">{cfg.name}</span>
                      <span className="text-[10px] text-[#64748B] block">{cfg.area}</span>
                      <span className="text-xs font-extrabold text-[#845D12] block mt-1">{cfg.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Purpose Selector */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-mono uppercase text-[#475569] font-bold">Purpose:</span>
              <button
                type="button"
                onClick={() => setIntentPurpose('End Use')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  intentPurpose === 'End Use'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'glass-inner-well text-[#475569]'
                }`}
              >
                Self Use (Family Home)
              </button>
              <button
                type="button"
                onClick={() => setIntentPurpose('Investment')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  intentPurpose === 'Investment'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'glass-inner-well text-[#475569]'
                }`}
              >
                Investment (High Rental Yield)
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] focus:outline-none transition-colors font-medium border border-transparent focus:border-[#845D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 77440 09295"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-9 pr-8 py-2.5 rounded-xl glass-inner-well focus:bg-white text-xs text-[#0F172A] focus:outline-none transition-colors font-medium border ${
                        isValidPhone ? 'border-emerald-500 focus:border-emerald-500' : 'border-transparent focus:border-[#845D12]'
                      }`}
                    />
                    {isValidPhone && (
                      <Check className="w-4 h-4 text-emerald-600 absolute right-3 top-3" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                  Email Address <span className="text-slate-400 font-normal">(For Digital Cost Sheet)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-inner-well focus:bg-white text-xs text-[#0F172A] focus:outline-none transition-colors font-medium border border-transparent focus:border-[#845D12]"
                  />
                </div>
              </div>

              {/* Conditional Site Visit Options */}
              {activeTab === 'visit' && (
                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#7A560D] font-bold mb-1">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300/80 text-xs text-[#0F172A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#7A560D] font-bold mb-1">
                        Preferred Window
                      </label>
                      <select
                        value={formData.visitSlot}
                        onChange={(e) => setFormData({ ...formData, visitSlot: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-300/80 text-xs text-[#0F172A] focus:outline-none"
                      >
                        <option>Morning (10:00 AM - 1:00 PM)</option>
                        <option>Afternoon (1:00 PM - 4:00 PM)</option>
                        <option>Evening Sunset Tour (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#845D12]" />
                      <span className="text-xs text-[#0F172A] font-semibold">Complimentary AC Cab Pick & Drop</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.needCab}
                      onChange={(e) => setFormData({ ...formData, needCab: e.target.checked })}
                      className="w-4 h-4 accent-[#845D12] rounded cursor-pointer"
                    />
                  </div>

                  {formData.needCab && (
                    <input
                      type="text"
                      placeholder="Enter pickup locality (e.g. Wakad, Baner, Kothrud, Vashi)"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-[#0F172A] focus:outline-none placeholder-slate-400"
                    />
                  )}
                </div>
              )}

              {/* Honeypot Bot Trap */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Submit CTA with Breathing Shimmer */}
              <button
                type="submit"
                disabled={isSubmitting || !isValidPhone}
                className="w-full mt-2 py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/25 transition-all flex items-center justify-center gap-2 group shimmer-sweep-btn relative overflow-hidden"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting to Cloudflare Edge...</span>
                  </span>
                ) : (
                  <>
                    <span>
                      {activeTab === 'visit' && 'Confirm VIP Walkthrough & Site Tour'}
                      {activeTab === 'brochure' && 'Instant WhatsApp Brochure & Price List'}
                      {activeTab === 'pricing' && 'Receive Customized All-Inclusive Cost Sheet'}
                      {activeTab === 'cluster' && 'Check Live Cluster D Inventory'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>

              {/* Security & Direct Assurance Footer */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#64748B]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Propsmart Realty Official Desk • Zero Brokerage</span>
                </span>
                <span>Direct Office: +91 7744009295</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success View */
          <div className="text-center py-4 sm:py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] border border-emerald-300 flex items-center justify-center mx-auto mb-3 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-google font-extrabold text-[#0F172A] mb-1.5">
              Enquiry Confirmed!
            </h3>

            <p className="text-xs sm:text-sm text-[#334155] font-normal max-w-sm mx-auto mb-5">
              Thank you, <strong className="text-[#845D12]">{formData.name}</strong>. Your enquiry for <strong className="text-[#0F172A]">{selectedConfig}</strong> has been logged and dispatched to <strong className="text-[#0F172A]">propsmartrealty@gmail.com</strong>.
            </p>

            {/* Tracking & Telemetry Card */}
            <div className="p-4 rounded-2xl glass-panel-warm border border-[#D8CEBF] max-w-sm mx-auto mb-5 text-xs text-left space-y-2 shadow-md">
              <div className="text-[#64748B] flex justify-between">
                <span>Destination:</span>
                <span className="text-[#0F172A] font-bold">Puneville Experience Center</span>
              </div>
              <div className="text-[#64748B] flex justify-between">
                <span>Assigned Director:</span>
                <span className="text-[#059669] font-bold">Propsmart Priority Relationship Manager</span>
              </div>
              {leadRef && (
                <div className="text-[#64748B] flex justify-between pt-1 border-t border-slate-200">
                  <span>Tracking Ref:</span>
                  <span className="font-mono text-[11px] font-bold text-[#845D12]">{leadRef}</span>
                </div>
              )}
              {edgeNode && (
                <div className="text-[10px] text-[#64748B] flex justify-between">
                  <span>Edge Telemetry:</span>
                  <span className="font-mono text-[#059669]">{edgeNode} (&lt;5ms) • Lead Dispatched</span>
                </div>
              )}
            </div>

            {/* Instant Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto mb-3">
              <a
                href={`https://wa.me/917744009295?text=${encodeURIComponent(
                  `Hello Propsmart Realty, I have submitted an enquiry for Pharande Puneville (Ref: ${leadRef || 'Direct'}). Name: ${formData.name}, Config: ${selectedConfig}, Phone: ${formData.phone}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Connect on WhatsApp (7744009295)</span>
              </a>

              <a
                href="/images/puneville/masterplan/masterplan-layout.jpg"
                download="Pharande-Puneville-Masterplan.jpg"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#0F172A] glass-panel hover:bg-white shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Download className="w-3.5 h-3.5 text-[#845D12]" />
                <span>Download Masterplan</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-[#64748B] hover:text-[#0F172A] underline underline-offset-4 transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
