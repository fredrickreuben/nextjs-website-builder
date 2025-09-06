"use client";
import { createProject } from "@/actions/projects/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectCreateInput, projectCreateSchema } from "@/schemas/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = ProjectCreateInput;

const CreateProjectModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            liveUrl: undefined,
            tags: "",
            featured: false,
            userId: 1,
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const result = await createProject({
                title: values.title,
                description: values.description ?? null,
                category: values.category ?? null,
                liveUrl: values.liveUrl ?? null,
                tags: values.tags ?? null,
                featured: !!values.featured,
                userId: 1,
            });

            if (result.success && result.data) {
                toast.success(result.message);
                setOpen(false);
                reset();
                // Redirect to the newly created project page
                router.push(`/projects/${result.data.id}`);
            } else {
                toast.error(result.error || "Failed to create project");
            }
        } catch (err) {
            console.error("Create project error:", err);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">Start Your Project</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Provide basic info to create a new project.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                        />
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" {...register("category")} />
                    </div>

                    <div>
                        <Label htmlFor="liveUrl">Live URL</Label>
                        <Input
                            id="liveUrl"
                            {...register("liveUrl")}
                            placeholder="https://example.com"
                        />
                        {errors.liveUrl && (
                            <p className="text-sm text-red-600 mt-1">
                                {(errors.liveUrl as any).message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            {...register("tags")}
                            placeholder="react, blog, saas"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="featured" {...register("featured")} />
                        <Label htmlFor="featured">Featured</Label>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Project"}
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectModal;
