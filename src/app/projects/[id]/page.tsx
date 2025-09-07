import { getProjectById } from "@/actions/projects/actions";
import SectionButton from "@/components/builder/SectionButton";
import Container from "@/components/layout/container";
import type { Metadata } from "next";
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
            <SectionButton />

            {/* Project Content */}
            <div className="mt-8">
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {project.description}
                    </p>
                )}

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}
