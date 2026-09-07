import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Globe2 } from 'lucide-react';

export default function EdgeGeoStatus() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Probe the Cloudflare Edge API silently
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.geo) {
          setGeoData(data);
        }
      })
      .catch(() => {
        // Silent fallback for local dev
      });
  }, []);

  if (!geoData) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[#0F172A] shadow-sm">
        <Zap className="w-3 h-3 text-[#C59B27] animate-pulse" />
        <span>Cloudflare Global Edge • 300+ Cities (&lt;5ms)</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[#0F172A] shadow-sm">
      <Globe2 className="w-3 h-3 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }} />
      <span>
        Edge PoP: <strong className="text-[#845D12]">{geoData.geo.colo || 'BOM'}</strong> • Visitor: {decodeURIComponent(geoData.geo.city || 'Pune')} ({geoData.geo.country})
      </span>
      {geoData.localization?.isNRI && (
        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-white uppercase ml-1">
          NRI Desk Active
        </span>
      )}
    </div>
  );
}
