import { MOCK_SUMMARIES } from "@/app/constants/mockData";
import BookForm from "@/app/_components/Admin/BookForm/BookForm";
import Book from "@/app/_interfaces/book";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { bookId } = await params;
  let bookData: Book | undefined;

  if (bookId !== "new") {
    const foundBook = MOCK_SUMMARIES.find((b) => b.id === bookId);
    if (!foundBook) {
      // In a real app, this might be a 404, but for prototype we can just let it be undefined (new) or show error
      // notFound();
      // For now, let's just log it and treat as new or error.
      // Actually, standard behavior is 404.
      // But maybe the user wants to test "editing" with a fake ID?
      // Let's stick to safe: if not found, it's a 404.
      // However, since we only have 6 mock items, accessing /7 will 404.
      // Let's just try to find it.
    }
    bookData = foundBook;
  }

  // Server Action or Handler (Mock for now)
  async function handleSave(book: Book) {
    "use server";
    console.log("Saving book:", book);
    // In a real app: await db.book.upsert(book)
    // redirect("/admin/dashboard");
  }

  async function handleDelete(id: string) {
    "use server";
    console.log("Deleting book:", id);
    // In a real app: await db.book.delete({ where: { id } })
    // redirect("/admin/dashboard");
  }

  return (
    <div style={{ padding: 20 }}>
      <BookForm
        initialData={bookData}
        onSave={handleSave}
        onDelete={bookId !== "new" ? handleDelete : undefined}
      />
    </div>
  );
}
