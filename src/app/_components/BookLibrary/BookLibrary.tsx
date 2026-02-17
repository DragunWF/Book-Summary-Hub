"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import Book from "@/app/interfaces/book";
import BookCard from "@/app/_components/BookCard/BookCard";
import styles from "./BookLibrary.module.css";

interface BookLibraryProps {
  bookSummaries: Book[];
}

export default function BookLibrary({
  bookSummaries,
}: BookLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categories derived from data
  const categories = useMemo(() => {
    return Array.from(
      new Set(bookSummaries.map((book) => book.category)),
    );
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.categoryChips}>
            <button
              className={`${styles.chip} ${selectedCategory === null ? styles.chipActive : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bookGrid}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px",
              color: "var(--text-muted)",
            }}
          >
            <Filter
              size={48}
              style={{ marginBottom: "16px", opacity: 0.5 }}
            />
            <p>
              No books found for your query. Try a different spell, Mage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
