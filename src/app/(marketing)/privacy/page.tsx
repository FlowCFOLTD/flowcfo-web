import type { Metadata } from "next";
export const dynamic = 'force-static';
import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FlowCFO Privacy Policy — Financial Data & Security",
  description:
    "Read how FlowCFO protects financial data, secures account information, limits data collection, and keeps your business information private.",
  path: "/privacy",
});

const sections = [
  { id: "collect", label: "1. Collection" },
  { id: "no-collect", label: "2. Exclusions" },
  { id: "usage", label: "3. Data Usage" },
  { id: "storage", label: "4. Storage & Security" },
  { id: "sharing", label: "5. Sharing" },
  { id: "rights", label: "6. Your Rights" },
];

export default function PrivacyPage() {
  return (
    <div className="bg-flow-paper selection:bg-flow-gold-soft selection:text-flow-black">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-flow-obsidian pt-40 pb-20 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#D4AF37 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="flow-container relative z-10">
          <h1 className="flow-headline-xl mb-4 text-flow-gold-soft">Privacy Policy</h1>
          <p className="font-mono text-sm tracking-widest uppercase text-flow-muted">
            Last updated: May 2026
          </p>
        </div>
      </header>

      <main className="flow-container py-20">
        <div className="flex flex-col gap-20">
          {/* Plain-English Summary Box */}
          <section className="gold-accent-border border border-flow-line bg-white p-10 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <span className="material-symbols-outlined text-4xl text-flow-gold">
                security
              </span>
              <div>
                <h2 className="flow-label mb-4 text-flow-gold">Plain-English Summary</h2>
                <p className="flow-headline-lg mb-6 leading-relaxed text-flow-black">
                  We prioritize your financial sovereignty. We collect only what is
                  necessary to secure your account and fulfill regulatory
                  requirements. We do not sell your data. We do not track your
                  behavior for advertising. We protect your wealth with
                  institutional-grade encryption.
                </p>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="space-y-2">
                    <span className="flow-label-wide block text-[10px] text-flow-muted">
                      Data Ownership
                    </span>
                    <p className="font-body text-sm text-flow-black">
                      You own 100% of your data.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="flow-label-wide block text-[10px] text-flow-muted">
                      Advertising
                    </span>
                    <p className="font-body text-sm text-flow-black">
                      Zero third-party ad tracking.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="flow-label-wide block text-[10px] text-flow-muted">
                      Encryption
                    </span>
                    <p className="font-body text-sm text-flow-black">
                      End-to-end institutional standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            {/* Sidebar Navigation (Desktop) */}
            <aside className="hidden md:sticky md:top-32 md:col-span-3 md:block h-fit">
              <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="flow-label border-b border-flow-line py-3 text-flow-black transition-colors hover:text-flow-gold"
                  >
                    {section.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Text Content */}
            <div className="space-y-24 md:col-span-9">
              <section className="scroll-mt-32" id="collect">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  1. What we collect
                </h3>
                <p className="mb-6 font-body text-base leading-relaxed text-on-surface-variant">
                  To provide the high-performance financial command center expected by
                  our clients, we collect specific categories of information necessary
                  for account verification and portfolio analysis.
                </p>
                <ul className="list-none space-y-4">
                  <li className="flex items-center gap-3 font-body text-base text-flow-black">
                    <span className="h-1.5 w-1.5 bg-flow-gold"></span>
                    <span>
                      Identification: Name, legal address, and government-issued tax
                      identifiers.
                    </span>
                  </li>
                  <li className="flex items-center gap-3 font-body text-base text-flow-black">
                    <span className="h-1.5 w-1.5 bg-flow-gold"></span>
                    <span>
                      Financial Data: Bank account links (via secure API), transaction
                      histories, and asset valuations.
                    </span>
                  </li>
                  <li className="flex items-center gap-3 font-body text-base text-flow-black">
                    <span className="h-1.5 w-1.5 bg-flow-gold"></span>
                    <span>
                      Technical Meta: IP addresses, device types, and browser versions
                      for security auditing.
                    </span>
                  </li>
                </ul>
              </section>

              <section className="scroll-mt-32" id="no-collect">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  2. What we do NOT collect
                </h3>
                <div className="border border-flow-gold bg-flow-black p-8 text-white">
                  <p className="mb-6 font-body text-base italic opacity-80">
                    &quot;FlowCFO maintains a strict policy of minimal intrusion.&quot;
                  </p>
                  <p className="font-body text-base leading-relaxed">
                    We explicitly do not collect or monitor your physical location
                    outside of necessary security logging, nor do we access your
                    personal contacts, photos, or private communications. We do not
                    scrape data from other applications on your device.
                  </p>
                </div>
              </section>

              <section className="scroll-mt-32" id="usage">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  3. How we use your data
                </h3>
                <p className="mb-6 font-body text-base leading-relaxed text-on-surface-variant">
                  Your data is utilized strictly for the functional performance of the
                  FlowCFO dashboard:
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border border-flow-line bg-white p-6 shadow-sm">
                    <h4 className="flow-label mb-2 text-flow-black">
                      Portfolio Benchmarking
                    </h4>
                    <p className="font-body text-sm text-on-surface-variant">
                      Anonymized aggregation to provide market comparison tools.
                    </p>
                  </div>
                  <div className="border border-flow-line bg-white p-6 shadow-sm">
                    <h4 className="flow-label mb-2 text-flow-black">Compliance</h4>
                    <p className="font-body text-sm text-on-surface-variant">
                      Meeting Anti-Money Laundering (AML) and Know Your Customer (KYC)
                      statutes.
                    </p>
                  </div>
                </div>
              </section>

              <section className="scroll-mt-32" id="storage">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  4. How we store it
                </h3>
                <p className="font-body text-base leading-relaxed text-on-surface-variant">
                  FlowCFO uses encrypted transport, application-level protection
                  for provider tokens, access controls, and auditable request IDs.
                  Storage encryption, regions, retention, backups, and infrastructure
                  certifications depend on the selected production hosting provider
                  and are documented before an enterprise deployment.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBYsl64VFNn-rNxLmm_egweFEZUe_RqzBOggnRm4tnfJz01xDDLtqfOLZoOeR1E034EPPlmt0x545Skv2-J5NHVK_WKN49kVSAXh9aevY_G_hOdbSorsHojYEI69IrjjqL2pVTnxUIQrJRYQShlds1yhcen2om0prFIh7x-a1mr0BcxtSJ8jFLaK2LTH14Q53juj_c7jc-fnC_78rKNjbTaDdyCqCkcxfEAEGSf3DFU2C__08KNG2fFvD6GqDm5vsurK0q63IUy5N5W",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAIfUwLQlzspqZ5gzmVICZTR6opz_jqVh9nDKTeR7awcUOxvvERogPVY5mp9cafrl1ZLqubga9tPwC8MxZHT7XaPCo3xVAoEJWEjNH4l1FK121lgL2V7zTl3T3SKcg54exZo1kfjste0SqKqqHvAWv1YIzm9oAi9N5oYCQri7eqiIHFFXXUGk3GCc3MXll2Kv8wIhiWEfxakphBbZeMKGwYFj5VZ9a_1LrzH3WSeBaEvFL-tiFZg2mNPpZ_-IpnPaUfyaUrqMK8L8yR",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaFO14O_vUS9LNepoaulNzMDmYtVQkBw7FT-lsKinY5Tf-_PS-WqSMFE_DaduJFr4oLKnN2AkiJnKOZ_euRGztTxk1g6aZ5p3DYGBHWI1D5hF-avGrnhNY0bIAu_0yvtIvQZY63LzYnBu-iM1sY2Hjw-xspdgbgnf66y3gxUf7xemXXOCVMfSs2HnbmE8xtZn7Zj38PIptcgsVWR18alE0gypwNT2dAExyPlCubTWqnodjKPYNrFGbZVzVVeaPWmf5jg0fJm_epVQu",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQOdh4QyBUycMCz9Lrq7c4xXc60R29n48UlBTu0wwdoO_S-C00LvENLfXho0PlsX3PTIJFXdh1VwOR1gWYT3YxLCu3_MEou1mjd3Dt02zbHJFEtVhP5Wk9_iWvdspGMcYV-PgPLbErZomkxC4EQB6PHNXVjecpkqH-TYyHdMZbr54bC55A1-h2iQbimVLroZ7iRfmEqJwL8TPhRKXG3Nuw2Fanu5MGDtqHAng2YWTbjXGywzpxsLI1ATzi4n_vebs5yrxRlmHhe39N",
                  ].map((src, i) => (
                    <div key={i} className="relative h-32 w-full overflow-hidden grayscale opacity-50 transition-all duration-700 hover:grayscale-0 hover:opacity-100">
                      <Image
                        alt={`Security Infrastructure ${i + 1}`}
                        fill
                        className="object-cover"
                        src={src}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className="scroll-mt-32" id="sharing">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  5. Who we share it with
                </h3>
                <p className="mb-6 font-body text-base leading-relaxed text-on-surface-variant">
                  We do not sell, rent, or trade your personal data to third parties.
                  Sharing only occurs with:
                </p>
                <ul className="space-y-4">
                  <li className="border-b border-flow-line pb-4 font-body text-base text-flow-black">
                    <strong>Regulated Partners:</strong> Financial institutions
                    required to facilitate your requested transactions.
                  </li>
                  <li className="border-b border-flow-line pb-4 font-body text-base text-flow-black">
                    <strong>Legal Mandates:</strong> Where required by law, subpoena,
                    or valid court order from a recognized jurisdiction.
                  </li>
                  <li className="border-b border-flow-line pb-4 font-body text-base text-flow-black">
                    <strong>Infrastructure Providers:</strong> Essential service
                    providers (e.g., AWS) who maintain the physical storage of
                    encrypted data.
                  </li>
                </ul>
              </section>

              <section className="scroll-mt-32" id="rights">
                <h3 className="flow-headline-lg mb-8 text-flow-black">
                  6. Your rights
                </h3>
                <p className="mb-8 font-body text-base leading-relaxed text-on-surface-variant">
                  You maintain full control over your digital footprint within our
                  ecosystem. You have the right to:
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Request a full export of your data (Data Portability)",
                    "Correct inaccuracies in your financial profile",
                    "Request total deletion of your account and data",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="group flex cursor-pointer items-center justify-between border border-flow-line bg-white p-6 transition-all hover:border-flow-gold"
                    >
                      <span className="font-body text-base font-bold text-flow-black">
                        {text}
                      </span>
                      <span className="material-symbols-outlined text-flow-gold transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Advisor CTA */}
              <section className="bg-flow-black p-12 text-center text-white">
                <h3 className="flow-headline-lg mb-4 text-white">
                  Questions regarding your privacy?
                </h3>
                <p className="mx-auto mb-8 max-w-xl font-body text-base text-flow-muted">
                  Our dedicated privacy officer is available for direct consultation
                  regarding your data security and rights.
                </p>
                <Link
                  href="mailto:privacy@flowcfo.net"
                  className="flow-label inline-block bg-flow-gold px-10 py-4 font-bold text-flow-black transition-colors hover:bg-flow-gold-soft"
                >
                  Contact Advisor
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
