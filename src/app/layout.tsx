import type { Metadata } from 'next';
import { Sora, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/query-provider';
import { siteUrl } from '@/lib/seo';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'FlowCFO — AI Virtual CFO for Small Business Cash Flow',
    template: '%s | FlowCFO',
  },
  description:
    'FlowCFO is an AI virtual CFO for ecommerce brands, freelancers, agencies, restaurants, and startups. Forecast cash flow, calculate tax reserves, monitor margins, and know your Safe-to-Spend number.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowCFO',
    title: 'FlowCFO — AI Virtual CFO for Small Business Cash Flow',
    description:
      'Know what you can safely spend today. FlowCFO combines cash flow forecasting, tax reserves, margin monitoring, and vertical AI agents for modern small businesses.',
    url: siteUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FlowCFO — Vertical AI Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowCFO — AI Virtual CFO for Small Business Cash Flow',
    description:
      'Forecast cash flow, calculate tax reserves, monitor margins, and know your Safe-to-Spend number.',
    images: ['/og-image.png'],
  },
  keywords: [
    'AI CFO',
    'vertical AI agents',
    'ecommerce financial software',
    'autonomous finance platform',
    'cash flow forecasting AI',
    'gross margin monitoring tool',
    'freelancer tax planning AI',
    'agency profitability tracking',
    'restaurant food cost AI',
    'startup burn rate monitoring',
    'safe to spend calculator',
    'AI bookkeeping for small business',
    'platform fee tracking ecommerce',
    'inventory replenishment AI',
    'virtual CFO for entrepreneurs',
  ],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased">
        <QueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
