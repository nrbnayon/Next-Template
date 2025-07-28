// next.config.ts;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["recharts"],
  images: {
    unoptimized: true,
    domains: ["cdn.lordicon.com"],
  },
  experimental: {
    optimizePackageImports: ["lordicon"],
  },
};

export default nextConfig;