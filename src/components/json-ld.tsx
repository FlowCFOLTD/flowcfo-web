import { jsonLd } from "@/lib/seo";

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
    price: "29",
    priceCurrency: "USD",
    description: "Starter plan begins at $29/month. Early access may vary.",
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
    {
      "@type": "Question",
      name: "Who is FlowCFO best for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCFO is built for small business owners who make cash decisions often: ecommerce sellers, freelancers, agencies, restaurants, and startups. It is especially useful when tax reserves, irregular income, platform fees, inventory, payroll, or runway make a bank balance misleading.",
      },
    },
    {
      "@type": "Question",
      name: "What does Safe-to-Spend mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safe-to-Spend is the amount of money available after FlowCFO accounts for tax reserves, upcoming bills, payroll, inventory obligations, pending transactions, and a safety buffer.",
      },
    },
    {
      "@type": "Question",
      name: "Can FlowCFO help ecommerce sellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCFO monitors ecommerce gross margin, COGS trends, platform and payment fees, inventory replenishment, payouts, VAT, cash flow, and product pricing decisions for online sellers.",
      },
    },
    {
      "@type": "Question",
      name: "Can FlowCFO help freelancers with quarterly taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCFO estimates how much income should be reserved for taxes, tracks quarterly readiness, and helps freelancers avoid confusing gross revenue with spendable cash.",
      },
    },
    {
      "@type": "Question",
      name: "Does FlowCFO work in Telegram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCFO includes Telegram chat interfaces for user questions, OTP authentication, proactive notifications, morning briefs, and agent action confirmations.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faq) }}
      />
    </>
  );
}
