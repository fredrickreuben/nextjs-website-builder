import { getProjectById } from "@/actions/projects/actions";
import PageBuilder from "@/components/builder";
import ProjectFooter from "@/components/projects/footer";
import ProjectHeader from "@/components/projects/header";
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
    const { id } = await params;
    const result = await getProjectById(parseInt(id));

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
    const { id } = await params;
    const result = await getProjectById(parseInt(id));

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
        <div className="py-16">
            <ProjectHeader
                title={project.title}
                description={project.description}
                tags={tags}
            />
            <PageBuilder project={project} />

            <ProjectFooter />
        </div>
    );
}
