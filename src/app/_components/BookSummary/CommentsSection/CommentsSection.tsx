"use client";

import React, { useState } from "react";
import styles from "./CommentsSection.module.css";
import { MessageSquare, Send, User } from "lucide-react";

export default function CommentsSection() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Archmage_Dev",
      time: "2 hours ago",
      text: "The chapter on Dependency Inversion really clicked for me. The visual aid about the plugin architecture was key.",
    },
    {
      id: 2,
      user: "Junior_Warlock",
      time: "5 hours ago",
      text: "Is this strictly for OOP languages, or can I apply this to functional paradigms like Elixir?",
    },
  ]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "DragunWF", // Current user context
      time: "Just now",
      text: commentText,
    };

    setComments([newCommentObj, ...comments]);
    setCommentText("");
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
              disabled={!commentText.trim()}
            >
              <Send size={14} /> Post
            </button>
          </div>
        </div>
      </form>

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
                {comment.user}{" "}
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontWeight: 400,
                    marginLeft: "0.5rem",
                  }}
                >
                  {comment.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {comment.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
