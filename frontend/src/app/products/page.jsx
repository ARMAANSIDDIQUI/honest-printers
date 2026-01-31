"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = '/products';
        if (categorySlug) {
          endpoint += `?category=${categorySlug}`;
          // Also fetch category details to get the name
          try {
            const catRes = await api.get(`/categories/${categorySlug}`);
            setCategoryName(catRes.data.name);
          } catch (e) {
            setCategoryName(categorySlug); // Fallback
          }
        } else {
          setCategoryName("");
        }

        const response = await api.get(endpoint);
        setProducts(response.data?.products || []);
      } catch (error) {
        console.warn("Failed to fetch products:", error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-4 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {categoryName ? categoryName : "All Products"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                {categoryName
                  ? `Browse our collection of ${categoryName.toLowerCase()} templates.`
                  : "Explore our complete collection of professional graphic design templates."}
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-800">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-800">
                  <Filter className="w-4 h-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Popularity</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}