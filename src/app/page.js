"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "./_components/reveal";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_INTRO,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GAUGES,
  TOOLKIT,
} from "./_components/data";
import {
  Background,
  Card,
  MENU_COLORS,
  MENU_OFFSETS,
  MENU_TILTS,
  MobileMenu,
  SectionTitle,
  SocialChips,
  WalletBox,
} from "./_components/p3r";

const SECTIONS = [
  { id: "home", label: "HOME", hint: "Welcome" },
  { id: "about", label: "ABOUT", hint: "Who I Am" },
  { id: "projects", label: "PROJECTS", hint: "Things I Built" },
  { id: "experience", label: "EXPERIENCE", hint: "Where I've Been" },
  { id: "contact", label: "CONTACT", hint: "Reach Out" },
];

// Route entries navigate instead of scrolling.
const MENU_ITEMS = [
  ...SECTIONS,
  { id: "articles", label: "ARTICLES", href: "/articles" },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function MenuLabel({ isActive, color, children }) {
  return (
    <>
      {isActive && (
        <>
          <span className="absolute -inset-x-8 inset-y-1 -rotate-2 bg-[#ff6ea8] [clip-path:polygon(4%_18%,100%_0,94%_88%,0_100%)]" />
          <span className="absolute -inset-x-7 inset-y-1 -rotate-2 bg-white [clip-path:polygon(3%_15%,100%_2%,95%_85%,0_98%)]" />
        </>
      )}
      <span
        className="font-display relative block skew-x-[-12deg] text-5xl tracking-wide transition-all duration-150 group-hover:translate-x-2 xl:text-6xl"
        style={{
          color: isActive ? "#e60012" : color,
          textShadow: isActive
            ? "3px 3px 0 rgba(120,0,10,0.35)"
            : "3px 4px 0 rgba(3,18,110,0.45)",
        }}
      >
        {children}
      </span>
    </>
  );
}

function MenuNav({ activeId }) {
  return (
    <nav className="fly fly-menu fixed top-1/2 left-[27%] z-30 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-1">
        {MENU_ITEMS.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              style={{
                marginLeft: MENU_OFFSETS[index],
                transform: `rotate(${MENU_TILTS[index]}deg)`,
              }}
            >
              {item.href ? (
                <Link href={item.href} className="group relative block">
                  <MenuLabel isActive={false} color={MENU_COLORS[index]}>
                    {item.label}
                  </MenuLabel>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="group relative block cursor-pointer"
                >
                  <MenuLabel isActive={isActive} color={MENU_COLORS[index]}>
                    {item.label}
                  </MenuLabel>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function CommandHint({ activeId }) {
  const activeIndex = SECTIONS.findIndex((section) => section.id === activeId);
  const active = SECTIONS[activeIndex] ?? SECTIONS[0];
  const next = SECTIONS[(activeIndex + 1) % SECTIONS.length];

  return (
    <div className="fly fly-hint fixed right-8 bottom-6 z-40 hidden flex-col items-end gap-3 text-white lg:flex">
      <div className="text-right">
        <div className="font-display skew-x-[-8deg] text-4xl [text-shadow:3px_3px_0_rgba(3,18,110,0.5)]">
          {active.hint}
        </div>
        <div className="mt-1 flex items-center justify-end gap-2">
          <span className="text-xs font-bold tracking-[0.2em]">Section</span>
          <span className="h-[2px] w-24 bg-white/80" />
        </div>
      </div>
      <div className="font-display flex items-center gap-6 text-2xl">
        <button
          type="button"
          onClick={() => scrollToSection(next.id)}
          className="group flex cursor-pointer items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-base transition-colors group-hover:bg-white group-hover:text-[#0a2ec4]">
            A
          </span>
          <span className="skew-x-[-8deg] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]">
            Next
          </span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="group flex cursor-pointer items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-base transition-colors group-hover:bg-white group-hover:text-[#0a2ec4]">
            B
          </span>
          <span className="skew-x-[-8deg] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]">
            Top
          </span>
        </button>
      </div>
    </div>
  );
}

function SkillBar({ name, level }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display w-20 skew-x-[-10deg] text-base text-[#0a2ec4] md:w-32 md:text-xl">
        {name}
      </span>
      <div className="h-5 flex-1 -skew-x-12 bg-[#08214f] p-1 shadow-[3px_3px_0_rgba(3,18,110,0.25)]">
        <div className="flex h-full flex-col justify-between">
          <div
            className="h-[55%] bg-[#2de1ff]"
            style={{ width: `${level * 10}%` }}
          />
          <div
            className="h-[25%] bg-[#ffd400]"
            style={{ width: `${Math.max(level - 2, 1) * 10}%` }}
          />
        </div>
      </div>
      <span className="font-display w-10 text-right text-base text-[#0a2ec4] md:w-12 md:text-xl">
        Lv{level}
      </span>
    </div>
  );
}

function TechChip({ children }) {
  return (
    <span className="font-display -skew-x-12 bg-[#0a2ec4] px-3 py-0.5 text-sm text-[#9ff0ff]">
      <span className="block skew-x-12">{children}</span>
    </span>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState("home");

  // Scroll spy: the section closest to the viewport center is active.
  useEffect(() => {
    function updateActive() {
      const centerY = window.innerHeight / 2;
      let bestId = SECTIONS[0].id;
      let bestDistance = Infinity;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const distance =
          rect.top <= centerY && rect.bottom >= centerY
            ? 0
            : Math.min(
                Math.abs(rect.top - centerY),
                Math.abs(rect.bottom - centerY),
              );
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }
      setActiveId(bestId);
    }
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Desktop gamepad-style keys: A jumps to the next section, B back to top.
  useEffect(() => {
    function handleKey(event) {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "a") {
        const index = SECTIONS.findIndex((section) => section.id === activeId);
        scrollToSection(SECTIONS[(index + 1) % SECTIONS.length].id);
      } else if (key === "b") {
        scrollToSection("home");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeId]);

  const activeLabel =
    SECTIONS.find((section) => section.id === activeId)?.label ?? "HOME";

  return (
    <div className="relative">
      <Background activeLabel={activeLabel} />
      <WalletBox />
      <SocialChips />
      <MenuNav activeId={activeId} />
      <MobileMenu />
      <CommandHint activeId={activeId} />

      <main className="fly fly-main relative z-10 mx-auto max-w-screen-2xl px-5 lg:px-0">
        {/* HERO — left side belongs to the menu; intro sits on the right */}
        <section
          id="home"
          className="flex min-h-screen items-center lg:justify-end"
        >
          <div className="w-full lg:mr-[6%] lg:w-[42%]">
            <Reveal from="right">
              <div className="animate-float">
                <p className="font-display skew-x-[-10deg] text-xl text-[#2de1ff] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)] md:text-2xl">
                  — {PROFILE.name}
                </p>
                <h1 className="font-display skew-x-[-10deg] text-6xl leading-[0.9] text-white [text-shadow:5px_5px_0_rgba(3,18,110,0.55)] md:text-8xl">
                  FULL
                  <br />
                  STACK
                </h1>
              </div>
              <p className="mt-6 max-w-md text-base font-medium text-[#d6f6ff] [text-shadow:1px_1px_0_rgba(3,18,110,0.6)] md:mt-8 md:text-lg">
                {PROFILE.tagline}
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="font-display group mt-8 flex cursor-pointer items-center gap-3 text-xl text-white md:mt-10 md:text-2xl"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-lg transition-colors group-hover:bg-white group-hover:text-[#0a2ec4]">
                  A
                </span>
                <span className="skew-x-[-8deg] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]">
                  Press Start
                </span>
              </button>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="flex min-h-screen items-center py-16 md:py-24 lg:justify-end"
        >
          <div className="w-full lg:mr-[4%] lg:w-[44%]">
            <Reveal from="left">
              <SectionTitle>ABOUT</SectionTitle>
            </Reveal>
            <Reveal from="right" delay={120}>
              <Card>
                {ABOUT_PARAGRAPHS.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-base leading-relaxed not-first:mt-4 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="mt-8 flex flex-col gap-4">
                  {SKILL_GAUGES.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </div>
                <p className="font-display mt-8 skew-x-[-10deg] text-xl text-[#0a2ec4]">
                  TOOLKIT
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOOLKIT.map((tool) => (
                    <TechChip key={tool}>{tool}</TechChip>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="flex min-h-screen items-center py-16 md:py-24 lg:justify-end"
        >
          <div className="w-full lg:mr-[4%] lg:w-[46%]">
            <Reveal from="left">
              <SectionTitle>PROJECTS</SectionTitle>
            </Reveal>
            <div className="flex flex-col gap-8">
              {PROJECTS.map((project, index) => (
                <Reveal
                  key={project.title}
                  from={index % 2 ? "left" : "right"}
                  delay={index * 100}
                  className={index % 2 ? "lg:ml-12" : ""}
                >
                  <Card>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display skew-x-[-10deg] text-2xl text-[#0a2ec4] md:text-3xl">
                        {project.title}
                      </h3>
                      <span
                        className={`font-display -skew-x-12 px-3 py-0.5 text-sm ${
                          project.tag === "Completed"
                            ? "bg-[#2de1ff] text-[#03124d]"
                            : "bg-[#ffd400] text-[#03124d]"
                        }`}
                      >
                        <span className="block skew-x-12">{project.tag}</span>
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <TechChip key={tech}>{tech}</TechChip>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-5">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display flex items-center gap-2 text-lg text-[#e60012] hover:underline"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#e60012] text-xs">
                            A
                          </span>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className="flex min-h-screen items-center py-16 md:py-24 lg:justify-end"
        >
          <div className="w-full lg:mr-[4%] lg:w-[46%]">
            <Reveal from="left">
              <SectionTitle>EXPERIENCE</SectionTitle>
            </Reveal>
            <div className="flex flex-col gap-8">
              {EXPERIENCE.map((job, index) => (
                <Reveal
                  key={job.period}
                  from={index % 2 ? "right" : "left"}
                  delay={index * 100}
                  className={index % 2 ? "lg:ml-12" : ""}
                >
                  <Card>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div className="font-display shrink-0 -skew-x-6 bg-[#e60012] px-4 py-2 text-xl text-white shadow-[4px_4px_0_rgba(120,0,10,0.3)]">
                        <span className="block skew-x-6">{job.period}</span>
                      </div>
                      <div>
                        <h3 className="font-display skew-x-[-8deg] text-xl text-[#0a2ec4] md:text-2xl">
                          {job.role}
                        </h3>
                        <p className="font-bold text-[#1f8de0]">
                          {job.company}
                        </p>
                        <p className="mt-2 leading-relaxed">{job.detail}</p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="flex min-h-screen items-center py-16 md:py-24 lg:justify-end"
        >
          <div className="w-full lg:mr-[4%] lg:w-[44%]">
            <Reveal from="left">
              <SectionTitle>CONTACT</SectionTitle>
            </Reveal>
            <Reveal from="right" delay={120}>
              <Card>
                <p className="font-display skew-x-[-8deg] text-2xl text-[#0a2ec4] md:text-3xl">
                  Initiate Social Link?
                </p>
                <p className="mt-3 text-base leading-relaxed md:text-lg">
                  {CONTACT_INTRO}
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-display mt-6 inline-block max-w-full -skew-x-2 bg-[#e60012] px-4 py-2.5 text-base break-all text-white shadow-[6px_6px_0_rgba(120,0,10,0.3)] transition-transform hover:-translate-y-1 md:-skew-x-6 md:px-8 md:py-3 md:text-2xl"
                >
                  <span className="block skew-x-6">{PROFILE.email}</span>
                </a>
                <div className="mt-8 flex gap-4">
                  {PROFILE.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display -skew-x-6 border-2 border-[#0a2ec4] px-5 py-2 text-lg text-[#0a2ec4] transition-colors hover:bg-[#0a2ec4] hover:text-white"
                    >
                      <span className="block skew-x-6">{social.name}</span>
                    </a>
                  ))}
                </div>
              </Card>
            </Reveal>
            <Reveal from="up" delay={240}>
              <p className="mt-10 text-center text-sm font-bold tracking-[0.3em] text-[#9ff0ff] [text-shadow:1px_1px_0_rgba(3,18,110,0.6)] lg:text-right">
                Ⓐ CONFIRM&nbsp;&nbsp;&nbsp;Ⓑ CLOSE
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
