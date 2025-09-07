interface ProjectHeaderProps {
    title: string;
    description?: string | null;
    tags?: string[];
}

const ProjectHeader = ({ title, description, tags }: ProjectHeaderProps) => {
    return (
        <header className="py-16">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {description}
                </p>
            )}

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </header>
    );
};

export default ProjectHeader;
