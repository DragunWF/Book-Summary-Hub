import { Library, ShieldCheck } from "lucide-react";
import styles from "./NavHeader.module.css";
import Link from "next/link";

export default function NavHeader() {
  return (
    <header className={styles.navHeader}>
      <div className={styles.brand}>
        <Library className={styles.brandIcon} size={28} />
        <span>DragunWF Library</span>
      </div>
      <div className={styles.navLinks}>
        <span className={styles.navLink}>
          <Link href="/about">About</Link>
        </span>
        <span className={styles.navLink}>
          <Link
            href="https://dragunwf.vercel.app/"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            Mage&apos;s Website
          </Link>
        </span>
        <Link href="/admin/login" target="_blank">
          <button className={styles.magePortalBtn}>
            <ShieldCheck size={16} />
            Mage&apos;s Portal
          </button>
        </Link>
      </div>
    </header>
  );
}
