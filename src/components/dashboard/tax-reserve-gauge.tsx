'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface TaxReserveGaugeProps {
  percentage: number;
  shortfall: number;
}

export default function TaxReserveGauge({ percentage, shortfall }: TaxReserveGaugeProps) {
  const [showModal, setShowModal] = useState(false);
  const [allocating, setAllocating] = useState(false);
  const [done, setDone] = useState(false);

  const circumference = 2 * Math.PI * 88;
  const pct = percentage ?? 0;
  const offset = circumference - (pct / 100) * circumference;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);

  const handleAllocate = async () => {
    setAllocating(true);
    try {
      await apiClient('/api/v1/tax/allocate', {
        method: 'POST',
        body: { amount: shortfall },
      });
      setDone(true);
      setTimeout(() => {
        setShowModal(false);
        setDone(false);
        window.location.reload();
      }, 1500);
    } catch {
      setAllocating(false);
    }
  };

  return (
    <>
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
          onClick={() => setShowModal(true)}
          className="mt-6 md:mt-8 w-full border border-white/20 py-3 flow-label text-xs font-bold hover:bg-white hover:text-flow-black transition-all tracking-[0.1em] text-white"
        >
          ALLOCATE NOW
        </button>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-flow-black border border-white/10 p-8 w-full max-w-sm mx-4">
            {done ? (
              <div className="text-center py-8">
                <p className="font-mono text-flow-gold text-xl font-bold">ALLOCATED</p>
                <p className="font-body text-white/50 text-sm mt-2">{formatCurrency(shortfall)} reserved for taxes.</p>
              </div>
            ) : (
              <>
                <h3 className="flow-label text-white tracking-[0.15em] mb-4">ALLOCATE TAX RESERVE</h3>
                <p className="font-body text-sm text-white/50 mb-6">
                  Reserve {formatCurrency(shortfall)} for estimated taxes due. This will be recorded as a tax savings transaction.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-white/20 py-3 text-xs font-bold text-white/60 hover:text-white transition-colors"
                    disabled={allocating}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleAllocate}
                    className="flex-1 bg-flow-gold text-flow-black py-3 text-xs font-bold hover:brightness-110 transition-all"
                    disabled={allocating}
                  >
                    {allocating ? 'ALLOCATING...' : `ALLOCATE ${formatCurrency(shortfall)}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
