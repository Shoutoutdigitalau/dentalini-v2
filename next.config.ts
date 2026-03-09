import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ["localhost", 'dentalini-cms.cwmgenai.com', 'lh3.googleusercontent.com'],
  }
};

export default nextConfig;
