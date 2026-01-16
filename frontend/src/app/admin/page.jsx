"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign, ShoppingBag, Users, Activity, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/data/products";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Total Revenue", value: "₹0", change: "+0%", icon: DollarSign, trend: "neutral" },
    { label: "Total Customers", value: "0", change: "+0%", icon: Users, trend: "neutral" },
    { label: "Total Orders", value: "0", change: "+0%", icon: ShoppingBag, trend: "neutral" },
    { label: "Total Products", value: "0", change: "+0%", icon: Activity, trend: "neutral" }
  ]);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          api.get('/orders'),
          api.get('/users'),
          api.get('/products')
        ]);

        const orders = ordersRes.data;
        const users = usersRes.data;
        const products = productsRes.data.products;

        // Calculate Stats
        const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
        const totalCustomers = users.length;
        const totalOrders = orders.length;
        const totalProducts = products.length;

        // Recent Sales (Last 5 paid orders)
        const recent = orders
          .filter(o => o.isPaid)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map(o => ({
            name: o.user?.name || "Guest",
            email: o.user?.email || "N/A",
            amount: o.totalPrice
          }));

        setStats([
          { label: "Total Revenue", value: formatPrice(totalRevenue), change: "+100%", icon: DollarSign, trend: "up" },
          { label: "Total Customers", value: totalCustomers.toString(), change: `+${users.length}`, icon: Users, trend: "up" },
          { label: "Total Orders", value: totalOrders.toString(), change: `+${orders.length}`, icon: ShoppingBag, trend: "up" },
          { label: "Total Products", value: totalProducts.toString(), change: `+${products.length}`, icon: Activity, trend: "up" }
        ]);
        setRecentSales(recent);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
            <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">
                            {stat.label}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span className="text-green-500 font-medium flex items-center">
                                {stat.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                            </span>
                            overview
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Placeholder */}
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
                    <Activity className="w-8 h-8 mr-2" />
                    Chart Area (Coming Soon)
                </div>
            </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <p className="text-sm text-slate-500">
                    Latest transactions from your store.
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentSales.length === 0 ? (
                        <p className="text-slate-500 text-sm">No sales yet.</p>
                    ) : (
                        recentSales.map((sale, i) => (
                            <div key={i} className="flex items-center">
                                <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                        {sale.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">{sale.name}</p>
                                    <p className="text-sm text-slate-500">{sale.email}</p>
                                </div>
                                <div className="ml-auto font-medium text-slate-900 dark:text-white">
                                    +{formatPrice(sale.amount)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}