import Container from "@/components/layout/container";
import { Section, Text } from "@/generated/prisma/client";
import TextEditor from "./text/editor";

interface SectionListProps {
    sections: (Section & { text: Text | null })[];
}

const SectionList = ({ sections }: SectionListProps) => {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <ul className="space-y-4 mt-8">
            {sections.map((section) => (
                <li key={section.id}>
                    <Container asChild>
                        <section className="border rounded-lg p-6">
                            {section.type === "Text" && section.text && (
                                <TextEditor
                                    text={section.text}
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
                        </section>
                    </Container>
                </li>
            ))}
        </ul>
    );
};

export default SectionList;
