import BookForm from "@/app/_components/Admin/BookForm/BookForm";
import { getBookSummaryById } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import Book from "@/app/_interfaces/book";
import {
  createBookSummaryAction,
  updateBookSummaryAction,
  deleteBookSummaryAction,
} from "@/app/_lib/actions";

interface PageProps {
  params: { bookId: string };
}

export default async function Page({ params }: PageProps) {
  const { bookId } = await params;
  let bookData: Book | null = null;

  if (bookId !== "new") {
    bookData = await getBookSummaryById(bookId);
    if (!bookData) {
      notFound();
    }
  }

  const handleSave = async (book: Book) => {
    "use server";
    if (bookId === "new") {
      await createBookSummaryAction(book);
    } else {
      await updateBookSummaryAction(bookId, book);
    }
  };

  const handleDelete = async (id: string) => {
    "use server";
    await deleteBookSummaryAction(id);
  };

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
        onSave={handleSave}
        onDelete={bookId !== "new" ? handleDelete : undefined}
      />
    </div>
  );
}
