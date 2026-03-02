import {
  Edit3,
  Trash2,
  FileText,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";

interface DashboardTableProps {
  books: Book[];
  featuredBookId: string | null;
  onToggleFeatured: (id: string) => void;
  currentPage: number;
  totalPages: number;
}

export default function DashboardTable({
  books,
  featuredBookId,
  onToggleFeatured,
  currentPage,
  totalPages,
}: DashboardTableProps) {
  return (
    <div className={styles.tableContainer}>
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

            return (
              <tr
                key={book.id}
                className={`${styles.tr} ${isFeatured ? styles.activeRow : ""}`}
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
                        LIVE
                      </>
                    ) : (
                      <>
                        <FileText size={10} />
                        DRAFT
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
                    >
                      <Zap
                        size={16}
                        fill={isFeatured ? "currentColor" : "none"}
                      />
                    </button>

                    <Link href={`/admin/dashboard/book-summary/${book.id}`}>
                      <button
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Edit Entry"
                      >
                        <Edit3 size={16} />
                      </button>
                    </Link>

                    <button
                      className={`${styles.actionBtn} ${styles.delete}`}
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
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
