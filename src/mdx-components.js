// Required by @next/mdx with the App Router. Maps MDX elements to
// P3R-themed markup so hand-written articles match the site.
const components = {
  h1: (props) => (
    <h1
      className="font-display mt-10 skew-x-[-8deg] text-4xl text-[var(--deep)] first:mt-0 md:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-8 skew-x-[-8deg] text-3xl text-[var(--deep)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display mt-6 skew-x-[-8deg] text-2xl text-[var(--cool-deep)]"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 text-base leading-relaxed md:text-lg" {...props} />,
  a: (props) => (
    <a
      className="font-bold text-[var(--accent)] underline decoration-2 underline-offset-2 hover:text-[var(--accent-soft)]"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed md:text-lg marker:text-[var(--accent)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed md:text-lg marker:font-bold marker:text-[var(--accent)]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 -skew-x-2 border-l-4 border-[var(--cool)] bg-[var(--paper-tint)] px-4 py-2 italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[var(--deep)]/10 px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--deep)]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto bg-[var(--navy)] p-4 text-sm leading-relaxed text-[var(--glow)] shadow-[6px_6px_0_rgba(var(--ink),0.35)] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[var(--glow)]"
      {...props}
    />
  ),
  hr: () => (
    <hr className="mt-8 h-1 -skew-x-12 border-0 bg-[linear-gradient(to_right,var(--accent),var(--accent-slash),transparent)]" />
  ),
};

export function useMDXComponents() {
  return components;
}
