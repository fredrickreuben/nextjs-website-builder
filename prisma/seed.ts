import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

type SeedProject = {
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    liveUrl?: string;
    userId: number;
};

export async function run(): Promise<any[]> {
    const projectsData: SeedProject[] = [
        { title: "E-Commerce Store", description: "Online store with payments", category: "E-Commerce", tags: ["React", "E-commerce"], liveUrl: "#", userId: 1 },
        { title: "Portfolio Website", description: "Personal portfolio", category: "Portfolio", tags: ["Portfolio", "Minimal"], liveUrl: "#", userId: 1 },
        { title: "Restaurant Website", description: "Menu & reservations", category: "Food & Dining", tags: ["Restaurant"], liveUrl: "#", userId: 1 },
        { title: "SaaS Landing Page", description: "Conversion focused landing", category: "SaaS", tags: ["SaaS"], liveUrl: "#", userId: 1 },
        { title: "Blog Platform", description: "CMS for bloggers", category: "Blog", tags: ["Blog", "CMS"], liveUrl: "#", userId: 1 },
        { title: "Event Website", description: "Tickets & schedule", category: "Events", tags: ["Events"], liveUrl: "#", userId: 1 },
        { title: "Photography Portfolio", description: "Showcase photos", category: "Portfolio", tags: ["Photos"], liveUrl: "#", userId: 1 },
        { title: "Agency Landing", description: "Agency services", category: "SaaS", tags: ["Agency"], liveUrl: "#", userId: 1 },
        { title: "Documentation Site", description: "Product docs", category: "Docs", tags: ["Docs"], liveUrl: "#", userId: 1 },
        { title: "Marketing Site", description: "Marketing pages", category: "Marketing", tags: ["Marketing"], liveUrl: "#", userId: 1 },
        { title: "Community Portal", description: "Forums & members", category: "Community", tags: ["Community"], liveUrl: "#", userId: 1 },
        { title: "Learning Platform", description: "Courses & lessons", category: "Education", tags: ["Education"], liveUrl: "#", userId: 1 },
    ];

    // Use create (not createMany) so relations can be added later
    const created: any[] = [];
    for (const p of projectsData) {
        const project = await prisma.project.create({
            data: {
                title: p.title,
                userId: p.userId,
                // Note: other fields like createdAt/updatedAt are handled by Prisma/DB defaults
            },
        });
        created.push(project);
    }

    // Return exactly 10 projects (trim if more were created)
    return created.slice(0, 10);
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
