'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const plans = [
  {
    name: 'STARTER',
    price: '19',
    description:
      'Perfect for solo operators and freelancers who need absolute clarity on their cash and automated tax reserves.',
    features: [
      '30-Day Cash Flow Forecast',
      'Tax Reserve + Reminders',
      'Unlimited CSV Uploads',
      'Teller Connect (Up to 2 accts)',
      'AI Advisor (20 Qs/mo)',
    ],
    cta: 'SELECT STARTER',
    popular: false,
  },
  {
    name: 'PRO',
    price: '49',
    description:
      'Our most powerful suite for high-growth brands and e-commerce sellers scaling with precision.',
    features: [
      '90-Day Cash Flow Forecast',
      'Real-Time Margin Monitor',
      'Plaid Connect (Up to 5 accts)',
      'Unlimited AI Advisor',
      'Advanced Custom Alerts',
    ],
    cta: 'START PRO TRIAL',
    popular: true,
  },
  {
    name: 'BUSINESS',
    price: '99',
    description:
      'Designed for agencies and multi-entity operations that need unified financial intelligence.',
    features: [
      'Multi-Entity Management',
      'Consolidated Forecasting',
      'Unlimited Plaid & Teller',
      '5 Team Seats Included',
      'API Access & White-Label',
    ],
    cta: 'SELECT BUSINESS',
    popular: false,
  },
];

const faqs = [
  {
    q: 'HOW SECURE IS MY FINANCIAL DATA?',
    a: 'We use bank-level 256-bit AES encryption and SOC 2 Type II compliant infrastructure. FlowCFO never stores your bank credentials; we use secure, read-only API tokens via Plaid to monitor your transactions without ever having access to move funds.',
  },
  {
    q: 'CAN I CANCEL MY SUBSCRIPTION ANYTIME?',
    a: 'Yes. We believe in earning your trust every month. There are no long-term contracts for our Freelancer and Founder tiers. You can cancel through your dashboard settings with a single click.',
  },
  {
    q: 'IS THIS A REPLACEMENT FOR MY CPA?',
    a: "FlowCFO is your daily financial command center, not a replacement for professional tax filing. We provide the real-time data and 'Safe-to-Spend' clarity your CPA wish you had. We actually make their job easier by providing clean, categorized reports.",
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-flow-paper selection:bg-flow-gold selection:text-flow-black">
      {/* Section 1: Value-First Hero */}
      <section className="relative flex min-h-[716px] flex-col items-center justify-center overflow-hidden bg-flow-obsidian px-4 text-center text-white md:px-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="flow-label mb-6 block tracking-widest text-flow-gold">
            FINANCIAL INTELLIGENCE FOR BUILDERS
          </span>
          <h1 className="flow-headline-xl mb-8 leading-tight">
            The financial command center for founders who refuse to fly blind.
          </h1>
          <p className="mx-auto mb-12 max-w-2xl font-body text-base text-flow-muted">
            Traditional accounting is reactive. FlowCFO is your proactive CFO,
            ensuring you know exactly what you can spend, save, and invest
            before you make the move.
          </p>
          <div className="flex flex-col justify-center gap-6 md:flex-row">
            <Link
              href="/waitlist"
              className="flow-label bg-flow-gold px-12 py-5 font-bold text-flow-black transition-transform hover:scale-105"
            >
              JOIN THE WAITLIST
            </Link>
            <Link
              href="/features"
              className="flow-label border border-white px-12 py-5 text-white transition-all hover:bg-white hover:text-flow-black"
            >
              EXPLORE FEATURES
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Cassie Quote */}
      <section className="border-b border-flow-line bg-white py-32">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-4 md:flex-row md:px-16">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden border border-flow-line grayscale transition-all duration-700 hover:grayscale-0">
                <Image
                  alt="Cassie V. - E-commerce Founder"
                  fill
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLslxl13rxOaaAbeEdDvGi7XsOMOI5aNDHEKbSols0jM2OFjw1M56svfUbK1yz400Nbkqjt_d8fHda1YiHyifJXbBhrz9sOD1nCgGlPodeYeIWuHWeCBs0av2cBViYQ_oGjHeKrhTLZBP0QJjB2NbH7Aib0MkhO2qJwBiWl_QDStLI-yKPrYN66DWdDRPdgABq_CCJ_Eu-mt3V1Ke1-W4IAB3Skaijso7q_kQ1j824hHVKxyVm6kP-htHrQbwr5lYA3-1_Re2AgrFr"
                />
              </div>
              <div className="flow-label absolute -bottom-4 -right-4 bg-flow-gold p-6 font-bold text-flow-black">
                VERIFIED FOUNDER
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <span className="material-symbols-outlined mb-6 text-6xl text-flow-gold">
              format_quote
            </span>
            <blockquote className="flow-headline-lg mb-8 italic leading-snug text-flow-black">
              &quot;The mental bandwidth I reclaimed after offloading my margin
              monitoring to FlowCFO is immeasurable. It&apos;s not just about
              the tax reserves; it&apos;s the absolute certainty that I can
              afford my next inventory run without risking my runway.&quot;
            </blockquote>
            <div>
              <p className="flow-label font-bold text-flow-black">CASSIE V.</p>
              <p className="font-body text-sm text-on-surface-variant">
                Founder, Oraphim Shungite (E-commerce)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing Cards */}
      <section className="bg-flow-paper py-32">
        <div className="mx-auto max-w-[1440px] px-4 md:px-16">
          <div className="mb-24 text-center">
            <span className="flow-label mb-4 block text-secondary-design">
              PRICING PLANS
            </span>
            <h2 className="flow-headline-xl text-flow-black">
              A Plan for Every Growth Stage
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`flex flex-col border p-10 transition-all ${
                  plan.popular
                    ? 'relative scale-105 border-flow-obsidian bg-flow-obsidian shadow-2xl'
                    : 'border-flow-line bg-white hover:border-flow-obsidian'
                }`}
              >
                {plan.popular && (
                  <div className="flow-label absolute right-0 top-0 bg-flow-gold px-4 py-1 text-[10px] font-bold text-flow-black">
                    MOST POPULAR
                  </div>
                )}
                <h3
                  className={`flow-label mb-2 ${
                    plan.popular ? 'text-flow-gold' : 'text-on-surface-variant'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span
                    className={`font-mono text-2xl ${
                      plan.popular ? 'text-white' : 'text-flow-black'
                    }`}
                  >
                    $
                  </span>
                  <span
                    className={`flow-headline-xl ${
                      plan.popular ? 'text-white' : 'text-flow-black'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`font-body text-sm ${
                      plan.popular
                        ? 'text-flow-muted'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    /mo
                  </span>
                </div>
                <p
                  className={`mb-10 min-h-[72px] font-body text-base ${
                    plan.popular ? 'text-flow-muted' : 'text-on-surface-variant'
                  }`}
                >
                  {plan.description}
                </p>
                <ul
                  className={`mb-12 flex-grow space-y-4 ${
                    plan.popular ? 'text-white' : 'text-flow-black'
                  }`}
                >
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-flow-gold" />
                      <span className="font-body text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/waitlist"
                  className={`flow-label w-full py-4 text-center font-bold transition-all ${
                    plan.popular
                      ? 'bg-flow-gold text-flow-black hover:bg-white'
                      : 'border border-flow-black text-flow-black hover:bg-flow-black hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: FAQ Section */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="flow-headline-lg mb-4 text-flow-black">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-flow-gold"></div>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-flow-line pb-8">
                <button
                  className="group flex w-full items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="flow-label font-bold text-flow-black transition-colors group-hover:text-flow-gold">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`mt-4 font-body text-base text-on-surface-variant ${
                    openFaq === i ? 'block' : 'hidden'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
