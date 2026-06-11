import Link from "next/link";
import {
  formatArticleDate,
  getArticleSlugs,
  getArticleStats,
} from "../../_lib/articles";
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
  const [{ default: Article, metadata }, { readingMinutes, headings }] =
    await Promise.all([
      import(`@/content/articles/${slug}.mdx`),
      getArticleStats(slug),
    ]);

  return (
    <div className="relative">
      <Background activeLabel="READ" />
      <WalletBox />
      <SocialChips />
      <MobileMenu />

      <div className="fly fly-back fixed right-8 bottom-6 z-40 hidden lg:block">
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

      <main className="fly fly-main relative z-10 mx-auto max-w-screen-2xl px-5 pt-28 pb-16 md:py-20 lg:px-0">
        <div className="lg:ml-auto lg:w-[56%] lg:pr-[4%]">
          <Link
            href="/articles"
            className="font-display mb-6 inline-block skew-x-[-10deg] text-xl text-[#9ff0ff] hover:text-white [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]"
          >
            ← ALL ARTICLES
          </Link>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display inline-block -skew-x-12 bg-[#e60012] px-4 py-1 text-lg text-white shadow-[4px_4px_0_rgba(120,0,10,0.3)]">
                <span className="block skew-x-12">
                  {formatArticleDate(metadata.date)}
                </span>
              </span>
              <span className="font-display inline-block -skew-x-12 bg-[#03124d] px-4 py-1 text-lg text-[#9ff0ff] shadow-[4px_4px_0_rgba(3,18,110,0.45)]">
                <span className="block skew-x-12">
                  {readingMinutes} MIN READ
                </span>
              </span>
            </div>
            <h1 className="font-display mt-4 skew-x-[-10deg] text-4xl leading-[0.95] text-white [text-shadow:4px_4px_0_rgba(3,18,110,0.55)] md:text-6xl">
              {metadata.title}
            </h1>
            {(metadata.tags ?? []).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-display -skew-x-12 border-2 border-white/70 px-3 py-0.5 text-sm tracking-wide text-white uppercase [text-shadow:1px_1px_0_rgba(3,18,110,0.6)]"
                  >
                    <span className="block skew-x-12">#{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
          {headings.length > 0 && (
            <nav className="mb-8 inline-block min-w-64 -skew-x-2 border-l-8 border-[#ffd400] bg-[#03124d] px-6 py-4 text-white shadow-[8px_8px_0_rgba(3,18,110,0.45)]">
              <p className="font-display skew-x-[-8deg] text-xl text-[#ffd400]">
                CONTENTS
              </p>
              <ul className="mt-2 space-y-1">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.depth === 3 ? "pl-5" : ""}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="font-display skew-x-[-8deg] inline-block text-base text-[#9ff0ff] hover:text-white"
                    >
                      ▸ {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
