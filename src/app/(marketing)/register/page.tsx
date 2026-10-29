import type { Metadata } from "next";
import ContactForAccess from "@/components/marketing/ContactForAccess";

export const metadata: Metadata = { title: "Create an account | FlowCFO", robots: { index: false } };
export default function RegisterPage() { return <ContactForAccess mode="signup" />; }
