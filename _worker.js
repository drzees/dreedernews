const FEEDS = new Map([
[“bbc”, “https://feeds.bbci.co.uk/news/rss.xml”],
[“ap”, “https://feeds.apnews.com/rss/apf-topnews”],
[“guardian”, “https://www.theguardian.com/world/rss”],
[“techcrunch”, “https://techcrunch.com/feed/”],
[“hn”, “https://hnrss.org/frontpage”],
[“nasa”, “https://www.nasa.gov/rss/dyn/breaking_news.rss”]
]);

export default {
async fetch(request, env) {
const url = new URL(request.url);

```
if (url.pathname !== "/news") {
  return env.ASSETS.fetch(request);
}

const source = url.searchParams.get("source") || "";
const feedUrl = FEEDS.get(source);

if (!feedUrl) {
  return new Response("Unknown source", { status: 400 });
}

try {
  const upstream = await fetch(feedUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; dreeder/1.0)" }
  });
  const xml = await upstream.text();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300"
    }
  });
} catch (err) {
  return new Response("Failed: " + err.message, { status: 502 });
}
```

}
};