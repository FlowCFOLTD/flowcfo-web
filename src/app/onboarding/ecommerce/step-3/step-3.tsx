'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Landmark, Info, ArrowLeft, Check, Globe } from 'lucide-react';
import { useSubmitOnboardingStep3 } from '@/hooks/api/use-onboarding';

export default function EcommerceStep3() {
  const router = useRouter();
  const [taxRate, setTaxRate] = useState(25);
  const [region, setRegion] = useState('United States');
  const [isFinishing, setIsFinishing] = useState(false);

  const { mutate: submitStep3 } = useSubmitOnboardingStep3();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinishing(true);

    submitStep3(
      { tax_rate: taxRate },
      {
        onSuccess: () => router.push('/dashboard'),
        onError: () => setIsFinishing(false),
      },
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '100%' }}
      />

      <main className="grid grid-cols-12 gap-12 items-center min-h-[calc(100vh-160px)]">
        {/* Illustration/Status Panel (Left) */}
        <div className="col-span-12 lg:col-span-5 hidden lg:flex flex-col gap-12">
          <div className="relative aspect-square bg-white/[0.02] border border-white/10 p-12 overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#D4AF37 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <Landmark className="h-12 w-12 text-flow-gold" />
                <h2 className="font-display text-4xl font-bold text-white">
                  Safe-to-Spend™ Precision
                </h2>
                <p className="font-body text-lg leading-relaxed text-white/60">
                  By isolating tax liabilities in real-time, FlowCFO ensures
                  your working capital is never compromised by unforeseen IRS
                  obligations.
                </p>
              </div>

              <div className="bg-flow-black border border-white/10 p-8 space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="flow-label text-white/40">GROSS PROFIT</span>
                  <span className="font-mono text-xl text-white">
                    $142,500.00
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="flow-label text-white/40">
                    TAX RESERVE ({taxRate}%)
                  </span>
                  <span className="font-mono text-xl text-flow-gold">
                    -$
                    {(
                      (142500 * taxRate) /
                      100
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="flow-label text-white font-bold tracking-widest">
                    SAFE-TO-SPEND™
                  </span>
                  <span className="font-mono text-2xl text-white font-black">
                    $
                    {(
                      142500 *
                      (1 - taxRate / 100)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Form (Right) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-12 max-w-2xl lg:ml-auto">
          <section className="space-y-6">
            <span className="flow-label text-flow-gold uppercase tracking-[0.2em]">
              STEP 03 — FINAL CONFIGURATION
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl">
              Configure your tax safety net.
            </h1>
            <p className="font-body text-xl leading-relaxed text-white/60">
              For E-commerce sellers, we recommend setting aside{' '}
              <span className="text-white font-bold">
                {taxRate}% of net profit
              </span>{' '}
              for quarterly obligations. This amount is automatically diverted
              from your projected cash flow.
            </p>
          </section>

          <form onSubmit={handleFinish} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Tax Rate Input */}
              <div className="space-y-4">
                <label
                  className="flow-label text-white/40 block tracking-widest"
                  htmlFor="tax-rate"
                >
                  TAX RATE (%)
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 font-mono text-3xl text-white focus:outline-none focus:border-flow-gold transition-colors duration-300"
                    id="tax-rate"
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                  />
                  <div className="absolute right-0 bottom-4 text-white/20 font-mono text-2xl">
                    %
                  </div>
                </div>
              </div>

              {/* Region Input */}
              <div className="space-y-4">
                <label
                  className="flow-label text-white/40 block tracking-widest"
                  htmlFor="region"
                >
                  CURRENT REGION
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 font-mono text-2xl text-white focus:outline-none focus:border-flow-gold transition-colors duration-300"
                    id="region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                  <Globe className="absolute right-0 bottom-4 h-6 w-6 text-white/20" />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-flow-gold/5 border-l-4 border-flow-gold p-8 flex gap-6">
              <Info className="h-6 w-6 shrink-0 text-flow-gold" />
              <div className="space-y-2">
                <p className="flow-label text-flow-gold uppercase font-black tracking-widest">
                  Safe-to-Spend™ Impact
                </p>
                <p className="font-body text-base leading-relaxed text-white/70">
                  Increasing your tax rate will decrease your Safe-to-Spend™
                  number but provides a larger safety margin for unexpected tax
                  liabilities.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                className="flex-1 bg-flow-gold text-flow-black font-bold uppercase tracking-[0.2em] py-6 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
                type="submit"
                disabled={isFinishing}
              >
                {isFinishing ? 'Provisioning...' : 'Finish Setup'}
              </button>
              <button
                className="sm:w-1/3 border border-white/10 text-white font-bold uppercase tracking-[0.2em] py-6 hover:bg-white/5 transition-all"
                type="button"
                onClick={() => router.push('/onboarding/ecommerce/step-2')}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal Overlay */}
      {isFinishing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-flow-obsidian/95 backdrop-blur-xl" />
          <div className="relative border border-flow-gold/50 bg-white/5 max-w-xl w-full p-16 text-center">
            <div className="w-24 h-24 bg-flow-gold rounded-full mx-auto flex items-center justify-center mb-10">
              <Check className="h-12 w-12 text-flow-black stroke-[3px]" />
            </div>
            <h2 className="font-display text-4xl font-extrabold text-white mb-6">
              Welcome to FlowCFO
            </h2>
            <p className="font-body text-xl text-white/60 mb-12 leading-relaxed">
              Your institutional dashboard is being provisioned. We are
              currently mapping your fiscal taxonomy for high-accuracy
              forecasting.
            </p>
            <div className="space-y-6">
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-flow-gold w-full animate-onboarding-progress origin-left" />
              </div>
              <span className="flow-label text-flow-gold animate-pulse tracking-[0.3em]">
                OPTIMIZING FINANCIAL MODELS...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-32 border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row">
          <span className="font-body text-sm text-white/30">
            © 2026 FlowCFO. Secure Enterprise Environment.
          </span>
          <div className="flex gap-12">
            <Link
              href="/privacy"
              className="flow-label text-white/40 hover:text-flow-gold transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="flow-label text-white/40 hover:text-flow-gold transition-colors"
            >
              Compliance
            </Link>
            <Link
              href="/security"
              className="flow-label text-white/40 hover:text-flow-gold transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
