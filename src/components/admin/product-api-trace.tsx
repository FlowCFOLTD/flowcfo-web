'use client';

import { useSyncExternalStore } from 'react';
import { FileJson } from 'lucide-react';
import { apiTraceSnapshot, subscribeApiTrace } from '@/lib/api/product-demo';

const render = (value: unknown) => (value === undefined ? '— (no body)' : JSON.stringify(value, null, 2) ?? String(value));

const shortPath = (url: string) => url.replace(/^https?:\/\/[^/]+/, '');

export default function ProductApiTrace({ label }: { label: string }) {
  const entries = useSyncExternalStore(subscribeApiTrace, apiTraceSnapshot, apiTraceSnapshot);
  const shown = [...entries].reverse();

  return <section className="mt-6 rounded-2xl border border-[#dce8e1] bg-white p-5" aria-label={`${label} API trace`}>
    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#087f75]"><FileJson className="h-4 w-4" />{label} · request / response JSON</p>
    {shown.length === 0
      ? <p className="mt-3 rounded-xl bg-[#f4f8f6] p-3 text-sm text-[#65766f]">No product API calls recorded yet for this view.</p>
      : <ol className="mt-3 space-y-2">{shown.map((entry, index) => <li key={`${entry.at}-${index}`}>
        <details className="rounded-xl border border-[#dde9e2] bg-[#f7faf8] p-3">
          <summary className="cursor-pointer font-mono text-[11px] leading-5 text-[#173b38]">
            <span className="text-[#6d7d76]">{new Date(entry.at).toLocaleTimeString()}</span>
            {' '}<strong>{entry.method}</strong>
            {' '}<span className="break-all">{shortPath(entry.path)}</span>
            {' '}→ <strong>{entry.status ?? 'error'}</strong> · {entry.durationMs}ms
          </summary>
          <div className="mt-2 grid gap-2 lg:grid-cols-2">
            <div className="rounded-lg border border-[#e3ece7] bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#60756b]">Request</p>
              <pre className="mt-1 max-h-56 overflow-auto whitespace-pre-wrap break-all text-[11px] leading-5 text-[#2f453d]">{render(entry.request)}</pre>
            </div>
            <div className="rounded-lg border border-[#e3ece7] bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#60756b]">Response</p>
              <pre className="mt-1 max-h-56 overflow-auto whitespace-pre-wrap break-all text-[11px] leading-5 text-[#2f453d]">{render(entry.response)}</pre>
            </div>
          </div>
        </details>
      </li>)}</ol>}
  </section>;
}
