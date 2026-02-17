"use client";

import React, { useState, useEffect } from "react";
import NavHeader from "../NavHeader/NavHeader";
import styles from "./BookSummaryDetailPrototype.module.css";
import {
  ChevronLeft,
  Star,
  Clock,
  Calendar,
  Hash,
  MessageSquare,
  Send,
  User,
  Share2,
  Bookmark,
  Copy,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function BookSummaryDetailPrototype() {
  // --- STATE MANAGEMENT ---
  const [activeSection, setActiveSection] = useState("introduction");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Archmage_Dev",
      time: "2 hours ago",
      text: "The chapter on Dependency Inversion really clicked for me. The visual aid about the plugin architecture was key.",
    },
    {
      id: 2,
      user: "Junior_Warlock",
      time: "5 hours ago",
      text: "Is this strictly for OOP languages, or can I apply this to functional paradigms like Elixir?",
    },
  ]);

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
          // Offset for sticky header/sidebar
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

  // --- HANDLERS ---
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "DragunWF", // Current user context
      time: "Just now",
      text: commentText,
    };

    setComments([newCommentObj, ...comments]);
    setCommentText("");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header if needed, though scroll-margin-top in CSS handles this
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
        <aside className={styles.tocSidebar}>
          <div className={styles.tocTitle}>
            <BookOpen size={14} /> Contents
          </div>
          <nav>
            <ul className={styles.tocList}>
              <li>
                <a
                  className={`${styles.tocLink} ${activeSection === "introduction" ? styles.active : ""}`}
                  onClick={() => scrollToSection("introduction")}
                >
                  Introduction
                </a>
              </li>
              <li>
                <a
                  className={`${styles.tocLink} ${activeSection === "key-concepts" ? styles.active : ""}`}
                  onClick={() => scrollToSection("key-concepts")}
                >
                  Key Concepts
                </a>
              </li>
              <li>
                <a
                  className={`${styles.tocLink} ${activeSection === "component-principles" ? styles.active : ""}`}
                  onClick={() => scrollToSection("component-principles")}
                >
                  Component Principles
                </a>
              </li>
              <li>
                <a
                  className={`${styles.tocLink} ${activeSection === "conclusion" ? styles.active : ""}`}
                  onClick={() => scrollToSection("conclusion")}
                >
                  Conclusion
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className={styles.mainColumn}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <Link href="/">Library</Link> <span>/</span>
            <span style={{ color: "var(--accent-primary)" }}>
              Clean Architecture
            </span>
          </div>

          {/* Hero / Header */}
          <header className={styles.hero}>
            <h1 className={styles.title}>Clean Architecture</h1>
            <div className={styles.author}>by Robert C. Martin</div>

            <div className={styles.statsRow}>
              <div className={`${styles.statItem} ${styles.highlight}`}>
                <Star size={14} fill="currentColor" />
                <span>4.9 / 5.0</span>
              </div>
              <div className={styles.statItem}>
                <Clock size={14} />
                <span>25 min read</span>
              </div>
              <div className={styles.statItem}>
                <Calendar size={14} />
                <span>Oct 24, 2025</span>
              </div>
              <div className={styles.statItem}>
                <Hash size={14} />
                <span>Software Design</span>
              </div>
            </div>
          </header>

          {/* Rendered Markdown Content */}
          <article className={styles.markdownContent}>
            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                Software architecture is the art of drawing lines that I call
                &quot;boundaries.&quot; Those boundaries separate software
                elements from one another, and separate those that do not know
                from those that know. The ultimate goal of architecture is to
                minimize the human resources required to build and maintain the
                required system.
              </p>
              <blockquote>
                &quot;If you think good architecture is expensive, try bad
                architecture.&quot;
              </blockquote>
            </section>

            <section id="key-concepts">
              <h2>Key Concepts</h2>
              <p>
                At the core of Clean Architecture is the Dependency Rule. This
                rule says that source code dependencies can only point inwards.
                Nothing in an inner circle can know anything at all about
                something in an outer circle.
              </p>
              <ul>
                <li>
                  <strong>Entities:</strong> Enterprise-wide business rules.
                </li>
                <li>
                  <strong>Use Cases:</strong> Application-specific business
                  rules.
                </li>
                <li>
                  <strong>Interface Adapters:</strong> Controllers, Gateways,
                  and Presenters.
                </li>
                <li>
                  <strong>Frameworks & Drivers:</strong> The database, the web
                  framework, etc.
                </li>
              </ul>
            </section>

            <section id="component-principles">
              <h2>Component Principles</h2>
              <p>
                Components are units of deployment. They are the smallest
                entities that can be deployed as part of a system. In Java, they
                are jar files. In Ruby, they are gem files.
              </p>

              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span>java / interface-segregation.java</span>
                  <Copy size={14} style={{ cursor: "pointer" }} />
                </div>
                <div className={styles.codeBody}>
                  <span style={{ color: "#c678dd" }}>interface</span>{" "}
                  <span style={{ color: "#e5c07b" }}>IRepository</span> &#123;
                  <br />
                  &nbsp;&nbsp;
                  <span style={{ color: "#e5c07b" }}>User</span>{" "}
                  <span style={{ color: "#61afef" }}>getUser</span>(
                  <span style={{ color: "#d19a66" }}>int</span> id);
                  <br />
                  &#125;
                  <br />
                  <br />
                  <span style={{ color: "#c678dd" }}>class</span>{" "}
                  <span style={{ color: "#e5c07b" }}>DatabaseRepo</span>{" "}
                  <span style={{ color: "#c678dd" }}>implements</span>{" "}
                  <span style={{ color: "#e5c07b" }}>IRepository</span> &#123;
                  <br />
                  &nbsp;&nbsp;
                  <span style={{ color: "#7f848e" }}>
                    {"//"} Implementation details hidden
                  </span>
                  <br />
                  &#125;
                </div>
              </div>

              <p>
                The <strong>Stable Abstraction Principle</strong> states that a
                component should be as abstract as it is stable. It basically
                says that if a component is going to be hard to change, it
                better be abstract enough so that it can be extended easily.
              </p>
            </section>

            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Clean Architecture is not about following a strict template, but
                about understanding separation of concerns. By keeping the
                business logic agnostic of the UI and the Database, we create
                systems that are testable, maintainable, and robust.
              </p>
            </section>
          </article>

          {/* Comments */}
          <div className={styles.commentsSection}>
            <div className={styles.commentHeader}>
              <MessageSquare size={20} style={{ color: "#00FF41" }} />
              Arcane Discourse
            </div>

            <form onSubmit={handlePostComment}>
              <div className={styles.commentInputWrapper}>
                <textarea
                  className={styles.commentTextarea}
                  placeholder="Inscribe your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    type="submit"
                    className={styles.actionButton + " " + styles.btnPrimary}
                    style={{ width: "auto" }}
                    disabled={!commentText.trim()}
                  >
                    <Send size={14} /> Post
                  </button>
                </div>
              </div>
            </form>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {comments.map((comment) => (
                <div key={comment.id} style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--bg-highlight)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    <User size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        marginBottom: "0.25rem",
                        fontSize: "0.9rem",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {comment.user}{" "}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          fontWeight: 400,
                          marginLeft: "0.5rem",
                        }}
                      >
                        {comment.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {comment.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: META/ACTIONS --- */}
        <aside className={styles.metaSidebar}>
          {/* Cover Image */}
          <div className={styles.bookCoverCard}>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <Hash
                size={48}
                color="#00FF41"
                style={{ marginBottom: "1rem" }}
              />
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                CLEAN
                <br />
                ARCHI
                <br />
                TECTURE
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button className={`${styles.actionButton} ${styles.btnPrimary}`}>
              <Bookmark size={18} /> Save to Grimoire
            </button>
            <button className={`${styles.actionButton} ${styles.btnSecondary}`}>
              <Share2 size={18} /> Share Spell
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
