// Required by @next/mdx with the App Router. Maps MDX elements to
// P3R-themed markup so hand-written articles match the site.
const components = {
  h1: (props) => (
    <h1
      className="font-display mt-10 skew-x-[-8deg] text-4xl text-[#0a2ec4] first:mt-0 md:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-8 skew-x-[-8deg] text-3xl text-[#0a2ec4]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display mt-6 skew-x-[-8deg] text-2xl text-[#1f8de0]"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 text-base leading-relaxed md:text-lg" {...props} />,
  a: (props) => (
    <a
      className="font-bold text-[#e60012] underline decoration-2 underline-offset-2 hover:text-[#ff2d78]"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed md:text-lg marker:text-[#e60012]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed md:text-lg marker:font-bold marker:text-[#e60012]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 -skew-x-2 border-l-4 border-[#2de1ff] bg-[#eafbff] px-4 py-2 italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[#0a2ec4]/10 px-1.5 py-0.5 font-mono text-[0.9em] text-[#0a2ec4]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto bg-[#03124d] p-4 text-sm leading-relaxed text-[#9ff0ff] shadow-[6px_6px_0_rgba(3,18,110,0.35)] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[#9ff0ff]"
      {...props}
    />
  ),
  hr: () => (
    <hr className="mt-8 h-1 -skew-x-12 border-0 bg-[linear-gradient(to_right,#e60012,#ff6ea8,transparent)]" />
  ),
};

export function useMDXComponents() {
  return components;
}
