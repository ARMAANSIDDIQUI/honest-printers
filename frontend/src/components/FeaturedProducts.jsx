"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import api from "@/lib/api";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assuming your API has a way to get featured products or just getting first few
        // Adding a query param for featured=true would be ideal in backend
        const { data } = await api.get('/products');
        // Filter client side for now if backend doesn't support filter
        const featured = data.products.filter(p => p.featured).slice(0, 4);
        setProducts(featured.length > 0 ? featured : data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
              Featured Templates
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl transition-colors">
              Hand-picked professional design files trusted by thousands of creative professionals
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
