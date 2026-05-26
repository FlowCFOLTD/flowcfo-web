'use client';

import { Lightbulb, TrendingUp, Percent, ShieldAlert, Handshake } from 'lucide-react';
import type { AIInsights } from '@/lib/api/users';

interface Props {
  insights: AIInsights;
}

export default function AIInsightCards({ insights }: Props) {
  const cards: Array<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = [];

  if (insights.strategy) {
    cards.push({
      icon: <Lightbulb className="h-5 w-5 text-flow-gold" />,
      title: 'Strategic Insight',
      children: (
        <>
          <p className="font-body text-sm text-white/90 font-medium">{insights.strategy.summary}</p>
          <p className="font-body text-xs text-white/50 mt-2 leading-relaxed">{insights.strategy.detail}</p>
        </>
      ),
    });
  }

  if (insights.rate_suggestion) {
    cards.push({
      icon: <TrendingUp className="h-5 w-5 text-flow-gold" />,
      title: 'Rate Suggestion',
      children: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-white/50">Current</span>
            <span className="font-mono text-sm text-white/70">${insights.rate_suggestion.current.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-white/50">Suggested</span>
            <span className="font-mono text-sm text-flow-gold font-bold">${insights.rate_suggestion.suggested.toLocaleString()}</span>
          </div>
          <p className="font-body text-xs text-white/50 mt-2 leading-relaxed">{insights.rate_suggestion.reason}</p>
        </div>
      ),
    });
  }

  if (insights.tax_alert) {
    cards.push({
      icon: <ShieldAlert className="h-5 w-5 text-rose" />,
      title: 'Tax Alert',
      children: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-white/50">Readiness</span>
            <span className={`font-mono text-sm font-bold ${insights.tax_alert.readiness >= 80 ? 'text-emerald' : 'text-rose'}`}>
              {insights.tax_alert.readiness}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-white/50">Shortfall</span>
            <span className="font-mono text-sm text-white/70">${insights.tax_alert.shortfall.toLocaleString()}</span>
          </div>
          <p className="font-body text-xs text-white/50">Next deadline: {insights.tax_alert.deadline}</p>
        </div>
      ),
    });
  }

  if (insights.retainer_opportunity) {
    cards.push({
      icon: <Handshake className="h-5 w-5 text-emerald" />,
      title: 'Retainer Opportunity',
      children: (
        <div className="space-y-2">
          <p className="font-body text-sm text-white/90">
            ~${insights.retainer_opportunity.estimated_retainer.toLocaleString()}/mo retainer
          </p>
          <p className="font-body text-xs text-white/50 leading-relaxed">
            Smooth the gap between {insights.retainer_opportunity.peak_client} (peak) and {insights.retainer_opportunity.trough_client} (trough).
          </p>
        </div>
      ),
    });
  }

  if (insights.llm_insights && insights.llm_insights.length > 0) {
    for (const li of insights.llm_insights) {
      const color = li.priority === 'high' ? 'text-rose' : li.priority === 'medium' ? 'text-flow-gold' : 'text-white/40';
      cards.push({
        icon: <Percent className={`h-5 w-5 ${color}`} />,
        title: `LLM Insight (${li.priority})`,
        children: <p className="font-body text-sm text-white/80 leading-relaxed">{li.insight}</p>,
      });
    }
  }

  if (cards.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-white">AI Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="border border-white/10 bg-white/5 p-5 space-y-3">
            <div className="flex items-center gap-3">
              {card.icon}
              <span className="font-body text-xs font-semibold tracking-wider text-white/60 uppercase">{card.title}</span>
            </div>
            {card.children}
          </div>
        ))}
      </div>
    </div>
  );
}
