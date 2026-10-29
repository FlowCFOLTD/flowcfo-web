import Link from "next/link";

const groups = [
  { title: "Explore", links: [["Consumer & business", "/features"], ["API platform", "/developers"], ["Product demo", "/demo"], ["Pricing", "/pricing"]] },
  { title: "FlowCFO", links: [["About", "/about"], ["Contact", "/contact"], ["Blog", "/blog"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export default function Footer() {
  return <footer className="border-t border-[#e5e2d7] bg-white"><div className="flow-container grid gap-10 py-12 md:grid-cols-[1.4fr_2fr] md:py-14"><div><Link href="/" className="font-display text-2xl font-semibold tracking-[-.05em] text-[#202722]">FlowCFO</Link><p className="mt-3 max-w-sm text-sm leading-6 text-[#657067]">Useful financial intelligence for people, small businesses and the platforms that serve them.</p><a href="mailto:hello@flowcfo.net" className="mt-4 inline-block text-sm font-semibold text-[#66561c] underline underline-offset-4">hello@flowcfo.net</a><p className="mt-8 text-xs text-[#858b83]">© 2026 FlowCFO. All rights reserved.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map(group=><div key={group.title}><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#806a1f]">{group.title}</p><ul className="mt-4 space-y-3">{group.links.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-[#59625b] hover:text-[#806a1f]">{label}</Link></li>)}</ul></div>)}</div></div></footer>;
}
