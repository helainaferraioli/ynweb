import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["uploadthing", "@uploadthing/react"],
  images: {
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
