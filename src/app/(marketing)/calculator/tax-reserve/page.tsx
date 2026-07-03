import type { Metadata } from "next";
export const dynamic = 'force-static';
import TaxReserve from "./tax-reserve";
import { createMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Freelancer Tax Reserve Calculator — How Much to Set Aside",
  description:
    "Estimate how much freelance, creator, agency, or small business income to reserve for quarterly taxes. Free tax reserve calculator by FlowCFO.",
  path: "/calculator/tax-reserve",
  keywords: [
    "freelancer tax reserve calculator",
    "quarterly tax calculator",
    "self employed tax set aside calculator",
    "small business tax reserve",
  ],
});

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to estimate a freelance tax reserve",
  description:
    "Estimate how much business income to set aside for quarterly taxes based on revenue, expenses, and a target tax rate.",
  step: [
    {
      "@type": "HowToStep",
      name: "Estimate taxable profit",
      text: "Start with business income and subtract deductible business expenses.",
    },
    {
      "@type": "HowToStep",
      name: "Choose a reserve rate",
      text: "Apply a tax reserve percentage based on your country, business type, and expected tax bracket.",
    },
    {
      "@type": "HowToStep",
      name: "Set money aside",
      text: "Move the reserve amount away from operating cash so it is not mistaken for spendable money.",
    },
  ],
};

export default function TaxReservePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(howTo) }}
      />
      <TaxReserve />
    </>
  );
}
