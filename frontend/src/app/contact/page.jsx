"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours."
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Have questions about a product, licensing, or need support? We're here to help.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Information */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Email Us</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-2">For general inquiries and support.</p>
                                <a href="mailto:honestgraphicsandprinters@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">honestgraphicsandprinters@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Call Us</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-2">Minhaj Aslam (Manager)</p>
                                <a href="tel:9412247786" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">+91 9412247786</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Reach Us</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                    Honest Printers<br />
                                    Ghass Mandi, Bazar Ganj, Opp Bank Of Baroda,<br />
                                    Moradabad-244001, Uttar Pradesh, India
                                </p>
                                <a href="https://maps.app.goo.gl/eCo5G3o4pyZhEAmA8" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 mt-2 block hover:underline">Get Directions</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.9517299544336!2d78.77053597550844!3d28.840297075551835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afbc3ab2acc8d%3A0xf2588bfcecfb516!2sHonest%20Printers!5e0!3m2!1sen!2sin!4v1768570630745!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-600/20">
                    <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                    <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
                        Check our FAQ section for quick answers to common questions about licensing, downloads, and payments.
                    </p>
                    <Button variant="secondary" className="w-full">
                        Visit FAQ Center
                    </Button>
                </div>
            </div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
            >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" required />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px]" required />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                    </Button>
                </form>
            </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}