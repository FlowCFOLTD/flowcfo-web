import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BellRing, ChartNoAxesCombined, CircleDollarSign, Compass, FileInput, Landmark, ShieldAlert } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Consumer and business financial intelligence", description: "See how FlowCFO can help consumers understand spending and commitments, SMEs anticipate cash-flow pressure, and partners embed timely financial guidance.", path: "/features" });

const consumer = [
  [ChartNoAxesCombined, "Understand spending", "Summarize spending behaviour and recurring patterns so customers can see where money is going."],
  [BellRing, "Prepare for commitments", "Bring upcoming bills and regular commitments into view, with proactive reminders where configured."],
  [Compass, "Make a workable budget", "Offer budgeting suggestions and financial guidance grounded in the customer’s available financial context."],
  [Landmark, "Find relevant next steps", "Support recommendations for suitable banking products and services, subject to partner rules and product data."],
] as const;
const business = [
  [ChartNoAxesCombined, "Monitor business cash flow", "Bring statement and transaction data into a useful view of inflows, outflows and near-term position."],
  [ShieldAlert, "See liquidity pressure sooner", "Use trend and cash-flow signals to flag emerging deterioration and potential liquidity gaps."],
  [BellRing, "Stay ahead of obligations", "Surface upcoming payments and receivables so a business can respond before a due date is missed."],
  [CircleDollarSign, "Explore appropriate options", "Support financing and banking-product conversations, with recommendations governed by the institution’s eligibility and policy rules."],
] as const;

function CapabilityGrid({ items }: { items: readonly (readonly [typeof ChartNoAxesCombined, string, string])[] }) {
  return <div className="grid gap-4 sm:grid-cols-2">{items.map(([Icon,title,text])=><article key={title} className="rounded-2xl border border-[#e5e2d7] bg-white p-6"><Icon size={22} className="text-[#806a1f]"/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#626a63]">{text}</p></article>)}</div>;
}

export default function FeaturesPage() {
  return <main className="bg-[#fbfaf7] text-[#202421]"><header className="flow-container pb-14 pt-32 md:pb-20 md:pt-40"><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#806a1f]">What FlowCFO can do</p><h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-.045em] md:text-6xl">Useful guidance for the financial moments that matter.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#5e665f]">FlowCFO is designed to turn financial activity into understandable signals, timely reminders and relevant next steps. Partners can offer the experience directly or integrate through APIs.</p></header>
    <section id="consumer-banking" className="border-y border-[#e7e5de] bg-[#f4f2ea] py-14 md:py-20"><div className="flow-container grid gap-9 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#806a1f]">Consumer banking</p><h2 className="mt-3 font-display text-3xl font-semibold">Help customers build a clearer picture of personal finances.</h2><p className="mt-4 leading-7 text-[#606960]">The goal is a practical financial companion: understand the pattern, prepare for what’s next, and connect people with relevant guidance—not a generic chatbot.</p></div><CapabilityGrid items={consumer}/></div></section>
    <section id="business-banking" className="flow-container py-14 md:py-20"><div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#806a1f]">Business banking</p><h2 className="mt-3 font-display text-3xl font-semibold">A virtual CFO perspective for small businesses.</h2><p className="mt-4 leading-7 text-[#606960]">Give SME customers a forward-looking view of cash, commitments and risk—then help them understand which options may fit their situation.</p></div><CapabilityGrid items={business}/></div></section>
    <section className="border-y border-[#e7e5de] bg-white py-14 md:py-20"><div className="flow-container grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#806a1f]">How the data moves</p><h2 className="mt-3 font-display text-3xl font-semibold">Bring data in. Normalize it. Make it useful.</h2><p className="mt-4 leading-7 text-[#606960]">A deployment can start with files or API integration depending on the source system and partner requirements. Ingestion maps records into a consistent financial picture used by forecasts, alerts and recommendations.</p></div><div className="grid gap-3 sm:grid-cols-3">{[[FileInput,"Ingest","Receive supported financial files or connected data."],[ChartNoAxesCombined,"Interpret","Normalize activity and derive customer-level signals."],[BellRing,"Respond","Return insights through the chosen UI or integration." ]].map(([Icon,title,text])=><div key={title as string} className="rounded-2xl bg-[#f7f6f1] p-5"><div className="text-[#806a1f]">{typeof Icon === "function" ? <Icon size={22}/> : null}</div><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#626a63]">{text as string}</p></div>)}</div></div></section>
    <section className="flow-container py-14 md:py-20"><div className="rounded-3xl bg-[#202722] p-8 text-white md:p-12"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[.13em] text-[#ddc65f]">Built to integrate</p><h2 className="mt-3 font-display text-3xl font-semibold">Your customer experience. FlowCFO intelligence behind it.</h2><p className="mt-4 leading-7 text-white/70">Discuss APIs, data requirements, model strategy and deployment boundaries with our team. We’ll be direct about what is ready, what needs integration work and what belongs in a scoped pilot.</p><Link href="/developers" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#e3cf71]">Explore the API platform <ArrowRight size={17}/></Link></div></div></section>
  </main>;
}
