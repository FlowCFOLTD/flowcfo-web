import { Metadata } from 'next';
import OnboardingHome from './onboarding-home';

export const metadata: Metadata = {
  title: 'Onboarding | FlowCFO',
  description:
    'Start your journey with FlowCFO. Select your business entity to begin.',
};

export default function OnboardingPage() {
  return <OnboardingHome />;
}
