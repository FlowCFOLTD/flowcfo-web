"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Solutions", href: "/features" },
  { label: "API platform", href: "/developers" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return <header className="fixed top-0 z-50 w-full border-b border-[#dce9e4] bg-[#f7fbf9]/95 backdrop-blur-md">
    <nav className="flow-container flex h-[76px] items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5" aria-label="FlowCFO home">
        <Image src="/logo.svg" alt="" width={38} height={38} className="h-[38px] w-[38px]" priority />
        <span className="font-display text-[25px] font-semibold tracking-[-.05em] text-[#123e3b]">FlowCFO</span>
      </Link>
      <div className="hidden items-center gap-8 lg:flex">{links.map(link=><Link key={link.href} href={link.href} className="text-sm font-medium text-[#526760] transition-colors hover:text-[#087f75]">{link.label}</Link>)}</div>
    <div className="flex items-center gap-4"><Link href="/signin" className="hidden text-sm font-semibold text-[#405d56] transition-colors hover:text-[#087f75] sm:inline">Sign in</Link><Link href="/contact" className="rounded-lg bg-[#087f75] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#066b63] sm:px-5">Talk to us</Link></div>
    </nav>
    <div className="flex justify-center gap-5 overflow-x-auto border-t border-[#dce9e4] px-4 py-2.5 lg:hidden">{links.map(link=><Link key={link.href} href={link.href} className="whitespace-nowrap text-xs font-medium text-[#526760]">{link.label}</Link>)}</div>
  </header>;
}
