"use client";

import { motion } from "framer-motion";

export function StaticPageHeader({ title, description }) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 dark:from-indigo-500/10 via-transparent to-transparent" />
      </div>
    </section>
  );
}
