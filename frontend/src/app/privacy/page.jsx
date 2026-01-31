"use client";

import { motion } from "framer-motion";
import { Lock, Eye, ShieldCheck, Database, Scale, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Name and contact information (email, phone).",
        "Billing details (processed securely by Stripe).",
        "Account credentials and download history."
      ]
    },
    {
      icon: Database,
      title: "How We Use Data",
      content: [
        "Processing orders and delivering files.",
        "Sending transaction emails and updates.",
        "Improving our platform and support."
      ]
    },
    {
      icon: ShieldCheck,
      title: "Security Measures",
      content: [
        "Encryption for all sensitive data transmission.",
        "Regular security audits and updates.",
        "Strict access controls for internal tools."
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-500 shadow-lg shadow-emerald-500/20"
          >
            <Lock className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl"
          >
            Your privacy is our priority. We protect your data with the same care we take with our designs.
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

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-12 max-w-4xl mx-auto"
        >
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
            At Honest Graphics & Printers, we believe in transparency. This policy outlines exactly what we collect,
            why we need it, and how we keep it safe. We never sell your personal data to third parties.
          </p>
        </motion.div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-8 max-w-2xl mx-auto border border-indigo-100 dark:border-indigo-800/50"
        >
          <Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Questions about your data?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-0">
            Contact our Data Protection Officer at <a href="mailto:honestgraphicsandprinters@gmail.com" className="text-indigo-600 font-semibold hover:underline">honestgraphicsandprinters@gmail.com</a>
          </p>
        </motion.div>

      </main>
      <Footer />
    </div>
  );
}