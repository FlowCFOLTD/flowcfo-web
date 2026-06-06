'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Derive missing token error during render to avoid cascading renders in useEffect
  const tokenError = !token
    ? 'Invalid or missing reset token. Please request a new password reset link.'
    : null;
  const displayError = error || tokenError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (authError) {
        throw new Error(authError.message || 'Failed to reset password');
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            Your password has been successfully reset. Redirecting you to
            sign in...
          </p>
          <Link
            href="/signin"
            className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98]"
          >
            Sign In Now
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <>
          <header className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-flow-black mb-2">
              New Password
            </h2>
            <p className="font-body text-sm text-on-surface-variant">
              Please enter and confirm your new password.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {displayError && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body">
                {displayError}
              </div>
            )}

            <div className="group">
              <label
                className="mb-2 block flow-label tracking-widest text-flow-black"
                htmlFor="password"
              >
                New Password
              </label>
              <div className="relative border border-flow-black transition-all duration-200 focus-within:border-b-2 focus-within:border-flow-gold">
                <input
                  className="w-full border-none bg-transparent px-4 py-4 pr-12 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  required
                  disabled={!token}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-flow-muted hover:text-flow-black transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
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
                  className="w-full border-none bg-transparent px-4 py-4 pr-12 font-mono text-sm text-flow-black focus:ring-0 placeholder:text-flow-muted"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  required
                  disabled={!token}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-flow-muted hover:text-flow-black transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading || !token}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Update Password
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPassword() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-flow-obsidian px-4 md:px-0">
      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center">
        {/* Brand Identity */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo-dark.svg" alt="FlowCFO" width={40} height={40} className="h-10 w-10 transition-transform group-hover:scale-105" />
            <h1 className="font-display text-4xl font-bold tracking-tighter text-white">
              FlowCFO
            </h1>
          </Link>
        </div>

        {/* Auth Card */}
        <Suspense fallback={
          <div className="w-full bg-white p-10 shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 text-flow-gold animate-spin" />
            <p className="mt-4 font-mono text-xs text-flow-black/40 uppercase tracking-widest">Initialising Secure Reset...</p>
          </div>
        }>
          <ResetPasswordContent />
        </Suspense>

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
