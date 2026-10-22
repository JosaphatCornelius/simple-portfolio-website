import { getAllArticles } from "./_lib/articles";
import { PROJECTS } from "../app/_components/data";
import { SITE_URL } from "./_lib/site";

export default async function sitemap() {
  const articles = await getAllArticles();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "yearly",
      priority: 0.8,
    })),
  ];
}
