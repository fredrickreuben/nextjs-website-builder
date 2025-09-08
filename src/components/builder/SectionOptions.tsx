import { Button } from "@/components/ui/button";
import { Image, LayoutGrid, Type, Video } from "lucide-react";

interface SectionOptionsProps {
    onSectionSelect?: (type: string) => void;
}

const SectionOptions = ({ onSectionSelect }: SectionOptionsProps) => {
    const handleSectionSelect = (type: string) => {
        if (onSectionSelect) {
            onSectionSelect(type);
        }
    };

    return (
        <div className="py-4">
            <div className="grid grid-cols-4 gap-4">
                <Button
                    variant="ghost"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleSectionSelect("Text")}
                >
                    <Type size={32} className="mb-2" />
                    <span className="text-sm font-medium">Text</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleSectionSelect("Image")}
                >
                    <Image size={32} className="mb-2" />
                    <span className="text-sm font-medium">Image</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleSectionSelect("Video")}
                >
                    <Video size={32} className="mb-2" />
                    <span className="text-sm font-medium">Video</span>
                </Button>
                <Button
                    variant="ghost"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleSectionSelect("Layout")}
                >
                    <LayoutGrid size={32} className="mb-2" />
                    <span className="text-sm font-medium">Layout</span>
                </Button>
            </div>
        </div>
    );
};

export default SectionOptions;
