const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize for performance
  experimental: {
    optimizeCss: true,
  },
  // Disable TypeScript checking in production
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint in production
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Apply PWA configuration first
const configWithPWA = withPWA(nextConfig);

// Then apply bundle analyzer
module.exports = withBundleAnalyzer(configWithPWA);
