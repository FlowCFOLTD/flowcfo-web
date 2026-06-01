'use client';

interface CashFlowPoint {
  date: string;
  income: number;
  expenses: number;
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

  const allValues = data.flatMap(d => [d.income, d.expenses, Math.abs(d.balance), 0]);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...data.map(d => d.balance), 0);

  const labels = data.length > 0
    ? [data[0].date, data[Math.floor(data.length / 4)].date, data[Math.floor(data.length / 2)].date, data[Math.floor(data.length * 3 / 4)].date, data[data.length - 1].date]
    : [];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  };

  const toPct = (v: number) => Math.max((v / maxVal) * 100, 0.5);

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
            <span className="w-3 h-3 bg-emerald-500" />
            <span className="flow-label text-[10px] text-white/50">INCOME</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-rose-500" />
            <span className="flow-label text-[10px] text-white/50">EXPENSES</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white/60" />
            <span className="flow-label text-[10px] text-white/50">BALANCE</span>
          </div>
        </div>
      </div>

      <div className="h-48 md:h-64 w-full relative">
        {/* Zero line */}
        <div className="absolute left-0 right-0 top-1/2 border-t border-white/10" />

        <div className="h-full flex items-end gap-0.5 md:gap-1 relative">
          {data.map((point, i) => (
            <div key={i} className="flex-1 flex flex-col justify-center items-center gap-px relative group h-full">
              {/* Income bar (upward from center) */}
              {point.income > 0 && (
                <div
                  className="w-full bg-emerald-500/70 transition-all duration-300 hover:brightness-110"
                  style={{ height: `${toPct(point.income)}%`, marginTop: 'auto' }}
                />
              )}
              {/* Empty spacer when no income */}
              {point.income <= 0 && <div className="w-full flex-1" />}
              {/* Expenses bar (downward from center) */}
              {point.expenses > 0 && (
                <div
                  className="w-full bg-rose-500/70 transition-all duration-300 hover:brightness-110"
                  style={{ height: `${toPct(point.expenses)}%`, marginBottom: 'auto' }}
                />
              )}
              {/* Balance dot */}
              <div
                className={`absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
                  point.balance >= 0 ? 'bg-white/60' : 'bg-rose-400'
                }`}
                style={{
                  top: point.balance >= 0
                    ? `${50 - toPct(point.balance) / 2}%`
                    : `${50 + toPct(Math.abs(point.balance)) / 2}%`,
                }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-flow-black border border-white/10 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                <p className="font-mono text-[10px] text-emerald-400">+${(point.income ?? 0).toFixed(0)}</p>
                <p className="font-mono text-[10px] text-rose-400">-${(point.expenses ?? 0).toFixed(0)}</p>
                <p className="font-mono text-[10px] text-white/80">${(point.balance ?? 0).toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 md:mt-4 flex justify-between font-mono text-[9px] md:text-[10px] text-white/30">
        {labels.map((d, i) => (
          <span key={i}>{formatDate(d)}</span>
        ))}
      </div>
    </section>
  );
}
