#!/usr/bin/env python3
"""
Ping Google, Bing, and IndexNow to force instant crawl and re-indexing
of all Pharande Puneville URLs.
"""

import urllib.request
import urllib.parse
import json
import re
import ssl
from pathlib import Path

# Fix macOS Python SSL certificate verification
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

BASE_DIR = Path(__file__).resolve().parent.parent
SITEMAP_FILE = BASE_DIR / "public" / "sitemap.xml"
INDEXNOW_KEY = "a1b2c3d4e5f6789012345678abcdef01"
HOST = "pharande-puneville.in"

def extract_urls():
    content = SITEMAP_FILE.read_text(encoding="utf-8")
    urls = re.findall(r"<loc>(https://pharande-puneville\.in[^<]*)</loc>", content)
    # Deduplicate while preserving order
    seen = set()
    deduped = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            deduped.append(u)
    return deduped

def ping_url(url, label):
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "PharandePuneville-Indexer/1.0 (+https://pharande-puneville.in)"}
        )
        with urllib.request.urlopen(req, timeout=10, context=ssl_context) as response:
            print(f"[{label}] Status {response.status}: {url}")
            return True
    except Exception as e:
        print(f"[{label}] Error: {e}")
        return False

def ping_indexnow(urls):
    endpoint = "https://api.indexnow.org/indexnow"
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{HOST}/{INDEXNOW_KEY}.txt",
        "urlList": urls
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=data,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "PharandePuneville-IndexNow/1.0"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=15, context=ssl_context) as response:
            print(f"[IndexNow] Successfully submitted {len(urls)} URLs. Status: {response.status}")
            return True
    except Exception as e:
        print(f"[IndexNow] Error submitting to IndexNow: {e}")
        return False

def main():
    urls = extract_urls()
    print(f"Found {len(urls)} URLs in sitemap.xml")

    # 1. Google Sitemap & RSS Ping
    print("\n--- Pinging Google ---")
    sitemap_url = f"https://{HOST}/sitemap.xml"
    feed_url = f"https://{HOST}/feed.xml"
    ping_url(f"https://www.google.com/ping?sitemap={urllib.parse.quote(sitemap_url)}", "Google Sitemap Ping")
    ping_url(f"https://www.google.com/ping?sitemap={urllib.parse.quote(feed_url)}", "Google RSS Ping")

    # 2. Bing Sitemap Ping
    print("\n--- Pinging Bing ---")
    ping_url(f"https://www.bing.com/ping?sitemap={urllib.parse.quote(sitemap_url)}", "Bing Sitemap Ping")

    # 3. IndexNow API
    print("\n--- Submitting to IndexNow API (Bing, Yandex, Seznam, Naver) ---")
    ping_indexnow(urls)

if __name__ == "__main__":
    main()
