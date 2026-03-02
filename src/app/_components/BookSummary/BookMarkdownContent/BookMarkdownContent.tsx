"use client";

import styles from "./BookMarkdownContent.module.css";
import Book from "@/app/_interfaces/book";
import MarkdownRenderer from "@/app/_lib/markdown-renderer";

export default function BookMarkdownContent({ book }: { book: Book }) {
  return (
    <article className={styles.markdownContent}>
      {book.fullContent ? (
        <MarkdownRenderer content={book.fullContent} />
      ) : (
        <section id="introduction">
          <h2>Summary</h2>
          <p>{book.summary}</p>
        </section>
      )}
    </article>
  );
}
