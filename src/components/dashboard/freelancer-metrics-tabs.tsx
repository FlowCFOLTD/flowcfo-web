'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Income Volatility', href: '/dashboard/analysis/income-volatility' },
  { label: 'Client Concentration', href: '/dashboard/analysis/client-concentration' },
  { label: 'Tax Readiness', href: '/dashboard/analysis/tax-readiness' },
  { label: 'Rate Analysis', href: '/dashboard/analysis/rate-analysis' },
];

export default function FreelancerMetricsTabs() {
  const pathname = usePathname();

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex gap-6 md:gap-8">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flow-label pb-4 transition-colors whitespace-nowrap ${
              isActive
                ? 'text-white border-b-2 border-flow-gold'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
