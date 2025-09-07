"use client";

import { Text } from "@/generated/prisma/client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface TextEditorProps {
    text: Text;
    onUpdate?: (content: string) => void;
    editable?: boolean;
    placeholder?: string;
}

const TextEditor = ({
    text: { content },
    onUpdate,
    editable = true,
    placeholder = "Start writing...",
}: TextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editable: editable,
        immediatelyRender: false, // Prevent SSR issues
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            if (onUpdate) {
                onUpdate(editor.getHTML());
            }
        },
    });

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

    if (!editor) {
        return null; // Prevent rendering until editor is initialized
    }

    return (
        <div className="tiptap-editor">
            <EditorContent editor={editor} className="w-full" />
        </div>
    );
};

export default TextEditor;
