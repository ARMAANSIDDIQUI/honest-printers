"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data/products";

const categoryImages = {
  "business-cards": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
  "brochures": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&q=80",
  "flyers": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
  "posters": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "social-media": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
  "logos": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
  "presentations": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
  "banners": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80"
};

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
              Browse by Category
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
              Find the perfect template for your project from our curated categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group block relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  <img
                    src={categoryImages[category.slug] || categoryImages["business-cards"]}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-950 via-transparent to-transparent opacity-80 dark:opacity-100" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-base lg:text-lg tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{category.name}</h3>
                    <span className="text-slate-600 dark:text-slate-300 text-sm mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      Browse <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}
