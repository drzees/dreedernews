export async function onRequestGet(context) {
const url = new URL(context.request.url);
const source = url.searchParams.get(“source”) || “bbc”;
const feeds = {
bbc: “https://feeds.bbci.co.uk/news/rss.xml”,
ap: “https://feeds.apnews.com/rss/apf-topnews”,
guardian: “https://www.theguardian.com/world/rss”,
techcrunch: “https://techcrunch.com/feed/”,
hn: “https://hnrss.org/frontpage”,
nasa: “https://www.nasa.gov/rss/dyn/breaking_news.rss”
};
const feedUrl = feeds[source];
if (!feedUrl) return new Response(“Unknown source”, { status: 400 });
try {
const r = await fetch(feedUrl, {
headers: { “User-Agent”: “Mozilla/5.0” }
});
const xml = await r.text();
return new Response(xml, {
headers: {
“Content-Type”: “application/xml”,
“Access-Control-Allow-Origin”: “*”,
“Cache-Control”: “public, max-age=300”
}
});
} catch (e) {
return new Response(“Error: “ + e.message, { status: 502 });
}
}
