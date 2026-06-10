"use client";

import Link from "next/link";
import { ViewTransition, useEffect, useState } from "react";
import { PROFILE } from "./data";

export const MENU_COLORS = [
  "#c4f5ff",
  "#8eeaff",
  "#5cd5fb",
  "#39b4f1",
  "#2b91e8",
  "#2b76e0",
];
export const MENU_OFFSETS = [0, 36, 6, 48, 20, 40];
export const MENU_TILTS = [-2, -1.5, -2.5, -1, -2, -1.5];

const MENU_LINKS = [
  { label: "HOME", href: "/#home" },
  { label: "ABOUT", href: "/#about" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "CONTACT", href: "/#contact" },
  { label: "ARTICLES", href: "/articles" },
];

// Staircase silhouette path, ascending left-to-right like the menu background.
const stairPath = (() => {
  let d = "M 0 780";
  for (let i = 0; i < 26; i++) {
    const y = 780 - (i + 1) * 30;
    d += ` L ${i * 26} ${y} L ${(i + 1) * 26} ${y}`;
  }
  return d + " L 676 780 Z";
})();

const CAUSTIC_TILE_A =
  "radial-gradient(ellipse 130px 65px at 30% 35%, rgba(150,245,255,0.30), transparent 70%)," +
  "radial-gradient(ellipse 90px 55px at 70% 20%, rgba(180,255,255,0.22), transparent 70%)," +
  "radial-gradient(ellipse 110px 45px at 55% 75%, rgba(120,230,255,0.26), transparent 70%)";

const CAUSTIC_TILE_B =
  "radial-gradient(ellipse 160px 70px at 25% 60%, rgba(140,240,255,0.20), transparent 70%)," +
  "radial-gradient(ellipse 100px 60px at 80% 40%, rgba(170,255,255,0.16), transparent 70%)";

const BUBBLES = [
  { left: "12%", size: 10, duration: 16, delay: -3 },
  { left: "28%", size: 6, duration: 22, delay: -12 },
  { left: "45%", size: 14, duration: 14, delay: -7 },
  { left: "58%", size: 8, duration: 19, delay: -1 },
  { left: "70%", size: 5, duration: 24, delay: -16 },
  { left: "84%", size: 12, duration: 15, delay: -9 },
  { left: "93%", size: 7, duration: 21, delay: -5 },
];

export function Background({ activeLabel }) {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Underwater gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(172deg,#2adcf9_0%,#13a5ef_25%,#0b55dc_55%,#0729ad_80%,#041672_100%)]" />

      {/* Flowing caustic sheets: oversized tiled layers panning in opposing
          directions; pan distance matches the tile so the loop is seamless */}
      <div
        className="animate-caustic-pan-a absolute -inset-[60%] mix-blend-screen"
        style={{
          backgroundImage: CAUSTIC_TILE_A,
          backgroundSize: "440px 380px",
        }}
      />
      <div
        className="animate-caustic-pan-b absolute -inset-[60%] mix-blend-screen"
        style={{
          backgroundImage: CAUSTIC_TILE_B,
          backgroundSize: "560px 460px",
        }}
      />

      {/* Light rays from the surface, swaying slowly */}
      <div className="animate-ray absolute -top-1/4 left-[35%] h-[120%] w-40 rotate-[22deg] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_70%)] blur-xl" />
      <div className="animate-ray absolute -top-1/4 left-[55%] h-[120%] w-64 rotate-[22deg] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),transparent_65%)] blur-2xl [animation-delay:2s,5s]" />
      <div className="animate-ray absolute -top-1/4 left-[78%] h-[120%] w-32 rotate-[22deg] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),transparent_70%)] blur-xl [animation-delay:8s,3s]" />

      {/* Water-surface caustics along the top */}
      <div className="animate-caustic absolute -top-24 right-0 left-1/4 h-72 bg-[radial-gradient(ellipse_18%_42%_at_30%_30%,rgba(170,255,255,0.55),transparent),radial-gradient(ellipse_22%_38%_at_55%_20%,rgba(140,245,255,0.5),transparent),radial-gradient(ellipse_16%_45%_at_78%_35%,rgba(170,255,255,0.45),transparent),radial-gradient(ellipse_25%_40%_at_92%_25%,rgba(140,245,255,0.4),transparent)] blur-md" />
      <div className="animate-caustic absolute top-1/3 right-0 h-96 w-1/2 bg-[radial-gradient(ellipse_30%_40%_at_60%_50%,rgba(45,225,255,0.18),transparent)] blur-2xl [animation-delay:5s]" />

      {/* Rising bubbles */}
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.left}
          className="animate-bubble absolute -bottom-8 rounded-full bg-white/25 blur-[1px]"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* Ascending staircase silhouette */}
      <svg
        className="absolute bottom-0 left-[38%] h-[92%] w-auto opacity-40"
        viewBox="0 0 676 780"
        preserveAspectRatio="xMidYMax meet"
      >
        <path d={stairPath} fill="rgba(3,18,110,0.55)" />
        <path
          d={stairPath}
          fill="none"
          stroke="rgba(120,220,255,0.35)"
          strokeWidth="2"
        />
      </svg>

      {/* White wedge on the left with torn diagonal edge */}
      <div className="absolute inset-y-0 left-0 hidden w-[44%] lg:block">
        <div className="absolute inset-0 bg-white [clip-path:polygon(0_0,96%_0,30%_100%,0_100%)]" />
        <div className="absolute inset-0 bg-[#bff1ff] opacity-70 [clip-path:polygon(96%_0,100%_0,34%_100%,30%_100%)]" />

        {/* Scattered shards, like the menu's confetti fragments */}
        <div className="absolute top-[16%] left-[52%] h-5 w-3 -rotate-[24deg] bg-[#ff2d78]" />
        <div className="absolute top-[34%] left-[60%] h-3 w-3 rotate-[40deg] bg-[#2d50ff]" />
        <div className="absolute top-[58%] left-[34%] h-6 w-2 -rotate-[12deg] bg-[#ff2d78] opacity-80" />
        <div className="absolute top-[72%] left-[18%] h-3 w-4 rotate-[18deg] bg-[#9be8ff]" />
        <div className="absolute top-[24%] left-[27%] h-2 w-6 -rotate-[30deg] bg-black/80" />

        {/* Giant glitched letters spelling the active section; sized so the
            whole word fits the viewport height regardless of length */}
        <div className="absolute -top-6 left-2 select-none">
          {activeLabel.split("").map((letter, index, letters) => (
            <span
              key={`${activeLabel}-${index}`}
              className="font-display block leading-[0.74] text-black"
              style={{
                fontSize: `${Math.min(19, 98 / (letters.length * 0.74))}vh`,
                transform: `skewX(-14deg) rotate(${index % 2 ? -7 : 5}deg) translateX(${
                  (index % 3) * 26
                }px)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(2,8,60,0.6),transparent)]" />
    </div>
  );
}

export function WalletBox() {
  return (
    <ViewTransition enter="vt-wallet" exit="vt-wallet" default="none">
      <Link
        href="/"
        className="fixed top-4 left-4 z-40 border-2 border-black bg-white px-3 py-1.5 text-black shadow-[4px_4px_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 lg:top-6 lg:left-6 lg:border-[3px] lg:px-5 lg:py-2 lg:shadow-[6px_6px_0_rgba(0,0,0,0.25)]"
      >
        <div className="font-display text-base tracking-wide lg:text-2xl">
          ¥ {PROFILE.name}
        </div>
        <div className="text-[9px] font-bold tracking-widest lowercase lg:text-[11px]">
          {PROFILE.role.toLowerCase()}
        </div>
      </Link>
    </ViewTransition>
  );
}

export function SocialChips() {
  return (
    <ViewTransition enter="vt-social" exit="vt-social" default="none">
      <div className="fixed top-6 right-6 z-40 hidden flex-col gap-6 lg:flex">
        {PROFILE.socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            title={social.name}
            className="group flex flex-col items-end gap-1.5"
          >
            <span className="font-display flex h-14 w-14 -skew-x-6 items-center justify-center bg-[linear-gradient(135deg,#9ff0ff,#1f8de0)] text-xl text-[#03124d] shadow-[4px_4px_0_rgba(0,10,80,0.45)] transition-transform group-hover:-translate-y-1">
              <span className="skew-x-6">{social.label}</span>
            </span>
            <span className="h-3 w-20 -skew-x-12 bg-[#1450d8] p-0.5 shadow-[3px_3px_0_rgba(0,10,80,0.45)]">
              <span className="flex h-full w-full flex-col justify-between">
                <span className="h-[3px] w-3/4 bg-[#2de1ff]" />
                <span className="h-[3px] w-1/2 bg-[#ffd400]" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </ViewTransition>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <ViewTransition enter="vt-burger" exit="vt-burger" default="none">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 flex h-12 w-12 -skew-x-6 flex-col items-center justify-center gap-1.5 border-2 border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,0.35)]"
        >
          <span className="h-[3px] w-6 -skew-x-12 bg-black" />
          <span className="ml-1 h-[3px] w-6 -skew-x-12 bg-black" />
          <span className="h-[3px] w-6 -skew-x-12 bg-black" />
        </button>
      </ViewTransition>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center overflow-hidden bg-[linear-gradient(160deg,rgba(13,60,200,0.97)_0%,rgba(4,22,110,0.98)_100%)] px-10">
          {/* Echo of the white wedge so the overlay reads as the game menu */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-24 bg-white/10 [clip-path:polygon(0_0,100%_0,20%_100%,0_100%)]"
          />
          <ul className="relative flex flex-col gap-3">
            {MENU_LINKS.map((item, index) => (
              <li
                key={item.label}
                style={{
                  marginLeft: MENU_OFFSETS[index] * 0.6,
                  transform: `rotate(${MENU_TILTS[index]}deg)`,
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block skew-x-[-12deg] text-4xl tracking-wide"
                  style={{
                    color: MENU_COLORS[index],
                    textShadow: "3px 4px 0 rgba(3,18,110,0.45)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-display absolute right-8 bottom-10 flex items-center gap-2 text-2xl text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-base">
              B
            </span>
            <span className="skew-x-[-8deg] [text-shadow:2px_2px_0_rgba(3,18,110,0.5)]">
              Close
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <div className="relative mb-8 inline-block md:mb-10">
      <span className="absolute -inset-x-6 inset-y-0 -rotate-2 bg-[#ff6ea8] [clip-path:polygon(4%_18%,100%_0,94%_88%,0_100%)]" />
      <span className="absolute -inset-x-5 inset-y-0 -rotate-2 bg-white [clip-path:polygon(3%_15%,100%_2%,95%_85%,0_98%)]" />
      <h2 className="font-display relative skew-x-[-12deg] px-2 text-4xl text-[#e60012] [text-shadow:2px_2px_0_rgba(120,0,10,0.25)] md:text-6xl">
        {children}
      </h2>
    </div>
  );
}

export function Card({ children, className = "" }) {
  // Shear displacement grows with element height, so tall mobile cards get a
  // gentler skew; content corners would otherwise cross the card edge.
  return (
    <div
      className={`-skew-x-1 border-l-8 border-[#2de1ff] bg-white text-[#0c1430] shadow-[10px_10px_0_rgba(3,18,110,0.45)] md:-skew-x-3 ${className}`}
    >
      <div className="skew-x-1 p-5 md:skew-x-3 md:p-8">{children}</div>
    </div>
  );
}
