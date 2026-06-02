'use client';

import { Sparkles, MapPin, BarChart3 } from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';
import { useFreelancerRateAnalysis } from '@/hooks/api/use-freelancer';
import FreelancerMetricsTabs from '@/components/dashboard/freelancer-metrics-tabs';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
    </div>
  );
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

export default function RateAnalysisPage() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: data, isLoading } = useFreelancerRateAnalysis(3);

  if (userLoading || isLoading) return <LoadingSpinner />;

  const rate = data;

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="h-20 border-b border-white/10 bg-white/5 flex items-center justify-between px-6 md:px-16 sticky top-0 z-40">
        <h2 className="flow-label text-white/50 tracking-widest">ANALYSIS / RATE DEEP-DIVE</h2>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white/30 cursor-pointer">search</span>
          <span className="material-symbols-outlined text-white/30 cursor-pointer">help_outline</span>
        </div>
      </header>

      <div className="px-6 md:px-16 pt-10 max-w-[1440px] mx-auto w-full">
        {/* Hero */}
        <div className="mb-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Rate Deep-Dive</h2>
          <p className="font-body text-base text-white/50 max-w-2xl">
            Visualizing your hourly efficiency and market positioning based on the last 12 months of contract performance.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 border-b border-white/10">
          <FreelancerMetricsTabs />
        </div>

        {!rate ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No rate data available yet. Connect your accounts to see analysis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">

            {/* Main stats grid */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avg Project Value */}
              <div className="border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="flow-label text-white/50 uppercase tracking-widest">Average Project Value</span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-3xl text-white">{formatCurrency(rate.avg_per_project)}</span>
                    <span className="flow-label text-emerald bg-emerald/10 px-2 py-1">
                      {rate.avg_per_project_yoy.label}
                    </span>
                  </div>
                </div>
                <div className="mt-6 h-14 flex items-end gap-1">
                  {rate.run_rate_history.slice(-6).map((m, i) => {
                    const maxInc = Math.max(...rate.run_rate_history.map(x => x.income), 1);
                    return (
                      <div key={i} className="w-full bg-white/[0.06]" style={{ height: `${(m.income / maxInc) * 100}%` }} />
                    );
                  })}
                </div>
              </div>

              {/* Monthly Run Rate */}
              <div className="border border-white/10 bg-white/5 p-6 md:p-8">
                <span className="flow-label text-white/50 uppercase tracking-widest">Monthly Run Rate</span>
                <div className="mt-4">
                  <span className="font-mono text-3xl text-white">{formatCurrency(rate.monthly_run_rate)}</span>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between flow-label text-[10px] text-white/40">
                    <span>REVENUE TARGET</span>
                    <span>{formatCurrency(rate.run_rate_target)}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10">
                    <div
                      className="h-full bg-flow-gold"
                      style={{ width: `${Math.min((rate.monthly_run_rate / rate.run_rate_target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Efficiency Index */}
              <div className="col-span-1 md:col-span-2 border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="flow-label text-white/50 uppercase tracking-widest">Efficiency Index</span>
                    <h3 className="font-display text-3xl text-white mt-2">{rate.efficiency_index.value.toFixed(2)}</h3>
                  </div>
                  <span className="flow-label text-white/40 text-right">
                    OPTIMAL RANGE: {rate.efficiency_index.optimal_range.min} – {rate.efficiency_index.optimal_range.max}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="font-body text-sm text-white/50">Billable Hours</span>
                      <span className="font-mono text-base text-white">{rate.billable_hours}h</span>
                    </div>
                    <div className="w-full h-6 bg-flow-gold/60" />
                    <div className="flex justify-between items-end pt-4">
                      <span className="font-body text-sm text-white/50">Admin Overhead</span>
                      <span className="font-mono text-base text-white">{rate.admin_overhead_hours}h</span>
                    </div>
                    <div className="w-full h-6 bg-white/10" />
                  </div>
                  <div className="flex flex-col justify-center md:border-l border-white/10 md:pl-8">
                    <p className="font-body text-sm text-white/50 leading-relaxed">
                      {rate.admin_insight.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Market Benchmark */}
              <div className="bg-flow-black border border-flow-gold/20 p-6 md:p-8">
                <span className="flow-label text-flow-gold/60 uppercase tracking-widest">Market Benchmark</span>
                <p className="font-display text-xl text-white mt-4 leading-snug">
                  Senior Designers in your region are charging{' '}
                  <span className="text-flow-gold font-bold">{rate.market_benchmark.premium_pct}% more</span>.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-flow-gold" />
                    <span className="font-body text-sm text-white">{rate.market_benchmark.region}</span>
                  </div>
                  <p className="font-body text-xs text-white/40 italic">{rate.market_benchmark.source}</p>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="border border-white/10 bg-white/5 p-6 md:p-8 relative overflow-hidden">
                <span className="flow-label text-flow-gold flex items-center gap-2 uppercase tracking-widest">
                  <Sparkles className="h-4 w-4" />
                  AI Suggestion
                </span>
                <p className="font-display text-xl text-white mt-6">
                  Increase daily rate to{' '}
                  <span className="border-b-2 border-flow-gold text-flow-gold">${rate.ai_suggestion.rate}</span> for new contracts.
                </p>
                <p className="font-body text-sm text-white/50 mt-4 leading-relaxed">{rate.ai_suggestion.reason}</p>
                <button className="mt-6 w-full bg-flow-black text-flow-gold py-3 flow-label hover:brightness-110 transition-all active:scale-95 border border-white/10">
                  GENERATE NEW RATE SHEET
                </button>
              </div>

              {/* Project Velocity Heatmap */}
              <div className="border border-white/10 bg-white/[0.02] h-32 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <BarChart3 className="h-6 w-6 text-flow-gold mx-auto mb-2" />
                  <p className="flow-label text-white/40">PROJECT VELOCITY HEATMAP</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
