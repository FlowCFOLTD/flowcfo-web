'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      bgRef.current.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (authError || !data) {
        throw new Error(authError?.message || 'Invalid email or password');
      }

      // Check user profile to see where to redirect
      const authData = data as { token?: string; session?: { token: string } };
      const token = authData.token || authData.session?.token;
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const user = await profileResponse.json();

      if (!user.terms_accepted) {
        // This shouldn't happen if signup flow is correct, but just in case
        router.push('/signup');
        return;
      }

      if (user.is_admin && user.email.endsWith('@flowcfo.net')) {
        router.push('/admin/dashboard');
      } else if (user.onboarding_completed) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during signin',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-flow-obsidian px-4 md:px-0">
      {/* Subtle Ambient background texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-300 ease-out"
        style={{
          backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '50% 50%',
        }}
      />

      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center">
        {/* Brand Identity */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="material-symbols-outlined text-[40px] text-flow-gold-soft transition-transform group-hover:scale-105"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tighter text-white">
              FlowCFO
            </h1>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="w-full bg-white p-10 shadow-2xl transition-all duration-500 hover:border-flow-gold-soft md:p-12">
          <header className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-flow-black mb-2">
              Welcome back, Founder
            </h2>
            <p className="font-body text-sm text-on-surface-variant">
              Your command center is ready for you.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body">
                {error}
              </div>
            )}
            {/* Email Field */}
            <div className="group">
              <label
                className="mb-2 block flow-label tracking-widest text-flow-black"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                <input
                  className="w-full border-none bg-transparent px-4 py-4 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="founder@yourbusiness.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="mb-2 flex justify-between items-end">
                <label
                  className="flow-label tracking-widest text-flow-black"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="flow-label text-[#735c00] hover:text-flow-gold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                <input
                  className="w-full border-none bg-transparent px-4 py-4 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
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
            </div>

            {/* CTA */}
            <button
              className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Log in
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="mt-10 flex flex-col items-center gap-6 border-t border-flow-line pt-8">
            <div className="flex items-center gap-6 grayscale opacity-60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span className="flow-label text-[10px]">
                  Bank-grade security
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4" />
                <span className="flow-label text-[10px]">
                  256-Bit Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-8 flex flex-col items-center gap-4">
          <p className="font-body text-sm text-white/60">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="ml-1 font-bold text-flow-gold-soft hover:text-white transition-colors"
            >
              Create Account
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="flow-label text-[10px] text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs">•</span>
            <Link
              href="/terms"
              className="flow-label text-[10px] text-white/40 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="font-body text-[10px] text-white/20 uppercase tracking-widest mt-4">
            © 2026 FlowCFO. Bank-grade security.
          </p>
        </footer>

        {/* Decorative Elements for Prestige */}
        <div className="absolute -bottom-12 -left-24 hidden lg:block opacity-20">
          <p className="font-mono text-[10px] text-white leading-relaxed uppercase tracking-widest">
            FlowCFO Terminal v4.2
            <br />
            Institutional Access Node: 091-AX
          </p>
        </div>
      </div>
    </main>
  );
}
