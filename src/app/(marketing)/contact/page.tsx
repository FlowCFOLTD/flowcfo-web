import type { Metadata } from "next";
export const dynamic = 'force-static';
import Contact from "./contact";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact FlowCFO — Get in Touch",
  description:
    "Talk to FlowCFO about early access, partnerships, or the financial clarity problem your business is trying to solve.",
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
