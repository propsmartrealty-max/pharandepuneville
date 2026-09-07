/**
 * Cloudflare Pages Advanced Edge Middleware with Streaming HTMLRewriter
 * Powered by Cloudflare's C++ streaming HTML engine for zero-latency Google SEO.
 */

// 1. Edge Head Handler: Injects Preloads, Social OpenGraph, and Dynamic Google Microdata
class EdgeHeadHandler {
  constructor(cf, isBot, url) {
    this.cf = cf;
    this.isBot = isBot;
    this.url = url;
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
      `<meta name="cf-edge-status" content="Edge-HTMLRewriter-Hardened" />` +
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

    // 4. Edge-Injected Real-Time Schema.org Punawale Ecosystem Geo-Tailoring
    const dynamicSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": "https://pharandepuneville.com/#edge-agent",
      "name": "Pharande Puneville Sales Experience",
      "url": "https://pharandepuneville.com",
      "telephone": "+91-7744009295",
      "email": "propsmartrealty@gmail.com",
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

// 2. Edge Title Handler: Geo-optimized titles for Google Search & SERP Click-Through
class EdgeTitleHandler {
  constructor(cf) {
    this.cf = cf;
  }

  element(element) {
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

// 3. Edge Image Handler: Google Image SEO & Core Web Vitals Optimization
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

  // Extract Edge Geo-Intelligence
  const city = cf.city || 'Pune';
  const region = cf.region || 'Maharashtra';
  const country = cf.country || 'IN';
  const colo = cf.colo || 'BOM';
  const timezone = cf.timezone || 'Asia/Kolkata';
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
  newHeaders.set('X-Edge-Engine', 'Cloudflare-HTMLRewriter-Streaming');
  newHeaders.set('X-Edge-Colo', colo);
  newHeaders.set('X-Visitor-City', encodeURIComponent(city));
  newHeaders.set('X-Visitor-Country', country);
  newHeaders.set('X-Visitor-NRI', isNRI ? 'true' : 'false');
  newHeaders.set('X-Edge-Bot-Detected', isBot ? 'true' : 'false');
  newHeaders.set('X-Punawale-Ecosystem', 'Golden-Growth-Corridor-PCMC');
  newHeaders.set('Link', '<https://pharandepuneville.com/>; rel="canonical"');

  // Transform HTML on-the-fly using Cloudflare C++ Streaming HTMLRewriter
  const rewriter = new HTMLRewriter()
    .on('head', new EdgeHeadHandler(cf, isBot, request.url))
    .on('title', new EdgeTitleHandler(cf))
    .on('img', new EdgeImageHandler());

  return rewriter.transform(
    new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  );
}
