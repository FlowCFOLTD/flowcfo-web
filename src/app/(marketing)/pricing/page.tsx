import type { Metadata } from 'next';
import Pricing from './pricing';

export const metadata: Metadata = {
  title: 'FlowCFO Pricing | Institutional-Grade Financial Command for Founders',
  description:
    'Choose the plan that fits your growth. From solo freelancers to multi-entity agencies, get the real-time financial intelligence you need to scale with absolute confidence.',
  openGraph: {
    title: 'FlowCFO Pricing | Financial Intelligence for Modern Builders',
    description:
      'Stop flying blind. Choose a FlowCFO plan and get the proactive command center your business deserves. Real-time margins, tax reserves, and Safe-to-Spend™ clarity.',
    type: 'website',
    url: 'https://flowcfo.net/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowCFO Pricing | Command Your Cash Flow',
    description:
      'Precision financial intelligence for founders who refuse to fly blind. Choose your plan and start scaling with clarity.',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
