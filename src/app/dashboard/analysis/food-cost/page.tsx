'use client';

import { useFoodCost } from '@/hooks/api/use-restaurant';
import RestaurantMetricsTabs from '@/components/dashboard/restaurant-metrics-tabs';

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function FoodCostPage() {
  const { data, isLoading } = useFoodCost(3);

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
        <p className="text-white/40 font-body">No food cost data available. Connect your accounts first.</p>
      </div>
    );
  }

  const costColor = data.food_cost_pct <= data.industry_benchmark_pct ? 'text-emerald' : data.food_cost_pct <= data.industry_benchmark_pct + 5 ? 'text-flow-gold' : 'text-rose';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <RestaurantMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Food Cost Analysis</h1>
          <p className="font-body text-white/40 mt-1">Cost of goods sold tracking against industry benchmarks</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="FOOD COST %"
            value={`${data.food_cost_pct}%`}
            sub={`Benchmark: ${data.industry_benchmark_pct}%`}
            color={costColor}
          />
          <StatCard label="TOTAL FOOD COST" value={`$${data.total_food_cost.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
          <StatCard label="TOTAL REVENUE" value={`$${data.total_revenue.toLocaleString()}`} />
          <StatCard
            label="STATUS"
            value={data.status === 'below_benchmark' ? 'Healthy' : data.status === 'at_benchmark' ? 'Monitor' : 'Above Threshold'}
            color={data.status === 'below_benchmark' ? 'text-emerald' : data.status === 'at_benchmark' ? 'text-flow-gold' : 'text-rose'}
          />
        </div>

        {/* Monthly Trend */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Cost Over Time</h2>
          <div className="space-y-3">
            {data.monthly_breakdown.map((m) => {
              const maxPct = Math.max(...data.monthly_breakdown.map(x => x.food_cost_pct));
              return (
                <div key={m.month} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/40 w-16 shrink-0">{m.month}</span>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="h-3 rounded" style={{ width: `${(m.food_cost_pct / maxPct) * 100}%`, backgroundColor: m.food_cost_pct <= data.industry_benchmark_pct ? '#10b981' : m.food_cost_pct <= data.industry_benchmark_pct + 5 ? '#d4a74c' : '#f43f5e' }} />
                    <span className="font-mono text-xs text-white/60">{m.food_cost_pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supplier Breakdown */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Supplier Spending Breakdown</h2>
          <div className="space-y-4">
            {data.supplier_breakdown.map((s) => (
              <div key={s.supplier}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-body text-sm text-white/80">{s.supplier}</span>
                  <span className="font-mono text-sm text-white/60">${s.amount.toLocaleString()} ({s.pct}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-flow-gold rounded-full transition-all" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">STRATEGIC INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.food_cost_pct > data.industry_benchmark_pct
              ? `Your food cost of ${data.food_cost_pct}% exceeds the ${data.industry_benchmark_pct}% benchmark. Review supplier pricing, adjust menu mix toward higher-margin items, and monitor portion control to reduce COGS.`
              : `Your food cost of ${data.food_cost_pct}% is within the ${data.industry_benchmark_pct}% benchmark. Continue monitoring supplier pricing and seasonal ingredient costs to maintain healthy margins.`}
          </p>
        </div>
      </div>
    </div>
  );
}
