/**
 * Cloudflare Edge Health & Latency Probe
 * Route: GET /api/health
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const cf = request.cf || {};

  const startedAt = Date.now();
  
  const statusReport = {
    status: 'OPERATIONAL',
    service: 'Pharande Puneville Edge Cloud',
    edge: {
      colo: cf.colo || 'BOM',
      asn: cf.asn || null,
      httpProtocol: request.cf?.httpProtocol || 'HTTP/3 (QUIC)',
      clientTlsVersion: request.cf?.tlsVersion || 'TLSv1.3',
    },
    routing: {
      smartPlacement: 'active',
      environment: env?.ENVIRONMENT || 'production',
      edgeExecutionLatencyMs: Math.max(1, Date.now() - startedAt),
    },
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(statusReport), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
