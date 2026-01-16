"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { Search, Filter, Eye, Loader2 } from "lucide-react";

import api from "@/lib/api";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { formatPrice } from "@/lib/data/products";

import { OrderDetailsDialog } from "@/components/admin/OrderDetailsDialog";

import {

  Table,

  TableBody,

  TableCell,

  TableHead,

  TableHeader,

  TableRow,

} from "@/components/ui/table";



export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);



  const fetchOrders = async () => {

    try {

      const { data } = await api.get('/orders');

      setOrders(data);

    } catch (error) {

      console.error("Failed to fetch orders", error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchOrders();

  }, []);



  const handleView = (order) => {

      setSelectedOrder(order);

      setIsDetailsOpen(true);

  };



  return (

    <div className="space-y-8">

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Orders</h1>

                <p className="text-slate-500">Manage customer orders and transactions.</p>

            </div>

        </div>



        <OrderDetailsDialog 

            order={selectedOrder} 

            open={isDetailsOpen} 

            onOpenChange={setIsDetailsOpen}

            onUpdate={fetchOrders}

        />



        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">

            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">

                <div className="relative flex-1 max-w-sm">

                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                    <Input placeholder="Search orders..." className="pl-9" />

                </div>

                <Button variant="outline" className="gap-2">

                    <Filter className="w-4 h-4" />

                    Status

                </Button>

            </div>

            

            {loading ? (

                <div className="p-12 flex justify-center">

                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />

                </div>

            ) : (

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Order ID</TableHead>

                            <TableHead>Customer</TableHead>

                            <TableHead>Date</TableHead>

                            <TableHead>Total</TableHead>

                            <TableHead>Status</TableHead>

                            <TableHead className="text-right">Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {orders.length === 0 ? (

                            <TableRow>

                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">

                                    No orders found.

                                </TableCell>

                            </TableRow>

                        ) : (

                            orders.map((order) => (

                                <TableRow key={order._id}>

                                    <TableCell className="font-medium text-slate-900 dark:text-white text-xs">{order._id}</TableCell>

                                    <TableCell>{order.user?.name || 'Guest'}</TableCell>

                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>

                                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>

                                    <TableCell>

                                        <Badge 

                                            variant="secondary" 

                                            className={`

                                                capitalize

                                                ${order.isPaid ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}

                                            `}

                                        >

                                            {order.isPaid ? 'Paid' : 'Pending'}

                                        </Badge>

                                    </TableCell>

                                    <TableCell className="text-right">

                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(order)}>

                                            <Eye className="w-4 h-4" />

                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            )}

        </div>

    </div>

  );

}
