import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async rewrites() {
    return [
      { source: "/Projects/:path*", destination: "/project-shots/:path*" },
      { source: "/projects/:path*", destination: "/project-shots/:path*" },
    ];
  },
};

export default nextConfig;
