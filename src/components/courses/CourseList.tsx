"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { keepPreviousData } from "@tanstack/react-query";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";
import Pagination from "./Pagination";
import CourseListHero from "./CourseListHero";
import CourseListSkeleton from "./CourseListSkeleton";
import { BookOpen, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../ui/ConfirmModal";

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

export default function CourseList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ id: string; title: string } | null>(null);

  // Filter Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Data Fetching
  const { data, isLoading, isFetching, refetch } = trpc.course.list.useQuery(
    { page, limit: 9, search: debouncedSearch || undefined },
    { placeholderData: keepPreviousData }
  );

  // Mutation Handlers
  const createMutation = trpc.course.create.useMutation({
    onSuccess: () => {
      toast.success("Course created successfully! 🎉");
      handleCloseForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.course.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully! ✨");
      handleCloseForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.course.delete.useMutation({
    onSuccess: () => {
      toast.success("Course deleted successfully");
      setDeletingId(null);
      setIsConfirmOpen(false);
      setCourseToDelete(null);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete course");
      setDeletingId(null);
      setIsConfirmOpen(false);
    },
  });

  // Callbacks
  const handleCreate = useCallback((formData: Omit<Course, "id" | "created_at">) => createMutation.mutate(formData), [createMutation]);

  const handleUpdate = useCallback((formData: Omit<Course, "id" | "created_at">) => {
    if (!editingCourse) return;
    updateMutation.mutate({ id: editingCourse.id, ...formData });
  }, [editingCourse, updateMutation]);

  const handleDelete = useCallback((id: string) => {
    const course = data?.courses?.find((c: Course) => c.id === id);
    if (course) {
      setCourseToDelete({ id: course.id, title: course.title });
      setIsConfirmOpen(true);
    }
  }, [data?.courses]);

  const confirmDelete = useCallback(() => {
    if (courseToDelete) {
      setDeletingId(courseToDelete.id);
      deleteMutation.mutate({ id: courseToDelete.id });
    }
  }, [courseToDelete, deleteMutation]);

  const handleEdit = useCallback((course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingCourse(null);
  }, []);

  const courseCards = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 stagger-children">
      {data?.courses?.map((course: Course, index: number) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={handleEdit}
          onDelete={handleDelete}
          index={index}
        />
      ))}
    </div>
  ), [data?.courses, handleEdit, handleDelete]);

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-32 px-4 animate-fade-in-up">
      <div className="flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 mb-8 pulse-glow">
        <BookOpen size={48} className="text-accent-primary" />
      </div>
      <h3 className="text-2xl font-black text-text-primary mb-3">
        {debouncedSearch ? "No courses found" : "Ready to start?"}
      </h3>
      <p className="text-text-secondary font-medium mb-10 text-center max-w-sm leading-relaxed">
        {debouncedSearch
          ? `We couldn't find any courses matching "${debouncedSearch}".`
          : "Your course catalog is currently empty. Let's create something amazing today."}
      </p>
      {!debouncedSearch && (
        <button
          onClick={() => { setEditingCourse(null); setShowForm(true); }}
          className="flex items-center gap-3 px-10 py-4 font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl shadow-xl shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.05]"
        >
          <Plus size={20} />
          Create First Course
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <CourseListHero
        totalCount={data?.totalCount}
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => { setEditingCourse(null); setShowForm(true); }}
        isFetching={isFetching}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading ? (
          <CourseListSkeleton />
        ) : data?.courses && data.courses.length > 0 ? (
          <>
            {courseCards}
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
            <div className="text-center mt-6 text-[10px] uppercase tracking-widest font-black text-text-muted">
              Page {data.currentPage} of {data.totalPages} • {data.totalCount} Total
            </div>
          </>
        ) : (
          emptyState
        )}
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => !deletingId && setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${courseToDelete?.title}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />

      {showForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={editingCourse ? handleUpdate : handleCreate}
          onClose={handleCloseForm}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
