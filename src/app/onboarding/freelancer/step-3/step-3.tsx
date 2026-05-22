"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Info,
  ArrowLeft,
  Globe,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function FreelancerStep3() {
  const router = useRouter();
  const [taxRate, setTaxRate] = useState(25);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const baseMonthlyRevenue = 8500;
  const estimatedReserve = baseMonthlyRevenue * (taxRate / 100);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinishing(true);

    setTimeout(() => {
      setIsFinishing(false);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16 relative">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out"
        style={{ width: "100%" }}
      />

      {/* Hero Section */}
      <section className="mx-auto mb-16 max-w-4xl text-center md:text-left">
        <span className="flow-label-wide mb-4 block text-flow-gold">STEP 03/03</span>
        <h1 className="flow-headline-xl text-white mb-8">
          Configure your tax safety net.
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          For solo operators, setting aside taxes in real-time is the difference between 
          growth and a cash crunch. We automate your quarterly set-asides based on your revenue.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-12 items-start">
        {/* Left Side: Summary Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 space-y-10">
            <h3 className="flow-label text-white border-b border-white/10 pb-4 uppercase tracking-widest">
              FINANCIAL ESTIMATES
            </h3>
            <div className="space-y-8">
              <div>
                <p className="flow-label text-white/40 mb-1 uppercase tracking-widest">ESTIMATED REVENUE</p>
                <p className="font-mono text-2xl text-white">
                  ${baseMonthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="flow-label text-white/40 mb-1 uppercase tracking-widest">TAX RESERVE (MONTHLY)</p>
                <p className="font-mono text-2xl text-flow-gold">
                  ${estimatedReserve.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="flow-label text-white/40 mb-1 uppercase tracking-widest">SAFE-TO-SPEND™ SCORE</p>
                <div className="flex items-center gap-3">
                  <p className="font-mono text-2xl text-white">OPTIMIZED</p>
                  <span className="bg-flow-gold/10 text-flow-gold px-2 py-0.5 rounded-full text-[10px] font-bold">
                    SECURE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="relative h-48 bg-flow-obsidian border border-white/10 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-flow-gold/30 flex items-center justify-center bg-flow-gold/5 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="h-6 w-6 text-flow-gold" />
              </div>
              <span className="text-flow-gold font-bold uppercase tracking-[0.3em] text-[10px]">
                VERIFIED BY FLOWCFO AI
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Input Form */}
        <div className="col-span-12 lg:col-span-5 space-y-12">
          <div className="bg-white/5 border border-white/10 p-10">
            <form onSubmit={handleFinish} className="space-y-12">
              <div className="space-y-6">
                <label className="flow-label text-white/40 block uppercase tracking-widest">CURRENT REGION</label>
                <div className="relative group">
                  <input 
                    className="w-full bg-white/[0.02] border-b border-white/20 py-4 px-4 font-body text-white/40 cursor-not-allowed outline-none" 
                    disabled 
                    type="text" 
                    value="United States" 
                  />
                  <Globe className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <label className="flow-label text-white/40 block uppercase tracking-widest">TAX RESERVE RATE (%)</label>
                  <span className="font-mono text-2xl text-flow-gold">{taxRate}%</span>
                </div>
                <input 
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-flow-gold" 
                  max="50" 
                  min="0" 
                  type="range" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  <span>CONSERVATIVE (0%)</span>
                  <span>AGGRESSIVE (50%)</span>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <button 
                  className="flex-1 bg-flow-gold text-flow-black py-6 px-8 font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
                  type="submit"
                  disabled={isFinishing || showSuccess}
                >
                  {isFinishing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      PROVISIONING...
                    </span>
                  ) : showSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      SYSTEM READY
                    </span>
                  ) : "FINISH SETUP"}
                </button>
                <button 
                  className="flex-1 border border-white/10 text-white py-6 px-8 font-bold uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
                  type="button"
                  onClick={() => router.push("/onboarding/freelancer/step-2")}
                >
                  BACK
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-start gap-4 p-8 bg-flow-gold/5 border-l-4 border-flow-gold">
            <Info className="h-6 w-6 shrink-0 text-flow-gold" />
            <p className="font-body text-sm italic leading-relaxed text-white/60">
              &quot;Note: For freelancers, we recommend a 25-30% reserve to safely cover federal and state 
              self-employment obligations. Your Safe-to-Spend™ number will adjust in real-time.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
