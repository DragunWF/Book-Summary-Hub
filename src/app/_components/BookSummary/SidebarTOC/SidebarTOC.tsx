"use client";

import React, { useMemo } from "react";
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
  const processedSections = useMemo(() => {
    const result = [];
    const levelStack: number[] = [];

    for (const section of sections) {
      // Pop levels from stack that are greater than or equal to current section level
      while (
        levelStack.length > 0 &&
        levelStack[levelStack.length - 1] >= section.level
      ) {
        levelStack.pop();
      }
      // Push current level to stack
      levelStack.push(section.level);

      // The indentation level is simply the index in the stack
      result.push({
        ...section,
        indentLevel: Math.max(0, levelStack.length - 1),
      });
    }

    return result;
  }, [sections]);

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
          {processedSections.map((section) => (
            <li
              key={section.id}
              style={{
                paddingLeft: `${section.indentLevel * 0.75}rem`,
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
