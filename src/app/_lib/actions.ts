"use server";

import { createClient } from "@/app/_lib/supabase-server";
import { redirect } from "next/navigation";

// Book Summaries

export async function createBookSummary() {
  return;
}

export async function updateBookSummary() {
  return;
}

export async function deleteBookSummary() {
  return;
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
