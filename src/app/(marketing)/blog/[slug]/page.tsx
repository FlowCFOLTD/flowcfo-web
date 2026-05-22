import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "edge";

type Post = {
  title: string;
  content: string;
  date: string;
  category: string;
};

const posts: Record<string, Post> = {
  "safe-to-spend-explained": {
    title: "What Is Safe-to-Spend? And Why Your Bank Balance Is Lying to You",
    date: "May 15, 2026",
    category: "Cash Flow",
    content: `Your bank account shows $10,000. That number feels good. But it's hiding something important.

## The Problem With Bank Balances

Your bank balance includes money that isn't yours yet:

- **Tax obligations** — a chunk of that $10,000 belongs to the IRS
- **Upcoming bills** — rent, software subscriptions, payroll
- **Safety buffer** — what happens if income stops for two weeks?

When you subtract all of that, your real spendable number might be closer to $3,200.

## Enter Safe-to-Spend

Safe-to-Spend is a single number that answers: *what can I actually spend today without creating a future problem?*

The formula:

**Safe-to-Spend = Available Balance − Tax Reserve − Upcoming Bills − Safety Buffer**

It's recalculated every morning and updated instantly when a new transaction comes in.

## Why This Matters

Most business owners operate on their bank balance. That's like driving a car looking only at the speedometer — you know how fast you're going, but not how much fuel you have left.

Safe-to-Spend gives you the fuel gauge.`,
  },
  "quarterly-taxes-freelancers": {
    title: "The Freelancer's Guide to Quarterly Taxes (Without the Panic)",
    date: "May 10, 2026",
    category: "Taxes",
    content: `If you're a freelancer in the US, you're responsible for quarterly estimated tax payments. Here's what you need to know.

## When Are Quarterly Taxes Due?

- **Q1** (Jan–Mar): April 15
- **Q2** (Apr–Jun): June 15
- **Q3** (Jul–Sep): September 15
- **Q4** (Oct–Dec): January 15 (following year)

## How Much Should You Set Aside?

A good rule of thumb: **25–30% of every payment you receive.**

This covers:
- Federal self-employment tax (15.3%)
- Federal income tax (varies by bracket)
- State tax (varies by state)

## The FlowCFO Approach

Instead of guessing, FlowCFO calculates your exact reserve based on your income, business type, and location. Every time income hits your account, the right percentage is automatically set aside.

No more tax-season surprises.`,
  },
  "ecommerce-margin-mistakes": {
    title: "3 Margin Mistakes Every E-commerce Founder Makes",
    date: "May 5, 2026",
    category: "E-commerce",
    content: `You launched a product. It's selling. But are you actually making money? Here are the three mistakes that turn profitable-looking products into money losers.

## Mistake 1: Forgetting Platform Fees

Amazon takes 15%. Shopify payment processing is ~2.9%. Then there's FBA fees, storage fees, and advertising costs. If you priced your product at 2x COGS, you're probably losing money.

## Mistake 2: Ignoring Inflation

Your supplier raised prices 8% last quarter. Did you update your prices? If not, your margin just got eaten alive.

## Mistake 3: Not Accounting for Returns

A 5–10% return rate is normal for e-commerce. If you didn't build that into your pricing, every return comes directly out of your margin.

## The Fix

Use a pricing calculator that includes ALL costs: COGS, platform fees, shipping, returns, taxes, and your target margin. FlowCFO's e-commerce agent does this automatically and alerts you when cost increases erode your margin below your threshold.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found — FlowCFO" };
  return {
    title: `${post.title} — FlowCFO Blog`,
    description: post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm text-primary hover:underline">
          ← Back to blog
        </Link>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-primary">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
        <div className="mt-8 max-w-none space-y-4 text-body leading-relaxed">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              const trimmed = line.slice(3).trim();
              return <h2 key={i} className="mt-8 text-xl font-bold text-ink">{trimmed}</h2>;
            }
            if (line.startsWith("### ")) {
              const trimmed = line.slice(4).trim();
              return <h3 key={i} className="mt-6 text-lg font-bold text-ink">{trimmed}</h3>;
            }
            if (line.startsWith("- **") && line.includes("** — ")) {
              const parts = line.split("** — ");
              const boldPart = parts[0].replace("- **", "");
              return (
                <li key={i} className="ml-4">
                  <strong>{boldPart}</strong> — {parts[1]}
                </li>
              );
            }
            if (line.startsWith("- **") && line.includes("** ")) {
              const match = line.match(/- \*\*(.+?)\*\* (.+)/);
              if (match) {
                return (
                  <li key={i} className="ml-4">
                    <strong>{match[1]}</strong> {match[2]}
                  </li>
                );
              }
            }
            if (line.startsWith("- ")) return <li key={i} className="ml-4">{line.slice(2)}</li>;
            if (line.trim() === "") return <div key={i} className="h-4" />;
            if (line.startsWith("*")) {
              const match = line.match(/^\*(.+)\*$/);
              if (match) return <p key={i} className="italic">{match[1]}</p>;
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>
    </article>
  );
}
