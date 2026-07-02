import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/admin/",
    "/dashboard/",
    "/onboarding/",
    "/accept-terms",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
