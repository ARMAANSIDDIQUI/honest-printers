"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Package, Download, Settings, LogOut, Clock, FileDown, AlertCircle, Loader2, Camera, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, loginSuccess } from "@/lib/redux/slices/userSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/data/products";
import api from "@/lib/api";
import { toast } from "sonner";

export default function AccountPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        countryCode: "+91",
        avatar: "",
        address: "",
        password: "",
        newPassword: ""
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                countryCode: user.countryCode || "+91",
                avatar: user.avatar || "",
                address: user.address || "",
                password: "",
                newPassword: ""
            });
        }

        const fetchOrders = async () => {
            setLoadingOrders(true);
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user, router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        router.push("/login");
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            // Upload to Cloudinary via backend
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setFormData(prev => ({ ...prev, avatar: data.url }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const updatePayload = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                countryCode: formData.countryCode,
                avatar: formData.avatar,
                address: formData.address
            };

            if (formData.newPassword) {
                updatePayload.password = formData.newPassword;
            }

            const { data } = await api.put('/auth/profile', updatePayload);

            dispatch(loginSuccess(data));
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <StarryBackground />
            <Navbar />
            <main className="relative pt-4 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Account</h1>
                        <p className="text-slate-600 dark:text-slate-400">Manage your profile, orders, and downloads.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <nav className="space-y-2">
                            {[
                                { id: "overview", label: "Overview", icon: User },
                                { id: "orders", label: "Order History", icon: Package },
                                { id: "downloads", label: "Downloads", icon: Download },
                                { id: "settings", label: "Settings", icon: Settings },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-white"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">Need Help?</p>
                                    <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                                        Contact our support team for assistance with your downloads.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "overview" && (
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center sm:text-left">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=6366f1&color=fff`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{formData.name}</h2>
                                            <p className="text-slate-500 truncate max-w-[200px] sm:max-w-none">{formData.email}</p>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                <Phone className="w-3 h-3" />
                                                {formData.countryCode} {formData.phoneNumber || "No phone number added"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-slate-500">Total Orders</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{orders.length}</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-slate-500">Downloads Available</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {orders.reduce((acc, order) => acc + (order.isPaid ? order.orderItems.length : 0), 0)}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium text-slate-500">Member Since</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-lg font-bold">
                                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {activeTab === "orders" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order History</h2>
                                    {loadingOrders ? (
                                        <div className="flex justify-center p-8">
                                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                                            No orders found.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-bold text-slate-900 dark:text-white">Order #{order._id.substring(0, 8)}</span>
                                                                <Badge variant="secondary" className={`
                                                            capitalize
                                                            ${order.isPaid ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
                                                        `}>
                                                                    {order.isPaid ? 'Completed' : 'Pending'}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(order.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <div className="text-xl font-bold text-slate-900 dark:text-white">
                                                            {formatPrice(order.totalPrice)}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {order.orderItems.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                                                <span className="truncate pr-4">{item.name}</span>
                                                                <span className="text-slate-400 whitespace-nowrap">{item.qty} x {formatPrice(item.price)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "downloads" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Downloads</h2>
                                    <div className="grid gap-4">
                                        {orders.filter(o => o.isPaid).flatMap(o => o.orderItems).map((item, i) => (
                                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FileDown className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            <Badge variant="outline">Standard License</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                        {orders.filter(o => o.isPaid).length === 0 && (
                                            <div className="text-center py-8 text-slate-500">
                                                No downloadable files found.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === "settings" && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Account Settings</h2>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">

                                        {/* Profile Image Upload */}
                                        <div className="flex items-center gap-6">
                                            <div className="relative group w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                                                <img
                                                    src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=6366f1&color=fff`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                                <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                                    {uploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                                                </label>
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-900 dark:text-white">Profile Picture</h3>
                                                <p className="text-xs text-slate-500 mt-1">Click to upload a new photo. JPG, PNG or WEBP.</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" value={formData.email} disabled className="opacity-50 cursor-not-allowed" />
                                            </div>

                                            <div className="grid grid-cols-4 gap-4">
                                                <div className="col-span-1 space-y-2">
                                                    <Label htmlFor="countryCode">Code</Label>
                                                    <Select value={formData.countryCode} onValueChange={(val) => setFormData({ ...formData, countryCode: val })}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="+91" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="+91">IN +91</SelectItem>
                                                            <SelectItem value="+1">US +1</SelectItem>
                                                            <SelectItem value="+44">UK +44</SelectItem>
                                                            {/* Add more codes as needed */}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="col-span-3 space-y-2">
                                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                                    <Input
                                                        id="phoneNumber"
                                                        placeholder="9876543210"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    id="address"
                                                    placeholder="123 Main St, City, State, Zip"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Security</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="new-password">New Password</Label>
                                                <Input
                                                    id="new-password"
                                                    type="password"
                                                    placeholder="Leave blank to keep current password"
                                                    value={formData.newPassword}
                                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleUpdateProfile}>Save Changes</Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}