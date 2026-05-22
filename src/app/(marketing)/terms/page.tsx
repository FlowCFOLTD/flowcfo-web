import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | FlowCFO — High-Performance Financial Command",
  description:
    "Review the terms governing your use of FlowCFO. Precision financial intelligence for founders who refuse to fly blind.",
  openGraph: {
    title: "FlowCFO Terms of Service | High-Performance Financial Command",
    description:
      "Review the terms governing your use of FlowCFO. Precision financial intelligence for founders who refuse to fly blind.",
    type: "website",
    url: "https://flowcfo.net/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowCFO Terms of Service | High-Performance Financial Command",
    description:
      "Review the terms governing your use of FlowCFO. Precision financial intelligence for founders who refuse to fly blind.",
  },
};

const sections = [
  { id: "provision", num: "01", label: "What FlowCFO Provides" },
  { id: "account", num: "02", label: "Your Account" },
  { id: "use", num: "03", label: "Acceptable Use" },
  { id: "accuracy", num: "04", label: "Financial Data Accuracy" },
  { id: "ai", num: "05", label: "AI-Generated Content" },
  { id: "billing", num: "06", label: "Subscription and Billing" },
  { id: "termination", num: "07", label: "Termination" },
  { id: "liability", num: "08", label: "Limitation of Liability" },
  { id: "law", num: "09", label: "Governing Law" },
];

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
            <section className="section-anchor" id="provision">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">01.</span> What
                FlowCFO Provides
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  FlowCFO is a sophisticated software-as-a-service (SaaS) platform
                  designed for high-net-worth individuals to monitor, aggregate, and
                  analyze complex financial portfolios. Our services include real-time
                  data synchronization, automated tax-loss harvesting alerts, and
                  AI-driven wealth projections.
                </p>
                <p>
                  We provide these tools &quot;as is&quot; and &quot;as available.&quot;
                  While we strive for 99.9% uptime, we do not guarantee uninterrupted
                  service during maintenance windows or unforeseen technical
                  disruptions.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="account">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">02.</span> Your
                Account
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  Access to FlowCFO requires a valid account. You are responsible for
                  maintaining the confidentiality of your credentials and for all
                  activities that occur under your account. You must notify us
                  immediately at{" "}
                  <Link
                    href="mailto:legal@flowcfo.net"
                    className="text-flow-gold hover:underline"
                  >
                    legal@flowcfo.net
                  </Link>{" "}
                  if you suspect any unauthorized access.
                </p>
                <p>
                  Accounts are for individual use and may not be shared, sold, or
                  transferred without explicit written consent from FlowCFO
                  management.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="use">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">03.</span>{" "}
                Acceptable Use
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  You agree not to use FlowCFO for any illegal or unauthorized purpose.
                  Prohibited activities include but are not limited to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Attempting to reverse engineer the FlowCFO proprietary algorithms.
                  </li>
                  <li>
                    Uploading malicious code or attempting to breach our security
                    infrastructure.
                  </li>
                  <li>
                    Using the platform to conduct money laundering or other fraudulent
                    activities.
                  </li>
                  <li>
                    Extracting data via automated &quot;scraping&quot; tools without
                    API authorization.
                  </li>
                </ul>
              </div>
            </section>

            <section className="section-anchor" id="accuracy">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">04.</span>{" "}
                Financial Data Accuracy
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  FlowCFO aggregates data from third-party financial institutions.
                  While we use industry-leading integration partners, we are not
                  responsible for inaccuracies, delays, or omissions in the data
                  provided by your banks, brokerages, or custodians.
                </p>
                <p>
                  Users are encouraged to cross-reference FlowCFO dashboards with
                  official statements from their financial institutions before making
                  significant investment decisions.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="ai">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">05.</span>{" "}
                AI-Generated Content
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  Our platform utilizes generative AI to provide summaries and
                  predictive modeling. This content is for informational purposes only.
                  AI outputs may contain hallucinations or mathematical errors.
                  FlowCFO does not provide licensed investment, legal, or tax advice.
                </p>
                <div className="border-l-4 border-flow-black bg-surface-container-low p-4 italic">
                  &quot;AI-generated insights are a starting point for discussion with
                  your human advisor, not a replacement for professional fiduciary
                  guidance.&quot;
                </div>
              </div>
            </section>

            <section className="section-anchor" id="billing">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">06.</span>{" "}
                Subscription and Billing
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  FlowCFO operates on a tier-based subscription model. Fees are billed
                  in advance on a monthly or annual basis and are non-refundable except
                  where required by law. We reserve the right to adjust pricing with 30
                  days&apos; notice.
                </p>
                <p>
                  Failure to pay subscription fees may result in restricted access or
                  suspension of your account services.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="termination">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">07.</span>{" "}
                Termination
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  You may terminate your account at any time through the dashboard
                  settings. FlowCFO reserves the right to suspend or terminate your
                  account if we determine you have violated these Terms or if your
                  actions pose a risk to the security or integrity of our systems.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="liability">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">08.</span>{" "}
                Limitation of Liability
              </h3>
              <div className="space-y-4 font-body text-xs tracking-tight text-on-surface-variant uppercase">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FLOWCFO AND ITS
                  AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
                  OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF
                  DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I)
                  YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;
                  (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES.
                </p>
              </div>
            </section>

            <section className="section-anchor" id="law">
              <h3 className="flow-headline-lg mb-6 flex items-center gap-3 text-flow-black">
                <span className="font-mono text-lg text-flow-gold">09.</span>{" "}
                Governing Law
              </h3>
              <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant">
                <p>
                  These Terms shall be governed and construed in accordance with the
                  laws of the State of Delaware, United States, without regard to its
                  conflict of law provisions. Any dispute arising from these terms
                  will be settled through binding arbitration in Wilmington, DE.
                </p>
              </div>
            </section>

            <section className="mt-24 border-t border-flow-line pt-12">
              <h4 className="flow-headline-lg mb-4 text-flow-black">
                Contact Information
              </h4>
              <p className="mb-8 font-body text-base text-on-surface-variant">
                For legal inquiries, formal notices, or questions regarding these
                terms, please contact our legal department:
              </p>
              <div className="inline-flex flex-col gap-2">
                <span className="flow-label text-flow-gold">Legal Department</span>
                <Link
                  href="mailto:legal@flowcfo.net"
                  className="font-mono text-lg text-flow-black underline underline-offset-4 transition-colors hover:text-flow-gold"
                >
                  legal@flowcfo.net
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
