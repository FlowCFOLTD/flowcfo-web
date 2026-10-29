'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Landmark,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Zap,
  Lock,
  ExternalLink,
  Loader2,
} from 'lucide-react';

import BankConnectionCard from '@/components/onboarding/bank-connection-card';
import {
  useVerifyBankSync,
  useSubmitOnboardingStep2,
} from '@/hooks/api/use-onboarding';

export default function StartupStep2() {
  const router = useRouter();
  const [hasAccounts, setHasAccounts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { mutate: verifyBankSync, isPending: isVerifying } =
    useVerifyBankSync();
  const { mutate: submitStep2, isPending: isSubmitting } =
    useSubmitOnboardingStep2();

  const handlePlaidConnect = async () => {
    // Logic for Plaid connection
    setHasAccounts(true);
  };

  const handleTellerConnect = async () => {
    // Logic for Teller connection
    setHasAccounts(true);
  };

  const handleCsvUploadSuccess = (accountId: string, transactionCount: number) => {
    setError(null);
    setSuccessMsg(`${transactionCount} transactions imported successfully from CSV.`);
    setHasAccounts(true);
  };

  const handleCompleteStep2 = () => {
    setError(null);

    verifyBankSync(undefined, {
      onSuccess: () => {
        submitStep2(undefined, {
          onSuccess: () => {
            router.push('/onboarding/startup/step-3');
          },
          onError: (err) => {
            setError(
              err instanceof Error
                ? err.message
                : 'Failed to complete onboarding step 2',
            );
          },
        });
      },
      onError: (err: unknown) => {
        const apiError = err as {
          data?: { error?: { code?: string } };
          message?: string;
        };
        if (apiError.data?.error?.code === 'NO_ACCOUNTS') {
          setError(
            'Please connect at least one bank account before proceeding.',
          );
        } else {
          setError(apiError.message || 'Failed to verify bank sync');
        }
      },
    });
  };

  const handleSkipStep2 = () => {
    setError(null);

    submitStep2(undefined, {
      onSuccess: () => {
        router.push('/onboarding/startup/step-3');
      },
      onError: (err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to save progress',
        );
      },
    });
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

      {/* Hero Section */}
      <section className="mx-auto mb-16 max-w-4xl text-center md:text-left">
        <span className="flow-label-wide mb-4 block text-flow-gold">
          STEP 02/03
        </span>
        <h1 className="flow-headline-xl text-white mb-8">
          Secure your runway intelligence.
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          Sync your primary capital accounts to initiate automated burn rate
          monitoring and liquidity forecasting.
        </p>
      </section>

      {/* Main Grid Layout */}
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

            {successMsg && (
              <div className="mb-6 bg-flow-gold/10 border border-flow-gold/30 p-4 text-flow-gold text-sm">
                {successMsg}
              </div>
            )}
            {error && (
              <div className="mb-8 bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

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

        {/* Right Panel: Security & Insight */}
        <div className="flex flex-col gap-8 md:col-span-5">
          {/* Security Card */}
          <div className="border border-white/10 bg-white/5 p-10">
            <h3 className="flow-label mb-10 block text-flow-gold tracking-[0.2em]">
              INSTITUTIONAL GRADE
            </h3>
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-2 font-display text-xl font-bold text-white">
                    Encrypted Connections
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/50">
                    Data is protected in transit; provider tokens are encrypted
                    by the application and deployment storage controls are documented.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-flow-gold/10 rounded-full text-flow-gold">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-2 font-display text-xl font-bold text-white">
                    Read-Only Access
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/50">
                    FlowCFO can only view transactions. We cannot initiate
                    transfers or move funds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Preview Card */}
          <div className="flex min-h-[280px] flex-col justify-between bg-flow-gold p-10 text-flow-black">
            <div className="flex justify-between items-start">
              <span className="flow-label font-black tracking-[0.2em]">
                RUNWAY VELOCITY
              </span>
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-2 font-mono text-sm font-bold opacity-60 uppercase tracking-widest">
                Real-time Burn Sync
              </div>
              <div className="font-display text-5xl font-black">ACTIVE</div>
            </div>
            <p className="font-body text-sm font-medium italic opacity-80">
              &quot;We&apos;ve built native pipelines for startup-first banks
              like Mercury and SVB to ensure your burn data is reflected in
              real-time, not in 30 days.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mx-auto mt-24 flex w-full max-w-6xl flex-col md:flex-row gap-6">
        <button
          onClick={() => router.push('/onboarding/startup/step-1')}
          className="flex items-center justify-center border border-white/10 px-10 py-6 flow-label text-white/40 transition-all hover:border-white/30 hover:text-white group"
        >
          <ArrowLeft className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1" />
          BACK
        </button>
        <div className="flex flex-1 flex-col items-center gap-3">
          <button
            onClick={handleCompleteStep2}
            disabled={isVerifying || isSubmitting}
            className="flex w-full items-center justify-center gap-3 bg-flow-gold py-6 font-bold uppercase tracking-[0.2em] text-flow-black transition-all hover:brightness-110 active:scale-[0.98] group disabled:opacity-50 min-w-[300px]"
          >
            {isVerifying || isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                CONTINUE TO FINAL STEP
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
          <button
            onClick={handleSkipStep2}
            disabled={isSubmitting}
            className="flow-label text-white/30 transition-all hover:text-white/60"
          >
            Skip for now — I'll connect my accounts later
          </button>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="mt-12 pb-24 text-center">
        <p className="flex items-center justify-center gap-2 font-body text-sm text-white/30">
          <ShieldCheck className="h-4 w-4" />
          Financial connections use encrypted transport and scoped, read-only access.
        </p>
      </div>
    </div>
  );
}
