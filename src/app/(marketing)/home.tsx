import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  Landmark,
  LayoutDashboard,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const chartBars = [
  "h-[30%] bg-[#474646]/20",
  "h-[45%] bg-[#474646]/20",
  "h-[40%] bg-[#474646]/20",
  "h-[65%] bg-[#474646]/20",
  "h-[55%] bg-[#474646]/20",
  "h-[85%] bg-[#474646]/20",
  "h-[95%] bg-[#1B4332]",
  "h-[70%] bg-[#1B4332]/60",
  "h-[60%] bg-[#1B4332]/40",
];

const advisoryCards = [
  {
    icon: WalletCards,
    title: "Safe spending decisions",
    text: "Ask whether now is the right time to buy inventory, hire help, attend a conference, or hold cash.",
  },
  {
    icon: LayoutDashboard,
    title: "Weekly financial digest",
    text: "A short Monday brief with cash movement, tax status, upcoming bills, and the decisions that need attention.",
  },
];

const documentTileOpacity = [
  "opacity-25",
  "opacity-40",
  "opacity-55",
  "opacity-70",
  "opacity-30",
  "opacity-45",
  "opacity-60",
  "opacity-75",
  "opacity-35",
  "opacity-50",
  "opacity-65",
  "opacity-80",
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      <section className="relative flex min-h-[921px] items-center px-4 py-24 pt-36 md:px-16">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-6">
            <div className="inline-flex items-center gap-2 border border-[#474646] bg-[#1c1b1b] px-3 py-1">
              <ShieldCheck className="h-4 w-4 fill-[#D4AF37]/20 text-[#D4AF37]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffe088]">
                Bank-Level Security
              </span>
            </div>

            <h1 className="max-w-xl font-display text-[44px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl lg:text-[64px] lg:leading-[72px]">
              Stop guessing what you can <span className="text-[#D4AF37]">spend.</span> FlowCFO knows.
            </h1>

            <p className="max-w-lg text-lg leading-7 text-[#858383]">
              Your AI financial command center. It syncs with your bank, predicts your cash flow 90 days ahead,
              sets aside your taxes automatically, and gives you one number that answers everything: how much you
              can safely spend right now.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-3 bg-[#D4AF37] px-10 py-5 text-xs font-bold uppercase tracking-[0.12em] text-[#0A0A0A] transition-all hover:opacity-90 active:scale-95"
              >
                Get Early Access
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="#advisory"
                className="inline-flex items-center justify-center border border-white/20 px-10 py-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-white/5"
              >
                See how it works
                <ArrowDown className="ml-2 h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>

            <p className="pt-12 text-xs font-bold uppercase tracking-[0.1em] text-[#858383]">
              Bank-level 256-bit encryption · No credit card required · Cancel anytime
            </p>
          </div>

          <div className="relative mt-16 flex justify-center lg:col-span-6 lg:mt-0 lg:justify-end">
            <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
            <div className="relative w-full max-w-[540px] border border-[#474646] bg-[#1c1b1b] p-8 shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] md:p-12">
              <BarChart3 className="absolute right-6 top-6 h-10 w-10 text-[#ffe088]/50" aria-hidden="true" />

              <div className="space-y-12">
                <div>
                  <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#858383]">
                    Safe-To-Spend Today
                  </h2>
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-baseline">
                    <span className="font-mono text-[40px] font-bold leading-none tracking-[-0.03em] text-[#D4AF37] sm:text-5xl lg:text-[64px]">
                      $6,240
                    </span>
                    <div className="flex w-fit items-center gap-1 rounded bg-[#1B4332]/10 px-2 py-0.5 text-[#1B4332]">
                      <TrendingUp className="h-4 w-4" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold">High confidence</span>
                    </div>
                  </div>
                </div>

                <div className="flex h-32 w-full items-end gap-2 overflow-hidden">
                  {chartBars.map((barClass, index) => (
                    <div
                      key={index}
                      className={`flex-1 transition-all duration-500 hover:bg-[#1B4332]/40 ${barClass} ${
                        index === 6 ? "shadow-[0_0_15px_rgba(27,67,50,0.5)]" : ""
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-[#474646] pt-8">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#858383]">Tax Reserve</p>
                    <p className="font-mono text-2xl font-bold leading-8 tracking-[0.02em] text-white">
                      $3,120 <span className="text-sm font-bold uppercase opacity-50">Set Aside</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#858383]">Upcoming Bills</p>
                    <p className="font-mono text-2xl font-bold leading-8 tracking-[0.02em] text-white">
                      $1,850 <span className="text-sm font-bold uppercase opacity-50">14 Days</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#474646] bg-[#0A0A0A]/50 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                      <BriefcaseBusiness className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ffe088]">
                        AI CFO Recommendation
                      </p>
                      <p className="truncate text-sm font-medium text-white">Wait 12 days before restocking inventory</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advisory" className="bg-[#0A0A0A] px-4 py-32 md:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-20 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">The Founder Portal</p>
            <h2 className="max-w-2xl font-display text-[32px] font-bold leading-10 tracking-[-0.01em] text-white md:text-[40px] md:leading-[48px]">
              Everything a CFO would tell you. Automated.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="group flex flex-col justify-between border border-[#474646] bg-[#1c1b1b] p-10 transition-all hover:border-[#D4AF37]/50 md:col-span-8">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="space-y-4">
                  <ReceiptText className="h-10 w-10 text-[#D4AF37]" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold text-white">Cash Flow Forecasting</h3>
                  <p className="max-w-sm text-lg leading-7 text-[#858383]">
                    See 30, 60, and 90 days ahead from your real transaction patterns, recurring bills, and income timing.
                  </p>
                </div>
                <div className="grid h-48 w-full max-w-48 grid-cols-4 gap-2 opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0">
                  {documentTileOpacity.map((opacityClass, index) => (
                    <div
                      key={index}
                      className={`border border-[#474646] bg-[#0A0A0A] ${opacityClass}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between pt-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#858383]">Projected Balance</p>
                  <p className="font-mono text-3xl text-white">$9,820</p>
                </div>
                <ArrowRightLeft className="h-10 w-10 text-[#ffe088] transition-transform group-hover:translate-x-2" aria-hidden="true" />
              </div>
            </div>

            <div className="group flex flex-col space-y-8 border border-[#474646] bg-[#1c1b1b] p-10 transition-all hover:border-[#D4AF37]/50 md:col-span-4">
              <Landmark className="h-10 w-10 text-[#D4AF37]" aria-hidden="true" />
              <h3 className="font-display text-2xl font-bold text-white">Tax Reserve Engine</h3>
              <p className="text-lg leading-7 text-[#858383]">
                FlowCFO separates what is actually yours from what belongs to the IRS, HMRC, or your next quarterly payment.
              </p>
              <div className="mt-auto border-t border-[#474646] pt-8">
                <div className="flex justify-between py-2">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#858383]">Q4 Needed</span>
                  <span className="font-mono text-sm text-white">$4,520</span>
                </div>
                <div className="flex justify-between bg-white/[0.02] py-2">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#858383]">Reserved</span>
                  <span className="font-mono text-sm text-[#1B4332]">$3,120</span>
                </div>
              </div>
            </div>

            {advisoryCards.map((card) => (
              <div
                key={card.title}
                className="border border-[#474646] bg-[#1c1b1b] p-10 transition-all hover:border-[#D4AF37]/50 md:col-span-4"
              >
                <card.icon className="h-10 w-10 text-[#D4AF37]" aria-hidden="true" />
                <h3 className="mb-2 mt-6 font-display text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm leading-5 text-[#858383]">{card.text}</p>
              </div>
            ))}

            <Link
              href="/contact"
              className="group flex cursor-pointer flex-col justify-between bg-[#D4AF37] p-10 text-[#0A0A0A] transition-all active:scale-95 md:col-span-4"
            >
              <h3 className="font-display text-xl font-bold">Join the E-commerce Beta</h3>
              <div className="mt-8 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0A0A0A]/80">Shape Safe-To-Spend</p>
                <PhoneCall className="h-8 w-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
