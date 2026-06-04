"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const skills = [
  "Next.js",
  "React",
  "JavaScript",
  "TypeScript",
  "ASP.NET Core",
  "C#",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "Docker",
  "Git",
];

const projects = [
  {
    name: "P3R Portfolio",
    tag: "In Progress",
    blurb:
      "A Persona 3 Reload inspired personal portfolio with bold JRPG aesthetics, sharp diagonal geometry, and Framer Motion driven animations.",
    stack: ["Next.js", "JavaScript", "Tailwind CSS", "Framer Motion"],
    links: [
      {
        label: "Code",
        href: "https://github.com/JosaphatCornelius/website-general-portfolio",
      },
    ],
  },
  {
    name: "E-Ticketing System",
    tag: "Completed",
    blurb:
      "A full-stack e-ticketing platform pairing a React admin dashboard with an ASP.NET Core, Dockerized backend — authentication, user management, and ticket handling end to end.",
    stack: ["React", "TypeScript", "ASP.NET Core", "Docker"],
    links: [
      {
        label: "Frontend",
        href: "https://github.com/JosaphatCornelius/E-Ticketing_Frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/JosaphatCornelius/E-Ticketing_Backend",
      },
    ],
  },
  {
    name: "Should I Buy It?",
    tag: "Completed",
    blurb:
      "A purchase decision tool offering a calm second opinion before you spend — weighing affordability, budget fit, usefulness, and impulse against the opportunity cost of investing instead.",
    stack: ["Next.js", "JavaScript", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://josaphat-should-i-buy-it.netlify.app/" },
      {
        label: "Code",
        href: "https://github.com/JosaphatCornelius/should-i-buy-it",
      },
    ],
  },
  {
    name: "React Native App",
    tag: "Completed",
    blurb:
      "An Android app built in a team of three at SMK Strada Jakarta, sharpening collaboration, communication, and a genuinely user-friendly mobile experience from the ground up.",
    stack: ["React Native", "Android", "JavaScript"],
    links: [
      { label: "Demo", href: "https://www.youtube.com/watch?v=UXfdgU3EXvQ" },
    ],
  },
  {
    name: "F1 Driving Experience",
    tag: "Completed",
    blurb:
      "A responsive, interactive Formula 1 themed frontend built in 10th grade at SMK Strada Jakarta — designed to react to the user and deployed live on free hosting.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "Live", href: "https://josaphat-f1-project.netlify.app/" },
      {
        label: "Code",
        href: "https://github.com/JosaphatCornelius/Formula-1-Website-Project",
      },
    ],
  },
];

const experience = [
  {
    role: "IT Project Development & Infrastructure Support",
    company: "PT Asuransi Artarindo · Full-time",
    period: "May 2025 — Now",
    detail:
      "Full Stack Developer and SQA on internal systems in Jakarta, applying full-stack development and design thinking on-site.",
  },
  {
    role: "Website Developer Intern",
    company: "PT Asuransi Artarindo · Internship",
    period: "Jul 2024 — Dec 2024",
    detail:
      "Six-month on-site internship focused on mobile application development in North Jakarta.",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/JosaphatCornelius", fill: 92 },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/josaphat-cornelius-540141277/",
    fill: 78,
  },
  { label: "Email", href: "mailto:jojo.31.liu@gmail.com", fill: 64 },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

function useBackgroundParallax() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const handleMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      root.style.setProperty("--pointer-x", currentX.toFixed(4));
      root.style.setProperty("--pointer-y", currentY.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

function SideNav({ active }) {
  return (
    <nav className="pointer-events-none fixed left-0 top-0 z-30 hidden h-screen flex-col justify-center gap-2 pl-6 lg:flex xl:pl-10">
      {sections.map((section, index) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="menu-item pointer-events-auto group relative flex items-center transition-transform duration-200 hover:translate-x-1"
          >
            <span className="w-8 font-mono text-xs not-italic text-blue-pale/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative px-3 py-1">
              {isActive && (
                <span className="slant absolute inset-0 -left-1 bg-accent-red shadow-[0_0_24px_rgba(255,34,71,0.55)]" />
              )}
              <span
                className={`relative text-2xl transition-colors xl:text-3xl ${
                  isActive
                    ? "text-white"
                    : "text-blue-pale/55 group-hover:text-blue-bright"
                }`}
              >
                {section.label}
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}

function SideRail() {
  return (
    <aside className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto group flex w-40 items-center gap-3 rounded-md border border-white/10 bg-blue-deep/50 px-3 py-2 backdrop-blur-sm transition duration-200 hover:-translate-x-1 hover:border-blue-bright"
        >
          <span className="grid size-7 place-items-center rounded-full bg-blue-bright/20 text-xs font-bold text-blue-bright transition-transform duration-200 group-hover:scale-110">
            {social.label[0]}
          </span>
          <span className="flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wide text-blue-pale group-hover:text-white">
              {social.label}
            </span>
            <span
              className="statbar mt-1 block h-1 rounded-full"
              style={{ "--fill": `${social.fill}%` }}
            />
          </span>
        </a>
      ))}
    </aside>
  );
}

function CommandBar({ active }) {
  const current = sections.find((section) => section.id === active);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-white/10 bg-blue-deep/80 px-4 py-2 text-xs backdrop-blur-md sm:px-8">
      <span className="menu-item text-blue-pale">
        <span className="not-italic text-blue-bright">/</span>{" "}
        {current?.label ?? "Home"}
      </span>
      <span className="hidden items-center gap-5 font-semibold text-blue-pale/80 sm:flex">
        <span className="flex items-center gap-1.5">
          <kbd className="grid size-4 place-items-center rounded-full bg-blue-bright text-[10px] text-blue-deep">
            A
          </kbd>
          Select
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="grid size-4 place-items-center rounded-full bg-accent-red text-[10px] text-white">
            B
          </kbd>
          <a href="#hero">Top</a>
        </span>
      </span>
    </div>
  );
}

function LinkIcon({ href }) {
  const isYouTube = href.includes("youtube.com") || href.includes("youtu.be");
  const isGitHub = href.includes("github.com");

  if (isYouTube) {
    return (
      <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.09 0 12 0 12s0 3.91.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.91 24 12 24 12s0-3.91-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </svg>
    );
  }

  if (isGitHub) {
    return (
      <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.71.08-.71 1.2.08 1.83 1.21 1.83 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56C20.56 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z" />
      </svg>
    );
  }

  return (
    <svg
      className="size-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function WaterCaustics() {
  return (
    <svg
      className="water-caustics"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="caustics"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          {/* Large, low-frequency cells read as pool caustics rather than
              fine static. baseFrequency only undulates slightly and slowly. */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.006 0.009"
            numOctaves="2"
            seed="11"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="40s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              values="0.006 0.009;0.0075 0.0075;0.006 0.009"
            />
          </feTurbulence>
          {/* alpha = 1.1*noise - 0.55 keeps only the bright peaks, turning the
              cloud into thin caustic veins; RGB tints them blue-white. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.55  0 0 0 0 0.82  0 0 0 0 1  0 0 0 1.1 -0.55"
          />
        </filter>
      </defs>
      <rect x="-15%" y="-15%" width="130%" height="130%" filter="url(#caustics)">
        <animateTransform
          attributeName="transform"
          type="translate"
          dur="26s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          values="0 0; 6 38; 0 0"
        />
      </rect>
    </svg>
  );
}

function SectionHeading({ index, children }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-sm text-blue-bright">{index}</span>
      <h2 className="display text-4xl text-white sm:text-6xl">
        {children}
        <span className="text-accent-red">.</span>
      </h2>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${name}\n${data.get("email")}`
    );
    window.location.href = `mailto:jojo.31.liu@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-blue-bright/40 bg-blue-bright/10 p-8 text-center">
        <p className="display text-2xl text-white">Your email is ready.</p>
        <p className="mt-2 text-blue-pale">
          I&apos;ve opened your mail app with the message drafted — just hit send
          and I&apos;ll reply within a day.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-blue-bright hover:text-white"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Your name"
          className="rounded-md border border-white/15 bg-blue-deep/50 px-4 py-3 text-white placeholder:text-blue-pale/50 outline-none transition focus:border-blue-bright"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Your email"
          className="rounded-md border border-white/15 bg-blue-deep/50 px-4 py-3 text-white placeholder:text-blue-pale/50 outline-none transition focus:border-blue-bright"
        />
      </div>
      <textarea
        required
        name="message"
        rows={4}
        placeholder="Tell me about your project"
        className="rounded-md border border-white/15 bg-blue-deep/50 px-4 py-3 text-white placeholder:text-blue-pale/50 outline-none transition focus:border-blue-bright"
      />
      <button
        type="submit"
        className="slant self-start bg-accent-red px-7 py-3 shadow-[0_0_24px_rgba(255,34,71,0.5)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
      >
        <span className="unslant menu-item block text-lg text-white">
          Send Message
        </span>
      </button>
    </form>
  );
}

export default function Home() {
  const active = useActiveSection();
  useBackgroundParallax();

  return (
    <>
      <div className="water-glow" aria-hidden="true" />
      <WaterCaustics />
      <SideNav active={active} />
      <SideRail />
      <CommandBar active={active} />

      <main className="mx-auto w-full max-w-6xl px-6 pb-20 lg:pl-48 xl:pr-36">
        <section
          id="hero"
          className="flex min-h-screen flex-col justify-center py-24"
        >
          <p
            className="hero-item menu-item mb-4 text-sm text-blue-bright"
            style={{ animationDelay: "100ms" }}
          >
            <span className="slant inline-block bg-blue-bright/15 px-2 py-0.5">
              <span className="unslant inline-block">Portfolio</span>
            </span>
          </p>
          <h1 className="display text-6xl text-white sm:text-8xl">
            <span className="name-line" style={{ animationDelay: "240ms" }}>
              Josaphat
            </span>
            <br />
            <span className="name-line" style={{ animationDelay: "380ms" }}>
              Cornelius
              <span className="text-accent-red">/</span>
            </span>
          </h1>
          <p
            className="hero-item mt-6 max-w-xl text-lg text-blue-pale sm:text-xl"
            style={{ animationDelay: "540ms" }}
          >
            Full Stack Developer in Jakarta building seamless, user-friendly web,
            Android, and game experiences that feel alive.
          </p>
          <div
            className="hero-item mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "660ms" }}
          >
            <a
              href="#projects"
              className="slant bg-accent-red px-7 py-3 shadow-[0_0_24px_rgba(255,34,71,0.5)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
            >
              <span className="unslant menu-item block text-lg text-white">
                View Work
              </span>
            </a>
            <a
              href="#contact"
              className="slant border border-blue-bright/60 px-7 py-3 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-bright/10 active:translate-y-0 active:scale-95"
            >
              <span className="unslant menu-item block text-lg text-blue-bright">
                Contact
              </span>
            </a>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-24">
          <Reveal>
            <SectionHeading index="01">About</SectionHeading>
          </Reveal>
          <Reveal
            delay={120}
            className="grid gap-10 md:grid-cols-[1.4fr_1fr]"
          >
            <div className="space-y-4 text-lg leading-relaxed text-blue-pale">
              <p>
                I&apos;m a full-stack developer who loves turning ideas into
                things people actually enjoy using. My work spans full-stack web,
                Android, and game development, but the throughline never changes:
                building seamless, user-friendly applications and digital
                experiences that feel alive. I care deeply about clean code,
                sharp UX, and shipping work that holds up in the real world.
              </p>
              <p>
                Outside of pure engineering, I&apos;m a maker at heart — I edit,
                shoot photography, and produce videography, so the visuals always
                match the products I build. That blend earned 2nd place in the
                Politeknik Tempo University English Speech Contest (2023) and 3rd
                place in the FLS2N Short Movie Contest.
              </p>
            </div>
            <div>
              <p className="menu-item mb-3 text-sm text-blue-bright">Toolkit</p>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="cursor-default rounded-full border border-white/15 bg-blue-deep/40 px-3 py-1 text-sm text-blue-pale transition duration-200 hover:-translate-y-0.5 hover:border-blue-bright hover:bg-blue-bright/10 hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="scroll-mt-20 py-24">
          <Reveal>
            <SectionHeading index="02">Projects</SectionHeading>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 70} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-blue-deep/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-bright hover:bg-blue-deep/60 hover:shadow-[0_18px_50px_-20px_rgba(94,155,255,0.65)]">
                  <span className="slant absolute left-4 top-0 h-1 w-12 origin-left scale-x-0 bg-accent-red transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="display text-2xl text-white transition-colors duration-200 group-hover:text-blue-bright">
                      {project.name}
                    </h3>
                    <span className="menu-item text-xs text-accent-red">
                      {project.tag}
                    </span>
                  </div>
                  <p className="flex-1 text-blue-pale">{project.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs text-blue-bright"
                      >
                        #{tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="slant border border-blue-bright/40 px-3 py-1 transition duration-200 hover:-translate-y-0.5 hover:border-blue-bright hover:bg-blue-bright/15"
                      >
                        <span className="unslant menu-item flex items-center gap-1.5 text-xs text-blue-bright">
                          <LinkIcon href={link.href} />
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 py-24">
          <Reveal>
            <SectionHeading index="03">Experience</SectionHeading>
          </Reveal>
          <ol className="relative border-l border-white/15 pl-6">
            {experience.map((job, index) => (
              <li key={job.company} className="group mb-10 last:mb-0">
                <span className="slant absolute -left-[7px] mt-1.5 size-3 bg-accent-red transition-transform duration-300 group-hover:scale-150 group-hover:shadow-[0_0_18px_rgba(255,34,71,0.8)]" />
                <Reveal delay={index * 90}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="display text-2xl text-white transition-colors duration-200 group-hover:text-blue-bright">
                      {job.role}
                    </h3>
                    <span className="font-mono text-sm text-blue-bright">
                      {job.period}
                    </span>
                  </div>
                  <p className="menu-item text-sm text-blue-pale">
                    {job.company}
                  </p>
                  <p className="mt-2 max-w-2xl text-blue-pale">{job.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="scroll-mt-20 py-24">
          <Reveal>
            <SectionHeading index="04">Contact</SectionHeading>
          </Reveal>
          <Reveal delay={100} as="p" className="mb-8 max-w-xl text-lg text-blue-pale">
            Have a project in mind or just want to say hello? Drop a line and
            let&apos;s talk.
          </Reveal>
          <Reveal delay={200}>
            <ContactForm />
          </Reveal>
        </section>
      </main>
    </>
  );
}
