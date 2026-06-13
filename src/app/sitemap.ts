import type { MetadataRoute } from "next";

const baseUrl = "https://flowcfo.net";

const posts = [
  { slug: "safe-to-spend-explained", date: "2026-01-15" },
  { slug: "quarterly-taxes-freelancers", date: "2026-02-01" },
  { slug: "ecommerce-margin-mistakes", date: "2026-03-10" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/features", priority: 0.9, freq: "monthly" as const },
    { path: "/pricing", priority: 0.9, freq: "monthly" as const },
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
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
