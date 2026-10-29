'use client';

import { useState } from 'react';
import {
  BellRing, Check, ChevronRight, CircleAlert, Landmark, Loader2,
  Mail, MessageSquareText, Send, ShieldCheck, Smartphone, Webhook,
} from 'lucide-react';
import {
  cimbDemoApi,
  type DemoAlertType,
  type DemoNotificationDelivery,
} from '@/lib/api/cimb-demo';

const ALERTS: Array<{
  id: DemoAlertType;
  audience: string;
  title: string;
  timing: string;
  icon: typeof BellRing;
}> = [
  {
    id: 'consumer_commitment',
    audience: 'Consumer',
    title: 'Upcoming commitments',
    timing: '12 days before commitments',
    icon: BellRing,
  },
  {
    id: 'business_liquidity',
    audience: 'Business',
    title: 'Projected liquidity gap',
    timing: 'Before payroll and suppliers',
    icon: CircleAlert,
  },
  {
    id: 'delinquency_prevention',
    audience: 'Early warning',
    title: 'Repayment coverage risk',
    timing: 'Before the repayment due date',
    icon: ShieldCheck,
  },
];

export default function CimbNotificationDemo() {
  const [alertType, setAlertType] = useState<DemoAlertType>('business_liquidity');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [delivery, setDelivery] = useState<DemoNotificationDelivery | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const send = async () => {
    if (!email.trim()) return;
    setBusy(true);
    setError('');
    setDelivery(null);
    const started = performance.now();
    try {
      const response = await cimbDemoApi.sendNotification(email.trim(), alertType);
      setDelivery(response.data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The demonstration alert could not be delivered.');
    } finally {
      setElapsed(Math.round(performance.now() - started));
      setBusy(false);
    }
  };

  return (
    <section>
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6D12]">Alert delivery · live email</p>
        <h2 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-[-.04em] text-[#0A0A0A]">An early signal only matters when it reaches someone who can act.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#62625F]">FlowCFO applies a notification policy to each approved signal: who should know, how urgent it is, which channel may be used and what action the message should request.</p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#73736F]">1. Choose the signal to deliver</p>
          {ALERTS.map(({ id, audience, title, timing, icon: Icon }) => {
            const selected = id === alertType;
            return <button key={id} type="button" onClick={() => { setAlertType(id); setDelivery(null); setError(''); }} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selected ? 'border-[#D4AF37] bg-[#FFF9DC] shadow-[0_10px_30px_rgba(212,175,55,.12)]' : 'border-[#E0DFD9] bg-white hover:border-[#C9C8C2]'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'bg-[#F1F0EB] text-[#62625F]'}`}><Icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#735C00]">{audience}</span><span className="mt-1 block font-semibold text-[#0A0A0A]">{title}</span><span className="mt-1 block text-xs text-[#73736F]">{timing}</span></span>
              {selected ? <Check className="h-5 w-5 text-[#735C00]" /> : <ChevronRight className="h-5 w-5 text-[#A6A6A0]" />}
            </button>;
          })}
        </div>

        <div className="rounded-[24px] border border-[#DEDDD7] bg-white p-6 shadow-[0_22px_60px_rgba(10,10,10,.07)]">
          <div className="flex items-start justify-between gap-4 border-b border-[#E7E5DE] pb-5">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#73736F]">2. Set the demonstration recipient</p><h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">Send the alert to a real inbox</h3></div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A0A0A] text-[#E4C06A]"><Mail className="h-5 w-5" /></span>
          </div>

          <label className="mt-5 block text-xs font-bold text-[#3F403D]" htmlFor="demo-alert-email">Notification email</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input id="demo-alert-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void send(); }} placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border border-[#D3D2CC] bg-[#F7F7F4] px-4 py-3 text-sm text-[#0A0A0A] outline-none transition placeholder:text-[#A6A6A0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15" />
            <button type="button" onClick={() => void send()} disabled={busy || !email.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold text-[#0A0A0A] shadow-[0_10px_24px_rgba(212,175,55,.2)] hover:bg-[#C8A32E] disabled:cursor-not-allowed disabled:opacity-45">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send live alert</button>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-[#858681]">The server sends predefined synthetic alert content. The address is used only for this demonstration request.</p>

          {error && <div className="mt-5 rounded-xl border border-[#F1B8AF] bg-[#FFF4F1] p-4 text-sm text-[#9C3B2E]">{error}</div>}
          {delivery && <div className="mt-5 rounded-2xl border border-[#CFE0D6] bg-[#EAF3EE] p-5">
            <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-white"><Check className="h-4 w-4" /></span><div><p className="font-bold text-[#0A0A0A]">Email accepted for delivery</p><p className="mt-1 text-sm text-[#4F504D]">{delivery.subject}</p><p className="mt-2 text-xs text-[#62625F]">Recipient: {delivery.recipient}</p></div></div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-[#CFE0D6] pt-3 text-[10px] uppercase tracking-wider text-[#61756A]"><span>{elapsed} ms API round trip</span><span>Channel: {delivery.channel}</span>{delivery.provider_message_id && <span>Message: {delivery.provider_message_id}</span>}</div>
          </div>}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          [Mail, 'Email', 'Live in this demo'],
          [MessageSquareText, 'In-app alert', 'Customer interface'],
          [Webhook, 'Bank event', 'Enterprise integration'],
          [Smartphone, 'Push / SMS', 'CIMB channel adapter'],
        ].map(([Icon, name, status]) => { const Graphic = Icon as typeof Mail; return <div key={String(name)} className="rounded-2xl border border-[#E0DFD9] bg-white p-4"><Graphic className="h-5 w-5 text-[#8A6D12]" /><p className="mt-3 font-semibold text-[#0A0A0A]">{String(name)}</p><p className="mt-1 text-xs text-[#73736F]">{String(status)}</p></div>; })}
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-2xl bg-[#0A0A0A] p-5 text-white"><Landmark className="mt-1 h-5 w-5 shrink-0 text-[#E4C06A]" /><div><p className="font-semibold text-white">For a CIMB pilot, delivery rules remain under CIMB control.</p><p className="mt-1 text-sm leading-6 text-white/65">CIMB defines customer consent, severity thresholds, quiet hours, escalation paths and the approved channel for every alert category.</p></div></div>
    </section>
  );
}
