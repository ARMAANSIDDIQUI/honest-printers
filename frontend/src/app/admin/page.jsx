"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/data/products";

const stats = [
  {
    label: "Total Revenue",
    value: "₹45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up"
  },
  {
    label: "Active Subscriptions",
    value: "+2350",
    change: "+180.1%",
    icon: Users,
    trend: "up"
  },
  {
    label: "Sales",
    value: "+12,234",
    change: "+19%",
    icon: ShoppingBag,
    trend: "up"
  },
  {
    label: "Active Now",
    value: "+573",
    change: "+201",
    icon: Activity,
    trend: "up"
  }
];

const recentSales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999.00 },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39.00 },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: 299.00 },
    { name: "William Kim", email: "will@email.com", amount: 99.00 },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39.00 }
];

export default function AdminDashboard() {
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
                            from last month
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
                    Chart Area
                </div>
            </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <p className="text-sm text-slate-500">
                    You made 265 sales this month.
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentSales.map((sale, i) => (
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
                                +₹{sale.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}