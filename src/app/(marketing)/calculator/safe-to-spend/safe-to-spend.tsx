"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, ChartNoAxesCombined, ShieldCheck, ShoppingCart, WalletCards } from "lucide-react";

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const relatedCalculators = [
  {
    icon: ShieldCheck,
    title: "Freelancer tax reserve calculator",
    text: "Estimate how much to set aside before your next quarterly tax deadline.",
    href: "/calculator/tax-reserve",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Cash runway calculator",
    text: "See how long your business can operate if income slows down.",
    href: "/waitlist",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce pricing calculator",
    text: "Price products with COGS, platform fees, shipping, tax, and margin in view.",
    href: "/waitlist",
  },
];

export default function SafeToSpend() {
  const [balance, setBalance] = useState("10000");
  const [taxRate, setTaxRate] = useState("25");
  const [bills, setBills] = useState("1850");
  const [monthlyExpenses, setMonthlyExpenses] = useState("4000");
  const [bufferWeeks, setBufferWeeks] = useState("2");

  const result = useMemo(() => {
    const currentBalance = parseFloat(balance) || 0;
    const effectiveTaxRate = (parseFloat(taxRate) || 0) / 100;
    const upcomingBills = parseFloat(bills) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const weeks = parseFloat(bufferWeeks) || 0;
    const taxReserve = currentBalance * effectiveTaxRate;
    const safetyBuffer = (expenses / 4) * weeks;
    const safeToSpend = Math.max(0, currentBalance - taxReserve - upcomingBills - safetyBuffer);
    const coverage = currentBalance > 0 ? safeToSpend / currentBalance : 0;

    return {
      currentBalance,
      taxReserve,
      upcomingBills,
      safetyBuffer,
      safeToSpend,
      coverage,
    };
  }, [balance, taxRate, bills, monthlyExpenses, bufferWeeks]);

  return (
    <main className="flow-container pb-20 pt-24">
      <header className="mb-16">
        <span className="flow-label-wide mb-4 block text-[#735c00]">Free Business Calculator</span>
        <h1 className="flow-headline-xl mb-4 max-w-2xl text-flow-obsidian">Safe-to-Spend Calculator</h1>
        <p className="max-w-xl text-base leading-6 text-[#444748]">
          Estimate what you can actually spend from your business account after taxes, upcoming bills, and a safety buffer.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="border border-flow-line bg-white p-8 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)] lg:col-span-5">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="flow-label text-flow-obsidian">Business Inputs</h2>
            <Link
              href="/signup"
              className="flow-label flex items-center gap-2 bg-flow-obsidian px-4 py-2 text-white transition-colors hover:bg-flow-gold hover:text-flow-obsidian"
            >
              <Banknote className="h-[18px] w-[18px]" aria-hidden="true" />
              Connect bank
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="input-balance">
                Current bank balance
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="input-balance"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setBalance(event.target.value)}
                  type="number"
                  value={balance}
                />
              </div>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="input-tax">
                Estimated tax reserve rate
              </label>
              <div className="relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">%</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pr-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="input-tax"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setTaxRate(event.target.value)}
                  type="number"
                  value={taxRate}
                />
              </div>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="input-bills">
                Known upcoming bills
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="input-bills"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setBills(event.target.value)}
                  type="number"
                  value={bills}
                />
              </div>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="input-expenses">
                Average monthly expenses
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="input-expenses"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setMonthlyExpenses(event.target.value)}
                  type="number"
                  value={monthlyExpenses}
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="flow-label text-[#444748]" htmlFor="input-buffer">
                  Safety buffer
                </label>
                <span className="font-mono text-sm text-[#735c00]">{bufferWeeks} weeks</span>
              </div>
              <input
                className="h-[2px] w-full cursor-pointer appearance-none bg-flow-line accent-flow-gold"
                id="input-buffer"
                max="4"
                min="1"
                onChange={(event) => setBufferWeeks(event.target.value)}
                step="1"
                type="range"
                value={bufferWeeks}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:col-span-7">
          <div className="relative flex h-full min-h-[360px] flex-col justify-center overflow-hidden bg-flow-obsidian p-8 text-white md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-gold opacity-10 blur-[120px]" />
            <span className="flow-label relative z-10 mb-4 text-flow-gold">Estimated Safe-to-Spend</span>
            <div className="relative z-10 mb-8 font-mono text-[52px] font-bold leading-none text-white md:text-[64px]">
              {formatCurrency(result.safeToSpend)}
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="flow-label mb-2 text-flow-muted">Coverage</p>
                <p className="font-mono text-sm text-white">{result.coverage.toFixed(2)}x balance</p>
              </div>
              <div>
                <p className="flow-label mb-2 text-flow-muted">Confidence</p>
                <p className="font-mono text-sm text-white">Manual estimate</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-flow-line bg-white p-6 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#735c00]" aria-hidden="true" />
                <h3 className="flow-label text-flow-obsidian">Tax reserve</h3>
              </div>
              <p className="font-mono text-xl font-medium text-flow-obsidian">{formatCurrency(result.taxReserve)}</p>
              <p className="mt-2 text-sm leading-5 text-[#444748]">Estimated amount to keep untouched for taxes.</p>
            </div>
            <div className="border border-flow-line bg-white p-6 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <WalletCards className="h-5 w-5 text-[#735c00]" aria-hidden="true" />
                <h3 className="flow-label text-flow-obsidian">Bills + buffer</h3>
              </div>
              <p className="font-mono text-xl font-medium text-flow-obsidian">
                {formatCurrency(result.upcomingBills + result.safetyBuffer)}
              </p>
              <p className="mt-2 text-sm leading-5 text-[#444748]">Upcoming obligations plus your chosen safety cushion.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-24 overflow-hidden border border-flow-line bg-flow-obsidian">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="p-8 text-white md:p-12 lg:col-span-7">
            <h2 className="flow-headline-lg max-w-lg text-white">A calculator helps. A connected CFO engine updates daily.</h2>
            <p className="mt-4 max-w-xl text-base leading-6 text-flow-muted">
              FlowCFO connects to your accounts, learns recurring bills and income patterns, tracks tax reserves, and refreshes Safe-to-Spend automatically.
            </p>
            <Link
              href="/signup"
              className="flow-label mt-8 inline-flex items-center gap-2 bg-flow-gold px-8 py-4 text-flow-obsidian transition-all hover:brightness-110"
            >
              Get Early Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 bg-black/20 p-8 md:grid-cols-2 md:p-12 lg:col-span-5">
            {[
              ["Bank balance", formatCurrency(result.currentBalance)],
              ["Tax reserve", `-${formatCurrency(result.taxReserve)}`],
              ["Upcoming bills", `-${formatCurrency(result.upcomingBills)}`],
              ["Safety buffer", `-${formatCurrency(result.safetyBuffer)}`],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-white/[0.03] p-4">
                <p className="flow-label mb-2 text-flow-muted">{label}</p>
                <p className="font-mono text-lg text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8">
          <span className="flow-label-wide mb-3 block text-[#735c00]">More free tools</span>
          <h2 className="flow-headline-lg text-flow-obsidian">Calculators that answer real business questions</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {relatedCalculators.map((calculator) => (
            <Link
              href={calculator.href}
              key={calculator.title}
              className="group border border-flow-line bg-white p-6 transition-all hover:border-flow-obsidian"
            >
              <calculator.icon className="mb-6 h-8 w-8 text-flow-gold" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-flow-obsidian">{calculator.title}</h3>
              <p className="mt-3 text-sm leading-5 text-[#444748]">{calculator.text}</p>
              <span className="flow-label mt-8 inline-flex items-center gap-2 text-flow-obsidian">
                {calculator.href === "/waitlist" ? "Join waitlist" : "Open calculator"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
