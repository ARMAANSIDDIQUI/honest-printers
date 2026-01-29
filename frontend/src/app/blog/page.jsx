"use client";

import { motion } from "framer-motion";
import { Newspaper, Bell, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-8"
                    >
                        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full" />
                        <div className="relative w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-xl rotate-3">
                            <Newspaper className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-950 shadow-lg -rotate-12">
                            <Bell className="w-4 h-4" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
                    >
                        Startups & Design.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Stories Coming Soon.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-10 leading-relaxed"
                    >
                        We're crafting detailed tutorials, design trends deep-dives, and behind-the-scenes stories. Be the first to read when we launch.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full max-w-md flex flex-col sm:flex-row gap-3"
                    >
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12 bg-white dark:bg-slate-900/50 backdrop-blur"
                        />
                        <Button size="lg" className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                            Notify Me
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 text-xs text-slate-400 dark:text-slate-500"
                    >
                        No spam, ever. Unsubscribe anytime.
                    </motion.p>
                </div>

            </main>
            <Footer />
        </div>
    );
}
