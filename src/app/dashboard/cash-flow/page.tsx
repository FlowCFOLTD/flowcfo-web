'use client';

import { ReactNode } from 'react';
import { useDashboard } from '@/hooks/api/use-dashboard';
import { useUser } from '@/hooks/api/use-user';

export default function CashFlowPage() {
  const { data, isLoading } = useDashboard();
  const { data: user } = useUser();
  const dash: any = data;
  const vertical = user?.business_type;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (!dash) {
    return (
      <div className="px-6 md:px-16 py-12">
        <p className="text-white/40 font-body">No cash flow data available. Connect your accounts first.</p>
      </div>
    );
  }

  const cf = dash.cash_flow || [];
  const totalInflow = cf.reduce((s: number, m: any) => s + (m.income || 0), 0);
  const totalOutflow = cf.reduce((s: number, m: any) => s + (m.expenses || 0), 0);
  const avgInflow = cf.length > 0 ? totalInflow / cf.length : 0;
  const avgOutflow = cf.length > 0 ? totalOutflow / cf.length : 0;
  const netAvg = avgInflow - avgOutflow;
  const maxBalance = Math.max(...cf.map((m: any) => m.balance || 0), 0);

  const isStartup = vertical === 'startup';
  const isFreelancer = vertical === 'freelancer';

  const subtitle = isFreelancer
    ? 'Income timing, expense patterns, and tax-positioned cash positioning'
    : isStartup
      ? 'Burn rate, income trends, and runway-informed cash positioning'
      : 'Revenue, expenses, and cash positioning';

  const kpiCards: Array<{ label: string; value: string; color: string; sub?: ReactNode }> = [];

  kpiCards.push({
    label: '30-DAY CASH FLOW',
    value: netAvg !== 0 ? `${netAvg >= 0 ? '+' : ''}$${Math.abs(Math.round(netAvg)).toLocaleString()}` : '—',
    color: netAvg >= 0 ? 'text-emerald-400' : 'text-rose-400',
  });

  if (isStartup && dash.monthly_burn != null) {
    kpiCards.push({
      label: 'MONTHLY BURN',
      value: `$${dash.monthly_burn.toLocaleString()}`,
      color: 'text-rose-400',
      sub: dash.burn_change_pct != null ? (
        <p className={`font-body text-xs ${dash.burn_change_pct <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {dash.burn_change_pct >= 0 ? '+' : ''}{dash.burn_change_pct}% vs prev period
        </p>
      ) : undefined,
    });
  }

  if (isStartup && dash.runway_months != null) {
    kpiCards.push({
      label: 'RUNWAY',
      value: `${dash.runway_months}m`,
      color: 'text-flow-gold',
      sub: (
        <p className={`font-body text-xs ${dash.runway_status === 'healthy' ? 'text-emerald-400' : dash.runway_status === 'warning' ? 'text-amber-400' : 'text-rose-400'}`}>
          {dash.runway_status === 'healthy' ? 'Healthy' : dash.runway_status === 'warning' ? 'Warning' : 'Critical'}
        </p>
      ),
    });
  }

  if (isFreelancer) {
    kpiCards.push({
      label: 'INCOME VOLATILITY',
      value: dash.income_volatility_level ? dash.income_volatility_level.toUpperCase() : '—',
      color: dash.income_volatility_level === 'low' ? 'text-emerald-400' : dash.income_volatility_level === 'medium' ? 'text-amber-400' : 'text-rose-400',
    });
    kpiCards.push({
      label: 'TAX READINESS',
      value: dash.tax_readiness_pct != null ? `${dash.tax_readiness_pct}%` : '—',
      color: dash.tax_readiness_pct >= 70 ? 'text-emerald-400' : dash.tax_readiness_pct >= 40 ? 'text-amber-400' : 'text-rose-400',
    });
  }

  if (!isFreelancer && !isStartup) {
    if (dash.gross_margin_pct != null) {
      kpiCards.push({
        label: 'GROSS MARGIN',
        value: `${dash.gross_margin_pct}%`,
        color: dash.gross_margin_pct >= 30 ? 'text-emerald-400' : 'text-rose-400',
      });
    }
    if (dash.food_cost_pct != null) {
      kpiCards.push({
        label: 'FOOD COST',
        value: `${dash.food_cost_pct}%`,
        color: dash.food_cost_pct <= 30 ? 'text-emerald-400' : 'text-rose-400',
      });
    }
    if (dash.labor_cost_pct != null) {
      kpiCards.push({
        label: 'LABOR COST',
        value: `${dash.labor_cost_pct}%`,
        color: dash.labor_cost_pct <= 30 ? 'text-emerald-400' : 'text-rose-400',
      });
    }
    if (dash.overall_margin_pct != null) {
      kpiCards.push({
        label: 'MARGIN',
        value: `${dash.overall_margin_pct}%`,
        color: dash.overall_margin_pct >= 0 ? 'text-emerald-400' : 'text-rose-400',
      });
    }
  }

  kpiCards.push({
    label: isFreelancer ? 'AVG MONTHLY INCOME' : 'AVG MONTHLY INFLOW',
    value: isFreelancer && dash.avg_monthly_income != null
      ? `$${Math.round(dash.avg_monthly_income).toLocaleString()}`
      : avgInflow > 0
        ? `$${Math.round(avgInflow).toLocaleString()}`
        : '—',
    color: 'text-emerald-400',
  });

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Cash Flow Analysis</h1>
          <p className="font-body text-white/40 mt-1">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <div key={card.label} className="border border-white/10 bg-white/5 p-6 space-y-2">
              <span className="flow-label text-[10px] text-white/40 tracking-widest">{card.label}</span>
              <p className={`font-mono text-2xl font-bold ${card.color}`}>{card.value}</p>
              {card.sub}
            </div>
          ))}
        </div>

        {cf.length > 0 && (
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Monthly Cash Flow Trend</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-[120px_repeat(4,1fr)] gap-3 text-[10px] font-body text-white/30 uppercase tracking-wider pb-2 border-b border-white/10">
                <span>Month</span>
                <span>Income</span>
                <span>Expenses</span>
                <span>Net</span>
                <span>Balance</span>
              </div>
              {cf.map((m: any) => {
                const net = m.income - m.expenses;
                return (
                  <div key={m.date} className="grid grid-cols-[120px_repeat(4,1fr)] gap-3 text-sm font-body items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/60 font-medium">{m.date}</span>
                    <span className="font-mono text-emerald-400">+${Math.round(m.income || 0).toLocaleString()}</span>
                    <span className="font-mono text-rose-400">-${Math.round(m.expenses || 0).toLocaleString()}</span>
                    <span className={`font-mono ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {net >= 0 ? '+' : ''}${Math.round(net || 0).toLocaleString()}
                    </span>
                    <span className="font-mono text-white/80">${Math.round(m.balance || 0).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="border border-flow-gold/30 bg-flow-gold/5 p-8">
          <h2 className="flow-label text-[10px] text-flow-gold tracking-widest mb-3">
            {isFreelancer ? 'INCOME & TAX PROJECTION' : isStartup ? 'BURN & CASH PROJECTION' : 'CASH PROJECTION'}
          </h2>
          <p className="font-body text-base text-white/80 leading-relaxed">
            {isFreelancer
              ? netAvg > 0
                ? `Positive net cash flow averaging $${Math.round(netAvg).toLocaleString()}/mo. With ${dash.income_volatility_level || '—'} income volatility and ${dash.tax_readiness_pct || 0}% tax readiness, ${dash.tax_readiness_pct && dash.tax_readiness_pct >= 70 ? 'your tax reserve is on track.' : 'consider increasing your quarterly tax set-aside to avoid a shortfall.'}`
                : `Net outflow of $${Math.abs(Math.round(netAvg)).toLocaleString()}/mo. Review variable expenses and optimize your rate structure to restore positive cash flow.`
              : isStartup
                ? netAvg > 0
                  ? `Positive net cash flow averaging $${Math.round(netAvg).toLocaleString()}/mo. With $${Math.round(maxBalance).toLocaleString()} peak balance and ${dash.runway_months || '—'} months runway, your current trajectory supports ${dash.runway_months && dash.runway_months > 12 ? 'aggressive growth investment.' : 'focused burn management with a path to the next milestone.'}`
                  : `Net burn of $${Math.abs(Math.round(netAvg)).toLocaleString()}/mo with ${dash.runway_months || '—'} months of runway. ${dash.runway_months && dash.runway_months < 6 ? 'Prioritize revenue acceleration or cost reduction to extend runway.' : 'Monitor expense growth relative to revenue to maintain runway health.'}`
                : netAvg > 0
                  ? `Positive net cash flow averaging $${Math.round(netAvg).toLocaleString()}/mo with $${Math.round(maxBalance).toLocaleString()} peak balance. ${dash.gross_margin_pct != null ? `Gross margin at ${dash.gross_margin_pct}%. ` : ''}Focus on maintaining this trajectory.`
                  : `Net outflow of $${Math.abs(Math.round(netAvg)).toLocaleString()}/mo. ${dash.food_cost_pct != null ? 'Review food and labor costs' : dash.overall_margin_pct != null ? 'Review project margins' : 'Review expenses'} to improve cash position.`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
