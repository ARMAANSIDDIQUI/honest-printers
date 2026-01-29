"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, Globe, Zap, Coffee, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CareersPage() {
    const benefits = [
        {
            icon: Globe,
            title: "Remote First",
            desc: "Work from anywhere in the world. We focus on output, not hours."
        },
        {
            icon: Heart,
            title: "Health & Wellness",
            desc: "Comprehensive health coverage and wellness stipends."
        },
        {
            icon: Zap,
            title: "Latest Tech",
            desc: "We provide the best gear so you can do your best work."
        },
        {
            icon: Coffee,
            title: "Learning Budget",
            desc: "Annual stipend for courses, books, and conferences."
        }
    ];

    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <Users className="w-3 h-3" />
                        Join the Team
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
                    >
                        Shape the Future of <br className="hidden sm:block" /> Digital Design
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        We're a team of designers and developers building the world's best marketplace for creative assets. We value craftsmanship, honesty, and simplicity.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                                <benefit.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions (Empty State) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800"
                >
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="w-8 h-8 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No Open Positions</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
                        We're not actively hiring right now, but we're always happy to hear from talented folks. Send your portfolio and we'll keep you in mind.
                    </p>
                    <a
                        href="mailto:honestgraphicsandprinters@gmail.com"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                    >
                        Send General Application
                    </a>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
