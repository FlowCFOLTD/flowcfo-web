'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { adminApi } from '@/lib/api/users';
import { Button } from '@/components/ui/button';
import { Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith('@flowcfo.net')) {
      setError('Only @flowcfo.net emails are allowed for admin access.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (authError) {
        throw new Error(authError.message || 'Failed to send OTP');
      }

      setStep('otp');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (authError) {
        throw new Error(authError.message || 'Invalid OTP');
      }

      // Verify admin access by calling admin/me
      try {
        await adminApi.getMe();
      } catch {
        throw new Error('Admin access not granted. Contact support@flowcfo.net.');
      }
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4faf7] flex flex-col items-center justify-center overflow-hidden p-4 text-[#173b38]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#b9eddd]/55 blur-3xl" />
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Image src="/logo.svg" alt="FlowCFO" width={44} height={44} className="h-11 w-11" />
          <div className="text-left">
            <h1 className="text-[#123e3b] font-bold text-2xl tracking-tight">
              FlowCFO
            </h1>
            <p className="text-[#087f75] text-[10px] uppercase tracking-[0.3em] font-medium">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-white border border-[#d8e9e1] p-8 shadow-[0_28px_90px_-60px_rgba(18,62,59,.3)] md:p-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#173b38] mb-2">
              {step === 'email' ? 'Welcome back' : 'Verify Identity'}
            </h2>
            <p className="text-[#647770] text-sm">
              {step === 'email'
                ? 'Enter your @flowcfo.net email to continue.'
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          <form
            onSubmit={step === 'email' ? handleSendOtp : handleVerifyOtp}
            className="space-y-6"
          >
            {step === 'email' ? (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#61756d] font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#82958d]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@flowcfo.net"
                    className="w-full rounded-xl bg-[#fbfdfc] border border-[#d5e5dd] px-12 py-4 text-[#173b38] placeholder:text-[#9aa9a2] focus:outline-none focus:border-[#087f75] transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#61756d] font-medium">
                  Verification Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#82958d]" />
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full rounded-xl bg-[#fbfdfc] border border-[#d5e5dd] px-12 py-4 text-[#173b38] placeholder:text-[#9aa9a2] focus:outline-none focus:border-[#087f75] tracking-[0.5em] font-mono text-center transition-colors"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#087f75] hover:bg-[#066b63] text-white font-bold h-14 rounded-xl group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {step === 'email'
                    ? 'Send Access Code'
                    : 'Verify & Enter Dashboard'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {step === 'otp' && (
            <button
              onClick={() => setStep('email')}
              className="mt-6 text-[#61756d] text-xs hover:text-[#087f75] transition-colors"
            >
              ← Use a different email
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[#84958d] text-xs tracking-widest uppercase">
          Secure Administrative Access Only
        </p>
      </div>
    </div>
  );
}
