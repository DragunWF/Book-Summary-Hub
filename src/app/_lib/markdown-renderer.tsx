import ReactMarkdown from "react-markdown";
import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  );
}
