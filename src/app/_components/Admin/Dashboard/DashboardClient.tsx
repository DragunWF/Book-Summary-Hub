"use client";

import Book from "@/app/_interfaces/book";
import DashboardHero from "./DashboardHero";
import DashboardToolbar from "./DashboardToolbar";
import DashboardTable from "./DashboardTable";
import {
  setFeaturedBookAction,
  clearFeaturedBookAction,
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
  const toggleFeatured = async (id: string) => {
    if (initialFeaturedBook?.id === id) {
      await clearFeaturedBookAction();
    } else {
      await setFeaturedBookAction(id);
    }
  };

  const clearFeatured = async () => {
    await clearFeaturedBookAction();
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
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
