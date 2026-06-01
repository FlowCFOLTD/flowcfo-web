'use client';

import { useUser } from '@/hooks/api/use-user';
import { ChatProvider } from '@/contexts/chat-context';
import Sidebar from '@/components/dashboard/sidebar';
import FloatingChatBubble from '@/components/dashboard/floating-chat-bubble';
import ApprovalPage from './approval/page';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();

  const showApproval = !isLoading && user?.onboarding_completed && !user.approved;

  if (showApproval) {
    return (
      <div className="min-h-screen bg-flow-obsidian">
        <ApprovalPage />
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="min-h-screen bg-flow-obsidian">
        <Sidebar />
        <main className="ml-64 min-h-screen pb-28">
          {children}
        </main>
        <FloatingChatBubble />
      </div>
    </ChatProvider>
  );
}
