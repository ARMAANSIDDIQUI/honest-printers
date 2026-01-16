"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, PenTool, Layout, Image as ImageIcon, Monitor, FileType } from "lucide-react";
import api from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";

const categoryIcons = {
  "business-cards": Layers,
  "brochures": Layout,
  "flyers": FileType,
  "posters": ImageIcon,
  "social-media": Monitor,
  "logos": PenTool,
  "presentations": Monitor,
  "banners": Layout
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Explore Categories
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Browse our comprehensive collection of professional design templates organized by category.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
                const Icon = categoryIcons[category.slug] || Layers;
                return (
                    <motion.div
                        key={category._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link 
                            href={`/products?category=${category.slug}`}
                            className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {category.name}
                            </h2>
                            
                            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                                Professional {category.name.toLowerCase()} templates available in Photoshop, Illustrator, and CorelDRAW formats.
                            </p>
                            
                            <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 gap-2">
                                Browse Collection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
      </main>
      <Footer />
    </div>
  );
}