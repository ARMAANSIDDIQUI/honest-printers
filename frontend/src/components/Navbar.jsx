"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogIn, LayoutDashboard, Download, Bell, BellOff } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSelector } from "react-redux";
import api from "@/lib/api";
import { useInstallPwa } from "@/context/InstallPwaContext";
import { useNotification } from "@/context/NotificationContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const cartItemCount = useSelector((state) => state.cart.totalItems);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { install, isInstallable } = useInstallPwa();
  const { permission, requestPermission } = useNotification();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data || []);
      } catch (error) {
        console.warn("Failed to fetch categories (using empty list):", error.message);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50 transition-colors pb-2">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-500 to-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 animate-gradient-xy">
                <span className="text-white font-bold text-lg tracking-tight drop-shadow-md">HG</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight transition-colors">Honest Graphics</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block -mt-1 tracking-wide transition-colors">& Printers</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setProductsDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setProductsDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors py-2"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 mt-1"
                        >
                          {categories.slice(0, 6).map((category) => (
                            <Link
                              key={category._id}
                              href={`/products?category=${category.slug}`}
                              className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                          <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                            <Link
                              href="/products"
                              className="block px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              View All Products
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={requestPermission}
                className={`p-2.5 rounded-full transition-colors ${permission === 'granted'
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                aria-label="Notifications"
                title={permission === 'granted' ? "Notifications Enabled" : "Enable Notifications"}
              >
                {permission === 'granted' ? <Bell className="w-5 h-5 fill-current" /> : <BellOff className="w-5 h-5" />}
              </button>

              {isInstallable && (
                <button
                  onClick={install}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <Download className="w-3 h-3" />
                  Install App
                </button>
              )}
              <ThemeToggle />

              <button
                className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/cart"
                className="relative p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden sm:flex p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  title="Admin Dashboard"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
              )}

              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="hidden sm:flex p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  aria-label="Sign In"
                >
                  <LogIn className="w-5 h-5" />
                </Link>
              )}

              <button
                className="lg:hidden p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
              >
                <div className="py-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 px-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                    {isAuthenticated && user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Admin Dashboard
                      </Link>
                    )}

                    {isAuthenticated ? (
                      <Link
                        href="/account"
                        className="flex items-center gap-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        My Account
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      {/* Spacer to prevent content overlap */}
      <div className="h-20 lg:h-24" />
    </>
  );
}