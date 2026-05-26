'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  ArrowRight,
  Loader2,
} from 'lucide-react';

import BankConnectionCard from '@/components/onboarding/bank-connection-card';
import { useSubmitOnboardingStep2 } from '@/hooks/api/use-onboarding';

export default function FreelancerStep2() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { mutate: submitStep2, isPending } = useSubmitOnboardingStep2();

  const goToStep3 = () => {
    submitStep2(undefined, {
      onSuccess: () => router.push('/onboarding/freelancer/step-3'),
      onError: (err) =>
        setError(
          err instanceof Error ? err.message : 'Failed to save progress',
        ),
    });
  };

  const handlePlaidConnect = () => goToStep3();

  const handleTellerConnect = () => {};

  const handleCsvUploadSuccess = (
    accountId: string,
    transactionCount: number,
  ) => {
    setError(null);
    setSuccessMsg(
      `${transactionCount} transactions imported successfully from CSV. You can connect more accounts or continue to the next step.`,
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const obsidianCard = document.getElementById('obsidian-bank-card');
      if (obsidianCard) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        obsidianCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '66.66%' }}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Content & Instructions */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <span className="flow-label text-flow-gold uppercase tracking-[0.2em]">
              PHASE 02/03
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-6xl leading-tight">
              Sync your professional accounts.
            </h1>
            <p className="font-body text-xl leading-relaxed text-white/60">
              FlowCFO analyzes your transaction history to build your{' '}
              <span className="font-bold text-white">Safe-to-Spend™</span>{' '}
              baseline, ensuring your freelance business operates with
              institutional precision.
            </p>
          </div>

          <div className="space-y-10 pt-4">
            <div className="flex items-start gap-5 group">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Institutional Security
                </h3>
                <p className="font-body text-base text-white/40 leading-relaxed">
                  Used by the world&apos;s largest banks. We never see or store
                  your credentials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  AES-256 Encryption
                </h3>
                <p className="font-body text-base text-white/40 leading-relaxed">
                  Your financial data is protected by bank-grade encryption at
                  rest and in transit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Bank Sync Card */}
        <div className="lg:col-span-7 perspective-1000">
          <div id="obsidian-bank-card">
            <BankConnectionCard
              onPlaidConnect={handlePlaidConnect}
              onTellerConnect={handleTellerConnect}
              onCsvUploadSuccess={handleCsvUploadSuccess}
            />
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mx-auto mt-8 max-w-[1200px] bg-flow-gold/10 border border-flow-gold/30 p-4 text-flow-gold text-sm">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mx-auto mt-8 max-w-[1200px] bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Action Bar */}
      <div className="mx-auto mt-16 flex w-full max-w-[1200px] items-center justify-between border-t border-white/10 pt-10">
        <button
          onClick={() => router.push('/onboarding/freelancer/step-1')}
          className="flex items-center gap-3 px-8 py-4 flow-label text-white/40 transition-all hover:text-white group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          BACK TO BUSINESS OPTIONS
        </button>

        <div className="flex flex-col items-end gap-3">
          <button
            onClick={goToStep3}
            disabled={isPending}
            className="flex items-center gap-3 bg-flow-gold px-10 py-5 flow-label text-flow-black font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                CONTINUE TO FINAL STEP
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          <button
            onClick={goToStep3}
            disabled={isPending}
            className="flow-label text-white/30 transition-all hover:text-white/60"
          >
            Skip for now — I&apos;ll connect my accounts later
          </button>
        </div>
      </div>
    </div>
  );
}
