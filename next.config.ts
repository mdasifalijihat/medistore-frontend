import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["shombhob.com", "medeasy.health", "medexly.com"],
  },
};

export default nextConfig;
