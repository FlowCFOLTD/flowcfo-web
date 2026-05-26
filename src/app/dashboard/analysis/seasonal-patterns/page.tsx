'use client';

import { useSeasonalPatterns } from '@/hooks/api/use-ecommerce';
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

export default function SeasonalPatternsPage() {
  const { data, isLoading } = useSeasonalPatterns(12);

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
        <p className="text-white/40 font-body">No seasonal data available. Connect your accounts first.</p>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.monthly_breakdown.map(m => m.revenue), 1);
  const peakMonths = data.seasonal_peaks.map(p => p.month);

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <EcommerceMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Seasonal Patterns</h1>
          <p className="font-body text-white/40 mt-1">Revenue seasonality, peak detection, and trend analysis over the trailing 12 months</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="AVG MONTHLY REVENUE" value={`$${Math.round(data.avg_monthly_revenue).toLocaleString()}`} />
          <StatCard label="PEAK MONTHS DETECTED" value={`${data.peak_count}`} sub="Above 25% avg threshold" color="text-flow-gold" />
          {data.highest_month && (
            <StatCard label="HIGHEST MONTH" value={data.highest_month.month} sub={`$${Math.round(data.highest_month.revenue).toLocaleString()}`} color="text-emerald" />
          )}
          {data.lowest_month && (
            <StatCard label="LOWEST MONTH" value={data.lowest_month.month} sub={`$${Math.round(data.lowest_month.revenue).toLocaleString()}`} color="text-rose" />
          )}
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Revenue Seasonality (12 Months)</h2>
          <div className="space-y-2">
            {data.monthly_breakdown.map((m) => {
              const isPeak = peakMonths.includes(m.month);
              return (
                <div key={m.month} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/40 w-16 shrink-0">{m.month}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-sm overflow-hidden relative">
                    <div
                      className={`h-full rounded-sm transition-all ${isPeak ? 'bg-flow-gold' : 'bg-white/10'}`}
                      style={{ width: `${(m.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-white/60 w-24 text-right shrink-0">${Math.round(m.revenue).toLocaleString()}</span>
                  <span className={`font-mono text-xs w-16 text-right shrink-0 ${m.net >= 0 ? 'text-emerald' : 'text-rose'}`}>
                    {m.net >= 0 ? '+' : ''}${Math.round(m.net).toLocaleString()}
                  </span>
                  {isPeak && <span className="flow-label text-[8px] text-flow-gold uppercase tracking-wider shrink-0">Peak</span>}
                </div>
              );
            })}
          </div>
        </div>

        {data.seasonal_peaks.length > 0 && (
          <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-flow-gold uppercase mb-4">Seasonal Peaks</h2>
            <div className="space-y-3">
              {data.seasonal_peaks.map((peak) => (
                <div key={peak.month} className="flex justify-between items-center">
                  <span className="font-body text-sm text-white/80">{peak.month}</span>
                  <span className="font-body text-sm text-white/60">
                    ${Math.round(peak.revenue).toLocaleString()} ({peak.above_average_pct}% above avg)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">SEASONALITY INSIGHT</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {data.peak_count >= 2
              ? `Your revenue shows ${data.peak_count} distinct seasonal peaks, with ${data.highest_month?.month || 'the highest month'} being your strongest period at $${Math.round(data.highest_month?.revenue || 0).toLocaleString()}. Plan inventory and marketing spend to capitalize on these windows.`
              : data.peak_count === 1
              ? `Your revenue has a single seasonal peak in ${data.seasonal_peaks[0]?.month || 'one month'} (${data.seasonal_peaks[0]?.above_average_pct || 0}% above average). Consider diversifying revenue streams to smooth out seasonality.`
              : `No significant seasonal peaks detected — your revenue is relatively stable year-round. Focus on incremental growth opportunities rather than seasonal campaigns.`}
          </p>
        </div>
      </div>
    </div>
  );
}
