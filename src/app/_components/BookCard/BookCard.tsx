"use client";

import Book from "@/app/_interfaces/book";
import { BookOpen, Clock, Star } from "lucide-react";
import styles from "./BookCard.module.css";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const bookId = 1; // TODO: Replace this with the actual book ID

  const statusClass =
    book.status === "Completed"
      ? styles.statusCompleted
      : book.status === "In Progress"
        ? styles.statusProgress
        : styles.statusToread;

  return (
    <Link href={`/book-summary/${bookId}`}>
      <div className={styles.bookCard}>
        <div className={styles.cardHeader}>
          <div
            className={styles.cardCoverPlaceholder}
            style={{ backgroundColor: book.coverColor }}
          >
            <BookOpen size={24} color="rgba(255,255,255,0.5)" />
          </div>
          <div className={styles.cardMeta}>
            <h3 className={styles.cardTitle}>{book.title}</h3>
            <p className={styles.cardAuthor}>{book.author}</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardSummaryPreview}>{book.summary}</p>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.timeBadge}>
            <Clock size={14} /> {book.readTime}
          </div>
          <div className={styles.ratingBadge}>
            <span>{book.rating}/10</span>
            <Star className={styles.ratingIcon} />
          </div>
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {book.status}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {book.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
