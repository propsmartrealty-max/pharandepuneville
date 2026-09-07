import urllib.request
import urllib.parse
import re
import ssl

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
        print(f"Error: {e}")
        return ""

def search_ddg_images(query):
    # DDG HTML search
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote_plus(query)}"
    html = fetch_url(url)
    links = re.findall(r'href="//duckduckgo.com/l/\?uddg=([^"&]+)', html)
    decoded_links = [urllib.parse.unquote(l) for l in links]
    return decoded_links

res = search_ddg_images("Pharande Puneville master plan site layout")
print("Found links:")
for r in res[:8]:
    print(r)
