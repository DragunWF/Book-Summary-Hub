"use client";

import React, { useState, useEffect } from "react";
import styles from "./CommentsSection.module.css";
import { MessageSquare, Send, User, Loader2 } from "lucide-react";
import { addComment, getComments } from "@/app/_lib/actions";
import { useToast } from "@/app/_components/Toast/ToastProvider";

interface Comment {
  id: string;
  username: string;
  createdAt: string;
  content: string;
}

interface CommentsSectionProps {
  bookId: string;
}

const getOrCreateGuestToken = (): string => {
  const storageKey = "guest_token";
  let token = localStorage.getItem(storageKey);

  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(storageKey, token);
  }

  return token;
};

export default function CommentsSection({ bookId }: CommentsSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestToken, setGuestToken] = useState<string>("");
  const { success, error } = useToast();

  // Initialize guest token on mount
  useEffect(() => {
    setGuestToken(getOrCreateGuestToken());
  }, []);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getComments(bookId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err);
        error("Failed to Load", "Could not load comments for this book.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [bookId, error]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("content", commentText);
      formData.append("bookId", bookId);
      formData.append("guestToken", guestToken);

      const newComment = await addComment(formData);

      // Format the comment for display
      const formattedComment: Comment = {
        id: newComment.id,
        username: newComment.username,
        content: newComment.content,
        createdAt: "Just now",
      };

      setComments([formattedComment, ...comments]);
      setCommentText("");
      success("Comment Posted", "Your thoughts have been inscribed.");
    } catch (err) {
      console.error("Failed to post comment:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Could not post your comment.";
      error("Incantation Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (isoString: string) => {
    if (isoString === "Just now") return isoString;

    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className={styles.commentsSection}>
      <div className={styles.commentHeader}>
        <MessageSquare size={20} style={{ color: "#00FF41" }} />
        Arcane Discourse
      </div>

      <form onSubmit={handlePostComment}>
        <div className={styles.commentInputWrapper}>
          <textarea
            className={styles.commentTextarea}
            placeholder="Inscribe your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "0.5rem",
            }}
          >
            <button
              type="submit"
              className={styles.actionButton + " " + styles.btnPrimary}
              style={{ width: "auto" }}
              disabled={!commentText.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2
                  size={14}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <Send size={14} />
              )}
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            padding: "2rem",
            color: "var(--text-muted)",
          }}
        >
          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
          <span>Loading discourse...</span>
        </div>
      ) : comments.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-muted)",
          }}
        >
          <p>No thoughts inscribed yet. Be the first to share.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--bg-highlight)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                <User size={20} />
              </div>
              <div>
                <div
                  style={{
                    marginBottom: "0.25rem",
                    fontSize: "0.9rem",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  {comment.username}{" "}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      fontWeight: 400,
                      marginLeft: "0.5rem",
                    }}
                  >
                    {formatTime(comment.createdAt)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {comment.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
