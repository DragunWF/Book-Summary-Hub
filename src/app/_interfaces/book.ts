export default interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string; // Hex color code
  category:
    | "Technical"
    | "Self-Improvement"
    | "Fiction"
    | "Philosophy"
    | "Business";
  rating: number; // 1-10
  readTime?: string; // Optional legacy field
  summary: string;
  fullContent?: string; // Markdown content
  coverIcon?: string; // Lucide icon name
  createdAt?: string;
  isPublished?: boolean;
}
