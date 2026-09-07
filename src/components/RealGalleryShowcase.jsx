import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Download, Sparkles, Building2, Eye } from 'lucide-react';
import { SCRAPED_MEDIA } from '../data/scrapedMedia';

export default function RealGalleryShowcase({ onOpenVisit }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Combine gallery images with rich categories
  const allImages = [
    {
      id: "site-entrance",
      title: "On-Site Puneville Monument & Grand Entrance Plaza",
      category: "architecture",
      categoryLabel: "Site Entrance & Monument",
      src: "/images/puneville/site-entrance-monument.jpg",
      desc: "Real on-site landmark entrance at Punawale featuring the giant monolithic Puneville 3D monument letters, aerodynamic canopy, and soaring high-rise towers."
    },
    {
      id: "tower-night",
      title: "Illuminated High-Rise Towers & Skywalk at Dusk",
      category: "architecture",
      categoryLabel: "Architecture & Skywalk",
      src: "/images/puneville/gallery/gallery-tower-night.jpg",
      desc: "G+27 soaring towers illuminated with the elevated pedestrian skywalk ribbon glowing above the landscaped podiums."
    },
    {
      id: "pool-twilight",
      title: "Olympic-Sized 50-Meter Swimming Lagoon",
      category: "aquatics",
      categoryLabel: "Olympic Pools",
      src: "/images/puneville/gallery/gallery-pool-evening.jpg",
      desc: "Resort-grade 50-meter Olympic lap pool surrounded by sun loungers and manicured palms."
    },
    {
      id: "podium-greens",
      title: "Central Landscaped Green Podiums",
      category: "landscape",
      categoryLabel: "60% Nature Canopy",
      src: "/images/puneville/gallery/gallery-podium-landscape.jpg",
      desc: "Verdant garden expanses connecting pedestrian walkways and zen sitting niches."
    },
    {
      id: "sample-interiors",
      title: "Ultra-Luxury Living & Dining Salon",
      category: "interiors",
      categoryLabel: "Sample Residences",
      src: "/images/puneville/gallery/gallery-interiors.jpg",
      desc: "Lavish living room with floor-to-ceiling panoramic glass windows channeling Sahyadri breeze."
    },
    {
      id: "aerial-drone",
      title: "28-Acre Integrated Township Aerial Perspective",
      category: "architecture",
      categoryLabel: "Aerial Perspective",
      src: "/images/puneville/gallery/gallery-aerial-towers.jpg",
      desc: "Comprehensive drone vantage showing the aerodynamic tower arrangement master-planned by Aedas."
    },
    {
      id: "skywalk-deck",
      title: "22-Ft Elevated Skywalk Pedestrian Promenade",
      category: "landscape",
      categoryLabel: "Signature Skywalk",
      src: "/images/puneville/gallery/gallery-skywalk-promenade.jpg",
      desc: "A completely vehicle-free pedestrian artery connecting all 19 residential high-rises to clubhouses."
    },
    {
      id: "club-reception",
      title: "Club Royale Grand Hospitality Lounge",
      category: "aquatics",
      categoryLabel: "Clubhouse",
      src: "/images/puneville/gallery/gallery-club-lounge.jpg",
      desc: "One of the four independent international clubhouses featuring concierge and leisure suites."
    },
    {
      id: "facade-design",
      title: "Aerodynamic Facade Architecture by Aedas",
      category: "architecture",
      categoryLabel: "Architectural Elevation",
      src: "/images/puneville/gallery/gallery-grand-facade.jpg",
      desc: "Signature clean lines and aerodynamic fins designed by world-renowned architecture firm Aedas."
    },
    {
      id: "evening-vista",
      title: "Puneville Skyline Silhouette at Sunset",
      category: "architecture",
      categoryLabel: "Skyline View",
      src: "/images/puneville/gallery/gallery-evening-glow.jpg",
      desc: "Captivating western sunsets over the Punawale horizon from upper residence balconies."
    }
  ];

  const filteredImages = activeFilter === 'all'
    ? allImages
    : allImages.filter(img => img.category === activeFilter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC] font-google">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            Authentic Visual Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Township & <span className="gold-gradient-text">Architectural Gallery</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Take a visual tour through the Olympic lagoons, 22-foot elevated skywalk, designer residences, and Aedas architectural elevations at Pharande Puneville.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Real Media' },
            { id: 'architecture', label: 'Architecture & Towers' },
            { id: 'aquatics', label: 'Olympic Pools & Clubs' },
            { id: 'landscape', label: 'Skywalk & Greens' },
            { id: 'interiors', label: 'Residences & Interiors' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeFilter === tab.id
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md font-bold'
                  : 'glass-pill hover:bg-white text-[#1E293B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-card-interactive hover:border-[#845D12] hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F5EE]">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider glass-pill text-[#845D12] shadow-sm">
                    {img.categoryLabel}
                  </span>
                </div>

                {/* Hover Quick Zoom Cue */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-xl">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#845D12] transition-colors mb-2">
                    {img.title}
                  </h3>
                  <p className="text-xs text-[#475569] font-normal line-clamp-2 leading-relaxed">
                    {img.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/60 flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>Pharande Puneville • Punawale</span>
                  <span className="text-[#845D12] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    View HD <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA Banner */}
        <div className="rounded-3xl p-8 glass-panel shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mb-2">
              Want to experience Puneville in high definition?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] max-w-xl font-normal">
              Visit our on-site customer experience gallery in Punawale to walk on the real elevated skywalk and tour fully furnished 2 & 3 BHK sample residences.
            </p>
          </div>
          <button
            onClick={onOpenVisit}
            className="flex-shrink-0 px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] hover:scale-[1.02] shadow-xl shadow-slate-900/20 transition-all"
          >
            Book Experience Center Tour
          </button>
        </div>

      </div>

      {/* Full-Screen HD Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full rounded-3xl overflow-hidden glass-panel border border-white/80 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full glass-inner-well text-[#0F172A] hover:bg-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative aspect-[16/10] max-h-[70vh] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E2D9CC] flex items-center justify-center shadow-inner">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image Details Caption */}
            <div className="mt-4 pt-4 border-t border-[#E2D9CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-[#845D12] uppercase tracking-widest block mb-1 font-bold">
                  {filteredImages[lightboxIndex].categoryLabel} • {lightboxIndex + 1} of {filteredImages.length}
                </span>
                <h4 className="text-lg font-bold text-[#0F172A]">
                  {filteredImages[lightboxIndex].title}
                </h4>
                <p className="text-xs text-[#334155] font-normal mt-1 max-w-2xl">
                  {filteredImages[lightboxIndex].desc}
                </p>
              </div>

              <button
                onClick={() => { closeLightbox(); onOpenVisit(); }}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-md transition-colors"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
