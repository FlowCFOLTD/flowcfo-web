'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Info,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import Image from 'next/image';
import { useSubmitOnboardingStep3 } from '@/hooks/api/use-onboarding';

export default function RestaurantStep3() {
  const router = useRouter();
  const [taxRate, setTaxRate] = useState(25);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitStep3 } = useSubmitOnboardingStep3();

  const GROSS_PROFIT = 124500;
  const taxReserveAmount = GROSS_PROFIT * (taxRate / 100);
  const safeToSpend = GROSS_PROFIT - taxReserveAmount;
  const liquidityPercent = Math.min(60 + taxRate * 0.8, 98);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinishing(true);

    submitStep3(
      { tax_rate: taxRate },
      {
        onSuccess: () => {
          setIsFinishing(false);
          setShowSuccess(true);
          setTimeout(() => router.push('/dashboard'), 2000);
        },
        onError: () => setIsFinishing(false),
      },
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16 relative">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '100%' }}
      />

      {/* Hero Section */}
      <section className="mx-auto mb-16 max-w-4xl text-center md:text-left">
        <span className="flow-label-wide mb-4 block text-flow-gold">
          STEP 03/03
        </span>
        <h1 className="flow-headline-xl text-white mb-8">
          Optimize your operating margins.
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          Configure your automated reserve logic to ensure your restaurant
          remains solvent through market volatility and tax obligations.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-12 items-start">
        {/* Left Column: Configuration & Projections */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          <div className="bg-white/5 border border-white/10 p-10 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="flow-label text-white/40 mb-1 uppercase tracking-widest">
                  STRATEGIC ALLOCATION
                </h2>
                <p className="font-display text-3xl font-bold text-white tracking-tight">
                  Tax & Margin Reserve
                </p>
              </div>
              <div className="flex items-center bg-flow-gold/10 px-6 py-4 border border-flow-gold/30">
                <span className="font-mono text-3xl text-flow-gold">
                  {taxRate}%
                </span>
              </div>
            </div>

            <div className="space-y-8">
              <label className="flow-label text-white/40 block uppercase tracking-widest">
                ADJUST RESERVE PERCENTAGE
              </label>
              <input
                className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-flow-gold"
                max="50"
                min="5"
                type="range"
                value={taxRate}
                onChange={(e) => setTaxRate(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <span>CONSERVATIVE (5%)</span>
                <span>INSTITUTIONAL (50%)</span>
              </div>
            </div>

            {/* Projection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <div>
                <p className="flow-label text-white/40 mb-2 uppercase tracking-widest">
                  GROSS PROFIT (EST.)
                </p>
                <p className="font-mono text-2xl text-white">
                  $
                  {GROSS_PROFIT.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="flow-label text-white/40 mb-2 uppercase tracking-widest">
                  TAX RESERVE (AUTOPILOT)
                </p>
                <p className="font-mono text-2xl text-flow-gold">
                  -$
                  {taxReserveAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-flow-gold p-6 text-flow-black">
                <p className="flow-label text-flow-black/60 mb-2 uppercase tracking-widest font-black">
                  SAFE-TO-SPEND™
                </p>
                <p className="font-mono text-2xl font-black">
                  $
                  {safeToSpend.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Accent */}
          <div className="relative h-64 overflow-hidden rounded-lg group">
            <Image
              fill
              priority
              alt="Luxury Kitchen"
              className="object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000"
              src="https://images.unsplash.com/photo-1550966841-396ad886f1e7?auto=format&fit=crop&q=80&w=1440"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-flow-obsidian/90 to-transparent"></div>
            <div className="absolute bottom-8 left-8 z-10">
              <p className="font-display text-2xl font-bold text-white mb-2">
                Precision in every plate. Accuracy in every dollar.
              </p>
              <p className="font-body text-white/60">
                Automate your treasury management so you can focus on the
                culinary craft.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <BarChart3 className="h-6 w-6 text-flow-gold" />
              <h3 className="font-display text-xl font-bold text-white">
                Safe-to-Spend™ Impact
              </h3>
            </div>

            <div className="space-y-8">
              <div>
                <p className="flow-label text-flow-gold mb-2 uppercase tracking-widest">
                  INGREDIENT INFLATION BUFFER
                </p>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  Your defined reserve acts as a shock absorber when wholesale
                  protein or produce prices spike, preventing immediate menu
                  price pressure.
                </p>
              </div>
              <div>
                <p className="flow-label text-flow-gold mb-2 uppercase tracking-widest">
                  SEASONAL COVERS PROTECTION
                </p>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  During off-peak months, FlowCFO leverages these accrued
                  reserves to maintain payroll stability without tapping into
                  credit lines.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm font-bold text-white">
                    Projected Liquidity Score
                  </span>
                  <span className="font-mono text-sm text-[#4ade80]">
                    Excellent
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10">
                  <div
                    className="h-full bg-flow-gold transition-all duration-1000"
                    style={{ width: `${liquidityPercent}%` }}
                  />
                </div>
              </div>

              <div className="bg-flow-gold/5 border border-flow-gold/20 p-6 italic">
                <p className="font-body text-xs text-white/60 leading-relaxed">
                  &quot;The {taxRate}% reserve strategy is the gold standard for
                  mid-market hospitality groups seeking multi-unit
                  expansion.&quot;
                </p>
                <p className="flow-label text-flow-gold mt-4 uppercase text-[10px] tracking-widest">
                  — FLOWCFO ADVISORY BOARD
                </p>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              className="w-full bg-flow-gold text-flow-black py-6 font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
              onClick={handleFinish}
              disabled={isFinishing || showSuccess}
            >
              {isFinishing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  LAUNCHING...
                </span>
              ) : showSuccess ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  SYSTEM READY
                </span>
              ) : (
                'FINISH SETUP & LAUNCH'
              )}
            </button>
            <button
              className="w-full border border-white/10 text-white/40 py-6 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
              type="button"
              onClick={() => router.push('/onboarding/restaurant/step-2')}
            >
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
