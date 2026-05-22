"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  ShieldCheck, 
  ChevronDown,
  CheckCircle2
} from "lucide-react";

const invoiceRanges = [
  { id: "1-5", label: "1-5" },
  { id: "6-15", label: "6-15" },
  { id: "16-30", label: "16-30" },
  { id: "30+", label: "30+" },
];

const serviceTypes = [
  "Technical Consulting",
  "Creative Direction",
  "Financial Advisory",
  "Software Architecture",
  "Legal Services",
];

export default function FreelancerStep1() {
  const router = useRouter();
  const [serviceType, setServiceType] = useState("");
  const [invoiceRange, setInvoiceRange] = useState("1-5");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceType) {
      router.push("/onboarding/freelancer/step-2");
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 z-[60] h-1 bg-flow-gold transition-all duration-700 ease-out" style={{ width: "33.33%" }} />

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Content Anchor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <span className="flow-label text-flow-gold uppercase tracking-[0.2em]">Freelancer Setup</span>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-6xl leading-tight">
              Tailoring the command center for solo operations.
            </h1>
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            Configure your financial terminal to match your professional cadence. Precision is our primary protocol.
          </p>
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4 text-flow-gold/80">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-body text-sm italic">Institutional grade encryption active</span>
            </div>
          </div>
        </div>

        {/* Right Side: Input Card */}
        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-12 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
          <form onSubmit={handleContinue} className="space-y-12">
            {/* Service Type Selection */}
            <div className="space-y-6">
              <label className="block flow-label text-white uppercase tracking-widest" htmlFor="service-type">
                Primary Service Type
              </label>
              <div className="relative group">
                <select 
                  id="service-type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-4 pr-10 font-body text-xl text-white outline-none transition-all focus:border-flow-gold appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-flow-obsidian">Select your domain...</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type} className="bg-flow-obsidian text-white">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Monthly Invoices Selection */}
            <div className="space-y-6">
              <label className="block flow-label text-white uppercase tracking-widest">
                Estimated Monthly Invoices
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {invoiceRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setInvoiceRange(range.id)}
                    className={`relative flex flex-col p-6 text-center border transition-all duration-300 group ${
                      invoiceRange === range.id 
                        ? "bg-flow-gold border-flow-gold text-flow-black" 
                        : "border-white/10 bg-white/5 text-white hover:border-flow-gold/50"
                    }`}
                  >
                    <span className="font-mono text-xl font-bold">{range.label}</span>
                    {invoiceRange === range.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button 
                type="submit"
                disabled={!serviceType}
                className="w-full sm:flex-1 flex items-center justify-center gap-3 bg-flow-gold text-flow-black py-6 px-10 font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
              >
                CONTINUE SETUP
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                type="button"
                onClick={() => router.push("/onboarding")}
                className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 text-white py-6 px-10 font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
                BACK
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center overflow-hidden border-t border-white/10 bg-flow-obsidian">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="flow-label text-flow-gold">SOLO-OPS PROTOCOL: ACTIVE</span>
              <span className="font-mono text-sm text-white/40">DOMAIN: <span className="text-white">{serviceType || "PENDING"}</span></span>
              <span className="font-mono text-sm text-white/40">PRECISION-SCORE: <span className="text-white">99.8%</span></span>
              <span className="font-mono text-sm text-white/40">ENCRYPTION: <span className="text-flow-gold">AES-256</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
