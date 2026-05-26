'use client';

import { useState } from 'react';
import { useTransactions } from '@/hooks/api/use-transactions';

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTransactions(page, 25);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  const txns = data?.transactions || [];
  const total = data?.total || 0;
  const pageSize = data?.page_size || 25;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Transactions</h1>
          <p className="font-body text-white/40 mt-1">
            Full transaction ledger — {total} total entries
          </p>
        </div>

        {txns.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No transactions recorded yet. Connect your accounts to get started.</p>
          </div>
        ) : (
          <div className="border border-white/10 bg-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-body text-white/30 uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Merchant</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t: { id: string; date: string; merchant_name?: string | null; description?: string | null; category?: string | null; amount: number; is_income: boolean }) => (
                    <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-body text-sm text-white/60">{t.date}</td>
                      <td className="px-6 py-4 font-body text-sm text-white/90">{t.merchant_name || t.description || 'Unknown'}</td>
                      <td className="px-6 py-4">
                        <span className="flow-label text-[10px] text-white/40 bg-white/5 px-2 py-1">{t.category || 'Uncategorized'}</span>
                      </td>
                      <td className={`px-6 py-4 font-mono text-sm text-right ${t.is_income ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {t.is_income ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                <span className="font-body text-xs text-white/40">
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 font-body text-xs text-white/60 border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-4 py-2 font-body text-xs text-white/60 border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
