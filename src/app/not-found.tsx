import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page Not Found | Book Summary Hub",
};

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        {/* Visual Header */}
        <div className={styles.notFoundHeader}>
          <div className={styles.errorCode}>404</div>
          <div className={styles.brokenWand}>🪄</div>
          <h1 className={styles.notFoundTitle}>Spell Not Found</h1>
        </div>

        {/* Magic Circle Background Effect */}
        <div className={styles.magicCircle}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>

        {/* Description */}
        <p className={styles.notFoundDescription}>
          It seems the page you're looking for has vanished into the magical
          ether. The spell to summon this content has failed, or perhaps it
          never existed in this realm.
        </p>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Link href="/" className={styles.btnPrimary}>
            Return to the Spellbook
          </Link>
          <Link href="/about" className={styles.btnSecondary}>
            Learn About Our Library
          </Link>
        </div>
      </div>
    </div>
  );
}
