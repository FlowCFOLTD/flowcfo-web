'use client';

import { MoreHorizontal, Verified } from 'lucide-react';

interface SafeToSpendBreakdown {
  available: number;
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

export default function SafeToSpendCard({ amount, confidence, breakdown }: SafeToSpendCardProps) {
  const items = [
    { label: 'Available', value: breakdown.available, color: 'text-white' },
    { label: 'Tax Reserve', value: breakdown.tax_reserve, color: 'text-flow-gold' },
    { label: 'Fixed Bills', value: breakdown.fixed_bills, color: 'text-white/70' },
    { label: 'Buffer', value: breakdown.buffer, color: 'text-white/70' },
  ];

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
          <button className="text-white/50 hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item) => (
            <div key={item.label} className="border-l border-white/10 pl-4">
              <p className="flow-label text-[10px] text-white/40 mb-2">{item.label}</p>
              <p className={`font-mono text-lg ${item.color}`}>
                {formatCurrency(item.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
