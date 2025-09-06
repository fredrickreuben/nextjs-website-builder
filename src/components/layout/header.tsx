import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

/**
 * @description A modern header component with navigation and branding.
 * @returns {JSX.Element} The rendered header component.
 */
const Header: React.FC = () => {
    return (
        <header className={cn("bg-white shadow-sm border-b border-gray-200")}>
            <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
                <div className={cn("flex justify-between items-center h-16")}>
                    {/* Logo/Brand */}
                    <div className={cn("flex-shrink-0")}>
                        <Link href="/" className={cn("text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200")}>
                            Website Builder
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className={cn("hidden md:flex space-x-8")}>
                        <Link
                            href="/"
                            className={cn("text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200")}
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className={cn("text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200")}
                        >
                            Features
                        </Link>
                        <Link
                            href="/about"
                            className={cn("text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200")}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={cn("text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200")}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className={cn("hidden md:flex")}>
                        <Button asChild>
                            <Link href="/get-started">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className={cn("md:hidden")}>
                        <button
                            type="button"
                            className={cn("text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2")}
                            aria-label="Open menu"
                        >
                            <svg className={cn("h-6 w-6")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
