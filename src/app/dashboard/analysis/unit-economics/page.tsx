'use client';

import { TrendingUp, UserPlus, CircleDollarSign } from 'lucide-react';
import { useUnitEconomics } from '@/hooks/api/use-startup';
import StartupMetricsTabs from '@/components/dashboard/startup-metrics-tabs';

export default function UnitEconomicsPage() {
  const { data, isLoading } = useUnitEconomics();

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
        <p className="text-white/40 font-body">No unit economics data available. Connect your accounts first.</p>
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
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flow-label text-[10px] text-white/40 tracking-widest">MONTHLY RECURRING REVENUE</span>
              <TrendingUp className="h-5 w-5 text-emerald" />
            </div>
            <p className="font-mono text-2xl font-bold text-white">${data.mrr.toLocaleString()}</p>
            <p className="font-body text-xs text-emerald">+{data.mrr_growth_pct}% vs previous month</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flow-label text-[10px] text-white/40 tracking-widest">CUSTOMER LIFETIME VALUE</span>
              <UserPlus className="h-5 w-5 text-flow-gold" />
            </div>
            <p className="font-mono text-2xl font-bold text-white">${data.ltv.toLocaleString()}</p>
            <p className="font-body text-xs text-white/40">{data.ltv_label}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flow-label text-[10px] text-white/40 tracking-widest">ACQUISITION COST</span>
              <CircleDollarSign className="h-5 w-5 text-rose" />
            </div>
            <p className="font-mono text-2xl font-bold text-white">${data.customer_acquisition_cost.toLocaleString()}</p>
            <p className="font-body text-xs text-white/40">{data.cac_label}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">EFFICIENCY RATIO</span>
            <p className={`font-mono text-2xl font-bold ${data.efficiency_ratio >= 5 ? 'text-emerald' : data.efficiency_ratio >= 3 ? 'text-flow-gold' : 'text-rose'}`}>
              {data.efficiency_ratio}x
            </p>
            <p className="font-body text-xs text-white/40">{data.efficiency_label}</p>
          </div>
        </div>

        {/* Efficiency Note */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <p className="font-body text-sm text-white/70 leading-relaxed">{data.efficiency_note}</p>
        </div>

        {/* Channel Performance */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Channel Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-body text-xs text-white/40 font-medium">Channel</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Spend</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">New Cust.</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">CAC</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">LTV (Est)</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {data.channel_performance.map((ch, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 font-body text-sm text-white/80">{ch.channel}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">${ch.spend.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">{ch.new_customers}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">${ch.cac.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">${ch.ltv_est.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-emerald text-right">{ch.ratio}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MRR Projection */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">MRR Growth Projection</h2>
          <div className="space-y-3">
            {data.mrr_projection.map((mp) => (
              <div key={mp.month} className="flex items-center gap-4">
                <span className="font-mono text-xs text-white/40 w-12 shrink-0">{mp.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className="h-3 rounded"
                    style={{
                      width: `${Math.min((mp.actual || mp.projected || 0) / Math.max(...data.mrr_projection.map(m => m.actual || m.projected || 0)) * 100, 100)}%`,
                      backgroundColor: mp.actual ? '#1a56db' : '#f59e0b',
                      opacity: mp.actual ? 1 : 0.6,
                    }}
                  />
                  <span className="font-mono text-xs text-white/60">
                    {mp.actual !== undefined ? `$${mp.actual.toLocaleString()}` : `$${mp.projected?.toLocaleString()}`}
                  </span>
                  {mp.actual !== undefined ? (
                    <span className="font-body text-[10px] text-blue/60">actual</span>
                  ) : (
                    <span className="font-body text-[10px] text-amber/60">projected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
