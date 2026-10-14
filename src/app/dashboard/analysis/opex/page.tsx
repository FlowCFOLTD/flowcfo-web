'use client';

import Link from 'next/link';
import { useOpex } from '@/hooks/api/use-finance';

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function OpexPage() {
  const { data, isLoading } = useOpex();

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
        <p className="text-white/40 font-body">No forecast data available. Connect your accounts first.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="font-body text-sm text-flow-gold hover:underline">← Dashboard</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-2">60-Day Cash Outlook</h1>
          <p className="font-body text-white/40 mt-1">Whether projected cash covers upcoming operating expenses · confidence: {data.confidence}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="STATUS" value={data.will_shortfall ? 'SHORTFALL' : 'COVERED'} color={data.will_shortfall ? 'text-rose' : 'text-emerald'} sub={`As of ${data.reference_date}`} />
          <StatCard label="ADDITIONAL CASH NEEDED" value={`$${data.shortfall_amount.toLocaleString()}`} sub={data.shortfall_date ? `Around ${data.shortfall_date}` : 'No shortfall projected'} color={data.will_shortfall ? 'text-rose' : 'text-white'} />
          <StatCard label="AVG MONTHLY OPEX" value={`$${data.monthly_opex_avg.toLocaleString()}`} sub="Trailing 90 days" />
          <StatCard label="PROJECTED END BALANCE" value={`$${data.projected_end_balance.toLocaleString()}`} sub={`${data.horizon_days}-day horizon`} />
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">What this means</h2>
          <p className="font-body text-white/60 leading-relaxed">
            {data.will_shortfall
              ? `At current burn, projected cash cannot cover 2 months of operations ($${data.two_month_opex.toLocaleString()}). The lowest projected balance is $${data.min_projected_balance.toLocaleString()}. Consider lining up working capital before ${data.shortfall_date ?? 'the shortfall window'}.`
              : `Projected cash stays above operating needs across the ${data.horizon_days}-day window. Minimum projected balance is $${data.min_projected_balance.toLocaleString()} against ~$${data.monthly_opex_avg.toLocaleString()}/mo OPEX.`}
          </p>
        </div>
      </div>
    </div>
  );
}
