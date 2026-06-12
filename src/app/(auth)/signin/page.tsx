import { Metadata } from 'next';
import Signin from './signin';

export const metadata: Metadata = {
  title: 'Sign In | FlowCFO',
  description:
    'Access your financial command center. CFO-level clarity for founders and business owners.',
};

export default async function SigninPage(props: { searchParams: Promise<{ verify?: string; email?: string }> }) {
  const searchParams = await props.searchParams;
  return <Signin verify={searchParams?.verify} verifyEmail={searchParams?.email} />;
}
