"use client";

import { useState, useEffect } from "react";
import styles from "./BookSummary.module.css";
import NavHeader from "../NavHeader/NavHeader";
import SidebarTOC, { TocSection } from "./SidebarTOC/SidebarTOC";
import SidebarMeta from "./SidebarMeta/SidebarMeta";
import BookHero from "./BookHero/BookHero";
import BookMarkdownContent from "./BookMarkdownContent/BookMarkdownContent";
import CommentsSection from "./CommentsSection/CommentsSection";
import Book from "@/app/_interfaces/book";

export default function BookSummaryView({ book }: { book: Book }) {
  const [activeSection, setActiveSection] = useState("");
  const [sections, setSections] = useState<TocSection[]>([]);

  // Extract headers for TOC
  useEffect(() => {
    // Give the DOM a tiny tick to render the markdown if it was just injected
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(
        "article h1, article h2, article h3",
      );
      const newSections = Array.from(elements)
        .map((el) => ({
          id: el.id,
          label: el.textContent || "",
          level: parseInt(el.tagName.substring(1), 10),
        }))
        .filter((section) => section.id); // Filter out any elements without an ID

      setSections(newSections);
      if (newSections.length > 0 && !activeSection) {
        setActiveSection(newSections[0].id);
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [book.fullContent, activeSection]);

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;

      // Find the section currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset for sticky header/sidebar (trigger zone around 150px from top)
          if (rect.top <= 150) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount to set initial active state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

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
          sections={sections}
        />

        {/* --- MAIN CONTENT --- */}
        <main className={styles.mainColumn}>
          <BookHero book={book} />
          <BookMarkdownContent book={book} />
          <CommentsSection />
        </main>

        {/* --- RIGHT SIDEBAR: META/ACTIONS --- */}
        <SidebarMeta book={book} />
      </div>
    </div>
  );
}
