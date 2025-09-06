import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

type SeedProject = {
    title: string;
    description?: string | null;
    category?: string | null;
    tags?: string | null;
    liveUrl?: string | null;
    featured?: boolean;
    userId: number;
};

export async function run(): Promise<any[]> {
    const projectsData: SeedProject[] = [
        {
            title: "E-Commerce Store",
            description: "Online store with product catalog, cart and payment integration.",
            category: "E-Commerce",
            tags: "react,ecommerce,payments",
            liveUrl: "https://example-store.local",
            featured: true,
            userId: 1,
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio showcasing work and contact info.",
            category: "Portfolio",
            tags: "portfolio,creative,minimal",
            liveUrl: "https://example-portfolio.local",
            featured: true,
            userId: 1,
        },
        {
            title: "Restaurant Website",
            description: "Menu, reservations and location details for a restaurant.",
            category: "Food & Dining",
            tags: "restaurant,menu,reservations",
            liveUrl: null,
            featured: false,
            userId: 1,
        },
        {
            title: "SaaS Landing Page",
            description: "Conversion-focused landing page for a SaaS product.",
            category: "SaaS",
            tags: "saas,landing,conversion",
            liveUrl: "https://example-saas.local",
            featured: false,
            userId: 1,
        },
        {
            title: "Blog Platform",
            description: "A blogging platform with rich text editing and SEO features.",
            category: "Blog",
            tags: "blog,cms,seo",
            liveUrl: null,
            featured: false,
            userId: 1,
        },
        {
            title: "Event Website",
            description: "Event details, schedule and ticketing integration.",
            category: "Events",
            tags: "events,tickets,schedule",
            liveUrl: "https://example-events.local",
            featured: false,
            userId: 1,
        },
        {
            title: "Photography Portfolio",
            description: "High-resolution gallery and contact for photography services.",
            category: "Portfolio",
            tags: "photography,gallery,portfolio",
            liveUrl: null,
            featured: false,
            userId: 1,
        },
        {
            title: "Documentation Site",
            description: "Product documentation with search and versioning.",
            category: "Docs",
            tags: "docs,documentation,search",
            liveUrl: "https://example-docs.local",
            featured: false,
            userId: 1,
        },
        {
            title: "Marketing Site",
            description: "Marketing pages and lead capture forms for campaigns.",
            category: "Marketing",
            tags: "marketing,lead-gen,landing",
            liveUrl: null,
            featured: false,
            userId: 1,
        },
        {
            title: "Learning Platform",
            description: "Courses, lessons and user progress tracking.",
            category: "Education",
            tags: "learning,courses,education",
            liveUrl: "https://example-learning.local",
            featured: false,
            userId: 1,
        },
    ];

    // Use create (not createMany) so relations can be added later and types match
    const created: any[] = [];
    for (const p of projectsData) {
        const project = await prisma.project.create({
            data: {
                title: p.title,
                description: p.description ?? undefined,
                category: p.category ?? undefined,
                tags: p.tags,
                liveUrl: p.liveUrl ?? undefined,
                featured: p.featured ?? false,
                userId: p.userId,
            },
        });
        created.push(project);
    }

    // Return the created projects (exactly 10)
    return created;
}

// Call run inside an async IIFE to handle errors and ensure disconnect
(async () => {
    try {
        const projects = await run();
        console.log(`Seed created ${projects.length} projects.`);
    } catch (err) {
        console.error("Seed failed:", err);
        await prisma.$disconnect();
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();
