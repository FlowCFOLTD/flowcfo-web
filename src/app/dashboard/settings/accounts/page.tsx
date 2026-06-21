'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Landmark, User, Shield, CreditCard, LogOut, Tags, Wallet, TrendingUp } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useUser, useUpdateUser } from '@/hooks/api/use-user';
import { authClient } from '@/lib/auth-client';
import BankConnectionCard from '@/components/onboarding/bank-connection-card';
import CategoryMappingsPanel from '@/components/settings/category-mappings';
import { useTaxSuggestion } from '@/hooks/api/use-tools';

const BUFFER_MODES = [
  { value: 'conservative', label: 'Conservative', desc: '3 weeks of expenses as safety buffer — best for variable income' },
  { value: 'standard', label: 'Standard', desc: '2 weeks of expenses — balanced default' },
  { value: 'aggressive', label: 'Aggressive', desc: '1 week of expenses — maximise working capital' },
] as const;

export default function AccountSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const updateUser = useUpdateUser();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'accounts' | 'categories' | 'finance'>('profile');

  const refreshUser = () => {
    queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
  };

  const handlePlaidConnect = async () => {
    setSuccess(null); setError(null);
    refreshUser();
  };

  const handleTellerConnect = async () => {
    setSuccess(null); setError(null);
    refreshUser();
  };

  const handleCsvUploadSuccess = (_accountId: string, transactionCount: number) => {
    setSuccess(`${transactionCount} transactions imported successfully.`);
    setError(null);
    refreshUser();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/signin');
  };

  const handleChangePassword = async () => {
    setSuccess(null); setError(null);
    try {
      const { data } = await authClient.forgetPassword.emailOtp({ email: user?.email || '' });
      if (data) {
        setSuccess('Password reset OTP sent. Check your inbox.');
      } else {
        setError('Failed to send reset OTP. Try again.');
      }
    } catch {
      setError('Failed to send reset OTP. Try again.');
    }
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'billing', label: 'Billing', icon: CreditCard },
    { key: 'accounts', label: 'Accounts', icon: Landmark },
    { key: 'categories', label: 'Categories', icon: Tags },
    { key: 'finance', label: 'Finance', icon: Wallet },
  ] as const;

  return (
    <div className="min-h-screen bg-flow-obsidian">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16 py-12">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 flow-label text-white/40 transition-all hover:text-white group mb-8"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          BACK TO DASHBOARD
        </button>

        <h1 className="font-display text-4xl font-bold text-white tracking-tight mb-2">Settings</h1>
        <p className="mb-10 font-body text-lg text-white/40">Manage your account, security, and billing</p>

        <div className="flex gap-2 mb-10 border-b border-white/10 pb-0 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 pb-3 px-1 font-label-caps text-label-caps transition-all border-b-2 -mb-[2px] ${
                activeTab === key
                  ? 'text-flow-gold border-flow-gold'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {success && (
          <div className="mb-8 flex items-center gap-4 border border-flow-gold/30 bg-flow-gold/5 p-6">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-flow-gold" />
            <p className="font-body text-base text-flow-gold">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-8 border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-6">
            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-display text-xl font-bold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="flow-label text-[10px] text-white/40 tracking-widest">Full Name</label>
                  <p className="font-body text-base text-white mt-1">{user?.full_name || '—'}</p>
                </div>
                <div>
                  <label className="flow-label text-[10px] text-white/40 tracking-widest">Email</label>
                  <p className="font-body text-base text-white mt-1">{user?.email || '—'}</p>
                </div>
                <div>
                  <label className="flow-label text-[10px] text-white/40 tracking-widest">Business Name</label>
                  <p className="font-body text-base text-white mt-1">{user?.business_name || '—'}</p>
                </div>
                <div>
                  <label className="flow-label text-[10px] text-white/40 tracking-widest">Business Type</label>
                  <p className="font-body text-base text-white mt-1 capitalize">{user?.business_type || '—'}</p>
                </div>
                <div>
                  <label className="flow-label text-[10px] text-white/40 tracking-widest">Plan</label>
                  <p className="font-body text-base text-white mt-1 uppercase">{user?.plan || 'free_trial'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-6">
            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-display text-xl font-bold text-white mb-6">Password</h2>
              <p className="font-body text-sm text-white/50 mb-4">Send a password reset link to your email to change your password.</p>
              <button
                onClick={handleChangePassword}
                className="bg-flow-gold px-6 py-3 font-bold uppercase tracking-[0.15em] text-flow-black text-xs hover:brightness-110 transition-all"
              >
                RESET PASSWORD
              </button>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 p-8">
              <h2 className="font-display text-xl font-bold text-rose-400 mb-4">Sign Out</h2>
              <p className="font-body text-sm text-white/50 mb-4">Sign out of your account on this device.</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-red-500/30 text-rose-400 px-6 py-3 font-bold uppercase tracking-[0.15em] text-xs hover:bg-red-500/10 transition-all"
              >
                <LogOut className="h-4 w-4" />
                SIGN OUT
              </button>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="max-w-2xl space-y-6">
            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-display text-xl font-bold text-white mb-6">Current Plan</h2>
              <p className="font-body text-sm text-white/50 mb-1">You are on the <span className="uppercase text-flow-gold font-bold">{user?.plan || 'free_trial'}</span> plan.</p>
              <p className="font-body text-xs text-white/30">Upgrade to Premium for advanced features including extended forecasts, priority support, and unlimited accounts.</p>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="max-w-2xl">
            <BankConnectionCard
              onPlaidConnect={handlePlaidConnect}
              onTellerConnect={handleTellerConnect}
              onCsvUploadSuccess={handleCsvUploadSuccess}
            />
            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <Landmark className="h-5 w-5 shrink-0 text-white/20" />
                <p className="font-body text-sm text-white/30 leading-relaxed max-w-xl">
                  Your financial data is encrypted using AES-256 at rest and in transit. FlowCFO uses read-only access and cannot initiate transfers. You can disconnect any account at any time.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="max-w-2xl">
            <CategoryMappingsPanel />
          </div>
        )}

        {activeTab === 'finance' && (
          <FinanceSettings />
        )}
      </div>
    </div>
  );
}

function FinanceSettings() {
  const { data: user } = useUser();
  const updateUser = useUpdateUser();
  const { data: taxSuggestion } = useTaxSuggestion();
  const [success, setSuccess] = useState<string | null>(null);

  const currentMode = (user?.buffer_mode as string) || 'standard';
  const currentPct = user?.auto_allocate_pct ?? 0;

  const handleBufferMode = async (mode: string) => {
    await updateUser.mutateAsync({ buffer_mode: mode as 'conservative' | 'standard' | 'aggressive' });
    setSuccess('Safety buffer updated.');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAutoAllocate = async (pct: number) => {
    await updateUser.mutateAsync({ auto_allocate_pct: pct });
    setSuccess('Auto-allocation updated.');
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {success && (
        <div className="flex items-center gap-3 border border-flow-gold/30 bg-flow-gold/5 p-4">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-flow-gold" />
          <p className="font-body text-sm text-flow-gold">{success}</p>
        </div>
      )}

      <div className="border border-white/10 bg-white/5 p-8">
        <h2 className="font-display text-xl font-bold text-white mb-2">Safety Buffer</h2>
        <p className="font-body text-sm text-white/40 mb-6">
          Controls how much cushion the safe-to-spend calculation keeps. Higher = more conservative.
        </p>
        <div className="space-y-3">
          {BUFFER_MODES.map(({ value, label, desc }) => (
            <button
              key={value}
              onClick={() => handleBufferMode(value)}
              className={`w-full text-left p-4 border transition-all ${
                currentMode === value
                  ? 'border-flow-gold bg-flow-gold/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <p className={`font-body text-sm font-semibold ${currentMode === value ? 'text-flow-gold' : 'text-white'}`}>
                {label}
              </p>
              <p className="font-body text-xs text-white/40 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-white/10 bg-white/5 p-8">
        <h2 className="font-display text-xl font-bold text-white mb-2">Auto-Allocation</h2>
        <p className="font-body text-sm text-white/40 mb-6">
          Automatically set aside a percentage of each incoming payment into your tax reserve.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-body text-sm text-white/60 shrink-0">Set aside</label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={currentPct}
              onChange={(e) => handleAutoAllocate(Number(e.target.value))}
              className="flex-1 accent-flow-gold"
            />
            <span className="font-body text-sm text-flow-gold font-semibold w-12 text-right">{currentPct}%</span>
          </div>
          <div className="flex gap-2">
            {[0, 10, 15, 20, 25, 30].map((pct) => (
              <button
                key={pct}
                onClick={() => handleAutoAllocate(pct)}
                className={`px-3 py-1 text-xs font-body border transition-all ${
                  currentPct === pct
                    ? 'border-flow-gold bg-flow-gold/10 text-flow-gold'
                    : 'border-white/10 text-white/40 hover:text-white/70'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {taxSuggestion && (
        <div className="border border-white/10 bg-white/5 p-8">
          <h2 className="font-display text-xl font-bold text-white mb-2">Suggested Tax Rate</h2>
          <p className="font-body text-sm text-white/40 mb-4">
            Based on your location and business type.
          </p>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-display text-3xl font-bold text-flow-gold">{taxSuggestion.suggested_rate}%</span>
            {taxSuggestion.country_name && (
              <span className="font-body text-sm text-white/40">{taxSuggestion.country_name}</span>
            )}
            <span className={`ml-auto text-xs font-body px-2 py-0.5 ${
              taxSuggestion.confidence === 'high' ? 'text-green-400 bg-green-400/10' :
              taxSuggestion.confidence === 'medium' ? 'text-yellow-400 bg-yellow-400/10' :
              'text-white/40 bg-white/5'
            }`}>
              {taxSuggestion.confidence} confidence
            </span>
          </div>
          <p className="font-body text-xs text-white/30">{taxSuggestion.notes}</p>
        </div>
      )}
    </div>
  );
}
