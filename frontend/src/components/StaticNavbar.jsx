import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export function StaticNavbar() {
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50 transition-colors pb-2">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-500 to-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold text-lg tracking-tight drop-shadow-md">HG</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Honest Graphics</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block -mt-1 tracking-wide">& Printers</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors py-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/login" className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white rounded-full">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
