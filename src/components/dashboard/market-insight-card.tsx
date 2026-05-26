'use client';

import { TrendingUp } from 'lucide-react';

interface MarketInsightCardProps {
  index_label: string;
  index_value: number;
  index_change: string;
  context: string;
  recommendation: string;
}

export default function MarketInsightCard({
  index_label,
  index_value,
  index_change,
  context,
  recommendation,
}: MarketInsightCardProps) {
  return (
    <section className="obsidian-card p-6 md:p-8 relative overflow-hidden border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flow-label text-[11px] tracking-[0.2em] text-flow-gold uppercase">Market Insight</h3>
        <TrendingUp className="h-5 w-5 text-flow-gold" />
      </div>

      <div className="relative z-10">
        <h4 className="font-display text-xl text-white mb-3">{index_label}</h4>
        <p className="font-body text-sm text-white/50 mb-6">{context}</p>

        <div className="flex items-baseline gap-3">
          <span className="font-mono text-3xl md:text-4xl text-white font-bold">{index_value}</span>
          <span className="text-emerald font-mono text-xs tracking-wider">{index_change}</span>
        </div>

        <p className="flow-label text-[10px] text-flow-gold/60 mt-6 tracking-[0.1em] uppercase border-t border-white/10 pt-4">
          {recommendation}
        </p>
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 0)', backgroundSize: '20px 20px' }}
      />
    </section>
  );
}
