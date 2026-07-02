import type { Metadata } from "next";
import Link from "next/link";
import { sections, contactSection } from "@/lib/terms-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FlowCFO Terms of Service",
  description:
    "Review the terms governing your use of FlowCFO's AI CFO platform, cash flow tools, financial agents, and account services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold-soft selection:text-flow-black">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-flow-obsidian pt-40 pb-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#D4AF37 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="flow-container relative z-10 text-center">
          <h1 className="flow-headline-xl mb-4 text-flow-gold-soft">Terms of Service</h1>
          <p className="font-mono text-sm tracking-widest uppercase text-flow-muted">
            Last updated: May 2026
          </p>
          <div className="mx-auto mt-12 h-px w-1/4 bg-flow-gold opacity-30"></div>
        </div>
      </header>

      <main className="flow-container py-16">
        <div className="mx-auto max-w-4xl">
          {/* Plain-English Summary */}
          <section className="relative mb-16 overflow-hidden border border-flow-gold bg-white p-8 shadow-sm">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <span className="material-symbols-outlined text-6xl">gavel</span>
            </div>
            <h2 className="flow-label mb-4 uppercase tracking-widest text-flow-gold">
              Plain-English Summary
            </h2>
            <p className="font-body text-base italic leading-relaxed text-flow-black">
              &quot;We built FlowCFO to be your financial command center. In short: we
              provide the tools, but you own your data and decisions. We prioritize
              security and accuracy, but our AI insights are aids, not absolute
              financial advice. By using our platform, you agree to play by the rules
              and keep your account secure.&quot;
            </p>
          </section>

          {/* Detailed Sections */}
          <div className="space-y-16">
            {sections.map((section) => (
              <section className="section-anchor" id={section.id} key={section.id}>
                <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                  <span className="font-mono text-lg text-flow-gold">{section.num}.</span>{" "}
                  {section.label}
                </h3>
                {section.content}
              </section>
            ))}

            {contactSection}
          </div>
        </div>
      </main>
    </div>
  );
}
