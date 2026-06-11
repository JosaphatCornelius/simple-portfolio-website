const LETTERS = ["L", "O", "A", "D", "I", "N", "G"];

const SHARDS = [
  { top: "18%", left: "14%", width: 14, height: 30, color: "var(--accent-soft)", duration: 2.6, delay: 0 },
  { top: "70%", left: "20%", width: 12, height: 12, color: "var(--cool)", duration: 3.1, delay: -1.2 },
  { top: "26%", left: "78%", width: 10, height: 26, color: "var(--warn)", duration: 2.8, delay: -0.6 },
  { top: "64%", left: "82%", width: 16, height: 16, color: "var(--accent-soft)", duration: 3.4, delay: -2 },
  { top: "84%", left: "55%", width: 8, height: 22, color: "var(--glow)", duration: 2.4, delay: -1.6 },
  { top: "12%", left: "46%", width: 22, height: 8, color: "var(--deep)", duration: 3, delay: -0.3 },
];

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(172deg,var(--grad-a)_0%,var(--grad-b)_25%,var(--grad-c)_55%,var(--grad-d)_80%,var(--grad-e)_100%)]">
      {/* Light beam sweeping across the screen */}
      <div
        aria-hidden
        className="animate-loading-sweep absolute inset-y-0 left-0 w-[30%] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.22),rgba(160,240,255,0.3),transparent)]"
      />

      {/* Tumbling confetti shards */}
      {SHARDS.map((shard) => (
        <span
          key={`${shard.top}-${shard.left}`}
          aria-hidden
          className="animate-loading-shard absolute"
          style={{
            top: shard.top,
            left: shard.left,
            width: shard.width,
            height: shard.height,
            backgroundColor: shard.color,
            animationDuration: `${shard.duration}s`,
            animationDelay: `${shard.delay}s`,
          }}
        />
      ))}

      {/* Torn pink/white slash with the bouncing word on top */}
      <div className="relative -rotate-3 px-6">
        <span className="absolute -inset-x-10 inset-y-2 -rotate-2 bg-[var(--accent-slash)] [clip-path:polygon(4%_18%,100%_0,94%_88%,0_100%)]" />
        <span className="absolute -inset-x-8 inset-y-2 -rotate-2 bg-white [clip-path:polygon(3%_15%,100%_2%,95%_85%,0_98%)]" />
        <div className="relative flex items-end">
          {LETTERS.map((letter, index) => (
            <span
              key={index}
              className="block"
              style={{ transform: `skewX(-12deg) rotate(${index % 2 ? -4 : 3}deg)` }}
            >
              <span
                className="animate-loading-letter font-display block text-7xl text-[var(--accent)] [text-shadow:4px_4px_0_rgba(var(--ink-accent),0.3)] md:text-9xl"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Spinning diamond + status line, like a save screen indicator */}
      <div className="mt-12 flex items-center gap-4">
        <span className="animate-loading-diamond block h-5 w-5 rotate-45 border-4 border-[var(--cool)] shadow-[3px_3px_0_rgba(var(--ink),0.45)]" />
        <span className="text-sm font-bold tracking-[0.45em] text-[var(--glow)] [text-shadow:1px_1px_0_rgba(var(--ink),0.6)]">
          NOW LOADING
        </span>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="animate-loading-dot h-2 w-2 -skew-x-12 bg-[var(--warn)]"
              style={{ animationDelay: `${dot * 200}ms` }}
            />
          ))}
        </span>
      </div>

      {/* Bottom vignette to match the page backgrounds */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(var(--ink),0.6),transparent)]"
      />
    </div>
  );
}
