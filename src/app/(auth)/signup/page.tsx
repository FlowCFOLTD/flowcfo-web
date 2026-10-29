import { Metadata } from 'next';
import Signup from './signup';

export const metadata: Metadata = {
  title: 'Create Account | FlowCFO',
  description:
    'FlowCFO access is currently arranged through an assisted setup. Contact our team to discuss personal, SME, or enterprise use.',
};

export default function SignupPage() {
  return <Signup />;
}
