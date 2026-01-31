"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Info } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LicensePage() {
    const allowed = [
        "Use the item in one End Product for yourself or a client.",
        "Make unlimited copies of the single End Product.",
        "Modify the item and combine it with other works.",
        "Use the item for commercial projects."
    ];

    const prohibited = [
        "Resell or redistribute the item (source files) on its own.",
        "Use the item in a tool, template, or builder site.",
        "Share the file with others or on a network.",
        "Claim copyright or intellectual property rights."
    ];

    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
                    >
                        License Terms
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Clear and transparent usage rights for all our design assets.
                        One simple license for all your commercial needs.
                    </motion.p>
                </div>

                {/* License Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Allowed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-900/50 shadow-xl shadow-emerald-500/5"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Check className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Allowed</h2>
                        </div>
                        <ul className="space-y-4">
                            {allowed.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Prohibited */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-rose-200 dark:border-rose-900/50 shadow-xl shadow-rose-500/5"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                                <X className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Prohibited</h2>
                        </div>
                        <ul className="space-y-4">
                            {prohibited.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 text-rose-600 dark:text-rose-400">
                                        <X className="w-3 h-3" />
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-3xl mx-auto text-center bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800"
                >
                    <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-2">Need an Extended License?</h3>
                    <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                        For usage in multiple end products or large-scale commercial projects, please contact our team for an extended license agreement.
                    </p>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
