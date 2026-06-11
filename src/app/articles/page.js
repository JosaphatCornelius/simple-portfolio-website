import Link from "next/link";
import { formatArticleDate, getAllArticles } from "../_lib/articles";
import { Reveal } from "../_components/reveal";
import { SideMenu } from "../_components/side-menu";
import {
  Background,
  Card,
  MobileMenu,
  SectionTitle,
  SocialChips,
  WalletBox,
} from "../_components/p3r";

export const metadata = {
  title: "Articles — Josaphat Cornelius",
  description:
    "Hand-written articles on web development, UI engineering, and whatever else is on my mind.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="relative">
      <Background activeLabel="POSTS" />
      <WalletBox />
      <SocialChips />
      <SideMenu
        items={[
          { label: "HOME", href: "/" },
          { label: "ARTICLES", href: "/articles" },
        ]}
        activeLabel="ARTICLES"
      />
      <MobileMenu />

      <div className="fly fly-back fixed right-8 bottom-6 z-40 hidden lg:block">
        <Link
          href="/"
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
        <div className="lg:ml-auto lg:w-[52%] lg:pr-[4%]">
          <Link
            href="/"
            className="font-display mb-6 inline-block skew-x-[-10deg] text-xl text-[#9ff0ff] hover:text-white [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]"
          >
            ← BACK TO MENU
          </Link>
          <Reveal from="left">
            <SectionTitle>ARTICLES</SectionTitle>
          </Reveal>
          <div className="flex flex-col gap-8">
            {articles.map((article, index) => (
              <Reveal
                key={article.slug}
                from={index % 2 ? "left" : "right"}
                delay={index * 100}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className={`group block ${index % 2 ? "lg:ml-12" : ""}`}
                >
                  <Card className="transition-transform group-hover:-translate-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display skew-x-[-10deg] text-2xl text-[#0a2ec4] group-hover:text-[#e60012] md:text-3xl">
                        {article.title}
                      </h2>
                      <span className="font-display -skew-x-12 bg-[#e60012] px-3 py-0.5 text-sm text-white">
                        <span className="block skew-x-12">
                          {formatArticleDate(article.date)}
                        </span>
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed">{article.summary}</p>
                    <p className="font-display mt-4 flex items-center gap-2 text-lg text-[#e60012]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#e60012] text-xs">
                        A
                      </span>
                      Read
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
