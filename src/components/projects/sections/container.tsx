import Container from "@/components/layout/container";
import { Section, Text } from "@/generated/prisma/client";
import TextEditor from "./text/editor";
import SectionMenu from "./menu";

interface SectionContainerProps {
    section: Section & { text: Text | null };
    index: number;
    onTextUpdate?: (sectionId: number | undefined, content: string) => void;
    onSectionRemove?: (sectionId: number | undefined, position: number) => void;
}

const SectionContainer = ({
    section,
    index,
    onTextUpdate,
    onSectionRemove,
}: SectionContainerProps) => {
    const handleTextUpdate = (sectionId: number, content: string) => {
        if (onTextUpdate) {
            onTextUpdate(sectionId, content);
        }
    };

    const handleSectionRemove = () => {
        if (onSectionRemove) {
            onSectionRemove(section.id, index);
        }
    };

    return (
        <div className="relative group">
            <Container className="relative">
                {/* Floating menu - appears on hover */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                    <SectionMenu onSectionRemove={handleSectionRemove} />
                </div>

                <div className="p-6">
                    {section.type === "Text" && section.text && (
                        <TextEditor
                            text={section.text}
                            onUpdate={(content) =>
                                handleTextUpdate(section.id, content)
                            }
                        />
                    )}

                    {section.type === "Image" && (
                        <div className="text-gray-500">
                            Image section (not implemented yet)
                        </div>
                    )}
                    {section.type === "Video" && (
                        <div className="text-gray-500">
                            Video section (not implemented yet)
                        </div>
                    )}
                    {section.type === "Layout" && (
                        <div className="text-gray-500">
                            Layout section (not implemented yet)
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default SectionContainer;
