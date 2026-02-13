"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Star,
  Clock,
  Calendar,
  BookOpen,
  Hash,
  MessageSquare,
  Send,
  User,
  Share2,
  Bookmark,
} from "lucide-react";

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
  const handlePostComment = (e) => {
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Instant update for UX
    }
  };

  return (
    <div className="page-wrapper">
      <style>{`
        /* --- GLOBAL & FONTS --- */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&display=swap');

        :root {
          --bg-primary: #09090b;
          --bg-secondary: #18181b; /* Zinc 900 */
          --bg-tertiary: #27272a;  /* Zinc 800 */
          --accent-green: #00FF41;
          --accent-green-dim: rgba(0, 255, 65, 0.1);
          --text-main: #e4e4e7;    /* Zinc 200 */
          --text-muted: #a1a1aa;   /* Zinc 400 */
          --border: #27272a;
          
          --font-ui: 'Inter', sans-serif;
          --font-prose: 'Merriweather', serif;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          /* Removed background from body to ensure wrapper catches it */
          font-family: var(--font-ui);
          -webkit-font-smoothing: antialiased;
        }

        /* --- LAYOUT UTILS --- */
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-primary); /* Moved BG here */
          color: var(--text-main);             /* Moved Color here */
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
        }

        /* --- NAVIGATION --- */
        .nav-bar {
          height: 64px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          background: rgba(9, 9, 11, 0.8);
          backdrop-filter: blur(8px);
          z-index: 50;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: var(--accent-green);
        }

        /* --- BREADCRUMBS --- */
        .breadcrumbs {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .breadcrumbs span { color: var(--text-main); }
        .breadcrumbs .separator { margin: 0 0.5rem; color: var(--border); }

        /* --- HERO SECTION --- */
        .hero-section {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
          align-items: end;
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }
        }

        .book-cover {
          width: 100%;
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
          border-radius: 8px;
          border: 1px solid var(--border);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 
                      0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .book-cover::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 6px;
          background: rgba(255,255,255,0.1);
          box-shadow: 2px 0 5px rgba(0,0,0,0.5);
        }
        
        .book-cover-content {
          text-align: center;
          padding: 1rem;
        }
        
        .book-cover-icon {
          color: var(--accent-green);
          margin-bottom: 0.5rem;
        }
        
        .book-cover-title {
          font-family: var(--font-prose);
          font-weight: 700;
          font-size: 1.2rem;
          line-height: 1.3;
          color: var(--text-main);
        }

        .hero-meta {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 1rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
        }
        
        .hero-author {
          font-size: 1.25rem;
          color: var(--text-muted);
          font-weight: 400;
          margin: 0;
        }

        .mage-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .stat-value {
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .stat-value.glow {
          color: var(--accent-green);
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
        }

        /* --- MAIN CONTENT LAYOUT --- */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 4rem;
          padding-bottom: 4rem;
          position: relative;
        }

        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .toc-container {
            display: none;
          }
        }

        /* --- PROSE STYLING (Markdown Body) --- */
        .markdown-body {
          font-family: var(--font-prose);
          font-size: 1.125rem;
          line-height: 1.8;
          color: #d4d4d8;
          max-width: 65ch;
        }

        .markdown-body h2 {
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 1.75rem;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
          scroll-margin-top: 100px;
        }

        .markdown-body p { margin-bottom: 1.5rem; }

        .markdown-body blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          background: var(--bg-secondary);
          border-left: 3px solid var(--accent-green);
          font-style: italic;
          color: var(--text-main);
          border-radius: 0 4px 4px 0;
        }

        .markdown-body strong {
          color: white;
          font-weight: 700;
        }

        .markdown-body ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-body li {
          margin-bottom: 0.5rem;
        }

        .markdown-body code {
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 0.85em;
          background: rgba(255,255,255,0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          color: var(--accent-green);
        }

        .code-block {
          background: #000;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1rem;
          font-family: monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          color: #a1a1aa;
        }

        /* --- TABLE OF CONTENTS --- */
        .toc-sticky {
          position: sticky;
          top: 120px;
        }

        .toc-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-left: 1px solid var(--border);
        }

        .toc-item {
          margin: 0;
        }

        .toc-link {
          display: block;
          padding: 0.5rem 0 0.5rem 1.5rem;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          border-left: 2px solid transparent;
          margin-left: -1px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .toc-link:hover {
          color: var(--text-main);
        }

        .toc-link.active {
          color: var(--accent-green);
          border-left-color: var(--accent-green);
          background: linear-gradient(90deg, var(--accent-green-dim) 0%, transparent 100%);
        }

        /* --- COMMENTS SECTION --- */
        .comments-section {
          max-width: 65ch;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .comment-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .comment-item {
          display: flex;
          gap: 1rem;
        }

        .avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .comment-content {
          flex: 1;
        }

        .comment-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .comment-user {
          font-weight: 600;
          color: var(--text-main);
          font-size: 0.9rem;
        }

        .comment-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .comment-text {
          font-size: 0.95rem;
          color: #d4d4d8;
          line-height: 1.5;
        }

        /* Input Area */
        .comment-input-area {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
          position: relative;
        }

        .comment-textarea {
          width: 100%;
          background: transparent;
          border: none;
          color: white;
          font-family: var(--font-ui);
          font-size: 0.95rem;
          resize: none;
          min-height: 80px;
          outline: none;
        }

        .comment-textarea::placeholder {
          color: var(--text-muted);
        }

        .comment-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }

        .btn-primary {
          background: var(--accent-green);
          color: black;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }
        
        .btn-primary:disabled {
          background: var(--bg-tertiary);
          color: var(--text-muted);
          cursor: not-allowed;
        }

      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className="nav-bar">
        <div className="container nav-content">
          <a href="#" className="back-link">
            <ChevronLeft size={16} />
            Back to Library
          </a>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Share2 size={18} color="#a1a1aa" style={{ cursor: "pointer" }} />
            <Bookmark size={18} color="#a1a1aa" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </nav>

      <div className="container">
        {/* --- BREADCRUMBS --- */}
        <div className="breadcrumbs">
          Home <span className="separator">/</span>
          Technical <span className="separator">/</span>
          <span>Clean Architecture</span>
        </div>

        {/* --- HERO SECTION --- */}
        <header className="hero-section">
          {/* Left: Cover */}
          <div className="book-cover">
            <div className="book-cover-content">
              <div className="book-cover-icon">
                <Hash size={48} />
              </div>
              <div className="book-cover-title">
                CLEAN
                <br />
                ARCHI
                <br />
                TECTURE
              </div>
            </div>
          </div>

          {/* Right: Metadata */}
          <div className="hero-meta">
            <div>
              <h1 className="hero-title">Clean Architecture</h1>
              <h2 className="hero-author">by Robert C. Martin</h2>
            </div>

            <div className="mage-stats-grid">
              <div className="stat-card">
                <span className="stat-label">Rating</span>
                <span className="stat-value glow">
                  <Star size={14} fill="#00FF41" stroke="#00FF41" /> 4.9 / 5.0
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Status</span>
                <span className="stat-value" style={{ color: "#e4e4e7" }}>
                  <BookOpen size={14} /> Assimilated
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Date Read</span>
                <span className="stat-value" style={{ color: "#e4e4e7" }}>
                  <Calendar size={14} /> Oct 24, 2025
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Time</span>
                <span className="stat-value" style={{ color: "#e4e4e7" }}>
                  <Clock size={14} /> 25 min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* --- CONTENT & TOC GRID --- */}
        <main className="content-grid">
          {/* LEFT: Markdown Body */}
          <article className="markdown-body">
            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                Software architecture is the art of drawing lines that I call
                "boundaries." Those boundaries separate software elements from
                one another, and separate those that do not know from those that
                know. The ultimate goal of architecture is to minimize the human
                resources required to build and maintain the required system.
              </p>
              <blockquote>
                "If you think good architecture is expensive, try bad
                architecture."
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
              <div className="code-block">
                // Example of Dependency Inversion
                <br />
                interface IRepository &#123;
                <br />
                &nbsp;&nbsp;User getUser(int id);
                <br />
                &#125;
                <br />
                <br />
                class DatabaseRepo implements IRepository &#123;
                <br />
                &nbsp;&nbsp;// Implementation details hidden
                <br />
                &#125;
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

            {/* --- COMMENTS SECTION (Inside content column for mobile flow) --- */}
            <div className="comments-section">
              <div className="section-header">
                <MessageSquare
                  size={20}
                  className="text-accent"
                  style={{ color: "#00FF41" }}
                />
                Community Insights
              </div>

              {/* Comment Input */}
              <form
                onSubmit={handlePostComment}
                style={{ marginBottom: "2rem" }}
              >
                <div className="comment-input-area">
                  <textarea
                    className="comment-textarea"
                    placeholder="Add your insight to the grimoire..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="comment-actions">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={!commentText.trim()}
                    >
                      <Send size={14} /> Post Comment
                    </button>
                  </div>
                </div>
              </form>

              {/* List */}
              <div className="comment-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="avatar-placeholder">
                      <User size={20} />
                    </div>
                    <div className="comment-content">
                      <div className="comment-meta">
                        <span className="comment-user">{comment.user}</span>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* RIGHT: Sticky Sidebar */}
          <aside className="toc-container">
            <div className="toc-sticky">
              <div className="toc-title">On This Page</div>
              <ul className="toc-list">
                <li className="toc-item">
                  <div
                    className={`toc-link ${activeSection === "introduction" ? "active" : ""}`}
                    onClick={() => scrollToSection("introduction")}
                  >
                    Introduction
                  </div>
                </li>
                <li className="toc-item">
                  <div
                    className={`toc-link ${activeSection === "key-concepts" ? "active" : ""}`}
                    onClick={() => scrollToSection("key-concepts")}
                  >
                    Key Concepts
                  </div>
                </li>
                <li className="toc-item">
                  <div
                    className={`toc-link ${activeSection === "component-principles" ? "active" : ""}`}
                    onClick={() => scrollToSection("component-principles")}
                  >
                    Component Principles
                  </div>
                </li>
                <li className="toc-item">
                  <div
                    className={`toc-link ${activeSection === "conclusion" ? "active" : ""}`}
                    onClick={() => scrollToSection("conclusion")}
                  >
                    Conclusion
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
