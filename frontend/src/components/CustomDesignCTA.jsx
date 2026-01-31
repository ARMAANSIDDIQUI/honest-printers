"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, ArrowRight, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomDesignCTA() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 lg:p-12 shadow-2xl border border-indigo-100 dark:border-indigo-800 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-6">
              <Palette className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Custom Design Services</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Have a Unique Idea in Mind?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              We don't just print; we create. From Flex Banners and Flyers to custom Wedding Cards and Envelopes,
              our design team brings your vision to life.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {['Flex Banners', 'Flyers', 'Posters', 'Envelopes', 'Calendars', 'Wedding Cards'].map((item) => (
                <span key={item} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link href="/contact">
              <Button size="lg" className="h-16 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 rounded-xl transition-all hover:scale-105">
                <PenTool className="w-5 h-5 mr-2" />
                Request Custom Design
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-center mt-4 text-sm text-slate-500">
              Get a free quote within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
