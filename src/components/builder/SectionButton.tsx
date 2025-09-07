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
import { Image, LayoutGrid, Plus, Type, Video } from "lucide-react";
import { useState } from "react";

const SectionButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative group">
            <div className="w-full border-primary/05 border-t group-hover:border-primary/50 transition-colors duration-200"></div>
            {/* Page Builder Button */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="icon">
                            <Plus className="w-6 h-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Section to Your Page</DialogTitle>
                        </DialogHeader>
                        {/* Element Selection Grid */}
                        <div className="py-4">
                            <div className="grid grid-cols-4 gap-4">
                                <Button
                                    variant="ghost"
                                    className="flex flex-col items-center p-4 h-auto"
                                >
                                    <Type size={32} className="mb-2" />
                                    <span className="text-sm font-medium">
                                        Text
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="flex flex-col items-center p-4 h-auto"
                                >
                                    <Image size={32} className="mb-2" />
                                    <span className="text-sm font-medium">
                                        Image
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="flex flex-col items-center p-4 h-auto"
                                >
                                    <Video size={32} className="mb-2" />
                                    <span className="text-sm font-medium">
                                        Video
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="flex flex-col items-center p-4 h-auto"
                                >
                                    <LayoutGrid size={32} className="mb-2" />
                                    <span className="text-sm font-medium">
                                        Layout
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default SectionButton;
