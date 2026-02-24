"use client";

import {
    ArrowLeft,
    Clock,
    User,
    Tag,
    BarChart3,
    Calendar,
    BookOpen,
    Sparkles,
    ShieldCheck,
    Globe
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: string;
    price: number;
    image_url?: string;
    created_at: string;
}

interface CourseDetailContentProps {
    course: Course;
}

export default function CourseDetailContent({ course }: CourseDetailContentProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Dynamic Header / Banner */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                {course.image_url ? (
                    <>
                        <img
                            src={course.image_url}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-black/20" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent-primary/30 via-accent-secondary/10 to-bg-primary" />
                )}

                {/* Navigation Overlays */}
                <div className="absolute top-0 inset-x-0 p-4 sm:p-8 flex justify-between items-center z-10">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-bg-card border border-border-default p-6 sm:p-10 rounded-3xl glass shadow-2xl animate-fade-in-up">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-accent-primary/10 text-accent-secondary text-xs font-bold rounded-full border border-accent-primary/20 flex items-center gap-2">
                                    <Tag size={12} />
                                    {course.category}
                                </span>
                                <span className="px-4 py-1.5 bg-success/10 text-success text-xs font-bold rounded-full border border-success/20 flex items-center gap-2">
                                    <ShieldCheck size={12} />
                                    Verified Course
                                </span>
                                <span className="px-4 py-1.5 bg-info/10 text-info text-xs font-bold rounded-full border border-info/20 flex items-center gap-2">
                                    <Globe size={12} />
                                    Online
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-6 leading-tight">
                                {course.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border-default">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-[2px]">
                                    <div className="h-full w-full rounded-[14px] bg-bg-card flex items-center justify-center text-xl font-bold">
                                        {course.instructor[0]}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-0.5">Instructor</p>
                                    <p className="text-text-primary font-bold text-lg">{course.instructor}</p>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <BookOpen size={20} className="text-accent-secondary" />
                                    Course Description
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-wrap">
                                    {course.description}
                                </p>
                            </div>

                            {/* What's included block */}
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Lifetime access to materials",
                                    "Certificate of completion",
                                    "Direct instructor support",
                                    "Downloadable resources",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-bg-primary/40 rounded-2xl border border-border-default/50">
                                        <div className="h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_8px_var(--color-accent-primary)]" />
                                        <span className="text-text-secondary text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-bg-card border border-border-default p-8 rounded-3xl glass shadow-2xl lg:sticky lg:top-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="mb-8">
                                <p className="text-text-muted text-sm font-medium mb-1">Course Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black gradient-text">
                                        {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}
                                    </span>
                                    {course.price > 0 && (
                                        <span className="text-text-muted text-sm line-through">$149.99</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-4 bg-bg-primary/40 rounded-2xl border border-border-default/50">
                                    <div className="flex items-center gap-3">
                                        <div className="text-accent-secondary bg-accent-primary/10 p-2 rounded-xl">
                                            <Clock size={16} />
                                        </div>
                                        <span className="text-text-secondary text-sm font-medium">Duration</span>
                                    </div>
                                    <span className="text-text-primary font-bold text-sm">{course.duration}</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-bg-primary/40 rounded-2xl border border-border-default/50">
                                    <div className="flex items-center gap-3">
                                        <div className="text-accent-secondary bg-accent-primary/10 p-2 rounded-xl">
                                            <BarChart3 size={16} />
                                        </div>
                                        <span className="text-text-secondary text-sm font-medium">Difficulty</span>
                                    </div>
                                    <span className="text-text-primary font-bold text-sm">{course.level}</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-bg-primary/40 rounded-2xl border border-border-default/50">
                                    <div className="flex items-center gap-3">
                                        <div className="text-accent-secondary bg-accent-primary/10 p-2 rounded-xl">
                                            <Calendar size={16} />
                                        </div>
                                        <span className="text-text-secondary text-sm font-medium">Last Updated</span>
                                    </div>
                                    <span className="text-text-primary font-bold text-sm">
                                        {new Date(course.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 px-6 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-2xl font-bold shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] mb-4 flex items-center justify-center gap-2">
                                <Sparkles size={18} />
                                Enroll Now
                            </button>

                            <button className="w-full py-4 px-6 bg-bg-primary border border-border-default text-text-primary rounded-2xl font-bold transition-all hover:bg-white/5 active:scale-[0.98]">
                                Add to Wishlist
                            </button>

                            <div className="mt-6 flex flex-col items-center gap-4 pt-6 border-t border-border-default/50">
                                <p className="text-text-muted text-xs font-medium">Share this course</p>
                                <div className="flex gap-4">
                                    {['LinkedIn', 'Twitter', 'Facebook'].map(p => (
                                        <button key={p} className="h-10 w-10 flex items-center justify-center rounded-xl bg-bg-primary/60 text-text-muted hover:text-accent-secondary hover:bg-bg-primary transition-all">
                                            <div className="text-[10px] font-bold">{p[0]}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
