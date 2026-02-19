"use client";

import React from "react";
import styles from "./SidebarMeta.module.css";
import { Hash, Bookmark, Share2 } from "lucide-react";

export default function SidebarMeta() {
  return (
    <aside className={styles.metaSidebar}>
      {/* Cover Image */}
      <div className={styles.bookCoverCard}>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Hash
            size={48}
            color="#00FF41"
            style={{ marginBottom: "1rem" }}
          />
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 700,
              fontSize: "1.5rem",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            CLEAN
            <br />
            ARCHI
            <br />
            TECTURE
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button className={`${styles.actionButton} ${styles.btnPrimary}`}>
          <Bookmark size={18} /> Save to Grimoire
        </button>
        <button className={`${styles.actionButton} ${styles.btnSecondary}`}>
          <Share2 size={18} /> Share Spell
        </button>
      </div>
    </aside>
  );
}
