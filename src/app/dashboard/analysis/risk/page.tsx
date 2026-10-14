'use client';

import Link from 'next/link';
import { useRisk } from '@/hooks/api/use-finance';

const bandColor: Record<string, string> = {
  critical: 'text-rose',
  high: 'text-orange',
  moderate: 'text-flow-gold',
  low: 'text-emerald',
};

export default function RiskPage() {
  const { data, isLoading } = useRisk();

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
        <p className="text-white/40 font-body">No risk data available. Connect your accounts first.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="font-body text-sm text-flow-gold hover:underline">← Dashboard</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-2">Financial Risk Breakdown</h1>
          <p className="font-body text-white/40 mt-1">Explainable score from concentration, volatility, cash coverage, tax, receivables & margin · confidence: {data.confidence}</p>
        </div>

        <div className="border border-white/10 bg-white/5 p-8 md:p-10 text-center">
          <p className={`font-mono text-6xl font-bold ${bandColor[data.band] ?? 'text-white'}`}>{data.risk_score}<span className="text-2xl text-white/40">/100</span></p>
          <p className={`flow-label mt-2 uppercase tracking-[0.2em] ${bandColor[data.band] ?? 'text-white'}`}>{data.band} risk</p>
          <p className="mt-2 font-body text-sm text-white/40">Health score: {data.health_score}/100 · as of {data.reference_date}</p>
        </div>

        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Risk Drivers</h2>
          <div className="space-y-5">
            {data.drivers.map((d) => (
              <div key={d.factor}>
                <div className="flex items-center justify-between font-body text-sm mb-1">
                  <span className="text-white/70 capitalize">{d.factor.replace(/_/g, ' ')}</span>
                  <span className={`font-mono ${d.points > 0 ? 'text-rose' : 'text-emerald'}`}>+{d.points} pts</span>
                </div>
                <div className="h-1.5 w-full bg-white/10">
                  <div className={d.points > 0 ? 'h-full bg-rose' : 'h-full bg-emerald'} style={{ width: `${Math.min(d.points * 4, 100)}%` }} />
                </div>
                <p className="mt-1 font-body text-xs text-white/40">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
