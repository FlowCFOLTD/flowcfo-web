import Link from "next/link";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ContactForAccess({ mode = "access" }: { mode?: "access" | "signup" }) {
  return <main className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#f4faf7] px-5 py-24 text-[#173b38]">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-[#b9eddd]/55 blur-3xl" />
    <section className="relative mx-auto w-full max-w-2xl rounded-[28px] border border-[#d8e9e1] bg-white p-8 shadow-[0_28px_90px_-60px_rgba(18,62,59,.3)] md:p-12">
      <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[-.04em] text-[#123e3b]"><Image src="/logo.svg" alt="" width={34} height={34}/>FlowCFO</Link>
      <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3f5ed] text-[#087f75]"><MessageCircle size={23}/></div>
      <p className="mt-7 text-sm font-semibold uppercase tracking-[.14em] text-[#087f75]">Access by conversation</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">Let’s set up FlowCFO around your needs.</h1>
      <p className="mt-5 text-base leading-7 text-[#536762]">{mode === "signup" ? "FlowCFO is not open for self-service signup yet." : "Self-service sign-in is currently unavailable while we set up access with each customer."} Contact us and we’ll arrange a short conversation, understand your use case and help you get started with the right setup.</p>
      <a href="mailto:hello@flowcfo.net?subject=FlowCFO%20access" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#087f75] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#066b63]"><Mail size={17}/> Email hello@flowcfo.net <ArrowUpRight size={16}/></a>
      <p className="mt-6 text-sm leading-6 text-[#71817b]">For banks and platforms, mention API access or an embedded customer experience.</p>
      <Link href="/" className="mt-7 inline-block text-sm font-semibold text-[#087f75] underline underline-offset-4">Back to FlowCFO</Link>
    </section>
  </main>;
}
