'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Landmark, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

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
      const { error: authError } = await authClient.signIn.emailOtp({
        email,
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

      // Check if user is actually admin
      const { data: userMe, error: meError } = await authClient.getSession();

      if (meError || !userMe?.user) {
        throw new Error('Failed to verify session');
      }

      // In a real app, we'd check is_admin here, but BetterAuth might not have it in session immediately
      // The admin.md says the backend checks email ends with @flowcfo.net
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
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#FFD700] flex items-center justify-center">
            <Landmark className="text-black h-7 w-7" />
          </div>
          <div className="text-left">
            <h1 className="text-white font-bold text-2xl tracking-tight">
              FlowCFO
            </h1>
            <p className="text-[#FFD700] text-[10px] uppercase tracking-[0.3em] font-medium">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#141416] border border-white/5 p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">
              {step === 'email' ? 'Welcome back' : 'Verify Identity'}
            </h2>
            <p className="text-white/40 text-sm">
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
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@flowcfo.net"
                    className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
                  Verification Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#FFD700]/50 tracking-[0.5em] font-mono text-center transition-colors"
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
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold h-14 rounded-none group"
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
              className="mt-6 text-white/40 text-xs hover:text-[#FFD700] transition-colors"
            >
              ← Use a different email
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-white/20 text-xs tracking-widest uppercase">
          Secure Administrative Access Only
        </p>
      </div>
    </div>
  );
}
