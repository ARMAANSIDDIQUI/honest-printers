"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
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

const products = [
  { id: 1, name: "Premium Business Card", category: "Stationery", price: "$29.99", stock: 120, status: "Active" },
  { id: 2, name: "Minimalist Flyer", category: "Marketing", price: "$19.99", stock: 85, status: "Active" },
  { id: 3, name: "Modern Brochure", category: "Stationery", price: "$49.99", stock: 45, status: "Out of Stock" },
  { id: 4, name: "Social Media Pack", category: "Digital", price: "$39.99", stock: 300, status: "Active" },
  { id: 5, name: "Logo Design Kit", category: "Branding", price: "$99.99", stock: 15, status: "Active" },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your store's product catalog.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search products..." 
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
              <TableHead className="text-slate-900 dark:text-slate-200">Product</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Category</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Price</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Stock</TableHead>
              <TableHead className="text-slate-900 dark:text-slate-200">Status</TableHead>
              <TableHead className="text-right text-slate-900 dark:text-slate-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-slate-200 dark:border-slate-800">
                <TableCell className="font-medium text-slate-900 dark:text-white">
                  {product.name}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{product.category}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{product.price}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">{product.stock}</TableCell>
                <TableCell>
                  <Badge 
                    variant={product.status === "Active" ? "default" : "secondary"}
                    className={product.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20" : ""}
                  >
                    {product.status}
                  </Badge>
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
                        <Eye className="w-4 h-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                        <Trash2 className="w-4 h-4" /> Delete
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
