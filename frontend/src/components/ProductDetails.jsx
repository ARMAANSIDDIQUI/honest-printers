"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ShoppingCart, Check, FileDown, Layers, Shield, Monitor, Smartphone, AlertCircle } from "lucide-react";
import { addToCart } from "@/lib/redux/slices/cartSlice";
import { formatPrice, getSoftwareInfo, getColorVariantInfo } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductDetails({ product }) {
  const dispatch = useDispatch();
  
  // 1. Compute initial available options
  const uniqueSoftwares = [...new Set(product.variants.map(v => v.softwareId))];
  
  // 2. State for selections
  const [selectedSoftware, setSelectedSoftware] = useState(uniqueSoftwares[0]);
  
  // Filter colors based on selected software
  const availableVariantsForSoftware = product.variants.filter(v => v.softwareId === selectedSoftware);
  const availableColors = [...new Set(availableVariantsForSoftware.map(v => v.colorVariantId))];
  
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [activeImage, setActiveImage] = useState(product.previewImages[0]);

  // Update color if the current selection isn't available for the new software
  useEffect(() => {
    const validColors = product.variants
        .filter(v => v.softwareId === selectedSoftware)
        .map(v => v.colorVariantId);
        
    if (!validColors.includes(selectedColor)) {
        setSelectedColor(validColors[0]);
    }
  }, [selectedSoftware, selectedColor, product.variants]);

  // 3. Derived current variant
  const currentVariant = product.variants.find(
    v => v.softwareId === selectedSoftware && v.colorVariantId === selectedColor
  ) || product.variants[0];

  const softwareInfo = getSoftwareInfo(selectedSoftware);
  const colorInfo = getColorVariantInfo(selectedColor);
  
  const discount = Math.round((1 - currentVariant.price / currentVariant.originalPrice) * 100);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: currentVariant.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: currentVariant.price,
      image: product.thumbnail,
      softwareId: selectedSoftware,
      colorVariantId: selectedColor,
      softwareName: softwareInfo?.name,
      colorName: colorInfo?.name,
      fileSize: currentVariant.fileSize
    }));
    toast.success("Added to cart", {
      description: `${product.name} (${softwareInfo?.name} - ${colorInfo?.name})`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column: Images */}
      <div className="space-y-6">
        <motion.div 
          layoutId={`main-image-${product.id}`}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 watermarked"
        >
          <img 
            src={activeImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg">
              {discount}% OFF
            </div>
          )}
        </motion.div>
        
        <div className="grid grid-cols-4 gap-4">
          {product.previewImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all watermarked ${activeImage === img ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Layers className="w-5 h-5 text-indigo-500 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Fully Layered</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Organized & grouped layers</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <FileDown className="w-5 h-5 text-indigo-500 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Instant Download</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Access files immediately</p>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column: Details & Selection */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
             {product.tags.slice(0, 3).map(tag => (
                 <Badge key={tag} variant="secondary" className="uppercase tracking-wider text-[10px]">{tag}</Badge>
             ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            
            {/* Software Selection */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">File Format</label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Select software</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {uniqueSoftwares.map((swId) => {
                        const info = getSoftwareInfo(swId);
                        const isSelected = selectedSoftware === swId;
                        return (
                            <button
                                key={swId}
                                onClick={() => setSelectedSoftware(swId)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                            >
                                <span className="text-xs font-bold">{info?.name}</span>
                                <span className="text-[10px] opacity-70 mt-1">{info?.extension}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Color Variant Selection */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">Color Mode</label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Select variant</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {availableColors.map((colId) => {
                        const info = getColorVariantInfo(colId);
                        const isSelected = selectedColor === colId;
                        return (
                            <button
                                key={colId}
                                onClick={() => setSelectedColor(colId)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`}
                            >
                                {info?.name}
                            </button>
                        );
                    })}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    {getColorVariantInfo(selectedColor)?.description}
                </p>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-baseline gap-3 mb-1">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                {formatPrice(currentVariant.price)}
                            </span>
                            <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                                {formatPrice(currentVariant.originalPrice)}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Includes 18% GST • File Size: {currentVariant.fileSize}
                        </p>
                    </div>
                    <Button 
                        size="lg" 
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>

        {/* Technical Specs Accordion */}
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="specs">
                <AccordionTrigger>Technical Specifications</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <span>Resolution</span>
                            <span className="font-medium text-slate-900 dark:text-white">300 DPI</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <span>Color Space</span>
                            <span className="font-medium text-slate-900 dark:text-white">{getColorVariantInfo(selectedColor)?.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <span>Layered</span>
                            <span className="font-medium text-slate-900 dark:text-white">Yes, Smart Objects</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="license">
                <AccordionTrigger>Licensing Information</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        This purchase includes a Standard Commercial License. You may use this item to create end products for yourself or for one client. You may not resell or redistribute the original source files.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

      </div>
    </div>
  );
}
