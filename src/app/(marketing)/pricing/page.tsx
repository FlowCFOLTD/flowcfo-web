import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Pricing from './pricing';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO Pricing — Personal, SME and enterprise plans',
  description:
    'Explore indicative FlowCFO pricing for personal finance guidance, small-business cash-flow intelligence and enterprise API deployments.',
  path: '/pricing',
  keywords: ['FlowCFO pricing', 'AI CFO pricing', 'virtual CFO software pricing'],
});

export default function PricingPage() {
  return <Pricing />;
}
