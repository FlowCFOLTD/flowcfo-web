import type { Metadata } from "next";
import ContactForAccess from "@/components/marketing/ContactForAccess";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Sign in — FlowCFO access", description: "Contact FlowCFO to arrange assisted access to the platform.", path: "/login", noIndex: true });
export default function LoginPage() { return <ContactForAccess />; }
