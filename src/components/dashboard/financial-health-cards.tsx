'use client';

import Link from 'next/link';
import { useAging, useInvoices, useOpex, useRisk } from '@/hooks/api/use-finance';

function fmt(amount: number, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export function InvoiceAgingCard({ currency = 'USD' }: { currency?: string }) {
  const { data, isLoading } = useAging();
  const { data: list } = useInvoices();
  if (isLoading) return null;
  const overdue = data?.overdue_count ?? 0;
  const buckets = data?.buckets ?? {};
  const top = (list?.invoices ?? []).filter((i) => i.is_overdue).slice(0, 3);
  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8">
      <h3 className="flow-label tracking-[0.15em] text-white/50 mb-6 uppercase">Outstanding Invoices</h3>
      <p className="font-mono text-3xl font-bold text-white">{fmt(data?.outstanding_total ?? 0, currency)}</p>
      <p className="mt-1 font-body text-sm text-white/50">
        {data?.outstanding_count ?? 0} outstanding
        {overdue > 0 && (
          <span className="text-rose"> · {overdue} overdue ({fmt(data?.overdue_total ?? 0, currency)})</span>
        )}
      </p>
      <div className="mt-4 flex h-2 w-full overflow-hidden bg-white/10">
        {(['current', '1-30', '31-60', '60+'] as const).map((b) => {
          const total = Math.max(data?.outstanding_total ?? 0, 1);
          const w = ((buckets[b] ?? 0) / total) * 100;
          const color = b === 'current' ? 'bg-emerald' : b === '1-30' ? 'bg-flow-gold' : b === '31-60' ? 'bg-orange' : 'bg-rose';
          return <div key={b} className={color} style={{ width: `${w}%` }} title={`${b}: ${fmt(buckets[b] ?? 0, currency)}`} />;
        })}
      </div>
      {top.length > 0 && (
        <ul className="mt-4 space-y-2">
          {top.map((i) => (
            <li key={i.id} className="flex items-center justify-between font-body text-sm text-white/60">
              <span>{i.client_name} · {i.invoice_no}</span>
              <span className="font-mono text-rose">{fmt(i.amount, i.currency)} · {i.days_overdue}d</span>
            </li>
          ))}
        </ul>
      )}
      <Link href="/dashboard/analysis/invoices" className="mt-6 block w-full border border-white/20 py-3 text-center flow-label text-xs font-bold text-white hover:bg-white hover:text-flow-black transition-all tracking-[0.1em]">
        MANAGE INVOICES
      </Link>
    </section>
  );
}

export function OpexOutlookCard({ currency = 'USD' }: { currency?: string }) {
  const { data, isLoading } = useOpex();
  if (isLoading || !data) return null;
  const danger = data.will_shortfall;
  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8">
      <h3 className="flow-label tracking-[0.15em] text-white/50 mb-6 uppercase">60-Day Cash Outlook</h3>
      <p className={`font-mono text-3xl font-bold ${danger ? 'text-rose' : 'text-emerald'}`}>
        {danger ? fmt(data.shortfall_amount, currency) : fmt(data.projected_end_balance, currency)}
      </p>
      <p className="mt-1 font-body text-sm text-white/50">
        {danger ? 'additional cash needed' : 'projected balance'} · ~{fmt(data.monthly_opex_avg, currency)}/mo OPEX
      </p>
      {danger && data.shortfall_date && (
        <p className="mt-2 font-body text-sm text-rose">Shortfall around {data.shortfall_date}</p>
      )}
      <Link href="/dashboard/analysis/opex" className="mt-6 block w-full border border-white/20 py-3 text-center flow-label text-xs font-bold text-white hover:bg-white hover:text-flow-black transition-all tracking-[0.1em]">
        VIEW FORECAST
      </Link>
    </section>
  );
}

export function RiskScoreCard() {
  const { data, isLoading } = useRisk();
  if (isLoading || !data) return null;
  const color = data.band === 'critical' ? 'text-rose' : data.band === 'high' ? 'text-orange' : data.band === 'moderate' ? 'text-flow-gold' : 'text-emerald';
  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8">
      <h3 className="flow-label tracking-[0.15em] text-white/50 mb-6 uppercase">Financial Risk</h3>
      <div className="flex items-baseline gap-3">
        <p className={`font-mono text-3xl font-bold ${color}`}>{data.risk_score}<span className="text-base text-white/40">/100</span></p>
        <p className={`flow-label text-xs uppercase ${color}`}>{data.band}</p>
      </div>
      {data.drivers.slice(0, 2).map((d) => (
        <p key={d.factor} className="mt-2 font-body text-sm text-white/50">{d.detail}</p>
      ))}
      <Link href="/dashboard/analysis/risk" className="mt-6 block w-full border border-white/20 py-3 text-center flow-label text-xs font-bold text-white hover:bg-white hover:text-flow-black transition-all tracking-[0.1em]">
        RISK BREAKDOWN
      </Link>
    </section>
  );
}
