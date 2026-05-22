import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About FlowCFO — Why We're Building This",
  description:
    "FlowCFO helps business owners stop guessing what they can safely spend with AI cash-flow forecasts, tax reserves, and decision clarity.",
  openGraph: {
    title: "About FlowCFO — Why We're Building This",
    description:
      "FlowCFO helps business owners stop guessing what they can safely spend with AI cash-flow forecasts, tax reserves, and decision clarity.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net/about" },
};

const values = [
  {
    number: "01",
    title: "Clarity over complexity",
    text: "A business owner should not need ten dashboards to answer one question. One honest number beats a spreadsheet maze.",
  },
  {
    number: "02",
    title: "Built from real business pain",
    text: "Safe-to-Spend, margin checks, tax reserves, and repricing alerts all come from real conversations with operators.",
  },
  {
    number: "03",
    title: "Privacy First",
    text: "Your financial data is yours. FlowCFO uses read-only bank connections and never sells your data.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-flow-paper text-flow-black">
      <header className="flow-container pb-20 pt-40">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="flow-label mb-4 text-[#735c00]">Our Genesis</p>
            <h1 className="flow-headline-xl max-w-4xl text-flow-black">
              We built FlowCFO because we were tired of <span className="gold-underline">guessing</span>.
            </h1>
          </div>
          <div className="pb-4 lg:col-span-4">
            <p className="text-base leading-6 text-[#444748]">
              Built for freelancers, e-commerce sellers, agencies, restaurants, and founders who need to know what their money is really saying.
            </p>
          </div>
        </div>
      </header>

      <section className="flow-container mb-32">
        <div className="executive-border group relative h-[420px] w-full overflow-hidden md:h-[600px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaF0JvvIWC6m8Y5Iasmims0J3jVtpwiCfNmMLexxd3Xw2fTfT5pR96QQCkUv2ZLsYFJ77eRQ0y3Tos4DK1t8aFJQzuIaxgDsmb68dPgIoaYKRg_n9xAyoKJsNKCce3wxVOky9RUnSQ7nIVx2F4yo3gDXujKvouESGiJmEd2rh01J2Z8uk7tYLlyaOd528hn56U-KCX-Z7CDB4i0lstWQ693P9lJICgQU54p7M6ebgJggkoghRRPH4Jm4aF2Diu2l4VtBTd4J7wUlt3"
            alt="A high-contrast architectural photograph of a modern skyscraper's sharp glass facade reflecting a bright morning sky."
            fill
            priority
            sizes="(min-width: 1440px) 1312px, calc(100vw - 32px)"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-flow-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <span className="bg-flow-black px-4 py-2 font-mono text-sm leading-5 text-white">
              EST. 2026 / BUILT WITH OPERATORS
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-flow-black px-4 py-32 text-white md:px-16">
        <div className="gold-dot-grid absolute inset-0 opacity-10" />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center text-center">
            <Quote className="mb-8 h-12 w-12 fill-flow-gold text-flow-gold" aria-hidden="true" />
            <blockquote className="flow-headline-xl max-w-4xl italic leading-snug text-white">
              Be the virtual CFO for every business that can&apos;t afford a real one, starting with one number that tells you what you can{" "}
              <span className="text-flow-gold">safely spend</span> today.
            </blockquote>
            <div className="mt-12 h-px w-24 bg-flow-gold" />
            <p className="flow-label mt-8 tracking-[0.2em] text-[#dadada]">The FlowCFO Mission</p>
          </div>
        </div>
      </section>

      <section className="flow-container py-32">
        <div className="mb-20">
          <p className="flow-label mb-4 text-[#735c00]">Core Pillars</p>
          <h2 className="flow-headline-lg text-flow-black">How we operate</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.number}
              className="executive-border group flex h-[400px] flex-col justify-between bg-white p-8 transition-colors duration-500 hover:bg-flow-black md:p-12"
            >
              <div>
                <span className="font-mono text-xl font-medium leading-7 tracking-[0.02em] text-[#735c00] transition-colors group-hover:text-flow-gold">
                  {value.number}
                </span>
                <h3 className="flow-headline-lg mt-8 text-flow-black transition-colors group-hover:text-white">
                  {value.title}
                </h3>
              </div>
              <p className="text-base leading-6 text-[#444748] transition-colors group-hover:text-[#dadada]">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-container pb-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="executive-border relative h-[420px] overflow-hidden md:h-[500px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBilusMoi0FcQ49A7CrjBqs8YjZNfkruUbWCt0pKIv784mzTtEMCUJJNsdJ0KFXX43EiHHvLcNSEmc6rOnuZffbqiO7vinIoUMGJmjl12RUREzIr-87a5qXFMALUgfvgFks6wlK2HgkiY6GN-8eQogF_xlUnDDkLUMJsNUg_knDFPO77CTYInkrXVm3HIu3o_24FKWRKzpH_uHzAFaFUmut1-_D-npbNmW5tUmdMYc96bK7U3sz3VhFbpzh3lFfF5QEDzdT5DCz-kEU"
              alt="A cinematic portrait of professional founders in a sophisticated boardroom."
              fill
              sizes="(min-width: 1024px) 50vw, calc(100vw - 32px)"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-16">
            <p className="flow-label mb-4 text-[#735c00]">The Team</p>
            <h3 className="flow-headline-lg mb-6 text-flow-black">Built with business owners, not just for them.</h3>
            <p className="mb-8 text-base leading-relaxed text-[#444748]">
              We watched freelancers miss avoidable tax payments, e-commerce founders make inventory calls from misleading bank balances, and agencies learn their margins too late.
              FlowCFO exists so those decisions can happen with real-time clarity instead of after-the-fact regret.
            </p>
            <Link
              href="/contact"
              className="executive-border flow-label w-fit px-8 py-3 text-flow-black transition-all hover:bg-flow-black hover:text-white"
            >
              Learn more about our team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-flow-line bg-[#f3f3f3] py-24">
        <div className="flow-container flex flex-col items-center text-center">
          <h2 className="flow-headline-xl mb-8 text-flow-black">Ready for absolute clarity?</h2>
          <div className="flex flex-col gap-6 sm:flex-row">
            <Link
              href="/waitlist"
              className="flow-label bg-flow-gold px-12 py-4 text-flow-black transition-all hover:opacity-90"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/waitlist"
              className="flow-label bg-flow-black px-12 py-4 text-white transition-all hover:bg-[#444748]"
            >
              Shape the Product
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
