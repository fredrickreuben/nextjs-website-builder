"use client";

import { deleteProject } from "@/actions/projects/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Project = {
    id: number;
    title: string;
    description?: string;
    image?: string;
    category?: string;
    tags?: string[];
    liveUrl?: string;
    featured?: boolean;
};

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const description = project.description ?? "";
    const category = project.category ?? "Uncategorized";
    const tags = project.tags ?? [];
    const liveUrl = project.liveUrl ?? "#";

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteProject({ id: project.id });

            if (result.success) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to delete project");
            }
        } catch (err) {
            console.error("Delete project error:", err);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={cn(
                "group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
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

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                    {/* Edit Button */}
                    <Button
                        asChild
                        size="sm"
                        className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Link
                            href={`/projects/${project.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // For now, redirect to project detail page
                                window.location.href = `/projects/${project.id}`;
                            }}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </Link>
                    </Button>

                    {/* Delete Button */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Delete Project
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {project.title}"? This action cannot be
                                    undone and will permanently remove the
                                    project from your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 mr-2 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        "Delete Project"
                                    )}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {category}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {tags.map((tag) => (
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
                        <Link href={liveUrl}>View Live</Link>
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
