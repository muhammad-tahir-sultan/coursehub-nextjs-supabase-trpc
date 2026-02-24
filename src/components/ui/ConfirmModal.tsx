"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
}: ConfirmModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md glass rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-danger/50 via-danger to-danger/50" />

                <div className="p-6 sm:p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger mb-6">
                            <AlertTriangle size={32} />
                        </div>

                        <h3 className="text-2xl font-bold text-text-primary mb-2">
                            {title}
                        </h3>

                        <p className="text-text-secondary leading-relaxed mb-8">
                            {message}
                        </p>

                        <div className="flex w-full flex-col sm:flex-row gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 text-sm font-semibold text-text-primary bg-bg-primary hover:bg-white/5 border border-border-default rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-danger hover:bg-danger-hover rounded-xl shadow-lg shadow-danger/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
