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
    default: 'FlowCFO — Know Exactly What You Can Spend Today',
    template: '%s | FlowCFO',
  },
  description:
    'FlowCFO is your AI-powered virtual CFO. It predicts your cash flow, calculates your tax reserves, and tells you exactly what you can safely spend — today and 90 days from now.',
  metadataBase: new URL('https://flowcfo.net'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowCFO',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FlowCFO' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
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
