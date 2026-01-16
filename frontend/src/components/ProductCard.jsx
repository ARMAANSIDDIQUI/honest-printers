"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { formatPrice } from "@/lib/data/products";

function SoftwareBadge({ softwareId }) {
  const softwareColors = {
    photoshop: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", label: "Ps" },
    illustrator: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/20", label: "Ai" },
    coreldraw: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", border: "border-green-500/20", label: "Cdr" },
    indesign: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/20", label: "Id" }
  };
  
  const style = softwareColors[softwareId] || { bg: "bg-slate-500/10", text: "text-slate-600 dark:text-slate-400", border: "border-slate-500/20", label: "?" };
  
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded text-[10px] font-bold border transition-colors ${style.bg} ${style.text} ${style.border}`}>
      {style.label}
    </span>
  );
}

export function ProductCard({ product, index = 0 }) {
  // Backend returns variants array. Ensure it exists.
  const variants = product.variants || [];
  
  const lowestVariant = variants.reduce((lowest, variant) => 
    variant.price < lowest.price ? variant : lowest
  , variants[0] || { price: 0, originalPrice: 0 });
  
  const discount = lowestVariant.originalPrice > 0 
    ? Math.round((1 - lowestVariant.price / lowestVariant.originalPrice) * 100)
    : 0;

  const uniqueSoftwares = [...new Set(variants.map(v => v.softwareId))];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900 watermarked">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded shadow-lg">
              {discount}% OFF
            </div>
          )}
          
          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-500" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-2">
              <button 
                className="p-3 bg-white text-slate-900 rounded-full shadow-xl hover:scale-110 transition-transform"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="p-3 bg-indigo-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-1.5 mb-3">
            {uniqueSoftwares.slice(0, 4).map((softwareId) => (
              <SoftwareBadge key={softwareId} softwareId={softwareId} />
            ))}
          </div>
          
          <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-1 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 h-10 transition-colors">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50 transition-colors">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                {formatPrice(lowestVariant.price)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through transition-colors">
                  {formatPrice(lowestVariant.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 transition-colors">
              {variants.length} Variants
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}