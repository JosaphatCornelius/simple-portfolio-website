import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
