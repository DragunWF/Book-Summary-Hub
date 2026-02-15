import { Zap, ChevronRight, Feather } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <Zap size={14} fill="currentColor" />
          Featured Summary
        </div>
        <h1 className={styles.heroTitle}>The Pragmatic Programmer</h1>
        <p className={styles.heroDescription}>
          From coding to career development, this book is the cornerstone of
          modern software craftsmanship. Learn why you should be a &quot;tracer bullet&quot;
          developer and how to avoid &quot;broken windows.&quot;
        </p>
        <button className={styles.btnPrimary}>
          Read Summary <ChevronRight size={18} />
        </button>
      </div>
      <div className={styles.heroVisual}>
        {/* CSS 3D Book representation */}
        <div className={styles.heroBookCover}>
          <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}>
            The Pragmatic Programmer
          </h3>
          <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Hunt & Thomas
          </span>
          <Feather
            size={40}
            color="#3b82f6"
            style={{ marginTop: "30px", opacity: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
