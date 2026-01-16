"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data);
      } catch (error) {
        console.error("Product not found", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-indigo-500/30">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
}