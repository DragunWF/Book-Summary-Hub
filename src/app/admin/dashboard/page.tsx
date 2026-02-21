"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Globe,
  LogOut,
  Edit3,
  Trash2,
  FileText,
  Zap,
  X,
  Server,
  Database
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

export default function AdminDashboard() {
  const [featuredBookId, setFeaturedBookId] = useState<string | null>(null);

  // Derived state: find the full book object if an ID is set
  const featuredBook = featuredBookId 
    ? MOCK_BOOKS.find((b) => b.id === featuredBookId) 
    : null;

  const toggleFeatured = (id: string) => {
    if (featuredBookId === id) {
      setFeaturedBookId(null);
    } else {
      setFeaturedBookId(id);
    }
  };

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

        {/* Hero Slot (Primary Archive) */}
        <div className={styles.heroSlotContainer}>
          {featuredBook ? (
            <div className={styles.activeHeroSlot}>
              <div className={styles.heroContent}>
                <div className={styles.heroLabel}>
                  <div className={styles.pulsingDot} />
                  <span>PRIMARY_ARCHIVE_SLOT :: ACTIVE</span>
                </div>
                <h2 className={styles.heroTitle}>{featuredBook.title}</h2>
                <div className={styles.heroMeta}>
                  <span>ID: #{featuredBook.id}</span>
                  <span>//</span>
                  <span>CAT: {featuredBook.category.toUpperCase()}</span>
                </div>
              </div>
              <button 
                className={styles.severHeroBtn}
                onClick={() => setFeaturedBookId(null)}
                title="Deactivate Hero Slot"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className={styles.emptyHeroSlot}>
              <Zap size={24} style={{ opacity: 0.3 }} />
              <span>[ EMPTY_SLOT // AWAITING_POWER_SOURCE ]</span>
            </div>
          )}
        </div>

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
          
          <Link href="/admin/dashboard/book-summary/new" style={{ textDecoration: 'none' }}>
            <button className={styles.addButton}>
              <Plus size={14} />
              <span>Initialize Entry</span>
            </button>
          </Link>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
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
              {MOCK_BOOKS.map((book) => {
                const isFeatured = book.id === featuredBookId;
                
                return (
                  <tr 
                    key={book.id} 
                    className={`${styles.tr} ${isFeatured ? styles.activeRow : ''}`}
                  >
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
                    <td className={styles.td} style={{ textAlign: "right" }}>
                      <div className={styles.actions}>
                         <button
                          className={`${styles.actionBtn} ${styles.feature} ${isFeatured ? styles.featureActive : ''}`}
                          title={isFeatured ? "Deactivate Hero" : "Set as Hero"}
                          onClick={() => toggleFeatured(book.id)}
                        >
                          <Zap size={16} fill={isFeatured ? "currentColor" : "none"} />
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
        </div>
      </div>
    </div>
  );
}