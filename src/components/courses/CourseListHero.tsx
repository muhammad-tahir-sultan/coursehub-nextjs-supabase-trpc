"use client";

import { Plus, Sparkles, Search, X, RefreshCw } from "lucide-react";

interface CourseListHeroProps {
    totalCount?: number;
    search: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
    isFetching: boolean;
}

export default function CourseListHero({
    totalCount,
    search,
    onSearchChange,
    onAddClick,
    isFetching
}: CourseListHeroProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-accent-primary/5 via-bg-primary to-bg-primary pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div className="animate-fade-in-up">
                        <div className="flex items-center gap-2 text-accent-secondary text-sm font-medium mb-2">
                            <Sparkles size={16} />
                            <span>Course Management</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-2">
                            My <span className="gradient-text">Courses</span>
                        </h1>
                        <p className="text-text-secondary text-sm sm:text-base font-medium">
                            {totalCount
                                ? `${totalCount} course${totalCount !== 1 ? "s" : ""} in your collection`
                                : "Start building your course collection"}
                        </p>
                    </div>

                    <button
                        onClick={onAddClick}
                        className="flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.05] active:scale-[0.98] self-start sm:self-auto animate-fade-in-up"
                    >
                        <Plus size={20} />
                        Add New Course
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mt-10 relative max-w-xl animate-fade-in-up md:delay-100">
                    <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search courses by title, description or category..."
                        className="w-full pl-14 pr-12 py-4.5 bg-bg-card/50 backdrop-blur-md border border-border-default rounded-2xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all shadow-xl"
                    />
                    {search && (
                        <button
                            onClick={() => onSearchChange("")}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary bg-bg-primary p-1 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                    {isFetching && (
                        <div className="absolute right-14 top-1/2 -translate-y-1/2">
                            <RefreshCw
                                size={18}
                                className="animate-spin text-accent-primary"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
