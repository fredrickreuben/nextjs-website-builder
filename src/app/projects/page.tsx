import Container from "@/components/layout/container";
import ProjectsList from "@/components/projects/list";
import ProjectsTitle from "@/components/projects/title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	// Primary metadata
	title: "Project Gallery — Example Projects",
	description:
		"Explore a curated gallery of websites and templates built with our platform. See real projects for inspiration and jumpstart your next website.",
	keywords: ["projects", "portfolio", "templates", "website builder", "examples"],
	authors: [{ name: "Your Company" }],
	alternates: {
		canonical: "https://yourdomain.com/projects",
	},
	openGraph: {
		title: "Project Gallery — Example Projects",
		description: "Explore a curated gallery of websites and templates built with our platform.",
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
		description: "Explore a curated gallery of websites and templates built with our platform.",
		images: ["https://yourdomain.com/api/og/projects.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

/**
 * @description Projects page showcasing example websites built with the platform.
 * @returns {JSX.Element} The rendered projects page.
 */
const ProjectsPage = () => {
	return (
		<Container className="py-16">
			{/* Header Section (moved) */}
			<ProjectsTitle />

			{/* Projects UI (moved) */}
			<ProjectsList />
		</Container>
	);
};


export default ProjectsPage;
