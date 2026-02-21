import React from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Globe,
  LogOut,
  MoreHorizontal,
  Edit3,
  Trash2,
  FileText,
} from "lucide-react";
import styles from "./dashboard.module.css";

// --- Mock Data ---
interface BookEntry {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft";
  lastEdited: string;
}

const MOCK_BOOKS: BookEntry[] = [
  {
    id: "001",
    title: "The Pragmatic Programmer",
    category: "Engineering",
    status: "published",
    lastEdited: "2023-10-24",
  },
  {
    id: "002",
    title: "Dune",
    category: "Sci-Fi",
    status: "published",
    lastEdited: "2023-11-02",
  },
  {
    id: "003",
    title: "Atomic Habits",
    category: "Self-Help",
    status: "draft",
    lastEdited: "2023-11-15",
  },
  {
    id: "004",
    title: "Clean Code",
    category: "Engineering",
    status: "published",
    lastEdited: "2023-09-10",
  },
  {
    id: "005",
    title: "Neuromancer",
    category: "Cyberpunk",
    status: "draft",
    lastEdited: "2023-12-01",
  },
];

export const metadata = {
  title: "Admin Dashboard | Archives",
};

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.consoleFrame}>
        {/* Header */}
        <header className={styles.terminalHeader}>
          <div className={styles.terminalTitle}>ARCHIVES // DASHBOARD</div>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              <Globe size={14} />
              <span>Return to Library</span>
            </Link>
            <Link href="/api/auth/signout" className={styles.navLink}>
              <LogOut size={14} />
              <span>Sever Connection</span>
            </Link>
          </nav>
        </header>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="> query_database..."
              className={styles.searchInput}
            />
          </div>
          <button className={styles.addButton}>
            <Plus size={14} />
            <span>Initialize Entry</span>
          </button>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Last Edited</th>
                <th className={styles.th} style={{ textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKS.map((book) => (
                <tr key={book.id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.idCell}`}>
                    #{book.id}
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${
                        book.status === "published"
                          ? styles.badgePublished
                          : styles.badgeDraft
                      }`}
                    >
                      {book.status === "published" ? (
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
                    {book.lastEdited}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.actionBtn} ${styles.edit}`}
                        title="Edit Entry"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Delete Entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
