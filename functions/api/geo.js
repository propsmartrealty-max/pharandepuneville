/**
 * Cloudflare Edge API: Visitor Geolocation & NRI Localization Probe
 * Route: GET /api/geo
 */

export async function onRequestGet(context) {
  const { request } = context;
  const cf = request.cf || {};

  const country = cf.country || 'IN';
  const city = cf.city || 'Pune';
  const region = cf.region || 'Maharashtra';
  const colo = cf.colo || 'BOM';
  const timezone = cf.timezone || 'Asia/Kolkata';
  const isNRI = country !== 'IN';

  // Currency & VIP Concierge Routing rules
  let preferredCurrency = 'INR (₹)';
  let nriDesk = 'Domestic Sales Desk';

  if (isNRI) {
    if (['AE', 'QA', 'SA', 'OM', 'BH', 'KW'].includes(country)) {
      preferredCurrency = 'AED / INR';
      nriDesk = 'GCC & Middle East NRI Concierge Desk';
    } else if (['US', 'CA'].includes(country)) {
      preferredCurrency = 'USD ($)';
      nriDesk = 'North America NRI Concierge Desk';
    } else if (['GB', 'DE', 'FR'].includes(country)) {
      preferredCurrency = 'GBP (£) / EUR (€)';
      nriDesk = 'UK & Europe NRI Concierge Desk';
    } else if (['SG', 'AU', 'NZ', 'HK'].includes(country)) {
      preferredCurrency = 'SGD / AUD';
      nriDesk = 'Asia-Pacific NRI Concierge Desk';
    } else {
      preferredCurrency = 'USD ($)';
      nriDesk = 'Global NRI Concierge Desk';
    }
  }

  const payload = {
    geo: {
      city,
      region,
      country,
      timezone,
      colo, // Nearest Cloudflare Airport datacenter
    },
    localization: {
      isNRI,
      nriDesk,
      preferredCurrency,
      salesHotline: isNRI ? '+919822000000' : '020-67123456',
      whatsappDirect: 'https://wa.me/919822000000?text=Inquiry%20from%20Puneville%20Edge%20Portal',
    },
    edgePerformance: {
      engine: 'Cloudflare Workers V8',
      cacheStatus: 'HIT-EDGE',
      timestamp: Date.now(),
    }
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
