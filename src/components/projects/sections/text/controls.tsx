import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Italic,
    Link2,
    Strikethrough,
    Underline,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TextControlsProps {
    editor: any; // TipTap editor instance
    dropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    onModalOpen?: (open: boolean) => void;
}

export const TextControls = ({
    editor,
    dropdownOpen,
    setDropdownOpen,
    onModalOpen,
}: TextControlsProps) => {
    const headingOptions = [
        { label: "Paragraph", level: null },
        { label: "Heading 1", level: 1 },
        { label: "Heading 2", level: 2 },
        { label: "Heading 3", level: 3 },
        { label: "Heading 4", level: 4 },
        { label: "Heading 5", level: 5 },
        { label: "Heading 6", level: 6 },
    ];

    const getCurrentHeadingLabel = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Paragraph";
    };

    const toggleHeading = (level: number | null) => {
        if (level === null) {
            editor?.chain().focus().setParagraph().run();
        } else {
            editor?.chain().focus().toggleHeading({ level }).run();
        }
    };

    const isActive = (level: number | null) => {
        if (level === null) {
            return editor?.isActive("paragraph");
        } else {
            return editor?.isActive("heading", { level });
        }
    };

    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [targetBlank, setTargetBlank] = useState(true);
    const [removeUnderline, setRemoveUnderline] = useState(false);

    useEffect(() => {
        onModalOpen?.(showLinkDialog);
    }, [showLinkDialog, onModalOpen]);

    const handleLinkButton = () => {
        const currentLink = editor?.getAttributes("link");
        if (currentLink) {
            setLinkUrl(currentLink.href || "");
            setTargetBlank(!!currentLink.target);
            setRemoveUnderline(currentLink.class?.includes("no-underline") || false);
        } else {
            setLinkUrl("");
            setTargetBlank(true);
            setRemoveUnderline(false);
        }
        setShowLinkDialog(true);
    };

    const handleLinkSubmit = () => {
        if (linkUrl.trim()) {
            const linkData: any = { href: linkUrl, target: targetBlank ? "_blank" : "_self" };
            if (removeUnderline) linkData.class = "no-underline";
            editor?.chain().focus().setLink(linkData).run();
        }
        setShowLinkDialog(false);
        setLinkUrl("");
        setTargetBlank(true);
        setRemoveUnderline(false);
    };

    const handleLinkCancel = () => {
        setShowLinkDialog(false);
        setLinkUrl("");
        setTargetBlank(true);
        setRemoveUnderline(false);
    };

    const handleUnlink = () => {
        editor?.chain().focus().unsetLink().run();
        setShowLinkDialog(false);
        setLinkUrl("");
        setTargetBlank(true);
        setRemoveUnderline(false);
    };

    const headingItems = [
        {
            name: "Align Left",
            icon: AlignLeft,
            action: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: editor?.isActive({ textAlign: "left" }),
        },
        {
            name: "Align Center",
            icon: AlignCenter,
            action: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: editor?.isActive({ textAlign: "center" }),
        },
        {
            name: "Align Right",
            icon: AlignRight,
            action: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: editor?.isActive({ textAlign: "right" }),
        },
        {
            name: "Align Justify",
            icon: AlignJustify,
            action: () => editor.chain().focus().setTextAlign("justify").run(),
            isActive: editor?.isActive({ textAlign: "justify" }),
        },
    ];

    return (
        <div className="flex flex-row items-center gap-1 p-1 border rounded bg-gray-50">
            <div className="flex flex-row items-center gap-1">
                <Button
                    size="sm"
                    variant={editor?.isActive("bold") ? "default" : "ghost"}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className="h-8 w-8 p-0"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor?.isActive("italic") ? "default" : "ghost"}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className="h-8 w-8 p-0"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={
                        editor?.isActive("underline") ? "default" : "ghost"
                    }
                    onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                    }
                    className="h-8 w-8 p-0"
                >
                    <Underline className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor?.isActive("link") ? "default" : "ghost"}
                    onClick={handleLinkButton}
                    className="h-8 w-8 p-0"
                >
                    <Link2 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor?.isActive("strike") ? "default" : "ghost"}
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className="h-8 w-8 p-0"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <DropdownMenu
                    open={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                >
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" className="h-8 px-2 text-sm">
                            {getCurrentHeadingLabel()}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {headingOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.label}
                                onClick={() => toggleHeading(option.level)}
                                className={
                                    isActive(option.level) ? "bg-accent" : ""
                                }
                            >
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="h-6 w-px bg-gray-300 mx-1" />
            <div className="flex flex-row items-center gap-1">
                {headingItems.map((item) => (
                    <Button
                        key={item.name}
                        size="sm"
                        variant={item.isActive ? "default" : "ghost"}
                        onClick={item.action}
                        className="h-8 w-8 p-0"
                        title={item.name}
                    >
                        <item.icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>
            <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Link URL</DialogTitle>
                        <DialogDescription>
                            Enter the URL for the link.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://"
                    />
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id="target"
                            checked={targetBlank}
                            onCheckedChange={(checked) =>
                                setTargetBlank(checked === true)
                            }
                        />
                        <label
                            htmlFor="target"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Open in new tab
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id="underline"
                            checked={removeUnderline}
                            onCheckedChange={(checked) =>
                                setRemoveUnderline(checked === true)
                            }
                        />
                        <label
                            htmlFor="underline"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remove underline
                        </label>
                    </div>
                    <DialogFooter>
                        {linkUrl && (
                            <Button onClick={handleUnlink} variant="secondary">
                                Unlink
                            </Button>
                        )}
                        <Button onClick={handleLinkCancel}>Cancel</Button>
                        <Button onClick={handleLinkSubmit}>
                            {linkUrl ? "Save" : "Add Link"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TextControls;
