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
  Loader2,
} from "lucide-react";
import Book from "@/app/_interfaces/book";
import styles from "./BookForm.module.css";
import { useToast } from "@/app/_components/Toast/ToastProvider";

interface BookFormProps {
  initialData?: Book | null;
  onSave: (book: Book) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
}

const DEFAULT_BOOK: Book = {
  id: "", // Will be generated or passed
  title: "",
  author: "",
  coverColor: "#00FF41",
  category: "Technical",
  rating: 1,
  summary: "",
  fullContent: "",
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
  onSave,
  onDelete,
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

  const [formData, setFormData] = useState<Book>(
    initialData ? { ...DEFAULT_BOOK, ...initialData } : DEFAULT_BOOK,
  );
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { success, error } = useToast();

  const handleChange = (
    field: keyof Book,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsDirty(false);
      if (initialData?.id) {
        success(
          "Archive Updated",
          "Book summary has been updated successfully.",
        );
      } else {
        success(
          "Archive Created",
          "New book summary has been added to the vault.",
        );
      }
    } catch (err) {
      // Check if this is a Next.js redirect error (which means the operation succeeded)
      const isRedirectError =
        err instanceof Error &&
        (err.message.includes("NEXT_REDIRECT") ||
          (err as any).digest?.includes("REDIRECT"));

      if (isRedirectError) {
        // Show success toast before the redirect happens
        if (initialData?.id) {
          success(
            "Archive Updated",
            "Book summary has been updated successfully.",
          );
        } else {
          success(
            "Archive Created",
            "New book summary has been added to the vault.",
          );
        }
      } else {
        error(
          "Save Failed",
          "Could not save the book summary. Please try again.",
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !formData.id) return;
    if (confirm("Are you sure you want to delete this book summary?")) {
      setIsDeleting(true);
      try {
        await onDelete(formData.id);
        success(
          "Archive Destroyed",
          "Book summary has been permanently removed.",
        );
      } catch (err) {
        // Check if this is a Next.js redirect error (which means the operation succeeded)
        const isRedirectError =
          err instanceof Error &&
          (err.message.includes("NEXT_REDIRECT") ||
            (err as any).digest?.includes("REDIRECT"));

        if (isRedirectError) {
          // Show success toast before the redirect happens
          success(
            "Archive Destroyed",
            "Book summary has been permanently removed.",
          );
        } else {
          error("Deletion Failed", "Could not delete the book summary.");
        }
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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
              disabled={isSaving || isDeleting}
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
              disabled={isSaving || isDeleting}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            disabled={isSaving || isDeleting}
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
                style={{
                  backgroundColor: color,
                  pointerEvents: isSaving || isDeleting ? "none" : "auto",
                  opacity: isSaving || isDeleting ? 0.5 : 1,
                }}
                onClick={() => handleChange("coverColor", color)}
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
            disabled={isSaving || isDeleting}
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
            <label className={styles.label}>Rating (1-5)</label>
            <span className={styles.ratingValue}>{formData.rating}/5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            className={styles.rangeInput}
            value={formData.rating}
            onChange={(e) => handleChange("rating", parseInt(e.target.value))}
            disabled={isSaving || isDeleting}
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
              cursor: isSaving || isDeleting ? "not-allowed" : "pointer",
              color: formData.isPublished
                ? "var(--accent-primary)"
                : "var(--text-muted)",
              opacity: isSaving || isDeleting ? 0.5 : 1,
            }}
            onClick={() =>
              !isSaving &&
              !isDeleting &&
              handleChange("isPublished", !formData.isPublished)
            }
          >
            {formData.isPublished ? (
              <ToggleRight size={32} />
            ) : (
              <ToggleLeft size={32} />
            )}
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
            style={{
              pointerEvents: isSaving || isDeleting ? "none" : "auto",
              opacity: isSaving || isDeleting ? 0.5 : 1,
            }}
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
              {onDelete && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDelete}`}
                  onClick={handleDelete}
                  disabled={isSaving || isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 size={16} className={styles.spin} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={isSaving || isDeleting || (!isDirty && !!initialData)}
              >
                {isSaving ? (
                  <Loader2 size={16} className={styles.spin} />
                ) : (
                  <Save size={16} />
                )}
                {isSaving ? "Saving..." : isDirty ? "Save Changes*" : "Save"}
              </button>
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
            disabled={isSaving || isDeleting}
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
            disabled={isSaving || isDeleting}
          />
        </div>
      </main>
    </form>
  );
}
