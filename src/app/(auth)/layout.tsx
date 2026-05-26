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
    <div className="min-h-screen bg-flow-obsidian text-white selection:bg-flow-gold selection:text-flow-black">
      {children}
    </div>
  );
}
