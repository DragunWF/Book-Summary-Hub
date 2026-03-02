import BookSummaryView from "@/app/_components/BookSummary/BookSummaryView";
import { getBookSummaryById } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { bookId } = await params;
  const book = await getBookSummaryById(bookId);

  if (!book) {
    return {
      title: "Book Not Found | Book Summary",
    };
  }

  return {
    title: `${book.title} | Book Summary`,
  };
}

export default async function Page({ params }: PageProps) {
  const { bookId } = await params;
  const book = await getBookSummaryById(bookId);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <BookSummaryView book={book} />
    </div>
  );
}
