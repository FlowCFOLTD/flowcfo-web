import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Pricing from './pricing';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO Pricing — AI CFO Plans for Small Businesses',
  description:
    'Compare FlowCFO plans for freelancers, ecommerce sellers, agencies, restaurants, and startups. Get Safe-to-Spend clarity, AI agents, tax reserves, and cash flow forecasts.',
  path: '/pricing',
  keywords: ['FlowCFO pricing', 'AI CFO pricing', 'virtual CFO software pricing'],
});

export default function PricingPage() {
  return <Pricing />;
}
