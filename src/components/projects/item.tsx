import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Project = {
    id: number;
    title: string;
    description: string;
    image?: string;
    category: string;
    tags: string[];
    liveUrl: string;
    featured?: boolean;
};

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div
            className={cn(
                "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                project.featured && "md:col-span-2 lg:col-span-1"
            )}
        >
            {/* Project Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 mx-auto">
                            <svg
                                className="w-8 h-8 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500">Project Preview</p>
                    </div>
                </div>
                {project.featured && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                        <Link href={project.liveUrl}>View Live</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/projects/${project.id}`}>Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;
