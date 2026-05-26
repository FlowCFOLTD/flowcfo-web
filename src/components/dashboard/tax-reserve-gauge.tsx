'use client';

import { useRouter } from 'next/navigation';

interface TaxReserveGaugeProps {
  percentage: number;
  shortfall: number;
}

export default function TaxReserveGauge({ percentage, shortfall }: TaxReserveGaugeProps) {
  const router = useRouter();
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (percentage / 100) * circumference;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);

  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8 text-center">
      <h3 className="flow-label tracking-[0.15em] text-white/50 mb-8 uppercase">Tax Reserve Status</h3>

      <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            className="text-white/10"
            cx="100" cy="100" fill="transparent" r="88"
            stroke="currentColor" strokeWidth="4"
          />
          <circle
            className="text-flow-gold"
            cx="100" cy="100" fill="transparent" r="88"
            stroke="currentColor" strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl md:text-4xl text-white font-bold">{percentage}%</span>
          <span className="flow-label text-[10px] text-white/40 tracking-widest mt-1">FUNDED</span>
        </div>
      </div>

      <p className="mt-6 md:mt-8 font-body text-sm text-white/50 leading-relaxed px-2">
        You need <strong className="text-white font-bold">{formatCurrency(shortfall)}</strong> more to reach full Q4 coverage.
      </p>

      <button
        onClick={() => router.push('/dashboard/tax')}
        className="mt-6 md:mt-8 w-full border border-white/20 py-3 flow-label text-xs font-bold hover:bg-white hover:text-flow-black transition-all tracking-[0.1em] text-white"
      >
        ALLOCATE NOW
      </button>
    </section>
  );
}
