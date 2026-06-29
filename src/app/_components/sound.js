"use client";

import { useEffect, useState } from "react";

// Tiny WebAudio synth for P3R-style UI blips — no audio assets. Sounds are
// OFF by default; the flag lives in localStorage and module state so any
// component (PageFlight, menus) can fire a sound without a provider.

const STORAGE_KEY = "sound-enabled";

let enabled = false;
let audioContext = null;

if (typeof window !== "undefined") {
  enabled = localStorage.getItem(STORAGE_KEY) === "true";
}

// AudioContext must be created (or resumed) inside a user gesture, or the
// browser leaves it suspended and logs autoplay warnings. Every playSound
// call site is a click/hover handler, so creating it lazily here is safe.
function getContext() {
  if (!audioContext) {
    const Context = window.AudioContext ?? window.webkitAudioContext;
    if (!Context) return null;
    audioContext = new Context();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function tone(context, { type, from, to, duration, delay = 0, peak = 0.08 }) {
  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(peak, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

const SOUNDS = {
  // Menu hover: short high tick.
  blip: (context) =>
    tone(context, { type: "square", from: 1400, to: 1800, duration: 0.06, peak: 0.04 }),
  // Confirm/select: two-note rising chirp.
  select: (context) => {
    tone(context, { type: "square", from: 700, to: 900, duration: 0.07, peak: 0.06 });
    tone(context, { type: "square", from: 1100, to: 1500, duration: 0.09, delay: 0.07, peak: 0.06 });
  },
  // Page transition: descending whoosh.
  whoosh: (context) =>
    tone(context, { type: "sawtooth", from: 900, to: 120, duration: 0.35, peak: 0.05 }),
};

export function playSound(name) {
  if (!enabled) return;
  const context = getContext();
  if (!context) return;
  SOUNDS[name]?.(context);
}

export function SoundToggle() {
  const [on, setOn] = useState(false);

  // localStorage isn't readable during SSR; sync after mount.
  useEffect(() => {
    setOn(enabled);
  }, []);

  function toggle() {
    enabled = !enabled;
    setOn(enabled);
    localStorage.setItem(STORAGE_KEY, String(enabled));
    if (enabled) playSound("select");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn UI sounds off" : "Turn UI sounds on"}
      title={on ? "Sound: on" : "Sound: off"}
      className="font-display fixed bottom-4 left-4 z-40 -skew-x-6 border-2 border-white/70 bg-[#03124d]/80 px-3 py-1 text-sm tracking-widest text-white shadow-[3px_3px_0_rgba(3,18,110,0.5)] transition-colors hover:bg-[#03124d] lg:bottom-6 lg:left-6"
    >
      <span className="block skew-x-6">{on ? "♪ ON" : "♪ OFF"}</span>
    </button>
  );
}
