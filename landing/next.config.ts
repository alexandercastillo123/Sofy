import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  experimental: {
    cpus: 1
  }
};

export default nextConfig;

