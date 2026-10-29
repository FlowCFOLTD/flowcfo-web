import type { Metadata } from "next";
import ContactForAccess from "@/components/marketing/ContactForAccess";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Request access — FlowCFO", description: "Talk with FlowCFO about the right setup for your financial guidance or API use case.", path: "/register", noIndex: true });
export default function RegisterPage() { return <ContactForAccess mode="signup" />; }
