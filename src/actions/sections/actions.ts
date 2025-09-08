"use server";

import { SectionType, Text } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

// Validation schemas
const createSectionSchema = z.object({
    projectId: z.number().int().positive(),
    type: z.enum(["Text", "Image", "Video", "TextImage", "Layout"]),
    position: z.number().int().min(0).optional(),
});

const updateSectionSchema = z.object({
    id: z.number().int().positive(),
    type: z.enum(["Text", "Image", "Video", "TextImage", "Layout"]).optional(),
    position: z.number().int().min(0).optional(),
});

const deleteSectionSchema = z.object({
    id: z.number().int().positive(),
});

const getSectionSchema = z.object({
    id: z.number().int().positive(),
});

const getSectionsByProjectSchema = z.object({
    projectId: z.number().int().positive(),
});

const updateTextContentSchema = z.object({
    sectionId: z.number().int().positive(),
    content: z.string(),
});

/**
 * Create a new section
 */
export const createSection = async (input: z.infer<typeof createSectionSchema>) => {
    try {
        const parsed = createSectionSchema.parse(input);

        // Get the next position if not provided
        let position = parsed.position;
        if (position === undefined) {
            const lastSection = await prisma.section.findFirst({
                where: { projectId: parsed.projectId },
                orderBy: { position: 'desc' },
            });
            position = lastSection ? lastSection.position + 1 : 0;
        }

        const section = await prisma.section.create({
            data: {
                projectId: parsed.projectId,
                type: parsed.type as SectionType,
                position: position,
            },
            include: {
                text: true,
            },
        });

        // Create default text content for Text sections
        if (parsed.type === "Text") {
            await prisma.text.create({
                data: {
                    sectionId: section.id,
                    // Uses the default content from schema
                },
            });
        }

        revalidatePath(`/projects/${parsed.projectId}`);
        return {
            success: true,
            data: section,
            message: "Section created successfully!"
        };
    } catch (err) {
        console.error("createSection error:", err);
        return {
            success: false,
            error: "Failed to create section. Please try again."
        };
    }
};

/**
 * Update a section
 */
export const updateSection = async (input: z.infer<typeof updateSectionSchema>) => {
    try {
        const parsed = updateSectionSchema.parse(input);
        const { id, ...updateData } = parsed;

        const section = await prisma.section.update({
            where: { id },
            data: updateData,
            include: {
                text: true,
                project: true,
            },
        });

        revalidatePath(`/projects/${section.project.id}`);
        return {
            success: true,
            data: section,
            message: "Section updated successfully!"
        };
    } catch (err) {
        console.error("updateSection error:", err);
        return {
            success: false,
            error: "Failed to update section. Please try again."
        };
    }
};

/**
 * Delete a section
 */
export const deleteSection = async (input: z.infer<typeof deleteSectionSchema>) => {
    try {
        const parsed = deleteSectionSchema.parse(input);

        // Get section with project info before deletion
        const sectionToDelete = await prisma.section.findUnique({
            where: { id: parsed.id },
            include: { project: true },
        });

        if (!sectionToDelete) {
            return {
                success: false,
                error: "Section not found."
            };
        }

        const section = await prisma.section.delete({
            where: { id: parsed.id },
        });

        revalidatePath(`/projects/${sectionToDelete.project.id}`);
        return {
            success: true,
            data: section,
            message: "Section deleted successfully!"
        };
    } catch (err) {
        console.error("deleteSection error:", err);
        return {
            success: false,
            error: "Failed to delete section. Please try again."
        };
    }
};

/**
 * Get a single section by ID
 */
export const getSectionById = async (input: z.infer<typeof getSectionSchema>) => {
    try {
        const parsed = getSectionSchema.parse(input);

        const section = await prisma.section.findUnique({
            where: { id: parsed.id },
            include: {
                text: true,
                project: true,
            },
        });

        if (!section) {
            return {
                success: false,
                error: "Section not found."
            };
        }

        return {
            success: true,
            data: section
        };
    } catch (err) {
        console.error("getSectionById error:", err);
        return {
            success: false,
            error: "Failed to load section."
        };
    }
};

/**
 * Get all sections for a project
 */
export const getSectionsByProject = async (input: z.infer<typeof getSectionsByProjectSchema>) => {
    try {
        const parsed = getSectionsByProjectSchema.parse(input);

        const sections = await prisma.section.findMany({
            where: { projectId: parsed.projectId },
            include: {
                text: true,
            },
            orderBy: { position: 'asc' },
        });

        return {
            success: true,
            data: sections
        };
    } catch (err) {
        console.error("getSectionsByProject error:", err);
        return {
            success: false,
            error: "Failed to load sections."
        };
    }
};

/**
 * Update text content for a section
 */
export const updateTextContent = async (input: z.infer<typeof updateTextContentSchema>) => {
    try {
        const parsed = updateTextContentSchema.parse(input);

        // Check if text record exists
        const existingText = await prisma.text.findUnique({
            where: { sectionId: parsed.sectionId },
            include: { section: { include: { project: true } } },
        });

        let text;
        if (existingText) {
            // Update existing text
            text = await prisma.text.update({
                where: { sectionId: parsed.sectionId },
                data: { content: parsed.content },
                include: { section: { include: { project: true } } },
            });
        } else {
            // Create new text record
            text = await prisma.text.create({
                data: {
                    sectionId: parsed.sectionId,
                    content: parsed.content,
                },
                include: { section: { include: { project: true } } },
            });
        }

        revalidatePath(`/projects/${text.section.project.id}`);
        return {
            success: true,
            data: text,
            message: "Text content updated successfully!"
        };
    } catch (err) {
        console.error("updateTextContent error:", err);
        return {
            success: false,
            error: "Failed to update text content. Please try again."
        };
    }
};

/**
 * Reorder sections within a project
 */
export const reorderSections = async (input: { projectId: number; sectionIds: number[] }) => {
    try {
        const { projectId, sectionIds } = input;

        // Update each section's position based on its position in the array
        const updatePromises = sectionIds.map((sectionId, position) =>
            prisma.section.update({
                where: { id: sectionId },
                data: { position },
            })
        );

        await Promise.all(updatePromises);

        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            message: "Sections reordered successfully!"
        };
    } catch (err) {
        console.error("reorderSections error:", err);
        return {
            success: false,
            error: "Failed to reorder sections. Please try again."
        };
    }
};
/*
*
 * Create section and reorder existing sections to maintain consistency
 */
export const createSectionWithReorder = async (input: {
    projectId: number;
    type: "Text" | "Image" | "Video" | "TextImage" | "Layout";
    insertAtPosition: number;
}) => {
    try {
        const { projectId, type, insertAtPosition } = input;

        // Start a transaction to ensure consistency
        const result = await prisma.$transaction(async (tx) => {
            // Get all existing sections for this project
            const existingSections = await tx.section.findMany({
                where: { projectId },
                orderBy: { position: 'asc' },
            });

            // Update positions of sections that come after the insert position
            const sectionsToUpdate = existingSections.filter(
                section => section.position >= insertAtPosition
            );

            // Increment position of existing sections
            for (const section of sectionsToUpdate) {
                await tx.section.update({
                    where: { id: section.id },
                    data: { position: section.position + 1 },
                });
            }

            // Create the new section at the specified position
            const newSection = await tx.section.create({
                data: {
                    projectId,
                    type: type as SectionType,
                    position: insertAtPosition,
                },
                include: {
                    text: true,
                },
            });

            // Create default text content for Text sections
            if (type === "Text") {
                await tx.text.create({
                    data: {
                        sectionId: newSection.id,
                        // Uses the default content from schema
                    },
                });
            }

            return newSection;
        });

        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            data: result,
            message: "Section created successfully!"
        };
    } catch (err) {
        console.error("createSectionWithReorder error:", err);
        return {
            success: false,
            error: "Failed to create section. Please try again."
        };
    }
};

/**
 * Delete section and reorder remaining sections to maintain consistency
 */
export const deleteSectionWithReorder = async (input: { sectionId: number }) => {
    try {
        const { sectionId } = input;

        // Start a transaction to ensure consistency
        const result = await prisma.$transaction(async (tx) => {
            // Get the section to delete with project info
            const sectionToDelete = await tx.section.findUnique({
                where: { id: sectionId },
                include: { project: true },
            });

            if (!sectionToDelete) {
                throw new Error("Section not found");
            }

            const { projectId, position: deletedPosition } = sectionToDelete;

            // Delete the section (cascade will handle text deletion)
            const deletedSection = await tx.section.delete({
                where: { id: sectionId },
            });

            // Get all remaining sections for this project that come after the deleted position
            const sectionsToUpdate = await tx.section.findMany({
                where: {
                    projectId,
                    position: { gt: deletedPosition }
                },
                orderBy: { position: 'asc' },
            });

            // Decrement position of sections that came after the deleted one
            for (const section of sectionsToUpdate) {
                await tx.section.update({
                    where: { id: section.id },
                    data: { position: section.position - 1 },
                });
            }

            return { deletedSection, projectId };
        });

        revalidatePath(`/projects/${result.projectId}`);
        return {
            success: true,
            data: result.deletedSection,
            message: "Section deleted successfully!"
        };
    } catch (err) {
        console.error("deleteSectionWithReorder error:", err);
        return {
            success: false,
            error: "Failed to delete section. Please try again."
        };
    }
};

/**
 * Bulk update sections positions to ensure consistency
 */
export const normalizePositions = async (input: { projectId: number }) => {
    try {
        const { projectId } = input;

        // Start a transaction to ensure consistency
        await prisma.$transaction(async (tx) => {
            // Get all sections for this project ordered by current position
            const sections = await tx.section.findMany({
                where: { projectId },
                orderBy: { position: 'asc' },
            });

            // Update each section to have sequential positions (0, 1, 2, 3...)
            for (let i = 0; i < sections.length; i++) {
                await tx.section.update({
                    where: { id: sections[i].id },
                    data: { position: i },
                });
            }
        });

        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            message: "Section positions normalized successfully!"
        };
    } catch (err) {
        console.error("normalizePositions error:", err);
        return {
            success: false,
            error: "Failed to normalize positions. Please try again."
        };
    }
};/**
 * C
reate or update multiple sections in one operation
 * Sections with IDs will be updated, sections without IDs will be created
 */
export const createOrUpdateSections = async (input: {
    projectId: number;
    sections: Array<{
        id?: number; // If provided, update existing section
        type: "Text" | "Image" | "Video" | "TextImage" | "Layout";
        position: number;
        text?: Text // For text sections
    }>;
}) => {
    try {
        const { projectId, sections } = input;

        // Start a transaction to ensure consistency
        const result = await prisma.$transaction(async (tx) => {
            const results = {
                created: [] as any[],
                updated: [] as any[],
                deleted: [] as any[],
            };

            // Get all existing sections for this project
            const existingSections = await tx.section.findMany({
                where: { projectId },
                include: { text: true },
            });

            // Determine which sections to delete (existing sections not in the input)
            const inputSectionIds = sections
                .filter(s => s.id)
                .map(s => s.id!);

            const sectionsToDelete = existingSections.filter(
                existing => !inputSectionIds.includes(existing.id)
            );

            // Delete sections that are no longer needed
            for (const sectionToDelete of sectionsToDelete) {
                const deleted = await tx.section.delete({
                    where: { id: sectionToDelete.id },
                });
                results.deleted.push(deleted);
            }

            // Group sections by ID for processing
            const sectionsToUpdate = sections.filter(s => s.id !== undefined);
            const sectionsToCreate = sections.filter(s => s.id === undefined);

            // Process updates first
            for (const sectionData of sectionsToUpdate) {
                const updatedSection = await tx.section.update({
                    where: { id: sectionData.id! },
                    data: {
                        type: sectionData.type as SectionType,
                        position: sectionData.position,
                    },
                    include: { text: true },
                });

                // Always handle text for Text sections to ensure it exists
                if (sectionData.type === "Text") {
                    const textContent = sectionData.text?.content ?? "<h1>Your Heading</h1><p>Enter your text here...</p>";
                    if (updatedSection.text) {
                        // Update existing text
                        await tx.text.update({
                            where: { sectionId: sectionData.id! },
                            data: { content: textContent },
                        });
                    } else {
                        // Create new text record if it doesn't exist
                        await tx.text.create({
                            data: {
                                sectionId: sectionData.id!,
                                content: textContent,
                            },
                        });
                    }
                }

                results.updated.push(updatedSection);
            }

            // Process creations
            for (const sectionData of sectionsToCreate) {
                const newSection = await tx.section.create({
                    data: {
                        projectId,
                        type: sectionData.type as SectionType,
                        position: sectionData.position,
                    },
                    include: { text: true },
                });

                // Always create text content for Text sections
                if (sectionData.type === "Text") {
                    await tx.text.create({
                        data: {
                            sectionId: newSection.id,
                            content: sectionData.text?.content ?? "<h1>Your Heading</h1><p>Enter your text here...</p>",
                        },
                    });
                }

                results.created.push(newSection);
            }

            // Normalize positions after all operations to prevent duplicates
            const allSections = await tx.section.findMany({
                where: { projectId },
                include: { text: true },
                orderBy: { position: 'asc' },
            });

            // Update all section positions to be sequential and unique
            const normalizePromises = allSections.map((section, index) =>
                tx.section.update({
                    where: { id: section.id },
                    data: { position: index },
                    include: { text: true },
                })
            );

            // Wait for position normalization to complete
            await Promise.all(normalizePromises);

            // Return normalized results
            return {
                ...results,
                sections: allSections,
            };
        });

        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            data: result,
            message: `Successfully processed sections: ${result.created.length} created, ${result.updated.length} updated, ${result.deleted.length} deleted`
        };
    } catch (err) {
        console.error("createOrUpdateSections error:", err);
        return {
            success: false,
            error: "Failed to process sections. Please try again."
        };
    }
};

/**
 * Upsert a single section (create if doesn't exist, update if it does)
 */
export const upsertSection = async (input: {
    id?: number; // If provided, update existing section
    projectId: number;
    type: "Text" | "Image" | "Video" | "TextImage" | "Layout";
    position: number;
    textContent?: string;
}) => {
    try {
        const { id, projectId, type, position, textContent } = input;

        const result = await prisma.$transaction(async (tx) => {
            let section;

            if (id) {
                // Update existing section
                section = await tx.section.update({
                    where: { id },
                    data: {
                        type: type as SectionType,
                        position,
                    },
                    include: { text: true },
                });

                // Handle text content for Text sections
                if (type === "Text" && textContent !== undefined) {
                    if (section.text) {
                        // Update existing text
                        await tx.text.update({
                            where: { sectionId: id },
                            data: { content: textContent },
                        });
                    } else {
                        // Create new text record
                        await tx.text.create({
                            data: {
                                sectionId: id,
                                content: textContent,
                            },
                        });
                    }
                }
            } else {
                // Create new section
                section = await tx.section.create({
                    data: {
                        projectId,
                        type: type as SectionType,
                        position,
                    },
                    include: { text: true },
                });

                // Create text content for Text sections
                if (type === "Text") {
                    await tx.text.create({
                        data: {
                            sectionId: section.id,
                            content: textContent || "<h1>Your Heading</h1><p>Enter your text here...</p>",
                        },
                    });
                }
            }

            return section;
        });

        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            data: result,
            message: id ? "Section updated successfully!" : "Section created successfully!"
        };
    } catch (err) {
        console.error("upsertSection error:", err);
        return {
            success: false,
            error: "Failed to save section. Please try again."
        };
    }
};
