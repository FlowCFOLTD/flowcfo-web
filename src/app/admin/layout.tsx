import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "FlowCFO Admin", template: "%s | FlowCFO Admin" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
