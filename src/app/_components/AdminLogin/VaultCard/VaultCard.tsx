import { Shield } from "lucide-react";
import styles from "./VaultCard.module.css";
import React from "react";

interface VaultCardProps {
  error: boolean;
  success: boolean;
  isHoveringButton: boolean;
  children: React.ReactNode;
}

export default function VaultCard({
  error,
  success,
  isHoveringButton,
  children,
}: VaultCardProps) {
  return (
    <div
      className={`${styles.vaultCard} ${error ? styles.shake : ""} ${
        success ? styles.accessGranted : ""
      } ${isHoveringButton ? styles.cardGlow : ""}`}
    >
      {/* Header */}
      <div className={styles.vaultHeader}>
        <div className={styles.iconFrame}>
          <Shield size={24} className={styles.shieldIcon} />
        </div>
        <h1 className={styles.systemTitle}>SYSTEM ACCESS</h1>
        <div className={styles.statusLight}></div>
      </div>

      {children}

      <div className={styles.vaultFooter}>
        <span>SECURE CONNECTION</span>
        <span className={styles.version}>v4.0.2</span>
      </div>
    </div>
  );
}