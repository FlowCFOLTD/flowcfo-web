'use client';

import { useState } from 'react';
import { Info, Verified } from 'lucide-react';

interface SafeToSpendBreakdown {
  net_income: number;
  tax_reserve: number;
  fixed_bills: number;
  buffer: number;
}

interface SafeToSpendCardProps {
  amount: number;
  confidence: string;
  breakdown: SafeToSpendBreakdown;
}

function formatCurrency(val: number): string {
  const abs = Math.abs(val ?? 0);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(abs);
  return val < 0 ? `-${formatted}` : formatted;
}

const breakdownExplanations: Record<string, string> = {
  'Net Income': 'Total income minus total expenses over your entire transaction history. This is your all-time profit, not your current bank balance.',
  'Tax Reserve': 'Estimated taxes owed based on your income and tax rate. Automatically deducted from safe-to-spend.',
  'Fixed Bills': 'Projected recurring expenses for the next 14 days, averaged from your last 90 days of data.',
  'Buffer': 'A 2-week safety cushion based on your average daily spending. Protects against unexpected costs.',
};

export default function SafeToSpendCard({ amount, confidence, breakdown }: SafeToSpendCardProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const items = [
    { label: 'Net Income', value: breakdown.net_income, color: 'text-white' },
    { label: 'Tax Reserve', value: breakdown.tax_reserve, color: 'text-flow-gold' },
    { label: 'Fixed Bills', value: breakdown.fixed_bills, color: 'text-white/70' },
    { label: 'Buffer', value: breakdown.buffer, color: 'text-white/70' },
  ];

  const totalDeductions = Math.abs(breakdown.tax_reserve) + Math.abs(breakdown.fixed_bills) + Math.abs(breakdown.buffer);

  return (
    <section className="obsidian-card p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-flow-gold/5 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="flow-label text-flow-gold tracking-[0.2em] mb-4">
              SAFE-TO-SPEND™ DEEP DIVE
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-mono text-[40px] md:text-[48px] text-white tracking-tight font-bold">
                {formatCurrency(amount)}
              </span>
              <span className="bg-flow-gold/10 text-flow-gold border border-flow-gold/30 px-3 py-1 text-[10px] font-bold tracking-tight flex items-center gap-1">
                <Verified className="h-3.5 w-3.5" />
                {confidence === 'high' ? 'HIGH CONFIDENCE' : 'ESTIMATE'}
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              className="text-white/50 hover:text-flow-gold transition-colors"
              onClick={() => setTooltip(tooltip === 'main' ? null : 'main')}
              onMouseEnter={() => setTooltip('main')}
              onMouseLeave={() => setTooltip(null)}
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltip === 'main' && (
              <div className="absolute right-0 top-8 w-72 bg-flow-black border border-white/10 p-4 z-20 shadow-xl">
                <p className="font-body text-xs text-white/70 leading-relaxed">
                  Safe-to-spend is your net income minus reserves for taxes, upcoming bills, and a safety buffer.
                  <br /><br />
                  <strong className="text-white">Net Income: </strong>
                  {formatCurrency(breakdown.net_income)} total income minus expenses over your entire history (not your bank balance).
                  <br />
                  <strong className="text-white">Deductions: </strong>
                  {formatCurrency(totalDeductions)} set aside for taxes, bills, and buffer.
                  <br />
                  <strong className="text-white">Result: </strong>
                  You can safely spend up to {formatCurrency(amount)} right now.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item) => (
            <div key={item.label} className="border-l border-white/10 pl-4 relative">
              <div className="flex items-center gap-1.5 mb-2">
                <p className="flow-label text-[10px] text-white/40">{item.label}</p>
                <button
                  className="text-white/20 hover:text-flow-gold transition-colors"
                  onClick={() => setTooltip(tooltip === item.label ? null : item.label)}
                  onMouseEnter={() => setTooltip(item.label)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <Info className="h-3 w-3" />
                </button>
              </div>
              <p className={`font-mono text-lg ${item.color}`}>
                {formatCurrency(item.value)}
              </p>
              {tooltip === item.label && (
                <div className="absolute left-0 bottom-full mb-2 w-56 bg-flow-black border border-white/10 p-3 z-20 shadow-xl">
                  <p className="font-body text-[10px] text-white/60 leading-relaxed">
                    {breakdownExplanations[item.label]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
