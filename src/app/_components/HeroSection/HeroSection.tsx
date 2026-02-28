"use client";

import { Zap, ChevronRight, Feather, BookOpen } from "lucide-react";
import styles from "./HeroSection.module.css";
import Link from "next/link";
import { getCategoryColor } from "@/app/constants/bookCategories";
import type Book from "@/app/_interfaces/book";

interface HeroSectionProps {
  featuredBook: Book | null;
}

export default function HeroSection({ featuredBook }: HeroSectionProps) {
  if (!featuredBook) {
    return (
      <section className={styles.heroSection} style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "300px",
        backgroundColor: "var(--bg-base)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border)",
        margin: "40px 0"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          maxWidth: "400px",
          color: "var(--text-muted)"
        }}>
          <BookOpen size={48} style={{ opacity: 0.6 }} />
          <p style={{ fontSize: "1.1rem" }}>
            Featured book summary is not available for display at the moment. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const categoryStyle = getCategoryColor(featuredBook.category);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <Zap size={14} fill="currentColor" />
          Featured Book Summary
        </div>
        <h1 className={styles.heroTitle}>{featuredBook.title}</h1>
        <p className={styles.heroDescription}>{featuredBook.summary}</p>
        <Link href={`/book-summary/${featuredBook.id}`}>
          <button className={styles.btnPrimary}>
            Read Summary <ChevronRight size={18} />
          </button>
        </Link>
      </div>
      <div className={styles.heroVisual}>
        {/* Category Floating Badge */}
        <div
          className={styles.heroCategoryBadge}
          style={{
            backgroundColor: categoryStyle.bg.replace("0.15", "0.6"), // Make it more opaque for the badge
            borderColor: categoryStyle.text,
          }}
        >
          {featuredBook.category}
        </div>

        {/* CSS 3D Book representation */}
        <div className={styles.heroBookCover}>
          <h3
            style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}
          >
            {featuredBook.title}
          </h3>
          <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            {featuredBook.author}
          </span>
          <Feather
            size={40}
            color="#3b82f6"
            style={{ marginTop: "30px", opacity: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
