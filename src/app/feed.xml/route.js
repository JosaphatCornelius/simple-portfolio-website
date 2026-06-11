import { getAllArticles } from "../_lib/articles";
import { SITE_URL } from "../_lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const articles = await getAllArticles();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/articles/${article.slug}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Josaphat Cornelius — Articles</title>
    <link>${escapeXml(`${SITE_URL}/articles`)}</link>
    <description>Hand-written articles on web development, UI engineering, and whatever else is on my mind.</description>
    <language>en</language>
    <atom:link href="${escapeXml(`${SITE_URL}/feed.xml`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
