import { Metadata } from "next";
import FreelancerStep3 from "./step-3";

export const metadata: Metadata = {
  title: "Tax Configuration | FlowCFO Onboarding",
  description: "Configure your freelancer tax safety net and finalize your FlowCFO command center setup.",
};

export default function FreelancerStep3Page() {
  return <FreelancerStep3 />;
}
