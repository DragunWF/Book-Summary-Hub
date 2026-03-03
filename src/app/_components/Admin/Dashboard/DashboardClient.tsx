"use client";

import { useTransition, useState } from "react";
import Book from "@/app/_interfaces/book";
import DashboardHero from "./DashboardHero";
import DashboardToolbar from "./DashboardToolbar";
import DashboardTable from "./DashboardTable";
import {
  setFeaturedBookAction,
  clearFeaturedBookAction,
  deleteBookSummaryAction,
} from "@/app/_lib/actions";
import { useToast } from "@/app/_components/Toast/ToastProvider";

interface DashboardClientProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  initialFeaturedBook: Book | null;
}

export default function DashboardClient({
  books,
  currentPage,
  totalPages,
  searchQuery,
  initialFeaturedBook,
}: DashboardClientProps) {
  const [isPending, startTransition] = useTransition();
  const [loadingAction, setLoadingAction] = useState<{
    id: string;
    type: "toggle-featured" | "delete";
  } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { success, error } = useToast();

  const toggleFeatured = async (id: string) => {
    setLoadingAction({ id, type: "toggle-featured" });
    try {
      if (initialFeaturedBook?.id === id) {
        await clearFeaturedBookAction();
        success("Archive Slot Activated", "Featured slot has been updated.");
      } else {
        await setFeaturedBookAction(id);
        success("Archive Slot Activated", "Book marked as primary archive.");
      }
    } catch (err) {
      error("Archive Operation Failed", "Could not update featured book.");
    } finally {
      setLoadingAction(null);
    }
  };

  const clearFeatured = async () => {
    try {
      await clearFeaturedBookAction();
      success("Archive Slot Deactivated", "Featured book has been cleared.");
    } catch (err) {
      error("Operation Failed", "Could not clear the featured book.");
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingAction({ id, type: "delete" });
    try {
      await deleteBookSummaryAction(id);
      success("Archive Deleted", "Book summary has been permanently removed.");
    } catch (err) {
      // Check if this is a Next.js redirect error (which means the operation succeeded)
      const isRedirectError =
        err instanceof Error &&
        (err.message.includes("NEXT_REDIRECT") ||
          (err as any).digest?.includes("REDIRECT"));

      if (isRedirectError) {
        // Show success toast before the redirect happens
        success(
          "Archive Deleted",
          "Book summary has been permanently removed.",
        );
      } else {
        error("Deletion Failed", "Could not delete the book summary.");
      }
    } finally {
      setLoadingAction(null);
    }
  };

  const handleNavigate = (isNavigating: boolean) => {
    setIsNavigating(isNavigating);
  };

  return (
    <>
      <DashboardHero
        featuredBook={initialFeaturedBook}
        onClear={clearFeatured}
      />
      <DashboardToolbar
        initialSearchQuery={searchQuery}
        onNavigate={handleNavigate}
      />
      <DashboardTable
        books={books}
        featuredBookId={initialFeaturedBook?.id || null}
        onToggleFeatured={toggleFeatured}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isNavigating}
        loadingAction={loadingAction}
      />
    </>
  );
}
