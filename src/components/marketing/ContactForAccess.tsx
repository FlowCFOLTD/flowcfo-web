import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactForAccess({ mode = "access" }: { mode?: "access" | "signup" }) {
  return <main className="flex min-h-[70vh] items-center bg-[#fbfaf7] px-5 py-24 text-[#202421]">
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-[#e5e2d7] bg-white p-8 shadow-[0_24px_70px_-55px_rgba(32,36,33,.5)] md:p-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2efdf] text-[#806a1f]"><MessageCircle size={23}/></div>
      <p className="mt-7 text-sm font-semibold uppercase tracking-[.14em] text-[#806a1f]">Assisted access</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">Let’s set up FlowCFO around your needs.</h1>
      <p className="mt-5 text-base leading-7 text-[#5e665f]">{mode === "signup" ? "FlowCFO is not open for self-service signup yet." : "Self-service sign-in is currently unavailable while we set up access with each customer."} Contact us and we’ll arrange a short conversation, understand your use case and help you get started with the right setup.</p>
      <a href="mailto:hello@flowcfo.net?subject=FlowCFO%20access" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#b89a32] px-6 py-3.5 font-semibold text-[#171914] hover:bg-[#c8aa42]"><Mail size={17}/> Email hello@flowcfo.net</a>
      <p className="mt-6 text-sm text-[#7a8179]">For banks and platforms, mention API access or an embedded customer experience.</p>
      <Link href="/" className="mt-7 inline-block text-sm font-semibold text-[#5e501b] underline underline-offset-4">Back to FlowCFO</Link>
    </section>
  </main>;
}
