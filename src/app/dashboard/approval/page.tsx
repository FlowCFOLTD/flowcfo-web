'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Clock, Mail, BarChart3, ShieldCheck, TrendingUp, FileText, ChevronRight, Bot, Bell } from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';

const BUSINESS_CONTENT: Record<string, {
  metrics: { label: string; icon: React.ReactNode; desc: string }[];
  agents: { label: string; icon: React.ReactNode; desc: string }[];
  dashboard: string;
  csv: string;
}> = {
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
    agents: [
      { label: 'Margin Guardian', icon: <Bot className="h-4 w-4" />, desc: 'Watches gross margin continuously. Alerts you when margin drops and investigates the root cause automatically.' },
      { label: 'Inventory Replenishment', icon: <Bot className="h-4 w-4" />, desc: 'Drafts purchase orders when stock runs low. Review and approve in one click.' },
      { label: 'Fee Auditor', icon: <Bot className="h-4 w-4" />, desc: 'Scans platform and processor fees monthly. Flags overcharges, duplicate charges, and unexpected increases.' },
      { label: 'AI Advisor', icon: <Bell className="h-4 w-4" />, desc: 'Ask questions about your finances in plain English. Get instant answers with supporting data from your dashboard.' },
    ],
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
    agents: [
      { label: 'Burn Rate Monitor', icon: <Bot className="h-4 w-4" />, desc: 'Tracks burn rate trends and flags unusual spending patterns automatically.' },
      { label: 'Runway Guardian', icon: <Bot className="h-4 w-4" />, desc: 'Alerts you when runway drops below your threshold. Get notified before it\'s urgent.' },
      { label: 'Spend Anomaly Detector', icon: <Bot className="h-4 w-4" />, desc: 'Flags unexpected charges and spending outliers against your normal patterns.' },
      { label: 'AI Advisor', icon: <Bell className="h-4 w-4" />, desc: 'Ask questions about your finances in plain English. Get instant answers with supporting data from your dashboard.' },
    ],
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
    agents: [
      { label: 'Client Profitability Monitor', icon: <Bot className="h-4 w-4" />, desc: 'Tracks profitability trends per client. Flags underperforming accounts before they become problems.' },
      { label: 'Cash Flow Guardian', icon: <Bot className="h-4 w-4" />, desc: 'Alerts you to cash flow risks based on upcoming bills and client payment patterns.' },
      { label: 'Fee Auditor', icon: <Bot className="h-4 w-4" />, desc: 'Scans platform and processor fees for overcharges and unexpected increases.' },
      { label: 'AI Advisor', icon: <Bell className="h-4 w-4" />, desc: 'Ask questions about your finances in plain English. Get instant answers with supporting data from your dashboard.' },
    ],
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
    agents: [
      { label: 'Income Pattern Monitor', icon: <Bot className="h-4 w-4" />, desc: 'Tracks income stability and flags slow months early so you can adjust.' },
      { label: 'Tax Readiness Agent', icon: <Bot className="h-4 w-4" />, desc: 'Alerts you when tax savings fall behind estimates. No surprises at tax time.' },
      { label: 'AI Advisor', icon: <Bell className="h-4 w-4" />, desc: 'Ask questions about your finances in plain English. Get instant answers with supporting data from your dashboard.' },
    ],
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
    agents: [
      { label: 'Food Cost Guardian', icon: <Bot className="h-4 w-4" />, desc: 'Monitors food cost trends and flags unusual supplier charges automatically.' },
      { label: 'Cash Flow Guardian', icon: <Bot className="h-4 w-4" />, desc: 'Alerts you when cash flow drops below safe levels based on upcoming commitments.' },
      { label: 'AI Advisor', icon: <Bell className="h-4 w-4" />, desc: 'Ask questions about your finances in plain English. Get instant answers with supporting data from your dashboard.' },
    ],
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
          <h1 className="text-white font-bold text-3xl tracking-tight">FlowCFO</h1>
        </div>

        {/* Banner */}
        <div className="border border-flow-gold/30 bg-flow-gold/[0.04] p-6 md:p-8 mb-10">
          <div className="flex items-start gap-4">
            <Clock className="h-6 w-6 shrink-0 text-flow-gold mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-2">Account Pending Review</h2>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Your account is being reviewed. We&apos;ll notify you as soon as it&apos;s ready.
                In the meantime, explore the features below to see what you&apos;ll have access to.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4" />
                <span>Questions? Email <a href="mailto:info@flowcfo.net" className="text-flow-gold hover:underline">info@flowcfo.net</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8 mb-10">
          <h2 className="font-display text-2xl font-bold text-white mb-2">What You&apos;ll Get</h2>
          <p className="font-body text-base text-white/50 mb-8">
            FlowCFO gives you real-time financial intelligence — no spreadsheets, no stale reports, no guessing.
          </p>

          <h3 className="font-display text-lg font-bold text-white mb-4">Dashboard &amp; Metrics</h3>
          <p className="font-body text-sm text-white/60 mb-6">{content.dashboard}</p>

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

          <h3 className="font-display text-lg font-bold text-white mb-4">Autonomous Agents</h3>
          <p className="font-body text-sm text-white/60 mb-6">
            AI agents monitor your finances continuously — watching for changes, investigating anomalies,
            and notifying you when action is needed. All actions require your approval via in-app notification or Telegram.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {content.agents.map((a) => (
              <div key={a.label} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-flow-gold">{a.icon}</span>
                  <h4 className="font-label-caps text-label-caps text-white">{a.label}</h4>
                </div>
                <p className="font-body text-xs text-white/50 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-lg font-bold text-white mb-4">Getting Started</h3>
          <p className="font-body text-sm text-white/60">
            {content.csv} Once uploaded, your dashboard populates immediately. Upload fresh data whenever
            new transactions come in to keep everything up to date.
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
