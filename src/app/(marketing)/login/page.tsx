import type { Metadata } from "next";
import ContactForAccess from "@/components/marketing/ContactForAccess";

export const metadata: Metadata = { title: "Sign in | FlowCFO", robots: { index: false } };
export default function LoginPage() { return <ContactForAccess />; }
