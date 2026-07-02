import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

type BlogPostSummary = {
  slug: string;
  published_at: string | null;
};

async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  const api =
    process.env.BLOG_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";

  try {
    const res = await fetch(`${api}/api/v1/blog/posts?limit=200`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/features", priority: 0.9, freq: "monthly" as const },
    { path: "/pricing", priority: 0.9, freq: "monthly" as const },
    { path: "/demo", priority: 0.8, freq: "monthly" as const },
    { path: "/for-ecommerce", priority: 0.8, freq: "monthly" as const },
    { path: "/for-freelancers", priority: 0.8, freq: "monthly" as const },
    { path: "/for-agencies", priority: 0.8, freq: "monthly" as const },
    { path: "/for-restaurants", priority: 0.8, freq: "monthly" as const },
    { path: "/for-startups", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "monthly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/waitlist", priority: 0.7, freq: "monthly" as const },
    { path: "/calculator/safe-to-spend", priority: 0.7, freq: "monthly" as const },
    { path: "/calculator/tax-reserve", priority: 0.7, freq: "monthly" as const },
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const posts = await getPublishedPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
