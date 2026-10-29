import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight, BellRing, ChartNoAxesCombined, CircleDollarSign, Compass, FileInput, Landmark, ShieldAlert } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Consumer and business financial intelligence", description: "See how FlowCFO can help consumers understand spending and commitments, SMEs anticipate cash-flow pressure, and partners embed timely financial guidance.", path: "/features" });

const consumer = [
  { icon: ChartNoAxesCombined, title: "Understand spending", text: "Summarize spending behaviour and recurring patterns so customers can see where money is going." },
  { icon: BellRing, title: "Prepare for commitments", text: "Bring upcoming bills and regular commitments into view, with proactive reminders where configured." },
  { icon: Compass, title: "Make a workable budget", text: "Offer budgeting suggestions and financial guidance grounded in the customer’s available financial context." },
  { icon: Landmark, title: "Find relevant next steps", text: "Support recommendations for suitable banking products and services, subject to partner rules and product data." },
];
const business = [
  { icon: ChartNoAxesCombined, title: "Monitor business cash flow", text: "Bring statement and transaction data into a useful view of inflows, outflows and near-term position." },
  { icon: ShieldAlert, title: "See liquidity pressure sooner", text: "Use trend and cash-flow signals to flag emerging deterioration and potential liquidity gaps." },
  { icon: BellRing, title: "Stay ahead of obligations", text: "Surface upcoming payments and receivables so a business can respond before a due date is missed." },
  { icon: CircleDollarSign, title: "Explore appropriate options", text: "Support financing and banking-product conversations, with recommendations governed by the institution’s eligibility and policy rules." },
];

function CapabilityGrid({ items }: { items: { icon: LucideIcon; title: string; text: string }[] }) {
  return <div className="grid gap-4 sm:grid-cols-2">{items.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#d9e7e1] bg-white p-6"><Icon size={22} className="text-[#087f75]"/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#596d66]">{text}</p></article>)}</div>;
}

export default function FeaturesPage() {
  return <main className="bg-[#f7fbf9] text-[#172b2a]"><header className="flow-container pb-14 pt-32 md:pb-20 md:pt-40"><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#087f75]">What FlowCFO can do</p><h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-.045em] md:text-6xl">Useful guidance for the financial moments that matter.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#536762]">FlowCFO is designed to turn financial activity into understandable signals, timely reminders and relevant next steps. Partners can offer the experience directly or integrate through APIs.</p></header>
    <section id="consumer-banking" className="border-y border-[#d9e7e1] bg-[#eff6f3] py-14 md:py-20"><div className="flow-container grid gap-9 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#087f75]">Consumer banking</p><h2 className="mt-3 font-display text-3xl font-semibold">Help customers build a clearer picture of personal finances.</h2><p className="mt-4 leading-7 text-[#596d66]">The goal is a practical financial companion: understand the pattern, prepare for what’s next, and connect people with relevant guidance—not a generic chatbot.</p></div><CapabilityGrid items={consumer}/></div></section>
    <section id="business-banking" className="flow-container py-14 md:py-20"><div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#087f75]">Business banking</p><h2 className="mt-3 font-display text-3xl font-semibold">A virtual CFO perspective for small businesses.</h2><p className="mt-4 leading-7 text-[#596d66]">Give SME customers a forward-looking view of cash, commitments and risk—then help them understand which options may fit their situation.</p></div><CapabilityGrid items={business}/></div></section>
    <section className="border-y border-[#dce9e4] bg-white py-14 md:py-20"><div className="flow-container grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#087f75]">How the data moves</p><h2 className="mt-3 font-display text-3xl font-semibold">Bring data in. Normalize it. Make it useful.</h2><p className="mt-4 leading-7 text-[#596d66]">A deployment can start with files or API integration depending on the source system and partner requirements. Ingestion maps records into a consistent financial picture used by forecasts, alerts and recommendations.</p></div><div className="grid gap-3 sm:grid-cols-3">{[[FileInput, "Ingest", "Receive supported financial files or connected data."], [ChartNoAxesCombined, "Interpret", "Normalize activity and derive customer-level signals."], [BellRing, "Respond", "Return insights through the chosen UI or integration."]].map(([Icon, title, text]) => <div key={title as string} className="rounded-2xl bg-[#f3f8f6] p-5"><div className="text-[#087f75]">{typeof Icon === "function" ? <Icon size={22}/> : null}</div><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#596d66]">{text as string}</p></div>)}</div></div></section>
    <section className="flow-container py-14 md:py-20"><div className="rounded-3xl bg-[#123e3b] p-8 text-white md:p-12"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#ffc96b]">Built to integrate</p><h2 className="mt-3 font-display text-3xl font-semibold text-white">Your customer experience. FlowCFO intelligence behind it.</h2><p className="mt-4 leading-7 text-white/85">Discuss APIs, data requirements, model strategy and deployment boundaries with our team. We’ll be direct about what is ready, what needs integration work and what belongs in a scoped pilot.</p><Link href="/developers" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#ffc96b]">Explore the API platform <ArrowRight size={17}/></Link></div></div></section>
  </main>;
}
