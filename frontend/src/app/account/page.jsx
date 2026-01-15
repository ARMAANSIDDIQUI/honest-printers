"use client";

import Link from "next/link";
import { StarryBackground } from "@/components/StarryBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Package, Settings, LogOut, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              My Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage your profile, orders, and downloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <User className="w-4 h-4" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 dark:text-slate-400">
                <Package className="w-4 h-4" /> My Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 dark:text-slate-400">
                <CreditCard className="w-4 h-4" /> Billing
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 dark:text-slate-400">
                <Settings className="w-4 h-4" /> Settings
              </Button>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  onClick={() => window.location.href = "/login"}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 space-y-8">
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">john@example.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-slate-200 dark:border-slate-800">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">You haven't placed any orders yet.</p>
                    <Link href="/products">
                      <Button variant="link" className="text-indigo-600 dark:text-indigo-400">
                        Start browsing templates
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Downloads</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">No downloads available.</p>
                    <Button variant="outline" className="border-slate-200 dark:border-slate-800" disabled>
                      View All Downloads
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
