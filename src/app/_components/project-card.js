"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, TechChip } from "./p3r";

export function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
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
      <p className="mt-3 leading-relaxed">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech}>{tech}</TechChip>
        ))}
      </div>

      {expanded && (
        <div className="mt-4 border-l-4 border-[#ffd400] bg-[#eafbff] px-4 py-3">
          <p className="leading-relaxed">{project.longDescription}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-[#e60012]">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="font-display flex cursor-pointer items-center gap-2 text-lg text-[#0a2ec4] hover:underline"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0a2ec4] text-xs">
            Y
          </span>
          {expanded ? "Less" : "More"}
        </button>
        <Link
          href={`/projects/${project.slug}`}
          className="font-display flex items-center gap-2 text-lg text-[#e60012] hover:underline"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#e60012] text-xs">
            A
          </span>
          Full report
        </Link>
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
  );
}
