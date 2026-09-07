import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, ChevronUp } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export default function FloatingContactBar({ onOpenVisit }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello! I am interested in Pharande Puneville (Punawale). Please share latest availability, price sheet, and floor plans.");
    window.open(`https://wa.me/917744009295?text=${text}`, '_blank');
  };

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full glass-pill text-[#0F172A] hover:bg-white shadow-xl flex items-center justify-center transition-all duration-200"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Concierge Button */}
      <button
        onClick={openWhatsApp}
        className="px-4 py-3 rounded-full bg-[#25D366]/90 backdrop-blur-md hover:bg-[#25D366] text-white font-bold text-xs shadow-xl shadow-[#25D366]/25 flex items-center gap-2 hover:scale-105 transition-all border border-white/30"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </button>

      {/* Floating VIP Tour Pill for Quick Booking */}
      <button
        onClick={onOpenVisit}
        className="px-5 py-3 rounded-full glass-panel-dark hover:scale-105 text-white font-bold text-xs shadow-2xl flex items-center gap-2 transition-all"
      >
        <Calendar className="w-4 h-4 text-amber-300" />
        <span>Book VIP Visit</span>
      </button>
    </aside>
  );
}
