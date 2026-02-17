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
    default:
      return { bg: "var(--bg-highlight)", text: "var(--text-secondary)" };
  }
}
