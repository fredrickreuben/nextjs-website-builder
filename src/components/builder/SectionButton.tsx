import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import SectionOptionsDialog from "./SectionOptionsDialog";

interface SectionButtonProps {
    position: number;
    onSectionSelect?: (type: string, position: number) => void;
    disabled?: boolean;
}

const SectionButton = ({
    position,
    onSectionSelect,
    disabled = false,
}: SectionButtonProps) => {
    const handleSectionSelect = (type: string) => {
        if (onSectionSelect) {
            onSectionSelect(type, position);
        }
    };

    return (
        <div className="relative group">
            <div className="w-full border-primary/05 border-t group-hover:border-primary/50 transition-colors duration-200"></div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <SectionOptionsDialog onSectionSelect={handleSectionSelect}>
                    <Button size="icon" disabled={disabled}>
                        {disabled ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <Plus className="w-6 h-6" />
                        )}
                    </Button>
                </SectionOptionsDialog>
            </div>
        </div>
    );
};

export default SectionButton;
