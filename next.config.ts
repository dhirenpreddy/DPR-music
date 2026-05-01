import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replace '192.168.0.108' with your computer's actual IPv4 address
  allowedDevOrigins: ['192.168.0.108'], 
  output: 'export',
  // Required for static image loading and deployment
  images: {
    unoptimized: true,
  },
  
  // Ensures the app works correctly when viewed on mobile browsers
  experimental: {
    // Only add experimental flags if you are using specific Next.js 16 features
  }
};

export default nextConfig;