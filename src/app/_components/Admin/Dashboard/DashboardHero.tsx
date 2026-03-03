import { Zap, X, Edit3 } from "lucide-react";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";
import Link from "next/link";

interface DashboardHeroProps {
  featuredBook: Book | null | undefined;
  onClear: () => void;
}

export default function DashboardHero({
  featuredBook,
  onClear,
}: DashboardHeroProps) {
  return (
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
              <span>{"//"}</span>
              <span>CAT: {featuredBook.category.toUpperCase()}</span>
            </div>
          </div>
          <div className={styles.heroActions}>
            <Link href={`/admin/dashboard/book-summary/${featuredBook.id}`}>
              <button
                className={styles.heroActionBtn}
                title="Edit Featured Book"
              >
                <Edit3 size={16} />
              </button>
            </Link>
            <button
              className={styles.heroActionBtn}
              onClick={onClear}
              title="Deactivate Hero Slot"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyHeroSlot}>
          <Zap size={24} style={{ opacity: 0.3 }} />
          <span>[ EMPTY_SLOT // AWAITING_POWER_SOURCE ]</span>
        </div>
      )}
    </div>
  );
}
