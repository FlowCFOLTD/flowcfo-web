"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [challenge, setChallenge] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, business_type: businessType, challenge }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error?.message || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-accent" />
        <p className="mt-3 text-base font-semibold text-ink">You&apos;re on the list.</p>
        <p className="mt-1 text-sm text-body">We&apos;ll reach out personally.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          id="waitlist-business"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Business type</option>
          {(["Freelancer","E-commerce","Agency","Restaurant","Startup"] as const).map((t) => (
            <option key={t} value={t.toLowerCase()}>{t}</option>
          ))}
        </select>
      </div>
      <textarea
        id="waitlist-challenge"
        placeholder="Your biggest financial challenge (optional)"
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        rows={2}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-body placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Submitting...</span>
        ) : (
          "Join the Waitlist"
        )}
      </button>
      <p className="text-center text-xs text-muted">Already 100+ businesses waiting. No spam.</p>
    </form>
  );
}
