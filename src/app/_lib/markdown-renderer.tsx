import ReactMarkdown from "react-markdown";
import React from "react";
import rehypeSlug from "rehype-slug";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeSlug]}>
      {content}
    </ReactMarkdown>
  );
}
