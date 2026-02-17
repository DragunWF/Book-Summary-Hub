"use client";

import { Library, ShieldCheck, Menu, X } from "lucide-react";
import styles from "./NavHeader.module.css";
import Link from "next/link";
import { useState } from "react";

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.navHeader}>
      <div className={styles.brand}>
        <Library className={styles.brandIcon} size={28} />
        <span>DragunWF Library</span>
      </div>

      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <span className={styles.navLink} onClick={() => setIsOpen(false)}>
          <Link href="/about">About</Link>
        </span>
        <span className={styles.navLink} onClick={() => setIsOpen(false)}>
          <Link
            href="https://dragunwf.vercel.app/"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            Mage&apos;s Website
          </Link>
        </span>
        <Link
          href="/admin/login"
          target="_blank"
          onClick={() => setIsOpen(false)}
        >
          <button className={styles.magePortalBtn}>
            <ShieldCheck size={16} />
            Mage&apos;s Portal
          </button>
        </Link>
      </div>
    </header>
  );
}
