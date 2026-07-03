import type { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO for Freelancers — Cash Flow & Tax Reserves',
  description:
    'Cash flow and tax reserve software for freelancers. Smooth irregular income, estimate quarterly taxes, forecast bills, and see your real Safe-to-Spend number.',
  path: '/for-freelancers',
  image: '/og-freelancers.jpg',
  imageAlt: 'FlowCFO freelancer cash flow and tax reserve dashboard',
  keywords: [
    'freelancer tax reserve calculator',
    'freelancer cash flow software',
    'quarterly tax planning for freelancers',
    'Safe-to-Spend for freelancers',
  ],
});

export default function ForFreelancersPage() {
  return (
    <div className="bg-flow-paper selection:bg-primary-design selection:text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[819px] items-center overflow-hidden bg-flow-paper pt-20">
        <div className="flow-container grid w-full grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div className="z-10">
            <span className="flow-label mb-4 block text-primary-design">
              INSTITUTIONAL WEALTH FOR INDIVIDUALS
            </span>
            <h1 className="flow-headline-xl mb-8 text-flow-black">
              Freelancing is freedom. Your finances should{' '}
              <span className="italic text-primary-design">feel</span> like it.
            </h1>
            <p className="mb-12 max-w-lg font-body text-base leading-6 text-on-surface-variant">
              Stop treating your business like a hobby. FlowCFO brings
              institutional-grade cash flow management to the solo professional.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/waitlist"
                className="flow-label bg-primary-design px-10 py-4 text-center text-flow-black transition-all duration-300 hover:brightness-110"
              >
                Join the waitlist
              </Link>
              <Link
                href="/features"
                className="flow-label border border-flow-black px-10 py-4 text-center text-flow-black transition-all duration-300 hover:bg-flow-black hover:text-white"
              >
                View Platform
              </Link>
            </div>
          </div>
          <div className="relative mt-12 md:mt-0">
            <div className="relative aspect-square w-full overflow-hidden border border-flow-line bg-surface-container shadow-2xl">
              <Image
                alt="Luxury Fintech Interface"
                fill
                priority
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS2yn2a-DKeqF_gDN2V0IvgMRJimCppFReHOuAtytSsTTwe_bNqI9_P-Y_ZEEyX6XrGoO_-XwDpoSPprXloBz1_y-jrKE5G5Hzkr5t1QpPM_aBB8ODNq2661WrlyBolTO7I8IzY1bgC_QyJfsy7hsogqrWKZQFceRPvHXBkauSpcMZPO_lhK5uJumi0v8VT0MfhgXqVX-_qbHd-6dgj7V1QNo_HpUMGu4DgF_qYM5BljMd9hX4wV58l-8p895H0mbPZeUvN9Tyq-FK"
              />
            </div>
            {/* Accent element */}
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-primary-design opacity-10 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Pain Points Section (Bento Grid) */}
      <section className="bg-surface-container py-24">
        <div className="flow-container">
          <div className="mb-16">
            <h2 className="flow-headline-lg mb-4 text-flow-black">
              The Cost of Uncertainty
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              Three reasons why freelancers burn out on the business side.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Pain Point 1 */}
            <div className="flex flex-col justify-between border border-flow-line bg-surface-container-lowest p-10 transition-colors duration-500 hover:border-primary-design">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-flow-black">
                  account_balance_wallet
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Guesswork on balance
                </h3>
                <p className="font-body text-base text-on-surface-variant">
                  Never knowing if you can actually afford that new gear or if
                  that bank balance is a mirage waiting for bills to clear.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line pt-8">
                <span className="flex items-center gap-2 font-mono text-sm text-rose">
                  <span className="material-symbols-outlined text-base">
                    warning
                  </span>{' '}
                  UNCERTAINTY RISK
                </span>
              </div>
            </div>
            {/* Pain Point 2 */}
            <div className="flex flex-col justify-between bg-flow-black p-10 text-white">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-primary-design">
                  receipt_long
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-primary-design">
                  Tax bill ambushes
                </h3>
                <p className="font-body text-base text-surface-variant">
                  The quarterly panic of realizing you haven&apos;t set aside
                  enough for the IRS, turning your biggest wins into stressful
                  debts.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line-dark pt-8">
                <span className="flex items-center gap-2 font-mono text-sm text-primary-design">
                  <span className="material-symbols-outlined text-base">
                    trending_down
                  </span>{' '}
                  LIQUIDITY DRAIN
                </span>
              </div>
            </div>
            {/* Pain Point 3 */}
            <div className="flex flex-col justify-between border border-flow-line bg-surface-container-lowest p-10 transition-colors duration-500 hover:border-primary-design">
              <div>
                <span className="material-symbols-outlined mb-6 text-4xl text-flow-black">
                  query_stats
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold leading-8 text-flow-black">
                  Feast-or-famine stress
                </h3>
                <p className="font-body text-base text-on-surface-variant">
                  The mental toll of managing inconsistent income cycles,
                  leading to over-working in &apos;on&apos; months and anxiety
                  in &apos;off&apos; months.
                </p>
              </div>
              <div className="mt-8 border-t border-flow-line pt-8">
                <span className="flex items-center gap-2 font-mono text-sm text-rose">
                  <span className="material-symbols-outlined text-base">
                    psychology
                  </span>{' '}
                  COGNITIVE LOAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-flow-paper py-24">
        <div className="flow-container">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <span className="flow-label mb-4 block text-primary-design">
                THE FLOWCFO DIFFERENCE
              </span>
              <h2 className="flow-headline-xl leading-tight text-flow-black">
                Elite systems, scaled for one.
              </h2>
            </div>
            <p className="max-w-sm font-body text-base text-on-surface-variant">
              Our proprietary algorithms analyze your historical data to provide
              institutional-level clarity on every dollar.
            </p>
          </div>
          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h3 className="flow-headline-lg mb-6 text-flow-black">
                  Safe-to-Spend™
                </h3>
                <p className="mb-8 font-body text-base leading-relaxed text-on-surface-variant">
                  Don&apos;t rely on your balance. Our Safe-to-Spend™ engine
                  automatically subtracts upcoming taxes, overhead, and savings
                  goals to tell you exactly what&apos;s yours to keep.
                </p>
                <ul className="space-y-4">
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    REAL-TIME RECONCILIATION
                  </li>
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    SMART EXPENSE PRIORITIZATION
                  </li>
                </ul>
              </div>
              <div className="order-1 border border-flow-line bg-white p-4 md:order-2">
                <Image
                  alt="Safe to Spend Interface"
                  width={800}
                  height={600}
                  className="h-auto w-full grayscale contrast-125"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Eqnkt5aZ9t3fdhECuaf1BUG1XTejBpW5nOJiFDuXLoFi2UTphLxDj55AUbx9GDU1tqW-A5M9fcl2kE1zoPva-QnsUCICN9F8bi1lyDd2TajVi6hg6uM-ghTdkPeQeRw1UYJ8qfojm0zdzGLOJL8_m944dSW-QOqfwZp2GkAHVM2AxYNQZEr2OKc364nJr_-rxChlLG5m_m8DZqEImpnOVSh_EKHmTjxxZ_9sEdsg8NvZbf3FYj4QcS7XUTZujdnvz45ZXFOzTSh2"
                />
              </div>
            </div>
            {/* Feature 2 */}
            <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
              <div className="border border-flow-line bg-white p-4">
                <Image
                  alt="Income Smoothing Chart"
                  width={800}
                  height={600}
                  className="h-auto w-full contrast-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ4O81WUeFLBf03osUSCyO8nO6pvxX-4Y2t83FTOckh8MQX9mPyD2R9J6OWvMy7pW6GQYioHISWPdKfZ5mgOLsMd8joq8q-p0pN7FnLDmnXdamsXjFyyiOLPMxIuBRi2jUc0bHJY3gNsm3-ZctOLy0PvDQj_uc05a6HIS447VfLyMHa82L7N0c_UevjyXvFUmt4-csLNCVrEdULrryCunNaqeE_vt1zEOs15glfSqZdA-YWLrrXwn_pQr2xuFqm9IK1Azd0UDWcz-v"
                />
              </div>
              <div>
                <h3 className="flow-headline-lg mb-6 text-flow-black">
                  Income smoothing
                </h3>
                <p className="mb-8 font-body text-base leading-relaxed text-on-surface-variant">
                  End the feast-or-famine cycle. FlowCFO calculates your average
                  sustainable income and helps you pay yourself a consistent
                  salary, building a reserve for leaner months automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    AUTOMATED SALARY TRANSFERS
                  </li>
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    RESERVE FUND OPTIMIZATION
                  </li>
                </ul>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h3 className="flow-headline-lg mb-6 text-flow-black">
                  Quarterly forecasting
                </h3>
                <p className="mb-8 font-body text-base leading-relaxed text-on-surface-variant">
                  Look ahead, not back. See your projected tax liability and
                  cash position 3, 6, and 12 months out based on your current
                  pipeline and historical performance.
                </p>
                <ul className="space-y-4">
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    PIPELINE-INTEGRATED DATA
                  </li>
                  <li className="flow-label flex items-center gap-3 text-flow-black">
                    <span className="material-symbols-outlined text-primary-design">
                      check_circle
                    </span>{' '}
                    DYNAMIC TAX CALCULATOR
                  </li>
                </ul>
              </div>
              <div className="order-1 border border-flow-line bg-white p-4 md:order-2">
                <Image
                  alt="Forecasting Interface"
                  width={800}
                  height={600}
                  className="h-auto w-full grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKRoUTRTelh0lflnqGSdxITxy-EbU_meaJixPCCs3_A1Z4rIiFa62giJX1CNA8-QCjVzM7m6mLk7h89mzsvkrHKjEpM8NZGhM_jzY-F3Ib9pHLGO56pMd6qlhECmkgVS0UT0DlBTmHYy4bkavZUGSb5rsTQsFzaCk_5F5KGqd-Vo6FzXEkJJKREPwlO4oLH6b6bElQtyBS_HPdcqMJrX-dWGVSn_2YHa3NTie73QIct1v17gVP35eggahUDH4QavMPVANcLX7Hf7uN"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-flow-black py-32">
        <div className="flow-container relative z-10 text-center">
          <h2 className="flow-headline-xl mb-8 text-primary-design">
            Ready for financial freedom?
          </h2>
          <p className="mx-auto mb-12 max-w-xl font-body text-base text-surface-variant">
            FlowCFO is currently in private beta for select freelancers. Join
            the waitlist for early access to the future of solo wealth
            management.
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-4 justify-center">
            {/* <input
              className="border border-flow-line-dark bg-transparent p-4 text-center font-mono text-xs uppercase tracking-[0.08em] text-white transition-all focus:border-primary-design focus:ring-0"
              placeholder="ENTER YOUR EMAIL"
              type="email"
              required
            /> */}
            <Link
              href="/waitlist"
              className="bg-primary-design px-12 py-5 text-xs font-bold uppercase tracking-[0.08em] text-flow-black transition-all hover:brightness-110"
            >
              Join the waitlist
            </Link>
          </form>
        </div>
        {/* Atmospheric effects */}
        <div className="absolute right-0 top-0 h-96 w-96 bg-primary-design opacity-5 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-primary-design opacity-5 blur-[120px]"></div>
      </section>
    </div>
  );
}
