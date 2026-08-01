import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO for Agencies — Cash Flow & Client Profitability',
  description:
    'AI CFO software for agencies. Track client profitability, retainers, payroll timing, revenue concentration, cash flow, tax reserves, and Safe-to-Spend.',
  path: '/for-agencies',
  image: '/og-agencies.jpg',
  imageAlt: 'FlowCFO agency profitability dashboard',
  keywords: [
    'agency cash flow software',
    'client profitability tracking',
    'agency financial dashboard',
    'agency Safe-to-Spend',
  ],
});

export default function ForAgenciesPage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold selection:text-flow-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32 md:px-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="z-10">
            <span className="flow-label mb-4 block text-flow-gold">
              PRIVATE WEALTH ARCHITECTURE
            </span>
            <h1 className="flow-headline-xl mb-6 max-w-xl text-flow-black">
              Your agency looks profitable on paper.{' '}
              <span className="text-flow-gold">FlowCFO</span> shows you if it
              actually is.
            </h1>
            <p className="mb-10 max-w-lg font-body text-base text-on-surface-variant">
              Go beyond traditional bookkeeping. We provide institutional-grade
              cash flow modeling specifically for high-growth agencies managing
              complex payroll and retainer cycles.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="flow-label bg-flow-gold px-8 py-4 text-center font-bold text-flow-black transition-all hover:opacity-90"
              >
                Start free
              </Link>
              <Link
                href="/about"
                className="flow-label border border-flow-black px-8 py-4 text-center text-flow-black transition-all hover:bg-flow-black hover:text-white"
              >
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="luxury-shadow group relative aspect-video w-full overflow-hidden border-4 border-white bg-flow-black">
              <Image
                alt="Agency Performance"
                fill
                priority
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN-CuLh6KRcnqWUrhEl9aDvuoCu8BfFJNtZYcwDwz7i5bAEclkOVShnxBb1xwIdkvZjx4bP1PsaQUtCajSo_DM2ThC8M1wX-kevOrNwUeS-lAWGb1-OkrVOkQpcXch81wSVLMT2uq1hGjxRlefIxjya_lOLPrFdUZIcMyH0JsU6DigqbAqrwI9em7MZklMiq4sSgR_t6WbG4sYv1WG38ECmNYPXmOlZPHHLwEGrP90NS2_j78VGhxsLLlE4xlkuIER1793O6Ah2oVT"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-flow-gold"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                  <span className="font-mono text-sm text-white">
                    +24.8% Net Margin Visibility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Bento Grid */}
      <section className="bg-white py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 text-center">
            <span className="flow-label text-flow-gold">THE AGENCY GAP</span>
            <h2 className="flow-headline-lg mt-2 text-flow-black">
              Why &quot;Profitable&quot; agencies go broke.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Late Client Payments */}
            <div className="group flex flex-col justify-between border border-flow-line p-10 transition-colors hover:border-flow-gold">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-flow-black transition-colors group-hover:text-flow-gold">
                  timer
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Late Client Payments
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Accrual accounting says you earned it. Your bank account says
                  otherwise. We bridge the gap between &quot;Invoiced&quot; and
                  &quot;Available&quot;.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line pt-8">
                <div className="flex items-center justify-between">
                  <span className="flow-label">CASH DRAG</span>
                  <span className="font-mono text-sm text-rose">
                    42 Days Avg.
                  </span>
                </div>
              </div>
            </div>
            {/* Payroll Timing */}
            <div className="group flex flex-col justify-between bg-flow-black p-10">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-flow-gold">
                  groups
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-white">
                  Payroll Timing
                </h3>
                <p className="font-body text-sm text-flow-muted">
                  Your biggest expense is non-negotiable. We simulate payroll
                  impact against collection cycles to ensure you&apos;re never
                  caught thin.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line-dark pt-8">
                <div className="flex items-center justify-between">
                  <span className="flow-label text-flow-muted">
                    LIQUIDITY SCORE
                  </span>
                  <span className="font-mono text-sm text-flow-gold">
                    98/100
                  </span>
                </div>
              </div>
            </div>
            {/* Retainer Churn */}
            <div className="group flex flex-col justify-between border border-flow-line p-10 transition-colors hover:border-flow-gold">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-flow-black transition-colors group-hover:text-flow-gold">
                  sync_problem
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Retainer Churn
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Predict the ripple effect of losing a marquee client before it
                  happens. Model your survival and growth runways in seconds.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line pt-8">
                <div className="flex items-center justify-between">
                  <span className="flow-label">RUNWAY IMPACT</span>
                  <span className="font-mono text-sm text-rose">-6 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Data Grid */}
      <section className="bg-surface-container-low py-24 px-4 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="lg:w-1/2">
              <h2 className="flow-headline-lg mb-6 text-flow-black">
                Financial clarity for the modern partner.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-fit bg-flow-black p-2">
                    <span className="material-symbols-outlined text-white">
                      verified
                    </span>
                  </div>
                  <div>
                    <h4 className="flow-label mb-1 text-flow-black">
                      REAL-TIME VISIBILITY
                    </h4>
                    <p className="font-body text-sm text-on-surface-variant">
                      Direct integration with Quickbooks, Xero, and 12,000+
                      banks for a single source of truth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-fit bg-flow-black p-2">
                    <span className="material-symbols-outlined text-white">
                      query_stats
                    </span>
                  </div>
                  <div>
                    <h4 className="flow-label mb-1 text-flow-black">
                      SCENARIO MODELING
                    </h4>
                    <p className="font-body text-sm text-on-surface-variant">
                      &quot;What if we hire 3 designers?&quot; or &quot;What if
                      Client X delays by 30 days?&quot; Solve with one click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="overflow-hidden border border-flow-line bg-white shadow-sm">
                <div className="bg-flow-black px-6 py-4">
                  <h3 className="flow-label text-white">
                    CASH FLOW PROJECTION (Q4)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-flow-line">
                        <th className="flow-label p-6 text-on-surface-variant">
                          Metric
                        </th>
                        <th className="flow-label p-6 text-on-surface-variant">
                          October
                        </th>
                        <th className="flow-label p-6 text-on-surface-variant">
                          November
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-flow-line transition-colors hover:bg-flow-paper">
                        <td className="p-6 font-body text-sm font-bold text-flow-black">
                          Projected Revenue
                        </td>
                        <td className="p-6 font-mono text-sm text-flow-black">
                          $245,000
                        </td>
                        <td className="p-6 font-mono text-sm text-flow-black">
                          $210,000
                        </td>
                      </tr>
                      <tr className="border-b border-flow-line transition-colors hover:bg-flow-paper">
                        <td className="p-6 font-body text-sm font-bold text-flow-black">
                          Payroll & Ops
                        </td>
                        <td className="p-6 font-mono text-sm text-rose">
                          ($120,000)
                        </td>
                        <td className="p-6 font-mono text-sm text-rose">
                          ($120,000)
                        </td>
                      </tr>
                      <tr className="bg-surface-container-lowest">
                        <td className="p-6 font-body text-sm font-bold text-flow-black">
                          Net Position
                        </td>
                        <td className="p-6 font-mono text-sm font-bold text-emerald">
                          $125,000
                        </td>
                        <td className="p-6 font-mono text-sm font-bold text-emerald">
                          $90,000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-surface-container p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-flow-gold"></div>
                    <span className="font-body text-sm italic text-on-surface-variant">
                      Simulated: Lost retainer &apos;Client Alpha&apos; in Nov.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 md:px-16">
        <div className="relative mx-auto max-w-4xl overflow-hidden bg-flow-black px-10 py-20 text-center">
          <div className="gold-gradient absolute right-0 top-0 h-32 w-32 opacity-10 blur-3xl"></div>
          <div className="gold-gradient absolute bottom-0 left-0 h-64 w-64 opacity-5 blur-3xl"></div>
          <h2 className="flow-headline-xl relative z-10 mb-8 text-white">
            Stop guessing. <br />
            Start scaling.
          </h2>
          <p className="relative z-10 mx-auto mb-10 max-w-xl font-body text-base text-flow-muted">
            Join the exclusive waitlist for FlowCFO. Limited intake for our next
            cohort of high-net-worth agency partners.
          </p>
          <div className="relative z-10 flex flex-col justify-center gap-4 md:flex-row">
            {/* <input
              className="w-full border border-flow-line-dark bg-transparent px-6 py-4 font-mono text-xs uppercase tracking-[0.08em] text-white outline-none focus:border-flow-gold md:w-80"
              placeholder="ENTER EMAIL"
              type="email"
              required
            /> */}
            <Link
              href="/signup"
              className="flow-label bg-flow-gold px-10 py-4 font-bold text-flow-black transition-all hover:scale-105"
            >
              START FREE
            </Link>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-flow-muted">
            Institutional Privacy Standards Guaranteed
          </p>
        </div>
      </section>

      {/* Support FAB */}
      <button className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center bg-flow-black text-white shadow-2xl transition-colors hover:bg-flow-gold group">
        <span className="material-symbols-outlined transition-transform group-hover:scale-110">
          support_agent
        </span>
      </button>
    </div>
  );
}
