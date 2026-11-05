'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, BellRing,
  BriefcaseBusiness, CalendarClock, Check, CircleDollarSign, DatabaseZap, Landmark,
  Loader2, Play, ShieldAlert, Sparkles, WalletCards,
} from 'lucide-react';
import { productDemoApi, clearApiTrace, type ProductAlert, type ProductDemoResult } from '@/lib/api/product-demo';
import ProductApiTrace from './product-api-trace';

type AdvisorState = { loading: boolean; answer: string; dataUsed: string[]; latencyMs: number; queryId: string; error: string; rated: string | null };

const SUGGESTED_QUESTIONS: Record<'consumer' | 'business', string[]> = {
  consumer: [
    'Explain my cash outlook and upcoming commitments.',
    'How is my Dining budget tracking this month?',
    'Where is my spending concentrated?',
  ],
  business: [
    'Explain the projected cash crossing date.',
    'Assess my foreign-currency exposure and upcoming supplier payments.',
    'Why are the alert thresholds firing?',
  ],
};

function AiCfoCard({ result, scenario }: { result: ProductDemoResult; scenario: 'consumer' | 'business' }) {
  const [question, setQuestion] = useState('');
  const [state, setState] = useState<AdvisorState>({ loading: false, answer: '', dataUsed: [], latencyMs: 0, queryId: '', error: '', rated: null });
  const ask = async (text: string) => {
    const value = text.trim();
    if (!value || state.loading) return;
    setState((prev) => ({ ...prev, loading: true, error: '', answer: '', dataUsed: [], latencyMs: 0, queryId: '', rated: null }));
    try {
      const reply = await productDemoApi.askAdvisor(result.workspace.id, value);
      setState({ loading: false, answer: reply.answer ?? '', dataUsed: reply.data_used ?? [], latencyMs: reply.latency_ms, queryId: reply.query_id, error: reply.state === 'failed' ? 'The AI response could not be completed. The deterministic panels below remain the source of record.' : '', rated: null });
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error instanceof Error ? error.message : String(error) }));
    }
  };
  const rate = async (rating: 'helpful' | 'not_helpful') => {
    if (state.rated || !state.answer || !state.queryId) return;
    setState((prev) => ({ ...prev, rated: rating }));
    try {
      await productDemoApi.rateAdvisor(result.workspace.id, state.queryId, rating);
    } catch {
      setState((prev) => ({ ...prev, error: 'Rating could not be saved.' }));
    }
  };
  return <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><Sparkles className="h-4 w-4 text-[#087f75]" /> Ask the AI CFO</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">A configured language model explains a fresh context calculated from this workspace’s stored records. Financial values come from deterministic product calculations; generated explanations can still be wrong and do not change records. Ratings are recorded for evaluation and do not train the model.</p><div className="mt-3 flex flex-wrap gap-2">{SUGGESTED_QUESTIONS[scenario].map((item) => <button key={item} onClick={() => { setQuestion(item); void ask(item); }} disabled={state.loading} className="rounded-full border border-[#cdded5] bg-[#f4f8f6] px-3 py-1.5 text-xs font-medium text-[#365b4d] disabled:opacity-40">{item}</button>)}</div><div className="mt-3 flex gap-2"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void ask(question); }} placeholder="Ask about the recorded cash picture…" className="w-full rounded-lg border border-[#cdded5] bg-[#f7faf8] px-3 py-2.5 text-sm text-[#173b38]" /><button onClick={() => void ask(question)} disabled={state.loading || !question.trim()} className="rounded-lg bg-[#087f75] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40">{state.loading ? 'Thinking…' : 'Ask'}</button></div>{state.loading && <p className="mt-3 animate-pulse text-xs text-[#65766f]">Reading the recorded cash outlook, spending, FX exposure and alerts…</p>}{state.error && <p className="mt-3 rounded-lg bg-[#fdf2f2] p-3 text-xs text-[#8a3a3a]">{state.error}</p>}{!state.loading && state.answer && <div className="mt-4 rounded-xl bg-[#f4f8f6] p-4"><p className="whitespace-pre-wrap text-sm leading-6 text-[#173b38]">{state.answer}</p><div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#65766f]">{state.dataUsed.map((item) => <span key={item} className="rounded-full bg-white px-2 py-1">{item.split(' (')[0]}</span>)}<span className="font-medium text-[#087f75]">{state.latencyMs} ms</span></div><div className="mt-2 flex gap-2 text-xs">{(['helpful', 'not_helpful'] as const).map((item) => <button key={item} onClick={() => void rate(item)} disabled={Boolean(state.rated)} className={state.rated === item ? 'rounded-md bg-[#087f75] px-2.5 py-1 font-semibold text-white' : 'rounded-md border border-[#cdded5] px-2.5 py-1 text-[#365b4d] disabled:opacity-40'}>{item === 'helpful' ? 'Helpful' : 'Not helpful'}</button>)}</div></div>}<p className="mt-3 text-[11px] leading-5 text-[#86958e]">Decision support, not financial advice. The model does not modify workspace records. We constrain it to the supplied calculated context, but outputs still require evaluation and human review.</p></article>;
}

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
    title: 'See the obligations and cash signals shaping liquidity over time.',
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

function IngestedRecordsTable({ result }: { result: ProductDemoResult }) {
  return <details open className="overflow-hidden rounded-2xl border border-[#dce8e1] bg-white">
    <summary className="cursor-pointer px-5 py-4 font-semibold text-[#173b38]">Ingested records · {result.entries.length} persisted rows</summary>
    <p className="px-5 pb-3 text-xs text-[#65766f]">Rows below are read back from the synthetic workspace ledger after statement import.</p>
    <div className="max-h-80 overflow-auto">
      <table className="w-full min-w-[760px] text-left text-xs">
        <thead className="sticky top-0 bg-[#f4f8f6] text-[#65766f]"><tr>{['Date', 'Description', 'Direction', 'Amount', 'Currency', 'Category', 'Event'].map((label) => <th key={label} className="px-4 py-2 font-semibold">{label}</th>)}</tr></thead>
        <tbody>{result.entries.map((entry) => <tr key={entry.id} className="border-t border-[#e3ece7] text-[#173b38]"><td className="whitespace-nowrap px-4 py-2">{entry.occurred_on}</td><td className="px-4 py-2">{entry.description}</td><td className="px-4 py-2 capitalize">{entry.direction}</td><td className="whitespace-nowrap px-4 py-2">{money(entry.amount, entry.currency)}</td><td className="px-4 py-2">{entry.currency}</td><td className="px-4 py-2">{entry.category ?? 'Uncategorized'}</td><td className="px-4 py-2">{entry.event_kind}</td></tr>)}</tbody>
      </table>
      {!result.entries.length && <p className="p-5 text-sm text-[#65766f]">No ledger rows were returned for this date window.</p>}
    </div>
  </details>;
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
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#587068]">Cash after known commitments · {overview.cash_outlook.horizon_days}-day outlook</p>
        <p className="mt-3 font-display text-4xl font-bold text-[#153f3a]">{money(overview.cash_outlook.projected_end_balance, overview.currency)}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><p className="text-[#708079]">Current recorded cash</p><p className="font-semibold text-[#173b38]">{money(overview.cash_outlook.current_balance, overview.currency)}</p></div><div><p className="text-[#708079]">Upcoming outflows</p><p className="font-semibold text-[#173b38]">{money(overview.commitments.outflows, overview.currency)}</p></div></div>
      </section>
    </div>

    <IngestedRecordsTable result={result} />
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><BarChart3 className="h-4 w-4 text-[#087f75]" /> Spending behaviour · last 90 days</h3><p className="mt-1 text-xs text-[#65766f]">Posted outflows from {spending.period?.start ?? 'the 90-day window'} to {spending.period?.end ?? 'today'}, net of linked refunds. This window is intentionally longer than the current budget month.</p><div className="mt-4 space-y-3">{spending.category_spend.slice(0, 6).map((item) => <div key={item.category}><div className="flex justify-between gap-2 text-xs"><span className="text-[#53665f]">{item.category}</span><strong className="text-[#173b38]">{money(item.amount, overview.currency)}</strong></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#edf3ef]"><div className="h-full rounded-full bg-[#087f75]" style={{ width: `${Math.max(3, item.amount / largest * 100)}%` }} /></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><WalletCards className="h-4 w-4 text-[#087f75]" /> Budget recommendations</h3><p className="mt-1 text-xs text-[#65766f]">Budget progress is month-to-date, separate from the 90-day spend total. “At risk” means spending is ahead of a time-adjusted pace—not that the monthly cap has already been exceeded.</p><div className="mt-4 space-y-3">{spending.budgets.length ? spending.budgets.map((budget) => <div key={budget.budget_id} className="rounded-xl bg-[#f4f8f6] p-3"><div className="flex justify-between text-sm"><strong className="text-[#173b38]">{budget.category}</strong><span className="font-semibold text-[#087f75]">{budget.status.replaceAll('_', ' ')}</span></div><p className="mt-1 text-xs text-[#53665f]">{money(budget.spent, budget.currency)} recorded since {budget.period_start ?? 'period start'} of a {money(budget.limit, budget.currency)} {budget.period} limit</p></div>) : <p className="text-sm text-[#65766f]">No customer budget is configured yet.</p>}{spending.recommendations.map((item, index) => <p key={`${item.type}-${index}`} className="text-xs leading-5 text-[#53665f]">{item.message}</p>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CalendarClock className="h-4 w-4 text-[#087f75]" /> Upcoming commitments</h3><div className="mt-4 space-y-2">{overview.commitments.items.slice(0, 5).map((item) => <div key={`${item.id}-${item.due_on}`} className="flex items-start justify-between gap-3 rounded-xl bg-[#f4f8f6] p-3"><div><p className="text-sm font-semibold text-[#173b38]">{item.name}</p><p className="mt-1 text-xs text-[#65766f]">Due {dayLabel(item.due_on)}</p></div><strong className="whitespace-nowrap text-sm text-[#173b38]">{money(item.amount, item.currency)}</strong></div>)}</div></article>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-[#dce8e1] bg-[#f4f8f6] p-5"><h3 className="font-semibold text-[#173b38]">Relevant catalogue matches</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">Matches use only the configured sample catalogue and recorded categories. They are not eligibility or suitability decisions.</p><div className="mt-3 space-y-2">{offers.length ? offers.map((offer) => <div key={offer.offer_id} className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 text-sm font-semibold text-[#173b38]"><Landmark className="h-4 w-4 text-[#087f75]" />{offer.name}</p><p className="mt-1 text-xs leading-5 text-[#53665f]">{offer.reason}{/[.!?]$/.test(offer.reason) ? '' : '.'}{offer.requires_provider_assessment && !/assessment is required/i.test(offer.reason) ? ' Provider assessment required.' : ''}</p></div>) : <p className="text-sm text-[#65766f]">No configured offers match the recorded sample.</p>}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="font-semibold text-[#173b38]">Rule-based reminders</h3><p className="mt-1 text-xs text-[#65766f]">Created from recorded due dates and evaluated by the product alert rules. The Dining entry mirrors the month-to-date budget card above, not the 90-day window.</p><div className="mt-3"><AlertList alerts={result.alerts} currency={overview.currency} /></div></article>
    </div>
    <AiCfoCard result={result} scenario="consumer" />
  </div>;
}

const TRANSACTION_EVENT_KINDS = [
  ['operating', 'Sales and day-to-day business income or costs; used in operating-flow trends.'],
  ['transfer', 'Movement between accounts; excluded from operating cash-flow calculations.'],
  ['refund', 'Money returned to the business; linked refunds reduce net spending.'],
  ['financing', 'Loan proceeds or repayments; kept separate from operating run rate.'],
  ['owner', 'Owner contributions or withdrawals; kept separate from operating run rate.'],
  ['tax', 'Tax-related cash movement, retained as an external inflow or outflow.'],
  ['fee', 'Bank or service fees, retained as cash outflows.'],
  ['other', 'A transaction that does not fit another event kind.'],
] as const;

function TransactionClassificationCard() {
  return <section className="rounded-2xl border border-[#dce8e1] bg-white p-5">
    <h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><DatabaseZap className="h-4 w-4 text-[#087f75]" /> How transactions are classified</h3>
    <p className="mt-1 text-xs leading-5 text-[#65766f]">The API combines an event kind, cash direction and posting status to decide how each row contributes to cash-flow analysis.</p>
    <div className="mt-4 grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-[#587068]">Event kinds</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRANSACTION_EVENT_KINDS.map(([kind, description]) => <div key={kind} className="rounded-xl bg-[#f4f8f6] p-3">
            <span className="rounded-md bg-white px-2 py-1 font-mono text-[11px] font-semibold text-[#087f75]">{kind}</span>
            <p className="mt-2 text-xs leading-5 text-[#53665f]">{description}</p>
          </div>)}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#587068]">Direction and status</p>
          <p className="mt-2 text-xs leading-5 text-[#53665f]"><strong>Direction:</strong> <code>inflow</code> or <code>outflow</code> records whether cash enters or leaves the account.</p>
          <p className="mt-2 text-xs leading-5 text-[#53665f]"><strong>Status:</strong> <code>posted</code>, <code>pending</code>, or <code>reversed</code>. Posted rows feed the historical analysis; pending and reversed rows are excluded.</p>
        </div>
        <div className="rounded-xl border border-[#dce8e1] p-3">
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#587068]">Category labels</p>
          <p className="mt-2 text-xs leading-5 text-[#53665f]">Source labels such as Sales, Suppliers, Payroll, and Utilities are retained and normalized. The API does not force them into a fixed category list or automatically infer every category.</p>
        </div>
      </div>
    </div>
  </section>;
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
      <section className="rounded-2xl border border-[#d7e9e0] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#587068]">{overview.cash_outlook.horizon_days}-day liquidity outlook</p><div className="mt-3 grid grid-cols-2 gap-3"><div><p className="text-xs text-[#708079]">Projected lowest cash</p><p className="mt-1 font-display text-3xl font-bold text-[#153f3a]">{money(overview.cash_outlook.lowest_projected_balance, overview.currency)}</p></div><div><p className="text-xs text-[#708079]">First negative balance</p><p className="mt-2 text-lg font-bold text-[#a33c35]">{dayLabel(overview.cash_outlook.liquidity_gap_date)}</p></div></div><p className="mt-4 text-xs leading-5 text-[#65766f]">Baseline: recent posted cash flows plus dated commitments, projected over the selected horizon. Confidence: {overview.cash_outlook.confidence}. {overview.data_quality.forecast_model_transactions} recent entries · {overview.data_quality.history_days_observed} observed days.</p></section>
    </div>

    <IngestedRecordsTable result={result} />
    <TransactionClassificationCard />

    <div className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="font-semibold text-[#173b38]">Cash-flow movement</h3><p className="mt-1 text-xs text-[#65766f]">Transactions grouped from product API data.</p><div className="mt-4 space-y-3">{[["Recent 30 days", recentIn, recentOut], ["Prior 30 days", priorIn, priorOut]].map(([label, inflow, outflow]) => <div key={String(label)} className="rounded-xl bg-[#f4f8f6] p-3"><p className="text-xs font-semibold text-[#53665f]">{String(label)}</p><div className="mt-2 grid grid-cols-2 gap-2 text-xs"><p className="flex items-center gap-1 text-[#087f75]"><ArrowUpRight className="h-3.5 w-3.5" />In {money(inflow as number, overview.currency)}</p><p className="flex items-center gap-1 text-[#a33c35]"><ArrowDownRight className="h-3.5 w-3.5" />Out {money(outflow as number, overview.currency)}</p></div></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CalendarClock className="h-4 w-4 text-[#087f75]" /> Obligations and reminders</h3><div className="mt-3 space-y-2">{overview.commitments.items.slice(0, 5).map((item) => <div key={`${item.id}-${item.due_on}`} className="flex justify-between gap-3 rounded-xl bg-[#f4f8f6] p-3"><div><p className="text-sm font-semibold text-[#173b38]">{item.name}</p><p className="mt-1 text-xs text-[#65766f]">Due {dayLabel(item.due_on)}</p></div><strong className="text-sm text-[#173b38]">{money(item.amount, item.currency)}</strong></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><ShieldAlert className="h-4 w-4 text-[#087f75]" /> Early-warning rules</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">Signals reflect recorded conditions; warning lead time and delinquency outcomes are not yet validated.</p><div className="mt-3"><AlertList alerts={alerts} currency={overview.currency} /></div></article>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-[#dce8e1] bg-[#f4f8f6] p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><CircleDollarSign className="h-4 w-4 text-[#087f75]" /> Financing and service matches</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">The catalog matcher routes recorded needs for provider review; it does not establish affordability, eligibility or approval.</p><div className="mt-3 space-y-2">{offers.filter((item) => item.type !== 'fx').map((offer) => <div key={offer.offer_id} className="rounded-xl bg-white p-3"><p className="font-semibold text-[#173b38]">{offer.name}</p><p className="mt-1 text-xs text-[#53665f]">{offer.reason}. Provider assessment required.</p></div>)}{!offers.some((item) => item.type !== 'fx') && <p className="text-sm text-[#65766f]">No configured financing or banking match for this sample.</p>}</div></article>
      <article className="rounded-2xl border border-[#dce8e1] bg-white p-5"><h3 className="flex items-center gap-2 font-semibold text-[#173b38]"><DatabaseZap className="h-4 w-4 text-[#087f75]" /> Recorded foreign-currency exposure</h3><p className="mt-1 text-xs leading-5 text-[#65766f]">This is a catalogue match to a recorded exposure, converted at the European Central Bank reference rate (Frankfurter feed). No hedge signal or validated FX opportunity is computed.</p><div className="mt-3 space-y-2">{offers.filter((item) => item.type === 'fx').map((offer) => <div key={offer.offer_id} className="rounded-xl bg-[#f4f8f6] p-3"><p className="font-semibold text-[#173b38]">{offer.name}</p><p className="mt-1 text-xs text-[#53665f]">Exposure currencies: {offer.matching_exposure_currencies.join(', ') || 'recorded'}. {offer.reason}{/[.!?]$/.test(offer.reason) ? '' : '.'}</p></div>)}{result.fxExposure && result.fxExposure.currencies.length > 0 && (() => { const fxE = result.fxExposure!; return <div className="rounded-xl border border-[#e3ece7] p-3"><p className="text-xs font-semibold text-[#173b38]">Quantified from recorded workspace data ({fxE.window_days}-day flow window, {fxE.horizon_days}-day commitment horizon, base {fxE.base_currency})</p><table className="mt-2 w-full text-left text-xs"><thead><tr className="text-[#65766f]"><th className="py-1 font-medium">Currency</th><th className="py-1 font-medium">Balance</th><th className="py-1 font-medium">90d net flow</th><th className="py-1 font-medium">Committed due</th><th className="py-1 font-medium">Next due</th><th className="py-1 font-medium">ECB rate</th></tr></thead><tbody>{fxE.currencies.map((item) => <tr key={item.currency} className="border-t border-[#e3ece7] text-[#173b38]"><td className="py-1 font-semibold">{item.currency}</td><td className="py-1">{item.account_balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? '—'}{item.rate_to_base ? <span className="block text-[10px] text-[#65766f]">≈ {item.account_balance_in_base?.toLocaleString('en-US', { minimumFractionDigits: 2 })} {fxE.base_currency}</span> : null}</td><td className="py-1">{item.net_flow?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? '—'}</td><td className="py-1">{item.committed_due?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? '—'}{item.committed_count > 0 ? ` (${item.committed_count})` : ''}{item.rate_to_base ? <span className="block text-[10px] text-[#65766f]">≈ {item.committed_due_in_base?.toLocaleString('en-US', { minimumFractionDigits: 2 })} {fxE.base_currency}</span> : null}</td><td className="py-1">{item.next_due_on ?? '—'}</td><td className="py-1">{item.rate_to_base ? `${item.rate_to_base} (ECB ${item.rate_date})` : 'n/a'}</td></tr>)}</tbody></table></div>; })()}{!offers.some((item) => item.type === 'fx') && <p className="text-sm text-[#65766f]">No foreign-currency account is recorded for this sample.</p>}</div></article>
    </div>
    <AiCfoCard result={result} scenario="business" />
  </div>;
}

export default function FinancialScenarioDemo({ scenario, autoRun = false }: { scenario: Scenario; autoRun?: boolean }) {
  const [result, setResult] = useState<ProductDemoResult | null>(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [horizonDays, setHorizonDays] = useState<30 | 60 | 90>(60);
  const autoRan = useRef(false);
  useEffect(() => { clearApiTrace(); }, [scenario]);
  const config = COPY[scenario];
  const run = useCallback(async () => {
    setRunning(true); setError('');
    try { await productDemoApi.sessionReady(); setResult(await productDemoApi.runScenario(scenario, horizonDays)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'The product API request failed.'); }
    finally { setRunning(false); }
  }, [scenario, horizonDays]);
  useEffect(() => { if (autoRun && !autoRan.current) { autoRan.current = true; void run(); } }, [autoRun, run]);

  return <section>
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#087f75]">{config.eyebrow}</p><h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-.04em] text-[#173b38] md:text-5xl">{config.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#53665f]">{config.intro}</p></div><div className="flex shrink-0 items-end gap-3">{scenario === 'business' && <label className="text-xs font-semibold text-[#53665f]">Forecast horizon<select value={horizonDays} onChange={(event) => setHorizonDays(Number(event.target.value) as 30 | 60 | 90)} className="mt-1 block rounded-lg border border-[#cdded5] bg-white px-3 py-3 text-sm text-[#173b38]"><option value={30}>30 days</option><option value={60}>60 days</option><option value={90}>90 days</option></select></label>}<button onClick={() => void run()} disabled={running} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#087f75] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#066e66] disabled:opacity-60">{running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}{config.button}</button></div></div>
    {!result && !error && <div className="mt-8 grid gap-4 rounded-2xl border border-[#dce8e1] bg-white p-6 shadow-sm md:grid-cols-3">{[[WalletCards, 'Create an isolated sample workspace', 'No existing customer workspace is reused. Sample data is attached only to this synthetic workspace.'], [DatabaseZap, 'Import through product endpoints', 'The statement importer validates and persists records using the same API used by product clients.'], [BarChart3, 'Read back calculated outputs', 'Spending, outlook, guidance, rule alerts and catalog matches come back from persisted workspace data.']].map(([Icon, title, text], index) => { const Graphic = Icon as typeof WalletCards; return <article key={String(title)} className="rounded-xl border border-[#e3ece7] bg-[#f7faf8] p-4"><span className="font-mono text-xs font-bold text-[#087f75]">0{index + 1}</span><Graphic className="mt-3 h-5 w-5 text-[#087f75]" /><h3 className="mt-3 font-semibold text-[#173b38]">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-[#5f726a]">{String(text)}</p></article>; })}</div>}
    {running && <p className="mt-6 flex items-center gap-2 text-sm text-[#53665f]"><Loader2 className="h-4 w-4 animate-spin text-[#087f75]" />Creating or reusing today&apos;s isolated synthetic workspace and calling the product API…</p>}
    {error && <div className="mt-6 rounded-xl border border-[#e4bcb3] bg-[#fff5f2] p-4 text-sm text-[#943e34]"><p className="font-semibold">The live product API flow did not complete.</p><p className="mt-1">{error}</p><p className="mt-2 text-xs">Pitch API URL: {process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://api.flowcfo.net'}</p></div>}
    {result && !running && <div className="mt-8 space-y-5">{scenario === 'consumer' ? <ConsumerView result={result} /> : <BusinessView result={result} />}<footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#dce8e1] pt-4 text-[11px] text-[#62766d]"><span className="inline-flex items-center gap-1.5 font-semibold text-[#087f75]"><Check className="h-3.5 w-3.5" /> Product v2 API response</span><span>{result.elapsedMs} ms end-to-end</span><span>{result.overview.observed.posted_external_entry_count} persisted entries</span><span>{result.overview.cash_outlook.method}</span><span>Workspace {result.workspace.id.slice(0, 8)}</span><span>Synthetic data</span></footer><p className="flex items-start gap-2 rounded-xl bg-[#f0f6f3] p-3 text-xs leading-5 text-[#53665f]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#087f75]" />This flow demonstrates deterministic analysis of synthetic records. Forecast accuracy across customers, recommendation suitability and delinquency-prevention outcomes require separate validation.</p></div>}
    <ProductApiTrace label={scenario === 'consumer' ? 'Personal guidance chapter' : 'SME cash-flow chapter'} />
  </section>;
}
