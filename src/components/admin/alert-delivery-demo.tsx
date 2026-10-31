'use client';

import { useState } from 'react';
import { BellRing, Check, CircleAlert, Loader2, Mail, Send, ShieldCheck } from 'lucide-react';
import { productDemoApi } from '@/lib/api/product-demo';

export default function AlertDeliveryDemo() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [verified, setVerified] = useState(false);
  const [queued, setQueued] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const requestCode = async () => {
    if (!email.trim()) return;
    setBusy(true); setError(''); setMessage(''); setVerified(false); setQueued(null);
    try {
      await productDemoApi.sessionReady();
      const scenario = await productDemoApi.runScenario('business');
      const destination = await productDemoApi.addNotificationDestination(scenario.workspace.id, email.trim());
      setWorkspaceId(scenario.workspace.id); setDestinationId(destination.id);
      setMessage('A verification code was sent by the product API. Enter it to authorize this notification destination.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not request the verification email.'); }
    finally { setBusy(false); }
  };

  const verify = async () => {
    setBusy(true); setError(''); setMessage('');
    try {
      await productDemoApi.verifyNotificationDestination(workspaceId, destinationId, code.trim());
      setVerified(true); setMessage('Destination verified. Alert rules can now queue emails for this address.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not verify the destination.'); }
    finally { setBusy(false); }
  };

  const evaluate = async () => {
    setBusy(true); setError(''); setMessage('');
    try {
      const result = await productDemoApi.evaluateAlerts(workspaceId);
      const alerts = await productDemoApi.listAlerts(workspaceId);
      setQueued(result.new_alert_count);
      setMessage(`${result.new_alert_count} new alert(s) evaluated; ${alerts.data.length} active alert(s) are recorded. Verified email delivery is queued through the product outbox worker.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Alert evaluation failed.'); }
    finally { setBusy(false); }
  };

  return <section>
    <div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#087f75]">Alert lifecycle · verified email · product API</p><h2 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-[-.04em] text-[#173b38] md:text-5xl">A rule becomes a notification only after the recipient opts in.</h2><p className="mt-5 max-w-3xl text-base leading-7 text-[#53665f]">This walkthrough uses the standard workspace notification flow: register an address, verify control of the inbox, evaluate the recorded obligations, and enqueue deduplicated delivery. Actual email delivery depends on the notification worker and configured SMTP provider.</p></div>

    <div className="mt-8 grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-3">
        {[['1', 'Record a financial commitment', 'The business scenario stores payroll, supplier and repayment dates in its workspace.'], ['2', 'Verify the notification destination', 'Unverified addresses are not eligible for customer alert delivery.'], ['3', 'Evaluate rules and queue alerts', 'The API applies versioned rules and writes deduplicated delivery intents to the outbox.']].map(([step, title, description]) => <article key={step} className="rounded-2xl border border-[#dce8e1] bg-white p-4"><span className="font-mono text-xs font-bold text-[#087f75]">{step}</span><h3 className="mt-2 font-semibold text-[#173b38]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#5f726a]">{description}</p></article>)}
      </div>

      <div className="rounded-[24px] border border-[#dce8e1] bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4 border-b border-[#e5ede8] pb-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123e3b] text-[#c9ec88]"><Mail className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#61756d]">Customer-controlled email channel</p><h3 className="mt-1 font-display text-2xl font-bold text-[#173b38]">Verify, then evaluate</h3></div></div>

        <label className="mt-5 block text-xs font-bold text-[#3f554d]" htmlFor="product-alert-email">Notification email</label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row"><input id="product-alert-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border border-[#ceddd5] bg-[#f7faf8] px-4 py-3 text-sm text-[#173b38] outline-none focus:border-[#087f75]" /><button type="button" onClick={() => void requestCode()} disabled={busy || !email.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087f75] px-4 py-3 text-xs font-bold text-white disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Send verification</button></div>

        {destinationId && !verified && <div className="mt-4 flex flex-col gap-2 sm:flex-row"><input aria-label="Verification code" inputMode="numeric" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit code" className="min-w-0 flex-1 rounded-xl border border-[#ceddd5] bg-[#f7faf8] px-4 py-3 text-sm text-[#173b38] outline-none focus:border-[#087f75]" /><button type="button" onClick={() => void verify()} disabled={busy || code.length !== 6} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#087f75] px-4 py-3 text-xs font-bold text-[#087f75] disabled:opacity-50">Verify destination</button></div>}

        <div className="mt-4"><button type="button" onClick={() => void evaluate()} disabled={busy || !verified} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123e3b] px-5 py-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" /> Evaluate and queue alerts</button><p className="mt-2 text-[11px] leading-5 text-[#6d7d76]">The API response confirms queuing, not delivery. The worker must be running and the receiving email provider must accept the message.</p></div>

        {error && <p role="alert" className="mt-4 rounded-xl border border-[#e4bcb3] bg-[#fff5f2] p-3 text-sm text-[#943e34]">{error}</p>}
        {message && <p role="status" className="mt-4 flex items-start gap-2 rounded-xl border border-[#d5e7df] bg-[#f2f8f5] p-3 text-sm leading-6 text-[#38594d]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#087f75]" />{message}</p>}
        {queued !== null && <p className="mt-3 text-xs text-[#65766f]">New alerts queued this evaluation: <strong>{queued}</strong></p>}
      </div>
    </div>

    <div className="mt-6 grid gap-3 md:grid-cols-3">{[[BellRing, 'Commitment reminder', 'Due-date rule'], [CircleAlert, 'Projected cash below zero', 'Deterministic baseline'], [ShieldCheck, 'Budget pressure', 'Recorded spending vs limit']].map(([Icon, title, text]) => { const Graphic = Icon as typeof BellRing; return <div key={String(title)} className="rounded-2xl border border-[#dce8e1] bg-white p-4"><Graphic className="h-5 w-5 text-[#087f75]" /><p className="mt-3 font-semibold text-[#173b38]">{String(title)}</p><p className="mt-1 text-xs text-[#65766f]">{String(text)}</p></div>; })}</div>
    <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#f0f6f3] p-4 text-xs leading-5 text-[#53665f]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#087f75]" />Rules identify recorded obligations and financial pressure. They are not evidence that delinquency has been prevented; lead time, false-positive rates and customer outcomes still need validation.</p>
  </section>;
}
