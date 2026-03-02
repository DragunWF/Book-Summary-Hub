import BookForm from "@/app/_components/Admin/BookForm/BookForm";
import { getBookSummaryById } from "@/app/_lib/data-service"; // Import real data service
import { notFound } from "next/navigation"; // Keep notFound
import Book from "@/app/_interfaces/book"; // Keep Book interface import

interface PageProps {
  params: { bookId: string }; // params are not a Promise in Next.js 14/15
}

export default async function Page({ params }: PageProps) {
  const { bookId } = await params;
  let bookData: Book | null = null; // Initialize to null

  if (bookId !== "new") {
    bookData = await getBookSummaryById(bookId); // Fetch real data
    if (!bookData) {
      notFound(); // If book not found, render 404
    }
  }

  // HandleSave and handleDelete are removed as per instruction: "Do not implement the editing of a book summary yet."
  // BookForm props will be adjusted to reflect this.

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundColor: "#020617",
      }}
    >
      <BookForm
        initialData={bookData}
        // onSave and onDelete props are removed
      />
    </div>
  );
}
