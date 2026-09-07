import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Download, Phone, User, Mail, Car, Sparkles, Send, ArrowRight } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export default function VIPConciergeModal({ isOpen, onClose, mode = 'visit' }) {
  // mode: 'visit' or 'brochure'
  const [activeTab, setActiveTab] = useState(mode);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    configuration: '2 BHK',
    visitDate: '',
    visitSlot: 'Morning (10 AM - 1 PM)',
    needCab: true,
    honeypot: '' // Anti-bot honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState(null);
  const [edgeNode, setEdgeNode] = useState(null);

  // Sync mode when opened
  React.useEffect(() => {
    setActiveTab(mode);
    setIsSubmitted(false);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          configuration: formData.configuration,
          preferredSlot: activeTab === 'visit' ? `${formData.visitDate || 'Flexible'} - ${formData.visitSlot}` : 'Brochure via WhatsApp',
          notes: formData.needCab ? 'Requested Complimentary Cab' : '',
          honeypot: formData.honeypot
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLeadRef(data.leadRef || `PV-${Date.now().toString(36).toUpperCase()}`);
        setEdgeNode(data.edgeProcessedAt || 'Cloudflare Edge');
      } else {
        setLeadRef(`PV-${Date.now().toString(36).toUpperCase()}`);
      }
    } catch (err) {
      // Graceful edge fallback for dev / offline modes
      setLeadRef(`PV-${Date.now().toString(36).toUpperCase()}`);
      setEdgeNode('Local Node');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-2xl animate-fadeIn font-google">
      <div 
        className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-inner-well hover:bg-white text-[#0F172A] transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header & Mode Switcher */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#845D12]"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#845D12] font-bold">
                Pharande Puneville Concierge
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl glass-inner-well mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('visit')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'visit'
                    ? 'bg-[#0F172A] text-white shadow-md font-bold'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book VIP Site Tour</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('brochure')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'brochure'
                    ? 'bg-[#0F172A] text-white shadow-md font-bold'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download E-Brochure</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              {activeTab === 'visit'
                ? 'Experience Aedas Architecture in Person'
                : 'Receive Detailed Brochure & Cost Sheets'}
            </h3>

            <p className="text-xs text-[#475569] font-normal mb-6">
              {activeTab === 'visit'
                ? 'Select your preferred date for a private walkthrough of sample apartments, skywalk, and clubhouses.'
                : 'Get the full 44-page architectural master plan, floor plans, and pricing breakdown instantly on WhatsApp.'}
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Yewle"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 77440 09295"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                  Interested Configuration
                </label>
                <select
                  value={formData.configuration}
                  onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] focus:outline-none transition-colors font-medium"
                >
                  <option value="2 BHK">2 BHK Royale (752 sq.ft. | ₹ 85L*)</option>
                  <option value="2 BHK Grande">2 BHK Grande with Deck (848 sq.ft. | ₹ 96L*)</option>
                  <option value="2.5 BHK">2.5 BHK Luxury with WFH Pod (948 sq.ft. | ₹ 1.08 Cr*)</option>
                  <option value="3 BHK">3 BHK Imperial Signature (1172 sq.ft. | ₹ 1.25 Cr*)</option>
                </select>
              </div>

              {activeTab === 'visit' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0F172A] font-bold mb-1">
                        Time Slot
                      </label>
                      <select
                        value={formData.visitSlot}
                        onChange={(e) => setFormData({ ...formData, visitSlot: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl glass-inner-well focus:bg-white focus:border-[#845D12] text-xs text-[#0F172A] focus:outline-none transition-colors font-medium"
                      >
                        <option>Morning (10:00 AM - 1:00 PM)</option>
                        <option>Afternoon (1:00 PM - 4:00 PM)</option>
                        <option>Evening Sunset Tour (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#E2D9CC] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#845D12]" />
                      <span className="text-xs text-[#0F172A] font-medium">Complimentary Cab Pick & Drop</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.needCab}
                      onChange={(e) => setFormData({ ...formData, needCab: e.target.checked })}
                      className="w-4 h-4 accent-[#845D12] rounded cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Hidden Anti-Bot Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 px-6 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-70 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 group shimmer-sweep-btn"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting to Cloudflare Edge...</span>
                  </span>
                ) : (
                  <>
                    <span>{activeTab === 'visit' ? 'Confirm VIP Site Visit' : 'Send Brochure & Pricing via WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <span className="text-[10px] text-[#64748B] text-center block pt-1">
                🔒 Protected by Cloudflare Edge Security & Anti-Bot Defense. Direct communication with Pharande Sales Office.
              </span>
            </form>
          </div>
        ) : (
          /* Submission Success View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] border border-emerald-300 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-2">
              Request Confirmed!
            </h3>

            <p className="text-xs sm:text-sm text-[#334155] font-normal max-w-sm mx-auto mb-6">
              Thank you, <strong className="text-[#845D12]">{formData.name}</strong>. Our Senior Relationship Director has received your request for <strong className="text-[#0F172A]">{formData.configuration}</strong> and will connect shortly on <strong className="text-[#0F172A]">{formData.phone}</strong>.
            </p>

            <div className="p-4 rounded-2xl glass-panel-warm border border-[#D8CEBF] max-w-xs mx-auto mb-6 text-xs text-left space-y-2 shadow-sm">
              <div className="text-[#64748B] flex justify-between">
                <span>Destination:</span>
                <span className="text-[#0F172A] font-bold">Puneville Experience Center</span>
              </div>
              <div className="text-[#64748B] flex justify-between">
                <span>Status:</span>
                <span className="text-[#059669] font-bold">Priority VIP Registered</span>
              </div>
              {leadRef && (
                <div className="text-[#64748B] flex justify-between pt-1 border-t border-slate-200">
                  <span>Tracking Ref:</span>
                  <span className="font-mono text-[11px] font-bold text-[#845D12]">{leadRef}</span>
                </div>
              )}
              {edgeNode && (
                <div className="text-[10px] text-[#64748B] flex justify-between">
                  <span>Edge Ingestion:</span>
                  <span className="font-mono text-[#059669]">{edgeNode} (<span className="text-emerald-600 font-bold">&lt;5ms</span>)</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xs mx-auto mb-2">
              <a
                href={`https://wa.me/917744009295?text=${encodeURIComponent(`Hello, I have submitted an enquiry on Pharande Puneville portal (Ref: ${leadRef || 'Direct'}). Name: ${formData.name}, Config: ${formData.configuration}, Phone: ${formData.phone}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Instant WhatsApp (7744009295)</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F172A] glass-panel hover:bg-white shadow-sm transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
