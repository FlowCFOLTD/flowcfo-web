'use client';

import { useInventoryHealth } from '@/hooks/api/use-ecommerce';
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

export default function InventoryHealthPage() {
  const { data, isLoading } = useInventoryHealth(3);

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
        <p className="text-white/40 font-body">No inventory data available. Connect your accounts first.</p>
      </div>
    );
  }

  const urgencyColor = data.restocking_urgency === 'high' ? 'text-rose' : data.restocking_urgency === 'medium' ? 'text-flow-gold' : 'text-emerald';
  const turnoverColor = data.inventory_turnover_ratio >= 6 ? 'text-emerald' : data.inventory_turnover_ratio >= 3 ? 'text-flow-gold' : 'text-rose';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <EcommerceMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Inventory Health</h1>
          <p className="font-body text-white/40 mt-1">Turnover analysis, stock coverage, and restocking urgency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="INVENTORY TURNOVER" value={`${data.inventory_turnover_ratio}x`} color={turnoverColor} sub="Annualized ratio" />
          <StatCard label="DAYS ON HAND" value={data.days_on_hand != null ? `${Math.round(data.days_on_hand)}d` : '—'} sub="Avg stock coverage" />
          <StatCard label="AVG MONTHLY COGS" value={`$${data.avg_monthly_cogs.toLocaleString()}`} />
          <StatCard label="INVENTORY SPEND" value={`$${data.inventory_spend.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Restocking Urgency</h2>
          <div className="flex items-center gap-6">
            <div className={`font-mono text-4xl font-bold ${urgencyColor} capitalize`}>
              {data.restocking_urgency}
            </div>
            <div className="flex-1">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    data.restocking_urgency === 'high' ? 'bg-rose' : data.restocking_urgency === 'medium' ? 'bg-flow-gold' : 'bg-emerald'
                  }`}
                  style={{
                    width: data.restocking_urgency === 'high' ? '90%' : data.restocking_urgency === 'medium' ? '55%' : '20%',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/30 mt-1 font-body">
                <span>Overstocked</span>
                <span>Balanced</span>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">COGS vs Inventory Spend</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm font-body mb-1">
                  <span className="text-white/60">Total COGS</span>
                  <span className="font-mono text-white">${data.total_cogs.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-rose rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-body mb-1">
                  <span className="text-white/60">Inventory Spend</span>
                  <span className="font-mono text-white">${data.inventory_spend.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-flow-gold rounded-full"
                    style={{ width: `${Math.min((data.inventory_spend / Math.max(data.total_cogs, 1)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">Efficiency Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-white/60">Turnover Ratio</span>
                <span className={`font-mono text-lg font-bold ${turnoverColor}`}>{data.inventory_turnover_ratio}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-white/60">Stock Coverage</span>
                <span className="font-mono text-lg font-bold text-white">{data.days_on_hand != null ? `${Math.round(data.days_on_hand)} days` : '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-white/60">Restocking Urgency</span>
                <span className={`font-mono text-lg font-bold capitalize ${urgencyColor}`}>{data.restocking_urgency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">INVENTORY INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.restocking_urgency === 'high'
              ? `Your inventory turns ${data.inventory_turnover_ratio}x annually with only ${Math.round(data.days_on_hand || 0)} days of stock on hand. Prioritize replenishment of fast-moving SKUs to avoid stockouts.`
              : data.restocking_urgency === 'medium'
              ? `With ${data.inventory_turnover_ratio}x turnover and ${Math.round(data.days_on_hand || 0)} days coverage, your inventory is approaching reorder thresholds. Review lead times on top-selling items.`
              : `Healthy inventory position with ${data.inventory_turnover_ratio}x turnover and ${Math.round(data.days_on_hand || 0)} days of stock on hand. Monitor for slow-moving items that may tie up cash.`}
          </p>
        </div>
      </div>
    </div>
  );
}
