import { getAllArticles } from "./_lib/articles";

export default async function sitemap() {
  const baseURL =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://portfolio.josaphatcornelius.tech";
  const articles = await getAllArticles();

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseURL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseURL}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
