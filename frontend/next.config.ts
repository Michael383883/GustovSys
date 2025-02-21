import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:8000'],
    loader: 'default',
  },
};

export default nextConfig;
