import Link from "next/link";
import { ArrowRight, BellRing, BookOpenText, Building2, ChartNoAxesCombined, CircleDollarSign, Code2, ShieldCheck, Wallet } from "lucide-react";

const capabilities = [
  { icon: ChartNoAxesCombined, title: "See what is changing", text: "Turn account activity and business records into a clear view of spending, cash flow and emerging trends." },
  { icon: BellRing, title: "Act before the date arrives", text: "Surface upcoming commitments and early warning signals while there is still time to respond." },
  { icon: CircleDollarSign, title: "Make the next decision", text: "Give people practical budget guidance; help SMEs understand liquidity gaps and possible next steps." },
];

export default function HomePage() {
  return <div className="bg-[#f7fbf9] text-[#172b2a]">
    <section className="relative overflow-hidden border-b border-[#dce9e4] px-5 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute -right-32 top-20 h-[34rem] w-[34rem] rounded-full bg-[#9be8d6]/30 blur-3xl" />
      <div className="flow-container relative grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9e4dc] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-[#176a60]"><ShieldCheck size={15}/> Financial intelligence, built to embed</div>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.08] tracking-[-.045em] md:text-7xl">Help people see what their money is telling them.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#536762]">FlowCFO turns financial activity into useful guidance for consumers and SMEs—and gives banks and platforms the APIs to bring that experience to their own customers.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#087f75] px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#066b63]">Discuss a use case <ArrowRight size={17}/></Link>
            <Link href="/features" className="rounded-lg border border-[#c7d6d1] bg-white px-6 py-3.5 font-semibold text-[#203a36] transition-colors hover:border-[#087f75]">Explore capabilities</Link>
          </div>
          <p className="mt-5 text-sm text-[#61736d]">Assisted onboarding is available now. We’ll scope the right setup with you.</p>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="rounded-3xl border border-[#dce9e4] bg-white p-5 shadow-[0_26px_80px_-48px_rgba(18,62,59,.35)] md:p-7">
            <div className="flex items-center justify-between border-b border-[#e3ece8] pb-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#71817b]">FlowCFO intelligence</p><p className="mt-1 font-semibold">A clearer financial picture</p></div><span className="rounded-full bg-[#e8f7f2] px-3 py-1 text-xs font-medium text-[#146c5e]">Illustrative view</span></div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f3f8f6] p-4"><Wallet className="text-[#087f75]" size={19}/><p className="mt-4 text-xs text-[#687a73]">Cash position</p><p className="mt-1 text-2xl font-semibold">Understandable</p></div>
              <div className="rounded-2xl bg-[#f3f8f6] p-4"><BellRing className="text-[#087f75]" size={19}/><p className="mt-4 text-xs text-[#687a73]">Next commitment</p><p className="mt-1 text-2xl font-semibold">Visible early</p></div>
            </div>
            <div className="mt-4 rounded-2xl border border-[#e3ece8] p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium">Cash outlook</span><span className="text-xs text-[#71817b]">Forecast + context</span></div><div className="mt-5 flex h-24 items-end gap-2">{[34,48,42,63,57,77,68,90,76,84,70,88].map((h,i)=><div key={i} className={`flex-1 rounded-t-sm ${i>7?"bg-[#f0ae46]":"bg-[#83bdb0]"}`} style={{height:`${h}%`}} />)}</div><div className="mt-2 flex justify-between text-[10px] text-[#87948e]"><span>Now</span><span>Near-term outlook</span></div></div>
            <div className="mt-4 flex gap-3 rounded-2xl bg-[#edf7f3] p-4"><div className="mt-0.5 rounded-full bg-white p-2 text-[#087f75]"><ChartNoAxesCombined size={16}/></div><div><p className="text-sm font-semibold">A signal, not just a chart</p><p className="mt-1 text-xs leading-5 text-[#596d66]">Explain what changed, what may be coming, and what the customer can consider next.</p></div></div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#d9e7e1] bg-white px-4 py-3 shadow-lg sm:block"><p className="text-xs font-medium text-[#71817b]">One platform · two experiences</p><p className="mt-1 text-sm font-semibold">People + business banking</p></div>
        </div>
      </div>
    </section>

    <section className="flow-container py-20 md:py-24">
      <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#087f75]">What FlowCFO does</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.035em] md:text-5xl">From financial data to a timely next step.</h2><p className="mt-5 leading-7 text-[#536762]">The experience can live in FlowCFO or be embedded into a partner’s digital channels. The value is the same: useful context before a financial decision becomes urgent.</p></div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">{capabilities.map(({icon:Icon,title,text},i)=><article key={title} className="rounded-2xl border border-[#d9e7e1] bg-white p-7"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7f2] text-[#087f75]"><Icon size={21}/></div><p className="mt-7 text-xs font-semibold uppercase tracking-[.12em] text-[#798a83]">0{i+1}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[#596d66]">{text}</p></article>)}</div>
    </section>

    <section className="border-y border-[#d9e7e1] bg-[#eff6f3] py-20 md:py-24"><div className="flow-container"><div className="grid gap-5 lg:grid-cols-3">
      <article className="rounded-2xl bg-white p-7"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7f2] text-[#087f75]"><Wallet size={21}/></div><p className="mt-6 text-xs font-semibold uppercase tracking-[.13em] text-[#087f75]">Consumer banking</p><h2 className="mt-2 text-2xl font-semibold">A more helpful view of personal money.</h2><p className="mt-3 leading-7 text-[#596d66]">Spending patterns, upcoming commitments, budgeting suggestions and relevant financial guidance—designed for customers inside the channels they already use.</p></article>
      <article className="rounded-2xl bg-white p-7"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7f2] text-[#087f75]"><Building2 size={21}/></div><p className="mt-6 text-xs font-semibold uppercase tracking-[.13em] text-[#087f75]">Business banking</p><h2 className="mt-2 text-2xl font-semibold">A virtual CFO perspective for SMEs.</h2><p className="mt-3 leading-7 text-[#596d66]">Monitor cash flow, forecast liquidity, flag obligations and deterioration early, and surface financing or banking-product options for review.</p></article>
      <article className="rounded-2xl bg-[#123e3b] p-7 text-white"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#f0b34d]"><Code2 size={21}/></div><p className="mt-6 text-xs font-semibold uppercase tracking-[.13em] text-[#f0b34d]">Banks & platforms</p><h2 className="mt-2 text-2xl font-semibold text-white">Integrate through APIs.</h2><p className="mt-3 leading-7 text-white/80">Use FlowCFO’s financial intelligence as an API layer, with a deployment and model approach scoped to your architecture, controls and customer proposition.</p><Link href="/developers" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ffc96b]">Explore the platform <ArrowRight size={16}/></Link></article>
    </div></div></section>

    <section className="flow-container py-20 md:py-24"><div className="flex flex-col justify-between gap-8 rounded-3xl bg-[#123e3b] p-8 text-white md:flex-row md:items-center md:p-12"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#ffc96b]">Built around your context</p><h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">Start with the customer need. Then shape the integration.</h2><p className="mt-4 leading-7 text-white/85">We work directly with individuals, growing businesses and financial institutions to configure access, data flows and the right product scope.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f0b34d] px-6 py-3.5 font-semibold text-[#20312d] shadow-sm transition-colors hover:bg-[#ffc96b]">Talk to FlowCFO <ArrowRight size={17}/></Link></div></section>

    <section className="border-t border-[#dce9e4] bg-white py-14"><div className="flow-container flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#087f75]">Ideas for clearer money decisions</p><h2 className="mt-2 text-2xl font-semibold">Practical guides for people and business owners.</h2></div><Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-[#087f75] hover:text-[#055f58]">Visit the FlowCFO Blog <BookOpenText size={17}/><ArrowRight size={16}/></Link></div></section>
  </div>;
}
