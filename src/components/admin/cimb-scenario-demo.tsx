'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ArrowRight, BarChart3, BellRing, BriefcaseBusiness,
  CalendarClock, Check, CircleDollarSign, Download, Landmark, Loader2,
  MessageCircleMore, Play, ShieldAlert, Sparkles, TrendingDown, WalletCards,
} from 'lucide-react';
import { cimbDemoApi, type DemoAnalysis, type DemoEnvelope } from '@/lib/api/cimb-demo';

type Scenario = 'consumer' | 'business';

const SCENARIOS = {
  consumer: {
    file: '/demo/cimb-consumer.json', button: 'Run consumer intelligence', eyebrow: 'Consumer banking scenario',
    title: 'From transaction history to timely, personal guidance.',
    introduction: 'FlowCFO reads spending, balance and upcoming commitments together—then explains what the customer should protect, adjust and consider next.',
  },
  business: {
    file: '/demo/cimb-business.json', button: 'Run virtual CFO & early warning', eyebrow: 'Business banking + early warning',
    title: 'See the cash problem before it becomes a repayment problem.',
    introduction: 'FlowCFO monitors operating cash flow, receivables, obligations, repayment dates and FX exposure as one forward-looking financial picture.',
  },
};

function money(value: unknown, currency: string) {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value || 0));
}

function compactDate(value: unknown) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'short' }).format(new Date(`${String(value)}T00:00:00`));
}

function RequirementCard({ number, title, statement, children, tone = 'plain' }: {
  number: string; title: string; statement: string; children: React.ReactNode; tone?: 'plain' | 'coral' | 'green';
}) {
  const toneClass = tone === 'coral' ? 'border-[#D4AF37]/40 bg-[#FFF9DC]' : tone === 'green' ? 'border-[#CFE0D6] bg-[#EAF3EE]' : 'border-[#E0DFD9] bg-white';
  return <article className={`rounded-2xl border p-5 shadow-[0_8px_24px_rgba(10,10,10,.035)] ${toneClass}`}>
    <div className="flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-[11px] font-bold text-white">{number}</span><div><h3 className="font-semibold text-[#0A0A0A]">{title}</h3><p className="mt-1 text-sm leading-5 text-[#62625F]">{statement}</p></div></div>
    <div className="mt-4">{children}</div>
  </article>;
}

function EvidenceFooter({ result, elapsed }: { result: DemoEnvelope<DemoAnalysis>; elapsed: number | null }) {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E0DFD9] pt-4 text-[11px] text-[#73736F]">
    <span className="inline-flex items-center gap-1.5 font-semibold text-[#1B4332]"><Check className="h-3.5 w-3.5" /> Live API response</span><span>{elapsed} ms round trip</span><span>Request {result.meta.request_id}</span><span>{result.data.calculation_version}</span><span>Synthetic data</span>
  </div>;
}

function ConsumerResults({ result }: { result: DemoAnalysis }) {
  const categories = result.spending_by_category ?? [];
  const maxCategory = Math.max(...categories.map((item) => item.amount), 1);
  const budget = result.budget_actions?.[0];
  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
      <div className="rounded-2xl bg-[#0A0A0A] p-6 text-white shadow-[0_18px_45px_rgba(10,10,10,0.16)]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E4C06A]"><MessageCircleMore className="h-4 w-4" /> Personal financial advisor</div>
        <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white">{result.advisor?.headline}</h3><p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">{result.advisor?.message}</p>
        <p className="mt-5 text-xs text-white/45">The guidance is explainable and grounded in the customer&apos;s own cash position—not a generic chatbot response.</p>
      </div>
      <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#FFF9DC] p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#735C00]">30-day position</p><p className="mt-3 font-display text-4xl text-[#0A0A0A]">{money(result.summary.projected_30_day_buffer, result.currency)}</p><p className="mt-1 text-sm text-[#62625F]">projected after known commitments</p><div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><p className="text-[#858681]">Commitments</p><p className="font-semibold text-[#0A0A0A]">{money(result.summary.upcoming_commitments, result.currency)}</p></div><div><p className="text-[#858681]">Savings rate</p><p className="font-semibold text-[#0A0A0A]">{String(result.summary.savings_rate_pct)}%</p></div></div></div>
    </div>
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <RequirementCard number="1" title="Analyze spending behaviour" statement="Categorize the last 30 days and reveal where money is actually going."><div className="space-y-2.5">{categories.slice(0, 5).map((item) => <div key={item.category}><div className="flex justify-between text-xs"><span className="capitalize text-[#4F504D]">{item.category}</span><strong className="text-[#0A0A0A]">{money(item.amount, result.currency)}</strong></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#ECEBE5]"><div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${Math.max(8, item.amount / maxCategory * 100)}%` }} /></div></div>)}</div></RequirementCard>
      <RequirementCard number="2" title="Remind upcoming commitments" statement="Move the warning before the due date—not after a missed payment."><div className="space-y-2">{result.alerts.slice(0, 3).map((alert, index) => <div key={index} className="flex items-center justify-between rounded-xl bg-[#F7F7F4] px-3 py-2.5 text-sm"><span className="flex items-center gap-2 text-[#3F403D]"><CalendarClock className="h-4 w-4 text-[#D4AF37]" />{String(alert.title)}</span><strong className="text-[#0A0A0A]">{money(alert.amount, result.currency)}</strong></div>)}</div></RequirementCard>
      <RequirementCard number="3" title="Recommend a better budget" statement="Turn a pattern into one specific, achievable adjustment." tone="coral">{budget ? <div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#735C00]">Budget exception</p><p className="mt-2 text-lg font-semibold capitalize text-[#0A0A0A]">{String(budget.category)} is {String(budget.actual_pct)}% of income</p><p className="mt-2 text-sm leading-6 text-[#62625F]">Recommended reduction: <strong className="text-[#0A0A0A]">{money(budget.monthly_reduction, result.currency)} this month</strong> to return to the {String(budget.target_pct)}% target.</p></div> : <p className="text-sm text-[#62625F]">Spending remains within the illustrative budget policy.</p>}</RequirementCard>
      <RequirementCard number="4" title="Act as a personal financial advisor" statement="Explain the priority in plain language and preserve customer agency." tone="green"><div className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-6 text-[#4F504D]"><Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#1B4332]" /><p>Reserve commitments first, correct the largest avoidable overspend, then decide what part of the remaining buffer can be saved.</p></div></RequirementCard>
      <RequirementCard number="5" title="Recommend suitable CIMB products" statement="Match a real need to a bank-approved catalogue and eligibility policy—not an uncontrolled advertisement." tone="green"><div className="space-y-2">{result.product_recommendations.map((product, index) => <div key={index} className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 font-semibold text-[#0A0A0A]"><Landmark className="h-4 w-4 text-[#1B4332]" />{String(product.name)}</p><p className="mt-1 text-xs leading-5 text-[#62625F]">{String(product.reason)}</p></div>)}</div></RequirementCard>
    </div>
  </div>;
}

function BusinessResults({ result }: { result: DemoAnalysis }) {
  const warning = result.early_warning; const prevention = result.delinquency_prevention;
  const critical = result.alerts.find((item) => String(item.title).includes('liquidity'));
  const obligations = result.alerts.filter((item) => String(item.title).includes('due in'));
  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-2xl bg-[#0A0A0A] p-6 text-white shadow-[0_18px_45px_rgba(10,10,10,0.16)]"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E4C06A]"><BriefcaseBusiness className="h-4 w-4" /> Virtual CFO brief</div><h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white">{result.virtual_cfo?.headline}</h3><p className="mt-4 text-sm leading-7 text-white/75">{result.virtual_cfo?.message}</p></div>
      <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#FFF9DC] p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#735C00]">Early-warning status</p><p className="mt-2 font-display text-4xl text-[#0A0A0A]">{warning?.score}/100</p><p className="text-sm font-semibold capitalize text-[#735C00]">{warning?.band} risk</p></div><ShieldAlert className="h-8 w-8 text-[#D4AF37]" /></div><div className="mt-4 space-y-1.5">{warning?.drivers.map((driver) => <p key={driver} className="flex gap-2 text-xs leading-5 text-[#62625F]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />{driver}</p>)}</div></div>
    </div>
    <div className="grid gap-4 xl:grid-cols-3">
      <RequirementCard number="1" title="Monitor business cash flow" statement="Compare the latest operating period with the previous one."><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#F7F7F4] p-3"><p className="text-xs text-[#7C8984]">Prior 30 days</p><p className="mt-1 font-semibold text-[#1B4332]">{money(result.summary.prior_30_day_net_cash_flow, result.currency)}</p></div><div className="rounded-xl bg-[#FFF4E8] p-3"><p className="text-xs text-[#8A6D12]">Recent 30 days</p><p className="mt-1 font-semibold text-[#B42318]">{money(result.summary.recent_30_day_net_cash_flow, result.currency)}</p></div></div><p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#B42318]"><TrendingDown className="h-4 w-4" />{String(result.summary.deterioration_pct)}% deterioration detected</p></RequirementCard>
      <RequirementCard number="2" title="Predict liquidity gaps" statement="Project cash across 60 days using expected inflows, obligations and operating trend." tone="coral"><div className="rounded-xl bg-white p-4"><p className="text-xs text-[#6F706C]">First projected shortfall</p><p className="mt-1 font-display text-3xl text-[#0A0A0A]">{compactDate(result.summary.first_shortfall_date)}</p><p className="mt-2 text-sm text-[#62625F]">Lowest projected balance: <strong className="text-[#B42318]">{money(result.summary.minimum_projected_balance, result.currency)}</strong></p>{critical && <p className="mt-3 text-xs leading-5 text-[#6F706C]">Action: {String(critical.recommended_action)}</p>}</div></RequirementCard>
      <RequirementCard number="3" title="Alert upcoming obligations" statement="Put payroll, suppliers and tax into the same forward cash view."><div className="space-y-2">{obligations.slice(0, 3).map((item, index) => <div key={index} className="flex items-center justify-between rounded-xl bg-[#F7F7F4] px-3 py-2.5 text-sm"><span className="flex items-center gap-2 text-[#3F403D]"><BellRing className="h-4 w-4 text-[#D4AF37]" />{String(item.title)}</span><strong>{money(item.amount, result.currency)}</strong></div>)}</div></RequirementCard>
      <RequirementCard number="4" title="Suggest financing when needed" statement="Refer the need into CIMB eligibility—not automatic credit approval." tone="green"><div className="space-y-2">{result.product_recommendations.map((product, index) => <div key={index} className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 font-semibold text-[#0A0A0A]"><CircleDollarSign className="h-4 w-4 text-[#1B4332]" />{String(product.name)}</p><p className="mt-1 text-xs leading-5 text-[#62625F]">{String(product.reason)}</p></div>)}</div></RequirementCard>
      <RequirementCard number="5" title="Recommend FX opportunities" statement="Connect known currency exposure to a treasury review at the right moment." tone="green">{result.fx_opportunities?.map((fx, index) => <div key={index} className="rounded-xl bg-white p-4"><p className="font-semibold text-[#0A0A0A]">{String(fx.currency)} payable · {money(fx.amount, String(fx.currency))}</p><p className="mt-2 text-sm leading-6 text-[#62625F]">Mock spot {String(fx.spot_rate)} is inside the budget rate {String(fx.budget_rate)}. Prompt CIMB treasury review before {compactDate(fx.due_date)}.</p></div>)}</RequirementCard>
      <RequirementCard number="6" title="Prevent delinquency before due date" statement="Turn repayment risk into an intervention window for CIMB and the customer." tone="coral">{prevention && <div className="rounded-xl bg-white p-4"><div className="flex items-end justify-between"><div><p className="text-xs text-[#6F706C]">Contact customer by</p><p className="mt-1 font-display text-3xl text-[#0A0A0A]">{compactDate(prevention.intervention_by)}</p></div><ArrowRight className="mb-2 h-5 w-5 text-[#D4AF37]" /><div className="text-right"><p className="text-xs text-[#6F706C]">Repayment due</p><p className="mt-1 font-display text-3xl text-[#0A0A0A]">{compactDate(prevention.repayment_date)}</p></div></div><p className="mt-3 text-sm font-semibold text-[#B42318]">Coverage {prevention.coverage_ratio}× · {money(prevention.repayment_amount, result.currency)} due</p><p className="mt-2 text-xs leading-5 text-[#62625F]">{prevention.action}</p></div>}</RequirementCard>
    </div>
  </div>;
}

export default function CimbScenarioDemo({ scenario, autoRun = false }: { scenario: Scenario; autoRun?: boolean }) {
  const [result, setResult] = useState<DemoEnvelope<DemoAnalysis> | null>(null); const [elapsed, setElapsed] = useState<number | null>(null); const [error, setError] = useState(''); const [running, setRunning] = useState(false); const config = SCENARIOS[scenario];
  const autoRan = useRef(false);
  const run = useCallback(async () => { setRunning(true); setError(''); const started = performance.now(); try { const source = await fetch(config.file, { cache: 'no-store' }); if (!source.ok) throw new Error('The synthetic demonstration file could not be loaded.'); const payload = await source.json(); const response = scenario === 'consumer' ? await cimbDemoApi.consumer(payload) : await cimbDemoApi.business(payload); setResult(response); setElapsed(Math.round(performance.now() - started)); } catch (caught) { setError(caught instanceof Error ? caught.message : 'The demonstration request failed.'); setElapsed(Math.round(performance.now() - started)); } finally { setRunning(false); } }, [config.file, scenario]);
  useEffect(() => { if (autoRun && !autoRan.current) { autoRan.current = true; void run(); } }, [autoRun, run]); // Local visual QA only when requested by the parent.
  const preview = scenario === 'consumer' ? [[WalletCards, 'Understand', 'Spending, balance and commitments become one customer picture.'], [BarChart3, 'Advise', 'The API returns a budget adjustment and plain-language guidance.'], [Landmark, 'Connect', 'A need can be matched to CIMB-approved products and rules.']] : [[BarChart3, 'Monitor', 'Cash flow, receivables, obligations, repayments and FX stay connected.'], [AlertTriangle, 'Predict', 'Deterioration and a 60-day shortfall surface before failure.'], [BriefcaseBusiness, 'Intervene', 'The virtual CFO proposes the next bank and customer action.']];
  return <section><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#735C00]">{config.eyebrow}</p><h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-.04em] text-[#0A0A0A] md:text-5xl">{config.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#62625F]">{config.introduction}</p></div><div className="flex shrink-0 flex-wrap gap-2"><a href={config.file} download className="inline-flex items-center gap-2 rounded-lg border border-[#D3D2CC] bg-white px-4 py-3 text-xs font-bold text-[#3F403D] shadow-sm hover:border-[#0A0A0A]"><Download className="h-4 w-4" /> Inspect synthetic input</a><button onClick={() => void run()} disabled={running} className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-xs font-bold text-[#0A0A0A] shadow-[0_10px_24px_rgba(212,175,55,.22)] hover:bg-[#C8A32E] disabled:opacity-60">{running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}{config.button}</button></div></div>
    {!result && !error && <div className="mt-8 grid gap-4 rounded-2xl border border-[#E0DFD9] bg-white p-6 shadow-[0_16px_45px_rgba(10,10,10,.05)] md:grid-cols-3">{preview.map(([Icon, title, text], index) => { const Graphic = Icon as typeof BarChart3; return <div key={String(title)} className="relative rounded-xl border border-[#ECEBE5] bg-[#F7F7F4] p-4"><span className="absolute right-3 top-2 font-mono text-2xl font-bold text-[#E1E0DA]">0{index + 1}</span><Graphic className="relative h-5 w-5 text-[#8A6D12]" /><p className="relative mt-3 font-semibold text-[#0A0A0A]">{String(title)}</p><p className="relative mt-1 text-sm leading-6 text-[#62625F]">{String(text)}</p></div>; })}</div>}
    {error && <div className="mt-6 rounded-xl border border-[#D4AF37]/40 bg-[#FFF4E8] p-4 text-sm text-[#9C3B2E]">{error}</div>}
    {result && <div className="mt-8 space-y-5">{scenario === 'consumer' ? <ConsumerResults result={result.data} /> : <BusinessResults result={result.data} />}<EvidenceFooter result={result} elapsed={elapsed} /></div>}
  </section>;
}
