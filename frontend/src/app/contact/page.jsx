"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { Footer } from "@/components/Footer";
import { StaticPageHeader } from "@/components/StaticPageHeader";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <StaticPageHeader 
          title="Contact Us" 
          description="Have questions? We're here to help. Get in touch with our team for support or inquiries." 
        />
        
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                      <Mail className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Email Us</h3>
                      <p className="text-slate-600 dark:text-slate-400">support@honestgraphics.com</p>
                      <p className="text-sm text-slate-500 mt-1">We typically respond within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                      <Phone className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Call Us</h3>
                      <p className="text-slate-600 dark:text-slate-400">+91 123 456 7890</p>
                      <p className="text-sm text-slate-500 mt-1">Mon-Fri, 9am-6pm IST</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                      <MapPin className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Visit Our Office</h3>
                      <p className="text-slate-600 dark:text-slate-400">Honest Graphics Hub, Mumbai, India</p>
                      <p className="text-sm text-slate-500 mt-1">By appointment only.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl"
              >
                {formState === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mx-auto mb-6">
                      <Send className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. We'll get back to you soon.</p>
                    <button 
                      onClick={() => setFormState("idle")}
                      className="mt-8 text-indigo-600 font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <input 
                          required
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <input 
                          required
                          type="email"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                      <input 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-white"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                      <textarea 
                        required
                        rows={5}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-white resize-none"
                        placeholder="Your message here..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formState === "submitting" ? "Sending..." : "Send Message"}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
