import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["uploadthing", "@uploadthing/react"],
  images: {
    // Vercel's free tier caps image optimization; serve images as-is instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.instagram.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
