import type { Metadata } from "next";
import HomePage from "./home";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FlowCFO — Vertical AI Agents for Ecommerce, Freelancers, Startups & Restaurants",
  description:
    "FlowCFO deploys vertical AI agents that monitor your business finances 24/7 — gross margins, platform fees, inventory cash flow, burn rate, tax reserves, and safe-to-spend. Built for ecommerce brands, bootstrapped founders, freelancers, agencies, restaurants, and startups. Autonomous monitoring with human-in-the-loop approval.",
  openGraph: {
    title: "FlowCFO — AI Financial Agents for Every Business Model",
    description:
      "Vertical AI agents purpose-built for your business type. Margin Guardian, Fee Auditor, Inventory Replenishment, Cash Flow Forecasting, Tax Reserve Engine, and AI Advisor — all working continuously with your approval.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO — Vertical AI Agents" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <HomePage />
    </>
  );
}
