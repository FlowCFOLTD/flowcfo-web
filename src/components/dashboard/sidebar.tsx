'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/api/use-user';

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

type AnalysisItem = {
  label: string;
  href: string;
};

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'Cash Flow', href: '/dashboard/cash-flow', icon: 'payments' },
  {
    label: 'Transactions',
    href: '/dashboard/transactions',
    icon: 'receipt_long',
  },
  { label: 'Tax', href: '/dashboard/tax', icon: 'account_balance_wallet' },
  { label: 'Alerts', href: '/dashboard/alerts', icon: 'notifications' },
  { label: 'Agents', href: '/dashboard/agents', icon: 'robot_2' },
];

const freelancerAnalysis: AnalysisItem[] = [
  { label: 'Income Volatility', href: '/dashboard/analysis/income-volatility' },
  { label: 'Client Concentration', href: '/dashboard/analysis/client-concentration' },
  { label: 'Tax Readiness', href: '/dashboard/analysis/tax-readiness' },
  { label: 'Rate Analysis', href: '/dashboard/analysis/rate-analysis' },
];

const startupAnalysis: AnalysisItem[] = [
  { label: 'Burn Rate', href: '/dashboard/analysis/burn-rate' },
  { label: 'Runway', href: '/dashboard/analysis/runway' },
  { label: 'Unit Economics', href: '/dashboard/analysis/unit-economics' },
];

const agencyAnalysis: AnalysisItem[] = [
  {
    label: 'Client Profitability',
    href: '/dashboard/analysis/client-profitability',
  },
  {
    label: 'Revenue Diversification',
    href: '/dashboard/analysis/revenue-diversification',
  },
];

const restaurantAnalysis: AnalysisItem[] = [
  { label: 'Daily Revenue', href: '/dashboard/analysis/daily-revenue' },
  { label: 'Food Cost', href: '/dashboard/analysis/food-cost' },
  { label: 'Labor Cost', href: '/dashboard/analysis/labor-cost' },
];

const ecommerceAnalysis: AnalysisItem[] = [
  { label: 'Gross Margin', href: '/dashboard/analysis/gross-margin' },
  { label: 'Platform Fees', href: '/dashboard/analysis/platform-fees' },
  { label: 'Inventory Health', href: '/dashboard/analysis/inventory-health' },
  { label: 'COGS Trends', href: '/dashboard/analysis/cogs-trends' },
  { label: 'Seasonal Patterns', href: '/dashboard/analysis/seasonal-patterns' },
  { label: 'Payouts', href: '/dashboard/analysis/payouts' },
];

const ecommerceTools: AnalysisItem[] = [
  { label: 'Pricing Calculator', href: '/dashboard/tools/pricing' },
  { label: 'Breakeven ROAS', href: '/dashboard/tools/breakeven-roas' },
  { label: 'Spend Decision', href: '/dashboard/tools/spend-decision' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useUser();

  const analysisItems =
    user?.business_type === 'startup'
      ? startupAnalysis
      : user?.business_type === 'agency'
        ? agencyAnalysis
        : user?.business_type === 'restaurant'
          ? restaurantAnalysis
          : user?.business_type === 'ecommerce'
            ? ecommerceAnalysis
            : freelancerAnalysis;

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-flow-black flex flex-col py-8 border-r border-flow-line-dark z-50">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-dark.svg"
            alt="FlowCFO"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <h1 className="font-display text-2xl font-bold text-flow-gold">
            FlowCFO
          </h1>
        </div>
        <p className="flow-label text-[9px] text-flow-muted tracking-[0.2em] mt-1">
          YOUR BUSINESS, YOUR NUMBERS
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {mainNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-all duration-200 ${
                active
                  ? 'text-flow-gold font-bold border-l-4 border-flow-gold bg-white/5'
                  : 'text-flow-muted hover:text-flow-gold hover:bg-white/5 border-l-4 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-8 pb-2 px-4">
          <h3 className="flow-label text-[10px] text-flow-muted uppercase tracking-[0.15em]">
            {user?.business_type === 'startup'
              ? 'Startup Metrics'
              : user?.business_type === 'agency'
                ? 'Agency Metrics'
                : user?.business_type === 'restaurant'
                  ? 'Restaurant Metrics'
                  : user?.business_type === 'ecommerce'
                    ? 'E-commerce Metrics'
                    : 'Analysis'}
          </h3>
        </div>

        {analysisItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-all duration-200 ${
                active
                  ? 'text-flow-gold font-bold border-l-4 border-flow-gold bg-white/5'
                  : 'text-flow-muted hover:text-flow-gold hover:bg-white/5 border-l-4 border-transparent'
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}

        {user?.business_type === 'ecommerce' && (
          <>
            <div className="pt-8 pb-2 px-4">
              <h3 className="flow-label text-[10px] text-flow-muted uppercase tracking-[0.15em]">
                Tools
              </h3>
            </div>
            {ecommerceTools.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-all duration-200 ${
                    active
                      ? 'text-flow-gold font-bold border-l-4 border-flow-gold bg-white/5'
                      : 'text-flow-muted hover:text-flow-gold hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                >
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="px-4 mt-auto pt-6 border-t border-flow-line-dark/40">
        <Link
          href="/dashboard/settings/accounts"
          className={`flex items-center gap-3 px-2 py-3 transition-colors duration-200 ${
            pathname.startsWith('/dashboard/settings')
              ? 'text-flow-gold'
              : 'text-flow-muted hover:text-flow-gold'
          }`}
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span className="font-body text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
