/**
 * Cloudflare Pages Global Edge Middleware
 * Runs on Cloudflare's global edge network in 300+ cities at sub-1ms latency.
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const cf = request.cf || {};

  // Extract Edge Geo-Intelligence provided by Cloudflare
  const city = cf.city || 'Pune';
  const region = cf.region || 'Maharashtra';
  const country = cf.country || 'IN';
  const colo = cf.colo || 'BOM'; // Nearest Cloudflare Airport datacenter (e.g. BOM for Mumbai/Pune)
  const timezone = cf.timezone || 'Asia/Kolkata';
  const isNRI = country !== 'IN';

  // Process request through next middleware/asset handler
  const response = await next();

  // Clone headers to inject Edge metadata
  const newHeaders = new Headers(response.headers);
  
  // Edge Geo-Diagnostics
  newHeaders.set('X-Edge-Engine', 'Cloudflare-V8-Pages');
  newHeaders.set('X-Edge-Colo', colo);
  newHeaders.set('X-Visitor-City', encodeURIComponent(city));
  newHeaders.set('X-Visitor-Country', country);
  newHeaders.set('X-Visitor-NRI', isNRI ? 'true' : 'false');
  newHeaders.set('X-Edge-Timezone', timezone);

  // Security hardening at the edge
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'SAMEORIGIN');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
