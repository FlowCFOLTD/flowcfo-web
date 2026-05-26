import type { Metadata } from "next";
import AgencyStep1 from "./step-1";

export const metadata: Metadata = {
  title: "Agency Setup | FlowCFO Onboarding",
  robots: { index: false },
};

export default function AgencyStep1Page() {
  return <AgencyStep1 />;
}
