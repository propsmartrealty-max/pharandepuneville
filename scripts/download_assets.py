import urllib.request
import os
import ssl
import time

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://pharandespaces.com/'
}

ASSETS = {
    "hero": [
        ("banner1.jpg", "https://www.pharandepuneville.in/assets/img/banner1.jpg", "Aedas Masterplan Architectural Elevation"),
        ("banner2.jpg", "https://www.pharandepuneville.in/assets/img/banner2.jpg", "Futuristic High-Rise Towers & Skywalk"),
        ("puneville-desktop.png", "https://pharandespaces.com/wp-content/uploads/2020/02/puneville-desktop-1.png", "28-Acre Integrated Township Aerial View")
    ],
    "masterplan": [
        ("masterplan-layout.jpg", "https://www.pharandepuneville.in/assets/img/floorplan/masterplan.jpg", "Official 28-Acre Master Layout Plan"),
        ("location-map.jpg", "https://www.pharandepuneville.in/assets/img/locationmap.jpg", "Strategic Punawale Location & Connectivity Map")
    ],
    "floorplans": [
        ("floorplan-2bhk-wing-q.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/Q_2bhk_page-0001-1.jpg", "2 BHK Floor Plan - Wing Q"),
        ("floorplan-2.5bhk-wing-s.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/S_25bhk_page-0001-2.jpg", "2.5 BHK Floor Plan with Study - Wing S"),
        ("floorplan-3bhk-master.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/M_3bhk-1.jpg", "3 BHK Imperial Master Floor Plan"),
        ("floorplan-2bhk-classic.jpg", "https://www.pharandepuneville.in/assets/img/floorplan/2bhk.jpg", "2 BHK Royale Layout Architecture"),
        ("floorplan-2.5bhk-luxury.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/L_2.5A.jpg", "2.5 BHK Luxury Suite")
    ],
    "amenities": [
        ("skywalk.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Skywalk.png", "22-Ft Elevated Pedestrian Skywalk"),
        ("olympic-pool.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Swimming-Pool-3.png", "Olympic-Sized Swimming Pool"),
        ("clubhouse.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Clubhouse-2.png", "International Grand Clubhouse"),
        ("gymnasium.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Gymnasium-3.png", "World-Class Fitness Gymnasium"),
        ("tennis-court.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Tennis-Court.png", "Championship Tennis Courts"),
        ("children-play.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Childrens-Play-Area-3-1.png", "Children's Adventure Play Arena"),
        ("cafe.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Cafe.png", "Resident Coffee Lounge & Bistro"),
        ("business-centre.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Business-centre.png", "Co-Working Business Suites"),
        ("community-hall.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Community-Hall.png", "Celebration Banquet Hall"),
        ("jogging-track.png", "https://pharandespaces.com/wp-content/uploads/2020/02/Jogging-Strolling-Track-1.png", "Sky Jogging & Strolling Track")
    ],
    "gallery": [
        ("gallery-tower-night.jpg", "https://www.pharandepuneville.in/assets/img/gallery/gallery1.jpg", "Illuminated High-Rise Towers & Skywalk"),
        ("gallery-pool-evening.jpg", "https://www.pharandepuneville.in/assets/img/gallery/gallery2.jpg", "Olympic Pool at Twilight"),
        ("gallery-podium-landscape.jpg", "https://www.pharandepuneville.in/assets/img/gallery/gallery3.jpg", "Lush Landscaped Green Podiums"),
        ("gallery-interiors.jpg", "https://www.pharandepuneville.in/assets/img/gallery/gallery4.jpg", "Ultra-Luxury Living Room Finishes"),
        ("gallery-aerial-towers.jpg", "https://www.pharandepuneville.in/assets/img/virtualtour.jpg", "Township Master Architecture Perspective"),
        ("gallery-skywalk-promenade.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/Gallery-6-10.jpg", "Pedestrian Skywalk Promenade View"),
        ("gallery-club-lounge.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/Gallery-5-11.jpg", "Club Royale Luxury Reception"),
        ("gallery-grand-facade.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/Gallery-7-8.jpg", "Architectural Facade by Aedas"),
        ("gallery-evening-glow.jpg", "https://pharandespaces.com/wp-content/uploads/2020/02/Gallery-3-14.jpg", "Puneville Evening Skyline View")
    ]
}

base_dir = "public/images/puneville"
os.makedirs(base_dir, exist_ok=True)

manifest = {}

for category, items in ASSETS.items():
    cat_dir = os.path.join(base_dir, category)
    os.makedirs(cat_dir, exist_ok=True)
    manifest[category] = []

    for filename, url, title in items:
        filepath = os.path.join(cat_dir, filename)
        local_web_path = f"/images/puneville/{category}/{filename}"
        print(f"Downloading [{category}] {filename} from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=20, context=ssl_context) as resp:
                data = resp.read()
                with open(filepath, 'wb') as f:
                    f.write(data)
            print(f"✓ Saved {filename} ({len(data)} bytes)")
            manifest[category].append({
                "id": filename.split('.')[0],
                "title": title,
                "src": local_web_path,
                "category": category
            })
        except Exception as e:
            print(f"✗ Error downloading {url}: {e}")
        time.sleep(0.2)

# Write scrapedMedia.js
js_content = f"""// Auto-generated media manifest scraped from official Pharande Spaces sources
export const SCRAPED_MEDIA = {manifest};
"""

with open("src/data/scrapedMedia.js", "w") as f:
    f.write(f"// Auto-generated media manifest scraped from official Pharande Spaces Puneville data\nexport const SCRAPED_MEDIA = ")
    import json
    f.write(json.dumps(manifest, indent=2))
    f.write(";\n")

print("\nMedia download complete! Manifest written to src/data/scrapedMedia.js")
