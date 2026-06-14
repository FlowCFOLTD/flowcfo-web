'use client';

import { CalendarX2, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Alert {
  type: string;
  icon: string;
  message: string;
  details: string;
}

interface ActiveAlertsProps {
  data: Alert[];
}

const AGENT_ALERT_ICONS = new Set([
  'margin_guardian', 'inventory_replenishment', 'fee_audit', 'category_suggestion',
]);

const iconMap: Record<string, React.ReactNode> = {
  event_busy: <CalendarX2 className="h-5 w-5 text-rose" />,
  insights: <TrendingUp className="h-5 w-5 text-flow-gold" />,
};

export default function ActiveAlerts({ data }: ActiveAlertsProps) {
  const prioritized = data
    .filter((a) => !AGENT_ALERT_ICONS.has(a.icon))
    .filter((a) => !a.message.toLowerCase().includes('category mapping'))
    .slice(0, 2);

  if (!prioritized.length) {
    return (
      <section className="border border-white/10 bg-white/5 p-6 md:p-8">
        <h3 className="flow-label tracking-[0.15em] text-white/50 mb-4 uppercase">Active Alerts</h3>
        <p className="font-body text-sm text-white/30">No alerts.</p>
      </section>
    );
  }

  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8">
      <h3 className="flow-label tracking-[0.15em] text-white/50 mb-6 uppercase">Active Alerts</h3>

      <div className="space-y-3">
        {prioritized.map((alert, i) => (
          <div
            key={i}
            className={`flex gap-4 p-4 md:p-5 border-l-4 ${
              alert.type === 'tax_deadline'
                ? 'bg-rose/10 border-rose'
                : 'bg-white/[0.03] border-flow-gold'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {iconMap[alert.icon] || <TrendingUp className="h-5 w-5 text-flow-gold" />}
            </div>
            <div>
              <p className="font-body text-sm font-bold text-white">{alert.message}</p>
              <p className="font-mono text-[11px] text-white/40 mt-1">{alert.details}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/alerts"
        className="inline-flex items-center gap-1.5 mt-4 text-xs font-body text-white/40 hover:text-white/70 transition-colors"
      >
        View all alerts <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}
