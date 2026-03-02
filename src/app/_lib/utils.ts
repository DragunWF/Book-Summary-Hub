export function calculateReadingTime(markdownText: string | undefined) {
  if (!markdownText) {
    return 0;
  }

  const wordsPerMinute = 250; // Average reading speed of a person
  const wordCount = markdownText.trim().split(/\s+/).length;
  const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);

  return readingTimeInMinutes;
}
