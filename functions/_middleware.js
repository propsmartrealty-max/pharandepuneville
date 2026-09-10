/**
 * Cloudflare Pages Advanced Edge Middleware with Streaming HTMLRewriter
 * Powered by Cloudflare's C++ streaming HTML engine for zero-latency Google SEO & Programmatic SEO.
 */

import { getProgrammaticSeo } from './_seo_data.js';

// 1. Generic Attribute Replacer for Meta & Canonical tags
class EdgeAttrHandler {
  constructor(attribute, value) {
    this.attribute = attribute;
    this.value = value;
  }
  element(element) {
    if (this.value) {
      element.setAttribute(this.attribute, this.value);
    }
  }
}

// 2. Edge Head Handler: Preloads, Telemetry, and Dynamic Structured Data
class EdgeHeadHandler {
  constructor(cf, isBot, url, pSeo) {
    this.cf = cf;
    this.isBot = isBot;
    this.url = url;
    this.pSeo = pSeo;
  }

  element(element) {
    const colo = this.cf.colo || 'BOM';
    const city = this.cf.city || 'Pune';
    const country = this.cf.country || 'IN';
    const isNRI = country !== 'IN';

    // 1. Critical LCP Image Preload Hint for Google Lighthouse 100/100
    element.append(
      `<link rel="preload" as="image" href="/images/puneville/hero/banner1.jpg" fetchpriority="high" type="image/jpeg" />`,
      { html: true }
    );

    // 2. Real-time Edge Telemetry & Punawale Geographic Meta
    element.append(
      `<meta name="geo.region" content="IN-MH" />` +
      `<meta name="geo.placename" content="Punawale, PCMC, Pune" />` +
      `<meta name="geo.position" content="18.6325;73.7438" />` +
      `<meta name="ICBM" content="18.6325, 73.7438" />` +
      `<meta name="cf-edge-location" content="${city}, ${country} via Cloudflare ${colo}" />` +
      `<meta name="cf-edge-status" content="Edge-HTMLRewriter-${this.pSeo ? 'pSEO-' + this.pSeo.slug : 'Standard'}" />` +
      `<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />`,
      { html: true }
    );

    // 3. Dynamic Crawler / Search Bot Directives
    if (this.isBot) {
      element.append(
        `<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />` +
        `<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
        { html: true }
      );
    }

    // 4. Injected Structured Schema.org: Programmatic vs Standard Geo-Tailoring
    if (this.pSeo) {
      // Programmatic Breadcrumbs Schema
      if (this.pSeo.breadcrumbs && this.pSeo.breadcrumbs.length > 0) {
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": this.pSeo.breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": b.url
          }))
        };
        element.append(
          `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`,
          { html: true }
        );
      }

      // Programmatic Product/Listing Schema
      const pseoSchema = {
        "@context": "https://schema.org",
        "@type": this.pSeo.schemaType || "Apartment",
        "name": this.pSeo.title,
        "description": this.pSeo.description,
        "url": `https://pharande-puneville.in/${this.pSeo.slug}`,
        "image": this.pSeo.ogImage || "https://pharande-puneville.in/images/puneville/hero/banner1.jpg",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": this.pSeo.price,
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Punawale-Ravet BRTS Road, Opposite Mumbai-Pune Expressway",
          "addressLocality": "Punawale, PCMC",
          "addressRegion": "Maharashtra",
          "postalCode": "411033",
          "addressCountry": "IN"
        }
      };
      element.append(
        `<script type="application/ld+json">${JSON.stringify(pseoSchema)}</script>`,
        { html: true }
      );

      // Programmatic FAQ Schema
      if (this.pSeo.faq && this.pSeo.faq.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": this.pSeo.faq.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        };
        element.append(
          `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`,
          { html: true }
        );
      }
    } else {
      // Standard Edge Geo-Tailored RealEstateAgent Schema
      const dynamicSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": "https://pharande-puneville.in/edge-agent",
        "name": "Pharande Puneville Sales Experience",
        "url": "https://pharande-puneville.in",
        "telephone": "+91-7744009295",
        "priceRange": "₹ 85 Lakhs - ₹ 1.35 Cr",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Punawale-Ravet BRTS Road, Opposite Mumbai-Pune Expressway",
          "addressLocality": "Punawale, PCMC",
          "addressRegion": "Maharashtra",
          "postalCode": "411033",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.6325,
          "longitude": 73.7438
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Punawale" },
          { "@type": "City", "name": "Pimpri-Chinchwad (PCMC)" },
          { "@type": "City", "name": "Pune" },
          { "@type": "City", "name": "Mumbai" },
          ...(isNRI ? [{ "@type": "Country", "name": country }] : [])
        ]
      };

      element.append(
        `<script type="application/ld+json">${JSON.stringify(dynamicSchema)}</script>`,
        { html: true }
      );
    }
  }
}

// 3. Edge Title Handler: Programmatic SEO Titles (Preserves Astro Static Titles)
class EdgeTitleHandler {
  constructor(cf, pSeo, isHomepage) {
    this.cf = cf;
    this.pSeo = pSeo;
    this.isHomepage = isHomepage;
  }

  element(element) {
    // If programmatic SEO route, set its title
    if (this.pSeo && this.pSeo.title) {
      element.setInnerContent(this.pSeo.title);
      return;
    }

    // Only adapt geo-title on the root homepage so inner Astro static pages keep their unique titles
    if (this.isHomepage) {
      const city = (this.cf.city || '').toLowerCase();
      const country = this.cf.country || 'IN';

      if (country !== 'IN') {
        element.setInnerContent(
          'Pharande Puneville | Luxury 28-Acre Aedas Township, Pune | Global NRI Investor Desk'
        );
      } else if (city.includes('mumbai') || city.includes('thane') || city.includes('navi')) {
        element.setInnerContent(
          'Pharande Puneville | 2 Mins from Mumbai-Pune Expressway Exit | Luxury 2 & 3 BHK Homes'
        );
      } else if (city.includes('pune') || city.includes('pimpri') || city.includes('chinchwad')) {
        element.setInnerContent(
          'Pharande Puneville Punawale | 2, 2.5 & 3 BHK Near Hinjawadi IT Park & Expressway'
        );
      }
    }
  }
}

// 4. Edge Body Handler: Injects High-Converting Intent Banner on Programmatic Landing Pages
class EdgeBodyHandler {
  constructor(pSeo) {
    this.pSeo = pSeo;
  }

  element(element) {
    if (!this.pSeo) return;

    const bannerHtml = `
      <div id="pseo-intent-banner" class="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-2.5 px-4 text-center border-b border-amber-400/40 relative z-50 shadow-md">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold font-mono text-[11px] border border-amber-400/40">
            ${this.pSeo.badge}
          </span>
          <span class="text-slate-200 font-medium">${this.pSeo.announcement}</span>
          <a href="/floor-plans" class="inline-flex items-center text-amber-300 hover:text-white font-bold ml-1 transition-colors underline underline-offset-2">
            Explore Configurations & Pricing &rarr;
          </a>
        </div>
      </div>
    `;

    element.prepend(bannerHtml, { html: true });
  }
}

// 5. Edge Image Handler: Google Image SEO & Core Web Vitals Optimization
class EdgeImageHandler {
  element(element) {
    const src = element.getAttribute('src') || '';

    // If this is the LCP Hero Image: Ensure high priority and eager loading
    if (src.includes('banner1') || src.includes('puneville-desktop')) {
      element.setAttribute('fetchpriority', 'high');
      element.setAttribute('loading', 'eager');
      element.setAttribute('decoding', 'async');
      if (!element.getAttribute('alt')) {
        element.setAttribute('alt', 'Pharande Puneville 28-Acre Masterplan by Aedas Architects Punawale Pune');
      }
    } else {
      // For all non-hero images: enforce native lazy loading & asynchronous decoding
      if (!element.getAttribute('loading')) {
        element.setAttribute('loading', 'lazy');
      }
      element.setAttribute('decoding', 'async');
    }

    // Ensure all gallery & floorplan images have keyword-rich alt tags for Google Image Search
    if (src.includes('floorplan') && !element.getAttribute('alt')) {
      element.setAttribute('alt', 'Pharande Puneville Luxury Apartment Floor Plan Blueprint');
    }
    if (src.includes('gallery') && !element.getAttribute('alt')) {
      element.setAttribute('alt', 'Pharande Puneville Actual Construction and Amenities Real Photo');
    }
  }
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const cf = request.cf || {};
  const url = new URL(request.url);

  // Extract Edge Geo-Intelligence
  const city = cf.city || 'Pune';
  const country = cf.country || 'IN';
  const colo = cf.colo || 'BOM';
  const isNRI = country !== 'IN';

  const userAgent = request.headers.get('user-agent') || '';
  
  // 1. Edge Threat Defense: Block aggressive scraper bots from consuming bandwidth
  const isBadBot = /bytespider|petalbot|scrapy|sqlmap|nikto|mj12bot|dotbot|ahrefsbot|semrushbot/i.test(userAgent);
  if (isBadBot) {
    return new Response('Access Denied: Enterprise Bot Protection Policy Enforced at Edge.', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'X-Edge-Protection': 'Cloudflare-Pages-WAF'
      }
    });
  }

  // 2. Detect Route & Programmatic SEO Target
  const pSeo = getProgrammaticSeo(url.pathname) || (url.searchParams.get('pseo') ? getProgrammaticSeo('/' + url.searchParams.get('pseo')) : null);
  const isHomepage = url.pathname === '/' || url.pathname === '';
  const cleanPath = isHomepage ? '' : url.pathname.replace(/\/$/, '');
  const canonicalUrl = pSeo ? `https://pharande-puneville.in/${pSeo.slug}` : `https://pharande-puneville.in${cleanPath}`;

  const isSearchEngine = /googlebot|bingbot|applebot|duckduckbot|slurp|yandex|baiduspider/i.test(userAgent);
  const isSocialBot = /facebookexternalhit|whatsapp|twitterbot|linkedinbot|telegrambot|pinterest/i.test(userAgent);
  const isBot = isSearchEngine || isSocialBot;

  // Fetch response from next handler
  const response = await next();

  // If response is not HTML, return with edge diagnostic headers
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    const headers = new Headers(response.headers);
    headers.set('X-Edge-Engine', 'Cloudflare-V8-Pages');
    headers.set('X-Edge-Colo', colo);
    return new Response(response.body, { status: response.status, headers });
  }

  // Clone headers for HTML response
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Edge-Engine', 'Cloudflare-HTMLRewriter-pSEO');
  newHeaders.set('X-Edge-Colo', colo);
  newHeaders.set('X-Visitor-City', encodeURIComponent(city));
  newHeaders.set('X-Visitor-Country', country);
  newHeaders.set('X-Visitor-NRI', isNRI ? 'true' : 'false');
  newHeaders.set('X-Edge-Bot-Detected', isBot ? 'true' : 'false');
  newHeaders.set('X-Punawale-Ecosystem', 'Golden-Growth-Corridor-PCMC');
  newHeaders.set('Link', `<${canonicalUrl}>; rel="canonical"`);

  if (pSeo) {
    newHeaders.set('X-Programmatic-SEO-Target', pSeo.slug);
  }

  // Transform HTML on-the-fly using Cloudflare C++ Streaming HTMLRewriter
  const rewriter = new HTMLRewriter()
    .on('head', new EdgeHeadHandler(cf, isBot, request.url, pSeo))
    .on('title', new EdgeTitleHandler(cf, pSeo, isHomepage))
    .on('img', new EdgeImageHandler());

  // If Programmatic SEO is active for this route, dynamically rewrite metadata tags
  if (pSeo) {
    rewriter
      .on('meta[name="description"]', new EdgeAttrHandler('content', pSeo.description))
      .on('meta[name="keywords"]', new EdgeAttrHandler('content', pSeo.keywords))
      .on('link[rel="canonical"]', new EdgeAttrHandler('href', canonicalUrl))
      .on('meta[property="og:title"]', new EdgeAttrHandler('content', pSeo.title))
      .on('meta[property="og:description"]', new EdgeAttrHandler('content', pSeo.description))
      .on('meta[property="og:url"]', new EdgeAttrHandler('content', canonicalUrl))
      .on('meta[property="og:image"]', new EdgeAttrHandler('content', pSeo.ogImage))
      .on('meta[name="twitter:title"]', new EdgeAttrHandler('content', pSeo.title))
      .on('meta[name="twitter:description"]', new EdgeAttrHandler('content', pSeo.description))
      .on('meta[name="twitter:image"]', new EdgeAttrHandler('content', pSeo.ogImage))
      .on('body', new EdgeBodyHandler(pSeo));
  }

  return rewriter.transform(
    new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  );
}

