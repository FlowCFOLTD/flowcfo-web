import type { Metadata } from "next";
import SafeToSpend from "./safe-to-spend";

export const metadata: Metadata = {
  title: "Safe-to-Spend Calculator — What Can You Actually Spend Today?",
  description:
    "Calculate how much you can safely spend from your business account after taxes, bills, and safety buffer. Free tool by FlowCFO.",
  alternates: { canonical: "https://flowcfo.net/calculator/safe-to-spend" },
};

export default function SafeToSpendPage() {
  return <SafeToSpend />;
}
