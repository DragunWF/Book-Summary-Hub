import { supabase } from "./supabase";
import Book from "../_interfaces/book";

export async function getBookSummaries(): Promise<Book[]> {
  const { data, error } = await supabase.from("bookSummaries").select("*");

  if (error) {
    console.error("Error fetching book summaries:", error);
    return [];
  }

  return (data as Book[]) || [];
}

export async function getFeaturedBookSummary(): Promise<Book | null> {
  const { data: settingsData, error: settingsError } = await supabase
    .from("settings")
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
    .from("bookSummaries")
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
    .from("bookSummaries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching book summary:", error);
    return null;
  }

  return data as Book;
}
