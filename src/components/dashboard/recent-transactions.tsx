'use client';

interface Transaction {
  entity: string;
  description: string;
  category: string;
  amount: number;
  is_income: boolean;
  date: string;
}

interface RecentTransactionsProps {
  data: Transaction[];
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(val);
}

export default function RecentTransactions({ data }: RecentTransactionsProps) {
  if (!data.length) {
    return (
      <section className="border border-white/10 bg-white/5">
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="flow-label tracking-[0.15em] text-white/50 uppercase">Recent Transactions</h3>
        </div>
        <div className="p-8">
          <p className="font-body text-sm text-white/30">No transactions yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border border-white/10 bg-white/5">
      <div className="px-6 md:px-8 py-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="flow-label tracking-[0.15em] text-white/50 uppercase">Recent Transactions</h3>
        <button className="text-flow-gold font-bold flow-label text-[11px] tracking-wider hover:underline underline-offset-4">
          VIEW LEDGER
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30 tracking-[0.15em]">Entity</th>
              <th className="hidden md:table-cell px-6 md:px-8 py-4 flow-label text-[10px] text-white/30 tracking-[0.15em] text-center">Category</th>
              <th className="px-6 md:px-8 py-4 flow-label text-[10px] text-white/30 tracking-[0.15em] text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((txn, i) => (
              <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                <td className="px-6 md:px-8 py-5 md:py-6">
                  <div className="font-body text-sm font-bold text-white">{txn.entity}</div>
                  <div className="flow-label text-[9px] md:text-[10px] text-white/30 mt-0.5">{txn.description}</div>
                </td>
                <td className="hidden md:table-cell px-6 md:px-8 py-5 md:py-6 text-center">
                  <span className={`px-2 py-1 flow-label text-[10px] ${txn.is_income ? 'bg-flow-forest text-emerald-light' : 'bg-white/5 text-white/50'}`}>
                    {txn.category || (txn.is_income ? 'REVENUE' : 'EXPENSE')}
                  </span>
                </td>
                <td className={`px-6 md:px-8 py-5 md:py-6 text-right font-mono font-bold ${txn.is_income ? 'text-flow-gold' : 'text-white'}`}>
                  {txn.is_income ? '+' : '-'}{formatCurrency(Math.abs(txn.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
