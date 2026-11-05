import type { NextConfig } from 'next';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const apiUrl =
  rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://')
    ? rawApiUrl
    : `http://${rawApiUrl}`;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async rewrites() {
    const rules = [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
    if (process.env.NODE_ENV !== 'production') {
      rules.push({
        source: '/product-api/:path*',
        destination: `${process.env.PRODUCT_API_DEV_PROXY_TARGET || 'https://api.flowcfo.net'}/:path*`,
      });
    }
    return rules;
  },
  async redirects() {
    return [
      {
        source: '/blog/spreadsheet-vs-accounting-software-vs-bank-feed',
        destination: '/blog/xero-vs-float-vs-flowcfo',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
