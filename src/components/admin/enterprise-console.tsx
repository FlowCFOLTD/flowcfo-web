'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, Play, Send, Building2 } from 'lucide-react';
import { enterpriseApi } from '@/lib/api/enterprise';
import type { PortfolioSummary, ShortfallItem, BankScope } from '@/lib/api/enterprise';
import DemoJourney from './demo-journey';

type EntRow = { id: string; name: string; code: string; contact_email: string | null; sme_count: number };

const bandColor: Record<string, string> = {
  critical: 'text-rose',
  high: 'text-orange',
  moderate: 'text-[#FFD700]',
  low: 'text-emerald',
};

export default function EnterpriseConsole() {
  const [enterprises, setEnterprises] = useState<EntRow[]>([]);
  const [entId, setEntId] = useState<string>('');
  const [subTab, setSubTab] = useState<'journey' | 'portfolio' | 'digest' | 'integration'>('journey');
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [shortfalls, setShortfalls] = useState<ShortfallItem[]>([]);
  const [digest, setDigest] = useState('');
  const [scope, setScope] = useState<BankScope | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', contact_email: '' });

  useEffect(() => {
    const init = async () => {
      try {
        const res = await enterpriseApi.list();
        setEnterprises(res.enterprises);
        if (res.enterprises.length > 0) setEntId((prev) => prev || res.enterprises[0].id);
      } catch {
        // list stays empty — create form covers onboarding
      }
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (!entId) return;
    const loadTabData = async () => {
      setMsg(null);
      try {
        const [p, s] = await Promise.all([enterpriseApi.portfolio(entId), enterpriseApi.shortfalls(entId)]);
        setPortfolio(p);
        setShortfalls(s.shortfalls);
      } catch {
        setMsg('Could not load portfolio.');
      }
    };

    loadTabData();
  }, [entId]);

  useEffect(() => {
    const loadSubTab = async () => {
      if (subTab === 'digest' && entId) {
        try {
          const r = await enterpriseApi.digest(entId);
          setDigest(r.digest);
        } catch {
          setMsg('Could not load digest.');
        }
      }
      if (subTab === 'integration' && !scope) {
        try {
          setScope(await enterpriseApi.coreBankingScope());
        } catch {
          setMsg('Could not load integration scope.');
        }
      }
    };

    loadSubTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTab, entId]);

  const runScan = async () => {
    if (!entId) return;
    setBusy('scan');
    setMsg(null);
    try {
      const res = await enterpriseApi.scan(entId);
      const total = res.results.reduce((n, r) => n + r.new_alerts.length, 0);
      setMsg(`Scanned ${res.scanned} SMEs · ${total} new alert(s).`);
      const [p, s] = await Promise.all([enterpriseApi.portfolio(entId), enterpriseApi.shortfalls(entId)]);
      setPortfolio(p);
      setShortfalls(s.shortfalls);
    } catch {
      setMsg('Scan failed.');
    }
    setBusy(null);
  };

  const sendEmail = async () => {
    if (!entId) return;
    setBusy('email');
    setMsg(null);
    try {
      const res = await enterpriseApi.emailDigest(entId);
      setMsg(res.ok ? `Digest emailed to ${res.to}.` : `Email not sent: ${res.error ?? 'unknown error'}.`);
    } catch {
      setMsg('Email failed.');
    }
    setBusy(null);
  };

  const createEnt = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy('create');
    try {
      const ent = await enterpriseApi.create({ name: form.name, code: form.code, contact_email: form.contact_email || undefined });
      setForm({ name: '', code: '', contact_email: '' });
      setCreating(false);
      const res = await enterpriseApi.list();
      setEnterprises(res.enterprises);
      setEntId(ent.id);
    } catch {
      setMsg('Could not create enterprise. Code must be unique.');
    }
    setBusy(null);
  };

  const overdueTotalsLabel = portfolio
    ? Object.entries(portfolio.total_overdue_by_currency ?? {})
        .map(([currency, amount]) => `${currency} ${amount.toLocaleString()}`)
        .join(' · ') || 'No overdue invoices'
    : '—';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 text-[#FFD700] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector + actions */}
      <div className="flex flex-wrap items-center gap-4">
        <Building2 className="h-5 w-5 text-[#FFD700]" />
        {enterprises.length > 0 ? (
          <select
            value={entId}
            onChange={(e) => setEntId(e.target.value)}
            className="bg-[#141416] border border-white/10 px-4 py-2 text-sm text-white"
          >
            {enterprises.map((e) => (
              <option key={e.id} value={e.id}>{e.name} ({e.code}) · {e.sme_count} SMEs</option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-white/40">No enterprises yet — create one to begin.</p>
        )}
        <button onClick={() => setCreating(!creating)} className="text-xs font-bold uppercase tracking-widest text-[#FFD700] hover:underline">
          + New enterprise
        </button>
        {entId && (
          <button onClick={runScan} disabled={busy === 'scan'} className="ml-auto flex items-center gap-2 bg-[#FFD700] px-4 py-2 text-xs font-bold uppercase tracking-widest text-black hover:brightness-110 disabled:opacity-50">
            <Play className="h-3 w-3" /> {busy === 'scan' ? 'Scanning...' : 'Run scan'}
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={createEnt} className="flex flex-wrap gap-3 bg-[#141416] border border-white/5 p-4">
          <input required placeholder="Name (e.g. Acme Bank)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30" />
          <input required placeholder="Code (e.g. acme)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30" />
          <input placeholder="BU contact email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30" />
          <button type="submit" disabled={busy === 'create'} className="bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white/20 disabled:opacity-50">Create</button>
        </form>
      )}

      {msg && <p className="text-sm text-[#FFD700]">{msg}</p>}

      {entId && (
        <>
          <div className="flex gap-2 border-b border-white/5">
            {(['journey', 'portfolio', 'digest', 'integration'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${subTab === t ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-white/40 hover:text-white'}`}
              >
                {t === 'journey' ? '▶ demo journey' : t}
              </button>
            ))}
          </div>

          {subTab === 'journey' && (
            <DemoJourney enterpriseId={entId} enterpriseName={enterprises.find((e) => e.id === entId)?.name ?? 'Enterprise'} />
          )}

          {subTab === 'portfolio' && portfolio && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { l: 'SMEs monitored', v: String(portfolio.sme_count) },
                  { l: 'Total overdue by currency', v: overdueTotalsLabel },
                  { l: 'SMEs with overdue', v: String(portfolio.smes_with_overdue) },
                  { l: 'Critical / High risk', v: `${portfolio.risk_bands.critical ?? 0} / ${portfolio.risk_bands.high ?? 0}` },
                ].map((c) => (
                  <div key={c.l} className="bg-[#141416] border border-white/5 p-5">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">{c.l}</p>
                    <p className="text-2xl font-mono font-bold mt-1">{c.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#141416] border border-white/5 p-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase text-white/40">
                      <th className="pb-3 pr-4">SME</th>
                      <th className="pb-3 pr-4">Type</th>
                      <th className="pb-3 pr-4">Risk</th>
                      <th className="pb-3 pr-4 text-right">Overdue</th>
                      <th className="pb-3">Top driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.smes.map((s) => (
                      <tr key={s.user_id} className="border-b border-white/5 text-white/70">
                        <td className="py-3 pr-4">{s.business_name || s.email}<br /><span className="text-xs text-white/30">{s.email}</span></td>
                        <td className="py-3 pr-4 capitalize">{s.business_type}</td>
                        <td className={`py-3 pr-4 font-mono font-bold ${bandColor[s.risk_band] ?? 'text-white'}`}>{s.risk_band} ({s.risk_score})</td>
                        <td className="py-3 pr-4 text-right font-mono">{s.overdue_count > 0 ? <span className="text-rose">{s.currency} {s.overdue_total.toLocaleString()} ({s.overdue_count})</span> : '—'}</td>
                        <td className="py-3 text-xs text-white/50">{s.top_risk_driver?.detail ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {shortfalls.length > 0 && (
                <div className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">60-day working-capital needs</h3>
                  {shortfalls.map((s) => (
                    <p key={s.user_id} className="text-sm text-white/70 py-1">
                      {s.business_name || s.email}: <span className="font-mono text-rose">~${s.shortfall_amount.toLocaleString()}</span>{s.shortfall_date ? ` by ${s.shortfall_date}` : ''}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {subTab === 'digest' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={sendEmail} disabled={busy === 'email'} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-50">
                  <Send className="h-3 w-3" /> {busy === 'email' ? 'Sending...' : 'Email BU team'}
                </button>
              </div>
              <div className="bg-[#141416] border border-white/5 p-6 prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-body text-white/70">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{digest || 'No digest yet.'}</ReactMarkdown>
              </div>
            </div>
          )}

          {subTab === 'integration' && scope && (
            <div className="space-y-6">
              {scope.options.map((o) => (
                <div key={o.channel} className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="font-bold">{o.channel}</h3>
                  <p className="text-sm text-white/50 mt-1">{o.pattern}</p>
                  <p className="text-xs uppercase tracking-widest text-white/40 mt-4 mb-2">Needs from bank · {o.effort}</p>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    {o.needs_from_bank.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3">Compliance</h3>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    {scope.compliance.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3">SME onboarding</h3>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    {scope.sme_onboarding.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
