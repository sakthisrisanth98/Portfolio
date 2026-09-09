import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 828, 1080, 1280],
    imageSizes: [48, 64, 96, 128, 256],
  },
  compress: true,
  async rewrites() {
    return [
      { source: "/Projects/:path*", destination: "/project-shots/:path*" },
      { source: "/projects/:path*", destination: "/project-shots/:path*" },
    ];
  },
};

export default nextConfig;
