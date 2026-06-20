'use client';

import { useState } from 'react';
import { ecommerceApi, COGSTrendData } from '@/lib/api/ecommerce';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function COGSTrendsPage() {
  const [months, setMonths] = useState(6);
  const [data, setData] = useState<COGSTrendData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (m: number) => {
    setMonths(m);
    setLoading(true);
    setError('');
    try {
      const result = await ecommerceApi.getCogstrend(m);
      setData(result);
    } catch {
      setError('Failed to load COGS trend data.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount
  useState(() => { fetchData(6); });

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 md:px-16 py-12">
        <p className="text-rose-400 font-body">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">COGS Trends</h1>
            <p className="font-body text-white/40 mt-1">Track cost of goods sold and detect margin compression</p>
          </div>
          <div className="flex items-center gap-2">
            {[3, 6, 12].map((m) => (
              <button
                key={m}
                onClick={() => fetchData(m)}
                className={`px-3 py-1.5 font-body text-xs transition-colors ${
                  months === m ? 'bg-flow-gold/20 text-flow-gold' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {m}M
              </button>
            ))}
          </div>
        </div>

        {data && (
          <>
            {/* Trend Status */}
            <div className={`border p-6 ${
              data.is_compressed ? 'border-rose-500/20 bg-rose-500/5' :
              data.trend === 'rising' ? 'border-amber-500/20 bg-amber-500/5' :
              'border-emerald-500/20 bg-emerald-500/5'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {data.is_compressed ? (
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                ) : data.trend === 'rising' ? (
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                )}
                <h2 className={`font-body text-lg font-bold ${
                  data.is_compressed ? 'text-rose-400' :
                  data.trend === 'rising' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {data.trend_label}
                </h2>
              </div>
              <p className="font-body text-sm text-white/60 leading-relaxed">{data.message}</p>
              {data.suggested_price_multiplier && (
                <div className="mt-3 p-3 bg-white/5 border border-white/10">
                  <p className="font-body text-xs text-white/40">
                    Suggested price adjustment: <span className="text-flow-gold font-bold">{data.suggested_price_multiplier}x</span> current price
                  </p>
                </div>
              )}
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-white/10 bg-white/5 p-6 space-y-2">
                <span className="flow-label text-[10px] text-white/40 tracking-widest">RECENT AVG COGS %</span>
                <p className="font-mono text-2xl font-bold text-white">{data.avg_recent_cogs_pct.toFixed(1)}%</p>
                <div className="flex items-center gap-1">
                  {data.cogs_change_pct > 0 ? (
                    <ArrowUpRight className="h-3 w-3 text-rose-400" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-emerald-400" />
                  )}
                  <span className={`font-body text-xs ${data.cogs_change_pct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {data.cogs_change_pct > 0 ? '+' : ''}{data.cogs_change_pct.toFixed(1)}% vs prior
                  </span>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-6 space-y-2">
                <span className="flow-label text-[10px] text-white/40 tracking-widest">RECENT AVG MARGIN</span>
                <p className="font-mono text-2xl font-bold text-white">{data.avg_recent_margin.toFixed(1)}%</p>
                <div className="flex items-center gap-1">
                  {data.margin_change > 0 ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-rose-400" />
                  )}
                  <span className={`font-body text-xs ${data.margin_change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {data.margin_change > 0 ? '+' : ''}{data.margin_change.toFixed(1)}pp vs prior
                  </span>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-6 space-y-2">
                <span className="flow-label text-[10px] text-white/40 tracking-widest">PRIOR AVG COGS %</span>
                <p className="font-mono text-2xl font-bold text-white/60">{data.avg_prior_cogs_pct.toFixed(1)}%</p>
              </div>
              <div className="border border-white/10 bg-white/5 p-6 space-y-2">
                <span className="flow-label text-[10px] text-white/40 tracking-widest">PRIOR AVG MARGIN</span>
                <p className="font-mono text-2xl font-bold text-white/60">{data.avg_prior_margin.toFixed(1)}%</p>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Monthly Breakdown</h2>
              <div className="space-y-4">
                {data.monthly_trend.map((m, i) => {
                  const maxRevenue = Math.max(...data.monthly_trend.map(x => x.revenue));
                  return (
                    <div key={`${m.month}-${i}`} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-white/40">{m.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[10px] text-white/30">Rev: ${m.revenue.toLocaleString()}</span>
                          <span className="font-mono text-[10px] text-white/30">COGS: ${m.cogs.toLocaleString()}</span>
                          <span className={`font-mono text-xs font-bold ${m.margin_pct >= 40 ? 'text-emerald-400' : m.margin_pct >= 25 ? 'text-flow-gold' : 'text-rose-400'}`}>
                            {m.margin_pct.toFixed(1)}% margin
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-rose-500/60"
                          style={{ width: `${(m.cogs / m.revenue) * 100}%` }}
                        />
                        <div
                          className="h-full bg-emerald-500/60"
                          style={{ width: `${m.margin_pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-white/20">
                          COGS: {m.cogs_pct.toFixed(1)}% | Fees: ${m.fees.toLocaleString()}
                        </span>
                        <span className="font-mono text-[10px] text-white/20">
                          Total costs: ${m.total_costs.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Extremes */}
            {(data.highest_cogs_month || data.lowest_cogs_month) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.highest_cogs_month && (
                  <div className="border border-rose-500/20 bg-rose-500/5 p-6">
                    <span className="flow-label text-[10px] text-rose-400 tracking-widest">HIGHEST COGS MONTH</span>
                    <p className="font-mono text-lg font-bold text-white mt-2">{data.highest_cogs_month.month}</p>
                    <p className="font-body text-xs text-white/40">{data.highest_cogs_month.cogs_pct.toFixed(1)}% of revenue</p>
                  </div>
                )}
                {data.lowest_cogs_month && (
                  <div className="border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <span className="flow-label text-[10px] text-emerald-400 tracking-widest">LOWEST COGS MONTH</span>
                    <p className="font-mono text-lg font-bold text-white mt-2">{data.lowest_cogs_month.month}</p>
                    <p className="font-body text-xs text-white/40">{data.lowest_cogs_month.cogs_pct.toFixed(1)}% of revenue</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
