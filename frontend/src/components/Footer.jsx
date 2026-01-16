"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import api from "@/lib/api";

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" }
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" }
];

const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "License Terms", href: "/license" },
    { name: "Refund Policy", href: "/refunds" },
    { name: "FAQ", href: "/faq" }
];

const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" }
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-white font-bold text-lg tracking-tight">HG</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight transition-colors">Honest Graphics</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block -mt-1 tracking-wide transition-colors">& Printers</span>
                </div>
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm leading-relaxed transition-colors">
                Premium graphic design templates for creative professionals. 
                Instant downloads with lifetime access and commercial licenses.
              </p>
              <div className="space-y-3">
                <a href="mailto:support@honestgraphics.com" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  support@honestgraphics.com
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  +91 123 456 7890
                </a>
                <p className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors">
                  <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Mumbai, India
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors">Categories</h3>
              <ul className="space-y-3">
                {categories.slice(0, 5).map((category) => (
                  <li key={category._id}>
                    <Link href={`/products?category=${category.slug}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 py-8 transition-colors">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors">
              &copy; {currentYear} Honest Graphics & Printers. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-800 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
