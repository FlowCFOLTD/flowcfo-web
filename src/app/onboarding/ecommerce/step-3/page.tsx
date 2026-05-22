import { Metadata } from "next";
import EcommerceStep3 from "./step-3";

export const metadata: Metadata = {
  title: "Tax Reserve Configuration | FlowCFO Onboarding",
  description: "Configure your tax reserve strategy to protect your working capital. Set your Safe-to-Spend™ precision.",
};

export default function EcommerceStep3Page() {
  return <EcommerceStep3 />;
}
