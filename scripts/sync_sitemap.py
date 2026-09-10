#!/usr/bin/env python3
"""
Synchronize public/sitemap.xml with 100% of all static pages in dist/,
including localized image tags, Google hreflang, and priority weights.
"""

import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SITEMAP_PATH = BASE_DIR / "public" / "sitemap.xml"
DIST_DIR = BASE_DIR / "dist"

def get_all_routes():
    routes = []
    for p in DIST_DIR.rglob("index.html"):
        rel = p.parent.relative_to(DIST_DIR)
        path_str = "" if str(rel) == "." else str(rel)
        if path_str == "404" or path_str == "site-tour":
            continue
        routes.append(path_str)
    return sorted(routes)

def get_priority(route):
    if route == "":
        return "1.0", "daily"
    if any(k in route for k in ["puneville-punawale", "2-bhk", "3-bhk", "price", "cluster-d"]):
        return "0.95", "weekly"
    if any(k in route for k in ["2.5-bhk", "4-bhk", "floor-plan", "maharera", "skywalk", "aedas"]):
        return "0.90", "weekly"
    if any(k in route for k in ["vs-", "nri", "amenities", "location", "brochure"]):
        return "0.90", "weekly"
    return "0.85", "weekly"

def build_sitemap(routes):
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    
    xml_entries = []
    
    # 1. Root /
    xml_entries.append(f"""  <!-- Primary Canonical Landing Page -->
  <url>
    <loc>https://pharande-puneville.in/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="https://pharande-puneville.in/" />
    <xhtml:link rel="alternate" hreflang="en-AE" href="https://pharande-puneville.in/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://pharande-puneville.in/" />
    <xhtml:link rel="alternate" hreflang="en-GB" href="https://pharande-puneville.in/" />
    <xhtml:link rel="alternate" hreflang="en-SG" href="https://pharande-puneville.in/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://pharande-puneville.in/" />
    <image:image>
      <image:loc>https://pharande-puneville.in/images/puneville/hero/banner1.jpg</image:loc>
      <image:title>Pharande Puneville 28-Acre Aedas Masterplanned Township</image:title>
      <image:caption>Aerial panorama of Pharande Puneville luxury residential township in Punawale, PCMC Pune</image:caption>
      <image:geo_location>Punawale, PCMC, Pune, Maharashtra, India</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://pharande-puneville.in/images/puneville/hero/banner2.jpg</image:loc>
      <image:title>Pharande Puneville Evening Skyline and Facade</image:title>
      <image:caption>Illuminated high-rise residential towers designed by Aedas at Punawale Pune</image:caption>
      <image:geo_location>Punawale, PCMC, Pune, Maharashtra, India</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://pharande-puneville.in/images/puneville/gallery/gallery-skywalk-promenade.jpg</image:loc>
      <image:title>Pharande Puneville 22-Foot Elevated Skywalk Promenade</image:title>
      <image:caption>Signature elevated skywalk connecting clusters with pedestrian safety</image:caption>
      <image:geo_location>Punawale, PCMC, Pune, Maharashtra, India</image:geo_location>
    </image:image>
  </url>""")

    for r in routes:
        if r == "":
            continue
        url = f"https://pharande-puneville.in/{r}"
        priority, freq = get_priority(r)
        
        entry = f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="{url}" />
    <xhtml:link rel="alternate" hreflang="en-AE" href="{url}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="{url}" />
    <xhtml:link rel="alternate" hreflang="en-GB" href="{url}" />
    <xhtml:link rel="alternate" hreflang="en-SG" href="{url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{url}" />
  </url>"""
        xml_entries.append(entry)

    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

{"\n\n".join(xml_entries)}

</urlset>
"""
    return sitemap_xml

def main():
    routes = get_all_routes()
    print(f"Found {len(routes)} canonical routes in dist/")
    sitemap = build_sitemap(routes)
    SITEMAP_PATH.write_text(sitemap, encoding="utf-8")
    print(f"Successfully synchronized {len(routes)} URLs to {SITEMAP_PATH}")

if __name__ == "__main__":
    main()
