'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, BrainCircuit, Building2, Check, ChevronLeft,
  ChevronRight, DatabaseZap, Landmark, Loader2, LockKeyhole, MonitorPlay,
  RotateCcw, ScanSearch, ShieldCheck, Sparkles, TrendingDown, UserRound, WalletCards,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { adminApi } from '@/lib/api/users';
import FinancialScenarioDemo from '@/components/admin/financial-scenario-demo';
import ProductIngestionDemo from '@/components/admin/product-ingestion-demo';
import AlertDeliveryDemo from '@/components/admin/alert-delivery-demo';

const CHAPTERS = [
  { id: 'brief', label: 'Product overview' },
  { id: 'consumer', label: 'Consumer intelligence' },
  { id: 'business', label: 'Virtual CFO + warning' },
  { id: 'integration', label: 'How it works' },
  { id: 'delivery', label: 'Alert delivery' },
] as const;

const CONSUMER_REQUIREMENTS = [
  { label: 'Analyze spending behaviour', status: 'Working · recorded transactions' },
  { label: 'Remind upcoming commitments', status: 'Rules · recorded due dates' },
  { label: 'Recommend a better budget', status: 'Basic · spending vs. set limits' },
  { label: 'Personal financial advisor', status: 'Bounded · not a comprehensive advisor' },
  { label: 'Recommend banking products', status: 'Catalogue match · not suitability' },
];

const BUSINESS_REQUIREMENTS = [
  { label: 'Monitor business cash flow', status: 'Working · recorded accounts' },
  { label: 'Predict liquidity gaps', status: 'Baseline · not cross-customer validated' },
  { label: 'Alert upcoming obligations', status: 'Rules · recorded due dates' },
  { label: 'Suggest financing when needed', status: 'Catalogue match · not underwriting' },
  { label: 'Recommend FX and relevant products', status: 'Exposure match · no live rates' },
  { label: 'Virtual CFO for SMEs', status: 'Bounded guidance · not full CFO advice' },
];

function RequirementList({ items }: { items: Array<{ label: string; status: string }> }) {
  return <div className="mt-5 space-y-2.5">{items.map((item) => <div key={item.label} className="flex items-start gap-3 border-b border-[#E7E5DE] pb-2.5 last:border-0 last:pb-0"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#E8F3EC] text-[#087f75]"><Check className="h-3 w-3" /></span><div><p className="text-sm font-semibold text-[#3F403D]">{item.label}</p><p className="mt-0.5 text-[10px] leading-4 text-[#68746e]">{item.status}</p></div></div>)}</div>;
}

function Overview() {
  return <div className="grid min-h-[640px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
    <div>
      <div className="inline-flex items-center gap-2 border border-[#D4AF37]/40 bg-[#FFF9DC] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#735C00]"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> FlowCFO · financial intelligence walkthrough</div>
      <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.98] tracking-[-.055em] text-[#0A0A0A] md:text-7xl">See the financial signal. Act <span className="relative inline-block text-[#735C00]">before<svg aria-hidden="true" viewBox="0 0 210 12" className="absolute -bottom-2 left-0 w-full text-[#D4AF37]"><path d="M3 8C52 2 139 2 207 7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg></span> the problem.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[#62625F]">FlowCFO turns recorded financial activity into bounded customer guidance, explainable alerts and catalogue matches. This walkthrough shows exactly what the rebuilt API does today—and where a partner pilot must add or validate more.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {['Live product API', 'Synthetic test records', 'Deterministic outputs', 'Partner policy stays with partner'].map((item) => <span key={item} className="rounded-full border border-[#DCDCD6] bg-white px-4 py-2 text-xs font-semibold text-[#4F504D] shadow-[0_1px_0_rgba(10,10,10,.03)]">{item}</span>)}
      </div>
      <div className="mt-9 border-l-4 border-[#D4AF37] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(10,10,10,.06)]"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#735C00]">What this demo proves</p><p className="mt-2 text-lg font-semibold leading-7 text-[#1D1E1C]">Recorded financial signals can produce a visible explanation, a rule alert and a configured catalogue match.</p><p className="mt-2 text-xs leading-5 text-[#68746e]">This is not a generative AI advisor, an eligibility decision or proof of prevented delinquency.</p></div>
    </div>
    <div className="relative rounded-[28px] border border-[#DCDCD6] bg-white p-5 shadow-[0_28px_80px_rgba(10,10,10,.09)] md:p-7">
      <div className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full border-8 border-[#F7F7F4] bg-[#D4AF37] text-[#0A0A0A] shadow-lg"><Sparkles className="h-6 w-6" /></div>
      <div className="mb-5 flex items-center justify-between border-b border-[#E7E5DE] pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#777873]">Financial signal engine</p><p className="mt-1 font-display text-xl font-bold tracking-tight text-[#0A0A0A]">From activity to intervention</p></div><span className="rounded-full bg-[#EAF3EE] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1B4332]">Live</span></div>
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] p-5 text-white">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] p-3"><WalletCards className="h-5 w-5 text-[#E4C06A]" /><div><p className="text-[10px] uppercase tracking-wider text-white/45">Input</p><p className="text-xs font-semibold">Spending + commitments</p></div></div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] p-3"><TrendingDown className="h-5 w-5 text-[#E4C06A]" /><div><p className="text-[10px] uppercase tracking-wider text-white/45">Signal</p><p className="text-xs font-semibold">Cash-flow deterioration</p></div></div>
          </div>
          <div className="flex flex-col items-center gap-2"><span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 shadow-[0_0_50px_rgba(212,175,55,.24)]"><BrainCircuit className="h-8 w-8 text-[#E4C06A]" /></span><p className="text-center text-[9px] font-bold uppercase tracking-[.18em] text-[#E4C06A]">FlowCFO<br />intelligence</p></div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-3"><UserRound className="h-5 w-5 text-[#E4C06A]" /><div><p className="text-[10px] uppercase tracking-wider text-white/45">Customer</p><p className="text-xs font-semibold">Personal next action</p></div></div>
            <div className="flex items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-3"><Landmark className="h-5 w-5 text-[#E4C06A]" /><div><p className="text-[10px] uppercase tracking-wider text-white/45">Bank</p><p className="text-xs font-semibold">Early intervention</p></div></div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-[#E4E3DD] bg-[#FBFBF9] p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1A8] text-[#735C00]"><UserRound className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8A6D12]">Consumer</p><h2 className="font-display text-lg font-bold text-[#0A0A0A]">Personal guidance</h2></div></div><RequirementList items={CONSUMER_REQUIREMENTS} /></section>
        <section className="rounded-2xl border border-[#CFE0D6] bg-[#F3F8F5] p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B4332] text-white"><Building2 className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#1B4332]">Business</p><h2 className="font-display text-lg font-bold text-[#0A0A0A]">Virtual CFO + warning</h2></div></div><RequirementList items={BUSINESS_REQUIREMENTS} /></section>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#FFF8D8] px-4 py-3 text-sm font-semibold text-[#5D4A0B]"><ScanSearch className="h-4 w-4 shrink-0" /> Detect deterioration <ArrowRight className="h-3.5 w-3.5" /> alert early <ArrowRight className="h-3.5 w-3.5" /> prevent delinquency</div>
    </div>
  </div>;
}

function Integration() {
  const stages = [
    { icon: DatabaseZap, title: '1. Receive the financial picture', text: 'Transactions, balances, invoices, commitments, repayments and FX exposure arrive through the product API or supported CSV/XLSX files. Direct bank feeds and spreadsheet connectors require partner integration.' },
    { icon: ScanSearch, title: '2. Normalize and calculate', text: 'FlowCFO converts each source into a consistent financial timeline, then runs deterministic cash-flow, budget and early-warning calculations.' },
    { icon: BrainCircuit, title: '3. Explain the next action', text: 'Current v2 guidance is deterministic and reason-coded. A generative AI advisor is not wired into this API; any model layer must be separately configured and evaluated.' },
    { icon: Landmark, title: '4. Match the partner catalogue', text: 'The API can match configured offers to recorded spending, cash-gap or currency signals. Eligibility, pricing, suitability and final decisions remain partner-owned; those policies need integration.' },
  ];
  return <div>
    <div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6D12]">How it works</p><h2 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-[-.04em] text-[#0A0A0A]">Data becomes an explainable action—not a black-box answer.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[#62625F]">The ingestion layer matters because guidance is only useful when balances, dates, obligations and source quality are understood first. The v2 API separates financial calculations from deterministic guidance and catalogue matching. Model routing, partner-specific policies and direct bank feeds are integration work—not capabilities this demo claims as complete.</p></div>
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stages.map(({ icon: Icon, title, text }, index) => <article key={title} className="relative overflow-hidden rounded-2xl border border-[#E0DFD9] bg-white p-5 shadow-[0_10px_30px_rgba(10,10,10,.04)]"><span className="absolute right-4 top-3 font-mono text-4xl font-bold text-[#F0EFEA]">0{index + 1}</span><span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3B8] text-[#735C00]"><Icon className="h-5 w-5" /></span><h3 className="relative mt-4 font-semibold text-[#0A0A0A]">{title}</h3><p className="relative mt-2 text-sm leading-6 text-[#62625F]">{text}</p></article>)}</div>
    <p className="mt-5 rounded-xl border border-[#e5d9a7] bg-[#fff9dc] px-4 py-3 text-xs leading-5 text-[#5d4a0b]">Early warning currently means deterministic rules over recorded data. Lead time, false-positive rate and delinquency prevention have not yet been validated.</p>
    <div className="mt-6"><ProductIngestionDemo /></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl bg-[#0A0A0A] p-6 text-white"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#E4C06A]"><LockKeyhole className="h-4 w-4" /> Enterprise model boundary · integration work</p><h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">Customer-controlled inference is a pilot design option.</h3><p className="mt-3 text-sm leading-7 text-white/65">The current v2 API does not route to a customer-hosted model. A pilot can define data minimization, endpoint ownership, retention, evaluation and human review before any model integration ships. Inference does not mean customer data is automatically used for training.</p></div>
      <div className="rounded-2xl border border-[#D4AF37]/45 bg-[#FFF9DC] p-6"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#735C00]"><ShieldCheck className="h-4 w-4" /> Proposed next step</p><h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A0A0A]">One bounded pilot, one measurable decision.</h3><p className="mt-3 text-sm leading-7 text-[#62625F]">Choose one scenario, use synthetic or sandbox data, define lead-time and false-positive limits, connect the partner product catalogue, and leave with a go/no-go result.</p></div>
    </div>
  </div>;
}

export default function PitchPage() {
  const router = useRouter(); const [allowed, setAllowed] = useState(false); const [chapter, setChapter] = useState(0); const [visualQa, setVisualQa] = useState(false);
  useEffect(() => { const init = async () => {
    // Local visual QA only. The production bundle compiles this branch out.
    const params = new URLSearchParams(window.location.search);
    if (process.env.NODE_ENV !== 'production' && params.get('preview') === '1') { const requested = Number(params.get('chapter') ?? 0); setChapter(Number.isInteger(requested) ? Math.min(CHAPTERS.length - 1, Math.max(0, requested)) : 0); setVisualQa(params.get('autorun') === '1'); setAllowed(true); return; }
    const { data, error } = await authClient.getSession(); if (error || !data?.user) { router.push('/admin/login'); return; } try { await adminApi.getMe(); setAllowed(true); } catch { router.push('/admin/login'); }
  }; void init(); }, [router]);
  useEffect(() => { const keys = (event: KeyboardEvent) => { if (event.key === 'ArrowRight') setChapter((value) => Math.min(CHAPTERS.length - 1, value + 1)); if (event.key === 'ArrowLeft') setChapter((value) => Math.max(0, value - 1)); }; window.addEventListener('keydown', keys); return () => window.removeEventListener('keydown', keys); }, []);
  if (!allowed) return <div className="flex min-h-screen items-center justify-center bg-[#f4faf7]"><Loader2 className="h-7 w-7 animate-spin text-[#087f75]" /></div>;
  return <div className="flow-pitch min-h-screen overflow-x-hidden bg-[#f4faf7] text-[#173b38] [background-image:radial-gradient(#d8e9e1_0.7px,transparent_0.7px)] [background-size:24px_24px]">
    <header className="sticky top-0 z-30 border-b border-[#d8e9e1] bg-[#f4faf7]/95 backdrop-blur"><div className="mx-auto flex max-w-[1480px] items-center gap-5 px-5 py-4 lg:px-8"><Link href="/admin/dashboard" className="flex items-center gap-2 font-display font-bold tracking-tight"><span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#123e3b] text-lg text-white after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#c9ec88]">F</span>FlowCFO</Link><div className="hidden h-6 w-px bg-[#d8e9e1] sm:block" /><p className="hidden text-xs font-semibold uppercase tracking-[.16em] text-[#61756d] sm:block">Enterprise product walkthrough · 5 November 2026</p><nav className="ml-auto hidden items-center gap-1 xl:flex">{CHAPTERS.map((item, index) => <button key={item.id} onClick={() => setChapter(index)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${chapter === index ? 'bg-[#123e3b] text-white shadow-sm' : 'text-[#526760] hover:bg-white'}`}>{index + 1}. {item.label}</button>)}</nav><button onClick={() => document.documentElement.requestFullscreen?.()} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-[#d3e4dc] bg-white px-3 py-2 text-xs font-semibold shadow-sm xl:ml-0"><MonitorPlay className="h-4 w-4 text-[#087f75]" /> Present</button></div></header>
    <main className="mx-auto max-w-[1480px] px-5 py-8 lg:px-8 lg:py-10">{chapter === 0 && <Overview />}{chapter === 1 && <FinancialScenarioDemo scenario="consumer" autoRun={visualQa} />}{chapter === 2 && <FinancialScenarioDemo scenario="business" autoRun={visualQa} />}{chapter === 3 && <Integration />}{chapter === 4 && <AlertDeliveryDemo />}</main>
    <footer className="sticky bottom-0 z-20 border-t border-[#d8e9e1] bg-[#f4faf7]/95 backdrop-blur"><div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-3 lg:px-8"><button onClick={() => setChapter((value) => Math.max(0, value - 1))} disabled={chapter === 0} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-[#526760] hover:bg-white disabled:opacity-30"><ChevronLeft className="h-4 w-4" /> Previous</button><div className="flex items-center gap-2">{CHAPTERS.map((item, index) => <button key={item.id} onClick={() => setChapter(index)} aria-label={item.label} className={`h-2 rounded-full transition-all ${chapter === index ? 'w-8 bg-[#087f75]' : 'w-2 bg-[#c9d8d1]'}`} />)}</div>{chapter === CHAPTERS.length - 1 ? <button onClick={() => setChapter(0)} className="inline-flex items-center gap-2 rounded-lg border border-[#d3e4dc] bg-white px-4 py-2 text-xs font-bold text-[#173b38] shadow-sm hover:border-[#087f75]"><RotateCcw className="h-4 w-4 text-[#087f75]" /> Restart demo</button> : <button onClick={() => setChapter((value) => Math.min(CHAPTERS.length - 1, value + 1))} className="inline-flex items-center gap-2 rounded-lg bg-[#087f75] px-4 py-2 text-xs font-bold text-white shadow-sm">Next <ChevronRight className="h-4 w-4 text-[#c9ec88]" /></button>}</div></footer>
  </div>;
}
