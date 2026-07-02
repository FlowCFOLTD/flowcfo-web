import { Metadata } from "next";
import RestaurantStep3 from "./step-3";

export const metadata: Metadata = {
  title: "Operating Margins | FlowCFO Onboarding",
  description: "Optimize your restaurant's operating margins and configure your automated tax reserve logic.",
  robots: { index: false, follow: false },
};

export default function RestaurantStep3Page() {
  return <RestaurantStep3 />;
}
