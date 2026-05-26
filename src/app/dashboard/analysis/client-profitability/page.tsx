'use client';

import { useClientProfitability } from '@/hooks/api/use-agency';
import AgencyMetricsTabs from '@/components/dashboard/agency-metrics-tabs';

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function ClientProfitabilityPage() {
  const { data, isLoading } = useClientProfitability(3);

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
        <p className="text-white/40 font-body">No client profitability data available. Connect your accounts first.</p>
      </div>
    );
  }

  const outlookColors: Record<string, string> = { positive: 'text-emerald', stable: 'text-flow-gold', caution: 'text-rose' };

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <AgencyMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Client Profitability Analysis</h1>
          <p className="font-body text-white/40 mt-1">P&L distribution across all active client engagements</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="OVERALL MARGIN" value={`${data.overall_margin_pct}%`} sub="Blended across all clients" color={data.overall_margin_pct >= 25 ? 'text-emerald' : data.overall_margin_pct >= 10 ? 'text-flow-gold' : 'text-rose'} />
          <StatCard label="NET PROFIT" value={`$${data.net_profit.toLocaleString()}`} sub={`Last ${data.period_months} months`} />
          <StatCard label="TOTAL REVENUE" value={`$${data.total_revenue.toLocaleString()}`} />
          <StatCard label="TOTAL EXPENSES" value={`$${data.total_expenses.toLocaleString()}`} />
        </div>

        {/* Client Breakdown Table */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Client Profitability Audit</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Client</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Revenue</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Expenses</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Profit</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Margin</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.client_breakdown.map((c) => (
                  <tr key={c.client} className="border-b border-white/5">
                    <td className="py-4 font-body text-sm text-white/80">{c.client}</td>
                    <td className="py-4 font-mono text-sm text-white/60">${c.revenue.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-white/60">${c.expenses.toLocaleString()}</td>
                    <td className={`py-4 font-mono text-sm ${c.profit >= 0 ? 'text-emerald' : 'text-rose'}`}>${c.profit.toLocaleString()}</td>
                    <td className={`py-4 font-mono text-sm ${c.margin_pct >= 25 ? 'text-emerald' : c.margin_pct >= 10 ? 'text-flow-gold' : 'text-rose'}`}>{c.margin_pct}%</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                        c.status === 'profitable' ? 'bg-emerald/10 text-emerald' :
                        c.status === 'break_even' ? 'bg-flow-gold/10 text-flow-gold' :
                        'bg-rose/10 text-rose'
                      }`}>
                        {c.status === 'profitable' ? 'Profitable' : c.status === 'break_even' ? 'Break Even' : 'At Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quarterly Outlook */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">PROJECTED REVENUE</p>
            <p className="font-mono text-xl font-bold text-white">${data.quarterly_outlook.projected_revenue.toLocaleString()}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">PROJECTED PROFIT</p>
            <p className="font-mono text-xl font-bold text-white">${data.quarterly_outlook.projected_profit.toLocaleString()}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="flow-label text-[10px] text-white/40 tracking-widest mb-2">OUTLOOK</p>
            <p className={`font-mono text-xl font-bold capitalize ${outlookColors[data.quarterly_outlook.outlook] || 'text-white'}`}>
              {data.quarterly_outlook.outlook}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="border border-white/10 bg-white/5 p-6 flex items-center gap-4">
          <span className="text-flow-gold text-lg">◆</span>
          <p className="font-body text-sm text-white/60 leading-relaxed">
            {data.profitable_count} of {data.client_breakdown.length} clients are profitable (margin &ge; 25%). {data.at_risk_count} client{data.at_risk_count !== 1 ? 's' : ''} at risk with margins below 5%.
          </p>
        </div>
      </div>
    </div>
  );
}
