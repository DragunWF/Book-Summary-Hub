"use client";

import styles from "./BookHero.module.css";
import Link from "next/link";
import { Star, Clock, Hash } from "lucide-react";

export default function BookHero() {
  return (
    <>
      <div className={styles.breadcrumbs}>
        <Link href="/">Library</Link> <span>/</span>
        <span style={{ color: "var(--accent-primary)" }}>
          Clean Architecture
        </span>
      </div>

      <header className={styles.hero}>
        <h1 className={styles.title}>Clean Architecture</h1>
        <div className={styles.author}>by Robert C. Martin</div>

        <div className={styles.statsRow}>
          <div className={`${styles.statItem} ${styles.highlight}`}>
            <Star size={14} fill="currentColor" />
            <span>4.0 / 5.0</span>
          </div>
          <div className={styles.statItem}>
            <Clock size={14} />
            <span>25 min read</span>
          </div>
          <div className={styles.statItem}>
            <Hash size={14} />
            <span>Book Category</span>
          </div>
        </div>
      </header>
    </>
  );
}
