import type { Metadata } from 'next';
import { Sora, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/query-provider';

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
    default: 'FlowCFO — Vertical AI Agents for Ecommerce, Freelancers, Startups & More',
    template: '%s | FlowCFO',
  },
  description:
    'FlowCFO gives you vertical AI agents that monitor your margins, cash flow, tax reserves, and safe-to-spend — purpose-built for ecommerce brands, freelancers, agencies, restaurants, and startups. Autonomous financial monitoring with human approval.',
  metadataBase: new URL('https://flowcfo.net'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowCFO',
    title: 'FlowCFO — AI-Powered Financial Agents for Every Business Model',
    description:
      'Vertical AI agents that watch your finances continuously. Margin protection, burn alerts, inventory replenishment, fee auditing, and tax automation — built for how your business actually works.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FlowCFO — Vertical AI Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowCFO — Vertical AI Agents for Your Business Finances',
    description:
      'AI agents for ecommerce margins, freelancer taxes, agency profitability, restaurant food cost, and startup burn rate. Autonomous monitoring. Human approval.',
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
