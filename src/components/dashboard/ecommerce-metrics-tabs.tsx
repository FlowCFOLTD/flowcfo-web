'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: 'Gross Margin', href: '/dashboard/analysis/gross-margin' },
  { label: 'Platform Fees', href: '/dashboard/analysis/platform-fees' },
  { label: 'Inventory Health', href: '/dashboard/analysis/inventory-health' },
  { label: 'Seasonal Patterns', href: '/dashboard/analysis/seasonal-patterns' },
  { label: 'Payouts', href: '/dashboard/analysis/payouts' },
];

export default function EcommerceMetricsTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-6 border-b border-white/10 pb-0 overflow-x-auto">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <button
            key={tab.href}
            onClick={() => router.push(tab.href)}
            className={`pb-3 font-label-caps text-label-caps transition-all whitespace-nowrap ${
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
