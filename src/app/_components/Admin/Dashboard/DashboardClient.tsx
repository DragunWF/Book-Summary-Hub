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
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  const toggleFeatured = async (id: string) => {
    setLoadingActionId(id);
    try {
      if (initialFeaturedBook?.id === id) {
        await clearFeaturedBookAction();
      } else {
        await setFeaturedBookAction(id);
      }
    } finally {
      setLoadingActionId(null);
    }
  };

  const clearFeatured = async () => {
    await clearFeaturedBookAction();
  };

  const handleDelete = async (id: string) => {
    setLoadingActionId(id);
    try {
      await deleteBookSummaryAction(id);
    } finally {
      setLoadingActionId(null);
    }
  };

  return (
    <>
      <DashboardHero
        featuredBook={initialFeaturedBook}
        onClear={clearFeatured}
      />
      <DashboardToolbar initialSearchQuery={searchQuery} />
      <DashboardTable
        books={books}
        featuredBookId={initialFeaturedBook?.id || null}
        onToggleFeatured={toggleFeatured}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isPending}
        loadingActionId={loadingActionId}
      />
    </>
  );
}
