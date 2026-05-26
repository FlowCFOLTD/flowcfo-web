'use client';

import { usePayoutAnalysis } from '@/hooks/api/use-ecommerce';
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

export default function PayoutsPage() {
  const { data, isLoading } = usePayoutAnalysis(3);

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
        <p className="text-white/40 font-body">No payout data available. Connect your accounts first.</p>
      </div>
    );
  }

  const platforms = Object.entries(data.breakdown_by_platform).sort(([, a], [, b]) => b.total_payouts - a.total_payouts);
  const maxPayout = Math.max(...platforms.map(([, v]) => v.total_payouts), 1);

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <EcommerceMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Payout Reconciliation</h1>
          <p className="font-body text-white/40 mt-1">Payout tracking and reconciliation by sales platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="TOTAL PAYOUTS" value={`$${data.total_payouts.toLocaleString()}`} sub={`Last ${data.period_months} months`} color="text-emerald" />
          <StatCard label="PAYOUT COUNT" value={`${data.payout_count}`} sub="Total transactions" />
          <StatCard label="PLATFORMS" value={`${platforms.length}`} sub="Active sales channels" />
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Payouts by Platform</h2>
          <div className="space-y-6">
            {platforms.map(([platform, info]) => {
              const pct = (info.total_payouts / data.total_payouts) * 100;
              return (
                <div key={platform}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-body text-sm text-white/80 capitalize">{platform}</span>
                      <span className="font-body text-xs text-white/40 ml-3">{info.count} payments</span>
                    </div>
                    <span className="font-mono text-sm text-white/60">
                      ${info.total_payouts.toLocaleString()} ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-flow-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  {info.latest && (
                    <p className="font-body text-[10px] text-white/30 mt-1">Latest payout: {info.latest}</p>
                  )}
                </div>
              );
            })}
            {platforms.length === 0 && (
              <p className="font-body text-sm text-white/40">No payout data detected in the selected period.</p>
            )}
          </div>
        </div>

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">PAYOUT INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {platforms.length >= 3
              ? `You're receiving payouts across ${platforms.length} platforms totaling $${data.total_payouts.toLocaleString()}. Consolidating to fewer platforms could simplify reconciliation and potentially reduce aggregate fees.`
              : platforms.length >= 1
              ? `Your primary payout channel is ${platforms[0]?.[0] || 'your main platform'} with $${Math.round(platforms[0]?.[1].total_payouts || 0).toLocaleString()} in payouts. Monitor settlement times to optimize cash flow forecasting.`
              : `No payout data available. Connect your sales platform accounts to begin tracking.`}
          </p>
        </div>
      </div>
    </div>
  );
}
