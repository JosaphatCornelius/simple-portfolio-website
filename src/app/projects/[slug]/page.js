import Link from "next/link";
import { PROJECTS } from "../../_components/data";
import { Reveal } from "../../_components/reveal";
import {
  Background,
  Card,
  MobileMenu,
  SocialChips,
  WalletBox,
} from "../../_components/p3r";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);
  return {
    title: `${project.title} — Josaphat Cornelius`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);

  return (
    <div className="relative">
      <Background activeLabel="WORK" />
      <WalletBox />
      <SocialChips />
      <MobileMenu />

      <div className="fly fly-back fixed right-8 bottom-6 z-40 hidden lg:block">
        <Link
          href="/#projects"
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
            href="/#projects"
            className="font-display mb-6 inline-block skew-x-[-10deg] text-xl text-[#9ff0ff] hover:text-white [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]"
          >
            ← ALL PROJECTS
          </Link>
          <div className="mb-8">
            <span
              className={`font-display inline-block -skew-x-12 px-4 py-1 text-lg shadow-[4px_4px_0_rgba(3,18,110,0.45)] ${
                project.tag === "Completed"
                  ? "bg-[#2de1ff] text-[#03124d]"
                  : "bg-[#ffd400] text-[#03124d]"
              }`}
            >
              <span className="block skew-x-12">{project.tag}</span>
            </span>
            <h1 className="font-display mt-4 skew-x-[-10deg] text-4xl leading-[0.95] text-white [text-shadow:4px_4px_0_rgba(3,18,110,0.55)] md:text-6xl">
              {project.title}
            </h1>
          </div>

          <Reveal from="right">
            <Card>
              <p className="font-display skew-x-[-8deg] text-xl text-[#0a2ec4] md:text-2xl">
                Mission Briefing
              </p>
              <p className="mt-3 text-base leading-relaxed md:text-lg">
                {project.longDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-display -skew-x-12 bg-[#0a2ec4] px-3 py-0.5 text-sm text-[#9ff0ff]"
                  >
                    <span className="block skew-x-12">{tech}</span>
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal from="left" delay={120}>
            <Card className="mt-8">
              <p className="font-display skew-x-[-8deg] text-xl text-[#0a2ec4] md:text-2xl">
                Key Results
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed marker:text-[#e60012] md:text-lg">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display -skew-x-6 bg-[#e60012] px-6 py-2 text-lg text-white shadow-[4px_4px_0_rgba(120,0,10,0.3)] transition-transform hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-2 skew-x-6">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs">
                        A
                      </span>
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
