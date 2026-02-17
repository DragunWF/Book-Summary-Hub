"use client";

import Book from "@/app/_interfaces/book";
import { BookOpen, Calendar, Star } from "lucide-react";
import styles from "./BookCard.module.css";
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format date if it exists
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown Date";

  // Dynamic styles for the "Mage Artifact" glow effect
  const cardStyle = {
    borderColor: isHovered ? book.coverColor : "var(--border)",
    background: isHovered
      ? `linear-gradient(145deg, var(--bg-base) 40%, ${book.coverColor}15 100%)`
      : "var(--bg-base)",
    boxShadow: isHovered ? `0 10px 30px -10px ${book.coverColor}40` : "none",
  };

  return (
    <Link href={`/book-summary/${book.id}`} style={{ textDecoration: "none" }}>
      <div
        className={styles.bookCard}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.cardHeader}>
          <div
            className={styles.cardCoverPlaceholder}
            style={{ backgroundColor: book.coverColor }}
          >
            <BookOpen size={24} color="rgba(255,255,255,0.7)" />
          </div>
          <div className={styles.cardMeta}>
            <h3 className={styles.cardTitle}>{book.title}</h3>
            <p className={styles.cardAuthor}>{book.author}</p>
            <div className={styles.cardDate}>
              <Calendar size={12} />
              <span>Added {formattedDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardBody}>
          <p className={styles.cardSummaryPreview}>{book.summary}</p>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.categoryBadge}>{book.category}</span>

          <div className={styles.ratingBadge}>
            <span>{book.rating}/10</span>
            <Star className={styles.ratingIcon} />
          </div>
        </div>
      </div>
    </Link>
  );
}
