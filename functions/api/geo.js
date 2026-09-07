/**
 * Cloudflare Enterprise Edge API: Visitor Geolocation & Multi-Currency Engine
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
  let currencyCode = 'INR';
  let nriDesk = 'Domestic Sales Desk';
  let pricingEstimates = {
    '2 BHK Royale': '₹ 85 Lakhs*',
    '2.5 BHK WFH Pod': '₹ 1.08 Cr*',
    '3 BHK Imperial': '₹ 1.25 Cr*',
  };

  if (isNRI) {
    if (['AE', 'QA', 'SA', 'OM', 'BH', 'KW'].includes(country)) {
      preferredCurrency = 'AED (د.إ)';
      currencyCode = 'AED';
      nriDesk = 'GCC & Middle East NRI Concierge Desk';
      pricingEstimates = {
        '2 BHK Royale': 'AED 372,000* (₹ 85L)',
        '2.5 BHK WFH Pod': 'AED 472,000* (₹ 1.08 Cr)',
        '3 BHK Imperial': 'AED 546,000* (₹ 1.25 Cr)',
      };
    } else if (['US', 'CA'].includes(country)) {
      preferredCurrency = 'USD ($)';
      currencyCode = 'USD';
      nriDesk = 'North America NRI Concierge Desk';
      pricingEstimates = {
        '2 BHK Royale': '$101,500* (₹ 85L)',
        '2.5 BHK WFH Pod': '$129,000* (₹ 1.08 Cr)',
        '3 BHK Imperial': '$149,000* (₹ 1.25 Cr)',
      };
    } else if (['GB', 'DE', 'FR'].includes(country)) {
      preferredCurrency = 'GBP (£) / EUR (€)';
      currencyCode = 'GBP';
      nriDesk = 'UK & Europe NRI Concierge Desk';
      pricingEstimates = {
        '2 BHK Royale': '£79,000* (₹ 85L)',
        '2.5 BHK WFH Pod': '£100,500* (₹ 1.08 Cr)',
        '3 BHK Imperial': '£116,000* (₹ 1.25 Cr)',
      };
    } else if (['SG', 'AU', 'NZ', 'HK'].includes(country)) {
      preferredCurrency = 'SGD / AUD';
      currencyCode = 'SGD';
      nriDesk = 'Asia-Pacific NRI Concierge Desk';
      pricingEstimates = {
        '2 BHK Royale': 'SGD 134,000* (₹ 85L)',
        '2.5 BHK WFH Pod': 'SGD 170,000* (₹ 1.08 Cr)',
        '3 BHK Imperial': 'SGD 197,000* (₹ 1.25 Cr)',
      };
    } else {
      preferredCurrency = 'USD ($)';
      currencyCode = 'USD';
      nriDesk = 'Global NRI Concierge Desk';
      pricingEstimates = {
        '2 BHK Royale': '$101,500* (₹ 85L)',
        '2.5 BHK WFH Pod': '$129,000* (₹ 1.08 Cr)',
        '3 BHK Imperial': '$149,000* (₹ 1.25 Cr)',
      };
    }
  }

  const payload = {
    geo: {
      city,
      region,
      country,
      timezone,
      colo, // Nearest Cloudflare Airport datacenter
      asn: cf.asn || null,
      httpProtocol: request.cf?.httpProtocol || 'HTTP/3',
    },
    localization: {
      isNRI,
      nriDesk,
      preferredCurrency,
      currencyCode,
      pricingEstimates,
      salesHotline: isNRI ? '+919822000000' : '020-67123456',
      whatsappDirect: `https://wa.me/919822000000?text=Inquiry%20from%20Puneville%20${currencyCode}%20Desk`,
    },
    enterprise: {
      engine: 'Cloudflare Enterprise Edge V8',
      tier: 'Tiered-Cache-Global',
      wafActive: true,
      timestamp: Date.now(),
    }
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
      'X-Edge-Colo': colo,
    }
  });
}
