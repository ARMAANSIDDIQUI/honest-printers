"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";

export function ProductFilters({
    priceRange, setPriceRange,
    filters, setFilters,
    applyFilters
}) {
    const [localRange, setLocalRange] = useState(priceRange);
    const [categories, setCategories] = useState([]);

    // Local state for other filters
    const [localDiscount, setLocalDiscount] = useState(filters?.discount || false);
    const [localCategory, setLocalCategory] = useState(filters?.category || "");

    useEffect(() => {
        setLocalRange(priceRange);
        setLocalDiscount(filters?.discount || false);
        setLocalCategory(filters?.category || "");
    }, [priceRange, filters]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories');
                setCategories(data);
            } catch (error) {
                console.warn("Failed to fetch categories");
            }
        };
        fetchCategories();
    }, []);

    const handleApply = () => {
        setPriceRange(localRange);
        setFilters({
            ...filters,
            discount: localDiscount,
            category: localCategory
        });
        if (applyFilters) applyFilters({
            minPrice: localRange[0],
            maxPrice: localRange[1],
            discount: localDiscount,
            category: localCategory
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-800">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                        Refine your product search.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid gap-6 py-6 h-full overflow-hidden">
                    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                        <div className="space-y-6">
                            {/* Price Range */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-medium">Price Range</Label>
                                    <span className="text-sm text-muted-foreground">
                                        ₹{localRange[0]} - ₹{localRange[1]}
                                    </span>
                                </div>
                                <Slider
                                    defaultValue={[0, 10000]}
                                    max={10000}
                                    step={100}
                                    value={localRange}
                                    onValueChange={setLocalRange}
                                    min={0}
                                />
                            </div>

                            {/* Discount */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="discount"
                                    checked={localDiscount}
                                    onCheckedChange={setLocalDiscount}
                                />
                                <Label htmlFor="discount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    On Sale / Discounted
                                </Label>
                            </div>

                            {/* Categories */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">Categories</Label>
                                <div className="grid gap-2">
                                    <Button
                                        variant={localCategory === "" ? "secondary" : "ghost"}
                                        className="justify-start h-auto py-2 px-3"
                                        onClick={() => setLocalCategory("")}
                                    >
                                        All Categories
                                    </Button>
                                    {categories.map((cat) => (
                                        <Button
                                            key={cat.id || cat._id}
                                            variant={localCategory === (cat.slug || cat.id) ? "secondary" : "ghost"}
                                            className="justify-start h-auto py-2 px-3"
                                            onClick={() => setLocalCategory(cat.slug || cat.id)}
                                        >
                                            {cat.name}
                                            {localCategory === (cat.slug || cat.id) && <Check className="ml-auto w-4 h-4" />}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <Button onClick={handleApply}>
                        Apply Filters
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
