'use client';

import { useLaborCost } from '@/hooks/api/use-restaurant';
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

export default function LaborCostPage() {
  const { data, isLoading } = useLaborCost(3);

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
        <p className="text-white/40 font-body">No labor cost data available. Connect your accounts first.</p>
      </div>
    );
  }

  const costColor = data.labor_cost_pct <= data.industry_benchmark_pct ? 'text-emerald' : data.labor_cost_pct <= data.industry_benchmark_pct + 5 ? 'text-flow-gold' : 'text-rose';
  const normColor = data.status === 'below_benchmark' ? 'text-emerald' : data.status === 'at_benchmark' ? 'text-flow-gold' : 'text-rose';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <RestaurantMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Labor Cost Analysis</h1>
          <p className="font-body text-white/40 mt-1">Staffing cost tracking against industry benchmarks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="LABOR COST %" value={`${data.labor_cost_pct}%`} sub="of revenue" color={costColor} />
          <StatCard label="TOTAL LABOR COST" value={`$${data.total_labor_cost.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
          <StatCard label="INDUSTRY BENCHMARK" value={`${data.industry_benchmark_pct}%`} sub="Target for restaurant ops" />
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Cost vs Benchmark</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-body mb-1">
                <span className="text-white/60">Your Labor Cost</span>
                <span className={`font-mono font-bold ${costColor}`}>{data.labor_cost_pct}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${costColor.replace('text-', 'bg-')}`}
                  style={{ width: `${Math.min((data.labor_cost_pct / 40) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-body mb-1">
                <span className="text-white/60">Industry Benchmark</span>
                <span className="font-mono text-white">{data.industry_benchmark_pct}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white/30 rounded-full" style={{ width: `${(data.industry_benchmark_pct / 40) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">LABOR INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.status === 'below_benchmark'
              ? `Your labor cost of ${data.labor_cost_pct}% is within the industry benchmark of ${data.industry_benchmark_pct}%. Continue monitoring scheduling efficiency as revenue scales.`
              : data.status === 'at_benchmark'
              ? `Your labor cost of ${data.labor_cost_pct}% is near the industry benchmark of ${data.industry_benchmark_pct}%. Review shift scheduling and explore cross-training staff to improve flexibility.`
              : `Your labor cost of ${data.labor_cost_pct}% is above the industry benchmark of ${data.industry_benchmark_pct}%. Consider optimizing labor scheduling during slow periods and reviewing staffing ratios.`}
          </p>
        </div>
      </div>
    </div>
  );
}
