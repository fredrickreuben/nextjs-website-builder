import * as z from "zod";

export const projectCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    liveUrl: z.string().url().optional().nullable(),
    tags: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    userId: z.number().int(),
});

export const projectUpdateSchema = z.object({
    id: z.number().int(),
    title: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    liveUrl: z.string().url().optional().nullable(),
    tags: z.string().optional().nullable(),
    featured: z.boolean().optional(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;