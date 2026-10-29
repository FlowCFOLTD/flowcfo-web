import type { Metadata } from "next";
import HomePage from "./home";
import JsonLd from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FlowCFO — Financial intelligence for people and businesses",
  description:
    "FlowCFO turns financial activity into useful guidance for consumers and small businesses, with APIs for banks and platforms to embed financial intelligence.",
  imageAlt: "FlowCFO financial intelligence for consumers and SMEs",
  keywords: [
    "consumer financial insights",
    "small business cash flow",
    "banking financial intelligence API",
    "SME cash flow forecasting",
    "embedded financial guidance",
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
