import type { Metadata } from "next";
import HomePage from "./home";

export const metadata: Metadata = {
  title: "FlowCFO — Know Exactly What You Can Spend Today",
  description:
    "FlowCFO is your AI-powered virtual CFO. It predicts your cash flow, calculates your tax reserves, and tells you exactly what you can safely spend — today and 90 days from now.",
  openGraph: {
    title: "FlowCFO — Know Exactly What You Can Spend Today",
    description:
      "FlowCFO is your AI-powered virtual CFO. It predicts your cash flow, calculates your tax reserves, and tells you exactly what you can safely spend — today and 90 days from now.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net" },
};

export default function Home() {
  return <HomePage />;
}
