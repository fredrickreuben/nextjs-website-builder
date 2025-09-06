import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ProjectItem from "@/components/projects/item";

type ProjectUI = {
	id: number;
	title: string;
	description?: string;
	image?: string;
	category?: string;
	tags?: string[];
	liveUrl?: string;
	featured?: boolean;
};

const ProjectsList: React.FC<{ projects: ProjectUI[] }> = ({ projects }) => {
	const categories = [
		"All",
		"E-Commerce",
		"Portfolio",
		"Food & Dining",
		"SaaS",
		"Blog",
		"Events",
	];

	return (
		<>
			{/* Filter Section */}
			<div className="flex flex-wrap justify-center gap-2 mb-12">
				{categories.map((category) => (
					<Button key={category} variant={category === "All" ? "default" : "outline"} size="sm" className="mb-2">
						{category}
					</Button>
				))}
			</div>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
				{projects.map((project) => (
					<ProjectItem key={project.id} project={project} />
				))}
			</div>

			{/* Load More Section */}
			<div className="text-center mb-16">
				<Button variant="outline" size="lg">
					Load More Projects
				</Button>
			</div>

			{/* CTA Section */}
			<div className="bg-blue-600 rounded-lg p-8 text-center text-white">
				<h2 className="text-3xl font-bold mb-4">Ready to Build Your Project?</h2>
				<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
					Join thousands of creators who are already building amazing websites with our platform.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild size="lg" variant="secondary">
						<Link href="/get-started">Get Started Free</Link>
					</Button>
					<Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
						<Link href="/templates">Browse Templates</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default ProjectsList;
