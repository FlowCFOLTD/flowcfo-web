import type { Metadata } from "next";
import Contact from "./contact";

export const metadata: Metadata = {
  title: "Contact FlowCFO — Get in Touch",
  description:
    "Talk to FlowCFO about early access, partnerships, or the financial clarity problem your business is trying to solve.",
  openGraph: {
    title: "Contact FlowCFO — Get in Touch",
    description:
      "Talk to FlowCFO about early access, partnerships, or the financial clarity problem your business is trying to solve.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FlowCFO" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://flowcfo.net/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
