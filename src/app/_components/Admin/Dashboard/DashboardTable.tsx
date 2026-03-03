"use client";

import { useTransition } from "react";
import {
  Edit3,
  Trash2,
  FileText,
  Zap,
  ChevronLeft,
  ChevronRight,
  FolderX,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";

interface DashboardTableProps {
  books: Book[];
  featuredBookId: string | null;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  loadingAction?: { id: string; type: "toggle-featured" | "delete" } | null;
}

export default function DashboardTable({
  books,
  featuredBookId,
  onToggleFeatured,
  onDelete,
  currentPage,
  totalPages,
  isLoading = false,
  loadingAction = null,
}: DashboardTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", newPage.toString());
    startTransition(() => {
      router.push(`?${current.toString()}`);
    });
  };
  if (!books.length && !isLoading && !isPending) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.emptyTableMessage}>
          <FolderX size={24} style={{ opacity: 0.3 }} />
          <span>[ SYSTEM_MESSAGE // NO_MATCHING_ARCHIVES_FOUND ]</span>
          <p>Adjust your search query or pagination settings.</p>
        </div>
      </div>
    );
  }

  const handleBookDeletion = async (bookId: string) => {
    if (window.confirm("Are you sure you want to delete this book summary?")) {
      await onDelete(bookId);
    }
  };

  // Combine loading states from search and pagination
  const isTableLoading = isLoading || isPending;

  return (
    <div className={styles.tableContainer} style={{ position: "relative" }}>
      {/* Loading Overlay */}
      {isTableLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <Loader2 size={32} className={styles.spinnerIcon} />
            <span className={styles.loadingText}>QUERYING DATABASE...</span>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Created At</th>
            <th className={styles.th} style={{ textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const isFeatured = book.id === featuredBookId;
            const isFeatureLoading =
              loadingAction?.id === book.id &&
              loadingAction?.type === "toggle-featured";
            const isDeleteLoading =
              loadingAction?.id === book.id && loadingAction?.type === "delete";

            return (
              <tr
                key={book.id}
                className={`${styles.tr} ${isFeatured ? styles.activeRow : ""}`}
                style={{
                  opacity: isFeatureLoading || isDeleteLoading ? 0.6 : 1,
                }}
              >
                <td className={`${styles.td} ${styles.idCell}`}>#{book.id}</td>
                <td className={styles.td}>
                  <span
                    className={`${styles.badge} ${
                      book.isPublished
                        ? styles.badgePublished
                        : styles.badgeDraft
                    }`}
                  >
                    {book.isPublished ? (
                      <>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "currentColor",
                          }}
                        />
                        PUBLISHED
                      </>
                    ) : (
                      <>
                        <FileText size={10} />
                        UNPUBLISHED
                      </>
                    )}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.titleCell}`}>
                  {book.title}
                </td>
                <td className={`${styles.td} ${styles.idCell}`}>
                  {book.category}
                </td>
                <td className={`${styles.td} ${styles.dateCell}`}>
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleDateString()
                    : "Unknown"}
                </td>
                <td className={styles.td} style={{ textAlign: "right" }}>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionBtn} ${styles.feature} ${isFeatured ? styles.featureActive : ""}`}
                      title={isFeatured ? "Deactivate Hero" : "Set as Hero"}
                      onClick={() => onToggleFeatured(book.id)}
                      disabled={isFeatureLoading}
                      style={{
                        opacity: isFeatureLoading ? 0.7 : 1,
                        cursor: isFeatureLoading ? "wait" : "pointer",
                      }}
                    >
                      {isFeatureLoading ? (
                        <Loader2 size={16} className={styles.spinnerIcon} />
                      ) : (
                        <Zap
                          size={16}
                          fill={isFeatured ? "currentColor" : "none"}
                        />
                      )}
                    </button>

                    <Link href={`/admin/dashboard/book-summary/${book.id}`}>
                      <button
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Edit Entry"
                        disabled={isFeatureLoading || isDeleteLoading}
                        style={{
                          opacity:
                            isFeatureLoading || isDeleteLoading ? 0.5 : 1,
                          cursor:
                            isFeatureLoading || isDeleteLoading
                              ? "not-allowed"
                              : "pointer",
                          pointerEvents:
                            isFeatureLoading || isDeleteLoading
                              ? "none"
                              : "auto",
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                    </Link>

                    <button
                      className={`${styles.actionBtn} ${styles.delete}`}
                      onClick={() => handleBookDeletion(book.id)}
                      title="Delete Entry"
                      disabled={isDeleteLoading}
                      style={{
                        opacity: isDeleteLoading ? 0.5 : 1,
                        cursor: isDeleteLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      {isDeleteLoading ? (
                        <Loader2 size={16} className={styles.spinnerIcon} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={styles.paginationContainer}>
        <button
          className={`${styles.paginationBtn} ${currentPage <= 1 ? styles.paginationDisabled : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
        >
          <ChevronLeft size={16} />
          <span>PREV</span>
        </button>
        <span className={styles.paginationInfo}>
          PAGE {currentPage} OF {totalPages}
        </span>
        <button
          className={`${styles.paginationBtn} ${currentPage >= totalPages ? styles.paginationDisabled : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isPending}
        >
          <span>NEXT</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
