import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FlowCFO Blog — Financial Clarity for Founders",
  description: "Insights, guides, and updates from FlowCFO.",
  alternates: { canonical: "https://flowcfo.net/blog" },
};

const posts = [
  {
    slug: "safe-to-spend-explained",
    title: "What Is Safe-to-Spend? And Why Your Bank Balance Is Lying to You",
    excerpt:
      "Your account shows $10,000. But after taxes, upcoming bills, and a safety buffer, you might only have $3,200 you can actually use. Here's how to find the real number.",
    date: "May 15, 2026",
    category: "Cash Flow",
  },
  {
    slug: "quarterly-taxes-freelancers",
    title: "The Freelancer's Guide to Quarterly Taxes (Without the Panic)",
    excerpt:
      "Quarterly taxes don't have to be a surprise. Here's how to calculate what you owe, when it's due, and how to never miss a payment again.",
    date: "May 10, 2026",
    category: "Taxes",
  },
  {
    slug: "ecommerce-margin-mistakes",
    title: "3 Margin Mistakes Every E-commerce Founder Makes",
    excerpt:
      "Forgetting platform fees. Ignoring inflation. Not accounting for returns. These three mistakes turn profitable products into money losers.",
    date: "May 5, 2026",
    category: "E-commerce",
  },
];

export default function BlogPage() {
  return (
    <div>
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-lg text-body leading-relaxed">
            Insights, guides, and updates from FlowCFO.
          </p>

          <div className="mt-12 space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-primary">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-body leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
