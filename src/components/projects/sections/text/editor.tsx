"use client";

import { Text } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { useEffect, useRef, useState } from "react";
import TextControls from "./controls";

interface TextEditorProps {
    text: Text;
    onUpdate?: (content: string) => void;
    editable?: boolean;
    placeholder?: string;
    onEditableChange?: () => void;
    onDisableEditing?: () => void;
}

const TextEditor = ({
    text: { content },
    onUpdate,
    editable = false,
    placeholder = "Start writing...",
    onEditableChange,
    onDisableEditing,
}: TextEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLinkDialogState, setShowLinkDialogState] = useState(false);

    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Underline,
                Placeholder.configure({ placeholder }),
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                    alignments: ["left", "center", "right", "justify"],
                    defaultAlignment: "left",
                }),
            ],
            content,
            editable: editable,
            immediatelyRender: false, // Prevent SSR issues
            editorProps: {
                attributes: {
                    class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none",
                    "data-placeholder": placeholder,
                },
            },
            onUpdate: ({ editor }) => {
                if (onUpdate) {
                    onUpdate(editor.getHTML());
                }
            },
        },
        [editable, placeholder]
    );

    // Update editor content when prop changes
    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    // Update editable state when prop changes
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);

    // Outside click detection
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (
                editorRef.current &&
                !editorRef.current.contains(e.target as Node) &&
                !dropdownOpen &&
                !showLinkDialogState &&
                editable &&
                onDisableEditing
            ) {
                onDisableEditing();
            }
        };

        document.addEventListener("mousedown", handleDocumentClick);

        return () =>
            document.removeEventListener("mousedown", handleDocumentClick);
    }, [editable, onDisableEditing, dropdownOpen, showLinkDialogState]);

    if (!editor) {
        return null; // Prevent rendering until editor is initialized
    }

    return (
        <div className="tiptap-editor" ref={editorRef}>
            <div className="py-1 flex flex-row items-center gap-2">
                {/* controls menu */}
                {editable && (
                    <TextControls
                        editor={editor}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                        onModalOpen={setShowLinkDialogState}
                    />
                )}
            </div>
            <div
                className={cn(
                    "p-2",
                    editable ? "border-2 border-dashed border-neutral-400" : ""
                )}
            >
                <EditorContent editor={editor} className="w-full" />
            </div>
        </div>
    );
};

export default TextEditor;
