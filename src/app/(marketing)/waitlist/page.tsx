import type { Metadata } from 'next';
import WaitlistForm from '@/components/marketing/WaitlistForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FlowCFO | Join the Waitlist',
  description:
    "Be first. Shape the product. Join the FlowCFO waitlist and we'll reach out personally to learn about your business before we build anything.",
  alternates: { canonical: 'https://flowcfo.net/waitlist' },
};

export default function WaitlistPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric Accents */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-flow-gold/10 rounded-full blur-[120px] pointer-events-none"
        id="blob-1"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-flow-gold/5 rounded-full blur-[150px] pointer-events-none"
        id="blob-2"
      ></div>

      <section className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="mx-auto w-full max-w-[800px] px-margin-mobile text-center">
          {/* Badge Illustration */}
          <div className="mb-12 inline-flex items-center gap-3 bg-white border border-flow-line px-6 py-3 shadow-sm transform hover:-translate-y-1 transition-transform duration-500">
            <div className="w-10 h-10 gold-gradient flex items-center justify-center text-flow-black">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
            </div>
            <div className="text-left">
              <p className="flow-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">
                Core Value Prop
              </p>
              <p className="font-mono text-sm font-bold text-flow-black">
                Safe-to-Spend™ Enabled
              </p>
            </div>
          </div>

          <h1 className="flow-headline-xl text-flow-black mb-6">
            Be first. Shape the product.
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-[600px] mx-auto mb-16 leading-relaxed">
            We&apos;re building FlowCFO with our early community — not for them.
            Join the waitlist and we&apos;ll reach out personally to learn about
            your business before we build anything.
          </p>

          {/* Conversion Form */}
          <div className="bg-white border border-flow-line p-8 md:p-12 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full gold-gradient"></div>
            <WaitlistForm />
          </div>

          <p className="mt-8 font-body text-xs text-outline">
            No spam. Unsubscribe anytime. Precision in Finances.
          </p>
        </div>
      </section>

      {/* Visual Anchor Section */}
      <section className="py-24 bg-flow-obsidian text-white">
        <div className="mx-48 max-w-[1440px] px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 text-left">
            <span className="flow-label text-flow-gold mb-4 block">
              INSTITUTIONAL TRUST
            </span>
            <h2 className="flow-headline-lg mb-6">
              Designed for those who value absolute technical accuracy.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-flow-gold">
                  account_balance
                </span>
                <p className="font-body text-base text-flow-muted">
                  Advanced liquidity forecasting powered by your real-time bank
                  data.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-flow-gold">
                  query_stats
                </span>
                <p className="font-body text-base text-flow-muted">
                  Precision reporting that removes the guesswork from scaling
                  decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 relative">
            <div className="aspect-video bg-white/5 border border-white/10 relative group overflow-hidden">
              <Image
                fill
                priority
                sizes="(min-width: 1440px) 1312px, calc(100vw - 32px)"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Dashboard Preview"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAx9O9QP6PDIxPXDT2j8Ar5PdZY8XOFdni6Bu7ket42qwakDMNUJDGInpUuGSNwn5akz8yuN0Z_SA6mV8aFAqCnEYS1QwlsIlI3Su1TB2NSq2iSP5WPPfgC7LV4RWnc3fVnLNkQYq3NMtPaSa-mM1JXC9vTaSix1mgSmNOAZ61oSH-xyCR8RMVL3RxOfOH-MFz6WorlmqM5ybBJy5cGDAfG96pDqau3Y-nlD_2zbS5kdEpnYHIjPaITPtR-TbihuVw6j2GwTWa7dka"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-flow-obsidian/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-left">
                  <p className="flow-label text-flow-gold mb-1 uppercase tracking-widest">
                    DASHBOARD PREVIEW
                  </p>
                  <p className="font-mono text-lg text-white">
                    The Precision Engine
                  </p>
                </div>
                <div className="w-12 h-12 bg-flow-gold text-flow-black flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
