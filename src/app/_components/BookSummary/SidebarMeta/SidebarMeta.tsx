"use client";

import React from "react";
import styles from "./SidebarMeta.module.css";
import { Bookmark, Share2, Book as BookIcon } from "lucide-react"; // Renamed Book import to BookIcon
import Book from "@/app/_interfaces/book";

export default function SidebarMeta({ book }: { book: Book }) {
  // Function to render the correct Lucide icon dynamically
  const renderIcon = (iconName: string, size: number, color: string) => {
    const LucideIcon = require('lucide-react')[iconName];
    if (LucideIcon) {
      return <LucideIcon size={size} color={color} style={{ marginBottom: "1rem" }} />;
    }
    return <BookIcon size={size} color={color} style={{ marginBottom: "1rem" }} />; // Fallback to BookIcon
  };

  const titleWords = book.title.split(" ");
  return (
    <aside className={styles.metaSidebar}>
      {/* Cover Image */}
      <div className={styles.bookCoverCard} style={{ backgroundColor: book.coverColor || "var(--clr-background-dark)" }}>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          {renderIcon(book.coverIcon || 'Book', 48, "#00FF41")}
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 700,
              fontSize: "1.5rem",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            {titleWords.map((word, index) => (
              <React.Fragment key={index}>
                {word.toUpperCase()}
                {index < titleWords.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button className={`${styles.actionButton} ${styles.btnPrimary}`}>
          <Bookmark size={18} /> Save to Grimoire
        </button>
        <button className={`${styles.actionButton} ${styles.btnSecondary}`}>
          <Share2 size={18} /> Share Spell
        </button>
      </div>
    </aside>
  );
}
