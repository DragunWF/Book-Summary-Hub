export const CATEGORIES = [
  "Technical",
  "Self-Improvement",
  "Fiction",
  "Philosophy",
  "Business",
  "Psychology",
  "Math",
  "Communication",
  "Learning",
];

export function getCategoryColor(category: string) {
  switch (category) {
    case "Technical":
      return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa" }; // Blue
    case "Self-Improvement":
      return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399" }; // Green
    case "Philosophy":
      return { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" }; // Amber
    case "Fiction":
      return { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa" }; // Purple
    case "Business":
      return { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6" }; // Pink
    case "Psychology":
      return { bg: "rgba(244, 63, 94, 0.15)", text: "#fb7185" }; // Rose
    case "Math":
      return { bg: "rgba(6, 182, 212, 0.15)", text: "#22d3ee" }; // Cyan
    case "Communication": // For On Writing Well
      return { bg: "rgba(249, 115, 22, 0.15)", text: "#fb923c" }; // Orange
    case "Learning": // For Writing to Learn / How to Read a Book
      return { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8" }; // Indigo
    default:
      return { bg: "var(--bg-highlight)", text: "var(--text-secondary)" };
  }
}
