'use client';

import { useState } from 'react';
import {
  Landmark,
  Zap,
  Upload,
  Lock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import CsvUploadZone from './csv-upload-zone';

interface BankConnectionCardProps {
  onPlaidConnect: () => void;
  onTellerConnect: () => void;
  onCsvUploadSuccess: (accountId: string) => void;
  title?: string;
  description?: string;
}

export default function BankConnectionCard({
  onPlaidConnect,
  onTellerConnect,
  onCsvUploadSuccess,
  title = 'CONNECT YOUR CAPITAL',
  description = 'Establish a secure, read-only link to your operating accounts. We track the movement, you keep the keys.',
}: BankConnectionCardProps) {
  const [showCsvUpload, setShowCsvUpload] = useState(false);

  if (showCsvUpload) {
    return (
      <CsvUploadZone
        onSuccess={onCsvUploadSuccess}
        onCancel={() => setShowCsvUpload(false)}
      />
    );
  }
  return (
    <div className="bg-flow-obsidian border border-flow-gold/20 p-10 md:p-14 relative overflow-hidden shadow-2xl transition-transform duration-200 ease-out">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-flow-gold/5 blur-[100px] -mr-40 -mt-40"></div>

      <div className="relative z-10 space-y-10">
        <div className="flex justify-between items-center border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-flow-gold flex items-center justify-center">
              <Landmark className="h-6 w-6 text-flow-black" />
            </div>
            <span className="flow-label text-white/40 tracking-[0.2em]">SECURE BANK LINK</span>
          </div>
          <Lock className="h-5 w-5 text-white/20" />
        </div>

        <div className="space-y-6">
          <label className="flow-label text-flow-gold block tracking-[0.2em]">
            {title}
          </label>
          <p className="font-body text-sm text-white/40 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <button
            onClick={onPlaidConnect}
            className="w-full bg-flow-gold text-flow-black font-bold py-6 px-8 flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.98] group"
          >
            <span className="font-display tracking-[0.2em] text-sm font-black uppercase">
              Connect via Plaid
            </span>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onTellerConnect}
            className="w-full border border-flow-gold/30 text-flow-gold font-bold py-6 px-8 flex items-center justify-center gap-3 hover:bg-flow-gold/5 transition-all group active:scale-[0.98]"
          >
            <span className="font-display tracking-[0.2em] text-sm font-black uppercase">
              Connect via Teller
            </span>
            <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
          </button>

          <div className="pt-4">
            <div className="mb-8 h-px w-full bg-white/10" />
            <button
              onClick={() => setShowCsvUpload(true)}
              className="flex w-full items-center justify-center gap-3 font-label-caps text-xs tracking-[0.1em] text-white/40 transition-all hover:text-flow-gold"
            >
              <Upload className="h-4 w-4" />
              UPLOAD CSV STATEMENTS MANUALLY
            </button>
          </div>
        </div>

        <p className="text-center text-white/20 font-body text-[10px] leading-relaxed px-12 uppercase tracking-[0.1em]">
          By authorizing, you connect your financial data via secure APIs. Data
          is strictly used for analytical modeling and liquidity forecasting.
        </p>
      </div>
    </div>
  );
}
