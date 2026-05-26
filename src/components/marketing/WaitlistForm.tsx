'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useJoinWaitlist } from '@/hooks/api/use-public';
import Image from 'next/image';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('freelancer');
  const [challenge, setChallenge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: joinWaitlist, isPending: isLoading } = useJoinWaitlist();

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [challenge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    joinWaitlist(
      { email, business_type: businessType, challenge },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : 'Failed to submit.');
        },
      },
    );
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-accent/20 bg-accent/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-8 w-8 text-accent" />
        <p className="mt-3 text-base font-semibold text-ink">
          You&apos;re on the list.
        </p>
        <p className="mt-1 text-sm text-body">
          We&apos;ll reach out personally.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-2">
            <label
              className="flow-label text-flow-black uppercase"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="ceo@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-flow-black p-0 pb-2 font-body text-base text-flow-black placeholder:text-outline focus:border-flow-gold transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label
              className="flow-label text-flow-black uppercase"
              htmlFor="business_type"
            >
              Business type
            </label>
            <div className="relative">
              <select
                id="business_type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-flow-black p-0 pb-2 font-body text-base text-flow-black appearance-none cursor-pointer outline-none focus:border-flow-gold transition-all"
              >
                <option value="freelancer">Freelancer</option>
                <option value="ecommerce">E-commerce</option>
                <option value="agency">Agency</option>
                <option value="restaurant">Restaurant</option>
                <option value="startup">Startup</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 bottom-2 pointer-events-none text-outline text-sm">
                expand_more
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            className="flow-label text-flow-black uppercase"
            htmlFor="challenge"
          >
            Your biggest financial challenge (Optional)
          </label>
          <textarea
            ref={textareaRef}
            id="challenge"
            placeholder="e.g., Managing variable seasonal cash flow..."
            value={challenge}
            onChange={(e) => {
              setChallenge(e.target.value);
              autoResize();
            }}
            rows={1}
            className="w-full bg-transparent border-0 border-b border-flow-black p-0 pb-2 font-body text-base text-flow-black placeholder:text-outline focus:border-flow-gold transition-all resize-none outline-none overflow-hidden"
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto gold-gradient text-flow-black px-10 py-4 flow-label font-bold tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                SUBMITTING...
              </span>
            ) : (
              'JOIN THE WAITLIST →'
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container overflow-hidden relative">
                <Image
                  fill
                  priority
                  className="object-cover"
                  alt="Community member"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVjeZEQJRQaDBTgO9U-JhAE_iyCJeZz_Uupi-grUrnKu1omfP8Tci_B25okfmSFn2juPG9csdgoNVvM35P-dUFqfRrRLZQ9a4Ss8GBEMMQz_S7eSKZW7UtK77CpycD8wTKQ3F1Uu7SSTc7aj6gMAntjutytw4eunxCVYqupelbmg5BR90o4-864I-jOuRU4_T_rwgltqxmuEyFQL4GamxXEtjF3lmbo31xDSgiWUdddUNir7KnVRCpQQ2xUdKbc8VP5j5WAGZoBznB"
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container overflow-hidden relative">
                <Image
                  fill
                  priority
                  className="object-cover"
                  alt="Community member"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgmWEtlFHdw_BOKbAiDwRJ5x_C__ZDyumxNOzMqnvs0hT49VrNEoPLKwCtRlc4qvU5_jiORf2FEwF6ye006FIhU80NLodDbY3CBNiXBqQg5S_Jd3uBGMDyx1Ubzs-XDzrxupNP5xCjSD6vi0uGgT6-J5GxZOETAIl8I__1LCOnTeLaP1mKqovSarlXzBeThf488Xj9-nYaMX-pf9ZKZHGFXAlCQ_Ixlp_s0mGE28eVn7SOaciFPjoPjBZnORX1C2BV1vLgNlBi5gis"
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-flow-black flex items-center justify-center text-[10px] text-white font-bold">
                +100
              </div>
            </div>
            <span className="font-body text-sm text-on-surface-variant">
              Already 100+ businesses waiting.
            </span>
          </div>
        </div>
      </form>
      <MicroInteractions />
    </>
  );
}

function MicroInteractions() {
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const blobs = document.querySelectorAll('#blob-1, #blob-2');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      blobs.forEach((blob, index) => {
        const shift = (index + 1) * 20;
        (blob as HTMLElement).style.transform =
          `translate(${x * shift}px, ${y * shift}px)`;
      });
    };
    document.addEventListener('mousemove', handleMouse);
    return () => document.removeEventListener('mousemove', handleMouse);
  }, []);

  return null;
}
