import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flowcfo.net";

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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/calculator") ? 0.8 : 0.7,
  }));
}
