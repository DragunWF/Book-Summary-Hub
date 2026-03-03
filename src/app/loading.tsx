"use client";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        {/* Magic Spinner */}
        <div className={styles.magicSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.orbCenter}></div>
          <div className={styles.sparkle}></div>
          <div className={styles.sparkle}></div>
          <div className={styles.sparkle}></div>
        </div>

        <div>
          <p className={styles.loadingText}>Casting Spell...</p>
          <p className={styles.loadingSubtext}>SUMMONING KNOWLEDGE</p>
        </div>
      </div>
    </div>
  );
}
