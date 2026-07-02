import type { Metadata } from "next";
import HomePage from "./home";
import JsonLd from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FlowCFO — AI Virtual CFO for Small Business Cash Flow",
  description:
    "Know what you can safely spend today. FlowCFO forecasts cash flow, calculates tax reserves, monitors margins, and runs vertical AI agents for your business.",
  imageAlt: "FlowCFO financial command center dashboard",
  keywords: [
    "AI virtual CFO",
    "small business cash flow software",
    "safe to spend",
    "cash flow forecasting AI",
    "ecommerce margin monitoring",
    "freelancer tax reserve",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd />
      <HomePage />
    </>
  );
}
