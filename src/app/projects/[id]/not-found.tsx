import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <Container className="py-16">
            <div className="text-center max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Project Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                    The project you're looking for doesn't exist or has been
                    removed.
                </p>
                <Link href="/projects">
                    <Button>← Back to Projects</Button>
                </Link>
            </div>
        </Container>
    );
}
