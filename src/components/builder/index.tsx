"use client";

import { createOrUpdateSections } from "@/actions/sections/actions";
import { Project, Section, Text } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SectionList from "../projects/sections";
import SectionButton from "./SectionButton";

type SectionWithText = Section & { text: Text | null };

interface SectionState {
    id?: number; // undefined for new sections
    type: "Text" | "Image" | "Video" | "TextImage" | "Layout";
    position: number;
    text?: Text;
    isNew?: boolean; // flag to track new sections
}

interface PageBuilderProps {
    project: Project & {
        sections: (Section & { text: Text | null })[];
    };
}

const PageBuilder = ({ project }: PageBuilderProps) => {
    const router = useRouter();
    const [sections, setSections] = useState<SectionState[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Initialize sections from project data
    useEffect(() => {
        const initialSections: SectionState[] = (project.sections || []).map(
            (section) => ({
                id: section.id,
                type: section.type,
                position: section.position,
                text: section.text ?? undefined,
                isNew: false,
            })
        );
        setSections(initialSections);
        setHasUnsavedChanges(false);
    }, [project.sections]);

    // Save all sections to database
    const saveAllSections = async () => {
        if (isSaving) return;

        setIsSaving(true);

        try {
            const result = await createOrUpdateSections({
                projectId: project.id,
                sections: sections.map((section) => ({
                    id: section.id,
                    type: section.type,
                    position: section.position,
                    text: section.text,
                })),
            });

            if (result.success) {
                toast.success("Sections saved successfully:");
                setHasUnsavedChanges(false);
                router.refresh(); // Refresh to get updated data from server
            } else {
                toast.error(result.error || "Failed to save sections");
                // TODO: Show error toast/notification
            }
        } catch (error) {
            console.error("Error saving sections:", error);
            // TODO: Show error toast/notification
        } finally {
            setIsSaving(false);
        }
    };

    // Add new section at specified position
    const handleSectionSelect = (type: string, position: number) => {
        const newSection: SectionState = {
            type: type as "Text" | "Image" | "Video" | "TextImage" | "Layout",
            position: position,
            text:
                type === "Text"
                    ? {
                          id: 0, // Temporary ID for new text sections
                          sectionId: 0,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                          content:
                              "<h1>Your Heading</h1><p>Enter your text here...</p>",
                      }
                    : undefined,
            isNew: true,
        };

        setSections((prevSections) => {
            // Insert new section and adjust positions
            const updatedSections = [...prevSections];

            // Shift positions of existing sections at or after the insert position
            updatedSections.forEach((section) => {
                if (section.position >= position) {
                    section.position += 1;
                }
            });

            // Add the new section
            updatedSections.push(newSection);

            // Sort by position
            updatedSections.sort((a, b) => a.position - b.position);

            return updatedSections;
        });

        setHasUnsavedChanges(true);
    };

    // Update text content for a section
    const handleTextUpdate = (
        sectionId: number | undefined,
        content: string
    ) => {
        setSections((prevSections) =>
            prevSections.map((section) => {
                if (section.id === sectionId || (!section.id && !sectionId)) {
                    return {
                        ...section,
                        text: section.text
                            ? { ...section.text, content }
                            : {
                                  id: 0,
                                  sectionId: sectionId || 0,
                                  createdAt: new Date(),
                                  updatedAt: new Date(),
                                  content,
                              },
                    };
                }
                return section;
            })
        );
        setHasUnsavedChanges(true);
    };

    // Remove section
    const handleSectionRemove = (
        sectionId: number | undefined,
        position: number
    ) => {
        setSections((prevSections) => {
            const updatedSections = prevSections
                .filter(
                    (section) =>
                        !(
                            section.id === sectionId &&
                            section.position === position
                        )
                )
                .map((section) => {
                    // Adjust positions of sections after the removed one
                    if (section.position > position) {
                        return { ...section, position: section.position - 1 };
                    }
                    return section;
                });

            return updatedSections;
        });
        setHasUnsavedChanges(true);
    };

    const getNextPosition = () => {
        if (sections.length === 0) return 0;
        return Math.max(...sections.map((s) => s.position)) + 1;
    };

    // Convert state sections back to the format expected by SectionList
    const sectionsForDisplay: SectionWithText[] = sections.map((section) => ({
        id: section.id || 0, // Temporary ID for new sections
        type: section.type,
        position: section.position,
        projectId: project.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        text: section?.text || null, // Assuming you have a way to get the text for each section
    }));

    return (
        <div>
            {/* Save button - show when there are unsaved changes */}
            {hasUnsavedChanges && (
                <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            You have unsaved changes
                        </p>
                        <button
                            onClick={saveAllSections}
                            disabled={isSaving}
                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            )}

            <SectionList
                sections={sectionsForDisplay}
                onSectionSelect={handleSectionSelect}
                onTextUpdate={handleTextUpdate}
                onSectionRemove={handleSectionRemove}
                isCreating={isSaving}
            />

            <SectionButton
                position={getNextPosition()}
                onSectionSelect={handleSectionSelect}
                disabled={isSaving}
            />
        </div>
    );
};

export default PageBuilder;
