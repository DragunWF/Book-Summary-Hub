"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      {/* Magical glow effects */}
      <div className={styles.magicalGlow}></div>
      <div className={styles.magicalGlow}></div>

      <div className={styles.errorContent}>
        {/* Error Header */}
        <div className={styles.errorHeader}>
          <div className={styles.errorIcon}>⚡</div>
          <h1 className={styles.errorTitle}>Spell Disrupted</h1>
          <p className={styles.errorSubtitle}>
            An Unexpected Magic Surge Occurred
          </p>
        </div>

        {/* Error Message */}
        <p className={styles.errorDescription}>
          It appears a magical overflow has disrupted the spell we were casting.
          Our magical council is being notified of this anomaly.
        </p>

        {/* Error Details (shown in development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className={styles.errorBox}>
            <div className={styles.errorBoxTitle}>Error Details</div>
            <p className={styles.errorMessage}>{error.message}</p>
            {error.digest && (
              <p className={styles.errorMessage} style={{ marginTop: "8px" }}>
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button onClick={() => reset()} className={styles.btnPrimary}>
            Attempt to Reignite the Spell
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className={styles.btnSecondary}
          >
            Return to the Spellbook
          </button>
        </div>
      </div>
    </div>
  );
}
