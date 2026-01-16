"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/api";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await api.post('/auth/forgotpassword', { email });
        setSubmitted(true);
        toast.success("Reset link sent to your email!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send reset link");
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot Password?</h1>
                    <p className="text-sm text-slate-500 mt-2">Enter your email to receive a reset link.</p>
                </div>

                {submitted ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                            <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                            If an account exists for <strong>{email}</strong>, you will receive an email with instructions to reset your password.
                        </p>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">Back to Login</Button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="pl-9" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Send Reset Link
                        </Button>
                        <Link href="/login" className="flex items-center justify-center text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Login
                        </Link>
                    </form>
                )}
            </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
