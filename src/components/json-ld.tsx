const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  logo: "https://flowcfo.net/logo.png",
  description:
    "AI-powered virtual CFO for founders, freelancers, e-commerce brands, agencies, and restaurants.",
  sameAs: [],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  description: "Know Exactly What You Can Spend Today",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://flowcfo.net/search?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlowCFO",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "FlowCFO connects to your bank accounts, predicts cash flow, calculates tax reserves, and tells you exactly how much you can safely spend.",
  offers: {
    "@type": "Offer",
    price: "19",
    priceCurrency: "USD",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
    </>
  );
}
