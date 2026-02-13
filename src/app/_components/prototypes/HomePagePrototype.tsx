"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Star,
  Clock,
  Filter,
  Zap,
  Library,
  Feather,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

/**
 * MOCK DATA
 * Represents the content from your Obsidian vault.
 */
interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string; // Placeholder for cover image
  category:
    | "Technical"
    | "Self-Improvement"
    | "Fiction"
    | "Philosophy"
    | "Business";
  rating: number; // 1-10
  status: "Completed" | "In Progress" | "To Read";
  readTime: string;
  summary: string;
}

const MOCK_SUMMARIES: Book[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverColor: "#2563eb",
    category: "Technical",
    rating: 10,
    status: "Completed",
    readTime: "12 min read",
    summary:
      "The quintessential guide to software craftsmanship. Focuses on pragmatic approaches to coding, debugging, and career development.",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverColor: "#f59e0b",
    category: "Self-Improvement",
    rating: 9,
    status: "Completed",
    readTime: "8 min read",
    summary:
      "Small changes, remarkable results. A comprehensive system for building good habits and breaking bad ones.",
  },
  {
    id: "3",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverColor: "#b91c1c",
    category: "Philosophy",
    rating: 10,
    status: "Completed",
    readTime: "15 min read",
    summary:
      "Private notes of a Roman Emperor. A timeless study in Stoicism, resilience, and maintaining a rational mind.",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverColor: "#7c3aed",
    category: "Fiction",
    rating: 9,
    status: "In Progress",
    readTime: "N/A",
    summary:
      "A lone astronaut must save the earth from disaster. Hard sci-fi with a focus on problem-solving and science.",
  },
  {
    id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    coverColor: "#059669",
    category: "Self-Improvement",
    rating: 8,
    status: "Completed",
    readTime: "10 min read",
    summary:
      "Rules for focused success in a distracted world. How to master hard things and produce at an elite level.",
  },
  {
    id: "6",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    coverColor: "#db2777",
    category: "Technical",
    rating: 8,
    status: "To Read",
    readTime: "20 min read",
    summary:
      "A craftsman's guide to software structure and design. Essential for scalable systems.",
  },
];

/**
 * STYLES
 * In a real Next.js app, these would be in .module.css files.
 * Example: .hero-section would be styles.heroSection
 */
const STYLES = `
  /* Variables - Deep Dark/Zinc Palette */
  :root {
    --bg-deep: #09090b;   /* Zinc 950 */
    --bg-base: #18181b;   /* Zinc 900 */
    --bg-surface: #27272a; /* Zinc 800 */
    --bg-highlight: #3f3f46; /* Zinc 700 */
    
    --text-primary: #f4f4f5; /* Zinc 100 */
    --text-secondary: #a1a1aa; /* Zinc 400 */
    --text-muted: #71717a;     /* Zinc 500 */
    
    --accent-primary: #10b981; /* Emerald 500 - Mage Green */
    --accent-glow: rgba(16, 185, 129, 0.4);
    --accent-hover: #34d399;   /* Emerald 400 */
    
    --border: #3f3f46;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Force background on a wrapper to ensure dark mode works in all previews */
  .app-background {
    background-color: var(--bg-deep);
    min-height: 100vh;
    width: 100%;
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: var(--bg-deep);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* --- Layout & Utility --- */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border);
  }

  .brand {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-icon {
    color: var(--accent-primary);
  }

  /* --- Hero Section --- */
  .hero-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 80px;
    align-items: center;
    background: linear-gradient(to right, var(--bg-base), var(--bg-deep));
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 40px;
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    z-index: 2;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.1);
    color: var(--accent-primary);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 24px;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .hero-title {
    font-size: 3rem;
    line-height: 1.1;
    font-weight: 800;
    margin-bottom: 24px;
    background: linear-gradient(to bottom right, #fff, #a1a1aa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 32px;
    max-width: 90%;
  }

  .btn-primary {
    background-color: var(--text-primary);
    color: var(--bg-deep);
    padding: 12px 24px;
    border-radius: var(--radius-sm);
    font-weight: 600;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s ease, background-color 0.2s;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    background-color: #fff;
  }

  .hero-visual {
    position: relative;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  .hero-book-cover {
    width: 260px;
    height: 380px;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    border-radius: 8px;
    box-shadow: 
      -10px 10px 30px rgba(0,0,0,0.5),
      0 0 0 2px var(--border);
    transform: rotateY(-15deg) rotateX(5deg);
    transition: transform 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
    border-left: 12px solid #334155; /* Spine */
  }

  .hero-section:hover .hero-book-cover {
    transform: rotateY(-10deg) rotateX(2deg) scale(1.02);
  }

  /* --- Filters & Search --- */
  .filter-bar {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 40px;
  }

  .search-container {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    width: 18px;
    height: 18px;
  }

  .search-input {
    width: 100%;
    background-color: var(--bg-base);
    border: 1px solid var(--border);
    padding: 12px 12px 12px 40px;
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }

  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .chip {
    background-color: var(--bg-base);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chip:hover {
    background-color: var(--bg-surface);
    color: var(--text-primary);
  }

  .chip.active {
    background-color: rgba(16, 185, 129, 0.1);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }

  /* --- Grid & Cards --- */
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 80px;
  }

  .book-card {
    background-color: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 24px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .book-card:hover {
    transform: translateY(-4px);
    border-color: var(--text-muted);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }

  .card-header {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .card-cover-placeholder {
    width: 60px;
    height: 80px;
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    font-size: 0.8rem;
  }

  .card-meta {
    flex: 1;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-primary);
    line-height: 1.3;
  }

  .card-author {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .card-body {
    flex: 1;
    margin-bottom: 20px;
  }

  .card-summary-preview {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    padding-top: 16px;
    margin-top: auto;
  }

  .status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-completed {
    background-color: rgba(16, 185, 129, 0.15);
    color: var(--accent-primary);
  }

  .status-progress {
    background-color: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
  }
  
  .status-toread {
    background-color: var(--bg-highlight);
    color: var(--text-secondary);
  }

  .rating-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--text-primary);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .rating-icon {
    width: 14px;
    height: 14px;
    fill: #eab308;
    color: #eab308;
  }

  .time-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  /* --- Mage Portal --- */
  .mage-portal-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    margin-top: auto;
    align-self: flex-start;
  }

  .mage-portal-btn:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    box-shadow: 0 0 15px var(--accent-glow);
    text-shadow: 0 0 8px var(--accent-glow);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero-section {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-badge {
      margin: 0 auto 24px;
    }

    .hero-description {
      margin: 0 auto 32px;
    }

    .hero-visual {
      height: 300px;
    }
    
    .filter-bar {
      flex-direction: column;
    }
    
    .search-container {
      max-width: 100%;
    }
  }
`;

/**
 * COMPONENTS
 */

const NavHeader = () => (
  <header className="nav-header">
    <div className="brand">
      <Library className="brand-icon" size={28} />
      <span>DragunWF Library</span>
    </div>
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <span
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          cursor: "pointer",
        }}
      >
        Portfolio
      </span>
      <span
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          cursor: "pointer",
        }}
      >
        About
      </span>
      <button className="mage-portal-btn">
        <ShieldCheck size={16} />
        Mage's Portal
      </button>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-content">
      <div className="hero-badge">
        <Zap size={14} fill="currentColor" />
        Featured Summary
      </div>
      <h1 className="hero-title">The Pragmatic Programmer</h1>
      <p className="hero-description">
        From coding to career development, this book is the cornerstone of
        modern software craftsmanship. Learn why you should be a "tracer bullet"
        developer and how to avoid "broken windows."
      </p>
      <button className="btn-primary">
        Read Summary <ChevronRight size={18} />
      </button>
    </div>
    <div className="hero-visual">
      {/* CSS 3D Book representation */}
      <div className="hero-book-cover">
        <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}>
          The Pragmatic Programmer
        </h3>
        <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Hunt & Thomas
        </span>
        <Feather
          size={40}
          color="#3b82f6"
          style={{ marginTop: "30px", opacity: 0.8 }}
        />
      </div>
    </div>
  </section>
);

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="book-card">
      <div className="card-header">
        <div
          className="card-cover-placeholder"
          style={{ backgroundColor: book.coverColor }}
        >
          <BookOpen size={24} color="rgba(255,255,255,0.5)" />
        </div>
        <div className="card-meta">
          <h3 className="card-title">{book.title}</h3>
          <p className="card-author">{book.author}</p>
        </div>
      </div>

      <div className="card-body">
        <p className="card-summary-preview">{book.summary}</p>
      </div>

      <div className="card-footer">
        <div className="time-badge">
          <Clock size={14} /> {book.readTime}
        </div>
        <div className="rating-badge">
          <span>{book.rating}/10</span>
          <Star className="rating-icon" />
        </div>
      </div>

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className={`status-badge status-${book.status.toLowerCase().replace(" ", "")}`}
        >
          {book.status}
        </span>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          {book.category}
        </span>
      </div>
    </div>
  );
};

export default function HomePagePrototype() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categories derived from data
  const categories = Array.from(new Set(MOCK_SUMMARIES.map((b) => b.category)));

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return MOCK_SUMMARIES.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? book.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="app-background">
      {/* Inject CSS */}
      <style>{STYLES}</style>

      <div className="container">
        <NavHeader />

        <HeroSection />

        <main>
          <div className="filter-bar">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search titles, authors..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="category-chips">
                <button
                  className={`chip ${selectedCategory === null ? "active" : ""}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`chip ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "60px",
                  color: "var(--text-muted)",
                }}
              >
                <Filter
                  size={48}
                  style={{ marginBottom: "16px", opacity: 0.5 }}
                />
                <p>
                  No books found for your query. Try a different spell, Mage.
                </p>
              </div>
            )}
          </div>
        </main>

        <footer
          style={{
            marginTop: "auto",
            padding: "40px 0",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} DragunWF. Built with React &
            Obsidian.
          </p>
        </footer>
      </div>
    </div>
  );
}
