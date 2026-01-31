"use client";

import Link from "next/link";
import { StaticNavbar } from "@/components/StaticNavbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <InstallPwaProvider>
      <NotificationProvider>
        <ReduxProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors flex flex-col">
            <StarryBackground />
            <Navbar />
            <main className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-indigo-100 dark:text-slate-800">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link href="/">
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </ReduxProvider>
      </NotificationProvider>
    </InstallPwaProvider>
  );
}
