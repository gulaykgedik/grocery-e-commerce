import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ibb.co" }],
  },
  /* config options here */
};

export default nextConfig;
