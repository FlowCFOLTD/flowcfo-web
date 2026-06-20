'use client';

import { useState } from 'react';
import { ecommerceApi, SpendDecisionResult } from '@/lib/api/ecommerce';
import { Wallet, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

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
      </div>
    </div>
  );
}
