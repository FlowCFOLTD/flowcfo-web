'use client';

import { useRouter } from 'next/navigation';
import { Landmark, ArrowRight, Settings, ShieldCheck } from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';
import { useAgencyDashboard } from '@/hooks/api/use-agency';
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

export default function AgencyDashboardPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: dash, isLoading: dashLoading } = useAgencyDashboard();

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
              {user?.business_name || 'Agency'} Dashboard
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/settings/accounts')}
            className="hidden md:flex items-center gap-2 border border-white/10 px-6 py-3 flow-label text-white/40 transition-all hover:border-white/30 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            SETTINGS
          </button>
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
                    Link your bank or upload a CSV to unlock client-level P&L, revenue concentration tracking, and real-time margin analysis.
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

        {/* AI Insights */}
        {user?.ai_insights && Object.keys(user.ai_insights).length > 0 && (
          <div className="mb-10">
            <AIInsightCards insights={user.ai_insights} />
          </div>
        )}

        {dash ? (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">OVERALL MARGIN</p>
                <p className={`font-mono text-2xl font-bold ${dash.overall_margin_pct >= 25 ? 'text-emerald' : dash.overall_margin_pct >= 10 ? 'text-flow-gold' : 'text-rose'}`}>
                  {dash.overall_margin_pct}%
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">30-DAY CASH FORECAST</p>
                <p className="font-mono text-2xl font-bold text-white">${dash.cash_forecast_30d.toLocaleString()}</p>
              </div>
              <div className="col-span-12 md:col-span-3 border border-white/10 bg-white/5 p-6">
                <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">TOP CLIENT CONCENTRATION</p>
                <p className={`font-mono text-2xl font-bold ${dash.top_client_pct > 40 ? 'text-rose' : dash.top_client_pct > 25 ? 'text-flow-gold' : 'text-emerald'}`}>
                  {dash.top_client_pct}%
                </p>
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
