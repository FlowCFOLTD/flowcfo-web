'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { useBurnRate } from '@/hooks/api/use-startup';
import StartupMetricsTabs from '@/components/dashboard/startup-metrics-tabs';

function StatCard({ label, value, sub, icon, color }: { label: string; value: string; sub?: string; icon?: React.ReactNode; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <div className="flex items-center justify-between">
        <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
        {icon}
      </div>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function BurnRatePage() {
  const { data, isLoading } = useBurnRate(12);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-6 md:px-16 py-12">
        <p className="text-white/40 font-body">No burn rate data available. Connect your accounts first.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-3xl font-bold text-white">Startup Metrics</h1>
          </div>
          <StartupMetricsTabs />
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="NET MONTHLY BURN"
            value={`$${data.net_monthly_burn.toLocaleString()}`}
            sub={data.trend_label}
            icon={data.trend_pct <= 0 ? <TrendingDown className="h-5 w-5 text-emerald" /> : <TrendingUp className="h-5 w-5 text-rose" />}
            color={data.trend_pct <= 0 ? 'text-emerald' : 'text-rose'}
          />
          <StatCard
            label="AVG MONTHLY BURN"
            value={`$${data.avg_monthly_burn.toLocaleString()}`}
            sub={`${data.trend_pct > 0 ? '+' : ''}${data.trend_pct.toFixed(1)}% vs previous period`}
          />
          <StatCard
            label="AVG MONTHLY INCOME"
            value={`$${data.avg_monthly_income.toLocaleString()}`}
          />
          <StatCard
            label="TOTAL EXPENSES"
            value={`$${data.total_expenses.toLocaleString()}`}
            sub={`Last ${data.period_months} months`}
          />
        </div>

        {/* Category Breakdown */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Expense Category Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(data.category_breakdown).map(([cat, val]) => (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-body text-sm text-white/80">{cat}</span>
                  <span className="font-mono text-sm text-white/60">${val.amount.toLocaleString()} ({val.percentage}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-flow-gold rounded-full transition-all"
                    style={{ width: `${Math.min(val.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burn Trend */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Monthly Burn Trend</h2>
          <div className="space-y-3">
            {data.burn_trend.map((bt) => (
              <div key={bt.month} className="flex items-center gap-4">
                <span className="font-mono text-xs text-white/40 w-16 shrink-0">{bt.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-3 bg-rose/20 rounded" style={{ width: `${(bt.gross_burn / Math.max(...data.burn_trend.map(b => b.gross_burn)) * 100)}%` }} />
                  <span className="font-mono text-xs text-white/60">${bt.gross_burn.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Insight */}
        {data.strategic_insight?.summary && (
          <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
            <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">STRATEGIC INSIGHT</h2>
            <p className="font-body text-base text-white/80 leading-relaxed">{data.strategic_insight.summary}</p>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations.length > 0 && (
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">Recommendations</h2>
            <div className="space-y-3">
              {data.recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-flow-gold text-sm mt-0.5">◆</span>
                  <p className="font-body text-sm text-white/70 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
