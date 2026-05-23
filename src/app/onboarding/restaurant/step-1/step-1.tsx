'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Store,
  ShieldCheck,
  CreditCard,
  Smartphone,
  UtensilsCrossed,
  MoreHorizontal,
} from 'lucide-react';

import { useUser } from '@/hooks/api/use-user';
import { useSubmitOnboardingStep1 } from '@/hooks/api/use-onboarding';
import { Loader2 } from 'lucide-react';

const posSystems = [
  {
    id: 'toast',
    label: 'TOAST',
    icon: CreditCard,
    sub: 'Standard Cloud Integration',
  },
  {
    id: 'square',
    label: 'SQUARE',
    icon: Smartphone,
    sub: 'Omnichannel Deployment',
  },
  {
    id: 'aloha',
    label: 'ALOHA',
    icon: UtensilsCrossed,
    sub: 'Legacy System Protocol',
  },
  {
    id: 'other',
    label: 'OTHER',
    icon: MoreHorizontal,
    sub: 'Custom API Endpoint',
  },
];

export default function RestaurantStep1() {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutate: submitStep1, isPending: isSubmitting } =
    useSubmitOnboardingStep1();

  const [locations, setLocations] = useState('');
  const [selectedPos, setSelectedPos] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayBusinessName =
    businessName !== null ? businessName : user?.business_name || '';
  const displayFullName = fullName !== null ? fullName : user?.full_name || '';

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!locations || !selectedPos) return;

    submitStep1(
      {
        business_type: 'restaurant',
        business_name: displayBusinessName,
        full_name: displayFullName,
        tax_rate: 25.0,
        currency: 'USD',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        locations: parseInt(locations),
        pos_system: selectedPos,
      },
      {
        onSuccess: () => {
          router.push('/onboarding/restaurant/step-2');
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
              Kitchen Engineering
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-6xl leading-tight">
              Engineering your kitchen&apos;s financial health.
            </h1>
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            Precision starts with the architecture of your data. Define your
            operational scale to begin the synchronization of your private
            wealth terminal.
          </p>

          <div className="mt-8 relative h-64 w-full bg-white/5 border border-white/10 rounded-lg overflow-hidden group">
            <img
              alt="Institutional Kitchen"
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000"
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-flow-obsidian/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className="flow-label text-flow-gold block mb-2 uppercase">
                Infrastructure Ready
              </span>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4 text-flow-gold" />
                <span className="font-body text-xs">
                  Institutional Grade Security Active
                </span>
              </div>
            </div>
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
                  placeholder="e.g. Bistro Central"
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

            {/* Total Locations Selection */}
            <div className="space-y-6">
              <label
                className="block flow-label text-white uppercase tracking-widest"
                htmlFor="locations"
              >
                Total Operational Locations
              </label>
              <input
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 font-body text-xl text-white outline-none transition-all focus:border-flow-gold"
                id="locations"
                placeholder="1"
                required
                type="number"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
              />
            </div>

            {/* POS Integration Selection */}
            <div className="space-y-6">
              <label className="block flow-label text-white uppercase tracking-widest">
                POS System Integration
              </label>
              <div className="grid grid-cols-2 gap-4">
                {posSystems.map((pos) => {
                  const Icon = pos.icon;
                  return (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => setSelectedPos(pos.id)}
                      className={`relative flex flex-col items-start p-6 text-left border transition-all duration-300 group ${
                        selectedPos === pos.id
                          ? 'bg-flow-gold border-flow-gold text-flow-black'
                          : 'border-white/10 bg-white/5 text-white hover:border-flow-gold/50'
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 mb-4 ${selectedPos === pos.id ? 'text-flow-black' : 'text-flow-gold'}`}
                      />
                      <span className="font-display font-bold uppercase tracking-widest mb-1">
                        {pos.label}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold ${selectedPos === pos.id ? 'text-flow-black/60' : 'text-white/40'}`}
                      >
                        {pos.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button
                type="submit"
                disabled={
                  !locations ||
                  !selectedPos ||
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
                KITCHEN ANALYTICS: ACTIVE
              </span>
              <span className="font-mono text-sm text-white/40">
                LOCATIONS:{' '}
                <span className="text-white">{locations || '0'}</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                PRIME-COST: <span className="text-white">OPTIMIZING</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                POS-SYNC:{' '}
                <span className="text-flow-gold">
                  {selectedPos ? 'READY' : 'WAITING'}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
