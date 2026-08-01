import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO for Startups — Burn Rate, Runway & Cash Flow',
  description:
    'AI CFO software for startups. Track burn rate, runway, cash flow forecasts, spend anomalies, tax reserves, and your real Safe-to-Spend number.',
  path: '/for-startups',
  image: '/og-startups.jpg',
  imageAlt: 'FlowCFO startup burn rate and runway dashboard',
  keywords: [
    'startup burn rate software',
    'runway forecasting tool',
    'startup cash flow dashboard',
    'AI CFO for startups',
  ],
});

export default function ForStartupsPage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold selection:text-flow-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-flow-black py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-4 md:px-16 lg:grid-cols-2">
          <div className="relative z-10">
            <span className="flow-label mb-4 block text-flow-gold-soft">
              FOR VENTURE-BACKED TEAMS
            </span>
            <h1 className="flow-headline-xl mb-6 text-white">
              Burn rate, runway, and absolute clarity.
            </h1>
            <p className="mb-10 max-w-lg font-body text-base text-flow-muted">
              The financial command center for venture-backed teams. Know
              exactly how much you can invest in growth without risking your
              runway.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="flow-label bg-flow-gold px-10 py-4 text-center text-lg font-bold text-flow-black transition-transform hover:scale-105"
              >
                Start Free
              </Link>
              <Link
                href="/features"
                className="flow-label border border-white/20 px-10 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-white/10"
              >
                View Demo
              </Link>
            </div>
            <p className="mt-6 font-body text-sm italic text-flow-muted">
              Startup beta opening soon.
            </p>
          </div>

          {/* Dashboard Visualization */}
          <div className="relative z-10 flex items-center justify-center lg:h-[500px]">
            <div className="obsidian-glass w-full max-w-xl rounded-lg border border-white/10 p-8 shadow-2xl">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="flow-label text-flow-muted">CURRENT RUNWAY</p>
                  <h2 className="flow-headline-lg text-flow-gold">
                    14.2 MONTHS
                  </h2>
                </div>
                <div className="text-right">
                  <p className="flow-label text-flow-muted">MONTHLY BURN</p>
                  <p className="flow-headline-lg text-white">$142,500</p>
                </div>
              </div>
              {/* Chart Placeholder */}
              <div className="mb-8 flex h-48 w-full items-end justify-between gap-2">
                {[40, 55, 70, 85, 65, 45, 95].map((height, i) => (
                  <div
                    key={i}
                    className="group relative w-full rounded-sm bg-flow-gold/20 transition-all hover:bg-flow-gold/40"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-black p-1 text-[10px] text-white group-hover:block">
                      Q{i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 bg-black/40 p-4">
                  <p className="flow-label mb-1 text-flow-muted">
                    SAFE TO SPEND
                  </p>
                  <p className="font-mono text-sm text-white">$45,000</p>
                </div>
                <div className="border border-white/5 bg-black/40 p-4">
                  <p className="flow-label mb-1 text-flow-muted">
                    PROFITABILITY GAP
                  </p>
                  <p className="font-mono text-sm text-rose">-$12,400</p>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-gold/5 blur-[120px]"></div>
          </div>
        </div>
        {/* Abstract Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(#D4AF37 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        ></div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-surface-container-lowest py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-20 text-center">
            <h2 className="flow-headline-lg mb-4 text-flow-black">
              The Gap Between &apos;Paper&apos; and Cash
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-on-surface-variant">
              Founders often fly blind, trapped between aggressive growth
              targets and the terrifying reality of a shrinking bank account.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-flow-line bg-white p-10 transition-colors hover:border-flow-black">
              <span className="material-symbols-outlined mb-6 text-4xl text-flow-black">
                trending_down
              </span>
              <h3 className="flow-headline-lg mb-4 text-2xl">
                Burn Rate Anxiety
              </h3>
              <p className="font-body text-base text-on-surface-variant">
                Stop second-guessing your monthly outlays. We calculate your
                true net burn in real-time, adjusted for seasonal variances and
                one-time expenses.
              </p>
            </div>
            <div className="border border-flow-line bg-white p-10 transition-colors hover:border-flow-black">
              <span className="material-symbols-outlined mb-6 text-4xl text-flow-black">
                timer
              </span>
              <h3 className="flow-headline-lg mb-4 text-2xl">
                Runway Uncertainty
              </h3>
              <p className="font-body text-base text-on-surface-variant">
                &quot;Do we have 6 months or 9?&quot; FlowCFO provides dynamic
                forecasting that updates with every transaction, giving you a
                precise date of zero cash.
              </p>
            </div>
            <div className="border border-flow-line bg-white p-10 transition-colors hover:border-flow-black">
              <span className="material-symbols-outlined mb-6 text-4xl text-flow-black">
                payments
              </span>
              <h3 className="flow-headline-lg mb-4 text-2xl">The Growth Gap</h3>
              <p className="font-body text-base text-on-surface-variant">
                Don&apos;t let paper profits fool you. We reconcile
                accrual-based accounting with actual cash-on-hand so you know
                what&apos;s liquid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Features Section */}
      <section className="overflow-hidden bg-white py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="order-2 lg:order-1 lg:w-1/2">
              <div className="space-y-12">
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-flow-black text-white">
                      <span className="material-symbols-outlined">
                        analytics
                      </span>
                    </div>
                    <h3 className="flow-headline-lg text-2xl">
                      90-Day Deep Forecast
                    </h3>
                  </div>
                  <p className="pl-16 font-body text-base text-on-surface-variant">
                    See around corners with predictive modeling that identifies
                    cash crunches before they happen. Perfect for timing your
                    next bridge round.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-flow-gold text-flow-black">
                      <span className="material-symbols-outlined">
                        account_balance_wallet
                      </span>
                    </div>
                    <h3 className="flow-headline-lg text-2xl">
                      &apos;Safe-to-Spend&apos; Intelligence
                    </h3>
                  </div>
                  <p className="pl-16 font-body text-base text-on-surface-variant">
                    Our proprietary algorithm calculates exactly how much
                    capital can be deployed into customer acquisition without
                    compromising your 18-month runway target.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-flow-black text-white">
                      <span className="material-symbols-outlined">sync</span>
                    </div>
                    <h3 className="flow-headline-lg text-2xl">
                      Real-Time Ledger Sync
                    </h3>
                  </div>
                  <p className="pl-16 font-body text-base text-on-surface-variant">
                    Connect your banks and ERP. FlowCFO bypasses the 2-week
                    delay of traditional bookkeeping, giving you a CFO&apos;s
                    view of today&apos;s balance.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:w-1/2">
              <div className="relative">
                <div className="relative overflow-hidden border border-flow-line shadow-xl">
                  <Image
                    alt="Startup Financial Dashboard"
                    width={800}
                    height={600}
                    className="h-auto w-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaeGzHXR1iV3LEXK-qX6kjDLbLQD8FJ-Y4fCEDl8UPG4oNrG4OY0q8cvMYr5kdbAlq4dZKU6ukyxkrpWKahGctqIe1-x6KMfkqVu4A16EvBbArVJk1ymLaHjAeXX1Hnrs9GISZAlwkqJO2xrgljKLd7HOtKXFUBFap7lVOSjsd_Cc3TDqpX50JZNCpD1vXhWeecPkZiMFuDfDqEdh3svs2EM4NRJwauZ1Bl9VX6hMfTYTBkvvAvhbwav1Hy498hzUkBo4KuO2Fco0P"
                  />
                </div>
                {/* Progress Bar Overlay */}
                <div className="absolute -bottom-8 -left-8 hidden w-64 border border-flow-line bg-white p-6 shadow-2xl md:block">
                  <p className="flow-label mb-2 text-on-surface-variant">
                    RUNWAY CONSERVATION
                  </p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                    <div
                      className="h-full bg-flow-gold"
                      style={{ width: '72%' }}
                    ></div>
                  </div>
                  <p className="mt-2 text-right font-mono text-sm text-flow-black">
                    72% OPTIMAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Quote */}
      <section className="bg-flow-black py-24 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-16">
          <span className="material-symbols-outlined mb-8 text-5xl text-flow-gold">
            format_quote
          </span>
          <blockquote className="flow-headline-lg mb-8 italic leading-relaxed text-white">
            &quot;I don&apos;t need another generic P&L. I want to know what I
            can safely spend without hurting my cash flow. FlowCFO is the first
            tool that speaks my language.&quot;
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-flow-gold">
              <Image
                alt="Sheryl V."
                fill
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsxoL2fTYYPJ_smEoxt__ASXCMfFJ2ZZBv29trpjlfAVOBuMDDGm6c7A8f7IZC8qcPih6N3mNFHW-wZa3oFdsaAbvKYyOGt0pI5cb2zS6zNDQScX7qkOrydjNlXGCn0JWvdCzzFFtERDTLJ8TjVF6yyvTYNCvwdpcQoab51Xo-7uJH-LqRCtTUIzbFc3kAMLyZATTZASLmfRXSxLAjpu9uS2x76nC56tah1Oa2v7HJzukcOhCaNs-D-24-c8ZXwGzbuobXUsWPzqES"
              />
            </div>
            <p className="text-lg font-bold">Sheryl V.</p>
            <p className="flow-label text-flow-muted">
              Founder, Velocity Health
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-flow-paper py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative flex flex-col items-center overflow-hidden bg-flow-black p-16 text-center md:p-24">
            <div className="relative z-10">
              <h2 className="flow-headline-xl mb-6 text-white">
                Ready for absolute financial clarity?
              </h2>
              <p className="mx-auto mb-10 max-w-xl font-body text-lg text-flow-muted">
                Join 200+ venture-backed teams waiting for the most precise
                financial intelligence platform ever built.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row justify-center">
                {/* <input
                  className="flex-grow border border-white/20 bg-transparent px-6 py-4 text-white outline-none focus:border-flow-gold"
                  placeholder="Enter founder email"
                  type="email"
                  required
                /> */}
                <Link
                  href="/signup"
                  className="bg-flow-gold px-8 py-4 font-bold text-flow-black transition-colors hover:bg-flow-gold-soft"
                >
                  Start Free
                </Link>
              </div>
              <p className="mt-4 font-body text-sm text-flow-muted">
                No credit card required. Startup beta opening soon.
              </p>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-flow-gold/10 blur-[80px]"></div>
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-[80px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
