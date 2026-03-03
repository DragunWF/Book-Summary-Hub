import { Zap, X, Edit3 } from "lucide-react";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import Book from "@/app/_interfaces/book";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/app/_components/Toast/ToastProvider";

interface DashboardHeroProps {
  featuredBook: Book | null | undefined;
  onClear: () => Promise<void>;
}

export default function DashboardHero({
  featuredBook,
  onClear,
}: DashboardHeroProps) {
  const { success, error } = useToast();
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    setIsClearing(true);
    try {
      await onClear();
      success("Hero Slot Deactivated", "Featured book has been cleared.");
    } catch (err) {
      error("Failed to Deactivate", "Could not clear the featured book slot.");
    } finally {
      setIsClearing(false);
    }
  };

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
              onClick={handleClear}
              disabled={isClearing}
              title="Deactivate Hero Slot"
              style={{
                opacity: isClearing ? 0.5 : 1,
                cursor: isClearing ? "not-allowed" : "pointer",
              }}
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
