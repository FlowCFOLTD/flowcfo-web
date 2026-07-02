import type { Metadata } from "next";

export const siteUrl = "https://flowcfo.net";
export const siteName = "FlowCFO";
export const defaultOgImage = "/og-image.png";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "",
  image = defaultOgImage,
  imageAlt = siteName,
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      ...(type === "article"
        ? {
            publishedTime: publishedTime || undefined,
            modifiedTime: modifiedTime || undefined,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
