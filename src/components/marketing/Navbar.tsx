"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Solutions", href: "/features" },
  { label: "API platform", href: "/developers" },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return <header className="fixed top-0 z-50 w-full border-b border-[#e7e5de] bg-[#fbfaf7]/95 backdrop-blur-md">
    <nav className="flow-container flex h-[76px] items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5" aria-label="FlowCFO home">
        <Image src="/logo.svg" alt="" width={38} height={38} className="h-[38px] w-[38px]" priority />
        <span className="font-display text-[25px] font-semibold tracking-[-.05em] text-[#202722]">FlowCFO</span>
      </Link>
      <div className="hidden items-center gap-8 lg:flex">{links.map(link=><Link key={link.href} href={link.href} className="text-sm font-medium text-[#535c55] transition-colors hover:text-[#806a1f]">{link.label}</Link>)}</div>
      <div className="flex items-center gap-4"><Link href="/signin" className="hidden text-sm font-semibold text-[#535c55] hover:text-[#806a1f] sm:inline">Sign in</Link><Link href="/contact" className="rounded-lg bg-[#b89a32] px-4 py-2.5 text-sm font-semibold text-[#171914] transition-colors hover:bg-[#c8aa42] sm:px-5">Talk to us</Link></div>
    </nav>
    <div className="flex justify-center gap-5 overflow-x-auto border-t border-[#e7e5de] px-4 py-2.5 lg:hidden">{links.map(link=><Link key={link.href} href={link.href} className="whitespace-nowrap text-xs font-medium text-[#535c55]">{link.label}</Link>)}</div>
  </header>;
}
