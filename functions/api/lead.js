/**
 * Cloudflare Edge API: VIP Lead Ingestion & CRM Dispatcher
 * Route: POST /api/lead
 * Latency: < 5ms (Serverless V8 isolate at nearest Edge PoP)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // Handle CORS preflight / headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const payload = await request.json();
    const { name, phone, email, configuration, preferredSlot, notes, honeypot } = payload;

    // 1. Anti-Bot Honeypot Defense
    if (honeypot && honeypot.trim().length > 0) {
      // Silently drop bot submissions while returning 200 OK
      return new Response(JSON.stringify({ 
        success: true, 
        leadRef: 'SPAM_FILTERED_' + Date.now().toString(36).toUpperCase(),
        message: 'Inquiry received' 
      }), { status: 200, headers: corsHeaders });
    }

    // 2. Strict Input Validation
    if (!name || name.trim().length < 2) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please provide a valid full name.' 
      }), { status: 400, headers: corsHeaders });
    }

    const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please provide a valid 10-digit mobile number for VIP verification.' 
      }), { status: 400, headers: corsHeaders });
    }

    // 3. Extract Edge Telemetry & Geo-Intelligence
    const cf = request.cf || {};
    const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const country = cf.country || 'IN';
    const city = cf.city || 'Pune';
    const colo = cf.colo || 'BOM';
    const isNRI = country !== 'IN';

    const leadRef = `PV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const enrichedLead = {
      leadRef,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      configuration: configuration || '2 / 2.5 / 3 BHK',
      preferredSlot: preferredSlot || 'Immediate Visit',
      notes: notes || '',
      source: 'Pharande Puneville Edge Portal',
      edgeLocation: {
        city,
        country,
        isNRI,
        colo,
        ip: clientIp,
      }
    };

    // 4. Optional Upstream CRM Webhook Forwarding
    // If LEAD_WEBHOOK_URL is set in Cloudflare Dashboard, forward asynchronously
    if (env && env.LEAD_WEBHOOK_URL) {
      context.waitUntil(
        fetch(env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enrichedLead),
        }).catch((err) => {
          console.error('Edge CRM Webhook Forwarding failed:', err);
        })
      );
    }

    return new Response(JSON.stringify({
      success: true,
      leadRef,
      message: 'VIP Tour invitation dispatched successfully. Our Relationship Manager will connect within 15 minutes.',
      edgeProcessedAt: colo,
      isNRI
    }), { status: 200, headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Malformed inquiry payload. Please check inputs.'
    }), { status: 400, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
