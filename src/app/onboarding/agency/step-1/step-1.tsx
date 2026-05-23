'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useUser } from '@/hooks/api/use-user';
import { useSubmitOnboardingStep1 } from '@/hooks/api/use-onboarding';

const billingTerms = [
  { id: 'net-15', label: 'Net 15', sub: 'Aggressive' },
  { id: 'net-30', label: 'Net 30', sub: 'Standard' },
  { id: 'net-60', label: 'Net 60', sub: 'Extended' },
];

export default function AgencyStep1() {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutate: submitStep1, isPending: isSubmitting } =
    useSubmitOnboardingStep1();

  const [businessName, setBusinessName] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [headcount, setHeadcount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('net-30');
  const [error, setError] = useState<string | null>(null);

  const displayBusinessName =
    businessName !== null ? businessName : user?.business_name || '';
  const displayFullName = fullName !== null ? fullName : user?.full_name || '';

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    submitStep1(
      {
        business_type: 'agency',
        business_name: displayBusinessName,
        full_name: displayFullName,
        tax_rate: 25.0,
        currency: 'USD',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        headcount: parseInt(headcount),
        billing_terms: selectedTerm,
      },
      {
        onSuccess: () => {
          router.push('/onboarding/agency/step-2');
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : 'An error occurred');
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '33.33%' }}
      />

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Content Anchor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <span className="flow-label text-flow-gold uppercase tracking-[0.2em]">
              Strategy Phase
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-6xl leading-tight">
              Optimizing your agency&apos;s cash cycle.
            </h1>
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            To accurately model your liquidity runway, we need to understand the
            scale of your operations and the rhythm of your receivables.
          </p>
          <div className="pt-4 flex items-center gap-4 text-flow-gold/80">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-body text-sm italic">
              Institutional grade encryption active
            </span>
          </div>
        </div>

        {/* Right Side: Input Card */}
        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-12 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
          <form onSubmit={handleContinue} className="space-y-12">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Name Input */}
              <div className="space-y-4">
                <label
                  className="block flow-label text-white uppercase tracking-widest"
                  htmlFor="business-name"
                >
                  Business Name
                </label>
                <input
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                  id="business-name"
                  placeholder="e.g. Creative Co."
                  required
                  value={displayBusinessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              {/* Full Name Input */}
              <div className="space-y-4">
                <label
                  className="block flow-label text-white uppercase tracking-widest"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                  id="full-name"
                  placeholder="Jane Doe"
                  required
                  value={displayFullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* Headcount Input */}
            <div className="space-y-6">
              <label
                className="block flow-label text-white uppercase tracking-widest"
                htmlFor="headcount"
              >
                Total Headcount
              </label>
              <div className="relative group">
                <input
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 font-mono text-3xl text-white outline-none transition-all focus:border-flow-gold"
                  id="headcount"
                  placeholder="e.g. 42"
                  type="number"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <p className="font-body text-sm text-white/40 italic">
                Include full-time equivalents and long-term contractors.
              </p>
            </div>

            {/* Billing Terms Selection */}
            <div className="space-y-6">
              <label className="block flow-label text-white uppercase tracking-widest">
                Typical Billing Terms
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {billingTerms.map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setSelectedTerm(term.id)}
                    className={`relative flex flex-col p-6 text-left border transition-all duration-300 group ${
                      selectedTerm === term.id
                        ? 'bg-flow-gold border-flow-gold text-flow-black'
                        : 'border-white/10 bg-white/5 text-white hover:border-flow-gold/50'
                    }`}
                  >
                    <span className="font-mono text-xl font-bold">
                      {term.label}
                    </span>
                    <span
                      className={`flow-label mt-2 text-[10px] ${selectedTerm === term.id ? 'text-flow-black/60' : 'text-white/40'}`}
                    >
                      {term.sub}
                    </span>
                    {selectedTerm === term.id && (
                      <CheckCircle2 className="absolute top-4 right-4 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Selection */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-body text-sm text-white/40 italic">
                Don&apos;t see your terms?
              </span>
              <button
                type="button"
                className="flow-label text-flow-gold border-b border-flow-gold/30 hover:border-flow-gold transition-colors"
              >
                REQUEST CUSTOM MODEL
              </button>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button
                type="submit"
                disabled={
                  !headcount ||
                  !displayBusinessName ||
                  !displayFullName ||
                  isSubmitting
                }
                className="w-full sm:flex-1 flex items-center justify-center gap-3 bg-flow-gold text-flow-black py-6 px-10 font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 min-w-[240px]"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    CONTINUE SETUP
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/onboarding')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 text-white py-6 px-10 font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
                BACK
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center overflow-hidden border-t border-white/10 bg-flow-obsidian">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="flow-label text-flow-gold">
                CASH CYCLE ANALYSIS: ACTIVE
              </span>
              <span className="font-mono text-sm text-white/40">
                DSO-TARGET: <span className="text-white">22 DAYS</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                LIQUIDITY-RATIO: <span className="text-white">1.8x</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                RECEIVABLES-SYNC: <span className="text-flow-gold">LIVE</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
