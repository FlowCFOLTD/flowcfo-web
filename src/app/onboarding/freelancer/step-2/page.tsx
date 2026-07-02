import { Metadata } from "next";
import FreelancerStep2 from "./step-2";

export const metadata: Metadata = {
  title: "Bank Connection | FlowCFO Onboarding",
  description: "Securely link your bank accounts to FlowCFO. Build your Safe-to-Spend baseline with institutional precision.",
  robots: { index: false, follow: false },
};

export default function FreelancerStep2Page() {
  return <FreelancerStep2 />;
}
