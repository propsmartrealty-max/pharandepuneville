import urllib.request
import urllib.parse
import re
import os
import ssl
import json

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15, context=ssl_context) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

urls_to_scrape = [
    "https://pharandespaces.com/residential-projects/puneville/",
    "https://pharandeprojects.com/pune/pharande-puneville-punawale/",
    "https://purplerealtors.in/residential/pharande-puneville-punawale-pune/",
]

all_images = []

for u in urls_to_scrape:
    print(f"Scraping: {u}")
    html = fetch_url(u)
    # Find all image tags
    img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
    # Find data-src or data-lazy
    data_srcs = re.findall(r'<img[^>]+data-(?:src|original|lazy)=["\']([^"\']+)["\']', html, re.IGNORECASE)
    # Find background-image
    bg_imgs = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', html, re.IGNORECASE)
    # Find direct image links (anchors linking to high-res images or floor plans)
    a_imgs = re.findall(r'<a[^>]+href=["\']([^"\']+\.(?:jpg|jpeg|png|webp|svg))["\']', html, re.IGNORECASE)

    combined = set(img_tags + data_srcs + bg_imgs + a_imgs)
    print(f"Found {len(combined)} raw image references on {u}")

    for img in combined:
        if img.startswith('//'):
            img = 'https:' + img
        elif img.startswith('/'):
            parsed = urllib.parse.urlparse(u)
            img = f"{parsed.scheme}://{parsed.netloc}{img}"
        elif not img.startswith('http'):
            img = urllib.parse.urljoin(u, img)
        
        # Filter for relevant images
        ext = img.split('?')[0].lower()
        if any(ext.endswith(e) for e in ['.jpg', '.jpeg', '.png', '.webp']):
            all_images.append({'url': img, 'source': u})

print(f"\nTotal image candidates found: {len(all_images)}")
# Print samples
for item in all_images[:25]:
    print(item['url'])

with open('scripts/scraped_candidates.json', 'w') as f:
    json.dump(all_images, f, indent=2)
