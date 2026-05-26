'use client';

import { AlertTriangle, Download, Calendar, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/api/use-user';
import { useFreelancerTaxReadiness } from '@/hooks/api/use-freelancer';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
    </div>
  );
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
}

const circumference = 2 * Math.PI * 45;

export default function TaxReadinessPage() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: data, isLoading } = useFreelancerTaxReadiness();

  if (userLoading || isLoading) return <LoadingSpinner />;

  const tax = data;

  return (
    <div className="min-h-screen pb-32">
      {/* Breadcrumb + Header */}
      <header className="pt-10 px-6 md:px-16 mb-6">
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-white/40 flow-label text-[11px]">
            <li>Dashboard</li>
            <li><ChevronRight className="h-3 w-3" /></li>
            <li>Analysis</li>
            <li><ChevronRight className="h-3 w-3" /></li>
            <li className="text-white font-bold">Tax Readiness</li>
          </ol>
        </nav>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Freelancer Analysis</h2>
      </header>

      {/* Sub-nav tabs */}
      <div className="px-6 md:px-16 mb-10 border-b border-white/10">
        <div className="flex gap-8">
          <Link href="/dashboard/analysis/income-volatility" className="flow-label text-white/40 pb-4 hover:text-white transition-colors">
            Income Volatility
          </Link>
          <Link href="/dashboard/analysis/tax-readiness" className="flow-label text-white border-b-2 border-flow-gold pb-4">
            Tax Readiness
          </Link>
          <Link href="/dashboard/analysis/rate-analysis" className="flow-label text-white/40 pb-4 hover:text-white transition-colors">
            Rate Analysis
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-16">
        {!tax ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No tax data available yet. Connect your accounts to see analysis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Main 8 cols */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Top row: Gauge + Shortfall */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gauge */}
                <section className="border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8">
                  <p className="flow-label text-white/50 mb-6 w-full text-left">Quarterly Readiness</p>
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" fill="none" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                      <circle
                        cx="50" cy="50" fill="none" r="45" stroke="#d4af37" strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (tax.readiness_pct / 100) * circumference}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-3xl text-white font-bold">{tax.readiness_pct}%</span>
                      <span className="flow-label text-[10px] text-white/40">Funded</span>
                    </div>
                  </div>
                  <p className="mt-6 font-body text-sm text-center text-white/50">
                    Your current tax reserve covers {tax.readiness_pct}% of your estimated quarterly liability.
                  </p>
                </section>

                {/* Shortfall */}
                <section className="border border-white/10 bg-white/5 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <p className="flow-label text-white/50">Calculated Shortfall</p>
                    <AlertTriangle className="h-5 w-5 text-rose" />
                  </div>
                  <h3 className="font-mono text-[36px] leading-tight text-white mb-6">{formatCurrency(tax.shortfall)}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="font-body text-sm text-white/50">Self-Employment Tax</span>
                      <span className="font-mono text-base text-white">{formatCurrency(tax.shortfall_breakdown.self_employment_tax)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="font-body text-sm text-white/50">Federal Income Tax</span>
                      <span className="font-mono text-base text-white">{formatCurrency(tax.shortfall_breakdown.federal_income_tax)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-body text-sm text-white/50">State Tax (Est)</span>
                      <span className="font-mono text-base text-white">{formatCurrency(tax.shortfall_breakdown.state_tax)}</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Allocation Ledger */}
              <section className="border border-white/10 bg-white/5">
                <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
                  <h4 className="font-display text-xl text-white">Allocation Ledger</h4>
                  <button className="flex items-center text-flow-gold flow-label group">
                    Export CSV <Download className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30">Date</th>
                        <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30">Source</th>
                        <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30">Gross Income</th>
                        <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30 text-right">Auto-Allocated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {tax.allocation_ledger.map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 md:px-8 py-5 font-mono text-sm text-white/50">{row.date}</td>
                          <td className="px-6 md:px-8 py-5 font-body text-sm text-white font-semibold">{row.source}</td>
                          <td className="px-6 md:px-8 py-5 font-mono text-sm text-white">{formatCurrency(row.gross_income)}</td>
                          <td className="px-6 md:px-8 py-5 font-mono text-sm text-flow-gold font-bold text-right">{formatCurrency(row.auto_allocated)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right 4 cols */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Strategy Notes */}
              <section className="bg-flow-black border border-white/10 p-6 md:p-8">
                <h5 className="font-display text-xl text-flow-gold mb-6">Strategy Notes</h5>
                <div className="space-y-6">
                  <div className="border-l-2 border-flow-gold pl-4 py-2">
                    <p className="flow-label text-white/40 mb-1">{tax.strategy_notes.immediate_action.label}</p>
                    <p className="font-body text-sm text-white">{tax.strategy_notes.immediate_action.message}</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-4 py-2">
                    <p className="flow-label text-white/40 mb-1">{tax.strategy_notes.optimization_tip.label}</p>
                    <p className="font-body text-sm text-white/70">{tax.strategy_notes.optimization_tip.message}</p>
                  </div>
                </div>
              </section>

              {/* Next Deadline */}
              <section className="border border-white/10 bg-white/5 p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="flow-label text-white/50 mb-2">Next Deadline</p>
                  <h6 className="font-display text-xl text-white mb-1">{tax.next_deadline.label}</h6>
                  <p className="font-mono text-lg text-flow-gold font-bold mb-4">{tax.next_deadline.date}</p>
                  <button className="bg-white/5 p-4 border border-white/10 inline-flex items-center hover:bg-white/10 transition-colors">
                    <Calendar className="h-5 w-5 mr-2 text-white" />
                    <span className="flow-label text-white uppercase">Add to Calendar</span>
                  </button>
                </div>
                <span className="absolute -bottom-4 -right-4 text-[100px] text-white/[0.04] rotate-12 font-bold pointer-events-none">Schedule</span>
              </section>

              {/* Vault Balance */}
              <section className="border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="flow-label text-white/50">Current Vault Balance</p>
                    <p className="font-mono text-2xl text-white">{formatCurrency(tax.vault_balance)}</p>
                  </div>
                  <div className="w-12 h-12 bg-flow-gold/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-flow-gold" />
                  </div>
                </div>
                <button className="w-full border border-white/20 text-white flow-label py-4 hover:bg-white hover:text-flow-black transition-all">
                  View Vault Activity
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
