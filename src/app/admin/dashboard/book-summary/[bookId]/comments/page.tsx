import { getBookSummaryById } from "@/app/_lib/data-service";
import CommentsManager from "@/app/_components/Admin/CommentsManager/CommentsManager";
import { notFound } from "next/navigation";

interface CommentsPageProps {
  params: Promise<{ bookId: string }>;
}

export default async function CommentsPage({ params }: CommentsPageProps) {
  const { bookId } = await params;

  // Fetch the book data to get the title
  const book = await getBookSummaryById(bookId);

  if (!book) {
    notFound();
  }

  return <CommentsManager bookId={bookId} bookTitle={book.title} />;
}
