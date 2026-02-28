export default interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string; // Hex color code
  category: string;
  rating: number; // 1-10
  readTime?: string; // Optional legacy field
  summary: string;
  fullContent?: string; // Markdown content
  dateRead?: string;
  coverIcon?: string; // Lucide icon name
  createdAt?: string;
  isPublished?: boolean;
}
