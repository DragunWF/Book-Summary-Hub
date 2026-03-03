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
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";
import { deleteBookSummaryAction } from "@/app/_lib/actions";

interface DashboardTableProps {
  books: Book[];
  featuredBookId: string | null;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  loadingActionId?: string | null;
}

export default function DashboardTable({
  books,
  featuredBookId,
  onToggleFeatured,
  onDelete,
  currentPage,
  totalPages,
  isLoading = false,
  loadingActionId = null,
}: DashboardTableProps) {
  if (!books.length && !isLoading) {
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

  return (
    <div className={styles.tableContainer} style={{ position: "relative" }}>
      {/* Loading Overlay */}
      {isLoading && (
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
            const isFeaturedLoading = loadingActionId === book.id;

            return (
              <tr
                key={book.id}
                className={`${styles.tr} ${isFeatured ? styles.activeRow : ""}`}
                style={{ opacity: isFeaturedLoading ? 0.6 : 1 }}
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
                      disabled={isFeaturedLoading}
                      style={{
                        opacity: isFeaturedLoading ? 0.7 : 1,
                        cursor: isFeaturedLoading ? "wait" : "pointer",
                      }}
                    >
                      {isFeaturedLoading ? (
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
                        disabled={isFeaturedLoading}
                        style={{
                          opacity: isFeaturedLoading ? 0.5 : 1,
                          cursor: isFeaturedLoading ? "not-allowed" : "pointer",
                          pointerEvents: isFeaturedLoading ? "none" : "auto",
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                    </Link>

                    <button
                      className={`${styles.actionBtn} ${styles.delete}`}
                      onClick={() => handleBookDeletion(book.id)}
                      title="Delete Entry"
                      disabled={isFeaturedLoading}
                      style={{
                        opacity: isFeaturedLoading ? 0.5 : 1,
                        cursor: isFeaturedLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      {isFeaturedLoading ? (
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
        <Link
          href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
          className={`${styles.paginationBtn} ${currentPage <= 1 ? styles.paginationDisabled : ""}`}
        >
          <ChevronLeft size={16} />
          <span>PREV</span>
        </Link>
        <span className={styles.paginationInfo}>
          PAGE {currentPage} OF {totalPages}
        </span>
        <Link
          href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
          className={`${styles.paginationBtn} ${currentPage >= totalPages ? styles.paginationDisabled : ""}`}
        >
          <span>NEXT</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
