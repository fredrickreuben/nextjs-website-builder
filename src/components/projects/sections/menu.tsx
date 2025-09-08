import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface SectionMenuProps {
    onSectionRemove?: () => void;
    onEditableChange?: () => void;
}

const SectionMenu = ({
    onSectionRemove,
    onEditableChange,
}: SectionMenuProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRemoveClick = () => {
        if (onSectionRemove) {
            onSectionRemove();
            setIsDialogOpen(false); // Close dialog after removal
        }
    };

    return (
        <>
            <div className="flex flex-col space-y-1">
                {onEditableChange && (
                    <Button
                        variant="default"
                        size="icon"
                        onClick={onEditableChange}
                        className="shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="default"
                            size="icon"
                            className="shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the section.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleRemoveClick}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Remove Section
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {/* Add more menu items here later */}
            </div>
        </>
    );
};

export default SectionMenu;
