"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "palette";
const PALETTES = ["p3", "p4", "p5"];

export function PaletteToggle() {
  const [palette, setPalette] = useState("p3");

  // The pre-paint script in the layout already applied the stored palette;
  // this just syncs the button label after hydration.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (PALETTES.includes(stored)) setPalette(stored);
  }, []);

  function cycle() {
    const next =
      PALETTES[(PALETTES.indexOf(palette) + 1) % PALETTES.length];
    setPalette(next);
    localStorage.setItem(STORAGE_KEY, next);
    if (next === "p3") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = next;
    }
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch color palette (current: ${palette.toUpperCase()})`}
      title="Switch palette"
      className="font-display fixed bottom-4 left-4 z-40 -skew-x-6 border-2 border-white/70 bg-[var(--navy)]/80 px-3 py-1 text-sm tracking-widest text-white shadow-[3px_3px_0_rgba(var(--ink),0.5)] transition-colors hover:bg-[var(--navy)] lg:bottom-6 lg:left-6"
    >
      <span className="block skew-x-6">◆ {palette.toUpperCase()}</span>
    </button>
  );
}
