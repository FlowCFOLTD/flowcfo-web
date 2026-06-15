'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/api/use-user';
import { useChat } from '@/contexts/chat-context';

function AiAdvisorContent() {
  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    dismissError,
    stopStreaming,
    clearMessages,
  } = useChat();
  const searchParams = useSearchParams();
  const { data: user } = useUser();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const sentRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const q = searchParams.get('q');
  useEffect(() => {
    if (q && !sentRef.current) {
      sentRef.current = true;
      sendMessage(q);
    }
  }, [q, sendMessage]);

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
    el.style.height = `${el.scrollHeight}px`;
  };

  const bt = user?.business_type;

  const isFreelancer = bt === 'freelancer';
  const isStartup = bt === 'startup';
  const isAgency = bt === 'agency';
  const isEcommerce = bt === 'ecommerce';
  const isRestaurant = bt === 'restaurant';

  const suggestionChips = isFreelancer
    ? [
        'Analyze my income volatility',
        'How to optimize my rates?',
        'Improve tax readiness',
        'Cash flow smoothing tips',
      ]
    : isStartup
      ? [
          'Analyze my burn rate',
          'How to extend runway?',
          'Reduce customer acquisition cost',
          'MRR growth strategy',
        ]
      : isAgency
        ? [
            'Analyze client profitability',
            'How to diversify revenue?',
            'Improve cash flow forecast',
            'Retainer pricing strategy',
          ]
        : isEcommerce
          ? [
              'Analyze my gross margin',
              'How to reduce platform fees?',
              'Optimize inventory turnover',
              'Improve cash flow forecast',
            ]
          : isRestaurant
            ? [
                'Analyze my food cost',
                'How to reduce labor cost?',
                'Optimize daily revenue',
                'Improve cash flow forecast',
              ]
            : [
                'Analyze my burn rate',
                'How to extend runway?',
                'Reduce customer acquisition cost',
                'MRR growth strategy',
              ];

  const getWelcome = () => {
    if (isFreelancer)
      return `I've analyzed your income patterns, tax readiness, and rates. Ask me anything about your freelance finances — I'll use your actual data to give you precise answers.`;
    if (isStartup)
      return `I've analyzed your startup's burn rate, runway, and unit economics. Ask me anything about your financials — I'll use your actual data to give you precise answers.`;
    if (isAgency)
      return `I've analyzed your client profitability and revenue diversification. Ask me anything about your agency's finances — I'll use your actual data to give you precise answers.`;
    if (isEcommerce)
      return `I've analyzed your store's gross margins, platform fees, and inventory turnover. Ask me anything about your e-commerce finances — I'll use your actual data to give you precise answers.`;
    if (isRestaurant)
      return `I've analyzed your food cost, labor cost, and daily revenue patterns. Ask me anything about your restaurant's finances — I'll use your actual data to give you precise answers.`;
    return `I've analyzed your performance for the current quarter. Ask me anything about your finances — I'll use your actual data to give you precise answers.`;
  };

  const getMainCardLabel = () => {
    if (isFreelancer) return 'INCOME ANALYSIS';
    if (isStartup) return 'BURN ANALYSIS';
    if (isAgency) return 'PROFITABILITY REVIEW';
    if (isEcommerce) return 'MARGIN ANALYSIS';
    if (isRestaurant) return 'FOOD COST ANALYSIS';
    return 'Strategic Opportunity';
  };

  const getMainCardTitle = () => {
    if (isFreelancer) return 'Stabilize Your Income';
    if (isStartup) return 'Optimize Your Burn Rate';
    if (isAgency) return 'Improve Client Margins';
    if (isEcommerce) return 'Improve Gross Margins';
    if (isRestaurant) return 'Reduce Food Cost';
    return 'Optimize Your Platform Fees';
  };

  const getMainCardDesc = () => {
    if (isFreelancer)
      return `Your income varies month to month. I can help identify retainer opportunities and build a cash buffer to smooth out the feast-or-famine cycle.`;
    if (isStartup)
      return `Based on your current spending patterns, I've identified opportunities to reduce burn without impacting growth. Analyze your expense categories to find savings.`;
    if (isAgency)
      return `Your client margins tell the real story. I can help identify which accounts are dragging down profitability and where to focus your team's time.`;
    if (isEcommerce)
      return `Your margin profile varies across products and channels. I can help identify which SKUs are dragging down overall profitability and suggest price or cost adjustments.`;
    if (isRestaurant)
      return `Your food cost percentage directly impacts your bottom line. I can help identify supplier pricing issues and optimize your menu mix.`;
    return 'Based on your current processing volume, migrating to an interchange-plus model could reduce fees significantly.';
  };

  const getMainCardAction = () => {
    if (isFreelancer) return 'Run Income Analysis';
    if (isStartup) return 'Run Burn Analysis';
    if (isAgency) return 'Review Margins';
    if (isEcommerce) return 'Run Margin Analysis';
    if (isRestaurant) return 'Analyze Food Cost';
    return 'Run Simulation';
  };

  const getMainCardPrompt = () => {
    if (isFreelancer)
      return 'Analyze my income volatility and suggest retainer opportunities';
    if (isStartup) return 'Analyze my burn rate and suggest optimizations';
    if (isAgency)
      return 'Analyze my client profitability and suggest improvements';
    if (isEcommerce) return 'Analyze my gross margin and suggest optimizations';
    if (isRestaurant) return 'Analyze my food cost and suggest optimizations';
    return 'How can I reduce my platform fees?';
  };

  const getSecondaryLabel = () => {
    if (isFreelancer) return 'Tax Readiness';
    if (isStartup) return 'Runway Projection';
    if (isAgency) return 'Revenue Diversification';
    if (isEcommerce) return 'Fee Optimization';
    if (isRestaurant) return 'Labor Optimization';
    return 'Tax Projection';
  };

  const getSecondaryValue = () => {
    if (isFreelancer) return '73%';
    if (isStartup) return '12.4 months';
    if (isAgency) return '42%';
    if (isEcommerce) return '$12,500';
    if (isRestaurant) return '28%';
    return '$142,500';
  };

  const getSecondarySubtext = () => {
    if (isFreelancer) return 'Tax Readiness Score';
    if (isStartup) return 'Estimated Runway at Current Burn';
    if (isAgency) return 'Top Client Concentration';
    if (isEcommerce) return 'Potential Annual Savings';
    if (isRestaurant) return 'Current Labor Cost';
    return 'Estimated Q3 Liability';
  };

  const getSecondaryAction = () => {
    if (isFreelancer) return 'Optimize Tax';
    if (isStartup) return 'View Scenarios';
    if (isAgency) return 'Diversify Now';
    if (isEcommerce) return 'Optimize Fees';
    if (isRestaurant) return 'Optimize Labor';
    return 'Optimize Tax';
  };

  const getSecondaryPrompt = () => {
    if (isFreelancer) return 'How can I improve my tax readiness?';
    if (isStartup) return 'Show me my runway projection and scenarios';
    if (isAgency) return 'How can I diversify my revenue?';
    if (isEcommerce) return 'How can I reduce my platform fees?';
    if (isRestaurant) return 'How can I reduce my labor cost?';
    return 'What is my tax projection for Q3?';
  };

  const getPlaceholder = () => {
    if (isFreelancer) return 'Ask FlowCFO about your freelance business...';
    if (isStartup) return 'Ask FlowCFO about your startup...';
    if (isAgency) return 'Ask FlowCFO about your agency...';
    if (isEcommerce) return 'Ask FlowCFO about your store...';
    if (isRestaurant) return 'Ask FlowCFO about your restaurant...';
    return 'Ask FlowCFO...';
  };

  return (
    <div className="px-6 md:px-16 py-12 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
        {/* Welcome State */}
        {messages.length === 0 && (
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 bg-flow-gold/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-flow-gold">
                  auto_awesome
                </span>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-2">
                  Good afternoon{user?.full_name ? `, ${user.full_name}` : ''}.
                </h2>
                <p className="text-white/50 max-w-2xl font-body">
                  {getWelcome()}
                </p>
              </div>
            </div>

            {/* Bento Suggestions */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 p-8 border border-white/10 bg-white/5 cursor-pointer hover:border-flow-gold/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <span className="flow-label text-[10px] text-flow-gold tracking-widest">
                    {getMainCardLabel()}
                  </span>
                  <span className="material-symbols-outlined text-flow-gold">
                    trending_up
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-4 text-white">
                  {getMainCardTitle()}
                </h3>
                <p className="text-white/50 text-sm mb-6 font-body">
                  {getMainCardDesc()}
                </p>
                <button
                  onClick={() => setInput(getMainCardPrompt())}
                  className="flex items-center gap-2 text-xs font-bold text-flow-gold hover:gap-4 transition-all uppercase tracking-wider"
                >
                  {getMainCardAction()}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="col-span-4 p-8 border border-flow-gold/30 bg-flow-gold/5 flex flex-col justify-between">
                <div>
                  <span className="flow-label text-[10px] text-flow-gold tracking-widest">
                    {getSecondaryLabel()}
                  </span>
                  <div className="mt-4 font-mono text-2xl font-bold text-flow-gold">
                    {getSecondaryValue()}
                  </div>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-body">
                    {getSecondarySubtext()}
                  </p>
                </div>
                <button
                  onClick={() => setInput(getSecondaryPrompt())}
                  className="w-full py-3 bg-flow-gold text-flow-black font-bold text-[10px] uppercase tracking-widest mt-6 hover:brightness-110 transition-all"
                >
                  {getSecondaryAction()}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-8 flex-grow">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-white/10 border border-white/10 p-6">
                    <p className="text-sm text-white font-body">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-flow-gold/20 flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-flow-gold">
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="text-sm leading-relaxed text-white/80 font-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content ||
                          (msg === messages[messages.length - 1]
                            ? 'Thinking...'
                            : '')}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isStreaming &&
            messages[messages.length - 1]?.role === 'assistant' &&
            !messages[messages.length - 1]?.content && (
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-flow-gold/20 flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-flow-gold">
                    auto_awesome
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-flow-gold/60 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-flow-gold/60 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-flow-gold/60 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-auto pt-8">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInput(chip);
                }}
                className="px-4 py-1.5 border border-white/10 text-[10px] font-bold uppercase tracking-wider hover:border-flow-gold/50 transition-colors whitespace-nowrap text-white/40 hover:text-flow-gold font-body"
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="relative group">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              rows={1}
              className="w-full bg-white/5 border border-white/10 p-6 pr-16 text-sm resize-none focus:ring-0 focus:border-flow-gold/50 text-white placeholder:text-white/20 font-body"
              disabled={isStreaming}
            />
            {isStreaming ? (
              <button
                onClick={stopStreaming}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-rose-600 flex items-center justify-center hover:bg-rose-700 transition-all"
              >
                <span className="material-symbols-outlined text-white">
                  stop
                </span>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-flow-gold flex items-center justify-center hover:brightness-110 transition-all active:scale-95 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-flow-black">
                  arrow_upward
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {error?.type === 'limit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-flow-dark border border-white/10 p-10 max-w-md w-full mx-4 relative animate-in fade-in zoom-in-95">
            <button
              onClick={dismissError}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="w-12 h-12 bg-flow-gold/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-flow-gold text-2xl">
                auto_awesome
              </span>
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
    </div>
  );
}

export default function AiAdvisorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center text-flow-muted">
          Loading...
        </div>
      }
    >
      <AiAdvisorContent />
    </Suspense>
  );
}
