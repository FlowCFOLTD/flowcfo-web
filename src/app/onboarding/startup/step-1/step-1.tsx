'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Info,
  ChevronDown,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const fundingRounds = [
  { value: 'pre-seed', label: 'PRE-SEED' },
  { value: 'seed', label: 'SEED' },
  { value: 'series-a', label: 'SERIES A' },
  { value: 'series-b', label: 'SERIES B' },
  { value: 'series-c+', label: 'SERIES C+' },
  { value: 'bootstrapped', label: 'BOOTSTRAPPED' },
];

export default function StartupStep1() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [fundingRound, setFundingRound] = useState('');
  const [operatingBurn, setOperatingBurn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill full name from session
    authClient.getSession().then(({ data }) => {
      if (data?.user?.name) {
        setFullName(data.user.name);
      }
    });
  }, []);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: sessionData } = await authClient.getSession();
      if (!sessionData?.session.token) {
        router.push('/signin');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/users/onboarding/step-1`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionData.session.token}`,
          },
          body: JSON.stringify({
            business_type: 'startup',
            business_name: businessName,
            full_name: fullName,
            tax_rate: 25.0,
            currency: 'USD',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            funding_round: fundingRound,
            monthly_burn: parseFloat(operatingBurn),
          }),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.error?.message || 'Failed to save onboarding data',
        );
      }

      router.push('/onboarding/startup/step-2');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '33.33%' }}
      />

      <section className="mx-auto mb-16 max-w-4xl text-center md:text-left">
        <span className="flow-label mb-4 block text-flow-gold tracking-[0.3em]">
          STEP 01/03
        </span>
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl mb-8">
          Fueling your venture&apos;s trajectory.
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          Precision in your financial baseline lets our treasury engine maximize
          your capital efficiency and extend your runway without the guesswork.
        </p>
      </section>

      {/* Main Configuration Card */}
      <div className="mx-auto w-full max-w-4xl border border-white/10 bg-white/5 p-10 md:p-16 relative overflow-hidden group">
        {/* Subtle Decorative Icon */}
        <div className="absolute -right-8 -top-8 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]">
          <TrendingUp size={320} strokeWidth={1} />
        </div>

        <form
          onSubmit={handleContinue}
          className="relative z-10 flex flex-col gap-16"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Business Name Input */}
            <div className="flex flex-col gap-6">
              <label
                className="flow-label text-white/40 tracking-[0.2em]"
                htmlFor="business-name"
              >
                BUSINESS NAME
              </label>
              <input
                id="business-name"
                required
                className="w-full border-b border-white/20 bg-transparent py-6 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                placeholder="ACME INC"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            {/* Full Name Input */}
            <div className="flex flex-col gap-6">
              <label
                className="flow-label text-white/40 tracking-[0.2em]"
                htmlFor="full-name"
              >
                YOUR FULL NAME
              </label>
              <input
                id="full-name"
                required
                className="w-full border-b border-white/20 bg-transparent py-6 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                placeholder="JANE DOE"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Funding Round Select */}
            <div className="flex flex-col gap-6">
              <label
                className="flow-label text-white/40 tracking-[0.2em]"
                htmlFor="funding-round"
              >
                LAST FUNDING ROUND
              </label>
              <div className="relative">
                <select
                  id="funding-round"
                  value={fundingRound}
                  onChange={(e) => setFundingRound(e.target.value)}
                  className="w-full appearance-none border-b border-white/20 bg-transparent py-6 pr-12 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold cursor-pointer"
                >
                  <option value="" disabled className="bg-flow-obsidian">
                    SELECT ROUND TYPE
                  </option>
                  {fundingRounds.map((round) => (
                    <option
                      key={round.value}
                      value={round.value}
                      className="bg-flow-obsidian text-white"
                    >
                      {round.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Operating Burn Input */}
            <div className="flex flex-col gap-6">
              <label
                className="flow-label text-white/40 tracking-[0.2em]"
                htmlFor="operating-burn"
              >
                MONTHLY OPERATING BURN
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-lg text-white/30">
                  USD
                </span>
                <input
                  id="operating-burn"
                  className="w-full border-b border-white/20 bg-transparent py-6 pl-16 pr-6 font-mono text-3xl text-white outline-none transition-all focus:border-flow-gold"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  value={operatingBurn}
                  onChange={(e) => setOperatingBurn(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Persona Insight Box */}
          <div className="flex items-center border-l-4 border-flow-gold bg-white/[0.03] p-8">
            <div className="flex gap-4">
              <Info className="h-6 w-6 shrink-0 text-flow-gold" />
              <p className="font-body text-base italic leading-relaxed text-white/60">
                &quot;Think of this as your current metabolic rate. We use these
                numbers to benchmark your liquidity cycles against industry
                leaders in your sector.&quot;
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Action Bar */}
      <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col md:flex-row items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => router.push('/onboarding')}
          className="flex items-center gap-3 px-8 py-4 flow-label text-white/40 transition-all hover:text-white group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          BACK
        </button>

        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
          {/* <button
            type="button"
            className="px-10 py-5 flow-label border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
          >
            SAVE DRAFT
          </button> */}
          <button
            onClick={handleContinue}
            disabled={
              !fundingRound ||
              !operatingBurn ||
              !businessName ||
              !fullName ||
              isLoading
            }
            className="flex items-center justify-center gap-3 bg-flow-gold px-12 py-5 font-bold uppercase tracking-[0.15em] text-flow-black transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:active:scale-100 min-w-[240px]"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                CONTINUE SETUP
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center overflow-hidden border-t border-white/10 bg-flow-obsidian">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="flow-label text-flow-gold">
                LIQUIDITY MONITOR: ACTIVE
              </span>
              <span className="font-mono text-sm text-white/40">
                AVG-BURN-RATE: <span className="text-white">-$42,109.00</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                RUNWAY-EXT: <span className="text-white">+4.2 MONTHS</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                MARKET-VOL: <span className="text-flow-gold">LOW</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
