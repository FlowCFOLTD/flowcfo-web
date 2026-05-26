'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: 'Client Profitability', href: '/dashboard/analysis/client-profitability' },
  { label: 'Revenue Diversification', href: '/dashboard/analysis/revenue-diversification' },
];

export default function AgencyMetricsTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-6 border-b border-white/10 pb-0">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <button
            key={tab.href}
            onClick={() => router.push(tab.href)}
            className={`pb-3 font-label-caps text-label-caps transition-all ${
              active
                ? 'text-flow-gold font-bold border-b-2 border-flow-gold'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
