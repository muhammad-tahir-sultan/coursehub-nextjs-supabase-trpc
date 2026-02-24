"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import CourseDetailContent from "@/components/courses/CourseDetailContent";
import CourseDetailSkeleton from "@/components/courses/CourseDetailSkeleton";

export default function CourseDetailPage() {
    const { id } = useParams();

    const { data: course, isLoading, error } = trpc.course.getById.useQuery({
        id: id as string
    });

    if (isLoading) {
        return <CourseDetailSkeleton />;
    }

    if (error || !course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-4 text-center">
                <div className="bg-bg-card border border-border-default p-10 rounded-3xl max-w-md glass shadow-2xl animate-fade-in-up">
                    <div className="bg-danger/10 text-danger h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <BookOpen size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary mb-3">Course Not Found</h2>
                    <p className="text-text-secondary mb-10 leading-relaxed font-medium">
                        We couldn't find the course you're looking for. It might have been deleted or moved.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-accent-primary text-white rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-accent-primary/25 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ArrowLeft size={20} />
                        Back to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return <CourseDetailContent course={course} />;
}
