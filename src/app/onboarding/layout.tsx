'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Loader2, ArrowRight } from 'lucide-react';
import { useUser, useUpdateUser } from '@/hooks/api/use-user';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading: isUserLoading, isError } = useUser();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const [hasAcceptedLocal, setHasAcceptedLocal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Show terms if user loaded and haven't accepted yet (and haven't accepted in current session)
  const showTerms = user ? !user.terms_accepted && !hasAcceptedLocal : false;

  useEffect(() => {
    if (isError) {
      router.push('/signin');
    }
  }, [isError, router]);

  useEffect(() => {
    if (user) {
      if (user.onboarding_completed) {
        router.push('/dashboard');
        return;
      }

      // Redirect to correct step if they are on the wrong page
      const currentStep = user.onboarding_step;
      const businessType = user.business_type;

      if (currentStep && businessType) {
        const stepMap: Record<string, string> = {
          step_1: 'step-2',
          step_2: 'step-3',
        };

        const targetStep = stepMap[currentStep];
        if (
          targetStep &&
          !pathname.includes(targetStep) &&
          !pathname.includes('step-1')
        ) {
          router.push(`/onboarding/${businessType}/${targetStep}`);
        }
      }
    }
  }, [user, pathname, router]);

  const handleAcceptTerms = () => {
    updateUser(
      { terms_accepted: true },
      {
        onSuccess: () => {
          setHasAcceptedLocal(true);
        },
      },
    );
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-flow-obsidian flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-flow-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flow-obsidian text-white selection:bg-flow-gold selection:text-flow-black">
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-flow-obsidian/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 md:px-16">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[-0.04em] text-flow-gold md:text-[32px]"
            >
              FlowCFO
            </Link>
          </div>
          <div className="hidden items-center space-x-12 md:flex">
            <button
              onClick={() => authClient.signOut().then(() => router.push('/'))}
              className="flow-label text-white/40 transition-colors hover:text-flow-gold"
            >
              SAVE & EXIT
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">{children}</main>

      {/* Terms & Conditions Overlay */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] bg-flow-obsidian/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-10 shadow-2xl">
            <h2 className="font-display text-3xl font-bold text-flow-black mb-6">
              Terms of Service
            </h2>
            <div className="prose prose-sm font-body text-on-surface-variant mb-8 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
              <p>
                By using FlowCFO, you agree to our Terms of Service and Privacy
                Policy.
              </p>
              <p>
                FlowCFO provides financial information and analysis tools. We do
                not provide regulated financial, investment, or tax advice.
                Consult a professional for specific decisions.
              </p>
              <p>
                Your data is protected with bank-grade encryption and will never
                be shared with third parties without your consent.
              </p>
            </div>
            <button
              onClick={handleAcceptTerms}
              disabled={isUpdatingUser}
              className="group relative flex w-full items-center justify-center gap-2 bg-flow-gold py-5 flow-label tracking-[0.2em] text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdatingUser ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  I AGREE & CONTINUE
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 h-screen w-1/2 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-flow-gold blur-[160px]"></div>
      </div>
    </div>
  );
}
