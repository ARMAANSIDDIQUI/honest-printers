"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { removeFromCart, clearCart } from "@/lib/redux/slices/cartSlice";
import { formatPrice } from "@/lib/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const gstRate = 0.18;
  const gstAmount = totalAmount * gstRate;
  const finalTotal = totalAmount + gstAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <StarryBackground />
        <Navbar />
        <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800">
              <ShoppingBag className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
              Looks like you haven't added any design templates yet. Browse our collection to find what you need.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row gap-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="relative w-full sm:w-32 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <Link href={`/products/${item.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{item.name}</h3>
                        </Link>
                        <p className="font-bold text-slate-900 dark:text-white">{formatPrice(item.price)}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {item.softwareName}
                        </span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                          {item.colorName}
                        </span>
                        <span className="text-xs text-slate-400">
                          {item.fileSize}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        Qty: {item.quantity}
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="flex justify-end pt-4">
                <button
                    onClick={() => dispatch(clearCart())}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                    Clear Cart
                </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="block mt-8">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-4 text-slate-400 opacity-60">
                 {/* Payment Icons Placeholder */}
                 <div className="h-6 w-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
                 <div className="h-6 w-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
                 <div className="h-6 w-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
                Secure checkout powered by Stripe.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}