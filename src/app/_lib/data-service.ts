import { supabase } from "./supabase";
import Book from "../_interfaces/book";

const bookSummaryTable = "bookSummaries";
const settingsTable = "settings";

// Note for self: For future usage
// const commentsTable = "comments";

export async function getBookSummaries(): Promise<Book[]> {
  // Fetches only published books (For public view)
  const { data, error } = await supabase
    .from(bookSummaryTable)
    .select("*")
    .eq("isPublished", true);

  if (error) {
    console.error("Error fetching book summaries:", error);
    return [];
  }

  return (data as Book[]) || [];
}

export async function getBookSummariesForAdmin(): Promise<Book[]> {
  // Fetches include unpublished books (For admin view only)
  const { data, error } = await supabase.from(bookSummaryTable).select("*");

  if (error) {
    console.error("Error fetching book summaries:", error);
    return [];
  }

  return (data as Book[]) || [];
}

export async function createBookSummary(book: Book) {
  const { id, createdAt, ...newBook } = book; // Remove existing id and createdAt

  // Supabase automatically generates the id and createAt fields
  const payload = { ...newBook };

  const { data, error } = await supabase
    .from(bookSummaryTable)
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Error creating book summary:", error);
    return null;
  }
  return data as Book;
}

export async function updateBookSummary(bookId: string, book: Book) {
  // Ensure we don't try to update the ID or createdAt with the provided book object
  const { id, createdAt, ...updatedBookData } = book;
  const { data, error } = await supabase
    .from(bookSummaryTable)
    .update(updatedBookData)
    .eq("id", bookId)
    .select()
    .single();

  if (error) {
    console.error("Error updating book summary:", error);
    return null;
  }
  return data as Book;
}

export async function deleteBookSummary(id: string) {
  const { error } = await supabase.from(bookSummaryTable).delete().eq("id", id);

  if (error) {
    console.error("Error deleting book summary:", error);
    return false;
  }
  return true;
}

export async function getPaginatedBookSummariesForAdmin(
  page: number = 1,
  pageSize: number = 10,
  query: string = "",
): Promise<{ books: Book[]; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let queryBuilder = supabase
    .from(bookSummaryTable)
    .select("*", { count: "exact" })
    .order("createdAt", { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.ilike("title", `%${query}%`);
  }

  const { data, error, count } = await queryBuilder.range(from, to);

  if (error) {
    console.error("Error fetching paginated book summaries:", error);
    return { books: [], count: 0 };
  }

  return { books: (data as Book[]) || [], count: count || 0 };
}

export async function getFeaturedBookSummary(): Promise<Book | null> {
  const { data: settingsData, error: settingsError } = await supabase
    .from(settingsTable)
    .select("featuredBookId")
    .maybeSingle();

  if (settingsError) {
    console.log("Error fetching the featured book summary ID:", settingsError);
    return null;
  } else if (!settingsData) {
    console.log("No featured book summary ID found in settings");
    return null;
  }

  const featuredBookId = settingsData?.featuredBookId;

  if (!featuredBookId) return null;

  const { data: bookData, error: bookError } = await supabase
    .from(bookSummaryTable)
    .select("*")
    .eq("id", featuredBookId)
    .maybeSingle();

  if (bookError) {
    console.error("Error fetching featured book details:", bookError);
    return null;
  }

  return bookData as Book;
}

export async function getBookSummaryById(id: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from(bookSummaryTable)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching book summary:", error);
    return null;
  }

  return data as Book;
}

export async function setFeaturedBookSummaryId(id: string) {
  const { error } = await supabase
    .from(settingsTable)
    .update({ featuredBookId: id })
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error(
      "Error updating featured book summary ID from the settings table:",
      error,
    );
  }
}

export async function clearFeaturedBookSelection() {
  const { error } = await supabase
    .from(settingsTable)
    .update({ featuredBookId: null })
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error(
      "Error clearing the featured book summary ID from the settings:",
      error,
    );
  }
}
