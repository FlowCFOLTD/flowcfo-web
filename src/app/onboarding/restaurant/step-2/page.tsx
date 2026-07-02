import { Metadata } from "next";
import RestaurantStep2 from "./step-2";

export const metadata: Metadata = {
  title: "Bank Connection | FlowCFO Onboarding",
  description: "Securely link your restaurant's operating accounts to FlowCFO. Track prime costs and Safe-to-Spend levels in real-time.",
  robots: { index: false, follow: false },
};

export default function RestaurantStep2Page() {
  return <RestaurantStep2 />;
}
