"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export function DiscountDialog({
    open,
    onOpenChange,
    product,
    onSuccess
}) {
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const percentage = Number(discount);
            if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                toast.error("Please enter a valid percentage (0-100)");
                return;
            }

            await api.put(`/products/${product._id}/discount`, {
                discountPercentage: percentage
            });

            toast.success(percentage === 0 ? "Discount removed" : "Discount applied successfully");
            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to apply discount");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Discount</DialogTitle>
                    <DialogDescription>
                        Apply a percentage discount to all variants of <strong>{product?.name}</strong>.
                        Set to 0 to remove discount.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="discount" className="text-right">
                            Discount %
                        </Label>
                        <Input
                            id="discount"
                            type="number"
                            min="0"
                            max="100"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g. 20"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
