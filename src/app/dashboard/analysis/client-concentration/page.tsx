'use client';

import { useFreelancerClientConcentration } from '@/hooks/api/use-freelancer';
import FreelancerMetricsTabs from '@/components/dashboard/freelancer-metrics-tabs';

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function ClientConcentrationPage() {
  const { data, isLoading } = useFreelancerClientConcentration();

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
        <p className="text-white/40 font-body">No client concentration data available. Connect your accounts first.</p>
      </div>
    );
  }

  const levelColor = data.concentration_level === 'high' ? 'text-rose' : data.concentration_level === 'medium' ? 'text-flow-gold' : 'text-emerald';
  const maxShare = Math.max(...data.clients.map((c) => c.share_pct), 1);

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <FreelancerMetricsTabs />

        <div className="mt-6">
          <h1 className="font-display text-3xl font-bold text-white">Client Concentration</h1>
          <p className="font-body text-white/40 mt-1">Revenue concentration risk and diversification analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="ACTIVE CLIENTS" value={`${data.client_count}`} sub="Last 90 days" />
          <StatCard label="TOTAL REVENUE" value={`$${data.total_revenue.toLocaleString()}`} sub="Trailing 90 days" />
          <StatCard label="TOP CLIENT SHARE" value={`${data.top_client_share_pct}%`} color={levelColor} sub="Revenue concentration" />
          <StatCard label="RISK LEVEL" value={data.concentration_level.toUpperCase()} color={levelColor} sub="Diversification score" />
        </div>

        {/* Client breakdown */}
        <section className="border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-bold font-display text-lg text-white">Client Breakdown</h2>
          </div>
          <div className="divide-y divide-white/5">
            {data.clients.map((client, i) => (
              <div key={client.name} className="px-6 py-5 flex items-center gap-6">
                <span className="font-mono text-sm text-white/20 w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm font-bold text-white">{client.name}</span>
                    <span className="font-mono text-sm text-white/70">${client.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        client.share_pct === data.top_client_share_pct ? 'bg-flow-gold' : 'bg-white/20'
                      }`}
                      style={{ width: `${(client.share_pct / maxShare) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-white/30">{client.share_pct}% of revenue</span>
                    <span className="text-[10px] text-white/30">{client.transaction_count} transactions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Diversification note */}
        <div className="border border-flow-gold/30 bg-flow-gold/5 p-6">
          <p className="font-body text-sm text-white/80 leading-relaxed">{data.diversification_note}</p>
        </div>
      </div>
    </div>
  );
}
