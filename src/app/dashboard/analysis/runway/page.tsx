'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useRunway } from '@/hooks/api/use-startup';
import StartupMetricsTabs from '@/components/dashboard/startup-metrics-tabs';

export default function RunwayPage() {
  const { data, isLoading } = useRunway();

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
        <p className="text-white/40 font-body">No runway data available. Connect your accounts first.</p>
      </div>
    );
  }

  const iconForLabel = (label: string) => {
    if (label === 'Optimistic') return <TrendingUp className="h-4 w-4 text-emerald" />;
    if (label === 'Pessimistic') return <TrendingDown className="h-4 w-4 text-rose" />;
    return <Minus className="h-4 w-4 text-white/40" />;
  };

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

        {/* Main KPI */}
        <div className="border border-white/10 bg-white/5 p-10 text-center">
          <p className="font-body text-xs tracking-widest text-white/40 mb-2">ESTIMATED RUNWAY</p>
          <p className="font-display text-6xl font-bold text-white mb-3">{data.runway_months}</p>
          <p className="font-mono text-2xl text-white/60 mb-2">Months</p>
          <p className="font-body text-sm text-white/40 max-w-lg mx-auto">
            Your current cash position allows for sustained operations through {data.runway_date} based on trailing 3-month average burn.
          </p>
        </div>

        {/* Cash and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">NET INCOME (ALL-TIME)</p>
            <p className="font-mono text-3xl font-bold text-white">${data.available_balance.toLocaleString()}</p>
            <p className="font-body text-xs text-white/40 mt-1">Zero cash date: {data.zero_cash_date}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">TARGET PROGRESS</p>
            <p className="font-mono text-3xl font-bold text-white">{data.runway_pct}%</p>
            <p className="font-body text-xs text-white/40 mt-1">of 24-month target</p>
            <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-flow-gold rounded-full" style={{ width: `${Math.min(data.runway_pct, 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Burn Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">GROSS BURN</p>
            <p className="font-mono text-2xl font-bold text-rose">${data.burn_snapshot.gross_burn.toLocaleString()}</p>
            <p className="font-body text-xs text-rose/60 mt-1">{data.burn_snapshot.gross_burn_change} vs last month</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">NET BURN</p>
            <p className="font-mono text-2xl font-bold text-emerald">${data.burn_snapshot.net_burn.toLocaleString()}</p>
            <p className="font-body text-xs text-emerald/60 mt-1">{data.burn_snapshot.net_burn_change} vs last month</p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-6">
          <p className="font-body text-sm text-white/70 leading-relaxed">{data.quick_action.message}</p>
        </div>

        {/* Scenario Planning */}
        <div>
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">Scenario Planning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.scenarios.map((sc) => (
              <div key={sc.label} className="border border-white/10 bg-white/5 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  {iconForLabel(sc.label)}
                  <span className="flow-label text-[10px] text-white/40 tracking-widest">{sc.label}</span>
                </div>
                <p className="font-display text-lg font-bold text-white">{sc.name}</p>
                <p className="font-body text-xs text-white/40">{sc.description}</p>
                <p className="font-mono text-3xl font-bold text-white mt-4">{sc.runway_months}<span className="text-base text-white/40"> months</span></p>
                <p className="font-body text-xs text-white/40">
                  Fundraise: {sc.fundraise_date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Component Impact */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Monthly Component Impact</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-body text-xs text-white/40 font-medium">Component</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Current Month</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Last Month</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Variance</th>
                  <th className="pb-3 font-body text-xs text-white/40 font-medium text-right">Runway Impact</th>
                </tr>
              </thead>
              <tbody>
                {data.components.map((c, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 font-body text-sm text-white/80">{c.component}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">${c.current_month.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-white/60 text-right">${c.last_month.toLocaleString()}</td>
                    <td className={`py-4 font-mono text-sm text-right ${c.variance.startsWith('+') ? 'text-rose' : 'text-emerald'}`}>{c.variance}</td>
                    <td className={`py-4 font-mono text-sm text-right ${c.runway_impact.startsWith('-') ? 'text-rose' : c.runway_impact === 'Neutral' ? 'text-white/40' : 'text-emerald'}`}>{c.runway_impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
