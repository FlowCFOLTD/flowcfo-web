'use client';

interface CashFlowPoint {
  date: string;
  income: number;
  balance: number;
}

interface CashFlowChartProps {
  data: CashFlowPoint[];
}

export default function CashFlowChart({ data }: CashFlowChartProps) {
  if (!data.length) {
    return (
      <section className="border border-white/10 bg-white/5 p-8">
        <p className="font-body text-sm text-white/30">No transaction data available yet.</p>
      </section>
    );
  }

  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.balance)), 1);
  const labels = data.length > 0
    ? [data[0].date, data[Math.floor(data.length / 4)].date, data[Math.floor(data.length / 2)].date, data[Math.floor(data.length * 3 / 4)].date, data[data.length - 1].date]
    : [];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  };

  return (
    <section className="border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="flex justify-between items-end mb-6 md:mb-8">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
            Cash Flow Dynamics
          </h3>
          <p className="font-body text-sm text-white/40">
            Trailing 30-day liquidity and project inflows
          </p>
        </div>
        <div className="hidden md:flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-flow-gold" />
            <span className="flow-label text-[10px] text-white/50">INCOME</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white/60" />
            <span className="flow-label text-[10px] text-white/50">BALANCE</span>
          </div>
        </div>
      </div>

      <div className="h-48 md:h-64 w-full flex items-end gap-0.5 md:gap-1 relative">
        {data.map((point, i) => {
          const incomeH = (point.income / maxVal) * 100;
          const balanceH = (point.balance / maxVal) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col justify-end items-center gap-0.5 relative group">
              {/* Income bar */}
              {point.income > 0 && (
                <div
                  className="w-full bg-flow-gold transition-all duration-300 hover:brightness-110"
                  style={{ height: `${Math.max(incomeH, 1)}%` }}
                />
              )}
              {/* Balance bar */}
              {point.balance > 0 && (
                <div
                  className="w-full bg-white/40 transition-all duration-300 hover:bg-white/60"
                  style={{ height: `${Math.max(balanceH, 1)}%` }}
                />
              )}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-flow-black border border-white/10 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <p className="font-mono text-[10px] text-flow-gold">${point.income.toFixed(0)}</p>
                <p className="font-mono text-[10px] text-white/60">${point.balance.toFixed(0)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 md:mt-4 flex justify-between font-mono text-[9px] md:text-[10px] text-white/30">
        {labels.map((d, i) => (
          <span key={i}>{formatDate(d)}</span>
        ))}
      </div>
    </section>
  );
}
