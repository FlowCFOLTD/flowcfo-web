'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  BarChart3,
  ShieldCheck,
  Info,
  ArrowLeft,
  Globe,
  Loader2,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useSubmitOnboardingStep3 } from '@/hooks/api/use-onboarding';

export default function StartupStep3() {
  const router = useRouter();
  const [taxRate, setTaxRate] = useState(25);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: submitStep3, isPending: isFinishing } = useSubmitOnboardingStep3();

  const baseMonthlyBurn = 42500;
  const estimatedReserve = baseMonthlyBurn * (taxRate / 100);
  const runwayMonths = 14.2;
  const runwayImpact = (taxRate / 25) * 0.8; // Simulating impact logic

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    submitStep3({ tax_rate: taxRate }, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    });
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
          Configure your tax safety net.
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          High-growth startups often overlook tax liabilities until Series B. We
          recommend a strategic reserve to cover future obligations and maximize
          R&D credit capture.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-12 items-start">
        {/* Left Side: Summary Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 space-y-10">
            <h3 className="flow-label text-white border-b border-white/10 pb-4">
              FINANCIAL PROJECTIONS
            </h3>
            <div className="space-y-8">
              <div>
                <p className="flow-label text-white/40 mb-1">MONTHLY BURN</p>
                <p className="font-mono text-2xl text-white">
                  $
                  {baseMonthlyBurn.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="flow-label text-white/40 mb-1">
                  ESTIMATED TAX RESERVE
                </p>
                <p className="font-mono text-2xl text-flow-gold">
                  $
                  {estimatedReserve.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="flow-label text-white/40 mb-1">
                  SAFE-TO-SPEND RUNWAY
                </p>
                <div className="flex items-center gap-3">
                  <p className="font-mono text-2xl text-white">
                    {runwayMonths} Months
                  </p>
                  <span className="bg-flow-gold/10 text-flow-gold px-2 py-0.5 rounded-full text-[10px] font-bold">
                    +{runwayImpact.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="relative h-48 bg-flow-obsidian border border-white/10 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-flow-gold/30 flex items-center justify-center bg-flow-gold/5 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="h-6 w-6 text-flow-gold" />
              </div>
              <span className="text-flow-gold font-bold uppercase tracking-[0.3em] text-[10px]">
                VERIFIED BY FLOWCFO AI
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Input Form */}
        <div className="col-span-12 lg:col-span-5 space-y-12">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="bg-white/5 border border-white/10 p-10">
            <form onSubmit={handleFinish} className="space-y-12">
              <div className="space-y-6">
                <label className="flow-label text-white/40 block">
                  CURRENT REGION
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-white/[0.02] border-b border-white/20 py-4 px-4 font-body text-white/40 cursor-not-allowed outline-none"
                    disabled
                    type="text"
                    value="United States (Federal & State)"
                  />
                  <Globe className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <label className="flow-label text-white/40 block">
                    TAX RESERVE RATE (%)
                  </label>
                  <span className="font-mono text-2xl text-flow-gold">
                    {taxRate}%
                  </span>
                </div>
                <input
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-flow-gold"
                  max="50"
                  min="0"
                  type="range"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  <span>CONSERVATIVE (0%)</span>
                  <span>AGGRESSIVE (50%)</span>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <button
                  className="flex-1 bg-flow-gold text-flow-black py-6 px-8 font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
                  type="submit"
                  disabled={isFinishing || showSuccess}
                >
                  {isFinishing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      PROVISIONING...
                    </span>
                  ) : showSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      SYSTEM READY
                    </span>
                  ) : (
                    'FINISH SETUP'
                  )}
                </button>
                <button
                  className="flex-1 border border-white/10 text-white py-6 px-8 font-bold uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
                  type="button"
                  onClick={() => router.push('/onboarding/startup/step-2')}
                >
                  BACK
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-start gap-4 p-8 bg-flow-gold/5 border-l-4 border-flow-gold">
            <Info className="h-6 w-6 shrink-0 text-flow-gold" />
            <p className="font-body text-sm italic leading-relaxed text-white/60">
              &quot;These figures are baseline estimates. Your dedicated advisor
              will review these settings during our strategy call to ensure
              you&apos;re maximizing R&D tax credits immediately.&quot;
            </p>
          </div>
        </div>

        {/* Right Side: Impact Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-flow-obsidian border border-white/10 p-8 space-y-10">
            <div className="space-y-3">
              <h4 className="font-display text-xl font-bold text-flow-gold">
                Safe-to-Spend™ Impact
              </h4>
              <p className="font-body text-sm text-white/50 leading-relaxed">
                Adjusting your tax reserve directly influences your real-time
                liquidity score.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-5">
                <Shield className="h-6 w-6 text-flow-gold shrink-0" />
                <div>
                  <p className="flow-label text-flow-gold mb-1">
                    RISK MITIGATION
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Automated set-asides prevent year-end cash crunches during
                    audit windows.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <TrendingUp className="h-6 w-6 text-flow-gold shrink-0" />
                <div>
                  <p className="flow-label text-flow-gold mb-1">
                    R&D ADVANTAGE
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Our engine cross-references your reserve with eligible
                    credits daily.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <BarChart3 className="h-6 w-6 text-flow-gold shrink-0" />
                <div>
                  <p className="flow-label text-flow-gold mb-1">
                    INVESTOR READY
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Maintains a &quot;Clean Ledger&quot; status, a prerequisite
                    for Series B/C due diligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {isFinishing && (
        <div className="fixed inset-0 z-[100] bg-flow-obsidian/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6">
          <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
            <Loader2 className="h-16 w-16 text-flow-gold animate-spin mx-auto" />
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-white tracking-tight">
                OPTIMIZING FINANCIAL MODELS
              </h2>
              <p className="font-body text-white/60">
                Connecting SVB data streams with your R&D credit capture
                engine...
              </p>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-flow-obsidian flex flex-col items-center justify-center text-center p-6">
          <div className="max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="h-24 w-24 rounded-full bg-flow-gold flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              <CheckCircle2 className="h-12 w-12 text-flow-black" />
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold text-white tracking-tight">
                SYSTEMS ONLINE
              </h2>
              <p className="font-body text-xl text-white/60">
                Your startup dashboard is now calibrated for high-growth
                trajectory.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
