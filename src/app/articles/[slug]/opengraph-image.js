import { createOgImage, OG_SIZE } from "../../_lib/og";
import { formatArticleDate, getArticleSlugs } from "../../_lib/articles";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const alt = "Article — Josaphat Cornelius";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/articles/${slug}.mdx`);

  return createOgImage({
    eyebrow: formatArticleDate(metadata.date),
    title: metadata.title,
    footer: "JOSAPHAT CORNELIUS · ARTICLES",
  });
}
