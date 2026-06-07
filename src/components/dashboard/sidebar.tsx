'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/api/use-user';
import { authClient } from '@/lib/auth-client';

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
  { label: 'Seasonal Patterns', href: '/dashboard/analysis/seasonal-patterns' },
  { label: 'Payouts', href: '/dashboard/analysis/payouts' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await authClient.signOut();
    router.push('/signin');
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
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 px-2 py-4 mt-1 border-t border-flow-line-dark/20 w-full hover:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 bg-flow-gold/20 flex items-center justify-center text-flow-gold font-bold text-xs rounded-full">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-body text-xs font-bold text-white truncate w-40">
                {user?.full_name || 'User'}
              </span>
              <span className="font-body text-[9px] text-flow-muted uppercase tracking-wider">
                {user?.plan === 'premium' ? 'PREMIUM' : 'FREE TRIAL'}
              </span>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-1 bg-flow-black border border-flow-line-dark shadow-xl">
              <Link
                href="/dashboard/settings/accounts?tab=profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-flow-muted hover:text-flow-gold hover:bg-white/5 transition-colors font-body text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  person
                </span>
                Profile
              </Link>
              <Link
                href="/dashboard/settings/accounts?tab=security"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-flow-muted hover:text-flow-gold hover:bg-white/5 transition-colors font-body text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  security
                </span>
                Security
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-red-500/10 transition-colors font-body text-sm w-full text-left border-t border-flow-line-dark/20"
              >
                <span className="material-symbols-outlined text-lg">
                  logout
                </span>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
