"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import {
  Save,
  Trash2,
  BookOpen,
  ToggleLeft,
  ToggleRight,
  Star,
  Hash,
  Type,
  User,
  Tag,
  Palette,
  Clock,
  FileText,
  ChevronLeft, // Import ChevronLeft icon
} from "lucide-react";
import Book from "@/app/_interfaces/book";
import styles from "./BookForm.module.css";

interface BookFormProps {
  initialData?: Book | null; // Changed to allow null
  // onSave: (book: Book) => Promise<void> | void; // Removed
  // onDelete?: (id: string) => Promise<void> | void; // Removed
}

const DEFAULT_BOOK: Book = {
  id: "", // Will be generated or passed
  title: "",
  author: "",
  coverColor: "#00FF41",
  category: "Technical",
  rating: 1,
  readTime: "",
  summary: "",
  fullContent: "",
  dateRead: new Date().toISOString().split("T")[0],
  coverIcon: "book-open",
  isPublished: false,
};

const PRESET_COLORS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#00FF41", // Mage Green (Custom)
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#d946ef", // Fuchsia
  "#f43f5e", // Rose
  "#64748b", // Slate
];

const CATEGORIES = [
  "Technical",
  "Self-Improvement",
  "Fiction",
  "Philosophy",
  "Business",
] as const;

export default function BookForm({
  initialData,
  // onSave, // Removed
  // onDelete, // Removed
}: BookFormProps) {
  // Use useEffect to update formData when initialData changes, for "new" to "edit" transition if it happens.
  useEffect(() => {
    if (initialData) {
      setFormData({ ...DEFAULT_BOOK, ...initialData });
    } else {
      setFormData(DEFAULT_BOOK);
    }
    setIsDirty(false); // Reset dirty state on initial load/data change
  }, [initialData]);


  const [formData, setFormData] = useState<Book>(initialData ? { ...DEFAULT_BOOK, ...initialData } : DEFAULT_BOOK);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof Book, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSave(formData);
  //   setIsDirty(false);
  // };

  return (
    <form className={styles.container} /* onSubmit={handleSubmit} */> {/* onSubmit removed */}
      {/* Sidebar: Metadata */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.idDisplay}>
            <Hash size={12} style={{ display: "inline", marginRight: 4 }} />
            {formData.id || "NEW_ENTRY"}
          </div>
        </div>

        <div className={styles.inputGroup}>
          {" "}
          {/* Wrap section title to apply specific border/padding */}
          <div className={styles.sectionTitle}>
            <Tag size={14} />
            <span>Core Data</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Title</label>
          <div style={{ position: "relative" }}>
            <Type
              size={16}
              style={{
                position: "absolute",
                left: 10,
                top: 12,
                color: "var(--text-muted)",
              }}
            />
            <input
              className={styles.input}
              style={{ paddingLeft: 36 }}
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Book Title"
              required
              readOnly // Make fields read-only
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Author</label>
          <div style={{ position: "relative" }}>
            <User
              size={16}
              style={{
                position: "absolute",
                left: 10,
                top: 12,
                color: "var(--text-muted)",
              }}
            />
            <input
              className={styles.input}
              style={{ paddingLeft: 36 }}
              type="text"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Author Name"
              required
              readOnly // Make fields read-only
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            disabled // Make fields read-only
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <hr style={{ borderColor: "var(--border)", margin: "10px 0" }} />

        <div className={styles.inputGroup}>
          {" "}
          {/* Wrap section title to apply specific border/padding */}
          <div className={styles.sectionTitle}>
            <Palette size={14} />
            <span>Aesthetics</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Cover Color</label>
          <div className={styles.colorGrid}>
            {PRESET_COLORS.map((color) => (
              <div
                key={color}
                className={`${styles.colorSwatch} ${formData.coverColor === color ? styles.selected : ""}`}
                style={{ backgroundColor: color }}
                // onClick={() => handleChange("coverColor", color)} // Disable click
                title={color}
              />
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Icon (Lucide Name)</label>
          <input
            className={styles.input}
            type="text"
            value={formData.coverIcon || ""}
            onChange={(e) => handleChange("coverIcon", e.target.value)}
            placeholder="e.g. book-open, code, cpu"
            readOnly // Make fields read-only
          />
        </div>

        <hr style={{ borderColor: "var(--border)", margin: "10px 0" }} />

        <div className={styles.inputGroup}>
          {" "}
          {/* Wrap section title to apply specific border/padding */}
          <div className={styles.sectionTitle}>
            <Star size={14} />
            <span>Rating & Status</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.ratingContainer}>
            <label className={styles.label}>Rating (1-10)</label>
            <span className={styles.ratingValue}>{formData.rating}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            className={styles.rangeInput}
            value={formData.rating}
            onChange={(e) => handleChange("rating", parseInt(e.target.value))}
            disabled // Make fields read-only
          />
        </div>

        <div className={styles.toggleWrapper}>
          <div className={styles.toggleLabel}>
            <span className={styles.label} style={{ marginBottom: 2 }}>
              Published Status
            </span>
            <span
              className={`${styles.toggleStatus} ${formData.isPublished ? styles.statusPublished : styles.statusDraft}`}
            >
              {formData.isPublished ? "LIVE (VISIBLE)" : "DRAFT (HIDDEN)"}
            </span>
          </div>
          <div
            style={{
              cursor: "default", // Changed cursor
              color: formData.isPublished
                ? "var(--accent-primary)"
                : "var(--text-muted)",
            }}
            // onClick={() => handleChange("isPublished", !formData.isPublished)} // Disable click
          >
            {formData.isPublished ? (
              <ToggleRight size={32} />
            ) : (
              <ToggleLeft size={32} />
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Read Time (Legacy)</label>
          <div style={{ position: "relative" }}>
            <Clock
              size={16}
              style={{
                position: "absolute",
                left: 10,
                top: 12,
                color: "var(--text-muted)",
              }}
            />
            <input
              className={styles.input}
              style={{ paddingLeft: 36 }}
              type="text"
              value={formData.readTime || ""}
              onChange={(e) => handleChange("readTime", e.target.value)}
              placeholder="e.g. 15 min read"
              readOnly // Make fields read-only
            />
          </div>
        </div>
      </aside>

      {/* Main Stage: Content */}
      <main className={styles.mainStage}>
        <div className={styles.mainHeader}>
          {/* Back button */}
          <Link
            href="/admin/dashboard"
            className={`${styles.btn} ${styles.btnGhost}`}
          >
            <ChevronLeft size={16} />
            Back to Dashboard
          </Link>
          <div className={styles.mainHeaderContent}>
            <div className={styles.sectionTitle}>
              {" "}
              {/* No margin-left: auto here */}
              <FileText size={16} />
              <span>Content Editor</span>
            </div>

            <div className={styles.actions}>
              {/* onSave and onDelete buttons removed */}
              {/* {onDelete && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDelete}`}
                  onClick={() => onDelete(formData.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                <Save size={16} />
                {isDirty ? "Save Changes*" : "Save"}
              </button> */}
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Summary (Short)</label>
          <textarea
            className={styles.textarea}
            value={formData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="A brief overview of the book..."
            maxLength={300}
            readOnly // Make fields read-only
          />
          <div
            style={{
              textAlign: "right",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            {formData.summary.length}/300
          </div>
        </div>

        <div
          className={styles.inputGroup}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <label className={styles.label}>Full Content (Markdown)</label>
          <textarea
            className={`${styles.textarea} ${styles.markdownEditor}`}
            value={formData.fullContent || ""}
            onChange={(e) => handleChange("fullContent", e.target.value)}
            placeholder="# Chapter 1..."
            readOnly // Make fields read-only
          />
        </div>
      </main>
    </form>
  );
}
