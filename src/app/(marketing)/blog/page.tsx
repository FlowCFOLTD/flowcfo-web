import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'FlowCFO Blog — Cash Flow, Taxes, Margins & AI CFO Guides',
  description:
    'Practical guides for small business cash flow, Safe-to-Spend decisions, ecommerce margins, tax reserves, startup runway, agency profit, and AI CFO workflows.',
  path: '/blog',
  keywords: [
    'small business cash flow blog',
    'AI CFO guides',
    'Safe-to-Spend',
    'ecommerce margin guides',
    'freelancer tax reserve',
  ],
});

export const revalidate = 3600;

interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  keywords: string[];
  author: string | null;
  published_at: string | null;
}

async function getPosts(): Promise<BlogPostSummary[]> {
  const api = process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const url = `${api}/api/v1/blog/posts?limit=50`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error('[BLOG] fetch failed', res.status);
      return [];
    }
    const data = await res.json();
    return data.posts || [];
  } catch (e) {
    console.error('[BLOG] fetch error', e);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-lg text-body leading-relaxed">
            Insights, guides, and updates from FlowCFO.
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-body">No posts yet. Check back soon.</p>
          ) : (
            <div className="mt-12 space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-xs text-muted">
                    {post.published_at && (
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' },
                        )}
                      </span>
                    )}
                    {post.author && <span>by {post.author}</span>}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-body leading-relaxed">
                    {post.meta_description}
                  </p>
                  {post.keywords && post.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
