'use client';

import { useDashboard } from '@/hooks/api/use-dashboard';

export default function CashFlowPage() {
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
        <p className="text-white/40 font-body">No cash flow data available. Connect your accounts first.</p>
      </div>
    );
  }

  const cf = dash.cash_flow || [];
  const totalInflow = cf.reduce((s: number, m: any) => s + (m.income || 0), 0);
  const totalOutflow = cf.reduce((s: number, m: any) => s + (m.expenses || 0), 0);
  const avgInflow = cf.length > 0 ? totalInflow / cf.length : 0;
  const avgOutflow = cf.length > 0 ? totalOutflow / cf.length : 0;
  const netAvg = avgInflow - avgOutflow;
  const maxBalance = Math.max(...cf.map((m: any) => m.balance || 0), 0);

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Cash Flow Analysis</h1>
          <p className="font-body text-white/40 mt-1">
            Burn rate, income trends, and runway-informed cash positioning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">30-DAY CASH FLOW</span>
            <p className={`font-mono text-2xl font-bold ${(dash.cash_flow_30d || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {dash.cash_flow_30d != null ? `${dash.cash_flow_30d >= 0 ? '+' : ''}$${Math.abs(dash.cash_flow_30d).toLocaleString()}` : '—'}
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">MONTHLY BURN</span>
            <p className="font-mono text-2xl font-bold text-rose-400">
              {dash.monthly_burn != null ? `$${dash.monthly_burn.toLocaleString()}` : '—'}
            </p>
            {dash.burn_change_pct != null && (
              <p className={`font-body text-xs ${dash.burn_change_pct <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {dash.burn_change_pct >= 0 ? '+' : ''}{dash.burn_change_pct}% vs prev period
              </p>
            )}
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">RUNWAY</span>
            <p className="font-mono text-2xl font-bold text-flow-gold">
              {dash.runway_months != null ? `${dash.runway_months}m` : '—'}
            </p>
            <p className={`font-body text-xs ${dash.runway_status === 'healthy' ? 'text-emerald-400' : dash.runway_status === 'warning' ? 'text-amber-400' : 'text-rose-400'}`}>
              {dash.runway_status === 'healthy' ? 'Healthy' : dash.runway_status === 'warning' ? 'Warning' : 'Critical'}
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6 space-y-2">
            <span className="flow-label text-[10px] text-white/40 tracking-widest">AVG MONTHLY INFLOW</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">
              {avgInflow > 0 ? `$${Math.round(avgInflow).toLocaleString()}` : '—'}
            </p>
          </div>
        </div>

        {cf.length > 0 && (
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Monthly Cash Flow Trend</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-[120px_repeat(4,1fr)] gap-3 text-[10px] font-body text-white/30 uppercase tracking-wider pb-2 border-b border-white/10">
                <span>Month</span>
                <span>Income</span>
                <span>Expenses</span>
                <span>Net</span>
                <span>Balance</span>
              </div>
              {cf.map((m: any) => {
                const net = m.income - m.expenses;
                return (
                  <div key={m.date} className="grid grid-cols-[120px_repeat(4,1fr)] gap-3 text-sm font-body items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/60 font-medium">{m.date}</span>
                    <span className="font-mono text-emerald-400">+${Math.round(m.income || 0).toLocaleString()}</span>
                    <span className="font-mono text-rose-400">-${Math.round(m.expenses || 0).toLocaleString()}</span>
                    <span className={`font-mono ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {net >= 0 ? '+' : ''}${Math.round(net || 0).toLocaleString()}
                    </span>
                    <span className="font-mono text-white/80">${Math.round(m.balance || 0).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">BURN & CASH PROJECTION</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {netAvg > 0
              ? `Positive net cash flow averaging $${Math.round(netAvg).toLocaleString()}/mo. With $${Math.round(maxBalance).toLocaleString()} peak balance and ${dash.runway_months || '—'} months runway, your current trajectory supports ${dash.runway_months && dash.runway_months > 12 ? 'aggressive growth investment.' : 'focused burn management with a path to the next milestone.'}`
              : `Net burn of $${Math.abs(Math.round(netAvg)).toLocaleString()}/mo with ${dash.runway_months || '—'} months of runway. ${dash.runway_months && dash.runway_months < 6 ? 'Prioritize revenue acceleration or cost reduction to extend runway.' : 'Monitor expense growth relative to revenue to maintain runway health.'}`}
          </p>
        </div>
      </div>
    </div>
  );
}
