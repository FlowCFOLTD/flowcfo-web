'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { sections } from '@/lib/terms-content';
import { useSetupUser } from '@/hooks/api/use-user';

export default function AcceptTerms({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const setupUser = useSetupUser();

  useEffect(() => {
    if (!token) {
      router.push('/signin');
    }
  }, [token, router]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 5;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
      setHasScrolledToBottom(true);
    }
  }, []);

  const handleAccept = async () => {
    if (!token) return;
    setIsAccepting(true);
    setError(null);

    try {
      await setupUser.mutateAsync({ terms_accepted: true });
      toast.success('Terms accepted');
      router.push('/onboarding');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong',
      );
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="min-h-screen bg-flow-paper">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-3xl text-flow-gold"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="font-display text-2xl font-bold tracking-tighter text-flow-black">
              FlowCFO
            </span>
          </Link>
          {email && (
            <span className="font-mono text-sm text-on-surface-variant">
              {email}
            </span>
          )}
        </div>

        <div className="mb-4">
          <h1 className="font-display text-3xl font-bold text-flow-black mb-2">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Please read the following terms carefully. Scroll to the bottom to accept.
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[60vh] overflow-y-auto border border-flow-line bg-white p-8 shadow-sm mb-6"
        >
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id}>
                <h3 className="flow-headline-lg mb-4 flex items-center gap-3 text-flow-black">
                  <span className="font-mono text-lg text-flow-gold">{section.num}.</span>
                  {section.label}
                </h3>
                {section.content}
              </section>
            ))}

            <section>
              <h4 className="flow-headline-lg mb-4 text-flow-black">
                Contact Information
              </h4>
              <p className="mb-6 font-body text-base text-on-surface-variant">
                For legal inquiries, formal notices, or questions regarding these
                terms, please contact our legal department:
              </p>
              <span className="flow-label text-flow-gold">Legal Department</span>
              <br />
              <a
                href="mailto:legal@flowcfo.net"
                className="font-mono text-lg text-flow-black underline underline-offset-4 hover:text-flow-gold"
              >
                legal@flowcfo.net
              </a>
            </section>

            <div id="accept-anchor" className="pt-4" />
          </div>
        </div>

        {!hasScrolledToBottom && (
          <p className="text-center font-body text-xs text-on-surface-variant mb-4">
            Scroll to the bottom to enable acceptance
          </p>
        )}

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 p-4 text-red-600 text-sm font-body text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleAccept}
          disabled={!hasScrolledToBottom || isAccepting}
          className="group flex w-full items-center justify-center gap-3 bg-flow-gold px-8 py-5 font-bold uppercase tracking-widest text-flow-black transition-all duration-300 hover:bg-flow-gold-soft active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAccepting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Accept Terms & Continue
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
