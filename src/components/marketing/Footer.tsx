"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, Share2 } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "For Freelancers", href: "/for-freelancers" },
      { label: "For E-commerce", href: "/for-ecommerce" },
      { label: "For Agencies", href: "/for-agencies" },
      { label: "Calculators", href: "/calculator/safe-to-spend" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <footer className="w-full border-t border-flow-line bg-white py-12">
        <div className="flow-container flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <Link href="/" className="font-display text-2xl font-bold leading-8 text-flow-black">
              FlowCFO
            </Link>
            <p className="mt-2 text-sm leading-5 text-[#444748]">© 2026 FlowCFO. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="flow-label text-[#444748] underline transition-colors hover:text-flow-black" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="flow-label text-[#444748] underline transition-colors hover:text-flow-black" href="/terms">
              Terms of Service
            </Link>
            <Link className="flow-label text-[#444748] underline transition-colors hover:text-flow-black" href="/contact">
              Contact
            </Link>
            <Link className="flow-label font-bold text-flow-black underline transition-colors hover:text-[#735c00]" href="/waitlist">
              Join Waitlist
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-flow-line-dark bg-black">
      <div className="flow-container flex flex-col items-start justify-between gap-12 py-12 md:flex-row">
        <div className="max-w-xs space-y-4 text-left">
          <Link href="/" className="font-display text-[40px] font-bold leading-[48px] tracking-[-0.04em] text-flow-gold-soft">
            FlowCFO
          </Link>
          <p className="text-sm leading-5 text-flow-muted">
            The virtual CFO for businesses that can&apos;t afford a real one.
          </p>
          <div className="flex gap-4 pt-2">
            <Share2 className="h-5 w-5 text-flow-muted transition-colors hover:text-flow-gold-soft" aria-hidden="true" />
            <HelpCircle className="h-5 w-5 text-flow-muted transition-colors hover:text-flow-gold-soft" aria-hidden="true" />
          </div>
          <p className="pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-flow-line-dark">
            © 2026 FlowCFO. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-10 md:gap-16">
          {footerGroups.map((group) => (
            <div key={group.title} className="flex min-w-32 flex-col gap-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-flow-gold-soft">
                {group.title}
              </p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm leading-5 text-flow-muted transition-colors hover:text-flow-gold-soft"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
