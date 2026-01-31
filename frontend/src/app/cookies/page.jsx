"use client";

import { motion } from "framer-motion";
import { Cookie, Shield, BarChart3, Settings } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
    const cookieTypes = [
        {
            icon: Shield,
            title: "Essential Cookies",
            desc: "Necessary for the website to function properly. Examples include shopping cart sessions and login status.",
            required: true
        },
        {
            icon: BarChart3,
            title: "Analytics",
            desc: "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
            required: false
        },
        {
            icon: Settings,
            title: "Preferences",
            desc: "Allow the website to remember choices you make (such as your preferred theme or language).",
            required: false
        }
    ];

    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6 text-amber-600 dark:text-amber-500"
                    >
                        <Cookie className="w-10 h-10" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
                    >
                        Cookie Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl"
                    >
                        Transparent information about how and why we use cookies.
                    </motion.p>
                </div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-12 max-w-3xl mx-auto"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Cookies are small text files stored on your device when you visit a website. We use them to make our site work, analyze how you use it, and improve your experience. Review the types of cookies we use below.
                    </p>
                </motion.div>

                {/* Cookie Types Grid */}
                <div className="grid gap-6 max-w-3xl mx-auto">
                    {cookieTypes.map((type, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
                                    <type.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{type.title}</h3>
                                    {type.required && (
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                                            Required
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {type.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
}
