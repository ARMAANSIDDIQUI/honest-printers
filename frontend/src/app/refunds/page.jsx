"use client";

import { motion } from "framer-motion";
import { RefreshCw, AlertTriangle, FileQuestion, Mail, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundPage() {
    const steps = [
        {
            icon: FileQuestion,
            title: "Evaluate the Issue",
            desc: "Check if your file is corrupted or materially different from the description."
        },
        {
            icon: Mail,
            title: "Contact Support",
            desc: "Email us at honestgraphicsandprinters@gmail.com with your Order ID and details."
        },
        {
            icon: CheckCircle2,
            title: "Resolution",
            desc: "We typically review and process valid refund requests within 48 hours."
        }
    ];

    return (
        <div className="min-h-screen transition-colors">
            <Navbar />
            <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-800"
                    >
                        <RefreshCw className="w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
                    >
                        Refund Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Clear policies for digital goods. We value fairness and transparency.
                    </motion.p>
                </div>

                {/* Policy Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">

                    {/* Main Policy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Digital Download Policy</h2>
                        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                            <p className="mb-4">
                                Due to the intangible nature of digital products, we generally do not offer refunds once a file has been downloaded. Unlike physical goods, digital files cannot be "returned" in a traditional sense.
                            </p>
                            <p>
                                However, we want you to be happy with your purchase. We handle refund requests on a case-by-case basis and may offer refunds in specific situations.
                            </p>
                        </div>
                    </motion.div>

                    {/* Exceptions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-8 border border-amber-100 dark:border-amber-800/50"
                    >
                        <div className="flex items-center gap-3 mb-6 text-amber-600 dark:text-amber-500">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Exceptions</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "File is technically corrupted.",
                                "Item was misrepresented.",
                                "Duplicate purchase error."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span className="text-amber-900 dark:text-amber-200 text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Process Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">How to Request a Refund</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
