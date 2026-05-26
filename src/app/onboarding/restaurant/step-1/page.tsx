import type { Metadata } from "next";
import RestaurantStep1 from "./step-1";

export const metadata: Metadata = {
  title: "Restaurant Setup | FlowCFO Onboarding",
  robots: { index: false },
};

export default function RestaurantStep1Page() {
  return <RestaurantStep1 />;
}
