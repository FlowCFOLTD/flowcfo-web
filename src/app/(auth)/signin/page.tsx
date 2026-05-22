import { Metadata } from 'next';
import Signin from './signin';

export const metadata: Metadata = {
  title: 'Sign In | FlowCFO',
  description:
    'Access your financial command center. CFO-level clarity for founders and business owners.',
};

export default function SigninPage() {
  return <Signin />;
}
