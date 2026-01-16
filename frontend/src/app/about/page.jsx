"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, ShieldCheck, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";

export default function AboutPage() {
  const stats = [
    { label: "Design Templates", value: "5,000+" },
    { label: "Active Users", value: "10,000+" },
    { label: "Downloads", value: "50,000+" },
    { label: "Support", value: "24/7" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                    Honest Printers
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Service Provider of digital printing services, screen printing & offset printing in Moradabad, Uttar Pradesh.
                    We are your one-stop shop for <strong>Flex Banners, Flyers, Posters, Visiting Cards, Envelopes, Calendars, Stickers, and Custom Graphic Design</strong>. 
                    Whether you need marketing materials or office stationery, we deliver quality and precision.
                </p>
            </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Manufacturer</div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nature of Business</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Proprietorship</div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Legal Status</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">0 - 40 L</div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Annual Turnover</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">09AGKPA5713C1ZT</div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">GST Number</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        In the fast-paced world of graphic design, time is currency. Our mission is to empower designers, 
                        agencies, and print shops with a vast library of technically flawless, aesthetically superior templates.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We believe in "Honest" design – files that are actually print-ready, layers that are actually organized, 
                        and licenses that are transparent and fair.
                    </p>
                    
                    <ul className="space-y-4 pt-4">
                        {[
                            "Production-ready CMYK & RGB files",
                            "Support for all major design software",
                            "Secure, instant digital delivery",
                            "Commercial usage rights included"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                    <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" 
                        alt="Design team collaborating" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>

        {/* Values Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Zap,
                        title: "Lightning Fast",
                        desc: "Instant downloads and optimized server speeds ensure you get your files immediately after purchase."
                    },
                    {
                        icon: ShieldCheck,
                        title: "Quality Assured",
                        desc: "Every template is manually vetted by senior designers for technical accuracy and print standards."
                    },
                    {
                        icon: Users,
                        title: "Community Focused",
                        desc: "We listen to our users. Our library evolves based on the real-world needs of our design community."
                    }
                ].map((feature, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6">
                            <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}