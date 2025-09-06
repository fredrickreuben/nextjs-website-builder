import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

/**
 * @description A modern footer component with links and company information.
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer: React.FC = () => {
    return (
        <footer className={cn("bg-gray-900 text-white")}>
            <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12")}>
                <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-8")}>
                    {/* Company Info */}
                    <div className={cn("col-span-1 md:col-span-2")}>
                        <Link href="/" className={cn("text-lg font-semibold mb-4 block hover:text-gray-300 transition-colors duration-200")}>
                            Website Builder
                        </Link>
                        <p className={cn("text-gray-400 mb-4 max-w-md")}>
                            Build beautiful, responsive websites with our intuitive drag-and-drop builder. No coding required.
                        </p>
                        <div className={cn("flex space-x-4")}>
                            <a href="#" className={cn("text-gray-400 hover:text-white transition-colors duration-200")} aria-label="Facebook">
                                <svg className={cn("h-6 w-6")} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className={cn("text-gray-400 hover:text-white transition-colors duration-200")} aria-label="Twitter">
                                <svg className={cn("h-6 w-6")} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className={cn("text-gray-400 hover:text-white transition-colors duration-200")} aria-label="LinkedIn">
                                <svg className={cn("h-6 w-6")} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={cn("text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4")}>Quick Links</h4>
                        <ul className={cn("space-y-2")}>
                            <li>
                                <Link href="/" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/templates" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Templates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className={cn("text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4")}>Support</h4>
                        <ul className={cn("space-y-2")}>
                            <li>
                                <Link href="/help" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className={cn("text-gray-400 hover:text-white transition-colors duration-200")}>
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={cn("mt-8 pt-8 border-t border-gray-800")}>
                    <div className={cn("flex flex-col md:flex-row justify-between items-center")}>
                        <p className={cn("text-gray-400 text-sm")}>© 2024 Website Builder. All rights reserved.</p>
                        <div className={cn("flex space-x-6 mt-4 md:mt-0")}>
                            <Link href="/terms" className={cn("text-gray-400 hover:text-white text-sm transition-colors duration-200")}>
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className={cn("text-gray-400 hover:text-white text-sm transition-colors duration-200")}>
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
