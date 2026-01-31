"use client";

import { motion } from "framer-motion";
import { Scale, FileWarning, Gavel, Copyright, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <main className="relative pt-4 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-500 shadow-lg shadow-blue-500/20"
          >
            <Scale className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl"
          >
            The legal agreements that set out your rights and responsibilities when using our services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm font-medium text-slate-500"
          >
            Last Updated: January 16, 2026
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Terms */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                title: "1. Acceptance of Terms",
                icon: CheckCircle2,
                text: "By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service."
              },
              {
                title: "2. License & Usage",
                icon: Copyright,
                text: "All products are digital. You are granted a limited, non-exclusive license. You may not resell, redistribute, or claim ownership of the source files."
              },
              {
                title: "3. Refunds & Cancellation",
                icon: FileWarning,
                text: "All sales are final due to the nature of digital goods. Refunds are only issued in case of technical defects that cannot be resolved."
              },
              {
                title: "4. Governing Law",
                icon: Gavel,
                text: "These Terms shall be governed and construed in accordance with the laws of India, specifically under the jurisdiction of Moradabad, UP."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-32 bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20"
            >
              <h3 className="text-xl font-bold mb-6">Quick Summary</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-indigo-100 text-sm">
                  <span className="font-bold text-white">License:</span>
                  Personal & Commercial use allowed. No reselling.
                </li>
                <li className="flex items-start gap-3 text-indigo-100 text-sm">
                  <span className="font-bold text-white">Refunds:</span>
                  Only for technical issues.
                </li>
                <li className="flex items-start gap-3 text-indigo-100 text-sm">
                  <span className="font-bold text-white">Account:</span>
                  Keep your login details secure.
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-indigo-500">
                <p className="text-xs text-indigo-200 mb-2">Need clarification?</p>
                <a href="mailto:legal@honestgraphics.com" className="font-bold hover:underline">legal@honestgraphics.com</a>
              </div>
            </motion.div>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}