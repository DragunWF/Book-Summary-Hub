export default interface Book {
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
  readTime: string;
  summary: string;
  createdAt?: string; // Optional for now, will be mandatory later
}
