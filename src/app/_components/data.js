// Content ported from simple-portfolio-website (src/app/page.js).
export const PROFILE = {
  name: "JOSAPHAT CORNELIUS",
  role: "FULL STACK DEVELOPER",
  tagline:
    "Full Stack Developer in Jakarta building seamless, user-friendly web, Android, and game experiences that feel alive.",
  email: "jojo.31.liu@gmail.com",
  socials: [
    {
      label: "GH",
      name: "GitHub",
      href: "https://github.com/JosaphatCornelius",
    },
    {
      label: "IN",
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/josaphat-cornelius-540141277/",
    },
    { label: "@", name: "Email", href: "mailto:jojo.31.liu@gmail.com" },
  ],
};

export const ABOUT_PARAGRAPHS = [
  "I'm a full-stack developer who loves turning ideas into things people actually enjoy using. My work spans full-stack web, Android, and game development, but the throughline never changes: building seamless, user-friendly applications and digital experiences that feel alive. I care deeply about clean code, sharp UX, and shipping work that holds up in the real world.",
  "Outside of pure engineering, I'm a maker at heart — I edit, shoot photography, and produce videography, so the visuals always match the products I build. That blend earned 2nd place in the Politeknik Tempo University English Speech Contest (2023) and 3rd place in the FLS2N Short Movie Contest.",
];

// Gauge levels are illustrative — tweak freely.
export const SKILL_GAUGES = [
  { name: "WEB", level: 9 },
  { name: "BACKEND", level: 8 },
  { name: "MOBILE", level: 7 },
  { name: "CREATIVE", level: 8 },
];

export const TOOLKIT = [
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

export const PROJECTS = [
  {
    title: "P3R PORTFOLIO",
    tag: "In Progress",
    description:
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
    title: "E-TICKETING SYSTEM",
    tag: "Completed",
    description:
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
    title: "SHOULD I BUY IT?",
    tag: "Completed",
    description:
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
    title: "REACT NATIVE APP",
    tag: "Completed",
    description:
      "An Android app built in a team of three at SMK Strada Jakarta, sharpening collaboration, communication, and a genuinely user-friendly mobile experience from the ground up.",
    stack: ["React Native", "Android", "JavaScript"],
    links: [
      { label: "Demo", href: "https://www.youtube.com/watch?v=UXfdgU3EXvQ" },
    ],
  },
  {
    title: "F1 DRIVING EXPERIENCE",
    tag: "Completed",
    description:
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

export const EXPERIENCE = [
  {
    period: "MAY 2025 — NOW",
    role: "IT Project Development & Infrastructure Support",
    company: "PT Asuransi Artarindo · Full-time",
    detail:
      "Full Stack Developer and SQA on internal systems in Jakarta, applying full-stack development and design thinking on-site.",
  },
  {
    period: "JUL 2024 — DEC 2024",
    role: "Website Developer Intern",
    company: "PT Asuransi Artarindo · Internship",
    detail:
      "Six-month on-site internship focused on mobile application development in North Jakarta.",
  },
];

export const CONTACT_INTRO =
  "Have a project in mind or just want to say hello? Drop a line and let's talk.";
