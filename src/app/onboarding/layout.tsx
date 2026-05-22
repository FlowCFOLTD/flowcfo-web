'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: sessionData, error } = await authClient.getSession();
      
      if (error || !sessionData?.user) {
        router.push("/signin");
        return;
      }

      // Fetch full profile to check onboarding status
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/users/me`, {
          headers: {
            'Authorization': `Bearer ${sessionData.session.token}`
          }
        });

        if (response.ok) {
          const user = await response.json();
          
          if (user.onboarding_completed) {
            router.push("/dashboard");
            return;
          }

          // Redirect to correct step if they are on the wrong page
          const currentStep = user.onboarding_step;
          const isAtHome = pathname === "/onboarding";
          
          if (currentStep === "step_1" && !pathname.includes("step-2")) {
            // They finished step 1, should be on step 2
            // But we don't know their business type here easily from just the step name
            // Unless we extract it from the user object
          }
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-flow-obsidian flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-flow-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flow-obsidian text-white selection:bg-flow-gold selection:text-flow-black">
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-flow-obsidian/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 md:px-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="font-display text-2xl font-bold tracking-[-0.04em] text-flow-gold md:text-[32px]">
              FlowCFO
            </Link>
          </div>
          <div className="hidden items-center space-x-12 md:flex">
            <button 
              onClick={() => authClient.signOut().then(() => router.push("/"))}
              className="flow-label text-white/40 transition-colors hover:text-flow-gold"
            >
              SAVE & EXIT
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        {children}
      </main>

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 h-screen w-1/2 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-flow-gold blur-[160px]"></div>
      </div>
    </div>
  );
}
