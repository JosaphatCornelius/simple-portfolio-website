import { readdir } from "fs/promises";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export async function getArticleSlugs() {
  const files = await readdir(ARTICLES_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`@/content/articles/${slug}.mdx`);
      return { slug, ...metadata };
    })
  );
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function formatArticleDate(date) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}
