import { Search, Plus } from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/dashboard/dashboard.module.css";

export default function DashboardToolbar() {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="> query_database..."
          className={styles.searchInput}
        />
      </div>

      <Link
        href="/admin/dashboard/book-summary/new"
        style={{ textDecoration: "none" }}
      >
        <button className={styles.addButton}>
          <Plus size={14} />
          <span>Initialize Entry</span>
        </button>
      </Link>
    </div>
  );
}
