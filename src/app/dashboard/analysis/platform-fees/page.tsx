'use client';

import { usePlatformFees } from '@/hooks/api/use-ecommerce';
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

export default function PlatformFeesPage() {
  const { data, isLoading } = usePlatformFees(3);

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
        <p className="text-white/40 font-body">No platform fee data available. Connect your accounts first.</p>
      </div>
    );
  }

  const feeColor = data.fee_as_pct_of_revenue <= 3 ? 'text-emerald' : data.fee_as_pct_of_revenue <= 5 ? 'text-flow-gold' : 'text-rose';
  const platforms = Object.entries(data.breakdown_by_platform).sort(([, a], [, b]) => b - a);
  const totalFees = platforms.reduce((acc, [, v]) => acc + v, 0);

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <EcommerceMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Platform Fees Analysis</h1>
          <p className="font-body text-white/40 mt-1">Fee breakdown across all sales channels and payment processors</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="FEES AS % OF REVENUE"
            value={`${data.fee_as_pct_of_revenue}%`}
            color={feeColor}
          />
          <StatCard label="TOTAL PLATFORM FEES" value={`$${data.total_platform_fees.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
          <StatCard label="PLATFORMS DETECTED" value={`${platforms.length}`} />
        </div>

        {/* Platform Breakdown */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Fee Breakdown by Platform</h2>
          <div className="space-y-4">
            {platforms.map(([platform, amount]) => {
              const pct = totalFees > 0 ? (amount / totalFees) * 100 : 0;
              return (
                <div key={platform}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-body text-sm text-white/80 capitalize">{platform}</span>
                    <span className="font-mono text-sm text-white/60">${amount.toLocaleString()} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-flow-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {platforms.length === 0 && (
              <p className="font-body text-sm text-white/40">No platform fees detected in the selected period.</p>
            )}
          </div>
        </div>

        {/* Insight */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">STRATEGIC INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.fee_as_pct_of_revenue <= 3
              ? `Your platform fees of ${data.fee_as_pct_of_revenue}% of revenue are well-controlled. Consider negotiating volume discounts with your primary payment processor.`
              : data.fee_as_pct_of_revenue <= 5
              ? `Your platform fees of ${data.fee_as_pct_of_revenue}% of revenue are within normal range. Review each platform's fee structure to identify optimization opportunities.`
              : `Your platform fees of ${data.fee_as_pct_of_revenue}% of revenue are elevated. Audit your payment processing setup and consider switching to interchange-plus pricing or consolidating platforms.`}
          </p>
        </div>
      </div>
    </div>
  );
}
