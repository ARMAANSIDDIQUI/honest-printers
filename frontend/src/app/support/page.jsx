"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, Mail, FileText, MessageSquare, Shield, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
    const supportOptions = [
        {
            icon: HelpCircle,
            title: "Frequently Asked Questions",
            description: "Find instant answers to common questions about downloads, licensing, and payments.",
            action: "Browse FAQs",
            href: "/faq",
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Need personalized assistance? Our support team is here to help you with any issues.",
            action: "Contact Us",
            href: "/contact",
            color: "text-indigo-500",
            bg: "bg-indigo-50 dark:bg-indigo-900/20"
        },
        {
            icon: FileText,
            title: "Licensing Information",
            description: "Understand how you can use our templates for personal and commercial projects.",
            action: "View License",
            href: "/license", // Assuming this might exist or just placeholder
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-900/20"
        },
        {
            icon: RefreshCw,
            title: "Refund Policy",
            description: "Read about our policies regarding digital downloads and refund eligibility.",
            action: "Read Policy",
            href: "/refunds", // Assuming this might exist or just placeholder
            color: "text-rose-500",
            bg: "bg-rose-50 dark:bg-rose-900/20"
        }
    ];

    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
                    >
                        Support Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        We're dedicated to helping you get the most out of our templates.
                        Choose an option below to find the help you need.
                    </motion.p>
                </div>

                {/* Support Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {supportOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 ${option.bg} rounded-xl flex items-center justify-center mb-6`}>
                                <option.icon className={`w-6 h-6 ${option.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {option.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[3rem]">
                                {option.description}
                            </p>
                            <Link href={option.href}>
                                <Button variant="outline" className="w-full group">
                                    {option.action}
                                    <MessageSquare className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Still Need Help Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-indigo-600/20 overflow-hidden relative"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                        <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
                            Our support team is available Mon-Fri, 9am - 6pm IST. We usually respond to tickets within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                                    Open a Support Ticket
                                </Button>
                            </Link>
                            <a href="mailto:honestgraphicsandprinters@gmail.com">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                                    Email Us Directly
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
