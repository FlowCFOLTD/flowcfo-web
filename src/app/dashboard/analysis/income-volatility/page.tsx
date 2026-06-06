'use client';

import { TrendingUp, TrendingDown, Verified } from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';
import { useFreelancerIncomeVolatility } from '@/hooks/api/use-freelancer';
import FreelancerMetricsTabs from '@/components/dashboard/freelancer-metrics-tabs';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
    </div>
  );
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
}

export default function IncomeVolatilityPage() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: data, isLoading } = useFreelancerIncomeVolatility(6);

  if (userLoading || isLoading) return <LoadingSpinner />;

  const vol = data;

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
          <h2 className="font-display text-2xl text-white font-semibold">Freelancer Analysis</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-flow-gold/20 flex items-center justify-center text-flow-gold font-bold font-mono text-sm">
              {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
            </div>
            <span className="flow-label text-white/50 hidden md:block">{user?.business_name || 'Freelancer'}</span>
          </div>
        </div>
        <FreelancerMetricsTabs />
      </header>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-10">
        {!vol ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No income data available yet. Connect your accounts to see analysis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Left 8 cols */}
            <div className="col-span-12 lg:col-span-8 space-y-6">

              {/* Stability Score */}
              <section className="border border-white/10 bg-white/5 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-flow-gold/5 -mr-12 -mt-12 rounded-full" />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="flow-label text-white/50 mb-1 uppercase">STABILITY SCORE</p>
                    <h3 className="font-display text-3xl text-white font-semibold">
                      {vol.volatility_level === 'low' ? 'Low Volatility' : vol.volatility_level === 'medium' ? 'Medium Volatility' : 'High Volatility'}
                    </h3>
                  </div>
                  <TrendingUp className="h-8 w-8 text-flow-gold" />
                </div>

                {/* 6-month bar chart */}
                <div className="h-52 md:h-64 flex items-end justify-between gap-2">
                  {vol.monthly_breakdown.map((m, i) => {
                    const maxIncome = Math.max(...vol.monthly_breakdown.map(x => x.income), 1);
                    const heightPct = (m.income / maxIncome) * 100;
                    const isPeak = vol.peak_month?.month === m.month;
                    const isTrough = vol.trough_month?.month === m.month;
                    return (
                      <div key={i} className="w-full flex flex-col items-center">
                        <div className="w-full bg-white/[0.03] h-48 relative flex flex-col justify-end">
                          <div className="absolute inset-x-0 bottom-[35%] h-px bg-flow-gold/20" />
                          <div
                            className={`w-full transition-all duration-500 ${
                              isPeak ? 'bg-flow-gold' : isTrough ? 'bg-rose/60' : 'bg-flow-gold/60'
                            }`}
                            style={{ height: `${Math.max(heightPct, 2)}%` }}
                          />
                        </div>
                        <span className={`font-mono text-[10px] mt-3 ${isPeak ? 'text-flow-gold font-bold' : 'text-white/30'}`}>
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Peak / Trough */}
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-white/10 bg-white/5 p-6">
                  <p className="flow-label text-white/50 mb-2 uppercase">PEAK MONTH ({vol.peak_month?.label || '—'})</p>
                  <h4 className="font-mono text-2xl text-emerald tracking-tight">
                    {vol.peak_month ? formatCurrency(vol.peak_month.income) : '—'}
                  </h4>
                  {vol.peak_month && (
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald" />
                      <span className="font-body text-sm text-emerald font-bold">{vol.peak_month.vs_avg}</span>
                    </div>
                  )}
                </div>
                <div className="border border-white/10 bg-white/5 p-6">
                  <p className="flow-label text-white/50 mb-2 uppercase">TROUGH MONTH ({vol.trough_month?.label || '—'})</p>
                  <h4 className="font-mono text-2xl text-white tracking-tight">
                    {vol.trough_month ? formatCurrency(vol.trough_month.income) : '—'}
                  </h4>
                  {vol.trough_month && (
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-rose" />
                      <span className="font-body text-sm text-rose font-bold">{vol.trough_month.vs_avg}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expense Buffer */}
              <section className="bg-flow-black text-white p-6 md:p-8 border border-white/10">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 border border-flow-gold flex items-center justify-center shrink-0">
                    <Verified className="h-6 w-6 text-flow-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-white">{vol.expense_buffer.label} <span className="text-flow-gold">({formatCurrency(vol.expense_buffer.amount)})</span></h4>
                    <p className="font-body text-sm text-white/50 mt-1">{vol.expense_buffer.basis}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right 4 cols */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Strategic Insight */}
              {vol.strategic_insight.summary && (
                <section className="border border-white/10 bg-white/5 p-6 md:p-8">
                  <p className="flow-label text-white/50 mb-6 uppercase">STRATEGIC INSIGHT</p>
                  <div className="space-y-6">
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-flow-gold" />
                      <p className="font-body text-base font-bold text-white mb-2">{vol.strategic_insight.summary}</p>
                      <p className="font-body text-sm text-white/50">{vol.strategic_insight.detail}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Revenue Opportunity */}
              <section className="bg-flow-black border border-white/10 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 opacity-10">
                  <div className="h-40 w-40 rounded-full bg-flow-gold/10" />
                </div>
                <p className="flow-label text-flow-gold mb-4 uppercase">REVENUE OPPORTUNITY</p>
                <div className="relative z-10 space-y-4">
                  <h5 className="font-display text-xl text-white leading-tight">Retainer Model Opportunity</h5>
                  {vol.peak_month && vol.trough_month ? (
                    <p className="font-body text-sm text-white/50">
                      Your peak month ({vol.peak_month.label}) was{' '}
                      {formatCurrency(vol.peak_month.income - vol.trough_month.income)} above your
                      trough ({vol.trough_month.label}). A retainer could close {Math.round((vol.trough_month.income / vol.peak_month.income) * 100)}% of that gap.
                    </p>
                  ) : (
                    <p className="font-body text-sm text-white/50">
                      Smooth your cash flow with retainer agreements that guarantee a baseline income each month.
                    </p>
                  )}
                </div>
              </section>

              {/* Brand element */}
              <div className="h-40 border border-flow-gold/20 bg-white/[0.02] flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <p className="flow-label text-flow-gold text-center leading-relaxed text-xs tracking-[0.15em]">
                  STABILITY IS THE ULTIMATE LUXURY IN FREELANCING.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
