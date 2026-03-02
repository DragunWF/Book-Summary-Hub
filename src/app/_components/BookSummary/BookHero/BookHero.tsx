"use client";

import styles from "./BookHero.module.css";
import Link from "next/link";
import { Star, Clock, Bookmark } from "lucide-react";
import Book from "@/app/_interfaces/book";

export default function BookHero({ book }: { book: Book }) {
  return (
    <>
      <div className={styles.breadcrumbs}>
        <Link href="/">Library</Link> <span>/</span>
        <span style={{ color: "var(--accent-primary)" }}>{book.title}</span>
      </div>

      <header className={styles.hero}>
        <h1 className={styles.title}>{book.title}</h1>
        <div className={styles.author}>by {book.author}</div>

        <div className={styles.statsRow}>
          <div className={`${styles.statItem} ${styles.highlight}`}>
            <Star size={14} fill="currentColor" />
            <span>{book.rating ? `${book.rating.toFixed(1)} / 5.0` : 'N/A'}</span>
          </div>
          <div className={styles.statItem}>
            <Clock size={14} />
            <span>{book.readTime || 'N/A'}</span>
          </div>
          <div className={styles.statItem}>
            <Bookmark size={14} />
            <span>{book.category}</span>
          </div>
        </div>
      </header>
    </>
  );
}
