import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
/**
 * @description Home page component showcasing the website builder.
 * @returns {JSX.Element} The rendered home page.
 */
const Home = () => {
    return (
        <Container padding="md" maxWidth="7xl">
            <div className="text-center">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Build Beautiful Websites
                        <span className="block text-blue-600">Without Code</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Create stunning, responsive websites with our intuitive drag-and-drop builder. No coding skills required - just drag, drop,
                        and publish.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/get-started">Get Started Free</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/features">View Features</Link>
                        </Button>
                    </div>
                </div>

                {/* Features Preview */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop</h3>
                        <p className="text-gray-600">Easily build pages by dragging elements where you want them.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Ready</h3>
                        <p className="text-gray-600">All websites are automatically optimized for mobile devices.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Secure</h3>
                        <p className="text-gray-600">Built with performance and security in mind from the ground up.</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;
