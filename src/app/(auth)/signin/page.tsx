import { Metadata } from 'next';
import Signin from './signin';

export const metadata: Metadata = {
  title: 'Sign In | FlowCFO',
  description:
    'Self-service sign-in is currently unavailable. Contact FlowCFO to arrange access and a setup conversation.',
};

export default function SigninPage() {
  return <Signin />;
}
