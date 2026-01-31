"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { Mail, Lock, User, Loader2, Phone, MapPin, Camera, Eye, EyeOff } from "lucide-react";

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

import Link from "next/link";



export default function LoginPage() {

    const dispatch = useDispatch();

    const router = useRouter();

    const { loading } = useSelector((state) => state.user);



    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const [registerData, setRegisterData] = useState({

        name: "",

        email: "",

        password: "",

        phoneNumber: "",

        address: "",

        avatar: ""

    });

    const [uploading, setUploading] = useState(false);

    const [showLoginPass, setShowLoginPass] = useState(false);

    const [showRegisterPass, setShowRegisterPass] = useState(false);



    const handleGoogleLogin = () => {

        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'https://backend.honestprinters.in/api'}/auth/google`;

    };





    const handleLogin = async (e) => {

        e.preventDefault();

        dispatch(loginStart());



        try {

            const { data } = await api.post('/auth/login', loginData);

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



    const handleImageUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;



        const formData = new FormData();

        formData.append('image', file);



        setUploading(true);

        try {

            const { data } = await api.post('/upload', formData, {

                headers: { 'Content-Type': 'multipart/form-data' }

            });

            setRegisterData(prev => ({ ...prev, avatar: data.url }));

            toast.success("Image uploaded!");

        } catch (error) {

            toast.error("Upload failed");

        } finally {

            setUploading(false);

        }

    };



    const handleRegister = async (e) => {

        e.preventDefault();

        dispatch(loginStart());



        try {

            const { data } = await api.post('/auth/register', registerData);

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



                        <div className="p-6 pt-8">

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

                                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}

                                                />

                                            </div>

                                        </div>

                                        <div className="space-y-2">

                                            <div className="flex items-center justify-between">

                                                <Label htmlFor="password">Password</Label>

                                                <Link href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-500">Forgot password?</Link>

                                            </div>

                                            <div className="relative">

                                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                                                <Input

                                                    id="password"

                                                    type={showLoginPass ? "text" : "password"}

                                                    placeholder="••••••••"

                                                    className="pl-9 pr-10"

                                                    required

                                                    value={loginData.password}

                                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}

                                                />

                                                <button

                                                    type="button"

                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"

                                                    onClick={() => setShowLoginPass(!showLoginPass)}

                                                >

                                                    {showLoginPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}

                                                </button>

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

                                        <div className="flex justify-center mb-4">

                                            <div className="relative group w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

                                                {registerData.avatar ? (

                                                    <img src={registerData.avatar} alt="Avatar" className="w-full h-full object-cover" />

                                                ) : (

                                                    <div className="w-full h-full flex items-center justify-center">

                                                        <User className="w-8 h-8 text-slate-400" />

                                                    </div>

                                                )}

                                                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">

                                                    {uploading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}

                                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />

                                                </label>

                                            </div>

                                        </div>



                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="space-y-2">

                                                <Label htmlFor="name">Full Name</Label>

                                                <Input

                                                    id="name"

                                                    placeholder="John Doe"

                                                    required

                                                    value={registerData.name}

                                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}

                                                />

                                            </div>

                                            <div className="space-y-2">

                                                <Label htmlFor="phone">Phone</Label>

                                                <Input

                                                    id="phone"

                                                    placeholder="9876543210"

                                                    required

                                                    value={registerData.phoneNumber}

                                                    onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}

                                                />

                                            </div>

                                        </div>



                                        <div className="space-y-2">

                                            <Label htmlFor="address">Address</Label>

                                            <Input

                                                id="address"

                                                placeholder="123 Main St, City"

                                                value={registerData.address}

                                                onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}

                                            />

                                        </div>



                                        <div className="space-y-2">

                                            <Label htmlFor="register-email">Email Address</Label>

                                            <Input

                                                id="register-email"

                                                type="email"

                                                placeholder="name@example.com"

                                                required

                                                value={registerData.email}

                                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}

                                            />

                                        </div>

                                        <div className="space-y-2">

                                            <Label htmlFor="register-password">Password</Label>

                                            <div className="relative">

                                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                                                <Input

                                                    id="register-password"

                                                    type={showRegisterPass ? "text" : "password"}

                                                    placeholder="Create a password"

                                                    className="pl-9 pr-10"

                                                    required

                                                    value={registerData.password}

                                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}

                                                />

                                                <button

                                                    type="button"

                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"

                                                    onClick={() => setShowRegisterPass(!showRegisterPass)}

                                                >

                                                    {showRegisterPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}

                                                </button>

                                            </div>

                                        </div>

                                        <Button type="submit" disabled={loading || uploading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">

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
