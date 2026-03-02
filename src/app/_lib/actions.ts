"use server";

import { createClient } from "@/app/_lib/supabase-server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  setFeaturedBookSummaryId,
  clearFeaturedBookSelection,
  createBookSummary as createBookSummaryService,
  updateBookSummary as updateBookSummaryService,
  deleteBookSummary as deleteBookSummaryService,
} from "@/app/_lib/data-service";
import Book from "@/app/_interfaces/book";

// Book Summaries

export async function createBookSummaryAction(book: Book) {
  const result = await createBookSummaryService(book);
  if (result) {
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
  } else {
    throw new Error("Failed to create book summary");
  }
}

export async function updateBookSummaryAction(bookId: string, book: Book) {
  const result = await updateBookSummaryService(bookId, book);
  if (result) {
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
  } else {
    throw new Error("Failed to update book summary");
  }
}

export async function deleteBookSummaryAction(id: string) {
  const success = await deleteBookSummaryService(id);
  if (success) {
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
  } else {
    throw new Error("Failed to delete book summary");
  }
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
  await setFeaturedBookSummaryId(id);
  revalidatePath("/admin/dashboard");
}

export async function clearFeaturedBookAction() {
  await clearFeaturedBookSelection();
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
