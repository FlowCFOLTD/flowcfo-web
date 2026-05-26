import type { Metadata } from "next";
import FreelancerStep1 from "./step-1";

export const metadata: Metadata = {
  title: "Freelancer Setup | FlowCFO Onboarding",
  robots: { index: false },
};

export default function FreelancerStep1Page() {
  return <FreelancerStep1 />;
}
