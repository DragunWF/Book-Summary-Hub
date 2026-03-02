"use client";

import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";

interface DashboardToolbarProps {
  initialSearchQuery: string;
}

export default function DashboardToolbar({
  initialSearchQuery,
}: DashboardToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);

  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearch = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);

    if (
      event.type === "keydown" &&
      (event as React.KeyboardEvent).key === "Enter"
    ) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (value) {
        current.set("query", value);
        current.set("page", "1"); // Reset page to 1 on new search
      } else {
        current.delete("query");
      }
      router.push(`${pathname}?${current.toString()}`);
    }
  };

  const handleBlur = () => {
    // Only update URL on blur if the search term has actually changed
    // from what's currently in the URL, to avoid unnecessary navigation.
    const currentQuery = searchParams.get("query") || "";
    if (searchTerm !== currentQuery) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (searchTerm) {
        current.set("query", searchTerm);
        current.set("page", "1"); // Reset page to 1 on new search
      } else {
        current.delete("query");
      }
      router.push(`${pathname}?${current.toString()}`);
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="> query_database..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleSearch}
          onBlur={handleBlur}
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
