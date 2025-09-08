import SectionButton from "@/components/builder/SectionButton";
import { Section, Text } from "@/generated/prisma/client";
import SectionContainer from "./container";

interface SectionListProps {
    sections: (Section & { text: Text | null })[];
    onSectionSelect?: (type: string, position: number) => void;
    onTextUpdate?: (sectionId: number | undefined, content: string) => void;
    onSectionRemove?: (sectionId: number | undefined, position: number) => void;
    isCreating?: boolean;
}

const SectionList = ({
    sections,
    onSectionSelect,
    onTextUpdate,
    onSectionRemove,
    isCreating = false,
}: SectionListProps) => {
    if (!sections || sections.length === 0) {
        return null;
    }

    const handleTextUpdate = (
        sectionId: number | undefined,
        content: string
    ) => {
        if (onTextUpdate) {
            onTextUpdate(sectionId, content);
        }
    };

    const handleSectionRemove = (
        sectionId: number | undefined,
        position: number
    ) => {
        if (onSectionRemove) {
            onSectionRemove(sectionId, position);
        }
    };

    return (
        <div className="px-16">
            <ul className="space-y-4 mt-8">
                {sections.map((section, index) => (
                    <li key={section.id}>
                        {/* SectionButton before each section (for inserting at that position) */}
                        <SectionButton
                            position={index}
                            onSectionSelect={onSectionSelect}
                            disabled={isCreating}
                        />
                        <SectionContainer
                            section={section}
                            index={index}
                            onTextUpdate={handleTextUpdate}
                            onSectionRemove={handleSectionRemove}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;
