'use client';

import { useRouter } from 'next/navigation';
import { Bot, Send } from 'lucide-react';

const suggestions = [
  'How do I stabilize my income?',
  'Am I saving enough for taxes?',
  'Project Q4 Revenue',
];

export default function AskFlowCfoBar() {
  const router = useRouter();

  const handleSuggestion = (text: string) => {
    router.push(`/dashboard/ai-advisor?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 p-4 md:p-6 z-40">
      <div className="mx-auto max-w-4xl bg-flow-black text-white p-3 md:p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-3 border-r border-white/20 pr-6">
          <Bot className="h-5 w-5 text-flow-gold shrink-0" />
          <span className="flow-label tracking-[0.15em] text-[10px] whitespace-nowrap">
            Ask FlowCFO
          </span>
        </div>

        <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {suggestions.map((text) => (
            <button
              key={text}
              onClick={() => handleSuggestion(text)}
              className="whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 font-body text-[11px] transition-colors text-white/70 hover:text-white"
            >
              {text}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push('/dashboard/ai-advisor')}
          className="flex-shrink-0 w-56 relative hidden md:block group"
        >
          <div className="w-full bg-white/5 border border-white/20 px-4 py-2 pr-10 text-[11px] text-left text-white/30 font-body group-hover:border-flow-gold/40 transition-colors">
            Ask FlowCFO...
          </div>
          <Send className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40 group-hover:text-flow-gold transition-colors" />
        </button>
      </div>
    </div>
  );
}
