import Link from "next/link";
import { Globe, LogOut } from "lucide-react";
import styles from "./dashboard.module.css";
import { signOut } from "@/app/_lib/actions";
import {
  getPaginatedBookSummariesForAdmin,
  getFeaturedBookSummary,
} from "@/app/_lib/data-service";
import DashboardClient from "../../_components/Admin/Dashboard/DashboardClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page, 10)
      : 1;
  const query =
    typeof resolvedSearchParams.query === "string"
      ? resolvedSearchParams.query
      : "";
  const pageSize = 10;

  const { books, count } = await getPaginatedBookSummariesForAdmin(
    page,
    pageSize,
    query,
  );
  const totalPages = Math.ceil(count / pageSize) || 1;
  const featuredBook = await getFeaturedBookSummary();

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
            <form action={signOut} className={styles.navLink}>
              <button type="submit" className={styles.navLinkButton}>
                <LogOut size={14} />
                <span>Sever Connection</span>
              </button>
            </form>
          </nav>
        </header>

        {/* Client Components */}
        <DashboardClient
          books={books}
          currentPage={page}
          totalPages={totalPages}
          searchQuery={query}
          initialFeaturedBook={featuredBook}
        />
      </div>
    </div>
  );
}
