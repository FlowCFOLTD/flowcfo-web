import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO for Restaurants — Food Cost & Cash Flow Clarity',
  description:
    'Restaurant financial software for food cost, labor cost, daily revenue, tax reserves, cash flow forecasting, and Safe-to-Spend decisions.',
  path: '/for-restaurants',
  image: '/og-restaurants.jpg',
  imageAlt: 'FlowCFO restaurant food cost and daily revenue dashboard',
  keywords: [
    'restaurant cash flow software',
    'restaurant food cost tracking',
    'restaurant labor cost dashboard',
    'restaurant financial forecasting',
  ],
});

export default function ForRestaurantsPage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold selection:text-flow-black">
      {/* Hero Section */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-16 px-4 py-20 pt-40 md:grid-cols-2 md:px-16">
        <div className="space-y-8">
          <span className="flow-label block tracking-[0.2em] text-on-surface-variant">
            Private Wealth Management for Restaurateurs
          </span>
          <h1 className="flow-headline-xl text-flow-obsidian">
            You know every ingredient cost. Now know your financial health just
            as clearly.
          </h1>
          <p className="max-w-lg font-body text-base text-on-surface-variant">
            FlowCFO translates the chaos of restaurant operations into
            institutional-grade financial clarity. Control inflation, optimize
            labor, and scale with absolute confidence.
          </p>
          <div className="flex gap-4">
            <Link
              href="/waitlist"
              className="flow-label bg-flow-gold px-10 py-4 font-bold text-flow-obsidian transition-all hover:brightness-110"
            >
              Join Waitlist
            </Link>
            <Link
              href="/features"
              className="flow-label border border-flow-obsidian px-10 py-4 text-flow-obsidian transition-all hover:bg-flow-obsidian hover:text-white"
            >
              View Demo
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="champagne-gradient absolute inset-0 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 w-full border border-flow-line bg-white shadow-2xl">
            <Image
              alt="Restaurant Financial Dashboard"
              width={800}
              height={600}
              priority
              className="h-auto w-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzSq68cYvREl2cBEejvBhSyOqT5SQiZfsnhf3QESXdhNHYDHBo0ymerrxxe6c_UNcnYVF-bEV-yKICXHzHGnq40rldGsIskFBHzrEkjd-z5u7XGYADRPWqyj6Gr2sFztCG2j4beZgZ_PIoGJ2JRIR1nVJ07kKPnMcErokYGIiVkCFOwz0HkT3Hv-U6G_JaitEJdtxmwtEiOsF-WHQ_PhMWUrzhI7HRBFZAeTwLJLITE4FL8xRLRf1y_V0JZj9nK6b5QOZwvREpHFpz"
            />
          </div>
        </div>
      </section>

      {/* Bento Pain Points Grid */}
      <section className="bg-flow-obsidian py-32">
        <div className="mx-auto max-w-[1440px] px-4 md:px-16">
          <div className="mb-16">
            <h2 className="flow-headline-lg mb-4 text-white">
              Precision in an Unpredictable Market
            </h2>
            <p className="max-w-xl font-body text-base text-on-surface-variant">
              Standard accounting isn&apos;t enough for the kitchen. We tackle
              the three pillars that break restaurant margins.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Pain Point 1 */}
            <div className="flex h-[400px] flex-col justify-between border border-flow-line-dark bg-primary-container p-10 transition-colors duration-500 hover:border-flow-gold">
              <span
                className="material-symbols-outlined text-4xl text-flow-gold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                trending_up
              </span>
              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">
                  Ingredient Inflation
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Real-time cost tracking against menu pricing. Detect margin
                  erosion before it impacts your bottom line.
                </p>
              </div>
            </div>
            {/* Pain Point 2 */}
            <div className="flex h-[400px] flex-col justify-between border border-flow-line-dark bg-primary-container p-10 transition-colors duration-500 hover:border-flow-gold">
              <span
                className="material-symbols-outlined text-4xl text-flow-gold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                schedule
              </span>
              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">
                  Labor Optimization
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Dynamic staff hour modeling based on historical traffic
                  patterns and forecasted demand. Stop overstaffing the lulls.
                </p>
              </div>
            </div>
            {/* Pain Point 3 */}
            <div className="flex h-[400px] flex-col justify-between border border-flow-line-dark bg-primary-container p-10 transition-colors duration-500 hover:border-flow-gold">
              <span
                className="material-symbols-outlined text-4xl text-flow-gold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                domain_add
              </span>
              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-white">
                  Expansion Safety
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Sophisticated cash-flow projections for second and third
                  locations. Know exactly when you have the capital to grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization / Feature Section */}
      <section className="mx-auto max-w-[1440px] px-4 py-32 md:px-16">
        <div className="grid items-center gap-24 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="border border-flow-line bg-white p-8">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="flow-label text-on-surface-variant">
                    MONTHLY CASH POSITION
                  </p>
                  <h4 className="font-mono text-2xl font-medium text-flow-obsidian">
                    $482,930.00
                  </h4>
                </div>
                <div className="text-right">
                  <span className="bg-flow-forest/10 px-2 py-1 font-mono text-[10px] text-flow-forest">
                    +12.4%
                  </span>
                </div>
              </div>
              <div className="flex h-64 items-end gap-2">
                <div className="h-1/2 w-full bg-flow-line"></div>
                <div className="h-3/4 w-full bg-flow-line"></div>
                <div className="h-2/3 w-full bg-flow-line"></div>
                <div className="h-[90%] w-full bg-flow-gold"></div>
                <div className="h-full w-full bg-flow-obsidian"></div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-flow-line pt-8">
                <div>
                  <p className="flow-label text-[10px] text-on-surface-variant">
                    COGS RATIO
                  </p>
                  <p className="font-mono text-sm">
                    28.4%{' '}
                    <span className="text-[10px] text-flow-forest">
                      Optimal
                    </span>
                  </p>
                </div>
                <div>
                  <p className="flow-label text-[10px] text-on-surface-variant">
                    LABOR RATIO
                  </p>
                  <p className="font-mono text-sm">
                    31.2% <span className="text-[10px] text-rose">High</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 space-y-8 md:order-2">
            <h2 className="flow-headline-lg text-flow-obsidian">
              Institutional Insights for the Individual Owner.
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              FlowCFO provides the same level of analytical depth used by global
              hedge funds, tailored specifically for the multi-unit restaurant
              operator.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-flow-gold">
                  check_circle
                </span>
                <span className="font-body text-sm">
                  Automated reconciliation of POS and bank statements.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-flow-gold">
                  check_circle
                </span>
                <span className="font-body text-sm">
                  AI-driven predictive purchasing alerts.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-flow-gold">
                  check_circle
                </span>
                <span className="font-body text-sm">
                  One-click reporting for investors and lenders.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-flow-gold px-4 py-24 text-center md:px-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="flow-headline-lg text-flow-obsidian">
            The Future of Hospitality Wealth starts here.
          </h2>
          <p className="font-body text-base text-flow-obsidian/80">
            Join an exclusive circle of restaurateurs who prioritize financial
            mastery. Our early access list is limited to 500 partners.
          </p>
          <div className="mx-auto flex max-w-lg flex-col md:flex-row justify-center">
            {/* <input
              className="flex-grow bg-transparent p-4 font-body text-sm text-flow-obsidian placeholder:text-flow-obsidian/50 focus:ring-0"
              placeholder="Enter your business email"
              type="email"
              required
            /> */}
            <Link
              href="/waitlist"
              className="bg-flow-obsidian px-8 py-4 font-bold text-white transition-all hover:bg-zinc-800"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-flow-obsidian p-4 text-white shadow-2xl transition-all hover:bg-zinc-800">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          support_agent
        </span>
        <span className="flow-label">Contact Advisor</span>
      </button>
    </div>
  );
}
