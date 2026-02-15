import { Library, ShieldCheck } from "lucide-react";
import styles from "./NavHeader.module.css";

export default function NavHeader() {
  return (
    <header className={styles.navHeader}>
      <div className={styles.brand}>
        <Library className={styles.brandIcon} size={28} />
        <span>DragunWF Library</span>
      </div>
      <div className={styles.navLinks}>
        <span className={styles.navLink}>Mage&apos;s Website</span>
        <span className={styles.navLink}>About</span>
        <button className={styles.magePortalBtn}>
          <ShieldCheck size={16} />
          Mage&apos;s Portal
        </button>
      </div>
    </header>
  );
}
