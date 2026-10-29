import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FlowCFO',
    default: 'FlowCFO — Specialized Financial Agent for your business',
  },
  robots: { index: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#202421] selection:bg-[#d9c36a] selection:text-[#202421]">
      {children}
    </div>
  );
}
