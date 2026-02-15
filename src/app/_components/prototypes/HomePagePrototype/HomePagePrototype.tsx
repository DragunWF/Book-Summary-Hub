"use client";

import { useState, useMemo } from "react";
import { MOCK_SUMMARIES } from "@/app/constants/mockData";
import { Search, Filter } from "lucide-react";
import Book from "@/app/interfaces/book";

import NavHeader from "@/app/_components/NavHeader/NavHeader";
import HeroSection from "@/app/_components/HeroSection/HeroSection";
import BookCard from "@/app/_components/BookCard/BookCard";

import styles from "./HomePagePrototype.module.css";

interface HomePagePrototypeProps {
  bookSummaries: Book[];
}

export default function HomePagePrototype({
  bookSummaries,
}: HomePagePrototypeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayedBookSummaries, setDisplayedBookSummaries] =
    useState<Book[]>(bookSummaries);

  // Categories derived from data
  const categories = Array.from(new Set(MOCK_SUMMARIES.map((b) => b.category)));

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return displayedBookSummaries.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? book.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, displayedBookSummaries]);

  return (
    <div className={styles.appBackground}>
      <div className="container">
        <NavHeader />

        <HeroSection />

        <main>
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
        </main>

        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} DragunWF. Built with React,
            TypeScript, & Next.ts.
          </p>
        </footer>
      </div>
    </div>
  );
}
