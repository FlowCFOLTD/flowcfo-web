'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Lock, Loader2, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { usersApi } from '@/lib/api/users';
import { useSetupUser } from '@/hooks/api/use-user';

export default function Signin({ verify, verifyEmail }: { verify?: string; verifyEmail?: string }) {
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

  if (verify === 'email') {
    return <VerifyEmailView email={verifyEmail || ''} />;
  }

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

      const authData = data as { token?: string; session?: { token: string } };
      const token = authData.token || authData.session?.token;
      if (!token) throw new Error('No session token received');

      const user = await usersApi.getMe();

      if (!user.terms_accepted) {
        // If terms not accepted (e.g., verified email but didn't complete signup flow)
        router.push('/onboarding');
        return;
      }

      if (user.onboarding_completed) {
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
              Your account is ready for you.
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

function VerifyEmailView({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const setupUser = useSetupUser();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const chars = value.replace(/\D/g, '').split('').slice(0, 6);
      const newOtp = [...otp];
      chars.forEach((char, i) => { newOtp[i] = char; });
      setOtp(newOtp);
      const nextIndex = Math.min(chars.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (verifyError || !data) {
        throw new Error(verifyError?.message || 'Invalid verification code');
      }

      setIsVerified(true);
      await setupUser.mutateAsync({ terms_accepted: true });
      router.push('/onboarding');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Verification failed',
      );
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
      });
      toast.success('Verification code resent');
    } catch {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-flow-obsidian px-4 md:px-0">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-flow-gold mb-6" />
          <h2 className="font-display text-3xl font-bold text-white mb-2">Email verified!</h2>
          <p className="font-body text-white/60 mb-8">Redirecting to your dashboard...</p>
          <Loader2 className="h-6 w-6 animate-spin text-flow-gold" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-flow-obsidian px-4 md:px-0">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center">
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

        <div className="w-full bg-white p-10 shadow-2xl md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-flow-gold/10">
              <Mail className="h-8 w-8 text-flow-gold" />
            </div>
            <h2 className="font-display text-2xl font-bold text-flow-black mb-3">
              Check your email
            </h2>
            <p className="font-body text-sm text-on-surface-variant mb-1">
              We sent a verification code to
            </p>
            <p className="font-body text-sm font-bold text-flow-black mb-8">
              {email || 'your email'}
            </p>

            <div className="flex items-center gap-2 text-sm text-flow-gold font-bold mb-8">
              <CheckCircle className="h-4 w-4" />
              <span>Code expires in 10 minutes</span>
            </div>

            {error && (
              <div className="w-full bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body mb-6">
                {error}
              </div>
            )}

            <div className="flex gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="h-14 w-12 border border-flow-black text-center font-mono text-xl font-bold text-flow-black focus:border-flow-gold focus:outline-none transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.join('').length !== 6 || isLoading}
              className="group flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Verify Email'
              )}
            </button>

            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="font-body text-xs text-on-surface-variant">
                Didn&apos;t receive it?{' '}
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="font-bold text-flow-black underline underline-offset-4 hover:text-flow-gold transition-colors disabled:opacity-50"
                >
                  Resend code
                </button>
              </p>
              <button
                onClick={() => router.push('/signin')}
                className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-flow-black transition-colors mt-2"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to sign in
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="flow-label text-[10px] text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs">&bull;</span>
            <Link
              href="/terms"
              className="flow-label text-[10px] text-white/40 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
