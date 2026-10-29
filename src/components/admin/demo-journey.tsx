'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronDown, Upload, FileText, Zap, Bell, Mail } from 'lucide-react';
import { enterpriseApi } from '@/lib/api/enterprise';

type Phase = 'idle' | 'working' | 'done';

function RawJson({ data }: { data: unknown }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-white/30 hover:text-[#FFD700]">
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} /> API response (raw JSON)
      </button>
      {open && (
        <pre className="mt-2 max-h-64 overflow-auto bg-black/40 border border-white/10 p-3 font-mono text-[11px] text-white/60 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

function StepShell({ n, title, sub, children, phase }: { n: string; title: string; sub: string; children: React.ReactNode; phase: Phase }) {
  return (
    <div className={`border p-6 ${phase === 'done' ? 'border-[#FFD700]/30 bg-[#FFD700]/[0.03]' : 'border-white/10 bg-[#141416]'}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center font-mono font-bold ${phase === 'done' ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white/60'}`}>
          {phase === 'done' ? <CheckCircle2 className="h-5 w-5" /> : n}
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-white/40 mt-0.5">{sub}</p>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

async function fetchSample(path: string, name: string): Promise<File> {
  const res = await fetch(path);
  const blob = await res.blob();
  return new File([blob], name, { type: 'text/csv' });
}

function Btn({ onClick, children, gold, disabled }: { onClick: () => void; children: React.ReactNode; gold?: boolean; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-40 ${gold ? 'bg-[#FFD700] text-black hover:brightness-110' : 'border border-white/20 hover:bg-white hover:text-black'}`}
    >
      {children}
    </button>
  );
}

export default function DemoJourney({ enterpriseId, enterpriseName }: { enterpriseId: string; enterpriseName: string }) {
  const [sme, setSme] = useState<{ user_id: string; email: string; business_name: string } | null>(null);
  const [buEmail, setBuEmail] = useState('demo@flowcfo.net');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [inv, setInv] = useState<{ imported: number; csv_rows: number; warnings: string[]; aging: { outstanding_total: number; outstanding_count: number; overdue_total: number; overdue_count: number; buckets: Record<string, number> } } | null>(null);
  const [invScan, setInvScan] = useState<string[] | null>(null);
  const [stmt, setStmt] = useState<{ transactions_imported: number; format: string; warnings: string[]; total_income: number; total_expenses: number; date_range: [string, string] } | null>(null);
  const [shortfall, setShortfall] = useState<{ shortfall_amount: number; shortfall_date: string | null; monthly_opex_avg: number; projected_end_balance: number; will_shortfall: boolean } | null>(null);
  const [forecastRan, setForecastRan] = useState(false);
  const [risk, setRisk] = useState<{ risk_score: number; band: string; drivers: { factor: string; points: number; detail: string }[] } | null>(null);
  const [riskScan, setRiskScan] = useState<string[] | null>(null);
  const [emailed, setEmailed] = useState<string | null>(null);

  const start = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await enterpriseApi.update(enterpriseId, { contact_email: buEmail || undefined });
      const r = await enterpriseApi.demoSme(enterpriseId, {
        business_name: `Harbor Kitchen ${new Date().toISOString().slice(5, 10)}`,
        business_type: 'restaurant',
        currency: 'USD',
      });
      setSme(r);
    } catch {
      setMsg('Could not provision demo business.');
    }
    setBusy(false);
  };

  const uploadInvoices = async (file: File) => {
    if (!sme) return;
    setBusy(true);
    try {
      setInv(await enterpriseApi.importSmeInvoices(enterpriseId, sme.user_id, file));
    } catch {
      setMsg('Invoice import failed. Expected columns: invoice_no, client_name, amount, due_date.');
    }
    setBusy(false);
  };

  const runDunning = async () => {
    if (!sme) return;
    setBusy(true);
    try {
      const r = await enterpriseApi.scanSme(enterpriseId, sme.user_id);
      setInvScan(r.new_alerts);
    } catch {
      setMsg('Dunning scan failed.');
    }
    setBusy(false);
  };

  const uploadStatement = async (file: File) => {
    if (!sme) return;
    setBusy(true);
    try {
      setStmt(await enterpriseApi.importSmeTransactions(enterpriseId, sme.user_id, file));
    } catch {
      setMsg('Statement import failed. Expected columns: date, amount (+income / −expense), merchant.');
    }
    setBusy(false);
  };

  const runForecast = async () => {
    if (!sme) return;
    setBusy(true);
    setForecastRan(false);
    try {
      const s = await enterpriseApi.shortfalls(enterpriseId);
      setShortfall(s.shortfalls.find((x) => x.user_id === sme.user_id) ?? null);
      setForecastRan(true);
      const r = await enterpriseApi.scanSme(enterpriseId, sme.user_id);
      setInvScan((prev) => Array.from(new Set([...(prev ?? []), ...r.new_alerts])));
    } catch {
      setMsg('Forecast failed.');
    }
    setBusy(false);
  };

  const runRisk = async () => {
    if (!sme) return;
    setBusy(true);
    try {
      const p = await enterpriseApi.portfolio(enterpriseId);
      const row = p.smes.find((x) => x.user_id === sme.user_id);
      if (row) {
        setRisk({ risk_score: row.risk_score, band: row.risk_band, drivers: row.risk_drivers });
        const full = await enterpriseApi.scanSme(enterpriseId, sme.user_id);
        setRiskScan(full.new_alerts);
      }
    } catch {
      setMsg('Risk analysis failed.');
    }
    setBusy(false);
  };

  const sendBuMail = async () => {
    setBusy(true);
    try {
      const r = await enterpriseApi.emailDigest(enterpriseId);
      setEmailed(r.ok ? `Sent to ${r.to}` : `Not sent: ${r.error ?? 'unknown'}`);
    } catch {
      setEmailed('Send failed.');
    }
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141416] border border-white/5 p-6">
        <h2 className="font-bold text-lg">Platform walkthrough — {enterpriseName}</h2>
        <p className="text-sm text-white/50 mt-1">
          Each module below runs live on data uploaded in this session. Inspect the raw files, watch the engine process them, and expand any API response.
        </p>
        {!sme ? (
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Team email for alerts + digest</label>
              <input value={buEmail} onChange={(e) => setBuEmail(e.target.value)} className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white w-64" />
            </div>
            <button onClick={() => void start()} disabled={busy} className="bg-[#FFD700] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:brightness-110 disabled:opacity-50">
              {busy ? 'Provisioning…' : 'Step 0 — Provision demo business'}
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-emerald">Provisioned <strong>{sme.business_name}</strong> ({sme.email}) — alerts route to <strong>{buEmail}</strong>.</p>
        )}
        {msg && <p className="mt-2 text-sm text-[#FFD700]">{msg}</p>}
      </div>

      {/* 1 */}
      <StepShell n="1" title="Receivables capture + dunning alerts" sub="Outstanding invoices in, proactive team alerts out" phase={invScan ? 'done' : inv ? 'working' : 'idle'}>
        <div className="flex flex-wrap gap-3">
          <label className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black cursor-pointer ${!sme || busy ? 'opacity-40 pointer-events-none' : ''}`}>
            <Upload className="h-3 w-3" /> Upload receivables CSV
            <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadInvoices(f); e.target.value = ''; }} />
          </label>
          <Btn disabled={busy || !sme} onClick={() => void fetchSample('/demo/demo-invoices.csv', 'demo-invoices.csv').then(uploadInvoices)}>
            <span className="flex items-center gap-2"><FileText className="h-3 w-3" /> Use sample file</span>
          </Btn>
          <a href="/demo/demo-invoices.csv" download className="px-4 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#FFD700]">Inspect raw file ↓</a>
        </div>
        {inv && (
          <div className="mt-4 bg-black/30 border border-white/10 p-4 text-sm">
            <p>Parsed <strong>{inv.csv_rows} rows → {inv.imported} invoices</strong> ({inv.warnings.length} warnings).</p>
            <p className="mt-1">Outstanding <strong>${inv.aging.outstanding_total.toLocaleString()}</strong> across {inv.aging.outstanding_count} invoices · <span className="text-rose">${inv.aging.overdue_total.toLocaleString()} overdue ({inv.aging.overdue_count})</span></p>
            <p className="text-xs text-white/40 mt-1">Aging: current {inv.aging.buckets.current?.toLocaleString()} · 1–30 {inv.aging.buckets['1-30']?.toLocaleString()} · 31–60 {inv.aging.buckets['31-60']?.toLocaleString()} · 60+ {inv.aging.buckets['60+']?.toLocaleString()}</p>
            <RawJson data={inv.aging} />
          </div>
        )}
        {inv && !invScan && (
          <div className="mt-4"><Btn gold disabled={busy || !sme} onClick={() => void runDunning()}><span className="flex items-center gap-2"><Zap className="h-3 w-3" /> Run dunning scan</span></Btn></div>
        )}
        {invScan && (
          <div className="mt-4 bg-black/30 border border-[#FFD700]/30 p-4 text-sm">
            <p className="flex items-center gap-2"><Bell className="h-4 w-4 text-[#FFD700]" /> Alerts raised: <strong>{invScan.join(', ') || 'none (dedup — already alerted in last 24h)'}</strong></p>
            <p className="text-xs text-white/50 mt-1">Persisted as alert records → included in the team digest and email below.</p>
            <RawJson data={invScan} />
          </div>
        )}
      </StepShell>

      {/* 2 */}
      <StepShell n="2" title="Cash-flow scan + 2-month working-capital forecast" sub="Trajectory analysis flags upcoming OPEX shortfalls early" phase={shortfall || forecastRan ? 'done' : stmt ? 'working' : 'idle'}>
        <div className="flex flex-wrap gap-3">
          <label className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black cursor-pointer ${!sme || busy ? 'opacity-40 pointer-events-none' : ''}`}>
            <Upload className="h-3 w-3" /> Upload bank statement
            <input type="file" accept=".csv,.xls,.xlsx,.mt940,.sta,.txt" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadStatement(f); e.target.value = ''; }} />
          </label>
          <Btn disabled={busy || !sme} onClick={() => void fetchSample('/demo/demo-statement.csv', 'demo-statement.csv').then(uploadStatement)}>
            <span className="flex items-center gap-2"><FileText className="h-3 w-3" /> Use sample statement</span>
          </Btn>
          <Btn disabled={busy || !sme} onClick={() => void fetchSample('/demo/demo-statement.mt940', 'demo-statement.mt940').then(uploadStatement)}>
            <span className="flex items-center gap-2"><FileText className="h-3 w-3" /> Use sample MT940</span>
          </Btn>
          <a href="/demo/demo-statement.csv" download className="px-4 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#FFD700]">Inspect raw file ↓</a>
        </div>
        {stmt && (
          <div className="mt-4 bg-black/30 border border-white/10 p-4 text-sm">
            <p>Ingested <strong>{stmt.transactions_imported} transactions</strong> ({stmt.date_range[0]} → {stmt.date_range[1]}) — detected format: <strong className="font-mono">{stmt.format}</strong>.</p>
            <p className="mt-1">Income ${stmt.total_income.toLocaleString()} vs expenses ${stmt.total_expenses.toLocaleString()} — trajectory is declining.</p>
            <RawJson data={{ transactions_imported: stmt.transactions_imported, warnings: stmt.warnings }} />
          </div>
        )}
        {stmt && !forecastRan && (
          <div className="mt-4"><Btn gold disabled={busy || !sme} onClick={() => void runForecast()}><span className="flex items-center gap-2"><Zap className="h-3 w-3" /> Run 60-day forecast</span></Btn></div>
        )}
        {forecastRan && !shortfall && (
          <div className="mt-4 bg-black/30 border border-emerald/30 p-4 text-sm">
            <p>Forecast complete: cash covers 2-month OPEX across the 60-day window — <strong className="text-emerald">no shortfall projected</strong> for this business.</p>
          </div>
        )}
        {shortfall && (
          <div className="mt-4 bg-black/30 border border-[#FFD700]/30 p-4 text-sm">
            {shortfall.will_shortfall ? (
              <p>Forecast: business needs <strong className="text-rose">~${shortfall.shortfall_amount.toLocaleString()} additional cash</strong>{shortfall.shortfall_date ? ` around ${shortfall.shortfall_date}` : ''} to cover 2 months OPEX (~${shortfall.monthly_opex_avg.toLocaleString()}/mo).</p>
            ) : (
              <p>Forecast: cash covers 2-month OPEX. Projected end balance <strong>${shortfall.projected_end_balance.toLocaleString()}</strong>.</p>
            )}
            <RawJson data={shortfall} />
          </div>
        )}
      </StepShell>

      {/* 3 */}
      <StepShell n="3" title="Financial analysis + risk forecast" sub="Explainable 0–100 score from six cash-flow signals" phase={risk ? 'done' : 'idle'}>
        {!risk ? (
          <Btn gold disabled={busy || !sme} onClick={() => void runRisk()}><span className="flex items-center gap-2"><Zap className="h-3 w-3" /> Run risk analysis</span></Btn>
        ) : (
          <div className="bg-black/30 border border-white/10 p-4">
            <p className="font-mono text-4xl font-bold">{risk.risk_score}<span className="text-lg text-white/40">/100</span> <span className="text-base uppercase">{risk.band}</span></p>
            {risk.drivers.map((d) => (
              <div key={d.factor} className="mt-2">
                <div className="flex justify-between text-xs text-white/60"><span className="capitalize">{d.factor.replace(/_/g, ' ')}</span><span>+{d.points}</span></div>
                <div className="h-1.5 bg-white/10 mt-1"><div className="h-full bg-rose" style={{ width: `${Math.min(d.points * 4, 100)}%` }} /></div>
                <p className="text-xs text-white/40 mt-0.5">{d.detail}</p>
              </div>
            ))}
            <p className="text-xs text-white/50 mt-3">Scan alerts: <strong>{riskScan?.join(', ') || 'none (dedup — already alerted in last 24h)'}</strong> · full breakdown also on the business risk page.</p>
            <RawJson data={risk} />
          </div>
        )}
      </StepShell>

      {/* 4 */}
      <StepShell n="4" title="Core-banking integration paths" sub="File drops, API gateway, and team delivery" phase={emailed ? 'done' : 'idle'}>
        <div className="text-sm text-white/60 space-y-2">
          <p>Statements arrive as file drops or through your banking API gateway — both land in the same pipeline you just watched. Multi-currency ledgers are supported, including your own FX rates at display time.</p>
        </div>
        <div className="mt-4">
          <Btn gold disabled={busy} onClick={() => void sendBuMail()}><span className="flex items-center gap-2"><Mail className="h-3 w-3" /> Email team digest now</span></Btn>
          {emailed && <p className="mt-2 text-sm text-emerald">{emailed}</p>}
        </div>
      </StepShell>
    </div>
  );
}
