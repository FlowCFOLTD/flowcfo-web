import type { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import AskFlowCfoBar from '@/components/dashboard/ask-flowcfo-bar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-flow-obsidian">
      <Sidebar />
      <main className="ml-64 min-h-screen pb-28">
        {children}
      </main>
      <AskFlowCfoBar />
    </div>
  );
}
