import type { Metadata } from "next";
import TaxReserve from "./tax-reserve";

export const metadata: Metadata = {
  title: "Freelancer Tax Reserve Calculator — How Much to Set Aside",
  description:
    "Estimate how much to set aside for quarterly taxes from freelance, creator, agency, or small business income. Free calculator by FlowCFO.",
  openGraph: {
    title: "Freelancer Tax Reserve Calculator — How Much to Set Aside",
    description:
      "Estimate how much to set aside for quarterly taxes from freelance, creator, agency, or small business income. Free calculator by FlowCFO.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net/calculator/tax-reserve" },
};

export default function TaxReservePage() {
  return <TaxReserve />;
}
