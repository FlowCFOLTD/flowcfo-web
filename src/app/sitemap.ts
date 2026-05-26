import type { MetadataRoute } from "next";

const baseUrl = "https://flowcfo.net";

const posts = [
  { slug: "safe-to-spend-explained", date: "2026-01-15" },
  { slug: "quarterly-taxes-freelancers", date: "2026-02-01" },
  { slug: "ecommerce-margin-mistakes", date: "2026-03-10" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/features",
    "/pricing",
    "/contact",
    "/for-freelancers",
    "/for-ecommerce",
    "/for-agencies",
    "/for-restaurants",
    "/for-startups",
    "/calculator/safe-to-spend",
    "/calculator/tax-reserve",
    "/blog",
    "/privacy",
    "/terms",
    "/waitlist",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : route.startsWith("/calculator") ? 0.8 : 0.7,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
