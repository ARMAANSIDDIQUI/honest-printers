"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/api";
import Link from "next/link";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    
    setLoading(true);
    try {
        await api.put(`/auth/resetpassword/${params.resettoken}`, { password });
        setSuccess(true);
        toast.success("Password reset successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Invalid or expired token");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors flex flex-col">
      <StarryBackground />
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20 pb-20 px-4">
        <div className="w-full max-w-md relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h1>
                    <p className="text-sm text-slate-500 mt-2">Create a new secure password.</p>
                </div>

                {success ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                            Your password has been successfully reset. You can now login with your new password.
                        </p>
                        <Link href="/login">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Go to Login</Button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    id="password" 
                                    type={showPass ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="pl-9 pr-10" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    id="confirmPassword" 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="pl-9" 
                                    required 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Reset Password
                        </Button>
                    </form>
                )}
            </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
