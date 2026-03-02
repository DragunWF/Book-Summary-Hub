"use client";

import React from "react";
import styles from "./BookMarkdownContent.module.css";
import Book from "@/app/_interfaces/book";

export default function BookMarkdownContent({ book }: { book: Book }) {
  return (
    <article className={styles.markdownContent}>
      <section id="introduction">
        <h2>Summary</h2>
        <p>{book.summary}</p>
      </section>
    </article>
  );
}
