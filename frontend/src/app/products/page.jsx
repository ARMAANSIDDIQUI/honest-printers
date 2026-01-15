"use client";

import { useState } from "react";
import { StarryBackground } from "@/components/StarryBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, PRODUCT_CATEGORIES } from "@/lib/data/products";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Premium Templates
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Browse our collection of professional design templates. High-quality assets for your creative projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search templates..." 
                className="pl-10 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800">
                    <Filter className="w-4 h-4 mr-2" />
                    {selectedCategory === "all" ? "All Categories" : PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <DropdownMenuItem onClick={() => setSelectedCategory("all")}>All Categories</DropdownMenuItem>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <DropdownMenuItem 
                      key={category.id} 
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">No products found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="text-indigo-600 dark:text-indigo-400"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
