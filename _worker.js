const FEEDS = {
bbc:        ‘https://feeds.bbci.co.uk/news/rss.xml’,
ap:         ‘https://feeds.apnews.com/rss/apf-topnews’,
guardian:   ‘https://www.theguardian.com/world/rss’,
techcrunch: ‘https://techcrunch.com/feed/’,
hn:         ‘https://hnrss.org/frontpage’,
nasa:       ‘https://www.nasa.gov/rss/dyn/breaking_news.rss’,
};

export default {
async fetch(request, env) {
const url = new URL(request.url);

```
// Only handle /news?source=xxx requests
if (url.pathname !== '/news') {
  return env.ASSETS.fetch(request);
}

const source = url.searchParams.get('source');
const feedUrl = FEEDS[source];
if (!feedUrl) {
  return new Response('Unknown source', { status: 400 });
}

try {
  const res = await fetch(feedUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; dreeder/1.0)' }
  });
  const xml = await res.text();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    }
  });
} catch (e) {
  return new Response('Failed to fetch feed', { status: 502 });
}
```

}
};