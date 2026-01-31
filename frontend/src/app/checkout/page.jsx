"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Check, CreditCard, Lock, Shield } from "lucide-react";
import { formatPrice } from "@/lib/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const { isAuthenticated, loading } = useSelector((state) => state.user);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            toast.error("Please login to complete your purchase");
            router.push("/login?redirect=/checkout");
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return null; // Or a loading spinner
    }

    if (!isAuthenticated) {
        return null; // Prevent flash of content before redirect
    }

    const gstRate = 0.18;
    const gstAmount = totalAmount * gstRate;
    const finalTotal = totalAmount + gstAmount;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            toast.success("Order placed successfully!", {
                description: "You will receive an email with your download links shortly."
            });
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <div className="pb-20 text-center">
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <StarryBackground />
            <Navbar />
            <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Secure Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Info */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Billing Details</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="123 Main St" required />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2 sm:col-span-1">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="Mumbai" required />
                                        </div>
                                        <div className="space-y-2 sm:col-span-1">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" placeholder="Maharashtra" required />
                                        </div>
                                        <div className="space-y-2 sm:col-span-1">
                                            <Label htmlFor="zip">ZIP / Postal Code</Label>
                                            <Input id="zip" placeholder="400001" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <div className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 opacity-50">
                                            India
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Payment Method</h2>

                                <div className="relative rounded-xl border border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 p-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-4 w-4 rounded-full border border-indigo-600 bg-indigo-600 flex items-center justify-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                        </div>
                                        <span className="font-medium text-indigo-900 dark:text-indigo-200">Credit or Debit Card</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Card Number</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                            <Input className="pl-10" placeholder="0000 0000 0000 0000" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Expiry Date</Label>
                                            <Input placeholder="MM / YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>CVC</Label>
                                            <Input placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                size="lg"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-14 text-lg"
                            >
                                {isProcessing ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Processing...
                                    </div>
                                ) : (
                                    `Pay ${formatPrice(finalTotal)}`
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-6 max-h-80 overflow-auto pr-1">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 text-sm">
                                        <div className="w-12 h-12 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-900 dark:text-white line-clamp-2">{item.name}</p>
                                            <p className="text-slate-500 text-xs mt-0.5">{item.softwareName} • {item.colorName}</p>
                                        </div>
                                        <div className="font-medium text-slate-900 dark:text-white">
                                            {formatPrice(item.price)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>GST (18%)</span>
                                    <span>{formatPrice(gstAmount)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white pt-2">
                                    <span>Total</span>
                                    <span>{formatPrice(finalTotal)}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                <Shield className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                <p>Your payment is processed securely. We do not store your card details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
