'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, X, Maximize2, Send, Square } from 'lucide-react';
import { useChat } from '@/contexts/chat-context';

export default function FloatingChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const router = useRouter();
  const { messages, isStreaming, error, sendMessage, dismissError, stopStreaming } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* Bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-flow-gold flex items-center justify-center shadow-xl hover:brightness-110 transition-all active:scale-95"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-flow-black" />
        ) : (
          <Bot className="h-6 w-6 text-flow-black" />
        )}
      </button>

      {/* Popover chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] h-[560px] bg-flow-obsidian border border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-flow-gold/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-flow-gold text-sm">auto_awesome</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Ask FlowCFO</p>
                <p className="text-[10px] text-white/40">AI Financial Analyst</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/dashboard/ai-advisor');
                }}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                title="Expand to full page"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 bg-flow-gold/10 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-flow-gold" />
                </div>
                <p className="text-white/60 text-sm font-body max-w-xs">
                  Ask me anything about your finances. I'll use your actual data to give you precise answers.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-white/10 border border-white/10 px-4 py-3">
                      <p className="text-sm text-white font-body">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-flow-gold/20 flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-flow-gold text-sm">auto_awesome</span>
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm leading-relaxed text-white/80 font-body prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content || (msg === messages[messages.length - 1] ? 'Thinking...' : '')}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.content && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-flow-gold/20 flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-flow-gold text-sm">auto_awesome</span>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-flow-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-flow-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-flow-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-white/10 p-4">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your finances..."
                rows={1}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-sm resize-none focus:ring-0 focus:border-flow-gold/50 text-white placeholder:text-white/20 font-body max-h-[120px]"
                disabled={isStreaming}
              />
              {isStreaming ? (
                <button
                  onClick={stopStreaming}
                  className="absolute right-3 bottom-3 w-8 h-8 bg-rose-600 flex items-center justify-center hover:bg-rose-700 transition-all"
                >
                  <Square className="h-3.5 w-3.5 text-white fill-white" />
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-3 bottom-3 w-8 h-8 bg-flow-gold flex items-center justify-center hover:brightness-110 transition-all active:scale-95 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5 text-flow-black" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {error?.type === 'limit' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-flow-dark border border-white/10 p-10 max-w-md w-full mx-4 relative animate-in fade-in zoom-in-95">
            <button
              onClick={dismissError}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="w-12 h-12 bg-flow-gold/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-flow-gold text-2xl">auto_awesome</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Question limit reached
            </h3>
            <p className="text-white/50 text-sm mb-8 font-body leading-relaxed">
              {error.waitMinutes
                ? `You've used all your AI questions this hour. Try again in ${error.waitMinutes} minute${error.waitMinutes === 1 ? '' : 's'}.`
                : `You've used all your AI questions this hour. Try again later.`}
            </p>
            <a
              href="/settings/accounts"
              className="block w-full py-3.5 bg-flow-gold text-flow-black text-center font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all mb-3"
            >
              Upgrade to Pro for unlimited
            </a>
            <button
              onClick={dismissError}
              className="block w-full py-3 text-white/40 text-center text-xs uppercase tracking-widest hover:text-white/70 transition-all font-body"
            >
              {error.waitMinutes ? `Wait ${error.waitMinutes} min` : 'Dismiss'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
