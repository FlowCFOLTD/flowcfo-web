import { jsonLd } from "@/lib/seo";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  logo: "https://flowcfo.net/logo.png",
  description:
    "FlowCFO builds financial intelligence for consumers and small businesses, with APIs for banks and platforms to embed financial guidance in their own customer experiences.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  description:
    "Understand personal spending and commitments, monitor business cash flow, and explore financial intelligence APIs for banks and platforms.",
};

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "FlowCFO provides consumer financial guidance and small-business cash-flow intelligence. Capabilities include spending analysis, commitment reminders, budgeting guidance, liquidity forecasts, early-warning signals, and partner APIs for banks and platforms. Product scope, data sources, and availability are confirmed during assisted setup.",
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(softwareApp) }}
      />
    </>
  );
}
