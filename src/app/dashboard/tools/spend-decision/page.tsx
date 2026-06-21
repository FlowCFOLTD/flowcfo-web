'use client';

import { useState } from 'react';
import { ecommerceApi, SpendDecisionResult } from '@/lib/api/ecommerce';
import { Wallet, CheckCircle2, AlertTriangle, XCircle, History, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSpendDecisions, useSpendFeedback } from '@/hooks/api/use-tools';

const verdictConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  safe: { icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-emerald-400', bg: 'border-emerald-500/20 bg-emerald-500/5' },
  borderline: { icon: <AlertTriangle className="h-5 w-5" />, color: 'text-amber-400', bg: 'border-amber-500/20 bg-amber-500/5' },
  risky: { icon: <XCircle className="h-5 w-5" />, color: 'text-rose-400', bg: 'border-rose-500/20 bg-rose-500/5' },
};

export default function SpendDecisionPage() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<SpendDecisionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'evaluate' | 'history'>('evaluate');

  const { data: historyData, isLoading: historyLoading } = useSpendDecisions();
  const feedbackMutation = useSpendFeedback();

  const handleEvaluate = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ecommerceApi.evaluateSpendDecision({
        amount: parseFloat(amount) || 0,
        category: category || undefined,
      });
      setResult(data);
    } catch {
      setError('Failed to evaluate. Check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'bg-white/5 border border-white/10 px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-flow-gold w-full';

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="h-8 w-8 text-flow-gold" />
            Spend Decision Scoring
          </h1>
          <p className="font-body text-white/40 mt-1">
            Evaluate if a purchase is safe based on your current cash position
          </p>
        </div>

        <div className="flex gap-2 border-b border-white/10 pb-0">
          {[
            { key: 'evaluate' as const, label: 'Evaluate', icon: Wallet },
            { key: 'history' as const, label: 'History', icon: History },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 pb-3 px-1 font-label-caps text-label-caps transition-all border-b-2 -mb-[2px] ${
                tab === key
                  ? 'text-flow-gold border-flow-gold'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'evaluate' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="font-body text-xs text-white/40 uppercase tracking-wider">Spend Amount</label>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
                  placeholder="500.00" className={inputClass} />
              </div>
              <div>
                <label className="font-body text-xs text-white/40 uppercase tracking-wider">Category (optional)</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}
                  placeholder="inventory, marketing, tools..." className={inputClass} />
              </div>
              <button
                onClick={handleEvaluate}
                disabled={loading || !amount}
                className="w-full px-6 py-3 bg-flow-gold text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-flow-gold/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Evaluating...' : 'Evaluate Spend'}
              </button>
              {error && <p className="font-body text-xs text-rose-400">{error}</p>}
            </div>

            {result && (
              <div className="space-y-4">
                <div className={`border p-6 ${verdictConfig[result.verdict]?.bg || 'border-white/10 bg-white/5'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={verdictConfig[result.verdict]?.color || 'text-white/40'}>
                      {verdictConfig[result.verdict]?.icon || <Wallet className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className={`font-body text-lg font-bold uppercase ${verdictConfig[result.verdict]?.color || 'text-white'}`}>
                        {result.verdict}
                      </h3>
                      <p className="font-body text-[10px] text-white/30">Confidence: {result.confidence}%</p>
                    </div>
                  </div>
                  <p className="font-body text-xs text-white/60 leading-relaxed">{result.reasoning}</p>
                </div>

                <div className="border border-white/10 bg-white/5 p-6">
                  <h3 className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Financial Context</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1">
                      <span className="font-body text-xs text-white/40">Safe to Spend</span>
                      <span className="font-body text-xs font-bold text-white">${result.safe_to_spend.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-body text-xs text-white/40">Remaining After Spend</span>
                      <span className={`font-body text-xs font-bold ${result.remaining_after >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ${result.remaining_after.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-body text-xs text-white/40">Tax Reserve</span>
                      <span className="font-body text-xs text-white/60">{result.tax_reserve_pct}%</span>
                    </div>
                    {result.category && (
                      <div className="flex items-center justify-between py-1">
                        <span className="font-body text-xs text-white/40">Category</span>
                        <span className="font-body text-xs text-white/60 capitalize">{result.category}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-4">
            {historyLoading ? (
              <div className="text-center py-12 font-body text-sm text-white/40">Loading history...</div>
            ) : !historyData?.decisions?.length ? (
              <div className="text-center py-12 font-body text-sm text-white/40">
                No spend decisions yet. Use the Evaluate tab to make your first decision.
              </div>
            ) : (
              <div className="border border-white/10 bg-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">Date</th>
                        <th className="text-right px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">Amount</th>
                        <th className="text-left px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">Category</th>
                        <th className="text-left px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">Verdict</th>
                        <th className="text-right px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">STS At Time</th>
                        <th className="text-center px-6 py-3 font-body text-xs text-white/40 uppercase tracking-wider">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.decisions.map((d) => (
                        <tr key={d.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-3 font-body text-sm text-white/60">
                            {d.created_at ? new Date(d.created_at).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-6 py-3 font-body text-sm text-white text-right font-semibold">
                            ${d.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-3 font-body text-sm text-white/60 capitalize">{d.category}</td>
                          <td className="px-6 py-3">
                            <span className={`font-body text-xs font-bold uppercase ${
                              d.verdict === 'safe' ? 'text-emerald-400' :
                              d.verdict === 'borderline' ? 'text-amber-400' : 'text-rose-400'
                            }`}>
                              {d.verdict}
                            </span>
                          </td>
                          <td className="px-6 py-3 font-body text-sm text-white/40 text-right">
                            {d.safe_to_spend_at_time != null ? `$${d.safe_to_spend_at_time.toFixed(2)}` : '—'}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {d.user_feedback ? (
                              <span className={`font-body text-xs ${d.user_feedback === 'good' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {d.user_feedback === 'good' ? <ThumbsUp className="h-3 w-3 inline" /> : <ThumbsDown className="h-3 w-3 inline" />}
                              </span>
                            ) : (
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => feedbackMutation.mutate({ decisionId: d.id, feedback: 'good' })}
                                  className="p-1 text-white/20 hover:text-emerald-400 transition-colors"
                                  title="Good decision"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => feedbackMutation.mutate({ decisionId: d.id, feedback: 'bad' })}
                                  className="p-1 text-white/20 hover:text-rose-400 transition-colors"
                                  title="Bad decision"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 border-t border-white/10 font-body text-xs text-white/30">
                  {historyData.total} total decisions
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
