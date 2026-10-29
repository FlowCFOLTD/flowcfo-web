"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, Globe2, ReceiptText, ShieldCheck, WalletCards } from "lucide-react";

type CountryCode = "US" | "UK" | "CA" | "AU";
type BusinessType = "freelancer" | "ecommerce" | "agency" | "restaurant" | "startup";

const reserveRates: Record<CountryCode, number> = {
  US: 30,
  UK: 25,
  CA: 28,
  AU: 27,
};

const countryLabels: Record<CountryCode, string> = {
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
};

const businessAdjustments: Record<BusinessType, number> = {
  freelancer: 0,
  ecommerce: -2,
  agency: 1,
  restaurant: 1,
  startup: 0,
};

const businessLabels: Record<BusinessType, string> = {
  freelancer: "Freelancer / Contractor",
  ecommerce: "E-commerce seller",
  agency: "Agency / Studio",
  restaurant: "Restaurant / Food business",
  startup: "Startup / Founder",
};

const quarterSchedule = [
  { quarter: "Q1", period: "Jan-Mar", due: "April 15" },
  { quarter: "Q2", period: "Apr-Jun", due: "June 15" },
  { quarter: "Q3", period: "Jul-Sep", due: "September 15" },
  { quarter: "Q4", period: "Oct-Dec", due: "January 15" },
];

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const parseAmount = (value: string): number => parseFloat(value) || 0;

function getNextDueDate(today = new Date()): string {
  const year = today.getFullYear();
  const dueDates = [
    new Date(year, 3, 15),
    new Date(year, 5, 15),
    new Date(year, 8, 15),
    new Date(year + 1, 0, 15),
  ];
  const next = dueDates.find((date) => date >= today) ?? dueDates[0];
  return next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function TaxReserve() {
  const [country, setCountry] = useState<CountryCode>("US");
  const [businessType, setBusinessType] = useState<BusinessType>("freelancer");
  const [ytdIncome, setYtdIncome] = useState("30000");
  const [deductibleExpenses, setDeductibleExpenses] = useState("6000");
  const [taxAlreadySaved, setTaxAlreadySaved] = useState("4500");
  const [paymentsMade, setPaymentsMade] = useState("0");

  const result = useMemo(() => {
    const grossIncome = parseAmount(ytdIncome);
    const deductions = parseAmount(deductibleExpenses);
    const alreadySaved = parseAmount(taxAlreadySaved);
    const paid = parseAmount(paymentsMade);
    const netIncome = Math.max(0, grossIncome - deductions);
    const reserveRate = Math.max(0, reserveRates[country] + businessAdjustments[businessType]);
    const totalReserveTarget = netIncome * (reserveRate / 100);
    const remainingNeeded = Math.max(0, totalReserveTarget - alreadySaved - paid);
    const surplus = Math.max(0, alreadySaved + paid - totalReserveTarget);
    const quarterlyTarget = totalReserveTarget / 4;
    const savedCoverage = totalReserveTarget > 0 ? Math.min(100, ((alreadySaved + paid) / totalReserveTarget) * 100) : 0;

    return {
      grossIncome,
      deductions,
      netIncome,
      alreadySaved,
      paid,
      reserveRate,
      totalReserveTarget,
      remainingNeeded,
      surplus,
      quarterlyTarget,
      savedCoverage,
    };
  }, [businessType, country, deductibleExpenses, paymentsMade, taxAlreadySaved, ytdIncome]);

  const nextDueDate = getNextDueDate();

  return (
    <main className="flow-container pb-20 pt-24">
      <header className="mb-16">
        <span className="flow-label-wide mb-4 block text-[#735c00]">Free Tax Calculator</span>
        <h1 className="flow-headline-xl mb-4 max-w-3xl text-flow-obsidian">Freelancer Tax Reserve Calculator</h1>
        <p className="max-w-xl text-base leading-6 text-[#444748]">
          Estimate how much to keep untouched for taxes before you decide what is safe to spend from your business account.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="border border-flow-line bg-white p-8 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)] lg:col-span-5">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="flow-label text-flow-obsidian">Tax Inputs</h2>
            <Link
              href="/calculator/safe-to-spend"
              className="flow-label flex items-center gap-2 bg-flow-obsidian px-4 py-2 text-white transition-colors hover:bg-flow-gold hover:text-flow-obsidian"
            >
              <WalletCards className="h-[18px] w-[18px]" aria-hidden="true" />
              Safe-to-Spend
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-country">
                Country
              </label>
              <select
                className="w-full border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base outline-none transition-all focus:border-b-2 focus:ring-0"
                id="tax-country"
                onChange={(event) => setCountry(event.target.value as CountryCode)}
                value={country}
              >
                {(Object.keys(countryLabels) as CountryCode[]).map((code) => (
                  <option key={code} value={code}>
                    {countryLabels[code]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-business">
                Business type
              </label>
              <select
                className="w-full border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base outline-none transition-all focus:border-b-2 focus:ring-0"
                id="tax-business"
                onChange={(event) => setBusinessType(event.target.value as BusinessType)}
                value={businessType}
              >
                {(Object.keys(businessLabels) as BusinessType[]).map((type) => (
                  <option key={type} value={type}>
                    {businessLabels[type]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-ytd-income">
                Year-to-date income
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="tax-ytd-income"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setYtdIncome(event.target.value)}
                  type="number"
                  value={ytdIncome}
                />
              </div>
            </div>

            <div>
              <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-deductions">
                Deductible business expenses
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                <input
                  className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                  id="tax-deductions"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setDeductibleExpenses(event.target.value)}
                  type="number"
                  value={deductibleExpenses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-saved">
                  Already saved
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                  <input
                    className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                    id="tax-saved"
                    inputMode="decimal"
                    min="0"
                    onChange={(event) => setTaxAlreadySaved(event.target.value)}
                    type="number"
                    value={taxAlreadySaved}
                  />
                </div>
              </div>
              <div>
                <label className="flow-label mb-3 block text-[#444748]" htmlFor="tax-paid">
                  Payments made
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#444748]">$</span>
                  <input
                    className="w-full border-0 border-b border-flow-obsidian bg-transparent py-2 pl-6 font-mono text-xl font-medium outline-none transition-all focus:border-b-2 focus:ring-0"
                    id="tax-paid"
                    inputMode="decimal"
                    min="0"
                    onChange={(event) => setPaymentsMade(event.target.value)}
                    type="number"
                    value={paymentsMade}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:col-span-7">
          <div className="relative flex h-full min-h-[360px] flex-col justify-center overflow-hidden bg-flow-obsidian p-8 text-white md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-gold opacity-10 blur-[120px]" />
            <span className="flow-label relative z-10 mb-4 text-flow-gold">Recommended reserve target</span>
            <div className="relative z-10 mb-8 font-mono text-[52px] font-bold leading-none text-white md:text-[64px]">
              {formatCurrency(result.totalReserveTarget)}
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="flow-label mb-2 text-flow-muted">Estimated rate</p>
                <p className="font-mono text-sm text-white">{result.reserveRate}% of net income</p>
              </div>
              <div>
                <p className="flow-label mb-2 text-flow-muted">Next due date</p>
                <p className="font-mono text-sm text-white">{nextDueDate}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-flow-line bg-white p-6 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#735c00]" aria-hidden="true" />
                <h3 className="flow-label text-flow-obsidian">Still needed</h3>
              </div>
              <p className="font-mono text-xl font-medium text-flow-obsidian">{formatCurrency(result.remainingNeeded)}</p>
              <p className="mt-2 text-sm leading-5 text-[#444748]">
                {result.surplus > 0
                  ? `You are ahead by ${formatCurrency(result.surplus)} based on these inputs.`
                  : "Amount to add to your reserve before spending freely."}
              </p>
            </div>
            <div className="border border-flow-line bg-white p-6 shadow-[0_20px_40px_-20px_rgba(10,10,10,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <ReceiptText className="h-5 w-5 text-[#735c00]" aria-hidden="true" />
                <h3 className="flow-label text-flow-obsidian">Quarterly target</h3>
              </div>
              <p className="font-mono text-xl font-medium text-flow-obsidian">{formatCurrency(result.quarterlyTarget)}</p>
              <p className="mt-2 text-sm leading-5 text-[#444748]">A simple quarter-by-quarter planning number.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-24 overflow-hidden border border-flow-line bg-flow-obsidian">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="p-8 text-white md:p-12 lg:col-span-7">
            <h2 className="flow-headline-lg max-w-lg text-white">Tax reserves are part of Safe-to-Spend.</h2>
            <p className="mt-4 max-w-xl text-base leading-6 text-flow-muted">
              Your bank balance includes money that may belong to tax authorities. FlowCFO strips that out before telling you what is safe to spend.
            </p>
            <Link
              href="/contact"
              className="flow-label mt-8 inline-flex items-center gap-2 bg-flow-gold px-8 py-4 text-flow-obsidian transition-all hover:brightness-110"
            >
              Automate Tax Reserves
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 bg-black/20 p-8 md:grid-cols-2 md:p-12 lg:col-span-5">
            {[
              ["YTD income", formatCurrency(result.grossIncome)],
              ["Deductions", `-${formatCurrency(result.deductions)}`],
              ["Net income", formatCurrency(result.netIncome)],
              ["Saved coverage", `${result.savedCoverage.toFixed(0)}%`],
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
          <span className="flow-label-wide mb-3 block text-[#735c00]">Quarterly schedule</span>
          <h2 className="flow-headline-lg text-flow-obsidian">Plan around the dates that cause surprises</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {quarterSchedule.map((item) => (
            <article key={item.quarter} className="border border-flow-line bg-white p-6">
              <CalendarClock className="mb-6 h-8 w-8 text-flow-gold" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-flow-obsidian">{item.quarter}</h3>
              <p className="mt-1 text-sm leading-5 text-[#444748]">{item.period}</p>
              <p className="flow-label mt-6 text-flow-obsidian">Due {item.due}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link href="/calculator/safe-to-spend" className="group border border-flow-line bg-white p-8 transition-all hover:border-flow-obsidian">
          <WalletCards className="mb-6 h-8 w-8 text-flow-gold" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-flow-obsidian">Safe-to-Spend Calculator</h2>
          <p className="mt-3 text-sm leading-5 text-[#444748]">
            See what is left after taxes, bills, and a safety buffer.
          </p>
          <span className="flow-label mt-8 inline-flex items-center gap-2 text-flow-obsidian">
            Open calculator
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <Link href="/contact" className="group border border-flow-line bg-white p-8 transition-all hover:border-flow-obsidian">
          <Globe2 className="mb-6 h-8 w-8 text-flow-gold" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-flow-obsidian">Country-specific tax rules</h2>
          <p className="mt-3 text-sm leading-5 text-[#444748]">
            Create a free account to help us tune FlowCFO for your country, business type, and tax calendar.
          </p>
          <span className="flow-label mt-8 inline-flex items-center gap-2 text-flow-obsidian">
            Discuss access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </section>
    </main>
  );
}
