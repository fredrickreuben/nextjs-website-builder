"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import SectionOptions from "./SectionOptions";

interface SectionOptionsDialogProps {
    children: ReactNode;
    onSectionSelect?: (type: string) => void;
}

const SectionOptionsDialog = ({
    children,
    onSectionSelect,
}: SectionOptionsDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSectionSelect = (type: string) => {
        if (onSectionSelect) {
            onSectionSelect(type);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Section to Your Page</DialogTitle>
                </DialogHeader>
                <SectionOptions onSectionSelect={handleSectionSelect} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SectionOptionsDialog;
