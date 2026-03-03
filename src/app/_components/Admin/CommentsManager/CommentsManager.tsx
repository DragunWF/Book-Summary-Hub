"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Loader2, MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getComments, deleteCommentAction } from "@/app/_lib/actions";
import { useToast } from "@/app/_components/Toast/ToastProvider";
import styles from "./CommentsManager.module.css";

interface Comment {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface CommentsManagerProps {
  bookId: string;
  bookTitle: string;
}

export default function CommentsManager({
  bookId,
  bookTitle,
}: CommentsManagerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { success, error } = useToast();

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getComments(bookId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err);
        error("Failed to Load", "Could not load comments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [bookId, error]);

  const handleDeleteComment = async (commentId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this comment?",
      )
    ) {
      return;
    }

    setDeletingId(commentId);
    try {
      await deleteCommentAction(commentId, bookId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      success(
        "Comment Banished",
        "The comment has been removed from archives.",
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Could not delete the comment.";
      error("Deletion Failed", errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const formatTime = (isoString: string) => {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={`/admin/dashboard/book-summary/${bookId}`}>
          <button className={styles.backBtn}>
            <ChevronLeft size={16} />
            Back to Editor
          </button>
        </Link>
        <div className={styles.titleSection}>
          <MessageSquare size={20} style={{ color: "#00FF41" }} />
          <div>
            <h1 className={styles.title}>Arcane Discourse Management</h1>
            <p className={styles.subtitle}>{bookTitle}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loadingState}>
          <Loader2 size={32} className={styles.spinner} />
          <span>Querying the archives...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageSquare size={32} style={{ opacity: 0.3 }} />
          <span>[ NO_COMMENTS // SILENCE_IN_THE_VAULT ]</span>
          <p>No one has inscribed their thoughts yet.</p>
        </div>
      ) : (
        <div className={styles.commentsList}>
          <div className={styles.statsBar}>
            <span className={styles.commentCount}>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          </div>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className={styles.commentCard}
              style={{ opacity: deletingId === comment.id ? 0.6 : 1 }}
            >
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  <span className={styles.username}>{comment.username}</span>
                  <span className={styles.timestamp}>
                    {formatTime(comment.createdAt)}
                  </span>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={deletingId === comment.id}
                  title="Delete comment"
                  aria-label="Delete comment"
                >
                  {deletingId === comment.id ? (
                    <Loader2 size={16} className={styles.spinner} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
              <div className={styles.commentContent}>{comment.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
