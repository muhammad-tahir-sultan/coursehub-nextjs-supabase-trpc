export default function CourseListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-bg-card border border-border-default rounded-3xl overflow-hidden glass shadow-xl"
                >
                    <div className="h-44 skeleton rounded-none" />
                    <div className="p-6 space-y-4">
                        <div className="h-7 w-3/4 skeleton rounded-xl" />
                        <div className="space-y-2">
                            <div className="h-4 w-full skeleton rounded-lg" />
                            <div className="h-4 w-5/6 skeleton rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="h-4 skeleton rounded-lg" />
                            <div className="h-4 skeleton rounded-lg" />
                            <div className="h-4 skeleton rounded-lg" />
                            <div className="h-4 skeleton rounded-lg" />
                        </div>
                        <div className="flex gap-3 pt-6 border-t border-border-default">
                            <div className="flex-1 h-12 skeleton rounded-xl" />
                            <div className="flex-1 h-12 skeleton rounded-xl" />
                            <div className="flex-1 h-12 skeleton rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
