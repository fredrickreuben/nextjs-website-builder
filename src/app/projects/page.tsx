import { getProjects } from "@/actions/projects/actions";
import Container from "@/components/layout/container";
import ProjectsList from "@/components/projects/list";
import ProjectsTitle from "@/components/projects/title";
import type { Metadata } from "next";

export const metadata: Metadata = {
    // Primary metadata
    title: "Project Gallery — Example Projects",
    description:
        "Explore a curated gallery of websites and templates built with our platform. See real projects for inspiration and jumpstart your next website.",
    keywords: [
        "projects",
        "portfolio",
        "templates",
        "website builder",
        "examples",
    ],
    authors: [{ name: "Your Company" }],
    alternates: {
        canonical: "https://yourdomain.com/projects",
    },
    openGraph: {
        title: "Project Gallery — Example Projects",
        description:
            "Explore a curated gallery of websites and templates built with our platform.",
        url: "https://yourdomain.com/projects",
        siteName: "Your Site Name",
        images: [
            {
                url: "https://yourdomain.com/api/og/projects.png",
                width: 1200,
                height: 630,
                alt: "Project Gallery",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Project Gallery — Example Projects",
        description:
            "Explore a curated gallery of websites and templates built with our platform.",
        images: ["https://yourdomain.com/api/og/projects.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * Projects page showcasing example websites built with the platform.
 */
const ProjectsPage = async () => {
    // Fetch projects using server action
    const result = await getProjects({
        userId: 1,
        limit: 12,
    });

    // Handle error case
    if (!result.success || !result.data) {
        return (
            <Container className="py-16">
                <ProjectsTitle />
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">Failed to load projects</p>
                    <p className="text-gray-600">
                        {result.error || "No data available"}
                    </p>
                </div>
            </Container>
        );
    }

    // Map DB rows to the UI shape (provide defaults for missing fields)
    const projects = result.data.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description ?? "",
        category: p.category ?? "Uncategorized",
        tags:
            typeof p.tags === "string" && p.tags.length
                ? p.tags
                      .split(",")
                      .map((t: string) => t.trim())
                      .filter(Boolean)
                : [],
        liveUrl: p.liveUrl ?? "#",
        featured: p.featured ?? false,
    }));

    return (
        <Container className="py-16">
            {/* Header Section */}
            <ProjectsTitle />

            {/* Projects UI */}
            <ProjectsList projects={projects} />
        </Container>
    );
};

export default ProjectsPage;
