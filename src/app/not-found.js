import Link from "next/link";
import { Background, WalletBox } from "./_components/p3r";

export const metadata = {
  title: "404 — GAME OVER",
  description: "This page has been lost to the sea.",
};

const LETTERS = ["G", "A", "M", "E", " ", "O", "V", "E", "R"];

export default function NotFound() {
  return (
    <div className="relative">
      <Background activeLabel="LOST" />
      <WalletBox />

      <main className="fly fly-main relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <p className="font-display skew-x-[-10deg] text-xl tracking-[0.3em] text-[#9ff0ff] [text-shadow:2px_2px_0_rgba(3,18,110,0.6)]">
          ERROR 404
        </p>

        {/* Torn pink/white slash with the verdict on top, like the loading screen */}
        <div className="relative mt-6 -rotate-3 px-8 py-2">
          <span className="absolute -inset-x-10 inset-y-3 -rotate-2 bg-[#ff6ea8] [clip-path:polygon(4%_18%,100%_0,94%_88%,0_100%)]" />
          <span className="absolute -inset-x-8 inset-y-3 -rotate-2 bg-white [clip-path:polygon(3%_15%,100%_2%,95%_85%,0_98%)]" />
          <h1 className="relative flex items-end justify-center">
            {LETTERS.map((letter, index) => (
              <span
                key={index}
                className="font-display block text-5xl text-[#e60012] [text-shadow:4px_4px_0_rgba(120,0,10,0.3)] md:text-8xl"
                style={{
                  transform: `skewX(-12deg) rotate(${index % 2 ? -4 : 3}deg)`,
                  minWidth: letter === " " ? "0.4em" : undefined,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <p className="mt-10 max-w-md text-base leading-relaxed text-white/90 [text-shadow:1px_1px_0_rgba(3,18,110,0.6)] md:text-lg">
          The page you were looking for sank without a trace. Pick yourself up
          and head back to the entrance.
        </p>

        <Link
          href="/"
          className="font-display mt-10 inline-block -skew-x-6 bg-[#e60012] px-8 py-3 text-2xl text-white shadow-[6px_6px_0_rgba(120,0,10,0.3)] transition-transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-base">
              A
            </span>
            CONTINUE?
          </span>
        </Link>
      </main>
    </div>
  );
}
