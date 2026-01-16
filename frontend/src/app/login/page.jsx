"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { loginStart, loginSuccess, loginFailure } from "@/lib/redux/slices/userSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api from "@/lib/api";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.user);
  
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
        const { data } = await api.post('/auth/login', loginData);
        // Save token
        localStorage.setItem('token', data.token);
        
        dispatch(loginSuccess(data));
        toast.success(`Welcome back, ${data.name}!`);
        
        if (data.role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/account');
        }
    } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        dispatch(loginFailure(message));
        toast.error(message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
        const { data } = await api.post('/auth/register', registerData);
        // Save token
        localStorage.setItem('token', data.token);
        
        dispatch(loginSuccess(data));
        toast.success("Account created successfully!");
        router.push('/account');
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed";
        dispatch(loginFailure(message));
        toast.error(message);
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
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
            >
                <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
                    <p className="text-sm text-slate-500 mt-2">Sign in to access your downloads and account.</p>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <Button 
                            variant="outline" 
                            className="w-full gap-2 py-5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle className="w-4 h-4 text-red-500" />
                            Sign in with Google
                        </Button>
                        
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
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
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="pl-9" 
                                            required 
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Sign In
                                </Button>
                            </form>
                        </TabsContent>
                        
                        <TabsContent value="register">
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="name" 
                                            placeholder="John Doe" 
                                            className="pl-9" 
                                            required 
                                            value={registerData.name}
                                            onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="register-email" 
                                            type="email" 
                                            placeholder="name@example.com" 
                                            className="pl-9" 
                                            required 
                                            value={registerData.email}
                                            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="register-password" 
                                            type="password" 
                                            placeholder="Create a password" 
                                            className="pl-9" 
                                            required 
                                            value={registerData.password}
                                            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Create Account
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}