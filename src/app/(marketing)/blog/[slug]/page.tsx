import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { BlogIllustration } from "@/components/marketing/blog-illustration";
import { editorialPosts, getEditorialPost, getReadingMinutes } from "@/lib/blog";
import { absoluteUrl, createMetadata, jsonLd } from "@/lib/seo";

export const revalidate = 3600;

type BlogPostDetail = {
  title: string;
  slug: string;
  meta_description: string | null;
  keywords: string[];
  body_markdown: string;
  author: string | null;
  published_at: string | null;
};

async function getApiPost(slug: string): Promise<BlogPostDetail | null> {
  const api = process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!api) return null;
  try {
    const res = await fetch(`${api}/api/v1/blog/posts/${slug}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getPost(slug: string) {
  const editorial = getEditorialPost(slug);
  if (editorial) {
    return {
      title: editorial.title,
      slug: editorial.slug,
      description: editorial.description,
      keywords: editorial.keywords,
      body: editorial.body,
      author: editorial.author,
      publishedAt: editorial.publishedAt,
      category: editorial.category,
      format: editorial.format,
      illustration: editorial.illustration,
      sources: editorial.sources,
      readMinutes: getReadingMinutes(editorial.body),
    };
  }
  const post = await getApiPost(slug);
  if (!post) return null;
  return { title: post.title, slug: post.slug, description: post.meta_description || "A FlowCFO article.", keywords: post.keywords || [], body: post.body_markdown, author: post.author || "Joshua O.", publishedAt: post.published_at, category: "FlowCFO insights", format: "Article", illustration: "forecast", sources: [], readMinutes: getReadingMinutes(post.body_markdown) };
}

export async function generateStaticParams() {
  const local = editorialPosts.map((post) => ({ slug: post.slug }));
  const api = process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!api) return local;
  try {
    const res = await fetch(`${api}/api/v1/blog/posts?limit=200`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return local;
    const data = await res.json();
    const remote = Array.isArray(data.posts) ? data.posts.map((post: { slug: string }) => ({ slug: post.slug })) : [];
    return [...local, ...remote.filter((post: { slug: string }) => !local.some((entry) => entry.slug === post.slug))];
  } catch {
    return local;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found — FlowCFO Blog" };
  return createMetadata({ title: post.title, description: post.description || "", path: `/blog/${post.slug}`, image: `/api/og/blog/${post.slug}`, imageAlt: `${post.title} — FlowCFO Blog`, type: "article", publishedTime: post.publishedAt, authors: [post.author || "Joshua O."], keywords: post.keywords });
}

function formatDate(date: string | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = editorialPosts.filter((item) => item.slug !== slug && item.category === post.category).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: { "@type": "Person", name: post.author || "Joshua O." },
    publisher: { "@type": "Organization", name: "FlowCFO", logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    keywords: post.keywords?.join(", "),
  };

  return (
    <main className="bg-[#f7fbf9] text-[#172b2a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }} />
      <header className="border-b border-[#dce9e4] px-5 pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="flow-container max-w-5xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#087f75] hover:text-[#055f58]"><ArrowLeft size={16}/> FlowCFO Blog</Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[.12em] text-[#087f75]"><span>{post.category}</span><span className="h-1 w-1 rounded-full bg-[#a3b7ae]"/><span>{post.format}</span></div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-[-.04em] md:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#536762]">{post.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#71817b]"><span>{formatDate(post.publishedAt)}</span><span>By {post.author}</span><span className="inline-flex items-center gap-1"><Clock3 size={14}/>{post.readMinutes} min read</span></div>
          {post.keywords?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{post.keywords.map((keyword) => <span key={keyword} className="rounded-full border border-[#d2e3dc] bg-white px-3 py-1.5 text-xs text-[#42615a]">{keyword}</span>)}</div>}
        </div>
      </header>

      <div className="flow-container grid max-w-6xl gap-10 py-9 md:py-14 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start">
        <article>
          <BlogIllustration variant={post.illustration} title={post.title}/>
          <div className="blog-content mt-8 max-w-none rounded-3xl border border-[#dce9e4] bg-white px-6 py-8 md:px-12 md:py-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer noopener" className="font-medium text-[#087f75] underline decoration-[#9bd9ca] underline-offset-4 hover:text-[#055f58]">{children}</a>,
              table: ({ children }) => <div className="my-7 overflow-x-auto"><table>{children}</table></div>,
            }}>{post.body}</ReactMarkdown>
            {post.sources.length > 0 && <section aria-labelledby="sources-title" className="mt-10 border-t border-[#dce9e4] pt-7"><h2 id="sources-title" className="text-lg font-semibold">Sources and further reading</h2><ul className="mt-4 space-y-3">{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-start gap-2 text-sm leading-6 text-[#087f75] underline decoration-[#9bd9ca] underline-offset-4 hover:text-[#055f58]">{source.title}<ArrowUpRight size={14} className="mt-1 shrink-0"/></a></li>)}</ul></section>}
            <section className="mt-10 rounded-2xl bg-[#edf7f2] p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#087f75]">Put the idea into practice</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-[#173b38]">See how FlowCFO approaches financial guidance.</h2><p className="mt-3 max-w-2xl leading-7 text-[#536762]">FlowCFO is arranging access through direct conversations. We’ll be clear about what is working today, what is configured for a customer, and what still needs validation.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/features" className="blog-cta inline-flex items-center gap-2 rounded-lg bg-[#087f75] px-5 py-3 text-sm font-semibold hover:bg-[#066b63]">Explore the product <ArrowUpRight size={15}/></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-[#b8d9cb] bg-white px-5 py-3 text-sm font-semibold text-[#17645b] hover:border-[#087f75]">Talk with FlowCFO <ArrowUpRight size={15}/></Link></div></section>
            <p className="mt-9 border-t border-[#dce9e4] pt-6 text-sm leading-6 text-[#71817b]">This article is for general education and is not individualized financial, investment, accounting or tax advice. Rules and options differ by country and personal circumstances.</p>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-32">
          <div className="rounded-2xl border border-[#d8e6e0] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#087f75]">About the author</p><p className="mt-3 font-semibold">Joshua O.</p><p className="mt-2 text-sm leading-6 text-[#61736d]">Founder of FlowCFO, writing about the money questions that matter to people and small businesses.</p></div>
          <div className="rounded-2xl bg-[#123e3b] p-5 text-white"><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#c9ec88]">See FlowCFO in context</p><p className="mt-3 text-lg font-semibold text-white">Explore practical financial guidance for people, small businesses and partner platforms.</p><Link href="/features" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c9ec88]">Explore FlowCFO <ArrowUpRight size={15}/></Link></div>
          {related.length > 0 && <div className="rounded-2xl border border-[#d8e6e0] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#087f75]">More on this topic</p><div className="mt-3 space-y-4">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="block text-sm font-semibold leading-5 text-[#26423d] hover:text-[#087f75]">{item.title}<span className="mt-1 block text-xs font-normal text-[#7a8983]">{item.format}</span></Link>)}</div></div>}
        </aside>
      </div>
    </main>
  );
}
