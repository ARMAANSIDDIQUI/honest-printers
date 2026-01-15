"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye,
  Download,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#12345", customer: "John Doe", date: "Oct 12, 2023", total: "$129.99", status: "Paid", items: 3 },
  { id: "#12344", customer: "Jane Smith", date: "Oct 11, 2023", total: "$59.99", status: "Shipped", items: 1 },
  { id: "#12343", customer: "Robert Brown", date: "Oct 10, 2023", total: "$249.50", status: "Processing", items: 5 },
  { id: "#12342", customer: "Alice White", date: "Oct 10, 2023", total: "$89.00", status: "Paid", items: 2 },
  { id: "#12341", customer: "Michael Green", date: "Oct 09, 2023", total: "$15.00", status: "Cancelled", items: 1 },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20">Paid</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20">Shipped</Badge>;
      case "Processing":
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20">Processing</Badge>;
      case "Cancelled":
        return <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border-none">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Orders</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your customer orders.</p>
        </div>
        <Button variant="outline" className="border-slate-200 dark:border-slate-800">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search orders..." 
            className="pl-10 bg-white/50 dark:bg-slate-900/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-slate-800">
              <TableHead className="text-slate-900 dark:text-slate-200">Order ID</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Customer</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Date</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Items</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Total</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Status</TableHead>
              <TableHead className="text-right text-slate-900 dark:text-slate-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-slate-200 dark:border-slate-800">
                <TableCell className="font-medium text-slate-900 dark:text-white">
                  {order.id}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{order.customer}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{order.date}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{order.items} items</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 font-medium">{order.total}</TableCell>
                <TableCell>
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="w-4 h-4" /> Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
