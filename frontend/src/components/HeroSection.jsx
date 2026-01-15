"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Shield, Zap } from "lucide-react";

const features = [
  { icon: Download, label: "Instant Download" },
  { icon: Shield, label: "Secure Files" },
  { icon: Zap, label: "Premium Quality" }
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 dark:bg-slate-900/50 bg-slate-100/50 border border-slate-200 dark:border-slate-800 rounded-full mb-6 transition-colors"
              >
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Professional Design Templates</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight transition-colors"
              >
                Design Files for{" "}
                <span className="relative">
                  <span className="relative z-10 text-indigo-600 dark:text-indigo-400">Creative</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-indigo-600/20 -z-0 origin-left"
                  />
                </span>
                {" "}Professionals
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors"
              >
                Premium graphic design templates ready for immediate download. 
                Available in Photoshop, Illustrator, CorelDRAW, and InDesign formats 
                with professional color profiles.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all group shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Browse Templates
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Categories
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">{feature.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900" />
                <img
                  src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
                  alt="Professional design templates showcase"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -left-6 top-1/4 bg-white dark:bg-slate-900 rounded-xl shadow-xl p-4 hidden lg:block border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">Ps</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">Photoshop Ready</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">CMYK & RGB</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-6 bottom-1/4 bg-white dark:bg-slate-900 rounded-xl shadow-xl p-4 hidden lg:block border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                    <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">Ai</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">Vector Files</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Fully Editable</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-white dark:bg-slate-900 rounded-xl shadow-xl px-6 py-3 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-2 border-white dark:border-slate-900"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">10,000+ Downloads</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Trusted by professionals</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
