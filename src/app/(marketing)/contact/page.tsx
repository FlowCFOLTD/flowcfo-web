import type { Metadata } from "next";
export const dynamic = 'force-static';
import Contact from "./contact";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact FlowCFO — Get in Touch",
  description:
    "Talk to FlowCFO about assisted access, consumer or SME financial intelligence, and API integrations for banks and platforms.",
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
