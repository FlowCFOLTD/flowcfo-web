import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  keywords: string[];
  body_markdown: string;
  author: string | null;
  published_at: string | null;
}

async function getPost(slug: string): Promise<BlogPostDetail | null> {
  const api = process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${api}/api/v1/blog/posts/${slug}`);
    if (!res.ok) {
      console.error(
        '[BLOG] post fetch failed',
        res.status,
        await res.text().catch(() => ''),
      );
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error('[BLOG] post fetch error', e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found — FlowCFO' };
  return {
    title: `${post.title} — FlowCFO Blog`,
    description: post.meta_description || '',
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm text-primary hover:underline">
          ← Back to blog
        </Link>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          {post.published_at && (
            <span>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {post.author && <span>by {post.author}</span>}
        </div>

        {post.keywords && post.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
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

        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 blog-content max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body_markdown}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
