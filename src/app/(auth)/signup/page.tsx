import { Metadata } from 'next';
import Signup from './signup';

export const metadata: Metadata = {
  title: 'Create Account | FlowCFO',
  description:
    'Join the elite founders managing their business finances with CFO-level clarity. Claim your financial command center today.',
};

export default function SignupPage() {
  return <Signup />;
}
