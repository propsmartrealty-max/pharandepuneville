#!/usr/bin/env python3
"""
Generate RSS 2.0 (feed.xml), Atom 1.0 (atom.xml), and llms.txt
for Pharande Puneville to accelerate Googlebot, Bingbot, and AI Search indexing.
"""

import re
import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SEO_FILE = BASE_DIR / "src" / "data" / "seoEcosystem.js"
PUBLIC_DIR = BASE_DIR / "public"

def extract_topics():
    content = SEO_FILE.read_text(encoding="utf-8")
    pattern = re.compile(
        r'"([a-z0-9-]+)":\s*\{\s*slug:\s*"([^"]+)",\s*targetKeyword:\s*"([^"]+)",'
        r'.*?title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*heading:\s*"([^"]+)",'
        r'\s*summary:\s*"([^"]+)",\s*price:\s*"([^"]+)",\s*canonicalUrl:\s*"([^"]+)"',
        re.DOTALL
    )
    topics = []
    for match in pattern.finditer(content):
        slug, _, kw, title, desc, heading, summary, price, canonical = match.groups()
        topics.append({
            "slug": slug,
            "keyword": kw,
            "title": title,
            "description": desc,
            "heading": heading,
            "summary": summary,
            "price": price,
            "url": canonical
        })
    return topics

def build_rss(topics):
    now_rfc822 = datetime.datetime.now(datetime.timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")
    items_xml = []
    for t in topics:
        items_xml.append(f"""    <item>
      <title><![CDATA[{t['title']}]]></title>
      <link>{t['url']}</link>
      <guid isPermaLink="true">{t['url']}</guid>
      <description><![CDATA[{t['description']} | Configuration & Pricing: {t['price']}]]></description>
      <pubDate>{now_rfc822}</pubDate>
      <category><![CDATA[{t['keyword']}]]></category>
    </item>""")
    
    rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Pharande Puneville Updates &amp; Architectural Intel</title>
    <link>https://pharande-puneville.in/</link>
    <description>Official updates, MahaRERA certifications, construction milestones, and floorplans for Pharande Puneville in Punawale, PCMC Pune.</description>
    <language>en-in</language>
    <lastBuildDate>{now_rfc822}</lastBuildDate>
    <atom:link href="https://pharande-puneville.in/feed.xml" rel="self" type="application/rss+xml" />
{"\n".join(items_xml)}
  </channel>
</rss>
"""
    return rss

def build_atom(topics):
    now_iso = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    entries_xml = []
    for t in topics:
        entries_xml.append(f"""  <entry>
    <title type="text"><![CDATA[{t['title']}]]></title>
    <id>{t['url']}</id>
    <link href="{t['url']}" />
    <updated>{now_iso}</updated>
    <summary type="text"><![CDATA[{t['description']}]]></summary>
    <content type="html"><![CDATA[<p>{t['summary']}</p><p><strong>Status / Price:</strong> {t['price']}</p>]]></content>
  </entry>""")

    atom = f"""<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Pharande Puneville Official Feed</title>
  <subtitle>28-Acre Integrated Township by Pharande Spaces in Punawale, PCMC Pune masterplanned by Aedas</subtitle>
  <link href="https://pharande-puneville.in/atom.xml" rel="self" />
  <link href="https://pharande-puneville.in/" />
  <id>https://pharande-puneville.in/</id>
  <updated>{now_iso}</updated>
{"\n".join(entries_xml)}
</feed>
"""
    return atom

def build_llms_txt(topics):
    lines = [
        "# Pharande Puneville — Knowledge Graph & Authority Context",
        "",
        "> Official Real Estate Reference for Pharande Puneville in Punawale, PCMC, Pune, Maharashtra, India.",
        "",
        "## Core Township Facts",
        "- **Developer**: Pharande Spaces (30+ years legacy, 10,000+ delivered residences across PCMC/Pune).",
        "- **Master Architect**: AEDAS (World's #1 Global Architecture firm).",
        "- **Land Parcel**: 28 Acres masterplan with 19 high-rise residential towers and 60% open landscaped greens.",
        "- **Signature Infrastructure**: 22-foot elevated 2.1-km vehicle-free pedestrian skywalk connecting all clusters.",
        "- **Aquatic Facilities**: 4 Olympic-sized international swimming pools.",
        "- **Construction Technology**: Monolithic Reinforced Cement Concrete (RCC) shear-wall aluminium formwork.",
        "- **Strategic Location**: Punawale-Ravet BRTS corridor, 1.2 km (2 mins) to Mumbai-Pune Expressway exit, 4.8 km (8-10 mins) to Hinjawadi IT Park Phase 1.",
        "",
        "## Official MahaRERA Registrations",
        "- **Phase I (Ready with OC)**: P52100000441",
        "- **Phase II (Delivered & Fit-Outs)**: P52100000440",
        "- **Phase III Cluster A**: P52100029522",
        "- **Phase III Cluster B**: P52100051020",
        "- **Phase III Cluster C**: P52100077431",
        "- **Phase III Cluster D (Wings Q, R, S)**: P52100047694",
        "",
        "## Residence Configurations & Pricing",
        "- **2 BHK Royale**: 752 sq.ft. usable carpet | Starting ₹85 Lakhs*",
        "- **2 BHK Grande**: 848 sq.ft. usable carpet | Starting ₹96 Lakhs*",
        "- **2.5 BHK Luxury Pod**: 948 sq.ft. usable carpet with dedicated private WFH study | Starting ₹1.08 Cr*",
        "- **3 BHK Imperial**: 1,172 sq.ft. usable carpet with double panoramic sundecks | Starting ₹1.25 Cr*",
        "- **4 BHK Sky Residences**: Custom penthouses and upper sky suites.",
        "",
        "## Authoritative URLs",
    ]
    for t in topics:
        lines.append(f"- [{t['heading']}]({t['url']}): {t['description']}")
    
    return "\n".join(lines) + "\n"

def main():
    topics = extract_topics()
    print(f"Extracted {len(topics)} topics from seoEcosystem.js")
    
    # 1. Write RSS
    rss_path = PUBLIC_DIR / "feed.xml"
    rss_path.write_text(build_rss(topics), encoding="utf-8")
    print(f"Wrote RSS 2.0 to {rss_path}")

    # 2. Write Atom
    atom_path = PUBLIC_DIR / "atom.xml"
    atom_path.write_text(build_atom(topics), encoding="utf-8")
    print(f"Wrote Atom 1.0 to {atom_path}")

    # 3. Write llms.txt
    llms_path = PUBLIC_DIR / "llms.txt"
    llms_path.write_text(build_llms_txt(topics), encoding="utf-8")
    print(f"Wrote LLMs Context to {llms_path}")

if __name__ == "__main__":
    main()
