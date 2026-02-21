"use client";

import { useState, useEffect } from "react";
import styles from "./BookSummary.module.css";
import NavHeader from "../NavHeader/NavHeader";
import SidebarTOC from "./SidebarTOC/SidebarTOC";
import SidebarMeta from "./SidebarMeta/SidebarMeta";
import BookHero from "./BookHero/BookHero";
import BookMarkdownContent from "./BookMarkdownContent/BookMarkdownContent";
import CommentsSection from "./CommentsSection/CommentsSection";

export default function BookSummaryView() {
  const [activeSection, setActiveSection] = useState("introduction");

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction",
        "key-concepts",
        "component-principles",
        "conclusion",
      ];

      // Find the section currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset for sticky header/sidebar (approx 300px trigger zone)
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <NavHeader />
      </div>

      <div className={styles.spellbookGrid}>
        {/* --- LEFT SIDEBAR: TOC --- */}
        <SidebarTOC
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        {/* --- MAIN CONTENT --- */}
        <main className={styles.mainColumn}>
          <BookHero />
          <BookMarkdownContent />
          <CommentsSection />
        </main>

        {/* --- RIGHT SIDEBAR: META/ACTIONS --- */}
        <SidebarMeta />
      </div>
    </div>
  );
}
