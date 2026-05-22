'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const moveX = (x - 0.5) * 10;
      const moveY = (y - 0.5) * 10;
      cardRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (authError || !data) {
        throw new Error(authError?.message || 'Signup failed');
      }

      // 2. Accept Terms & Conditions on the backend
      const token =
        'session' in data ? (data.session as { token: string }).token : null;
      if (!token) {
        // If no token, maybe email verification is required
        router.push('/signin?verify=email');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/users/me`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ terms_accepted: true }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update terms acceptance');
      }

      // 3. Redirect to onboarding
      router.push('/onboarding');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during signup',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-12 md:px-16">
      {/* Atmospheric Background Element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[5%] -top-[10%] h-[60%] w-[40%] rounded-full bg-flow-gold/5 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -left-[5%] h-[60%] w-[40%] rounded-full bg-flow-gold/5 blur-[120px]"></div>
      </div>

      {/* Logo & Branding Anchor */}
      <div className="relative z-10 mb-12 text-center">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 mb-4"
        >
          <span
            className="material-symbols-outlined text-4xl text-flow-gold"
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            account_balance
          </span>
          <span className="font-display text-3xl font-bold tracking-tighter text-white">
            FlowCFO
          </span>
        </Link>
        <p className="flow-label tracking-[0.2em] text-flow-gold">
          The Virtual CFO for Founders
        </p>
      </div>

      {/* Auth Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-[520px] bg-white p-10 shadow-2xl transition-all duration-500 md:p-12"
      >
        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold text-flow-black mb-2">
            Claim your financial command center
          </h1>
          <p className="font-body text-on-surface-variant">
            Let&apos;s get your dashboard ready.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body">
              {error}
            </div>
          )}
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block flow-label text-flow-black" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full border border-flow-black bg-transparent px-4 py-4 font-body text-flow-black placeholder:text-flow-muted focus:border-flow-gold focus:outline-none focus:ring-0 transition-all duration-200"
              id="name"
              name="name"
              type="text"
              placeholder="Alexander Hamilton"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block flow-label text-flow-black" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-flow-black bg-transparent px-4 py-4 font-body text-flow-black placeholder:text-flow-muted focus:border-flow-gold focus:outline-none focus:ring-0 transition-all duration-200"
              id="email"
              name="email"
              type="email"
              placeholder="alexander@foundry.vc"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              className="block flow-label text-flow-black"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full border border-flow-black bg-transparent px-4 py-4 font-body text-flow-black placeholder:text-flow-muted focus:border-flow-gold focus:outline-none focus:ring-0 transition-all duration-200"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 py-2">
            <input
              className="mt-1 h-5 w-5 border-2 border-flow-black text-flow-gold focus:ring-flow-gold rounded-none cursor-pointer"
              id="terms"
              name="terms"
              type="checkbox"
              required
              checked={formData.terms}
              onChange={(e) =>
                setFormData({ ...formData, terms: e.target.checked })
              }
            />
            <label
              className="font-body text-sm leading-tight text-on-surface-variant"
              htmlFor="terms"
            >
              I acknowledge the{' '}
              <Link
                href="/terms"
                className="font-bold text-flow-black underline underline-offset-4 hover:text-flow-gold"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-bold text-flow-black underline underline-offset-4 hover:text-flow-gold"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Primary Action */}
          <button
            className="group flex w-full items-center justify-center gap-3 bg-flow-gold px-8 py-5 font-bold uppercase tracking-widest text-flow-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Social Proof */}
        <div className="mt-10 border-t border-flow-line pt-8 text-center">
          <p className="font-mono text-sm text-on-surface-variant">
            Join{' '}
            <span className="font-bold text-flow-black">200+ founders</span>{' '}
            managing <span className="font-bold text-flow-black">$2B+</span> in
            liquidity.
          </p>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="relative z-10 mt-8 text-center">
        <p className="font-body text-white/80">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-bold text-white underline underline-offset-4 transition-colors hover:text-flow-gold"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Minimal Auth Footer */}
      <footer className="absolute bottom-0 flex w-full flex-col items-center justify-between gap-4 border-t border-white/5 bg-flow-obsidian/50 px-8 py-6 backdrop-blur-sm md:flex-row md:px-16">
        <div className="font-body text-xs text-white/40">
          © 2026 FlowCFO. Bank-grade security.
        </div>
        <div className="flex gap-8">
          <Link
            href="/privacy"
            className="flow-label text-white/40 hover:text-flow-gold transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="flow-label text-white/40 hover:text-flow-gold transition-colors"
          >
            Disclosures
          </Link>
        </div>
      </footer>
    </main>
  );
}
