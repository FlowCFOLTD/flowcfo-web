'use client';

import { useState } from 'react';
import { Check, FileSearch, Loader2, ShieldCheck, Trash2, Upload } from 'lucide-react';
import { productDemoApi, type ProductAccount, type ProductWorkspace } from '@/lib/api/product-demo';

type ProductDocument = { id: string; document_kind: 'invoice' | 'receipt'; filename: string; state: string; extracted?: { engine?: string; text?: string; fields?: Record<string, unknown>; lines?: Array<{ page?: number; text: string; confidence: number | null; box: unknown }> }; error?: string | null; accepted_record_id?: string | null };
type UploadResult = Record<string, unknown>;

async function sampleFile(path: string, name: string, type: string) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Sample could not be loaded (${response.status}).`);
  return new File([await response.blob()], name, { type });
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProductIngestionDemo() {
  const [scenario, setScenario] = useState<'consumer' | 'business'>('business');
  const [kind, setKind] = useState<'invoice' | 'receipt'>('invoice');
  const [statementCurrency, setStatementCurrency] = useState('MYR');
  const [workspace, setWorkspace] = useState<ProductWorkspace | null>(null);
  const [account, setAccount] = useState<ProductAccount | null>(null);
  const [document, setDocument] = useState<ProductDocument | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('MYR');
  const [counterparty, setCounterparty] = useState('');
  const [occurredOn, setOccurredOn] = useState(new Date().toISOString().slice(0, 10));
  const [dueOn, setDueOn] = useState('');

  const upload = async (file: File, selectedDocumentKind: 'invoice' | 'receipt' = kind) => {
    setBusy(true); setError(''); setDocument(null); setUploadResult(null);
    try {
      await productDemoApi.sessionReady();
      const isStatement = /\.(csv|xlsx)$/i.test(file.name);
      const importCurrency = file.name.startsWith('synthesized-bank-statement-sample') ? 'USD' : isStatement ? statementCurrency : 'INR';
      const demo = await productDemoApi.createIngestionWorkspace(scenario, importCurrency);
      setWorkspace(demo.workspace);
      const primary = demo.account;
      setAccount(primary);
      if (/\.xls$/i.test(file.name)) throw new Error('Legacy .xls is not supported by the rebuilt product importer. Export as .xlsx or .csv.');
      const tabular = isStatement;
      if (tabular) {
        const data = await productDemoApi.uploadStatement(demo.workspace.id, primary.id, file);
        setUploadResult(data as UploadResult);
        return;
      }
      const acceptedType = file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '');
      if (!['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/tiff'].includes(acceptedType)) {
        throw new Error('Choose CSV/XLSX for a statement, or a PDF, PNG, JPEG, WebP or TIFF invoice/receipt.');
      }
      const uploaded = await productDemoApi.uploadDocument(demo.workspace.id, selectedDocumentKind, new File([file], file.name, { type: acceptedType })) as ProductDocument;
      if (file.name.startsWith('sample-')) setCurrency('INR');
      setDocument(uploaded);
      let current = uploaded;
      for (let attempt = 0; current.state === 'queued' || current.state === 'processing'; attempt += 1) {
        if (attempt >= 20) break;
        await sleep(1000);
        const list = await productDemoApi.listDocuments(demo.workspace.id);
        current = (list.data as ProductDocument[]).find((item) => item.id === uploaded.id) ?? current;
        setDocument(current);
      }
      const fields = current.extracted?.fields;
      const candidates = (fields?.amount_candidates as string[] | undefined) ?? [];
      const currencies = (fields?.currency_candidates as string[] | undefined) ?? [];
      const dates = (fields?.date_candidates as string[] | undefined) ?? [];
      const names = (fields?.merchant_or_vendor_candidates as string[] | undefined) ?? [];
      if (candidates[0]) setAmount(candidates[0].replace(/[^\d.,]/g, '').replace(',', ''));
      if (currencies.find((value) => /^[A-Z]{3}$/.test(value))) setCurrency(currencies.find((value) => /^[A-Z]{3}$/.test(value))!);
      if (names[0]) setCounterparty(names[0]);
      if (dates[0] && /^\d{4}-\d{2}-\d{2}$/.test(dates[0])) setOccurredOn(dates[0]);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'The ingestion request failed.'); }
    finally { setBusy(false); }
  };

  const sample = async (path: string, name: string, type: string, selectedDocumentKind?: 'invoice' | 'receipt') => {
    try { await upload(await sampleFile(path, name, type), selectedDocumentKind); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'The sample could not be loaded.'); }
  };

  const review = async (decision: 'accept' | 'reject') => {
    if (!workspace || !document) return;
    setBusy(true); setError('');
    try {
      const payload: Record<string, unknown> = { decision };
      if (decision === 'accept') {
        payload.amount = amount.replaceAll(',', ''); payload.currency = currency; payload.counterparty = counterparty;
        if (kind === 'invoice') { payload.name = `Invoice · ${counterparty}`; payload.direction = 'outflow'; payload.due_on = dueOn; }
        else { payload.account_id = account?.id; payload.occurred_on = occurredOn; payload.direction = 'outflow'; payload.category = 'Other'; }
      }
      const result = await productDemoApi.reviewDocument(workspace.id, document.id, payload);
      setDocument(result as ProductDocument);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'The review action failed.'); }
    finally { setBusy(false); }
  };

  const purge = async () => {
    if (!workspace || !document) return;
    setBusy(true); setError('');
    try { setDocument(await productDemoApi.deleteDocumentContent(workspace.id, document.id) as ProductDocument); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Source content could not be purged.'); }
    finally { setBusy(false); }
  };

  const tabularResult = uploadResult as { state?: string; accepted_count?: number; duplicate_count?: number; rejected_count?: number; errors?: Array<{ row: number; error: string }>; replayed_file?: boolean } | null;

  return <section className="rounded-2xl border border-[#dce8e1] bg-white p-6">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between"><div className="max-w-3xl"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#087f75]">Live product API · actual import and review flow</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#173b38]">Inspect what the file says before it changes the financial picture.</h2><p className="mt-2 text-sm leading-6 text-[#53665f]">Statements are validated and imported as ledger entries. Invoices and receipts pass through encrypted, asynchronous extraction and stay review-required until a person confirms the fields. OCR output is evidence—not a posted transaction or commitment.</p></div>
      <div className="flex flex-wrap gap-2"><button disabled={busy} onClick={() => void sample('/demo/synthetic-bank-statement.csv', 'synthesized-bank-statement-sample.csv', 'text/csv')} className="rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-bold text-[#365b4d] disabled:opacity-40">Try public sample CSV</button><button disabled={busy} onClick={() => void sample('/demo/demo-statement.xlsx', 'demo-statement.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} className="rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-bold text-[#365b4d] disabled:opacity-40">Try XLSX</button><button disabled={busy} onClick={() => { setKind('invoice'); void sample('/demo/sample-scanned-invoice.pdf', 'sample-scanned-invoice.pdf', 'application/pdf', 'invoice'); }} className="rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-bold text-[#365b4d] disabled:opacity-40">Try scanned invoice PDF</button><button disabled={busy} onClick={() => { setKind('receipt'); void sample('/demo/sample-receipt-photo.jpg', 'sample-receipt-photo.jpg', 'image/jpeg', 'receipt'); }} className="rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-bold text-[#365b4d] disabled:opacity-40">Try photographed receipt</button></div><p className="mt-2 text-[10px] text-[#73837c]">Invoice and receipt files are fictional SPECIMEN documents from filedone.ai, public-domain CC0 1.0; they are test inputs, not real customer records.</p>
    </div>

    <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_2fr_auto]">
      <label className="text-xs font-semibold text-[#53665f]">Workspace scenario<select value={scenario} onChange={(event) => setScenario(event.target.value as 'consumer' | 'business')} className="mt-1 block w-full rounded-lg border border-[#cdded5] bg-[#f7faf8] px-3 py-2.5 text-sm text-[#173b38]"><option value="business">SME business</option><option value="consumer">Personal</option></select></label>
      <label className="text-xs font-semibold text-[#53665f]">Document type<select value={kind} onChange={(event) => setKind(event.target.value as 'invoice' | 'receipt')} className="mt-1 block w-full rounded-lg border border-[#cdded5] bg-[#f7faf8] px-3 py-2.5 text-sm text-[#173b38]"><option value="invoice">Invoice</option><option value="receipt">Receipt</option></select></label>
      <label className="text-xs font-semibold text-[#53665f]">Statement currency<select value={statementCurrency} onChange={(event) => setStatementCurrency(event.target.value)} className="mt-1 block w-full rounded-lg border border-[#cdded5] bg-[#f7faf8] px-3 py-2.5 text-sm text-[#173b38]"><option>MYR</option><option>USD</option><option>EUR</option><option>GBP</option></select></label>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#123e3b] px-4 py-2.5 text-xs font-bold text-white">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload CSV, XLSX, PDF or image<input type="file" accept=".csv,.xlsx,.xls,.pdf,.png,.jpg,.jpeg,.webp,.tif,.tiff" className="hidden" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ''; }} /></label>
      <span className="self-center text-[10px] text-[#73837c]">Per-file limits enforced by API</span>
    </div>

    {busy && <p className="mt-4 flex items-center gap-2 text-sm text-[#53665f]"><Loader2 className="h-4 w-4 animate-spin text-[#087f75]" />Submitting through product API and waiting for extraction…</p>}
    {workspace && <p className="mt-3 text-[10px] text-[#73837c]">Isolated synthetic workspace: {workspace.name} · account: {account?.name ?? 'loading'} · use only fictional test data here.</p>}
    {error && <p role="alert" className="mt-4 rounded-xl border border-[#e4bcb3] bg-[#fff5f2] p-3 text-sm text-[#943e34]">{error}</p>}

    {tabularResult && <div className="mt-5 rounded-xl border border-[#d5e7df] bg-[#f2f8f5] p-4"><p className="flex items-center gap-2 font-semibold text-[#173b38]"><Check className="h-4 w-4 text-[#087f75]" />Statement import: {tabularResult.state ?? 'response'}</p><p className="mt-2 text-sm text-[#53665f]">Accepted {tabularResult.accepted_count ?? 0} · duplicate {tabularResult.duplicate_count ?? 0} · rejected {tabularResult.rejected_count ?? 0}{tabularResult.replayed_file ? ' · replay safely recognized' : ''}</p>{tabularResult.errors?.slice(0, 5).map((item) => <p key={`${item.row}-${item.error}`} className="mt-1 text-xs text-[#8a5147]">Row {item.row}: {item.error}</p>)}<details className="mt-3"><summary className="cursor-pointer text-[10px] uppercase tracking-wider text-[#60756b]">Inspect import API response</summary><pre className="mt-2 max-h-52 overflow-auto rounded-lg bg-[#123e3b] p-3 text-[11px] text-white/80">{JSON.stringify(uploadResult, null, 2)}</pre></details></div>}

    {document && <div className="mt-5 rounded-xl border border-[#d5e7df] bg-[#f2f8f5] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="flex items-center gap-2 font-semibold text-[#173b38]"><FileSearch className="h-4 w-4 text-[#087f75]" />{document.filename} · {document.state.replaceAll('_', ' ')}</p><p className="mt-1 text-xs text-[#5d7168]">{document.extracted?.engine ?? 'awaiting OCR'} · {document.extracted?.lines?.length ?? 0} evidence lines · human review required</p></div>{document.state === 'accepted' || document.state === 'rejected' ? <button type="button" onClick={() => void purge()} disabled={busy} className="inline-flex items-center gap-1 rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-semibold text-[#365b4d]"><Trash2 className="h-3.5 w-3.5" />Purge source content</button> : null}</div>
      {document.error && <p className="mt-3 text-sm text-[#943e34]">{document.error}</p>}
      {document.extracted?.fields && <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg bg-white p-3"><p className="flex items-center gap-2 text-xs font-bold text-[#173b38]"><ShieldCheck className="h-4 w-4 text-[#087f75]" />Candidate evidence · confirm before posting</p><pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap text-[11px] leading-5 text-[#53665f]">{JSON.stringify(document.extracted.fields, null, 2)}</pre><details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-wider text-[#60756b]">OCR text</summary><pre className="mt-2 max-h-36 overflow-auto whitespace-pre-wrap text-[11px] leading-5 text-[#53665f]">{document.extracted.text}</pre></details></div>
        {document.state === 'review_required' && <div className="space-y-2 rounded-lg bg-white p-3"><p className="text-xs font-bold text-[#173b38]">Reviewer-confirmed fields</p><div className="grid grid-cols-2 gap-2"><input aria-label="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount" className="rounded-lg border border-[#cdded5] px-3 py-2 text-sm text-[#173b38]" /><input aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase().slice(0, 3))} placeholder="Currency" className="rounded-lg border border-[#cdded5] px-3 py-2 text-sm text-[#173b38]" /></div><input aria-label="Counterparty" value={counterparty} onChange={(event) => setCounterparty(event.target.value)} placeholder="Counterparty / merchant" className="w-full rounded-lg border border-[#cdded5] px-3 py-2 text-sm text-[#173b38]" />{kind === 'invoice' ? <><label className="block text-[10px] text-[#60756b]">Due date<input type="date" value={dueOn} onChange={(event) => setDueOn(event.target.value)} className="mt-1 block w-full rounded-lg border border-[#cdded5] px-3 py-2 text-sm text-[#173b38]" /></label></> : <label className="block text-[10px] text-[#60756b]">Receipt date<input type="date" value={occurredOn} onChange={(event) => setOccurredOn(event.target.value)} className="mt-1 block w-full rounded-lg border border-[#cdded5] px-3 py-2 text-sm text-[#173b38]" /></label>}<div className="flex gap-2 pt-1"><button type="button" onClick={() => void review('accept')} disabled={busy || !amount || !counterparty || (kind === 'invoice' && !dueOn)} className="rounded-lg bg-[#087f75] px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Confirm and {kind === 'invoice' ? 'create commitment' : 'post receipt'}</button><button type="button" onClick={() => void review('reject')} disabled={busy} className="rounded-lg border border-[#cdded5] px-3 py-2 text-xs font-bold text-[#365b4d]">Reject</button></div></div>}
      </div>}
    </div>}
  </section>;
}
