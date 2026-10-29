"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Handshake, Mail, MessageSquare, PlugZap, ShieldCheck, Users } from "lucide-react";

const subjects = [
  "General question",
  "Early access / assisted setup",
  "Enterprise API or banking partnership",
  "Product feedback",
  "Press",
  "Bug report",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "draft">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const subject = encodeURIComponent(`${data.subject} — FlowCFO enquiry`);
    const body = encodeURIComponent(`Hello FlowCFO,\n\n${data.message}\n\nName: ${data.name}\nReply to: ${data.email}`);
    window.location.href = `mailto:hello@flowcfo.net?subject=${subject}&body=${body}`;
    setStatus("draft");
  };

  return (
    <main className="flow-container pb-16 pt-32">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="mb-16">
            <span className="flow-label mb-4 block text-[#087f75]">Get in Touch</span>
            <h1 className="flow-headline-xl mb-6 text-flow-obsidian">Let’s talk about what you need.</h1>
            <p className="max-w-xl text-base leading-6 text-[#444748]">
              Tell us whether you’re exploring personal financial guidance, SME cash-flow intelligence, or an API integration for your customers. We’ll arrange a conversation and help define the right setup.
            </p>
          </div>

          <div className="border border-flow-line bg-white p-8 md:p-12">
            {status === "draft" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mail className="mb-6 h-16 w-16 text-[#087f75]" />
                <h2 className="flow-headline-lg mb-4 text-flow-obsidian">Your email draft is ready.</h2>
                <p className="max-w-xs text-base text-[#444748]">
                  Your email app should open with your message prepared. It is not sent until you review and send it.
                </p>
                <a href="mailto:hello@flowcfo.net" className="mt-4 font-semibold text-[#087f75] underline underline-offset-4">If it didn&apos;t open, email hello@flowcfo.net</a>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-mono text-sm uppercase tracking-widest text-[#087f75] hover:underline"
                >
                  Edit message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="flow-label text-flow-obsidian" htmlFor="contact-name">
                      Name
                    </label>
                    <input
                      className="border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base focus:border-b-2 focus:ring-0"
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flow-label text-flow-obsidian" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      className="border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base focus:border-b-2 focus:ring-0"
                      id="contact-email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      type="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flow-label text-flow-obsidian" htmlFor="contact-subject">
                    Subject
                  </label>
                  <select
                    className="border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base focus:border-b-2 focus:ring-0"
                    id="contact-subject"
                    name="subject"
                    defaultValue="Early access / assisted setup"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flow-label text-flow-obsidian" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    className="resize-none border-0 border-b border-flow-obsidian bg-transparent px-0 py-2 text-base focus:border-b-2 focus:ring-0"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what financial decision feels hardest to make right now."
                    required
                    rows={4}
                  />
                </div>

                <div className="pt-4">
                  <button
                    className="flow-label flex w-full items-center justify-center gap-2 rounded-lg bg-[#087f75] px-8 py-4 text-white transition-colors hover:bg-[#066b63] md:w-auto"
                  >
                    Prepare Email <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <aside className="space-y-6 lg:col-span-5">
          <div className="group relative overflow-hidden bg-flow-obsidian p-8 text-white md:p-12">
            <Handshake className="absolute right-0 top-0 h-32 w-32 text-white opacity-10" aria-hidden="true" />
            <span className="flow-label mb-6 block text-flow-gold">Partnerships</span>
            <h2 className="flow-headline-lg mb-4 text-white">Build financial clarity into the tools operators already use.</h2>
            <p className="mb-8 text-base leading-6 text-flow-muted">
              We&apos;re exploring integrations with banks and platforms that want to bring consumer or SME financial intelligence into the customer journeys they already provide.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <PlugZap className="mt-0.5 h-5 w-5 text-flow-gold" aria-hidden="true" />
                <div>
                  <p className="flow-label text-white">Integration partners</p>
                  <p className="text-sm leading-5 text-flow-muted">Connect FlowCFO insights to the systems businesses already trust.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChart3 className="mt-0.5 h-5 w-5 text-flow-gold" aria-hidden="true" />
                <div>
                  <p className="flow-label text-white">Operator research</p>
                  <p className="text-sm leading-5 text-flow-muted">Help shape Safe-to-Spend, margin calculators, and repricing alerts.</p>
                </div>
              </div>
            </div>
            <Link
              className="flow-label mt-10 inline-block border-b border-flow-gold pb-1 text-flow-gold transition-all hover:border-white hover:text-white"
              href="/contact"
            >
              Talk about assisted access
            </Link>
          </div>

          <div className="flex flex-col gap-8 border border-flow-line bg-white p-8">
            <div className="flex -space-x-3">
              {["C", "M", "A"].map((initial) => (
                <div
                  key={initial}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#e2e2e2] text-xs font-bold text-flow-obsidian"
                >
                  {initial}
                </div>
              ))}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#e2e2e2] text-xs font-bold text-flow-obsidian">
                +3
              </div>
            </div>
            <div>
              <h3 className="flow-label mb-2 text-flow-obsidian">Small team, real replies</h3>
              <p className="text-sm leading-5 text-[#444748]">
                Tell us your customer, data source and goal. We’ll use that context to make the first conversation practical.
              </p>
            </div>
          </div>

          <div className="border border-flow-line bg-[#f9f9f9] p-8">
            <div className="mb-4 flex items-center gap-4">
              <Mail className="h-5 w-5 text-flow-obsidian" aria-hidden="true" />
              <h3 className="flow-label text-flow-obsidian">Reach us directly</h3>
            </div>
            <div className="space-y-4 text-sm leading-5 text-[#444748]">
              <p>
                <span className="font-bold text-flow-obsidian">Email:</span> <a className="font-semibold text-[#087f75] underline underline-offset-4" href="mailto:hello@flowcfo.net">hello@flowcfo.net</a>
              </p>
              <p>
                <span className="font-bold text-flow-obsidian">Response time:</span> Usually within 24 business hours.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: "Read-only bank sync" },
                { icon: MessageSquare, label: "Founder-led research" },
                { icon: Users, label: "Early beta access" },
                { icon: CheckCircle2, label: "No spam" },
              ].map((item) => (
                <div key={item.label} className="border border-flow-line bg-white p-3">
                  <item.icon className="mb-2 h-4 w-4 text-flow-gold" aria-hidden="true" />
                  <p className="text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-flow-obsidian">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
