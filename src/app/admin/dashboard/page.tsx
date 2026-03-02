import Link from "next/link";
import { Globe, LogOut } from "lucide-react";
import styles from "./dashboard.module.css";
import { signOut } from "@/app/_lib/actions";
import { getBookSummariesForAdmin } from "@/app/_lib/data-service";
import DashboardClient from "../../_components/Admin/Dashboard/DashboardClient";

export default async function AdminDashboard() {
  const books = await getBookSummariesForAdmin();

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
        <DashboardClient books={books} />
      </div>
    </div>
  );
}
