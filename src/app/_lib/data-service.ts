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
