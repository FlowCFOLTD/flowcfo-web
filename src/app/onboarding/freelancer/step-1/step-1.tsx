'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  User,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

import { useUser } from '@/hooks/api/use-user';
import { useSubmitOnboardingStep1 } from '@/hooks/api/use-onboarding';
import { Loader2 } from 'lucide-react';

const invoiceRanges = [
  { id: '<5k', label: '<$5k' },
  { id: '5k-10k', label: '$5k-$10k' },
  { id: '10k-25k', label: '$10k-$25k' },
  { id: '25k-50k', label: '$25k-$50k' },
  { id: '50k+', label: '$50k+' },
];

const serviceTypes = [
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
  { id: 'writing', label: 'Writing' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'video', label: 'Video' },
  { id: 'other', label: 'Other' },
];

export default function FreelancerStep1() {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutate: submitStep1, isPending: isSubmitting } =
    useSubmitOnboardingStep1();

  const [serviceType, setServiceType] = useState('');
  const [invoiceRange, setInvoiceRange] = useState('10k-25k');
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayBusinessName =
    businessName !== null ? businessName : user?.business_name || '';
  const displayFullName = fullName !== null ? fullName : user?.full_name || '';

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!serviceType) return;

    submitStep1(
      {
        business_type: 'freelancer',
        business_name: displayBusinessName,
        full_name: displayFullName,
        tax_rate: 25.0,
        currency: 'USD',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        service_type: serviceType,
        monthly_invoices: invoiceRange,
      },
      {
        onSuccess: () => {
          router.push('/onboarding/freelancer/step-2');
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
              Freelancer Setup
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-6xl leading-tight">
              Tailoring the command center for solo operations.
            </h1>
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            Configure your financial terminal to match your professional
            cadence. Precision is our primary protocol.
          </p>
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4 text-flow-gold/80">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-body text-sm italic">
                Institutional grade encryption active
              </span>
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
                  placeholder="e.g. Solo Creative"
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

            {/* Service Type Selection */}
            <div className="space-y-6">
              <label
                className="block flow-label text-white uppercase tracking-widest"
                htmlFor="service-type"
              >
                Primary Service Type
              </label>
              <div className="relative group">
                <select
                  id="service-type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-4 pr-10 font-body text-xl text-white outline-none transition-all focus:border-flow-gold appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-flow-obsidian">
                    Select your domain...
                  </option>
                  {serviceTypes.map((type) => (
                    <option
                      key={type.id}
                      value={type.id}
                      className="bg-flow-obsidian text-white"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Monthly Invoices Selection */}
            <div className="space-y-6">
              <label className="block flow-label text-white uppercase tracking-widest">
                Estimated Monthly Invoices
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {invoiceRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setInvoiceRange(range.id)}
                    className={`relative flex flex-col p-6 text-center border transition-all duration-300 group ${
                      invoiceRange === range.id
                        ? 'bg-flow-gold border-flow-gold text-flow-black'
                        : 'border-white/10 bg-white/5 text-white hover:border-flow-gold/50'
                    }`}
                  >
                    <span className="font-mono text-xl font-bold">
                      {range.label}
                    </span>
                    {invoiceRange === range.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button
                type="submit"
                disabled={
                  !serviceType ||
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
                SOLO-OPS PROTOCOL: ACTIVE
              </span>
              <span className="font-mono text-sm text-white/40">
                DOMAIN:{' '}
                <span className="text-white">{serviceType || 'PENDING'}</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                REVIEW-MODE: <span className="text-white">ACTIVE</span>
              </span>
              <span className="font-mono text-sm text-white/40">
                CONNECTION: <span className="text-flow-gold">TLS</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
