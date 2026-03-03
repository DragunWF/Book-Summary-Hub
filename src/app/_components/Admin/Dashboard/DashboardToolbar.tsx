"use client";

import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";

interface DashboardToolbarProps {
  initialSearchQuery: string;
  onNavigate?: (isPending: boolean) => void;
}

export default function DashboardToolbar({
  initialSearchQuery,
  onNavigate,
}: DashboardToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  // Notify parent component when navigation starts
  useEffect(() => {
    onNavigate?.(isPending);
  }, [isPending, onNavigate]);

  const executeSearch = (term: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (term) {
      current.set("query", term);
      current.set("page", "1"); // Reset page to 1 on new search
    } else {
      current.delete("query");
    }
    startTransition(() => {
      router.push(`${pathname}?${current.toString()}`);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearch(searchTerm);
    }
  };

  const handleSearchButtonClick = () => {
    executeSearch(searchTerm);
  };

  const handleBlur = () => {
    // Only update URL on blur if the search term has actually changed
    // from what's currently in the URL, to avoid unnecessary navigation.
    const currentQuery = searchParams.get("query") || "";
    if (searchTerm !== currentQuery) {
      executeSearch(searchTerm);
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <button
          className={styles.searchButton}
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
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
