export default function CourseDetailSkeleton() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Hero Skeleton */}
            <div className="h-72 sm:h-96 w-full skeleton rounded-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-bg-card border border-border-default p-6 sm:p-10 rounded-3xl glass shadow-2xl">
                            <div className="flex gap-3 mb-8">
                                <div className="h-7 w-24 skeleton rounded-full" />
                                <div className="h-7 w-32 skeleton rounded-full" />
                                <div className="h-7 w-20 skeleton rounded-full" />
                            </div>
                            <div className="h-12 w-3/4 skeleton mb-4" />
                            <div className="h-10 w-1/2 skeleton mb-10" />

                            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border-default">
                                <div className="h-14 w-14 skeleton rounded-2xl" />
                                <div className="space-y-2">
                                    <div className="h-3 w-20 skeleton" />
                                    <div className="h-5 w-32 skeleton" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-4 w-full skeleton" />
                                <div className="h-4 w-full skeleton" />
                                <div className="h-4 w-3/4 skeleton" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-6">
                        <div className="bg-bg-card border border-border-default p-8 rounded-3xl glass shadow-2xl">
                            <div className="space-y-2 mb-8">
                                <div className="h-3 w-24 skeleton" />
                                <div className="h-10 w-40 skeleton" />
                            </div>
                            <div className="space-y-4 mb-8">
                                <div className="h-14 w-full skeleton rounded-2xl" />
                                <div className="h-14 w-full skeleton rounded-2xl" />
                                <div className="h-14 w-full skeleton rounded-2xl" />
                            </div>
                            <div className="h-14 w-full skeleton rounded-2xl mb-4" />
                            <div className="h-14 w-full skeleton rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
