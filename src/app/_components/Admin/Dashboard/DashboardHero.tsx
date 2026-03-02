import { Zap, X } from "lucide-react";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";

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
              <span>ID: #{featuredBook.id.split("-")[0]}</span>
              <span>{"//"}</span>
              <span>CAT: {featuredBook.category.toUpperCase()}</span>
            </div>
          </div>
          <button
            className={styles.severHeroBtn}
            onClick={onClear}
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
  );
}
