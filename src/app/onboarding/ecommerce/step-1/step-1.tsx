'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Store,
  Package,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react';

import { useUser } from '@/hooks/api/use-user';
import { useSubmitOnboardingStep1 } from '@/hooks/api/use-onboarding';
import { Loader2 } from 'lucide-react';

const platforms = [
  { id: 'shopify', name: 'SHOPIFY', icon: Store },
  { id: 'amazon', name: 'AMAZON', icon: Package },
  { id: 'woocommerce', name: 'WOOCOMMERCE', icon: ShoppingCart },
];

export default function EcommerceStep1() {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutate: submitStep1, isPending: isSubmitting } =
    useSubmitOnboardingStep1();

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [valuation, setValuation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const displayBusinessName =
    businessName !== null ? businessName : user?.business_name || '';
  const displayFullName = fullName !== null ? fullName : user?.full_name || '';

  const handleContinue = () => {
    setError(null);
    if (!selectedPlatform || !valuation) return;

    submitStep1(
      {
        business_type: 'ecommerce',
        business_name: displayBusinessName,
        full_name: displayFullName,
        tax_rate: 25.0,
        currency: 'USD',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        platform: selectedPlatform,
        inventory_value: parseFloat(valuation),
      },
      {
        onSuccess: () => {
          router.push('/onboarding/ecommerce/step-2');
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : 'An error occurred');
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar (Managed by Layout, but showing state here) */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: '33.33%' }}
      />

      <section className="mx-auto mb-16 max-w-4xl text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl mb-8">
          Connect your storefront intelligence
        </h1>
        <p className="mx-auto max-w-3xl font-body text-xl leading-relaxed text-white/60">
          Link your primary sales channels so we can start forecasting your cash
          flow and calculating your real-time inventory value.
        </p>
      </section>

      {/* Configuration Card */}
      <div className="mx-auto w-full max-w-4xl border border-white/10 bg-white/5 p-10 md:p-16">
        <div className="flex flex-col gap-16">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Identity Fields */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <label className="flow-label text-white/40 tracking-[0.2em]">
                BUSINESS NAME
              </label>
              <input
                className="w-full border-b border-white/20 bg-transparent py-4 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                placeholder="ACME E-COMMERCE"
                value={displayBusinessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="flow-label text-white/40 tracking-[0.2em]">
                YOUR FULL NAME
              </label>
              <input
                className="w-full border-b border-white/20 bg-transparent py-4 font-mono text-xl text-white outline-none transition-all focus:border-flow-gold"
                placeholder="JANE DOE"
                value={displayFullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="flow-label mb-8 block text-white/40 tracking-[0.2em]">
              WHERE DO YOU SELL?
            </label>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`group relative flex aspect-square flex-col items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? 'border-flow-gold bg-flow-gold/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div
                      className={`mb-6 transition-colors ${isSelected ? 'text-flow-gold' : 'text-white/60 group-hover:text-white'}`}
                    >
                      <Icon className="h-12 w-12" />
                    </div>
                    <span
                      className={`flow-label tracking-[0.15em] transition-colors ${isSelected ? 'text-flow-gold' : 'text-white/40 group-hover:text-white'}`}
                    >
                      {platform.name}
                    </span>

                    {isSelected && (
                      <div className="absolute right-4 top-4 text-flow-gold">
                        <CheckCircle2 className="h-6 w-6 fill-flow-gold/20" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Valuation Input */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <label className="flow-label text-white/40 tracking-[0.2em]">
                WHAT IS YOUR CURRENT INVENTORY WORTH?
              </label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-lg text-white/30">
                  USD
                </span>
                <input
                  className="w-full border-b border-white/20 bg-transparent py-6 pl-20 pr-6 font-mono text-3xl text-white outline-none transition-all focus:border-flow-gold"
                  placeholder="0.00"
                  type="text"
                  value={valuation}
                  onChange={(e) => setValuation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center border-l-4 border-flow-gold bg-white/[0.03] p-8">
              <div className="flex gap-4">
                <Info className="h-6 w-6 shrink-0 text-flow-gold" />
                <p className="font-body text-base italic leading-relaxed text-white/60">
                  &quot;This initial valuation helps us calculate your real-time
                  assets. We&apos;ll keep this synced every 24 hours via your
                  store API.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mx-auto mt-12 flex w-full max-w-4xl items-center justify-between">
        <button
          onClick={() => router.push('/onboarding')}
          className="flex items-center gap-3 px-8 py-4 flow-label text-white/40 transition-all hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          BACK
        </button>
        <div className="flex gap-6">
          <button
            onClick={handleContinue}
            disabled={
              !selectedPlatform ||
              !valuation ||
              !displayBusinessName ||
              !displayFullName ||
              isSubmitting
            }
            className="flex min-w-[280px] items-center justify-center gap-3 bg-flow-gold px-12 py-5 font-bold uppercase tracking-[0.15em] text-flow-black transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
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
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center overflow-hidden border-t border-white/10 bg-flow-obsidian">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="flow-label text-flow-gold">
                LIVE MARKET SYNC: ACTIVE
              </span>
              <span className="font-mono text-sm text-white/40">
                AMZ-INDEX: <span className="text-white">+0.42%</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                SHOP-AGGR: <span className="text-white">+1.18%</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                PORTFOLIO-VAL:{' '}
                <span className="text-flow-gold">$842,109.00</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
