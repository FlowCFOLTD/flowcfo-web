'use client';

import { useState } from 'react';
import { ecommerceApi, PricingResult } from '@/lib/api/ecommerce';
import { Calculator, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PricingCalculatorPage() {
  const [form, setForm] = useState({
    price: '',
    cogs: '',
    shipping: '',
    platform_fee_pct: '',
    payment_fee_pct: '',
    tax_rate: '',
    ad_spend_per_unit: '',
  });
  const [result, setResult] = useState<PricingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ecommerceApi.calculatePricing({
        price: parseFloat(form.price) || 0,
        cogs: parseFloat(form.cogs) || 0,
        shipping: parseFloat(form.shipping) || 0,
        platform_fee_pct: parseFloat(form.platform_fee_pct) || 0,
        payment_fee_pct: parseFloat(form.payment_fee_pct) || 0,
        tax_rate: parseFloat(form.tax_rate) || 0,
        ad_spend_per_unit: parseFloat(form.ad_spend_per_unit) || 0,
      });
      setResult(data);
    } catch {
      setError('Failed to calculate. Check your inputs.');
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
            <Calculator className="h-8 w-8 text-flow-gold" />
            Pricing Calculator
          </h1>
          <p className="font-body text-white/40 mt-1">
            Calculate net margin, breakeven ROAS, and cost breakdown per unit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Selling Price</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="49.99" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Cost of Goods (COGS)</label>
              <input type="number" step="0.01" value={form.cogs} onChange={(e) => setForm({ ...form, cogs: e.target.value })}
                placeholder="15.00" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Shipping Cost</label>
              <input type="number" step="0.01" value={form.shipping} onChange={(e) => setForm({ ...form, shipping: e.target.value })}
                placeholder="5.00" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Platform Fee %</label>
              <input type="number" step="0.1" value={form.platform_fee_pct} onChange={(e) => setForm({ ...form, platform_fee_pct: e.target.value })}
                placeholder="15" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Payment Fee %</label>
              <input type="number" step="0.1" value={form.payment_fee_pct} onChange={(e) => setForm({ ...form, payment_fee_pct: e.target.value })}
                placeholder="2.9" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Tax Rate %</label>
              <input type="number" step="0.1" value={form.tax_rate} onChange={(e) => setForm({ ...form, tax_rate: e.target.value })}
                placeholder="8" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-xs text-white/40 uppercase tracking-wider">Ad Spend Per Unit</label>
              <input type="number" step="0.01" value={form.ad_spend_per_unit} onChange={(e) => setForm({ ...form, ad_spend_per_unit: e.target.value })}
                placeholder="5.00" className={inputClass} />
            </div>
            <button
              onClick={handleCalculate}
              disabled={loading || !form.price}
              className="w-full px-6 py-3 bg-flow-gold text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-flow-gold/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
            {error && <p className="font-body text-xs text-rose-400">{error}</p>}
          </div>

          {result && (
            <div className="space-y-4">
              <div className="border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-flow-gold" />
                  <h3 className="font-body text-sm font-bold text-white">Results</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-white/40">Net Margin</span>
                    <span className="font-body text-lg font-bold text-white">${result.net_margin.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-white/40">Margin %</span>
                    <span className={`font-body text-lg font-bold ${result.margin_pct >= 20 ? 'text-emerald-400' : result.margin_pct >= 10 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {result.margin_pct.toFixed(1)}%
                    </span>
                  </div>
                  {result.breakeven_roas !== null && (
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-white/40">Breakeven ROAS</span>
                      <span className="font-body text-lg font-bold text-flow-gold">{result.breakeven_roas.toFixed(2)}x</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 p-6">
                <h3 className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Cost Breakdown</h3>
                <div className="space-y-2">
                  {Object.entries(result.cost_breakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-1">
                      <span className="font-body text-xs text-white/40 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="font-body text-xs text-white/60">${value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {result.margin_pct < 10 && (
                <div className="border border-rose-500/20 bg-rose-500/5 p-4 flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-rose-400">
                    Margin is below 10%. Consider raising price, reducing COGS, or cutting ad spend.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
