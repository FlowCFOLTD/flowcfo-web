'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, BellRing,
  BriefcaseBusiness, CalendarClock, Check, CircleDollarSign, DatabaseZap, Landmark,
  Loader2, Play, ShieldAlert, Sparkles, WalletCards,
} from 'lucide-react';
import { productDemoApi, type ProductAlert, type ProductDemoResult } from '@/lib/api/product-demo';

type Scenario = 'consumer' | 'business';
const COPY = {
  consumer: {
    eyebrow: 'Personal financial guidance · live product API',
    title: 'Turn spending and upcoming bills into practical next steps.',
    intro: 'This scenario creates an isolated synthetic personal workspace, imports a dated statement through the product API, and reads spending, commitments, guidance and product matches back from that same workspace.',
    button: 'Run personal guidance',
  },
  business: {
    eyebrow: 'SME cash-flow intelligence · live product API',
    title: 'See the obligations and cash signals shaping the next 60 days.',
    intro: 'This scenario creates an isolated synthetic business workspace, imports a dated statement through the product API, and reads its cash outlook, obligation alerts and catalogue matches from that same workspace.',
    button: 'Run SME cash-flow review',
  },
} as const;

const money = (amount: number | string | null | undefined, currency: string) => new Intl.NumberFormat(undefined, {
  style: 'currency', currency, maximumFractionDigits: 0,
}).format(Number(amount ?? 0));
const dayLabel = (value?: string | null) => value
  ? new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`))
  : 'No projected cash gap';

function AlertList({ alerts, currency }: { alerts: ProductAlert[]; currency: string }) {
  if (!alerts.length) return <p className="rounded-xl bg-[#f5f8f6] p-4 text-sm leading-6 text-[#586b63]">No active rule alerts for the recorded sample at this moment. Commitments and the cash outlook remain visible below.</p>;
  return <div className="space-y-2">{alerts.slice(0, 5).map((alert) => <article key={alert.id} className="rounded-xl border border-[#dce8e1] bg-white p-3.5">
    <p className="flex items-center gap-2 text-sm font-semibold text-[#153f3a]"><BellRing className="h-4 w-4 shrink-0 text-[#087f75]" />{alert.title}</p>
    <p className="mt-1 text-xs leading-5 text-[#53665f]">{alert.message}</p>
    {typeof alert.evidence.amount === 'string' || typeof alert.evidence.amount === 'number'
      ? <p className="mt-2 text-xs font-semibold text-[#173b38]">Recorded amount: {money(alert.evidence.amount as number | string, currency)}</p>
      : null}
  </article>)}</div>;
}

function ConsumerView({ result }: { result: ProductDemoResult }) {
  const { overview, spending, guidance, offers } = result;
  const largest = Math.max(1, ...spending.category_spend.map((item) => item.amount));
  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-2xl bg-[#123e3b] p-6 text-white">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#c9ec88]"><Sparkles className="h-4 w-4" /> Guidance grounded in the recorded picture</p>
        <h3 className="mt-3 font-display text-2xl font-bold">A clear view of spending, planned bills and available cash.</h3>
        <p className="mt-3 text-sm leading-6 text-white/75">{guidance.actions[0]?.action ?? 'Keep the current commitments visible and review new spending against the budget you set.'}</p>
        <p className="mt-3 text-xs leading-5 text-white/55">{guidance.guidance_boundary}</p>
      </section>
      <section className="rounded-2xl border border-[#d7e9e0] bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#587068]">Cash after known commitments · 60-day baseline</p>
        <p className="mt-3 font-display text-4xl font-bold text-[#153f3a]">{money(overview.cash_outlook.projected_end_balance, overview.currency)}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><p className="text-[#708079]">Current recorded cash</p><p className="font-semibold text-[#173b38]">{money(overview.cash_outlook.current_balance, overview.currency)}</p></div><div><p className="text-[#708079]">Upcoming outflows</p><p className="font-semibold text-[#173b38]">{money(overview.commitments.outflows, overview.currency)}</p></div></div>
      </section>
    </div>

    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><BarChart3 className="h-4 w-4 text-[#087f75]" /> Spending behaviour</h3><p className="mt-1 text-xs text-[#65766f]">Posted outflows, net of linked refunds where recorded.</p><div className="mt-4 space-y-3">{spending.category_spend.slice(0, 6).map((item) => <div key={item.category}><div className="flex justify-between gap-2 text-xs"><span className="text-[#53665f]">{item.category}</span><strong className="text-[#173b38]">{money(item.amount, overview.currency)}</strong></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#edf3ef]"><div className="h-full rounded-full bg-[#087f75]" style={{ width: `${Math.max(3, item.amount / largest * 100)}%` }} /></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><WalletCards className="h-4 w-4 text-[#087f75]" /> Budget recommendations</h3><div className="mt-4 space-y-3">{spending.budgets.length ? spending.budgets.map((budget) => <div key={budget.budget_id} className="rounded-xl bg-[#f4f8f6] p-3"><div className="flex justify-between text-sm"><strong className="text-[#173b38]">{budget.category}</strong><span className="font-semibold text-[#087f75]">{budget.status.replaceAll('_', ' ')}</span></div><p className="mt-1 text-xs text-[#53665f]">{money(budget.spent, budget.currency)} recorded of {money(budget.limit, budget.currency)} {budget.period} limit</p></div>) : <p className="text-sm text-[#65766f]">No customer budget is configured yet.</p>}{spending.recommendations.map((item, index) => <p key={`${item.type}-${index}`} className="text-xs leading-5 text-[#53665f]">{item.message}</p>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CalendarClock className="h-4 w-4 text-[#087f75]" /> Upcoming commitments</h3><div className="mt-4 space-y-2">{overview.commitments.items.slice(0, 5).map((item) => <div key={`${item.id}-${item.due_on}`} className="flex items-start justify-between gap-3 rounded-xl bg-[#f4f8f6] p-3"><div><p className="text-sm font-semibold text-[#173b38]">{item.name}</p><p className="mt-1 text-xs text-[#65766f]">Due {dayLabel(item.due_on)}</p></div><strong className="whitespace-nowrap text-sm text-[#173b38]">{money(item.amount, item.currency)}</strong></div>)}</div></article>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-[#dce8e1] bg-[#f4f8f6] p-5"><h3 className="font-semibold text-[#173b38]">Relevant catalogue matches</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">Matches use only the configured sample catalogue and recorded categories. They are not eligibility or suitability decisions.</p><div className="mt-3 space-y-2">{offers.length ? offers.map((offer) => <div key={offer.offer_id} className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 text-sm font-semibold text-[#173b38]"><Landmark className="h-4 w-4 text-[#087f75]" />{offer.name}</p><p className="mt-1 text-xs leading-5 text-[#53665f]">{offer.reason}. Provider assessment required.</p></div>) : <p className="text-sm text-[#65766f]">No configured offers match the recorded sample.</p>}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="font-semibold text-[#173b38]">Rule-based reminders</h3><p className="mt-1 text-xs text-[#65766f]">Created from recorded due dates and evaluated by the product alert rules.</p><div className="mt-3"><AlertList alerts={result.alerts} currency={overview.currency} /></div></article>
    </div>
  </div>;
}

function BusinessView({ result }: { result: ProductDemoResult }) {
  const { overview, guidance, offers, alerts } = result;
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const priorCutoff = new Date(cutoff); priorCutoff.setDate(priorCutoff.getDate() - 30);
  const sumPeriod = (start: Date, end: Date, direction: 'inflow' | 'outflow') => result.entries
    .filter((entry) => entry.direction === direction && new Date(`${entry.occurred_on}T12:00:00`) >= start && new Date(`${entry.occurred_on}T12:00:00`) < end)
    .reduce((sum, entry) => sum + Number(entry.amount), 0);
  const now = new Date(); now.setHours(23, 59, 59, 999);
  const recentIn = sumPeriod(cutoff, now, 'inflow'); const recentOut = sumPeriod(cutoff, now, 'outflow');
  const priorIn = sumPeriod(priorCutoff, cutoff, 'inflow'); const priorOut = sumPeriod(priorCutoff, cutoff, 'outflow');
  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
      <section className="rounded-2xl bg-[#123e3b] p-6 text-white"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#c9ec88]"><BriefcaseBusiness className="h-4 w-4" /> Virtual CFO view · explainable baseline</p><h3 className="mt-3 font-display text-2xl font-bold">{guidance.actions[0]?.action ?? 'Review incoming cash, planned outflows and the projected balance together.'}</h3><p className="mt-3 text-sm leading-6 text-white/75">{guidance.actions[0]?.reason ?? 'This view is computed from the workspace statement, current balance and recorded commitments.'}</p><p className="mt-4 text-xs leading-5 text-white/55">The forecast is a deterministic trailing-30-day baseline plus dated commitments—not a trained or cross-customer validated predictive model.</p></section>
      <section className="rounded-2xl border border-[#d7e9e0] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#587068]">60-day liquidity outlook</p><div className="mt-3 grid grid-cols-2 gap-3"><div><p className="text-xs text-[#708079]">Projected lowest cash</p><p className="mt-1 font-display text-3xl font-bold text-[#153f3a]">{money(overview.cash_outlook.lowest_projected_balance, overview.currency)}</p></div><div><p className="text-xs text-[#708079]">First negative balance</p><p className="mt-2 text-lg font-bold text-[#a33c35]">{dayLabel(overview.cash_outlook.liquidity_gap_date)}</p></div></div><p className="mt-4 text-xs leading-5 text-[#65766f]">Confidence: {overview.cash_outlook.confidence}. {overview.data_quality.forecast_model_transactions} recent entries · {overview.data_quality.history_days_observed} observed days.</p></section>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="font-semibold text-[#173b38]">Cash-flow movement</h3><p className="mt-1 text-xs text-[#65766f]">Transactions grouped from product API data.</p><div className="mt-4 space-y-3">{[["Recent 30 days", recentIn, recentOut], ["Prior 30 days", priorIn, priorOut]].map(([label, inflow, outflow]) => <div key={String(label)} className="rounded-xl bg-[#f4f8f6] p-3"><p className="text-xs font-semibold text-[#53665f]">{String(label)}</p><div className="mt-2 grid grid-cols-2 gap-2 text-xs"><p className="flex items-center gap-1 text-[#087f75]"><ArrowUpRight className="h-3.5 w-3.5" />In {money(inflow as number, overview.currency)}</p><p className="flex items-center gap-1 text-[#a33c35]"><ArrowDownRight className="h-3.5 w-3.5" />Out {money(outflow as number, overview.currency)}</p></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CalendarClock className="h-4 w-4 text-[#087f75]" /> Obligations and reminders</h3><div className="mt-3 space-y-2">{overview.commitments.items.slice(0, 5).map((item) => <div key={`${item.id}-${item.due_on}`} className="flex justify-between gap-3 rounded-xl bg-[#f4f8f6] p-3"><div><p className="text-sm font-semibold text-[#173b38]">{item.name}</p><p className="mt-1 text-xs text-[#65766f]">Due {dayLabel(item.due_on)}</p></div><strong className="text-sm text-[#173b38]">{money(item.amount, item.currency)}</strong></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><ShieldAlert className="h-4 w-4 text-[#087f75]" /> Early-warning rules</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">Signals reflect recorded conditions; warning lead time and delinquency outcomes are not yet validated.</p><div className="mt-3"><AlertList alerts={alerts} currency={overview.currency} /></div></article>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-[#dce8e1] bg-[#f4f8f6] p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CircleDollarSign className="h-4 w-4 text-[#087f75]" /> Financing and service matches</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">The catalog matcher routes recorded needs for provider review; it does not establish affordability, eligibility or approval.</p><div className="mt-3 space-y-2">{offers.filter((item) => item.type !== 'fx').map((offer) => <div key={offer.offer_id} className="rounded-xl bg-white p-3"><p className="font-semibold text-[#173b38]">{offer.name}</p><p className="mt-1 text-xs text-[#53665f]">{offer.reason}. Provider assessment required.</p></div>)}{!offers.some((item) => item.type !== 'fx') && <p className="text-sm text-[#65766f]">No configured financing or banking match for this sample.</p>}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><DatabaseZap className="h-4 w-4 text-[#087f75]" /> Recorded foreign-currency exposure</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">This is a catalogue match to an account currency. No live rates, hedge signal or validated FX opportunity is computed.</p><div className="mt-3 space-y-2">{offers.filter((item) => item.type === 'fx').map((offer) => <div key={offer.offer_id} className="rounded-xl bg-[#f4f8f6] p-3"><p className="font-semibold text-[#173b38]">{offer.name}</p><p className="mt-1 text-xs text-[#53665f]">Exposure currencies: {offer.matching_exposure_currencies.join(', ') || 'recorded'}. {offer.reason}.</p></div>)}{!offers.some((item) => item.type === 'fx') && <p className="text-sm text-[#65766f]">No foreign-currency account is recorded for this sample.</p>}</div></article>
    </div>
  </div>;
}

export default function FinancialScenarioDemo({ scenario, autoRun = false }: { scenario: Scenario; autoRun?: boolean }) {
  const [result, setResult] = useState<ProductDemoResult | null>(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const autoRan = useRef(false);
  const config = COPY[scenario];
  const run = useCallback(async () => {
    setRunning(true); setError('');
    try { await productDemoApi.sessionReady(); setResult(await productDemoApi.runScenario(scenario)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'The product API request failed.'); }
    finally { setRunning(false); }
  }, [scenario]);
  useEffect(() => { if (autoRun && !autoRan.current) { autoRan.current = true; void run(); } }, [autoRun, run]);

  return <section>
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#087f75]">{config.eyebrow}</p><h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-.04em] text-[#173b38] md:text-5xl">{config.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#53665f]">{config.intro}</p></div><button onClick={() => void run()} disabled={running} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#087f75] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#066e66] disabled:opacity-60">{running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}{config.button}</button></div>
    {!result && !error && <div className="mt-8 grid gap-4 rounded-2xl border border-[#dce8e1] bg-white p-6 shadow-sm md:grid-cols-3">{[[WalletCards, 'Create an isolated sample workspace', 'No existing customer workspace is reused. Sample data is attached only to this synthetic workspace.'], [DatabaseZap, 'Import through product endpoints', 'The statement importer validates and persists records using the same API used by product clients.'], [BarChart3, 'Read back calculated outputs', 'Spending, outlook, guidance, rule alerts and catalog matches come back from persisted workspace data.']].map(([Icon, title, text], index) => { const Graphic = Icon as typeof WalletCards; return <article key={String(title)} className="rounded-xl border border-[#e3ece7] bg-[#f7faf8] p-4"><span className="font-mono text-xs font-bold text-[#087f75]">0{index + 1}</span><Graphic className="mt-3 h-5 w-5 text-[#087f75]" /><h3 className="mt-3 font-semibold text-[#173b38]">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-[#5f726a]">{String(text)}</p></article>; })}</div>}
    {running && <p className="mt-6 flex items-center gap-2 text-sm text-[#53665f]"><Loader2 className="h-4 w-4 animate-spin text-[#087f75]" />Creating or reusing today&apos;s isolated synthetic workspace and calling the product API…</p>}
    {error && <div className="mt-6 rounded-xl border border-[#e4bcb3] bg-[#fff5f2] p-4 text-sm text-[#943e34]"><p className="font-semibold">The live product API flow did not complete.</p><p className="mt-1">{error}</p><p className="mt-2 text-xs">Pitch API URL: {process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'http://localhost:8001'}</p></div>}
    {result && !running && <div className="mt-8 space-y-5">{scenario === 'consumer' ? <ConsumerView result={result} /> : <BusinessView result={result} />}<footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#dce8e1] pt-4 text-[11px] text-[#62766d]"><span className="inline-flex items-center gap-1.5 font-semibold text-[#087f75]"><Check className="h-3.5 w-3.5" /> Product v2 API response</span><span>{result.elapsedMs} ms end-to-end</span><span>{result.overview.observed.posted_external_entry_count} persisted entries</span><span>{result.overview.cash_outlook.method}</span><span>Workspace {result.workspace.id.slice(0, 8)}</span><span>Synthetic data</span></footer><p className="flex items-start gap-2 rounded-xl bg-[#f0f6f3] p-3 text-xs leading-5 text-[#53665f]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#087f75]" />This flow demonstrates deterministic analysis of synthetic records. Forecast accuracy across customers, recommendation suitability and delinquency-prevention outcomes require separate validation.</p></div>}
  </section>;
}
