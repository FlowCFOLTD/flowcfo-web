'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } =
        await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'forget-password',
        });

      if (authError) {
        throw new Error(authError.message || 'Failed to send reset code');
      }

      setStage('otp');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password,
      });

      if (authError) {
        throw new Error(authError.message || 'Failed to reset password');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-flow-obsidian px-4 md:px-0">
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
        <div className="w-full bg-white p-10 shadow-2xl transition-all duration-500 md:p-12">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="font-display text-3xl font-bold text-flow-black mb-4">
                Password Reset
              </h2>
              <p className="font-body text-sm text-on-surface-variant mb-8">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>
              <Link
                href="/signin"
                className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98]"
              >
                Sign In
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ) : stage === 'email' ? (
            <>
              <header className="mb-10 text-center">
                <h2 className="font-display text-3xl font-bold text-flow-black mb-2">
                  Forgot Password?
                </h2>
                <p className="font-body text-sm text-on-surface-variant">
                  Enter your email and we&apos;ll send you a verification code
                  to reset your password.
                </p>
              </header>

              <form onSubmit={handleSendOtp} className="space-y-8">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body">
                    {error}
                  </div>
                )}

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <header className="mb-10 text-center">
                <h2 className="font-display text-3xl font-bold text-flow-black mb-2">
                  Reset Password
                </h2>
                <p className="font-body text-sm text-on-surface-variant">
                  Enter the 6-digit code sent to{' '}
                  <span className="font-bold text-flow-black">{email}</span> and
                  choose a new password.
                </p>
              </header>

              <form onSubmit={handleResetPassword} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body">
                    {error}
                  </div>
                )}

                <div className="group">
                  <label
                    className="mb-2 block flow-label tracking-widest text-flow-black"
                    htmlFor="otp"
                  >
                    Verification Code
                  </label>
                  <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                    <input
                      className="w-full border-none bg-transparent px-4 py-4 font-mono text-center text-xl tracking-[0.5em] text-flow-black focus:ring-0 placeholder:text-flow-muted"
                      id="otp"
                      name="otp"
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      required
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ''))
                      }
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    className="mb-2 block flow-label tracking-widest text-flow-black"
                    htmlFor="password"
                  >
                    New Password
                  </label>
                  <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                    <input
                      className="w-full border-none bg-transparent px-4 py-4 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    className="mb-2 block flow-label tracking-widest text-flow-black"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                    <input
                      className="w-full border-none bg-transparent px-4 py-4 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStage('email')}
                  className="w-full text-center text-xs font-mono text-on-surface-variant hover:text-flow-gold transition-colors"
                >
                  Try a different email
                </button>
              </form>
            </>
          )}
        </div>

        <footer className="mt-8">
          <Link
            href="/signin"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-body"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </footer>
      </div>
    </main>
  );
}
