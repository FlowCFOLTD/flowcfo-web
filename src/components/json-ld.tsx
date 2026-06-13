const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  logo: "https://flowcfo.net/logo.png",
  description:
    "Vertical AI agents that monitor your business finances continuously — margins, cash flow, tax reserves, platform fees, and safe-to-spend. Purpose-built for ecommerce, freelancers, agencies, restaurants, and startups.",
  sameAs: [],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlowCFO",
  url: "https://flowcfo.net",
  description:
    "Vertical AI financial agents for ecommerce, freelancers, agencies, restaurants, and startups. Autonomous margin monitoring, cash flow forecasting, tax reserve calculation, and safe-to-spend analysis.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://flowcfo.net/search?q={search_term_string}",
    },
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
    "FlowCFO deploys vertical AI agents that connect to your business accounts, monitor gross margins, platform fees, inventory cash flow, burn rate, and tax reserves. Autonomous financial monitoring with human approval via in-app notifications and Telegram. Built for ecommerce brands, bootstrapped founders, freelancers, agencies, restaurants, and startups.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Beta access — no credit card required",
  },
  featureList: [
    "Margin Guardian — monitors gross margin trends and investigates drops automatically",
    "Fee Auditor — scans platform and processor fees for overcharges",
    "Inventory Replenishment — drafts purchase orders when stock runs low",
    "Cash Flow Forecasting — 30/60/90 day projections from real transaction data",
    "Tax Reserve Engine — calculates estimated liability vs what you've saved",
    "Safe-to-Spend — how much you can withdraw after upcoming bills and buffer",
    "Burn Rate Monitoring — tracks monthly cash consumption for startups",
    "AI Advisor — natural language questions about your finances",
  ],
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FlowCFO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCFO is an autonomous finance platform powered by vertical AI agents. Unlike generic financial dashboards, FlowCFO deploys specialized agents for your specific business type — ecommerce, freelancer, agency, restaurant, or startup. Each agent monitors your finances continuously, alerts you to issues, and recommends actions that require your approval.",
      },
    },
    {
      "@type": "Question",
      name: "How is FlowCFO different from QuickBooks or Xero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QuickBooks and Xero are accounting tools that track what already happened. FlowCFO is an AI finance team that watches your numbers continuously, predicts what's coming, and alerts you to problems before they happen. We also integrate with your accounting software rather than replacing it.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of businesses is FlowCFO for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCFO is purpose-built for ecommerce brands (Shopify, Amazon, DTC), freelancers and solopreneurs, digital agencies, restaurants and food service, and bootstrapped startups. Each business type gets a customized set of AI agents tuned to their specific financial metrics and challenges.",
      },
    },
    {
      "@type": "Question",
      name: "How does FlowCFO's Margin Guardian work for ecommerce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Margin Guardian monitors your gross margin trends continuously. When margin drops, it investigates the root cause — rising COGS, increased platform fees, shipping cost changes, or discounting — and alerts you with a recommended action. All alerts require your approval before any action is taken.",
      },
    },
    {
      "@type": "Question",
      name: "Does FlowCFO replace my accountant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. FlowCFO handles day-to-day financial monitoring, forecasting, and alerts that a traditional CFO would provide. Your accountant still handles tax filing, compliance, and strategic advice. FlowCFO makes your accountant's job easier by keeping your financial data organized and identifying issues early.",
      },
    },
    {
      "@type": "Question",
      name: "How does FlowCFO handle data security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCFO uses bank-level 256-bit encryption for all data in transit and at rest. We connect securely via read-only API access to your financial platforms. Your data is never shared or sold, and you can revoke access at any time.",
      },
    },
    {
      "@type": "Question",
      name: "What is safe-to-spend and how does FlowCFO calculate it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safe-to-spend is the amount of cash you can withdraw or reinvest after accounting for upcoming bills, payroll, tax reserves, and a safety buffer. FlowCFO calculates it automatically from your actual transaction data and cash flow forecast, so you always know exactly what's available.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
