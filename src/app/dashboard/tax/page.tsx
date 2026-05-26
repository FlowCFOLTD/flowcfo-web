'use client';

import { useDashboard } from '@/hooks/api/use-dashboard';

export default function TaxPage() {
  const { data, isLoading } = useDashboard();
  const dash: any = data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (!dash) {
    return (
      <div className="px-6 md:px-16 py-12">
        <p className="text-white/40 font-body">No tax data available. Connect your accounts first.</p>
      </div>
    );
  }

  const tax = dash.tax_reserve_status || {};
  const pct = tax.percentage || 0;
  const shortfall = tax.shortfall || 0;
  const estimated = tax.estimated_tax || 0;
  const setAside = tax.set_aside || 0;

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Tax Reserve</h1>
          <p className="font-body text-white/40 mt-1">
            Projected tax obligations and quarterly reserve strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">ESTIMATED TAX</span>
            <p className="font-mono text-2xl font-bold text-white">
              {estimated > 0 ? `$${estimated.toLocaleString()}` : '—'}
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">RESERVE FUNDED</span>
            <p className="font-mono text-2xl font-bold text-flow-gold">
              {setAside > 0 ? `$${setAside.toLocaleString()}` : '—'}
            </p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">SHORTFALL</span>
            <p className={`font-mono text-2xl font-bold ${shortfall > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {shortfall > 0 ? `$${shortfall.toLocaleString()}` : '$0'}
            </p>
            <p className="font-body text-xs text-white/40">{pct}% funded</p>
          </div>
        </div>

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">TAX ADVISORY</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {pct >= 90
              ? `Your tax reserve is well-funded at ${pct}%. Continue maintaining the current allocation rate to stay ahead of quarterly estimated payments.`
              : pct >= 50
              ? `Your tax reserve is ${pct}% funded with a $${shortfall.toLocaleString()} shortfall. Increase your quarterly set-aside to avoid a cash crunch at tax time.`
              : `Your tax reserve is only ${pct}% funded with a $${shortfall.toLocaleString()} shortfall. Consider adjusting your budget to prioritize tax reserve contributions.`}
          </p>
        </div>
      </div>
    </div>
  );
}
