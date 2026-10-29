import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Clock3 } from "lucide-react";
import { BlogIllustration } from "@/components/marketing/blog-illustration";
import { editorialPosts, getReadingMinutes } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FlowCFO Blog — Practical Money Guides for People and Businesses",
  description: "Clear, source-linked guides on personal cash flow, small-business finance, pricing, budgeting, records and better money decisions.",
  path: "/blog",
  keywords: ["small business cash flow", "personal budgeting", "SME finance guides", "financial education"],
});

export const revalidate = 3600;

type ApiPost = { id: string; title: string; slug: string; meta_description: string | null; keywords: string[]; author: string | null; published_at: string | null };

async function getApiPosts(): Promise<ApiPost[]> {
  const api = process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!api) return [];
  try {
    const res = await fetch(`${api}/api/v1/blog/posts?limit=50`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export default async function BlogPage() {
  const apiPosts = await getApiPosts();
  const localSlugs = new Set(editorialPosts.map((post) => post.slug));
  const posts = [
    ...editorialPosts.map((post) => ({ id: post.slug, slug: post.slug, title: post.title, description: post.description, category: post.category, format: post.format, publishedAt: post.publishedAt, author: post.author, illustration: post.illustration, readMinutes: getReadingMinutes(post.body) })),
    ...apiPosts.filter((post) => !localSlugs.has(post.slug)).map((post) => ({ id: post.id, slug: post.slug, title: post.title, description: post.meta_description || "An update from FlowCFO.", category: "FlowCFO insights", format: "Article", publishedAt: post.published_at || "2026-01-01", author: post.author || "Joshua O.", illustration: "forecast", readMinutes: 5 })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const featured = posts[0];
  const archives = [...new Set(posts.map((post) => post.category))];

  return (
    <main className="bg-[#f7fbf9] text-[#172b2a]">
      <header className="relative overflow-hidden border-b border-[#dce9e4] px-5 pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="pointer-events-none absolute -right-28 top-12 h-96 w-96 rounded-full bg-[#a5e5d2]/35 blur-3xl" />
        <div className="flow-container relative grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div><p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[.15em] text-[#087f75]"><BookOpenText size={17}/> FlowCFO Blog</p><h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.06] tracking-[-.045em] md:text-7xl">Clearer money decisions start with better questions.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#536762]">Practical, source-linked guides for people and business owners—written to make financial ideas useful in the real world.</p></div>
          <p className="max-w-xs pb-1 text-sm leading-6 text-[#61736d]">Written by Joshua O. · Independent educational content · Updated as we learn</p>
        </div>
      </header>

      <section className="flow-container py-10 md:py-14">
        <nav aria-label="Article topics" className="mb-10 flex flex-wrap gap-2">{archives.map((category) => <a key={category} href={`#${category.toLowerCase().replaceAll(" ", "-")}`} className="rounded-full border border-[#d1e0da] bg-white px-4 py-2 text-sm font-medium text-[#42615a] transition-colors hover:border-[#087f75] hover:text-[#087f75]">{category}</a>)}</nav>
        {featured && (
          <article className="grid overflow-hidden rounded-3xl border border-[#d8e6e0] bg-white shadow-[0_24px_70px_-55px_rgba(18,62,59,.4)] lg:grid-cols-[1fr_1.05fr]">
            <Link href={`/blog/${featured.slug}`} className="order-2 p-7 md:p-10 lg:order-1 lg:flex lg:flex-col lg:justify-center"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#087f75]">Latest guide · {featured.category}</p><h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-.03em] md:text-4xl">{featured.title}</h2><p className="mt-4 max-w-xl leading-7 text-[#596d66]">{featured.description}</p><div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#71817b]"><span>{formatDate(featured.publishedAt)}</span><span>By {featured.author}</span><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{featured.readMinutes} min read</span></div><span className="mt-8 inline-flex items-center gap-2 font-semibold text-[#087f75]">Read the article <ArrowUpRight size={17}/></span></Link>
            <Link href={`/blog/${featured.slug}`} className="order-1 p-3 md:p-4 lg:order-2"><BlogIllustration variant={featured.illustration} title={featured.title}/></Link>
          </article>
        )}
      </section>

      <section className="flow-container pb-20 md:pb-28">
        {archives.map((category) => {
          const categoryPosts = posts.filter((post) => post.category === category && post.slug !== featured?.slug);
          if (categoryPosts.length === 0) return null;
          return <div key={category} id={category.toLowerCase().replaceAll(" ", "-")} className="mb-14 scroll-mt-32 last:mb-0"><div className="mb-6 flex items-end justify-between gap-4 border-b border-[#dce9e4] pb-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#087f75]">Explore by topic</p><h2 className="mt-2 font-display text-2xl font-semibold">{category}</h2></div><span className="text-sm text-[#71817b]">{categoryPosts.length} {categoryPosts.length === 1 ? "article" : "articles"}</span></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{categoryPosts.map((post) => <article key={post.id} className="group overflow-hidden rounded-2xl border border-[#d8e6e0] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_55px_-45px_rgba(18,62,59,.45)]"><Link href={`/blog/${post.slug}`} className="block p-3"><BlogIllustration variant={post.illustration} title={post.title} compact/></Link><div className="px-6 pb-6 pt-2"><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#087f75]">{post.format} · {post.category}</p><h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em]"><Link className="transition-colors group-hover:text-[#087f75]" href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#61736d]">{post.description}</p><div className="mt-5 flex items-center justify-between text-xs text-[#71817b]"><span>{formatDate(post.publishedAt)}</span><span className="inline-flex items-center gap-1"><Clock3 size={12}/>{post.readMinutes} min</span></div></div></article>)}</div></div>;
        })}
      </section>
      <aside className="border-t border-[#dce9e4] bg-white py-10"><div className="flow-container flex flex-col justify-between gap-3 text-sm leading-6 text-[#61736d] md:flex-row"><p>Our articles are educational, not individualized financial, investment, accounting or tax advice.</p><p>References are linked so you can read the original guidance and check what applies where you live.</p></div></aside>
    </main>
  );
}
