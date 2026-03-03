"use server";

import { createClient } from "@/app/_lib/supabase-server";
import { Filter } from "bad-words";

/**
 * Validate comment length (min 10, max 5000 characters)
 */
export async function validateCommentLength(content: string): Promise<void> {
  if (content.length < 10) {
    throw new Error(
      "Your incantation must be at least 10 characters of power.",
    );
  }

  if (content.length > 5000) {
    throw new Error(
      "Your spell is too powerful! Limit your thoughts to 5000 characters.",
    );
  }
}

/**
 * Check for excessive formatting (all caps, excessive punctuation)
 */
export async function checkExcessiveFormatting(content: string): Promise<void> {
  // All caps check
  const uppercaseRatio =
    (content.match(/[A-Z]/g) || []).length / content.length;
  if (uppercaseRatio > 0.7) {
    throw new Error(
      "Your spell is too loud! Use normal capitalization for your message.",
    );
  }

  // Excessive punctuation check
  if (/([!?])\1{2,}/.test(content)) {
    throw new Error(
      "Your incantation has too much magical excitement! Calm your punctuation.",
    );
  }
}

/**
 * Check for URL/link spam (max 2 links per comment)
 */
export async function checkURLSpam(content: string): Promise<void> {
  const urlMatches = content.match(/https?:\/\/[^\s]+/g) || [];
  if (urlMatches.length > 2) {
    throw new Error(
      "Too many portal links detected! Maximum 2 links per incantation.",
    );
  }
}

/**
 * Check for duplicate comments within last 5 minutes
 */
export async function checkDuplicateComment(
  guestToken: string,
  content: string,
): Promise<void> {
  const supabase = await createClient();
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  const { data: duplicates } = await supabase
    .from("comments")
    .select("id")
    .eq("guestToken", guestToken)
    .eq("content", content)
    .gte("createdAt", fiveMinutesAgo.toISOString());

  if (duplicates && duplicates.length > 0) {
    throw new Error(
      "This exact spell was already cast recently! Try a different incantation.",
    );
  }
}

/**
 * Check for profanity using bad-words filter
 */
export async function checkProfanity(content: string): Promise<void> {
  const filter = new Filter();

  if (filter.isProfane(content)) {
    throw new Error(
      "Your message contains forbidden language. Please rephrase your thoughts.",
    );
  }
}

/**
 * Check for promotional/spam keywords
 */
export async function checkSpamKeywords(content: string): Promise<void> {
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "bitcoin",
    "crypto",
    "forex",
    "investment",
    "make money fast",
    "click here",
    "buy now",
    "limited offer",
  ];

  const lowerContent = content.toLowerCase();
  for (const keyword of spamKeywords) {
    if (lowerContent.includes(keyword)) {
      throw new Error(
        "Your message appears to contain promotional content. Please keep discussions on-topic.",
      );
    }
  }
}

/**
 * Check rate limits for guest token
 * - 1 comment per 30 seconds
 * - 10 comments per hour
 * - 50 comments per day
 */
export async function checkRateLimits(guestToken: string): Promise<void> {
  const supabase = await createClient();
  const now = new Date();
  const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Check last 30 seconds
  const { data: last30s } = await supabase
    .from("comments")
    .select("id")
    .eq("guestToken", guestToken)
    .gte("createdAt", thirtySecondsAgo.toISOString());

  if (last30s && last30s.length >= 1) {
    throw new Error(
      "Spellcasting too fast! Please wait 30 seconds before your next incantation.",
    );
  }

  // Check last hour
  const { data: lastHour } = await supabase
    .from("comments")
    .select("id")
    .eq("guestToken", guestToken)
    .gte("createdAt", oneHourAgo.toISOString());

  if (lastHour && lastHour.length >= 10) {
    throw new Error(
      "You've cast too many spells this hour. Return tomorrow to continue your discourse.",
    );
  }

  // Check last 24 hours
  const { data: lastDay } = await supabase
    .from("comments")
    .select("id")
    .eq("guestToken", guestToken)
    .gte("createdAt", oneDayAgo.toISOString());

  if (lastDay && lastDay.length >= 50) {
    throw new Error(
      "Daily spellcasting limit reached. Your mana reserves are depleted. Return tomorrow.",
    );
  }
}

/**
 * Generate or retrieve guest username
 */
export async function getOrCreateUsername(guestToken: string): Promise<string> {
  const prefix = "Wandering Scholar ";
  return prefix + guestToken.substring(0, 4).toUpperCase();
}

/**
 * Insert comment into database
 */
export async function insertComment(
  bookId: string,
  guestToken: string,
  username: string,
  content: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .insert({
      bookId,
      guestToken,
      username,
      content,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to inscribe your thoughts. Please try again.");
  }

  return data;
}
