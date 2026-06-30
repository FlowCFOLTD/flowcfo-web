"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Demo", href: "/demo" },
  { label: "Features", href: "/features" },
  { label: "Calculators", href: "/calculator/safe-to-spend" },
  { label: "About", href: "/about" },
];

const forYouLinks = [
  { label: "For Freelancers", href: "/for-freelancers" },
  { label: "For E-commerce", href: "/for-ecommerce" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Restaurants", href: "/for-restaurants" },
  { label: "For Startups", href: "/for-startups" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isLightRoute = pathname !== "/";

  if (isLightRoute) {
    const isCalculator = pathname.startsWith("/calculator");
    return (
      <header className="fixed top-0 z-50 w-full border-b border-flow-line bg-flow-paper">
        <nav className="flow-container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FlowCFO" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-2xl font-bold leading-8 text-flow-black">FlowCFO</span>
          </Link>

          <div className="hidden items-center space-x-12 md:flex">
            <Link
              className={`flow-label transition-opacity hover:text-flow-black ${
                pathname === "/demo" ? "border-b-2 border-[#735c00] pb-1 text-flow-black" : "text-[#444748]"
              }`}
              href="/demo"
            >
              Demo
            </Link>
            <Link
              className={`flow-label transition-opacity hover:text-flow-black ${
                pathname === "/features" ? "border-b-2 border-[#735c00] pb-1 text-flow-black" : "text-[#444748]"
              }`}
              href="/features"
            >
              Features
            </Link>
            <div className="group relative">
              <button className="flow-label flex items-center gap-1 text-[#444748] transition-opacity group-hover:text-flow-black">
                For You
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-6 w-56 border border-flow-line bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                {forYouLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flow-label block px-3 py-2 text-[#444748] hover:bg-flow-paper hover:text-flow-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className={`flow-label transition-opacity hover:text-flow-black ${
                isCalculator ? "border-b-2 border-[#735c00] pb-1 text-flow-black" : "text-[#444748]"
              }`}
              href="/calculator/safe-to-spend"
            >
              Calculators
            </Link>
            <Link
              className={`flow-label transition-opacity hover:text-flow-black ${
                pathname === "/about" ? "border-b-2 border-[#735c00] pb-1 text-flow-black" : "text-[#444748]"
              }`}
              href="/about"
            >
              About
            </Link>
          </div>

          <Link
            href="/waitlist"
            className="flow-label bg-flow-black px-4 py-3 text-white transition-opacity hover:opacity-80 md:px-8"
          >
            Join Waitlist
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center border-b border-flow-line-dark bg-black">
      <nav className="flow-container flex items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-dark.svg" alt="FlowCFO" width={44} height={44} className="h-11 w-11" />
            <span className="font-display text-2xl font-bold tracking-[-0.04em] text-flow-gold-soft md:text-[40px] md:leading-[48px]">FlowCFO</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || (pathname === "/" && link.href === "/features");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flow-label transition-colors hover:text-flow-gold-soft ${
                    active ? "border-b-2 border-flow-gold-soft pb-1 text-flow-gold-soft" : "text-flow-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="group relative">
              <button className="flow-label flex items-center gap-1 text-flow-muted transition-colors group-hover:text-flow-gold-soft">
                For You
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-6 w-56 border border-flow-line-dark bg-[#1c1b1b] p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                {forYouLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flow-label block px-3 py-2 text-flow-muted hover:bg-white/5 hover:text-flow-gold-soft"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/waitlist"
          className="flow-label inline-flex items-center gap-2 bg-flow-gold px-4 py-3 text-flow-obsidian transition-all hover:opacity-90 active:scale-95 md:px-6"
        >
          <span className="hidden sm:inline">Join Waitlist</span>
          <span className="sm:hidden">Join</span>
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
