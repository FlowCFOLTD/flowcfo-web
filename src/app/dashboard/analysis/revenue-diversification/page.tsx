'use client';

import { useRevenueDiversification } from '@/hooks/api/use-agency';
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

export default function RevenueDiversificationPage() {
  const { data, isLoading } = useRevenueDiversification(3);

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
        <p className="text-white/40 font-body">No revenue diversification data available. Connect your accounts first.</p>
      </div>
    );
  }

  const healthColor = data.portfolio_health_score >= 70 ? 'text-emerald' : data.portfolio_health_score >= 50 ? 'text-flow-gold' : 'text-rose';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <AgencyMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Revenue Diversification</h1>
          <p className="font-body text-white/40 mt-1">Concentration risk and portfolio health assessment</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="TOP CLIENT CONCENTRATION"
            value={`${data.top_client_pct}%`}
            sub="Largest single client share"
            color={data.top_client_pct > 35 ? 'text-rose' : data.top_client_pct > 20 ? 'text-flow-gold' : 'text-emerald'}
          />
          <StatCard
            label="TOP 3 CLIENTS"
            value={`${data.top_3_clients_pct}%`}
            sub="Combined share of top accounts"
          />
          <StatCard
            label="HHI INDEX"
            value={data.hhi_index.toFixed(2)}
            sub={data.hhi_index <= 15 ? 'Well diversified' : data.hhi_index <= 25 ? 'Moderate concentration' : 'Highly concentrated'}
            color={data.hhi_index <= 15 ? 'text-emerald' : data.hhi_index <= 25 ? 'text-flow-gold' : 'text-rose'}
          />
          <StatCard
            label="PORTFOLIO HEALTH"
            value={`${data.portfolio_health_score}/100`}
            sub={`${data.client_count} active clients`}
            color={healthColor}
          />
        </div>

        {/* Portfolio Risk Assessment Table */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Portfolio Risk Assessment</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Entity</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Revenue</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Share</th>
                  <th className="pb-3 font-body text-xs font-semibold tracking-wider text-white/40 uppercase">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {data.portfolio_risk_assessment.map((item) => (
                  <tr key={item.entity} className="border-b border-white/5">
                    <td className="py-4 font-body text-sm text-white/80">{item.entity}</td>
                    <td className="py-4 font-mono text-sm text-white/60">${item.revenue.toLocaleString()}</td>
                    <td className="py-4 font-mono text-sm text-white/60">{item.pct}%</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                        item.risk_level === 'critical' ? 'bg-rose/10 text-rose' :
                        item.risk_level === 'high' ? 'bg-rose/20 text-rose' :
                        item.risk_level === 'medium' ? 'bg-flow-gold/10 text-flow-gold' :
                        'bg-emerald/10 text-emerald'
                      }`}>
                        {item.risk_level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Breakdown Bars */}
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Revenue Concentration Breakdown</h2>
          <div className="space-y-4">
            {data.revenue_breakdown.map((item) => (
              <div key={item.client}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-body text-sm text-white/80">{item.client}</span>
                  <span className="font-mono text-sm text-white/60">${item.revenue.toLocaleString()} ({item.pct}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${item.pct >= 40 ? 'bg-rose' : item.pct >= 20 ? 'bg-flow-gold' : 'bg-emerald'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Note */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">STRATEGIC NOTE</h2>
          <p className="font-body text-base text-white/80 leading-relaxed">{data.strategic_note}</p>
        </div>
      </div>
    </div>
  );
}
