import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/entries/:path*',
        destination: 'http://localhost:8000/entries/:path*',
      },
    ];
  },
};

export default nextConfig;
