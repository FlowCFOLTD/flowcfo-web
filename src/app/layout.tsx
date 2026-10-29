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
    default: 'FlowCFO — Financial intelligence for people and businesses',
    template: '%s | FlowCFO',
  },
  description:
    'FlowCFO turns financial activity into useful guidance for consumers and small businesses, with APIs for banks and platforms to embed financial intelligence.',
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
    title: 'FlowCFO — Financial intelligence for people and businesses',
    description:
      'FlowCFO helps consumers understand spending and commitments, helps SMEs anticipate cash-flow pressure, and gives partners APIs to embed financial guidance.',
    url: siteUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FlowCFO financial intelligence for people, SMEs and platforms' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowCFO — Financial intelligence for people and businesses',
    description:
      'Useful financial insights for consumers and SMEs, delivered directly or through partner APIs.',
    images: ['/og-image.png'],
  },
  keywords: [
    'AI CFO',
    'consumer financial insights',
    'small business cash flow intelligence',
    'banking financial intelligence API',
    'SME cash flow forecasting',
    'embedded financial guidance',
  ],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
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
