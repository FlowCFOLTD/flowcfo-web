'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Landmark,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';

import BankConnectionCard from '@/components/onboarding/bank-connection-card';
import { useSubmitOnboardingStep2 } from '@/hooks/api/use-onboarding';

export default function EcommerceStep2() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { mutate: submitStep2, isPending } = useSubmitOnboardingStep2();

  const goToStep3 = () => {
    submitStep2(undefined, {
      onSuccess: () => router.push('/onboarding/ecommerce/step-3'),
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
      {/* Progress Bar (Managed by Layout, but showing state here) */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '66.66%' }}
      />

      {/* Hero Section */}
      <section className="mx-auto mb-16 max-w-4xl text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl mb-8">
          Let&apos;s sync your store&apos;s heartbeat
        </h1>
        <p className="mx-auto max-w-3xl font-body text-xl leading-relaxed text-white/60">
          FlowCFO needs to see your cash flow to track your real margins and
          calculate your{' '}
          <span className="text-flow-gold font-bold">Safe-to-Spend™</span> in
          real-time.
        </p>
      </section>

      {/* Onboarding Bento Grid Layout */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-12">
        {/* Left Panel: Bank Sync UI */}
        <div className="flex flex-col justify-between border border-white/10 bg-white/5 p-10 md:col-span-7 md:p-16 relative overflow-hidden group">
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-flow-gold"></div>

          <div>
            <div className="mb-12 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center bg-flow-gold/10 rounded-full">
                <Landmark className="h-8 w-8 text-flow-gold" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white">
                Capital Connection
              </h2>
            </div>

            <p className="mb-12 max-w-md font-body text-lg leading-relaxed text-white/60">
              Establish a secure, read-only link to your operating accounts. We
              track the movement, you keep the keys.
            </p>

            <div id="obsidian-bank-card" className="perspective-1000">
              <BankConnectionCard
                onPlaidConnect={handlePlaidConnect}
                onTellerConnect={handleTellerConnect}
                onCsvUploadSuccess={handleCsvUploadSuccess}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Security & Context */}
        <div className="flex flex-col gap-8 md:col-span-5">
          {/* Security Card */}
          <div className="border border-white/10 bg-white/5 p-10">
            <h3 className="flow-label mb-10 block text-flow-gold tracking-[0.2em]">
              FOUNDER-FIRST SECURITY
            </h3>
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-2 font-display text-xl font-bold text-white">
                    AES-256 Encryption
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/50">
                    Your data is protected by bank-grade encryption at rest and
                    in transit.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-2 font-display text-xl font-bold text-white">
                    Plaid Certified
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/50">
                    Official financial partner. We never see or store your login
                    passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Preview Card */}
          <div className="flex min-h-[280px] flex-col justify-between bg-flow-gold p-10 text-flow-black">
            <div className="flex justify-between items-start">
              <span className="flow-label font-black tracking-[0.2em]">
                LIVE MARGIN TRACKING
              </span>
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-2 font-mono text-sm font-bold opacity-60 uppercase tracking-widest">
                Estimated Real-time Margin
              </div>
              <div className="font-display text-5xl font-black">34.2%</div>
            </div>
            <div className="font-body text-sm font-medium italic opacity-70">
              * Based on Shopify and Chase transaction sync.
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Row */}
      <div className="mt-24 w-full text-center">
        <span className="flow-label mb-12 block text-white/20 tracking-[0.3em]">
          TRUSTED BY FOUNDERS AT
        </span>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale transition-all hover:opacity-60 hover:grayscale-0">
          <div className="font-display text-3xl font-black tracking-tighter text-white">
            CHASE
          </div>
          <div className="font-serif text-4xl font-bold italic text-white">
            AMEX
          </div>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-white" />
            <span className="font-display text-3xl font-bold text-white">
              Shopify
            </span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mx-auto mt-8 max-w-6xl bg-flow-gold/10 border border-flow-gold/30 p-4 text-flow-gold text-sm">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mx-auto mt-8 max-w-6xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Footer Actions */}
      <div className="mx-auto mt-24 flex w-full max-w-6xl gap-6">
        <button
          onClick={() => router.push('/onboarding/ecommerce/step-1')}
          className="flex items-center justify-center border border-white/10 px-10 py-6 flow-label text-white/40 transition-all hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-3" />
          BACK
        </button>
        <div className="flex flex-1 flex-col items-center gap-3">
          <button
            onClick={goToStep3}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-3 bg-flow-gold py-6 font-bold uppercase tracking-[0.2em] text-flow-black transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
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

      {/* Institutional Footer (Minimal) */}
      <footer className="mt-32 border-t border-white/5 py-16 text-center md:text-left">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
          <span className="font-display text-2xl font-bold tracking-tighter text-flow-gold">
            FlowCFO
          </span>
          <div className="flex gap-12 font-body text-sm text-white/30">
            <Link
              href="/privacy"
              className="hover:text-flow-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-flow-gold transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-flow-gold transition-colors"
            >
              Contact Advisor
            </Link>
          </div>
          <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
            © 2026 ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </div>
  );
}
