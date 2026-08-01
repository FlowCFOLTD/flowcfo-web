import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO for Ecommerce — Margin Monitoring & Cash Flow',
  description:
    'AI financial agents for ecommerce brands. Monitor gross margin, COGS, platform fees, inventory cash flow, payouts, VAT, and Safe-to-Spend before you restock.',
  path: '/for-ecommerce',
  image: '/og-ecommerce.jpg',
  imageAlt: 'FlowCFO ecommerce margin monitoring dashboard',
  keywords: [
    'ecommerce cash flow software',
    'Shopify margin monitoring',
    'Amazon seller profit tracking',
    'ecommerce Safe-to-Spend',
    'platform fee audit',
  ],
});

export default function ForEcommercePage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold selection:text-flow-black">
      {/* Hero Section */}
      <header className="relative overflow-hidden px-4 pb-24 pt-40 md:px-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="flow-label mb-4 block text-flow-gold">
              AI-POWERED FINANCIAL CLARITY
            </span>
            <h1 className="flow-headline-xl mb-6 leading-tight text-flow-black">
              Know your real margin.
              <br />
              <span className="text-flow-gold">
                Before you launch that product.
              </span>
            </h1>
            <p className="mb-10 max-w-xl font-body text-lg text-on-surface-variant">
              Stop guessing. FlowCFO provides real-time clarity on your
              e-commerce margins, accounting for platform fees, shipping costs,
              and inventory carrying costs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="flow-label bg-flow-gold px-8 py-4 text-center text-sm font-bold text-flow-black transition-transform active:scale-95"
              >
                Start free
              </Link>
              <Link
                href="/demo"
                className="flow-label border border-flow-black px-8 py-4 text-center text-sm font-bold text-flow-black transition-all hover:bg-flow-black hover:text-white"
              >
                View Demo
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="border border-flow-line bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <span className="flow-label text-on-surface-variant">
                  Live Margin Monitor
                </span>
                <span className="material-symbols-outlined text-flow-gold">
                  trending_up
                </span>
              </div>
              <div className="space-y-6">
                <div className="h-2 w-full overflow-hidden bg-surface-container">
                  <div className="h-full w-3/4 bg-flow-gold"></div>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm">
                    Current Product Margin
                  </span>
                  <span className="font-mono text-xl font-medium text-flow-black">
                    34.2%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-flow-line pt-4">
                  <div>
                    <span className="flow-label block mb-1 text-[10px]">
                      REAL-TIME COGS
                    </span>
                    <span className="font-mono text-sm">$14,203.00</span>
                  </div>
                  <div>
                    <span className="flow-label block mb-1 text-[10px]">
                      EST. TAX LIABILITY
                    </span>
                    <span className="font-mono text-sm text-rose">
                      $3,120.45
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 -z-10 h-64 w-64 border border-flow-gold opacity-20"></div>
          </div>
        </div>
      </header>

      {/* Key Problems Section */}
      <section className="bg-surface-container py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16">
            <h2 className="flow-headline-lg mb-2 text-flow-black">
              The Profit Leak
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              Three critical blindspots that drain e-commerce growth.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Problem 1 */}
            <div className="group border-t border-flow-black pt-8">
              <span className="mb-4 block font-mono text-xl font-medium text-flow-gold">
                01
              </span>
              <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                Pricing new products
              </h3>
              <p className="mb-6 font-body text-base text-on-surface-variant">
                Most founders price based on competitors, not on their actual
                unit economics including shipping volatility and ad spend creep.
              </p>
              <span className="material-symbols-outlined text-flow-black transition-transform group-hover:translate-x-2">
                arrow_forward
              </span>
            </div>
            {/* Problem 2 */}
            <div className="group border-t border-flow-black pt-8">
              <span className="mb-4 block font-mono text-xl font-medium text-flow-gold">
                02
              </span>
              <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                Restocking inventory
              </h3>
              <p className="mb-6 font-body text-base text-on-surface-variant">
                Cash flow gets trapped in stock. Without institutional-grade
                forecasting, you&apos;re either overstocked or losing sales to
                out-of-stock.
              </p>
              <span className="material-symbols-outlined text-flow-black transition-transform group-hover:translate-x-2">
                arrow_forward
              </span>
            </div>
            {/* Problem 3 */}
            <div className="group border-t border-flow-black pt-8">
              <span className="mb-4 block font-mono text-xl font-medium text-flow-gold">
                03
              </span>
              <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                Margin clarity
              </h3>
              <p className="mb-6 font-body text-base text-on-surface-variant">
                Gross margin is a vanity metric. FlowCFO reveals your
                Contribution Margin 2 and 3—what&apos;s actually hitting the
                bank.
              </p>
              <span className="material-symbols-outlined text-flow-black transition-transform group-hover:translate-x-2">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section (Bento Grid) */}
      <section className="bg-white py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="flow-label text-flow-gold">OUR SOLUTION</span>
            <h2 className="flow-headline-lg mt-4 text-flow-black">
              Precision tools for the modern e-commerce operator.
            </h2>
          </div>
          <div className="grid h-auto grid-cols-1 gap-8 md:h-[600px] md:grid-cols-12">
            {/* Main Solution Card */}
            <div className="relative flex flex-col justify-between overflow-hidden p-12 md:col-span-7">
              <div className="relative z-10">
                <span className="flow-label text-flow-gold">
                  FLAGSHIP FEATURE
                </span>
                <h3 className="flow-headline-xl mb-6 mt-4">
                  Margin-aware Safe-to-Spend™
                </h3>
                <p className="max-w-md font-body text-base text-flow-muted">
                  Our proprietary algorithm calculates exactly how much you can
                  reinvest into marketing or inventory without compromising your
                  runway.
                </p>
              </div>
              <div className="relative z-10 mt-12 flex items-end justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-flow-gold">
                    <span className="material-symbols-outlined text-flow-black">
                      verified_user
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-sm">$240,000</span>
                    <span className="flow-label text-[10px] opacity-60">
                      SAFE TO DEPLOY
                    </span>
                  </div>
                </div>
              </div>
              {/* Background texture/pattern */}
              <div className="absolute bottom-0 right-0 scale-150 opacity-10">
                <span className="material-symbols-outlined text-[300px]">
                  finance_chip
                </span>
              </div>
            </div>
            {/* Right Column Stack */}
            <div className="flex flex-col gap-8 md:col-span-5">
              {/* Pricing Calculator */}
              <div className="flex flex-1 flex-col justify-center border border-flow-line p-8 transition-colors hover:border-flow-gold">
                <span className="material-symbols-outlined mb-4 text-flow-gold">
                  calculate
                </span>
                <h4 className="mb-2 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Pricing calculator
                </h4>
                <p className="font-body text-sm text-on-surface-variant">
                  Simulate price increases and see the immediate impact on your
                  net profit.
                </p>
              </div>
              {/* Fee Audit Alerts */}
              <div className="flex flex-1 flex-col justify-center border border-transparent bg-surface-container p-8 transition-colors hover:border-flow-black">
                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose">
                    warning
                  </span>
                  <span className="flow-label text-rose">PRIORITY ALERT</span>
                </div>
                <h4 className="mb-2 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Fee audit alerts
                </h4>
                <p className="font-body text-sm text-on-surface-variant">
                  Instant notifications when platform fees exceed expected
                  thresholds or unusual charges appear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-flow-black py-24 text-white">
        <div className="flow-container flex flex-col items-center gap-16 md:flex-row">
          <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden grayscale">
            <Image
              alt="Cassie - E-commerce Founder"
              fill
              className="object-cover brightness-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD74HwnmPD8EEnLU1I8daMKgKrde76SLeMFzl2ElYDQ7W4um-QwS8zohBwFYULNueYFmXKXJdd5TR1vdvZ7RscCGkodUv0zxBb7JI6X7fn8e1hqt2EBNIS8QEF-bF4PioN5pKjJ6ZqqyvQaWJvE_TEb8XoVSD-tuQ8cUQ7XAeXMqC-3hrtiVTlKCTzJID0ibQ5-joGf77IUOzN5M-xQ3BN4LoQB9RvrTw9RAIHL3dRLttaaKWrHMyTveRJN26CsWeJDfGM_uXVdlvn"
            />
          </div>
          <div className="max-w-3xl">
            <span className="material-symbols-outlined mb-6 text-5xl text-flow-gold">
              format_quote
            </span>
            <blockquote className="flow-headline-lg mb-8 leading-relaxed text-white">
              &quot;FlowCFO changed how we view our growth. We stopped chasing
              revenue and started chasing real profit. The margin clarity is
              unlike anything we&apos;ve used before.&quot;
            </blockquote>
            <cite className="not-italic block">
              <span className="flow-label block text-flow-gold">CASIE R.</span>
              <span className="font-body text-sm opacity-60">
                FOUNDER, NOIR ESSENTIALS
              </span>
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-32 text-center md:px-16">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="flow-headline-xl mb-8 text-flow-black">
            Ready for real margin clarity?
          </h2>
          <p className="mb-12 font-body text-lg text-on-surface-variant">
            Create your account for free and connect your bank. Early e-commerce
            users get full access to margin monitoring, fee audits, and
            Safe-to-Spend.
          </p>
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/signup"
              className="flow-label bg-flow-black px-8 py-4 text-white transition-transform active:scale-95"
            >
              Start free
            </Link>
          </div>
        </div>
        {/* Abstract geometry */}
        <div className="absolute left-0 top-1/2 h-px w-64 -translate-y-1/2 bg-flow-gold opacity-30"></div>
        <div className="absolute right-0 top-1/2 h-px w-64 -translate-y-1/2 bg-flow-gold opacity-30"></div>
      </section>
    </div>
  );
}
