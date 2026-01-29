"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Printer, PenTool, Truck, Layers } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const features = [
  { icon: Printer, label: "Offset & Digital Print" },
  { icon: PenTool, label: "Custom Graphics & Design" },
  { icon: Truck, label: "Print Courier Services" },
  { icon: Layers, label: "Packaging Solutions" }
];

function HeroImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />;
  }

  const imgSrc = resolvedTheme === "dark" ? "/dark-hero.png" : "/light-hero.png";

  return (
    <img
      src={imgSrc}
      alt="Honest Printers - Premium Printing Services"
      className="w-full h-auto object-contain transition-opacity duration-500 relative z-10"
    />
  );
}

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
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Premier Printing Services in Moradabad</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight transition-colors"
            >
              Honest <span className="text-indigo-600 dark:text-indigo-400">Printers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors"
            >
              We specialize in high-quality print solutions including Digital, Screen, and Offset printing.
              Beyond print, we provide custom graphics, professional design, and reliable print courier services.
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
                View Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-2 gap-4 lg:gap-8"
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
            className="relative hidden lg:block"
          >
            <Link href="/products" className="block relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer group">
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900" />
              <HeroImage />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent opacity-50" />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-300">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 text-sm font-medium text-slate-900 dark:text-white">
                  View Products
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

