import Link from "next/link";
import Image from "next/image";

const groups = [
  { title: "Explore", links: [["Consumer & business", "/features"], ["API platform", "/developers"], ["Pricing", "/pricing"], ["Blog", "/blog"]] },
  { title: "FlowCFO", links: [["About", "/about"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export default function Footer() {
  return <footer className="border-t border-[#dce9e4] bg-white"><div className="flow-container grid gap-10 py-12 md:grid-cols-[1.4fr_2fr] md:py-14"><div><Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-[-.05em] text-[#123e3b]"><Image src="/logo.svg" alt="" width={30} height={30}/>FlowCFO</Link><p className="mt-3 max-w-sm text-sm leading-6 text-[#61736d]">Useful financial intelligence for people, small businesses and the platforms that serve them.</p><a href="mailto:hello@flowcfo.net" className="mt-4 inline-block text-sm font-semibold text-[#087f75] underline underline-offset-4">hello@flowcfo.net</a><p className="mt-8 text-xs text-[#82918a]">© 2026 FlowCFO. All rights reserved.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map(group=><div key={group.title}><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#087f75]">{group.title}</p><ul className="mt-4 space-y-3">{group.links.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-[#526760] transition-colors hover:text-[#087f75]">{label}</Link></li>)}</ul></div>)}</div></div></footer>;
}
