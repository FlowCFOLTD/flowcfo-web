'use client';

import { useGrossMargin } from '@/hooks/api/use-ecommerce';
import EcommerceMetricsTabs from '@/components/dashboard/ecommerce-metrics-tabs';

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function GrossMarginPage() {
  const { data, isLoading } = useGrossMargin(3);

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
        <p className="text-white/40 font-body">No gross margin data available. Connect your accounts first.</p>
      </div>
    );
  }

  const marginColor = data.gross_margin_pct >= 40 ? 'text-emerald' : data.gross_margin_pct >= 25 ? 'text-flow-gold' : 'text-rose';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <EcommerceMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Gross Margin Analysis</h1>
          <p className="font-body text-white/40 mt-1">Revenue and COGS breakdown across all sales channels</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="GROSS MARGIN"
            value={`${data.gross_margin_pct}%`}
            color={marginColor}
          />
          <StatCard label="TOTAL REVENUE" value={`$${data.total_revenue.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
          <StatCard label="TOTAL COGS" value={`$${data.total_cogs.toLocaleString()}`} />
          <StatCard label="GROSS PROFIT" value={`$${data.gross_profit.toLocaleString()}`} color="text-emerald" />
        </div>

        {/* Monthly Trend */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Margin Over Time</h2>
          <div className="space-y-3">
            {data.monthly_breakdown.map((m, i) => {
              const maxRev = Math.max(...data.monthly_breakdown.map(x => x.revenue));
              return (
                <div key={`${m.month}-${i}`} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-white/40">{m.month}</span>
                    <span className="font-mono text-xs text-white/60">${m.revenue.toLocaleString()} rev</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${(m.revenue / maxRev) * 100}%`, backgroundColor: m.margin_pct >= 40 ? '#10b981' : m.margin_pct >= 25 ? '#d4a74c' : '#f43f5e' }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-white/30">COGS: ${m.cogs.toLocaleString()}</span>
                    <span className={`font-mono text-xs font-bold ${m.margin_pct >= 40 ? 'text-emerald' : m.margin_pct >= 25 ? 'text-flow-gold' : 'text-rose'}`}>
                      {m.margin_pct}% margin
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insight */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">STRATEGIC INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.gross_margin_pct >= 40
              ? `Your gross margin of ${data.gross_margin_pct}% indicates strong pricing power and cost control. Focus on scaling top-performing SKUs and optimizing fulfillment.`
              : data.gross_margin_pct >= 25
              ? `Your gross margin of ${data.gross_margin_pct}% is acceptable but has room for improvement. Review supplier contracts and consider price adjustments on low-margin products.`
              : `Your gross margin of ${data.gross_margin_pct}% is below the healthy threshold. Prioritize COGS reduction through supplier consolidation, packaging optimization, or price increases.`}
          </p>
        </div>
      </div>
    </div>
  );
}
