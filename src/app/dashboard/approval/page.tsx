'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Clock, Mail, BarChart3, ShieldCheck, TrendingUp, FileText, ChevronRight } from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';

const BUSINESS_CONTENT: Record<string, { metrics: { label: string; icon: React.ReactNode; desc: string }[]; dashboard: string; csv: string; phase2: string }> = {
  ecommerce: {
    dashboard: 'Your dashboard gives you a real-time view of your ecommerce finances: gross margin trending, platform fees by channel, inventory turns, cash flow runway, and tax readiness — all from your uploaded transaction data.',
    csv: 'Export transactions from Shopify, Stripe, Amazon, or your bank. Upload the CSV and we\'ll map them to the right metrics — COGS, platform fees, revenue by channel, and more.',
    metrics: [
      { label: 'Gross Margin', icon: <TrendingUp className="h-4 w-4" />, desc: 'Revenue minus the direct cost of goods sold. Track it monthly to see if your pricing and COGS are healthy.' },
      { label: 'Platform Fees', icon: <BarChart3 className="h-4 w-4" />, desc: 'What Shopify, Amazon, Etsy, and payment processors charge you. Broken down by platform so you know where fees are eating into margin.' },
      { label: 'Inventory Health', icon: <FileText className="h-4 w-4" />, desc: 'How fast your inventory turns and when to reorder. Days on hand tells you if you\'re overstocked or at risk of stocking out.' },
      { label: 'Cash Flow', icon: <BarChart3 className="h-4 w-4" />, desc: ' Money in vs money out with a forward-looking forecast. Know your runway at a glance.' },
      { label: 'Safe to Spend', icon: <ShieldCheck className="h-4 w-4" />, desc: 'How much you can safely withdraw or reinvest after upcoming bills and a safety buffer.' },
      { label: 'Tax Readiness', icon: <FileText className="h-4 w-4" />, desc: ' Estimated tax liability vs what you\'ve saved. Avoid surprises at filing time.' },
    ],
    phase2: 'We\'re building AI agents that watch your finances continuously. The Margin Guardian will alert you when gross margin drops and investigate the root cause. The Inventory Replenishment agent will draft purchase orders when stock runs low. The Fee Auditor will scan for overcharges monthly. All actions require your approval via in-app notification or Telegram.',
  },
  startup: {
    dashboard: 'Your dashboard shows your startup\'s financial health: burn rate, runway, revenue growth, and tax readiness — all calculated from your uploaded data.',
    csv: 'Export transactions from your bank, Stripe, or accounting software. Upload the CSV and we\'ll calculate burn rate, runway, and revenue trends automatically.',
    metrics: [
      { label: 'Burn Rate', icon: <TrendingUp className="h-4 w-4" />, desc: 'Monthly cash consumption. Know exactly how much you\'re spending and where.' },
      { label: 'Runway', icon: <BarChart3 className="h-4 w-4" />, desc: 'Months until you run out of cash at the current burn rate. Updated automatically as new transactions come in.' },
      { label: 'Cash Flow', icon: <BarChart3 className="h-4 w-4" />, desc: 'Money in vs money out with a 30/90-day forecast. Plan your fundraising timeline with confidence.' },
      { label: 'Safe to Spend', icon: <ShieldCheck className="h-4 w-4" />, desc: 'How much you can safely spend after upcoming commitments and a buffer.' },
      { label: 'Tax Readiness', icon: <FileText className="h-4 w-4" />, desc: 'Estimated tax liability vs what you\'ve saved. Avoid surprises at filing time.' },
    ],
    phase2: 'We\'re building AI agents that watch your finances continuously. Agents will monitor burn rate trends, flag unusual spending patterns, and alert you when runway drops below your threshold. All actions require your approval via in-app notification or Telegram.',
  },
  agency: {
    dashboard: 'Your dashboard gives you a real-time view of your agency\'s finances: client profitability, cash flow, revenue trends, and tax readiness.',
    csv: 'Export transactions from your bank, accounting software, or payment processors. Upload the CSV and we\'ll calculate client-level profitability and revenue trends.',
    metrics: [
      { label: 'Client Profitability', icon: <TrendingUp className="h-4 w-4" />, desc: ' Profit breakdown by client. See which clients are most profitable and where you might need to adjust pricing.' },
      { label: 'Cash Flow', icon: <BarChart3 className="h-4 w-4" />, desc: 'Money in vs money out with a forward-looking forecast. Plan hiring and investments with confidence.' },
      { label: 'Safe to Spend', icon: <ShieldCheck className="h-4 w-4" />, desc: 'How much you can safely withdraw after upcoming bills and a buffer.' },
      { label: 'Tax Readiness', icon: <FileText className="h-4 w-4" />, desc: 'Estimated tax liability vs what you\'ve saved.' },
    ],
    phase2: 'We\'re building AI agents that watch your finances continuously. Agents will monitor client profitability trends, flag underperforming accounts, and alert you to cash flow risks. All actions require your approval via in-app notification or Telegram.',
  },
  freelancer: {
    dashboard: 'Your dashboard shows your freelance finances: income volatility, cash flow, tax readiness, and safe-to-spend — all from your uploaded data.',
    csv: 'Export transactions from your bank, PayPal, Stripe, or accounting software. Upload the CSV and we\'ll calculate income trends and tax estimates.',
    metrics: [
      { label: 'Income Volatility', icon: <TrendingUp className="h-4 w-4" />, desc: 'How stable your monthly income is. Know your high and low months to plan ahead.' },
      { label: 'Cash Flow', icon: <BarChart3 className="h-4 w-4" />, desc: 'Money in vs money out with a forward-looking forecast. Never miss a slow month unprepared.' },
      { label: 'Safe to Spend', icon: <ShieldCheck className="h-4 w-4" />, desc: 'How much you can safely withdraw after taxes, bills, and a buffer.' },
      { label: 'Tax Readiness', icon: <FileText className="h-4 w-4" />, desc: 'Estimated tax liability vs what you\'ve saved. Avoid surprises at filing time.' },
    ],
    phase2: 'We\'re building AI agents that watch your finances continuously. Agents will monitor income patterns, flag slow months early, and alert you when tax savings fall behind estimates. All actions require your approval via in-app notification or Telegram.',
  },
  restaurant: {
    dashboard: 'Your dashboard gives you a real-time view of your restaurant\'s finances: food cost, labor cost, daily revenue, cash flow, and tax readiness.',
    csv: 'Export transactions from your POS system, bank, or suppliers. Upload the CSV and we\'ll calculate food cost percentages and revenue patterns.',
    metrics: [
      { label: 'Food Cost', icon: <TrendingUp className="h-4 w-4" />, desc: 'Ingredient cost as a percentage of menu revenue. Track it to protect your margins.' },
      { label: 'Labor Cost', icon: <BarChart3 className="h-4 w-4" />, desc: 'Staff cost as a percentage of revenue. Know if you\'re over or understaffed.' },
      { label: 'Daily Revenue', icon: <BarChart3 className="h-4 w-4" />, desc: 'Revenue trends by day, week, and month. Spot patterns and seasonality.' },
      { label: 'Cash Flow', icon: <BarChart3 className="h-4 w-4" />, desc: 'Money in vs money out with a forward-looking forecast.' },
      { label: 'Safe to Spend', icon: <ShieldCheck className="h-4 w-4" />, desc: 'How much you can safely withdraw after upcoming commitments and a buffer.' },
      { label: 'Tax Readiness', icon: <FileText className="h-4 w-4" />, desc: 'Estimated tax liability vs what you\'ve saved.' },
    ],
    phase2: 'We\'re building AI agents that watch your finances continuously. Agents will monitor food cost trends, flag unusual supplier charges, and alert you when cash flow drops. All actions require your approval via in-app notification or Telegram.',
  },
};

const DEFAULT_CONTENT = BUSINESS_CONTENT.ecommerce;

export default function ApprovalPage() {
  const { data: user } = useUser();
  const router = useRouter();
  const bt = (user?.business_type || 'ecommerce') as keyof typeof BUSINESS_CONTENT;
  const content = BUSINESS_CONTENT[bt] || DEFAULT_CONTENT;

  return (
    <div className="min-h-screen bg-flow-obsidian">
      <div className="mx-auto max-w-[900px] px-4 md:px-8 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Image src="/logo-dark.svg" alt="FlowCFO" width={44} height={44} className="h-11 w-11" />
          <div>
            <h1 className="text-white font-bold text-3xl tracking-tight">FlowCFO</h1>
            <p className="text-flow-gold text-[10px] uppercase tracking-[0.3em] font-medium">Beta Access</p>
          </div>
        </div>

        {/* Banner */}
        <div className="border border-flow-gold/30 bg-flow-gold/[0.04] p-6 md:p-8 mb-10">
          <div className="flex items-start gap-4">
            <Clock className="h-6 w-6 shrink-0 text-flow-gold mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-2">Limited Beta Access</h2>
              <p className="font-body text-base text-white/70 leading-relaxed">
                FlowCFO is currently in a private beta phase. To ensure a focused, high-touch experience
                for our early users, access is granted on a limited basis. Your access request has been
                submitted automatically.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mt-3">
                We review requests within <strong className="text-white">24–48 hours</strong>. You&apos;ll
                receive access as soon as your account is approved.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4" />
                <span>Questions? Email <a href="mailto:info@flowcfo.net" className="text-flow-gold hover:underline">info@flowcfo.net</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Thanks section */}
        <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8 mb-10">
          <h2 className="font-display text-2xl font-bold text-white mb-2">Thanks for Joining Our Beta</h2>
          <p className="font-body text-base text-white/50 mb-8">
            We&apos;re building FlowCFO to give business owners real-time financial intelligence —
            no spreadsheets, no stale reports, no guessing.
          </p>

          <h3 className="font-display text-lg font-bold text-white mb-4">Your Dashboard</h3>
          <p className="font-body text-sm text-white/60 mb-6">{content.dashboard}</p>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {content.metrics.map((m) => (
              <div key={m.label} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-flow-gold">{m.icon}</span>
                  <h4 className="font-label-caps text-label-caps text-white">{m.label}</h4>
                </div>
                <p className="font-body text-xs text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-lg font-bold text-white mb-4">How to Get Started</h3>
          <p className="font-body text-sm text-white/60 mb-10">
            {content.csv} Once uploaded, your dashboard populates immediately. Upload fresh data whenever
            new transactions come in to keep everything up to date.
          </p>

          <h3 className="font-display text-lg font-bold text-white mb-4">What&apos;s Coming: Phase 2 — Autonomous Agents</h3>
          <p className="font-body text-sm text-white/60">{content.phase2}</p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="font-body text-xs text-white/30">
              You have <strong className="text-white">5 AI Advisor questions</strong> available during the
              beta. Use them wisely — each one taps into your financial data for personalized insights.
            </p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Try the dashboard (limited access)
        </button>
      </div>
    </div>
  );
}
