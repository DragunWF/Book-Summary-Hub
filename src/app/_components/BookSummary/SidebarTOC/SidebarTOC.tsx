"use client";

import React from "react";
import styles from "./SidebarTOC.module.css";
import { BookOpen } from "lucide-react";

interface SidebarTOCProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function SidebarTOC({ activeSection, onSectionClick }: SidebarTOCProps) {
  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "key-concepts", label: "Key Concepts" },
    { id: "component-principles", label: "Component Principles" },
    { id: "conclusion", label: "Conclusion" },
  ];

  return (
    <aside className={styles.tocSidebar}>
      <div className={styles.tocTitle}>
        <BookOpen size={14} /> Contents
      </div>
      <nav>
        <ul className={styles.tocList}>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                className={`${styles.tocLink} ${
                  activeSection === section.id ? styles.active : ""
                }`}
                onClick={() => onSectionClick(section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
