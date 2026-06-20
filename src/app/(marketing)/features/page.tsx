import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Bell,
  Bot,
  Calculator,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react";

export const metadata: Metadata = {
  title: "FlowCFO Features — AI Agents, Cash Flow & Financial Monitoring",
  description:
    "Explore FlowCFO's AI agents, Safe-to-Spend indicator, cash-flow forecasts, tax reserve engine, Telegram bot, and morning brief.",
  openGraph: {
    title: "FlowCFO Features — AI Agents, Cash Flow & Financial Monitoring",
    description:
      "Explore FlowCFO's AI agents, Safe-to-Spend indicator, cash-flow forecasts, tax reserve engine, Telegram bot, and morning brief.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net/features" },
};

const primaryFeatures = [
  {
    icon: WalletCards,
    title: "Safe-to-Spend™",
    text: "Your real spendable cash after taxes, upcoming bills, pending transactions, and a safety buffer.",
    note: "One number that answers: what can I safely spend today?",
  },
  {
    icon: TrendingUp,
    title: "Cash Flow Forecast",
    text: "See 30, 60, and 90 days ahead from income timing, recurring bills, and actual transaction patterns.",
    note: "Spot slow months before they force rushed decisions.",
  },
];

const moduleFeatures = [
  {
    icon: ShieldCheck,
    module: "Module 04",
    title: "Tax Reserves",
    text: "Automatically estimate what should stay untouched for quarterly taxes every time income arrives.",
  },
  {
    icon: Bell,
    module: "Module 05",
    title: "Financial Alerts",
    text: "Get warnings for low balances, tax deadlines, unusual spending, irregular income, and large recurring bills.",
  },
  {
    icon: Banknote,
    module: "Module 06",
    title: "Bank Sync",
    text: "Connect your bank account through Plaid or upload CSV statements. FlowCFO keeps your Safe-to-Spend number current without manual spreadsheets.",
  },
  {
    icon: Bot,
    module: "Module 07",
    title: "AI Agents",
    text: "Specialized agents monitor margins, audit fees, track inventory, and suggest categorizations - working continuously in the background.",
  },
  {
    icon: Bell,
    module: "Module 08",
    title: "Telegram Bot",
    text: "Get alerts, run agents, and chat with your AI CFO directly from Telegram. OTP-based authentication, inline approve/reject buttons.",
  },
  {
    icon: TrendingUp,
    module: "Module 09",
    title: "Morning Brief",
    text: "Daily Telegram summary synthesizing yesterday's agent activity, cash position, and alerts into a single actionable message.",
  },
];

const chatExamples = [
  {
    title: "Decision checks",
    text: '"Can I afford to restock inventory this week?"',
  },
  {
    title: "Margin questions",
    text: '"Is this product still profitable after fees and shipping?"',
  },
];

function DashboardMockup() {
  return (
    <div className="aspect-video border border-flow-line bg-flow-obsidian p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="flow-label mb-2 text-flow-muted">Safe-to-Spend</p>
          <p className="font-mono text-4xl font-bold text-flow-gold">$6,240</p>
        </div>
        <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
          <p className="font-mono text-xs text-flow-gold">High confidence</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Tax reserve", "$3,120"],
          ["Bills", "$1,850"],
          ["Buffer", "$1,270"],
        ].map(([label, value]) => (
          <div key={label} className="border border-white/10 bg-white/[0.03] p-3">
            <p className="flow-label mb-2 text-flow-muted">{label}</p>
            <p className="font-mono text-sm text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-24 items-end gap-2">
        {[32, 48, 40, 66, 54, 82, 72, 90, 64].map((height, index) => (
          <div
            key={`${height}-${index}`}
            className="flex-1 bg-flow-gold/20"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function AiAdvisorMockup() {
  return (
    <div className="h-[500px] border border-flow-line-dark bg-black p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-flow-gold text-flow-obsidian">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="flow-label text-flow-gold">FlowCFO AI</p>
          <p className="text-sm text-flow-muted">Grounded in your numbers</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="ml-auto max-w-sm border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm leading-5 text-white">Can I afford the Amazon launch next month?</p>
        </div>
        <div className="max-w-md border border-flow-gold/30 bg-flow-gold/10 p-4">
          <p className="flow-label mb-2 text-flow-gold">Maybe. Wait 12 days.</p>
          <p className="text-sm leading-5 text-flow-muted">
            Your tax reserve is on track, but two recurring bills land before the launch spend. Recheck after the next invoice clears.
          </p>
        </div>
        {chatExamples.map((item) => (
          <div key={item.title} className="border border-white/10 bg-white/[0.03] p-4">
            <p className="flow-label mb-1 text-white">{item.title}</p>
            <p className="text-sm text-flow-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <main className="pt-24">
      <section className="flow-container py-24">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div className="w-full md:w-1/2">
            <span className="flow-label-wide mb-4 block text-flow-gold">Beyond bookkeeping</span>
            <h1 className="flow-headline-xl mb-6 text-flow-obsidian">
              Not another dashboard. <br />
              <span className="text-[#444748]">A decision engine.</span>
            </h1>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-[#444748]">
              FlowCFO turns business bank activity into forward-looking answers: what you can safely spend,
              what taxes need reserving, and which financial decisions deserve a yes, no, or wait.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flow-label border border-flow-gold bg-flow-gold px-8 py-4 text-flow-obsidian transition-all hover:opacity-90"
                href="#capabilities"
              >
                Explore capabilities
              </a>
              <Link
                className="flow-label border border-flow-obsidian bg-transparent px-8 py-4 text-flow-obsidian transition-all hover:bg-flow-obsidian hover:text-white"
                href="/calculator/safe-to-spend"
              >
                Try calculator
              </Link>
            </div>
          </div>
          <div className="relative w-full md:w-1/2">
            <DashboardMockup />
            <div className="absolute -bottom-6 -left-6 hidden border border-flow-line bg-white p-6 lg:block">
              <div className="mb-2 flex items-center gap-4">
                <ShieldCheck className="h-5 w-5 text-flow-gold" aria-hidden="true" />
                <span className="flow-label text-flow-obsidian">Tax reserve</span>
              </div>
              <div className="font-mono text-xl font-bold text-flow-obsidian">$3,120 set aside</div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="bg-[#f3f3f3] px-4 py-24 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {primaryFeatures.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col justify-between border border-flow-line bg-white p-10 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(10,10,10,0.12)]"
              >
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center bg-flow-obsidian">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="flow-headline-lg mb-4 text-flow-obsidian">{feature.title}</h2>
                  <p className="mb-8 text-base leading-6 text-[#444748]">{feature.text}</p>
                </div>
                <div className="border-l-4 border-flow-gold bg-[#eeeeee] p-4 font-mono text-sm leading-5 text-flow-obsidian">
                  {feature.note}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-flow-obsidian px-4 py-32 text-white md:px-16">
        <div className="gold-dot-grid absolute inset-0 opacity-10" />
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center gap-20 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <AiAdvisorMockup />
          </div>
          <div className="w-full lg:w-1/2">
            <span className="flow-label-wide mb-4 block text-flow-gold">AI CFO advisor</span>
            <h2 className="flow-headline-xl mb-8 text-white">Ask financial questions in plain English.</h2>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-flow-muted">
              FlowCFO answers with your actual numbers, not generic advice. It understands your business type,
              cash timing, tax reserve, upcoming commitments, and confidence level.
            </p>
            <ul className="mb-12 space-y-6">
              <li className="flex items-start gap-4">
                <Calculator className="mt-1 h-5 w-5 text-flow-gold" aria-hidden="true" />
                <div>
                  <h3 className="flow-label mb-1 text-white">Decision confidence scoring</h3>
                  <p className="text-sm leading-5 text-flow-muted">
                    Get a clear yes, no, or wait on hires, launches, inventory, tools, and travel.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <LockKeyhole className="mt-1 h-5 w-5 text-flow-gold" aria-hidden="true" />
                <div>
                  <h3 className="flow-label mb-1 text-white">Privacy-aware context</h3>
                  <p className="text-sm leading-5 text-flow-muted">
                    AI responses use derived financial summaries instead of handing raw bank data to the model.
                  </p>
                </div>
              </li>
            </ul>
            <Link
              className="flow-label inline-flex items-center gap-2 bg-flow-gold px-10 py-5 text-flow-obsidian transition-all hover:scale-105"
              href="/waitlist"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="flow-container py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {moduleFeatures.map((feature) => (
            <article
              key={feature.title}
              className="group border border-flow-line p-10 transition-colors hover:border-flow-obsidian"
            >
              <div className="mb-12 flex items-start justify-between">
                <feature.icon className="h-10 w-10 text-flow-obsidian transition-colors group-hover:text-flow-gold" aria-hidden="true" />
                <span className="font-mono text-sm leading-5 text-[#444748]">{feature.module}</span>
              </div>
              <h2 className="flow-headline-lg mb-4 text-flow-obsidian">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-[#444748]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-container mb-24">
        <div className="border border-flow-line bg-[#eeeeee] p-8 text-center md:p-16">
          <h2 className="flow-headline-xl mb-6 text-flow-obsidian">Know what your business can safely do next.</h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-6 text-[#444748]">
            Join the waitlist for early access. We&apos;re starting with e-commerce brands
            who want financial clarity before decisions get expensive.
          </p>
          <div className="inline-flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              className="flow-label border border-flow-obsidian bg-flow-obsidian px-10 py-4 text-white transition-colors hover:bg-[#444748]"
              href="/waitlist"
            >
              Secure early access
            </Link>
            <Link
              className="flow-label border border-flow-obsidian bg-white px-10 py-4 text-flow-obsidian transition-colors hover:bg-flow-gold"
              href="/calculator/safe-to-spend"
            >
              Calculate Safe-to-Spend
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
