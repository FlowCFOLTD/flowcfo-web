'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Landmark, ArrowRight, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react';
import UserAvatarButton from '@/components/dashboard/user-avatar-button';
import { useUser } from '@/hooks/api/use-user';
import { useEcommerceDashboard } from '@/hooks/api/use-ecommerce';
import { apiClient } from '@/lib/api-client';
import { SlowWeekContextData } from '@/lib/api/ecommerce';
import SafeToSpendCard from '@/components/dashboard/safe-to-spend-card';
import CashFlowChart from '@/components/dashboard/cash-flow-chart';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import TaxReserveGauge from '@/components/dashboard/tax-reserve-gauge';
import ActiveAlerts from '@/components/dashboard/active-alerts';
import MarketInsightCard from '@/components/dashboard/market-insight-card';
import AIInsightCards from '@/components/dashboard/ai-insight-cards';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
    </div>
  );
}

export default function EcommerceDashboardPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: dash, isLoading: dashLoading } = useEcommerceDashboard();
  const [slowWeek, setSlowWeek] = useState<SlowWeekContextData | null>(null);

  useEffect(() => {
    if (user?.bank_synced) {
      apiClient<SlowWeekContextData>('/api/v1/verticals/ecommerce/slow-week-context')
        .then((data) => { if (data.is_slow_week) setSlowWeek(data); })
        .catch(() => {});
    }
  }, [user?.bank_synced]);

  if (userLoading || dashLoading) return <LoadingSpinner />;

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-white tracking-tight">
              Welcome{user?.full_name ? `, ${user.full_name}` : ''}
            </h1>
            <p className="mt-2 font-body text-lg text-white/40">
              {user?.business_name || 'E-commerce'} Dashboard
            </p>
          </div>
          <UserAvatarButton />
        </div>

        {/* Bank Sync CTA */}
        {!user?.bank_synced && (
          <div className="mb-10 border border-flow-gold/30 bg-flow-gold/5 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-flow-gold/10">
                  <Landmark className="h-7 w-7 text-flow-gold" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-2">
                    Connect Your Financial Accounts
                  </h2>
                  <p className="max-w-xl font-body text-base leading-relaxed text-white/50">
                    Link your bank or upload a CSV to unlock margin analysis, platform fee tracking, and inventory health insights.
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/dashboard/settings/accounts')}
                className="flex shrink-0 items-center gap-3 bg-flow-gold px-8 py-5 font-bold uppercase tracking-[0.2em] text-flow-black transition-all hover:brightness-110 active:scale-95 group"
              >
                CONNECT NOW
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {user?.bank_synced && (
          <div className="mb-10 border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-flow-gold/10">
                <ShieldCheck className="h-7 w-7 text-flow-gold" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-1">
                  Accounts Connected
                </h2>
                <p className="font-body text-base text-white/50">
                  Your financial data is syncing. Visit{' '}
                  <button
                    onClick={() => router.push('/dashboard/settings/accounts')}
                    className="text-flow-gold underline transition-colors hover:text-flow-gold/80"
                  >
                    Account Settings
                  </button>{' '}
                  to manage connections.
                </p>
              </div>
            </div>
          </div>
        )}

        {slowWeek && (
          <div className="mb-10 border border-amber-500/30 bg-amber-500/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-amber-500/10">
                <TrendingDown className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="flow-label text-[10px] text-amber-400 tracking-widest mb-1">SLOW WEEK DETECTED</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {slowWeek.context}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div>
                    <span className="text-xs text-white/40">This week: </span>
                    <span className="font-mono text-sm font-bold text-amber-400">
                      ${slowWeek.current_week_revenue?.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-white/40">Expected: </span>
                    <span className="font-mono text-sm text-white/60">
                      ${slowWeek.expected_weekly_revenue?.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setSlowWeek(null)}
                    className="ml-auto text-xs text-white/30 hover:text-white/60"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {dash ? (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">GROSS MARGIN</p>
                <p className={`font-mono text-2xl font-bold ${dash.gross_margin_pct >= 40 ? 'text-emerald' : dash.gross_margin_pct >= 25 ? 'text-flow-gold' : 'text-rose'}`}>
                  {dash.gross_margin_pct}%
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">PLATFORM FEES</p>
                <p className={`font-mono text-2xl font-bold ${dash.platform_fee_pct <= 3 ? 'text-emerald' : dash.platform_fee_pct <= 5 ? 'text-flow-gold' : 'text-rose'}`}>
                  {dash.platform_fee_pct}%
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">30-DAY CASH FORECAST</p>
                <p className="font-mono text-2xl font-bold text-white">${(dash.cash_forecast_30d ?? 0).toLocaleString()}</p>
              </div>
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">TAX RESERVE</p>
                <p className={`font-mono text-2xl font-bold ${dash.tax_reserve_status.percentage >= 80 ? 'text-emerald' : dash.tax_reserve_status.percentage >= 50 ? 'text-flow-gold' : 'text-rose'}`}>
                  {dash.tax_reserve_status.percentage}%
                </p>
              </div>
            </div>

            {/* Main grid: 8 + 4 */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <SafeToSpendCard
                  amount={dash.safe_to_spend.amount}
                  confidence={dash.safe_to_spend.confidence}
                  breakdown={dash.safe_to_spend.breakdown}
                />
                <CashFlowChart data={dash.cash_flow} />
                <RecentTransactions data={dash.recent_transactions} />
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <TaxReserveGauge
                  percentage={dash.tax_reserve_status.percentage}
                  shortfall={dash.tax_reserve_status.shortfall}
                />
                <ActiveAlerts data={dash.active_alerts} />
                <MarketInsightCard
                  index_label={dash.market_insight.index_label}
                  index_value={dash.market_insight.index_value}
                  index_change={dash.market_insight.index_change}
                  context={dash.market_insight.context}
                  recommendation={dash.market_insight.recommendation}
                />

                {/* AI Insights */}
                {user?.ai_insights && Object.keys(user.ai_insights).length > 0 && (
                  <AIInsightCards insights={user.ai_insights} />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No dashboard data available. Connect your accounts to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
