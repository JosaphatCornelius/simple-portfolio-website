import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  // Plugins must be string names (not imported functions) so Turbopack can
  // serialize them to its workers.
  options: {
    rehypePlugins: ["rehype-slug", "rehype-highlight"],
  },
});

export default withMDX(nextConfig);
