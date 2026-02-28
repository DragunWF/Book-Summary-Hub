"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Book from "@/app/_interfaces/book";
import BookCard from "@/app/_components/BookCard/BookCard";
import styles from "./BookLibrary.module.css";

interface BookLibraryProps {
  bookSummaries: Book[];
}

const ITEMS_PER_PAGE = 6;

export default function BookLibrary({ bookSummaries }: BookLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Categories derived from data
  const categories = useMemo(() => {
    return Array.from(new Set(bookSummaries.map((book) => book.category)));
  }, [bookSummaries]);

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return bookSummaries.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? book.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, bookSummaries]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  return (
    <div>
      <div className={styles.filterBar}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search titles, authors..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className={styles.categoryChips}>
            <button
              className={`${styles.chip} ${selectedCategory === null ? styles.chipActive : ""}`}
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bookGrid}>
        {filteredBooks.length > 0 ? (
          paginatedBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px",
              color: "var(--text-muted)",
            }}
          >
            <Filter size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
            <p>No books found for your query. Try a different spell, Mage.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

