"use client";

import Link from "next/link";
import { StarryBackground } from "@/components/StarryBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Trash2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const cartItems = []; // Empty cart for now

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Looks like you haven't added any templates to your cart yet. Explore our collection and find something you like!
                </p>
              </div>
              <Link href="/products">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg group">
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items would go here */}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
