import Link from "next/link";
import { formatArticleDate, getArticleSlugs } from "../../_lib/articles";
import {
  Background,
  Card,
  MobileMenu,
  SocialChips,
  WalletBox,
} from "../../_components/p3r";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/articles/${slug}.mdx`);
  return {
    title: `${metadata.title} — Josaphat Cornelius`,
    description: metadata.summary,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const { default: Article, metadata } = await import(
    `@/content/articles/${slug}.mdx`
  );

  return (
    <div className="relative">
      <Background activeLabel="READ" />
      <WalletBox />
      <SocialChips />
      <MobileMenu />

      <div className="fixed right-8 bottom-6 z-40 hidden lg:block">
        <Link
          href="/articles"
          className="font-display group flex items-center gap-2 text-2xl text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-base transition-colors group-hover:bg-white group-hover:text-[#0a2ec4]">
            B
          </span>
          <span className="skew-x-[-8deg] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]">
            Back
          </span>
        </Link>
      </div>

      <main className="relative z-10 mx-auto max-w-screen-2xl px-5 pt-28 pb-16 md:py-20 lg:px-0">
        <div className="lg:ml-auto lg:w-[56%] lg:pr-[4%]">
          <Link
            href="/articles"
            className="font-display mb-6 inline-block skew-x-[-10deg] text-xl text-[#9ff0ff] hover:text-white [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]"
          >
            ← ALL ARTICLES
          </Link>
          <div className="mb-8">
            <span className="font-display inline-block -skew-x-12 bg-[#e60012] px-4 py-1 text-lg text-white shadow-[4px_4px_0_rgba(120,0,10,0.3)]">
              <span className="block skew-x-12">
                {formatArticleDate(metadata.date)}
              </span>
            </span>
            <h1 className="font-display mt-4 skew-x-[-10deg] text-4xl leading-[0.95] text-white [text-shadow:4px_4px_0_rgba(3,18,110,0.55)] md:text-6xl">
              {metadata.title}
            </h1>
          </div>
          <Card>
            <article>
              <Article />
            </article>
          </Card>
        </div>
      </main>
    </div>
  );
}
