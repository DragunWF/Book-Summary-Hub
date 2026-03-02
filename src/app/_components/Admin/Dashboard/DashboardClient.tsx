"use client";

import { useState } from "react";
import Book from "@/app/_interfaces/book";
import DashboardHero from "./DashboardHero";
import DashboardToolbar from "./DashboardToolbar";
import DashboardTable from "./DashboardTable";

interface DashboardClientProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export default function DashboardClient({
  books,
  currentPage,
  totalPages,
  searchQuery,
}: DashboardClientProps) {
  const [featuredBookId, setFeaturedBookId] = useState<string | null>(null);

  const featuredBook = featuredBookId
    ? books.find((b) => b.id === featuredBookId)
    : null;

  const toggleFeatured = (id: string) => {
    setFeaturedBookId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <DashboardHero
        featuredBook={featuredBook}
        onClear={() => setFeaturedBookId(null)}
      />
      <DashboardToolbar initialSearchQuery={searchQuery} />
      <DashboardTable
        books={books}
        featuredBookId={featuredBookId}
        onToggleFeatured={toggleFeatured}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
