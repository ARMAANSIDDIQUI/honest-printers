"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { Filter, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/ProductFilters";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  // Filter States
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filters, setFilters] = useState({
    discount: false,
    category: categorySlug || ""
  });

  // Sync category slug changes to state
  useEffect(() => {
    if (categorySlug) {
      setFilters(prev => ({ ...prev, category: categorySlug }));
    }
  }, [categorySlug]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = '/products';
      const params = new URLSearchParams();

      // Category (prefer local filter state, fallback to URL slug)
      const currentCategory = filters.category || categorySlug;
      if (currentCategory) params.append('category', currentCategory);

      if (sort) params.append('sort', sort);
      if (filters.discount) params.append('discount', 'true');

      // Only append price if modified from default or specific Logic
      if (priceRange[0] > 0) params.append('minPrice', priceRange[0]);
      if (priceRange[1] < 10000) params.append('maxPrice', priceRange[1]);

      if (currentCategory) {
        // Also fetch category details to get the name
        try {
          const catRes = await api.get(`/categories/${currentCategory}`);
          setCategoryName(catRes.data.name);
        } catch (e) {
          setCategoryName(currentCategory); // Fallback
        }
      } else {
        setCategoryName("");
      }

      const response = await api.get(`${endpoint}?${params.toString()}`);
      setProducts(response.data?.products || []);
    } catch (error) {
      console.warn("Failed to fetch products:", error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, sort, priceRange, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSortChange = (value) => {
    setSort(value);
  };

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
            <ProductFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              filters={filters}
              setFilters={setFilters}
              applyFilters={() => fetchData()}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-800">
                  <Filter className="w-4 h-4" />
                  Sort By: {sort.replace('-', ' ').toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSortChange("newest")}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("price-asc")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("price-desc")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("relevance")}>Relevance</DropdownMenuItem>
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