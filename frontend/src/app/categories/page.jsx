"use client";

import Link from "next/link";
import { StarryBackground } from "@/components/StarryBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCT_CATEGORIES } from "@/lib/data/products";
import { 
  CreditCard, 
  BookOpen, 
  Image as ImageIcon, 
  Presentation, 
  Share2, 
  Layout, 
  Flag,
  PenTool
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  'business-cards': CreditCard,
  'brochures': BookOpen,
  'flyers': Flag,
  'posters': ImageIcon,
  'social-media': Share2,
  'logos': PenTool,
  'presentations': Presentation,
  'banners': Layout
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Explore by Category
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Find exactly what you need for your next project. Our templates are organized by category to help you design faster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category) => {
              const Icon = categoryIcons[category.id] || Layout;
              return (
                <Link 
                  key={category.id} 
                  href={`/products?category=${category.slug}`}
                  className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Premium {category.name.toLowerCase()} templates designed for professional use.
                  </p>
                  <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    Browse templates
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
