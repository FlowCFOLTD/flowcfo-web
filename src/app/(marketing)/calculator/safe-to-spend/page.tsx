import type { Metadata } from "next";
import SafeToSpend from "./safe-to-spend";
import { createMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Safe-to-Spend Calculator — What Can You Actually Spend Today?",
  description:
    "Free Safe-to-Spend calculator for business owners. Estimate spendable cash after taxes, upcoming bills, payroll, obligations, and safety buffer.",
  path: "/calculator/safe-to-spend",
  keywords: [
    "safe to spend calculator",
    "business cash flow calculator",
    "small business spending calculator",
    "cash available after taxes",
  ],
});

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate Safe-to-Spend",
  description:
    "Estimate the amount of business cash you can safely spend after reserving money for taxes, upcoming bills, payroll, and a safety buffer.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter current cash",
      text: "Start with the cash available across your business checking and operating accounts.",
    },
    {
      "@type": "HowToStep",
      name: "Subtract obligations",
      text: "Subtract upcoming bills, payroll, pending transactions, debt payments, and inventory commitments.",
    },
    {
      "@type": "HowToStep",
      name: "Reserve taxes and buffer",
      text: "Set aside estimated taxes and a safety buffer for slower weeks or delayed income.",
    },
    {
      "@type": "HowToStep",
      name: "Review the result",
      text: "The remaining amount is your estimated Safe-to-Spend number.",
    },
  ],
};

export default function SafeToSpendPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(howTo) }}
      />
      <SafeToSpend />
    </>
  );
}
