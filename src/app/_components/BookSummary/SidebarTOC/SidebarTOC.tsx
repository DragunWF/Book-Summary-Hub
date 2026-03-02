"use client";

import React from "react";
import styles from "./SidebarTOC.module.css";
import { BookOpen } from "lucide-react";

export interface TocSection {
  id: string;
  label: string;
  level: number;
}

interface SidebarTOCProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
  sections: TocSection[];
}

export default function SidebarTOC({
  activeSection,
  onSectionClick,
  sections,
}: SidebarTOCProps) {
  if (!sections || sections.length === 0) {
    return null; // Do not render if there are no sections
  }

  return (
    <aside className={styles.tocSidebar}>
      <div className={styles.tocTitle}>
        <BookOpen size={14} /> Contents
      </div>
      <nav>
        <ul className={styles.tocList}>
          {sections.map((section) => (
            <li
              key={section.id}
              style={{
                paddingLeft: `${Math.max(0, section.level - 1) * 0.75}rem`,
              }}
            >
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
