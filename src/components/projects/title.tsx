import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProjectsTitle: React.FC = () => {
    // Header only — kept minimal so page/container controls layout
    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Project Gallery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                Explore stunning websites created with our platform. Get
                inspired by real projects and see what's possible.
            </p>
            <Button asChild size="lg">
                <Link href="/get-started">Start Your Project</Link>
            </Button>
        </div>
    );
};

export default ProjectsTitle;
