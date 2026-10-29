import type { NextConfig } from 'next';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const apiUrl =
  rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://')
    ? rawApiUrl
    : `http://${rawApiUrl}`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/spreadsheet-vs-accounting-software-vs-bank-feed",
        destination: "/blog/xero-vs-float-vs-flowcfo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
