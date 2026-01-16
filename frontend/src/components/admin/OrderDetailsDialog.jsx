"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/data/products";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export function OrderDetailsDialog({ order, open, onOpenChange, onUpdate }) {
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const handleStatusUpdate = async (newStatus) => {
      setLoading(true);
      try {
          // Assuming backend has an endpoint or logic to toggle paid/delivered based on status
          // For now, toggle paid/delivered flags
          // Or update a status field if it exists. Backend `updateOrderToPaid` sets isPaid=true.
          // Let's assume we just have 'mark as paid' for now.
          if (newStatus === 'paid') {
             await api.put(`/orders/${order._id}/pay`, {
                 id: "admin_manual",
                 status: "COMPLETED",
                 update_time: new Date().toISOString(),
                 email_address: "admin@verified.com"
             });
             toast.success("Order marked as paid");
             onUpdate();
          }
      } catch (error) {
          toast.error("Failed to update order");
      } finally {
          setLoading(false);
      }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details #{order._id.substring(0, 8)}</DialogTitle>
          <DialogDescription>Placed on {new Date(order.createdAt).toLocaleString()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
            {/* Status Bar */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <div className="flex gap-2">
                    <Badge variant={order.isPaid ? "default" : "destructive"}>
                        {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                    <Badge variant="outline">{order.isDelivered ? "Delivered" : "Processing"}</Badge>
                </div>
                {!order.isPaid && (
                    <Button size="sm" onClick={() => handleStatusUpdate('paid')} disabled={loading}>
                        Mark as Paid
                    </Button>
                )}
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <UserIcon className="w-4 h-4" /> Customer
                    </h4>
                    <p className="text-sm">{order.user?.name || "Guest"}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {order.user?.email || "N/A"}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Shipping Address
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {order.billingAddress.address}<br/>
                        {order.billingAddress.city}, {order.billingAddress.postalCode}<br/>
                        {order.billingAddress.country}
                    </p>
                </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
                <h4 className="font-semibold text-sm mb-3">Items</h4>
                <div className="space-y-3">
                    {order.orderItems.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded overflow-hidden">
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                                </div>
                            </div>
                            <p>{formatPrice(item.price * item.qty)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.itemsPrice || order.totalPrice / 1.18)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                    <span>Tax (18% GST)</span>
                    <span>{formatPrice(order.taxPrice || (order.totalPrice - order.totalPrice / 1.18))}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{formatPrice(order.totalPrice)}</span>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserIcon({className}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )
}
