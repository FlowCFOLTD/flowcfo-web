import { Metadata } from 'next';
import AcceptTerms from './accept-terms';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Accept Terms | FlowCFO',
};

export default async function AcceptTermsPage(props: { searchParams: Promise<{ token?: string; email?: string }> }) {
  const searchParams = await props.searchParams;
  return <AcceptTerms token={searchParams?.token || ''} email={searchParams?.email || ''} />;
}
