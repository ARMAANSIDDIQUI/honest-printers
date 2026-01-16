"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-6">
        <Settings className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Store Settings</h1>
      <p className="text-slate-500 max-w-md">
        Global store configuration, tax settings, and shipping rules management will be available here.
      </p>
    </div>
  );
}
