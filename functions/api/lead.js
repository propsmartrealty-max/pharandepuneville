/**
 * Cloudflare Enterprise Edge API: VIP Lead Ingestion, WAF & Bot Defense
 * Route: POST /api/lead
 * Latency: < 5ms (Serverless V8 isolate at nearest Edge PoP)
 */

// In-Memory Edge Rate Limiting Map (Per-Isolate Sliding Window)
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map();

function checkRateLimit(clientIp) {
  const now = Date.now();
  const history = ipRequestHistory.get(clientIp) || [];
  const validHistory = history.filter(time => now - time < RATE_LIMIT_WINDOW_MS);
  
  if (validHistory.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }
  
  validHistory.push(now);
  ipRequestHistory.set(clientIp, validHistory);
  return true;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Turnstile-Token',
    'Content-Type': 'application/json',
    'X-Edge-Engine': 'Cloudflare-Enterprise-WAF',
  };

  try {
    const cf = request.cf || {};
    const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';

    // 1. Cloudflare Enterprise Edge WAF & Threat Score Inspection
    const threatScore = cf.threatScore || 0;
    const botManagement = cf.botManagement || {};
    
    // Block high-risk threat traffic or confirmed malicious automated scrapers
    if (threatScore > 30 || (botManagement.verifiedBot === false && botManagement.score && botManagement.score < 10)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Security challenge triggered. Access blocked by Cloudflare Enterprise WAF.',
        threatScore
      }), { status: 403, headers: corsHeaders });
    }

    // 2. Edge Rate Limiting Check
    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Too many requests from this IP. Please wait 1 minute before submitting another inquiry.' 
      }), { status: 429, headers: corsHeaders });
    }

    const payload = await request.json();
    const { name, phone, email, configuration, preferredSlot, notes, honeypot, turnstileToken } = payload;

    // 3. Anti-Bot Honeypot Defense (Traps naive scrapers)
    if (honeypot && honeypot.trim().length > 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        leadRef: 'SPAM_FILTERED_' + Date.now().toString(36).toUpperCase(),
        message: 'Inquiry received' 
      }), { status: 200, headers: corsHeaders });
    }

    // 4. Optional Cloudflare Turnstile Server-Side Cryptographic Verification
    if (turnstileToken && env && env.TURNSTILE_SECRET_KEY) {
      const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const turnstileRes = await fetch(turnstileVerifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: clientIp,
        }),
      });
      const turnstileOutcome = await turnstileRes.json();
      if (!turnstileOutcome.success) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Cloudflare Turnstile bot verification failed.' 
        }), { status: 400, headers: corsHeaders });
      }
    }

    // 5. Strict Input Validation & Normalization
    if (!name || name.trim().length < 2) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please provide your full name.' 
      }), { status: 400, headers: corsHeaders });
    }

    const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please provide a valid 10-digit mobile number for VIP verification.' 
      }), { status: 400, headers: corsHeaders });
    }

    // 6. Extract Enterprise Telemetry & Geo-Intelligence
    const country = cf.country || 'IN';
    const city = cf.city || 'Pune';
    const colo = cf.colo || 'BOM';
    const asn = cf.asn || null;
    const isNRI = country !== 'IN';

    const leadRef = `PV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const enrichedLead = {
      leadRef,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      configuration: configuration || '2 / 2.5 / 3 BHK',
      preferredSlot: preferredSlot || 'Immediate Site Visit',
      notes: notes || '',
      source: 'Pharande Puneville Enterprise Edge Portal',
      enterpriseTelemetry: {
        edgeColo: colo,
        visitorCity: city,
        visitorCountry: country,
        isNRI,
        clientIp,
        asn,
        threatScore,
        httpProtocol: request.cf?.httpProtocol || 'HTTP/3',
      }
    };

    // 7. Automated Email Dispatch to propsmartrealty@gmail.com via Cloudflare Edge
    const targetEmail = env?.LEAD_NOTIFICATION_EMAIL || 'propsmartrealty@gmail.com';
    const emailSubject = `🚨 New Puneville Lead: ${enrichedLead.name} (${enrichedLead.configuration}) - ${enrichedLead.phone}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2D9CC; border-radius: 12px; background: #FAF7F2; color: #0F172A;">
        <div style="text-align: center; border-bottom: 2px solid #C59B27; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #7A560D; margin: 0;">🏛️ Pharande Puneville VIP Lead</h2>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748B;">Propsmart Realty Lead Dispatch Engine</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Lead Tracking Ref:</td>
            <td style="padding: 10px; font-weight: bold; color: #845D12; font-family: monospace;">${enrichedLead.leadRef}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Customer Name:</td>
            <td style="padding: 10px; font-weight: bold; font-size: 16px;">${enrichedLead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Mobile Number:</td>
            <td style="padding: 10px; font-weight: bold;">
              <a href="tel:${enrichedLead.phone}" style="color: #0F172A; text-decoration: none;">${enrichedLead.phone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${enrichedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enrichedLead.name)},%20thank%20you%20for%20enquiring%20about%20Pharande%20Puneville" style="color: #25D366; font-weight: bold; text-decoration: none;">💬 WhatsApp</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 10px;">${enrichedLead.email || 'Not Provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Configuration:</td>
            <td style="padding: 10px; color: #0F172A; font-weight: bold;">${enrichedLead.configuration}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Slot / Action:</td>
            <td style="padding: 10px;">${enrichedLead.preferredSlot}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CC;">
            <td style="padding: 10px; font-weight: bold; color: #475569;">Cab Request / Notes:</td>
            <td style="padding: 10px;">${enrichedLead.notes || 'None'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #475569;">Location (Cloudflare Edge):</td>
            <td style="padding: 10px; font-size: 12px; color: #64748B;">
              ${enrichedLead.enterpriseTelemetry.visitorCity}, ${enrichedLead.enterpriseTelemetry.visitorCountry} 
              (Edge PoP: ${enrichedLead.enterpriseTelemetry.edgeColo}, IP: ${enrichedLead.enterpriseTelemetry.clientIp})
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #E2D9CC; font-size: 11px; text-align: center; color: #94A3B8;">
          Sent automatically via Cloudflare Edge Lead Engine for Propsmart Realty (${targetEmail})
        </div>
      </div>
    `;

    // Dispatch email to propsmartrealty@gmail.com asynchronously
    context.waitUntil(
      fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: targetEmail, name: 'Propsmart Realty Leads' }],
            },
          ],
          from: {
            email: 'leads@pharandepuneville.com',
            name: 'Pharande Puneville Edge Portal',
          },
          subject: emailSubject,
          content: [
            {
              type: 'text/html',
              value: emailHtml,
            },
          ],
        }),
      }).catch((err) => {
        console.error('MailChannels dispatch error:', err);
      })
    );

    // 8. Optional Upstream CRM Webhook Dispatch
    if (env && env.LEAD_WEBHOOK_URL) {
      context.waitUntil(
        fetch(env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enrichedLead),
        }).catch((err) => {
          console.error('CRM Webhook Forwarding failed:', err);
        })
      );
    }

    return new Response(JSON.stringify({
      success: true,
      leadRef,
      message: 'VIP Tour invitation confirmed. Priority Relationship Director assigned.',
      dispatchedTo: targetEmail,
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
      'Access-Control-Allow-Headers': 'Content-Type, X-Turnstile-Token',
      'Access-Control-Max-Age': '86400',
    },
  });
}
