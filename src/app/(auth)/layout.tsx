import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FlowCFO',
    default: 'FlowCFO — Specialized Financial Agent for your business',
  },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4faf7] text-[#173b38] selection:bg-[#c9ec88] selection:text-[#123e3b]">
      {children}
    </div>
  );
}
