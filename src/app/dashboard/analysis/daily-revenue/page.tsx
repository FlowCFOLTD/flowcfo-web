'use client';

import { useDailyRevenue } from '@/hooks/api/use-restaurant';
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

export default function DailyRevenuePage() {
  const { data, isLoading } = useDailyRevenue(30);

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
        <p className="text-white/40 font-body">No daily revenue data available. Connect your accounts first.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <RestaurantMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Daily Revenue Analysis</h1>
          <p className="font-body text-white/40 mt-1">Revenue patterns across days, weeks, and operational windows</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="AVG DAILY REVENUE" value={`$${data.avg_daily_revenue.toLocaleString()}`} sub={`Last ${data.period_days} days`} />
          <StatCard label="TOTAL REVENUE" value={`$${data.total_revenue.toLocaleString()}`} />
          <StatCard label="DAILY RANGE" value={`$${data.revenue_range.low.toLocaleString()} - $${data.revenue_range.high.toLocaleString()}`} sub="Lowest to highest day" />
          <StatCard label="BUSIEST DAY" value={data.busiest_weekday || '—'} sub={data.busiest_day ? `$${data.busiest_day.revenue.toLocaleString()}` : ''} color="text-emerald" />
        </div>

        {/* Weekday Breakdown */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Revenue by Day of Week</h2>
          <div className="space-y-4">
            {data.weekday_breakdown.map((wd) => {
              const maxAvg = Math.max(...data.weekday_breakdown.map(w => w.avg_revenue));
              return (
                <div key={wd.day}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-body text-sm text-white/80">{wd.day}</span>
                    <span className="font-mono text-sm text-white/60">${wd.avg_revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${wd.avg_revenue >= maxAvg * 0.9 ? 'bg-flow-gold' : wd.avg_revenue >= maxAvg * 0.6 ? 'bg-flow-gold/70' : 'bg-white/20'}`}
                      style={{ width: `${(wd.avg_revenue / maxAvg) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Windows */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Operational Window Analysis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Period</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Avg Revenue</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">vs Peak</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {data.weekday_breakdown.slice(0, 3).map((wd, i) => {
                  const peak = data.weekday_breakdown[0].avg_revenue;
                  const vsPeak = peak > 0 ? Math.round(((wd.avg_revenue - peak) / peak) * 100) : 0;
                  const recs = [
                    'Full staff — expect peak volume. Ensure all stations are covered.',
                    'Standard operations with focus on inventory planning.',
                    'Reduced staffing — consider limited menu or adjusted hours.',
                  ];
                  return (
                    <tr key={wd.day} className="border-b border-white/5">
                      <td className="py-4 font-body text-sm text-white/80">{wd.day} Peak</td>
                      <td className="py-4 font-mono text-sm text-white/60">${wd.avg_revenue.toLocaleString()}</td>
                      <td className={`py-4 font-mono text-sm ${vsPeak >= 0 ? 'text-emerald' : 'text-rose'}`}>{vsPeak >= 0 ? `+${vsPeak}%` : `${vsPeak}%`}</td>
                      <td className="py-4 font-body text-sm text-white/50">{recs[i] || 'Standard operations.'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forecasting Note */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">ALGORITHMIC FORECASTING</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            Your busiest day is <strong>{data.busiest_weekday}</strong> (avg ${data.weekday_breakdown[0]?.avg_revenue.toLocaleString() || 0}) and slowest is <strong>{data.slowest_weekday}</strong>.
            Revenue ranges from <strong>${data.revenue_range.low.toLocaleString()}</strong> to <strong>${data.revenue_range.high.toLocaleString()}</strong> per day.
            Use this data to optimize staffing, inventory orders, and promotional timing.
          </p>
        </div>
      </div>
    </div>
  );
}
