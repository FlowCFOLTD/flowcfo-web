import { Metadata } from "next";
import EcommerceStep2 from "./step-2";

export const metadata: Metadata = {
  title: "Bank Connection | FlowCFO Onboarding",
  description: "Securely link your bank accounts to FlowCFO. Track margins and safe-to-spend levels in real-time.",
  robots: { index: false, follow: false },
};

export default function EcommerceStep2Page() {
  return <EcommerceStep2 />;
}
