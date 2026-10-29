'use client';

import { useState } from 'react';
import { FileSearch, Link2, Loader2, Upload } from 'lucide-react';
import { cimbDemoApi, type IngestionEvidence } from '@/lib/api/cimb-demo';

type EvidenceResult = { data: IngestionEvidence; requestId: string; elapsedMs: number };

async function sampleFile(path: string, name: string, type: string): Promise<File> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Sample unavailable (${response.status})`);
  return new File([await response.blob()], name, { type });
}

export default function IngestionEvidenceDemo() {
  const [result, setResult] = useState<EvidenceResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');

  const analyze = async (file: File) => {
    setBusy(true);
    setError('');
    const started = performance.now();
    try {
      const document = /\.(pdf|png|jpe?g|webp)$/i.test(file.name);
      const response = document
        ? await cimbDemoApi.extractDocument(file)
        : await cimbDemoApi.previewTabular(file);
      setResult({ data: response.data, requestId: response.meta.request_id, elapsedMs: Math.round(performance.now() - started) });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The file could not be analyzed.');
    } finally {
      setBusy(false);
    }
  };

  const analyzeSheet = async () => {
    if (!sheetUrl.trim()) return;
    setBusy(true);
    setError('');
    const started = performance.now();
    try {
      const response = await cimbDemoApi.previewGoogleSheet(sheetUrl.trim(), 'statement');
      setResult({ data: response.data, requestId: response.meta.request_id, elapsedMs: Math.round(performance.now() - started) });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The sheet could not be read.');
    } finally {
      setBusy(false);
    }
  };

  const runSample = async (path: string, name: string, type: string) => {
    setError('');
    try {
      await analyze(await sampleFile(path, name, type));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The sample could not be loaded.');
    }
  };

  return (
    <section className="rounded-2xl border border-[#E0DFD9] bg-white p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#735C00]">Try the ingestion boundary · live API</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">First understand the source. Then allow it to influence advice.</h2>
          <p className="mt-2 text-sm leading-6 text-[#62625F]">This step checks the file, normalizes columns and extracts candidate invoice or receipt fields. It exists to prevent malformed or uncertain evidence from silently becoming a financial recommendation. Documents remain review-required and are never posted automatically.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button disabled={busy} onClick={() => void runSample('/demo/demo-statement.xlsx', 'demo-statement.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} className="rounded-lg border border-[#D3D2CC] px-3 py-2 text-xs font-bold text-[#3F403D] hover:border-[#0A0A0A] disabled:opacity-40">Try XLSX statement</button>
          <button disabled={busy} onClick={() => void runSample('/demo/demo-invoice.pdf', 'demo-invoice.pdf', 'application/pdf')} className="rounded-lg border border-[#D3D2CC] px-3 py-2 text-xs font-bold text-[#3F403D] hover:border-[#0A0A0A] disabled:opacity-40">Try PDF invoice</button>
          <button disabled={busy} onClick={() => void runSample('/demo/demo-receipt.png', 'demo-receipt.png', 'image/png')} className="rounded-lg border border-[#D3D2CC] px-3 py-2 text-xs font-bold text-[#3F403D] hover:border-[#0A0A0A] disabled:opacity-40">Try receipt image</button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[auto_1fr_auto]">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0A0A0A] px-4 py-2 text-xs font-bold text-white hover:bg-[#282826]">
          <Upload className="h-4 w-4" /> Upload evidence
          <input type="file" accept=".csv,.xls,.xlsx,.pdf,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void analyze(file); event.target.value = ''; }} />
        </label>
        <div className="flex rounded-lg border border-[#E0DFD9] bg-[#F7F7F4]">
          <Link2 className="ml-3 mt-2.5 h-4 w-4 shrink-0 text-[#858681]" />
          <input value={sheetUrl} onChange={(event) => setSheetUrl(event.target.value)} placeholder="Paste a public Google Sheets URL" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#0A0A0A] outline-none placeholder:text-[#9AA39F]" />
        </div>
        <button disabled={busy || !sheetUrl.trim()} onClick={() => void analyzeSheet()} className="rounded-lg bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0A0A0A] hover:bg-[#C8A32E] disabled:opacity-40">Preview sheet</button>
      </div>

      {busy && <p className="mt-5 flex items-center gap-2 text-sm text-[#62625F]"><Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" /> Checking file boundaries, normalizing its structure and extracting evidence…</p>}
      {error && <p className="mt-5 rounded-xl border border-[#D4AF37]/35 bg-[#FFF4E8] p-3 text-sm text-[#9C3B2E]">{error}</p>}
      {result && !busy && (
        <div className="mt-5 grid gap-4 rounded-xl border border-[#CFE0D6] bg-[#EAF3EE] p-4 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="flex items-center gap-2 font-bold text-[#0A0A0A]"><FileSearch className="h-4 w-4 text-[#1B4332]" /> {result.data.filename ?? result.data.source_format ?? 'Google Sheets export'}</p>
            {typeof result.data.row_count === 'number' && <p className="mt-2 text-sm text-[#4F504D]">Detected <strong>{result.data.row_count} rows</strong> across {result.data.columns?.length ?? 0} columns: {result.data.columns?.join(', ')}</p>}
            {result.data.candidate && <p className="mt-2 text-sm text-[#4F504D]">Candidate fields requiring review: <strong>{Object.entries(result.data.candidate).filter(([, value]) => value !== null).map(([key, value]) => `${key}=${value}`).join(' · ') || 'none'}</strong></p>}
            {result.data.warnings?.map((warning) => <p key={warning} className="mt-1 text-xs text-[#735C00]">Review: {warning}</p>)}
            <details className="mt-3"><summary className="cursor-pointer text-[10px] uppercase tracking-widest text-[#73736F]">Inspect API evidence</summary><pre className="mt-2 max-h-56 overflow-auto rounded-lg bg-[#0A0A0A] p-3 text-[11px] text-white/70">{JSON.stringify(result.data, null, 2)}</pre></details>
          </div>
          <div className="text-[11px] text-[#73736F] lg:text-right"><p>{result.elapsedMs} ms round trip</p><p>request {result.requestId}</p><p>{result.data.status ?? 'preview_only'}</p></div>
        </div>
      )}
    </section>
  );
}
