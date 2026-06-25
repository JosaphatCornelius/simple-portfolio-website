import { readdir, readFile } from "fs/promises";
import path from "path";
import GithubSlugger from "github-slugger";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");
const WORDS_PER_MINUTE = 200;

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
      const [{ metadata }, stats] = await Promise.all([
        import(`@/content/articles/${slug}.mdx`),
        getArticleStats(slug),
      ]);
      return { slug, ...metadata, ...stats };
    })
  );
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Reads the raw MDX (the compiled module no longer carries its own source)
// to estimate reading time and collect headings for the TOC. Heading ids are
// produced with github-slugger, the same library rehype-slug uses, so the
// anchors match the rendered document.
export async function getArticleStats(slug) {
  const raw = await readFile(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
  const body = raw
    .replace(/^export const metadata = \{[\s\S]*?\};/m, "")
    .replace(/```[\s\S]*?```/g, " ");

  const words = body.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  const slugger = new GithubSlugger();
  const headings = [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
    const text = match[2].replaceAll("`", "").trim();
    return { depth: match[1].length, text, id: slugger.slug(text) };
  });

  return { readingMinutes, headings };
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
