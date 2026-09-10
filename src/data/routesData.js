/**
 * Comprehensive Clean Routes Configuration for Pharande Puneville
 * Used for Astro SSG pre-rendering and client-side active scroll routing.
 * Zero '#' hash fragments across the entire application.
 */

export const CLEAN_ROUTES = [
  {
    path: "/aedas-vision",
    id: "vision",
    navLabel: "AEDAS VISION",
    title: "Aedas Architectural Vision | Pharande Puneville Punawale",
    description: "Explore the international design philosophy of Aedas at Pharande Puneville. 28-Acre integrated residential township on Mumbai-Pune Expressway.",
    canonicalUrl: "https://pharande-puneville.in/aedas-vision"
  },
  {
    path: "/masterplan",
    id: "masterplan",
    navLabel: "MASTERPLAN",
    title: "28-Acre Masterplan Layout | Pharande Puneville Township",
    description: "Interactive master layout of Pharande Puneville across 28 acres: 19 residential towers, 22-foot elevated pedestrian skywalk, and 4 Olympic-sized pools.",
    canonicalUrl: "https://pharande-puneville.in/masterplan"
  },
  {
    path: "/towers",
    id: "towers",
    navLabel: "TOWERS",
    title: "19 High-Rise Towers & Clusters | Pharande Puneville",
    description: "Explore Clusters A, B, C and newly launched Cluster D Wings Q, R, S with panoramic views at Pharande Puneville Punawale.",
    canonicalUrl: "https://pharande-puneville.in/towers"
  },
  {
    path: "/floor-plans",
    id: "residences",
    navLabel: "FLOOR PLANS",
    title: "2, 2.5 & 3 BHK Floor Plans & Pricing | Pharande Puneville",
    description: "Explore 2 BHK Royale (752 sq.ft.), 2 BHK Grande (848 sq.ft.), 2.5 BHK Luxury Pod (948 sq.ft.), and 3 BHK Imperial (1,172 sq.ft.) residences starting ₹85 Lakhs*.",
    canonicalUrl: "https://pharande-puneville.in/floor-plans"
  },
  {
    path: "/amenities",
    id: "amenities",
    navLabel: "AMENITIES",
    title: "40+ Resort Amenities & 4 Olympic Pools | Pharande Puneville",
    description: "Discover 40+ lifestyle amenities: 22-ft elevated pedestrian skywalk, 4 Olympic-sized swimming pools, tennis courts, clubhouse, and landscaped greens.",
    canonicalUrl: "https://pharande-puneville.in/amenities"
  },
  {
    path: "/gallery",
    id: "gallery",
    navLabel: "REAL GALLERY",
    title: "Authentic Site Photography & Gallery | Pharande Puneville",
    description: "Authentic photos of delivered towers, Olympic pools at night, grand entrance monument, luxury sample flats, and landscaped gardens in Punawale.",
    canonicalUrl: "https://pharande-puneville.in/gallery"
  },
  {
    path: "/location",
    id: "location",
    navLabel: "LOCATION",
    title: "Strategic Punawale & Hinjawadi Location | Pharande Puneville",
    description: "Prime connectivity: 2 mins from Mumbai-Pune Expressway, 8-10 mins from Hinjawadi IT Park Phase 1, 6 mins from Bhumkar Chowk Wakad.",
    canonicalUrl: "https://pharande-puneville.in/location"
  },
  {
    path: "/emi-calculator",
    id: "financials",
    navLabel: "EMI CALCULATOR",
    title: "Mortgage EMI Calculator & Payment Plans | Pharande Puneville",
    description: "Calculate monthly home loan EMIs, view bank loan approvals, and request customized cost sheets for 2 and 3 BHK residences at Pharande Puneville.",
    canonicalUrl: "https://pharande-puneville.in/emi-calculator"
  },
  {
    path: "/construction",
    id: "construction",
    navLabel: "CONSTRUCTION",
    title: "MahaRERA Cluster D Construction Status | Pharande Puneville",
    description: "Track engineering craftsmanship, structural specifications, and MahaRERA P52100047694 construction milestones for Wings Q, R, S.",
    canonicalUrl: "https://pharande-puneville.in/construction"
  },
  {
    path: "/developer",
    id: "developer",
    navLabel: "DEVELOPER",
    title: "Pharande Spaces 30-Year Heritage | Trusted Developer PCMC Pune",
    description: "Over 30 years of delivering iconic gated townships, 10,000+ happy families, and punctual handovers across PCMC and Pune.",
    canonicalUrl: "https://pharande-puneville.in/developer"
  },
  {
    path: "/brochure",
    id: "residences",
    navLabel: "BROCHURE",
    title: "Download Official E-Brochure & Floorplans | Pharande Puneville",
    description: "Instant download of the complete 28-Acre masterplan, residence floorplans, and amenity specifications for Pharande Puneville.",
    canonicalUrl: "https://pharande-puneville.in/brochure"
  },
  {
    path: "/cluster-d",
    id: "masterplan",
    navLabel: "CLUSTER D",
    title: "Pharande Puneville Cluster D | MahaRERA P52100047694",
    description: "Newly launched Cluster D Wings Q, R, S at Pharande Puneville Punawale. 2 & 3 BHK luxury residences with panoramic views.",
    canonicalUrl: "https://pharande-puneville.in/cluster-d"
  },
  {
    path: "/book-visit",
    id: "vision",
    navLabel: "BOOK VISIT",
    title: "Book VIP Site Tour & Experience Center | Pharande Puneville",
    description: "Schedule a private guided walkthrough of sample flats and the 22-ft elevated skywalk with dedicated relationship directors.",
    canonicalUrl: "https://pharande-puneville.in/book-visit"
  }
];

// Additional vanity aliases for seamless fallback
export const ALIAS_ROUTES = [
  { path: "/vision", id: "vision", target: "/aedas-vision" },
  { path: "/residences", id: "residences", target: "/floor-plans" },
  { path: "/pricing", id: "financials", target: "/emi-calculator" },
  { path: "/emi", id: "financials", target: "/emi-calculator" },
  { path: "/financials", id: "financials", target: "/emi-calculator" },
  { path: "/site-tour", id: "vision", target: "/book-visit" },
  { path: "/skywalk", id: "vision", target: "/aedas-vision" },
  { path: "/aedas", id: "vision", target: "/aedas-vision" },
];
