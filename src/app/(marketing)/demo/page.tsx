import type { Metadata } from 'next';
export const dynamic = 'force-static';
import DemoVideoPlayer from './demo-video-player';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO Demo — AI CFO Dashboard, Agents & Cash Flow Tools',
  description:
    'Watch a guided walkthrough of FlowCFO: Safe-to-Spend, AI agents, ecommerce margin monitoring, cash flow analysis, pricing tools, and Telegram alerts.',
  path: '/demo',
});

export default function DemoPage() {
  return (
    <div className="overflow-x-hidden bg-flow-paper text-flow-black">
      <header className="flow-container pb-20 pt-40">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="flow-label mb-4 text-[#735c00]">Walkthrough</p>
            <h1 className="flow-headline-xl max-w-4xl text-flow-black">
              See FlowCFO <span className="gold-underline">in action</span>.
            </h1>
          </div>
          <div className="pb-4 lg:col-span-4">
            <p className="text-base leading-6 text-[#444748]">
              A guided tour of the dashboard, AI agents, cash flow tools,
              pricing calculators, and financial alerts — all in under 5
              minutes.
            </p>
          </div>
        </div>
      </header>

      <section className="flow-container mb-32">
        <div className="executive-border overflow-hidden bg-black">
          <DemoVideoPlayer />
        </div>
      </section>

      <section className="border-y border-flow-line bg-[#f3f3f3] py-24">
        <div className="flow-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="flow-headline-lg mb-8 text-center text-flow-black">
              What you&apos;ll see
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Dashboard Overview',
                  text: 'Safe-to-Spend, cash position, recent transactions, and key metrics at a glance.',
                },
                {
                  title: 'AI Agents',
                  text: 'Automated margin monitoring, fee audits, inventory alerts, and category suggestions.',
                },
                {
                  title: 'Cash Flow Analysis',
                  text: '30/60/90-day forecasts, transaction history, and income/expense patterns.',
                },
                {
                  title: 'Pricing Tools',
                  text: 'Break-even calculator, ideal pricing, and recommended ad spend for products.',
                },
                {
                  title: 'Tax Reserves',
                  text: 'Automatic tax allocation per transaction, quarterly payment tracking.',
                },
                {
                  title: 'Telegram Bot',
                  text: 'Real-time alerts, AI chat, agent triggers, and morning briefs via Telegram.',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="executive-border bg-white p-6"
                >
                  <h3 className="flow-label mb-2 text-flow-black">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-5 text-[#444748]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flow-container py-24">
        <div className="flex flex-col items-center text-center">
          <h2 className="flow-headline-xl mb-8 text-flow-black">
            Ready to try it yourself?
          </h2>
          <p className="mb-10 max-w-xl text-base leading-6 text-[#444748]">
            Signup and help shape this further.
          </p>
          <div className="flex flex-col gap-6 sm:flex-row">
            <a
              href="/signup"
              className="flow-label bg-flow-gold px-12 py-4 text-flow-black transition-all hover:opacity-90"
            >
              Signup
            </a>
            <a
              href="/features"
              className="flow-label border border-flow-black px-12 py-4 text-flow-black transition-all hover:bg-flow-black hover:text-white"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
