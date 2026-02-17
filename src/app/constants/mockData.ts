import Book from "../_interfaces/book";

export const MOCK_SUMMARIES: Book[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverColor: "#2563eb",
    category: "Technical",
    rating: 10,
    readTime: "12 min read",
    summary:
      "The quintessential guide to software craftsmanship. Focuses on pragmatic approaches to coding, debugging, and career development.",
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverColor: "#f59e0b",
    category: "Self-Improvement",
    rating: 9,
    readTime: "8 min read",
    summary:
      "Small changes, remarkable results. A comprehensive system for building good habits and breaking bad ones.",
    createdAt: "2023-11-02",
  },
  {
    id: "3",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverColor: "#b91c1c",
    category: "Philosophy",
    rating: 10,
    readTime: "15 min read",
    summary:
      "Private notes of a Roman Emperor. A timeless study in Stoicism, resilience, and maintaining a rational mind.",
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverColor: "#7c3aed",
    category: "Fiction",
    rating: 9,
    readTime: "N/A",
    summary:
      "A lone astronaut must save the earth from disaster. Hard sci-fi with a focus on problem-solving and science.",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    coverColor: "#059669",
    category: "Self-Improvement",
    rating: 8,
    readTime: "10 min read",
    summary:
      "Rules for focused success in a distracted world. How to master hard things and produce at an elite level.",
    createdAt: "2024-01-20",
  },
  {
    id: "6",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    coverColor: "#db2777",
    category: "Technical",
    rating: 8,
    readTime: "20 min read",
    summary:
      "A craftsman's guide to software structure and design. Essential for scalable systems.",
    createdAt: "2024-02-01",
  },
];
