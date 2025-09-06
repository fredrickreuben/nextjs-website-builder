import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl" | "full";
    padding?: "none" | "sm" | "md" | "lg";
    asChild?: boolean;
}

/**
 * @description A flexible container component with responsive max-width and padding options.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the container.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'} [props.maxWidth='7xl'] - The maximum width of the container.
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.padding='md'] - The horizontal padding of the container.
 * @returns {JSX.Element} The rendered container component.
 */
const Container: React.FC<ContainerProps> = ({ children, maxWidth = "7xl", padding = "md", asChild = false, className, ...props }) => {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "4xl": "max-w-4xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
    };

    const paddingClasses = {
        none: "px-0",
        sm: "px-4",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
    };

    const Comp = asChild ? Slot : "div";

    return (
        <Comp className={cn("mx-auto", maxWidthClasses[maxWidth], paddingClasses[padding], className)} {...props}>
            {children}
        </Comp>
    );
};

export default Container;
