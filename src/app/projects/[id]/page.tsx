import { getProjectById } from "@/actions/projects/actions";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const result = await getProjectById(parseInt(params.id));

    if (!result.success || !result.data) {
        return {
            title: "Project Not Found",
        };
    }

    const project = result.data;

    return {
        title: `${project.title} - Project Details`,
        description: project.description || `View details for ${project.title}`,
        openGraph: {
            title: project.title,
            description:
                project.description || `View details for ${project.title}`,
            type: "website",
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const result = await getProjectById(parseInt(params.id));

    if (!result.success || !result.data) {
        notFound();
    }

    const project = result.data;

    // Parse tags from CSV string
    const tags = project.tags
        ? project.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
        : [];

    return (
        <Container className="py-16">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/projects">
                        <Button variant="outline">← Back to Projects</Button>
                    </Link>
                </div>

                {/* Project Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold">{project.title}</h1>
                        {project.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>

                    {project.category && (
                        <p className="text-lg text-gray-600 mb-4">
                            {project.category}
                        </p>
                    )}

                    {project.liveUrl && (
                        <div className="mb-6">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View Live Project →
                            </a>
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {project.description ? (
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {project.description}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 italic">
                                        No description provided for this
                                        project.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Tags */}
                        {tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Project Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Created
                                    </dt>
                                    <dd className="text-sm text-gray-900">
                                        {new Date(
                                            project.createdAt
                                        ).toLocaleDateString()}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Last Updated
                                    </dt>
                                    <dd className="text-sm text-gray-900">
                                        {new Date(
                                            project.updatedAt
                                        ).toLocaleDateString()}
                                    </dd>
                                </div>
                                {project.category && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Category
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                            {project.category}
                                        </dd>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    );
}
