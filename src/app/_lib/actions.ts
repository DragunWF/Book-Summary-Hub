"use server";

import { createClient } from "@/app/_lib/supabase-server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Book from "@/app/_interfaces/book";
import { getBookSummaryById } from "./data-service";

const bookSummaryTable = "bookSummaries";

// Book Summaries

export async function createBookSummaryAction(book: Book) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("You must be logged in to create a book summary");
  }

  const { id, createdAt, ...newBook } = book;
  const payload = { ...newBook };

  const { data, error } = await supabase
    .from(bookSummaryTable)
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Error creating book summary:", error);
    throw new Error("Failed to create book summary: " + error.message);
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updateBookSummaryAction(bookId: string, book: Book) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("You must be logged in to update a book summary");
  }

  const { id, createdAt, ...updatedBookData } = book;

  const { data, error } = await supabase
    .from(bookSummaryTable)
    .update(updatedBookData)
    .eq("id", bookId)
    .select()
    .single();

  if (error) {
    console.error("Error updating book summary:", error);
    throw new Error("Failed to update book summary: " + error.message);
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deleteBookSummaryAction(id: string) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("You must be logged in to delete a book summary");
  }

  const { error } = await supabase.from(bookSummaryTable).delete().eq("id", id);

  if (error) {
    console.error("Error deleting book summary:", error);
    throw new Error("Failed to delete book summary: " + error.message);
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function archiveBookSummary() {
  return;
}

export async function getBookSummaries() {
  return;
}

export async function getBookSummary(id: number) {
  return;
}

export async function getFeaturedBookSummary(id: number) {
  return;
}

export async function setFeaturedBookAction(id: string) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const book = await getBookSummaryById(id);
  if (!book?.isPublished) {
    throw new Error("Book is not published");
  }

  const { error } = await supabase
    .from("settings")
    .update({ featuredBookId: id })
    .eq("id", 1);

  if (error) {
    console.error("Error updating featured book:", error);
    throw new Error("Failed to update featured book: " + error.message);
  }

  revalidatePath("/admin/dashboard");
}

export async function clearFeaturedBookAction() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("settings")
    .update({ featuredBookId: null })
    .eq("id", 1);

  if (error) {
    console.error("Error clearing featured book:", error);
    throw new Error("Failed to clear featured book: " + error.message);
  }

  revalidatePath("/admin/dashboard");
}

// Comments

export async function getComments(bookId: number) {
  return;
}

export async function postComment(bookId: number, comment: string) {
  return;
}

export async function deleteComment() {
  return;
}

// Admin Authentication
export async function adminSignIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // In a real app, you might want to return the error message
    // or handle it more gracefully. For now, we'll just throw.
    throw new Error(error.message);
  }

  // Redirect to admin dashboard on successful login
  redirect("/admin/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
