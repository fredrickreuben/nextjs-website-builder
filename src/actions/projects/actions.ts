"use server";

import prisma from "@/lib/prisma";
import {
    ProjectCreateInput,
    projectCreateSchema,
    ProjectUpdateInput,
    projectUpdateSchema
} from "@/schemas/projects";
import { revalidatePath } from "next/cache";
import * as z from "zod";

// helper to normalize tags input (string CSV or array) into CSV string | undefined
const normalizeTagsToCsv = (val: unknown): string | undefined => {
    if (typeof val === "string") {
        const trimmed = val.trim();
        return trimmed === "" ? undefined : trimmed;
    }
    if (Array.isArray(val)) {
        const arr = val.map((v) => String(v).trim()).filter(Boolean);
        return arr.length ? arr.join(",") : undefined;
    }
    return undefined;
};

const idSchema = z.object({
    id: z.number().int(),
});

/**
 * Create a project (server action).
 */
export const createProject = async (input: ProjectCreateInput) => {
    try {
        const parsed = projectCreateSchema.parse(input);
        const created = await prisma.project.create({
            data: {
                title: parsed.title,
                description: parsed.description ?? undefined,
                category: parsed.category ?? undefined,
                // normalize tags input
                tags: normalizeTagsToCsv(parsed.tags) ?? undefined,
                liveUrl: parsed.liveUrl ?? undefined,
                featured: parsed.featured ?? false,
                userId: parsed.userId,
            },
        });
        revalidatePath("/projects");
        return { success: true, data: created, message: "Project created successfully!" };
    } catch (err) {
        console.error("createProject error:", err);
        return { success: false, error: "Failed to create project. Please try again." };
    }
};

/**
 * Update a project (server action).
 * Provide id and any updatable fields.
 */
export const updateProject = async (input: ProjectUpdateInput) => {
    try {
        const parsed = projectUpdateSchema.parse(input);
        const { id, ...rest } = parsed;
        const updated = await prisma.project.update({
            where: { id },
            data: {
                ...(rest.title !== undefined ? { title: rest.title } : {}),
                ...(rest.description !== undefined ? { description: rest.description } : {}),
                ...(rest.category !== undefined ? { category: rest.category } : {}),
                ...(rest.tags !== undefined ? { tags: normalizeTagsToCsv(rest.tags) } : {}),
                ...(rest.liveUrl !== undefined ? { liveUrl: rest.liveUrl } : {}),
                ...(rest.featured !== undefined ? { featured: rest.featured } : {}),
            },
        });
        revalidatePath("/projects");
        return { success: true, data: updated, message: "Project updated successfully!" };
    } catch (err) {
        console.error("updateProject error:", err);
        return { success: false, error: "Failed to update project. Please try again." };
    }
};

/**
 * Delete a project by id (server action).
 */
export const deleteProject = async (input: { id: number }) => {
    try {
        const { id } = idSchema.parse(input);
        const deleted = await prisma.project.delete({
            where: { id },
        });
        revalidatePath("/projects");
        return { success: true, data: deleted, message: "Project deleted successfully!" };
    } catch (err) {
        console.error("deleteProject error:", err);
        return { success: false, error: "Failed to delete project. Please try again." };
    }
};

/**
 * Get all projects (server action).
 * Optionally filter by userId.
 */
export const getProjects = async (options?: {
    userId?: number;
    featured?: boolean;
    limit?: number;
    offset?: number;
}) => {
    
    try {
        const where: any = {};

        if (options?.userId) {
            where.userId = options.userId;
        }

        if (options?.featured !== undefined) {
            where.featured = options.featured;
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            ...(options?.limit && { take: options.limit }),
            ...(options?.offset && { skip: options.offset }),
        });

        return { success: true, data: projects };
    } catch (err) {
        console.error("getProjects error:", err);
        return { success: false, error: "Failed to load projects." };
    }
};

/**
 * Get a single project by id (server action).
 */
export const getProjectById = async (id: number) => {
    try {
        const { id: validatedId } = idSchema.parse({ id });

        const project = await prisma.project.findUnique({
            where: { id: validatedId },
        });

        if (!project) {
            return { success: false, error: "Project not found." };
        }

        return { success: true, data: project };
    } catch (err) {
        console.error("getProjectById error:", err);
        return { success: false, error: "Failed to load project." };
    }
};
