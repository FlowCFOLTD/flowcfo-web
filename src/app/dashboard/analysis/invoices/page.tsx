'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useInvoices, useAging, useCreateInvoice, useMarkInvoicePaid } from '@/hooks/api/use-finance';
import { invoiceApi } from '@/lib/api/users';

function useInvoicesCurrencies() {
  return useQuery({
    queryKey: ['invoices', 'currencies'],
    queryFn: invoiceApi.currencies,
    retry: false,
  });
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-6 space-y-2">
      <span className="flow-label text-[10px] text-white/40 tracking-widest">{label}</span>
      <p className={`font-mono text-2xl font-bold ${color || 'text-white'}`}>{value}</p>
      {sub && <p className="font-body text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export default function InvoicesPage() {
  const { data, isLoading, refetch } = useInvoices();
  const { data: aging } = useAging();
  const { data: currencies } = useInvoicesCurrencies();
  const create = useCreateInvoice();
  const markPaid = useMarkInvoicePaid();
  const [form, setForm] = useState({ invoice_no: '', client_name: '', amount: '', due_date: '', currency: 'USD' });
  const [msg, setMsg] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  const invoices = data?.invoices ?? [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await create.mutateAsync({
        invoice_no: form.invoice_no,
        client_name: form.client_name,
        amount: parseFloat(form.amount),
        due_date: form.due_date,
        currency: form.currency,
      });
      setForm({ invoice_no: '', client_name: '', amount: '', due_date: '', currency: 'USD' });
      setMsg('Invoice added.');
    } catch {
      setMsg('Could not add invoice. Check the fields and try again.');
    }
  };

  const upload = async (file: File) => {
    setMsg(null);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await invoiceApi.importCsv(fd);
      setMsg(`Imported ${res.imported} invoice(s).${res.warnings.length ? ` ${res.warnings.length} warning(s).` : ''}`);
      refetch();
    } catch {
      setMsg('Import failed. Expected columns: invoice_no, client_name, amount, due_date.');
    }
  };

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="font-body text-sm text-flow-gold hover:underline">← Dashboard</Link>
          <h1 className="font-display text-3xl font-bold text-white mt-2">Outstanding Invoices</h1>
          <p className="font-body text-white/40 mt-1">Receivables ledger — overdue invoices trigger dunning alerts automatically</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="OUTSTANDING" value={`$${(aging?.outstanding_total ?? 0).toLocaleString()}`} sub={`${aging?.outstanding_count ?? 0} invoices`} />
          <StatCard label="OVERDUE" value={`$${(aging?.overdue_total ?? 0).toLocaleString()}`} sub={`${aging?.overdue_count ?? 0} invoices`} color={(aging?.overdue_count ?? 0) > 0 ? 'text-rose' : 'text-emerald'} />
          <StatCard label="1–30 DAYS" value={`$${(aging?.buckets?.['1-30'] ?? 0).toLocaleString()}`} />
          <StatCard label="60+ DAYS" value={`$${(aging?.buckets?.['60+'] ?? 0).toLocaleString()}`} color={(aging?.buckets?.['60+'] ?? 0) > 0 ? 'text-rose' : 'text-white'} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 border border-white/10 bg-white/5 p-8">
            <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Invoice Ledger</h2>
            {invoices.length === 0 ? (
              <p className="font-body text-white/40">No invoices yet. Add one or import a CSV.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 font-body text-xs text-white/40 uppercase">
                      <th className="pb-3 pr-4">Invoice</th>
                      <th className="pb-3 pr-4">Client</th>
                      <th className="pb-3 pr-4">Due</th>
                      <th className="pb-3 pr-4 text-right">Amount</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((i) => (
                      <tr key={i.id} className="border-b border-white/5 font-body text-sm text-white/70">
                        <td className="py-3 pr-4 font-mono">{i.invoice_no}</td>
                        <td className="py-3 pr-4">{i.client_name}</td>
                        <td className="py-3 pr-4">{i.due_date}{i.is_overdue && <span className="text-rose"> · {i.days_overdue}d overdue</span>}</td>
                        <td className="py-3 pr-4 text-right font-mono">{i.currency} {i.amount.toLocaleString()}</td>
                        <td className="py-3 pr-4">{i.status}</td>
                        <td className="py-3">
                          {i.status !== 'paid' && (
                            <button
                              onClick={() => markPaid.mutate(i.id)}
                              className="text-xs font-bold uppercase tracking-wider text-flow-gold hover:underline"
                            >
                              Mark paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-6">Add Invoice</h2>
              <form onSubmit={submit} className="space-y-4">
                <input className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30" placeholder="Invoice no (e.g. INV-1042)" value={form.invoice_no} onChange={(e) => setForm({ ...form, invoice_no: e.target.value })} required />
                <input className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30" placeholder="Client name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" step="0.01" min="0" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
                  <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                    {(currencies?.currencies ?? [{ code: 'USD', name: 'US Dollar' }]).map((c) => (
                      <option key={c.code} value={c.code} className="bg-flow-black">{c.code} — {c.name}</option>
                    ))}
                  </select>
                </div>
                <input type="date" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} required />
                <button type="submit" disabled={create.isPending} className="w-full bg-flow-gold py-3 text-xs font-bold uppercase tracking-widest text-flow-black hover:brightness-110 disabled:opacity-50">
                  {create.isPending ? 'ADDING...' : 'ADD INVOICE'}
                </button>
              </form>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h2 className="font-body text-xs font-semibold tracking-wider text-white/40 uppercase mb-4">Bulk Import (CSV)</h2>
              <p className="font-body text-xs text-white/40 mb-4">Columns: invoice_no, client_name, amount, due_date (+ optional issue_date, status, currency, description)</p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
                className="w-full font-body text-sm text-white/60 file:mr-4 file:bg-white/10 file:border-0 file:px-4 file:py-2 file:text-white file:text-xs file:font-bold file:uppercase file:tracking-wider"
              />
            </div>

            {msg && <p className="font-body text-sm text-flow-gold">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
